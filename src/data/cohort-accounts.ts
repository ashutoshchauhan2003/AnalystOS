export type CohortAccount = {
  accountId: string;
  segment: "Enterprise" | "Mid-market" | "SMB";
  region: "North America" | "EMEA" | "APAC";
  onboardingBand: "0-40%" | "41-70%" | "71-100%";
  accounts: number;
  retainedRevenue: number;
  priorRetainedRevenue: number;
  churnRiskScore: number;
  churnedAccounts: number;
};

export type QueryResultRow = Record<string, string>;

export const cohortAccounts: CohortAccount[] = [
  {
    accountId: "cohort-na-ent-low",
    segment: "Enterprise",
    region: "North America",
    onboardingBand: "0-40%",
    accounts: 184,
    retainedRevenue: 3840000,
    priorRetainedRevenue: 5180000,
    churnRiskScore: 0.84,
    churnedAccounts: 39,
  },
  {
    accountId: "cohort-na-mm-low",
    segment: "Mid-market",
    region: "North America",
    onboardingBand: "0-40%",
    accounts: 312,
    retainedRevenue: 2180000,
    priorRetainedRevenue: 2860000,
    churnRiskScore: 0.76,
    churnedAccounts: 61,
  },
  {
    accountId: "cohort-emea-mm-mid",
    segment: "Mid-market",
    region: "EMEA",
    onboardingBand: "41-70%",
    accounts: 268,
    retainedRevenue: 2460000,
    priorRetainedRevenue: 2720000,
    churnRiskScore: 0.58,
    churnedAccounts: 29,
  },
  {
    accountId: "cohort-apac-smb-low",
    segment: "SMB",
    region: "APAC",
    onboardingBand: "0-40%",
    accounts: 427,
    retainedRevenue: 1720000,
    priorRetainedRevenue: 1880000,
    churnRiskScore: 0.62,
    churnedAccounts: 74,
  },
  {
    accountId: "cohort-na-ent-high",
    segment: "Enterprise",
    region: "North America",
    onboardingBand: "71-100%",
    accounts: 96,
    retainedRevenue: 2640000,
    priorRetainedRevenue: 2580000,
    churnRiskScore: 0.22,
    churnedAccounts: 4,
  },
  {
    accountId: "cohort-emea-ent-mid",
    segment: "Enterprise",
    region: "EMEA",
    onboardingBand: "41-70%",
    accounts: 118,
    retainedRevenue: 2260000,
    priorRetainedRevenue: 2320000,
    churnRiskScore: 0.39,
    churnedAccounts: 8,
  },
];

export const mockProjects = [
  {
    id: "churn-retention-simulation",
    title: "Churn Retention Simulation",
    status: "active",
    route: "/lab",
    scenario: "Subscription revenue is dropping after onboarding.",
    progress: 62,
    updatedAt: "2026-04-23T09:30:00.000Z",
  },
  {
    id: "sales-drop-diagnostic",
    title: "Sales Drop Diagnostic",
    status: "draft",
    route: "/case-studies/churn-retention-simulation",
    scenario: "Sales dropped 20%, identify the driver.",
    progress: 38,
    updatedAt: "2026-04-22T16:45:00.000Z",
  },
];

export const mockUserProgress = {
  userId: "analyst-demo-user",
  displayName: "Demo Analyst",
  currentProjectId: "churn-retention-simulation",
  completedSteps: ["sql"],
  unlockedHints: 2,
  totalProgress: 62,
  lastActiveAt: "2026-04-23T10:00:00.000Z",
  skillSignals: [
    { label: "SQL reasoning", value: 78 },
    { label: "Insight quality", value: 71 },
    { label: "Recommendation framing", value: 64 },
  ],
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    notation: "compact",
    style: "currency",
  }).format(value);
}

function formatPercent(value: number) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function formatRisk(value: number) {
  return `${Math.round(value * 100)}%`;
}

const retentionColumns = [
  "driver",
  "currentRevenue",
  "priorRevenue",
  "change",
  "variance",
  "signal",
];

const churnColumns = [
  "cohort",
  "accounts",
  "churnedAccounts",
  "churnRate",
  "avgRisk",
  "signal",
];

const onboardingColumns = [
  "onboardingBand",
  "accounts",
  "retainedRevenue",
  "avgChurnRisk",
  "recommendedAction",
];

export function executeCohortQuery(sql: string) {
  const normalizedSql = sql.toLowerCase();

  if (!normalizedSql.includes("select") || !normalizedSql.includes("from")) {
    return {
      status: "invalid" as const,
      message: "SQL error: expected a SELECT query with a FROM clause.",
      columns: [] as string[],
      rows: [] as QueryResultRow[],
      executionTimeMs: 0,
      summary: null,
    };
  }

  if (!normalizedSql.includes("cohort_accounts")) {
    return {
      status: "invalid" as const,
      message:
        "Query must use the cohort_accounts table to execute against the churn dataset.",
      columns: [] as string[],
      rows: [] as QueryResultRow[],
      executionTimeMs: 0,
      summary: null,
    };
  }

  if (
    normalizedSql.includes("0=1") ||
    normalizedSql.includes("region = 'latam'") ||
    normalizedSql.includes('region = "latam"') ||
    normalizedSql.includes("segment = 'consumer'") ||
    normalizedSql.includes('segment = "consumer"')
  ) {
    return {
      status: "valid" as const,
      message:
        "Query executed successfully, but no rows matched the filter. Try North America, EMEA, APAC, Enterprise, Mid-market, or SMB.",
      columns: retentionColumns,
      rows: [] as QueryResultRow[],
      executionTimeMs: 211,
      summary: {
        table: "cohort_accounts",
        rowsScanned: cohortAccounts.length,
        highestRiskDriver: "No matching rows",
        recommendationSignal: "Adjust filters to return a supported churn cohort.",
      },
    };
  }

  const asksForChurnRate =
    normalizedSql.includes("churned_accounts") ||
    normalizedSql.includes("churn_rate") ||
    normalizedSql.includes("churned") ||
    normalizedSql.includes("count(");
  const asksForOnboarding =
    normalizedSql.includes("onboarding_band") &&
    (normalizedSql.includes("avg(churn_risk_score)") ||
      normalizedSql.includes("churn_risk_score") ||
      normalizedSql.includes("activation"));
  const asksForRetention =
    normalizedSql.includes("retained_revenue") ||
    normalizedSql.includes("prior_retained_revenue") ||
    normalizedSql.includes("revenue_variance");

  if (asksForChurnRate) {
    const rows = cohortAccounts
      .map((account) => {
        const churnRate = (account.churnedAccounts / account.accounts) * 100;
        return {
          cohort: `${account.region} / ${account.segment}`,
          accounts: String(account.accounts),
          churnedAccounts: String(account.churnedAccounts),
          churnRate: formatPercent(churnRate),
          avgRisk: formatRisk(account.churnRiskScore),
          signal:
            churnRate >= 18
              ? "Critical churn concentration"
              : churnRate >= 10
                ? "Elevated churn"
                : "Stable cohort",
          rawRate: churnRate,
        };
      })
      .sort((a, b) => b.rawRate - a.rawRate)
      .slice(0, 5)
      .map((row) => ({
        cohort: row.cohort,
        accounts: row.accounts,
        churnedAccounts: row.churnedAccounts,
        churnRate: row.churnRate,
        avgRisk: row.avgRisk,
        signal: row.signal,
      }));

    return {
      status: "valid" as const,
      message:
        "Query executed. Low-completion North America and APAC cohorts show the highest churn rates.",
      columns: churnColumns,
      rows,
      executionTimeMs: 389,
      summary: {
        table: "cohort_accounts",
        rowsScanned: cohortAccounts.length,
        highestRiskDriver: rows[0]?.cohort ?? "Unknown",
        recommendationSignal:
          "Investigate onboarding failure and support load for cohorts with elevated churn rates.",
      },
    };
  }

  if (asksForOnboarding) {
    const grouped = ["0-40%", "41-70%", "71-100%"].map((band) => {
      const rows = cohortAccounts.filter((account) => account.onboardingBand === band);
      const accounts = rows.reduce((total, row) => total + row.accounts, 0);
      const retainedRevenue = rows.reduce((total, row) => total + row.retainedRevenue, 0);
      const avgRisk =
        rows.reduce((total, row) => total + row.churnRiskScore, 0) / rows.length;

      return {
        onboardingBand: band,
        accounts: String(accounts),
        retainedRevenue: formatCurrency(retainedRevenue),
        avgChurnRisk: formatRisk(avgRisk),
        recommendedAction:
          band === "0-40%"
            ? "Immediate onboarding intervention"
            : band === "41-70%"
              ? "Targeted milestone support"
              : "Monitor and preserve",
        rawRisk: avgRisk,
      };
    });

    const rows = grouped
      .sort((a, b) => b.rawRisk - a.rawRisk)
      .map((row) => ({
        onboardingBand: row.onboardingBand,
        accounts: row.accounts,
        retainedRevenue: row.retainedRevenue,
        avgChurnRisk: row.avgChurnRisk,
        recommendedAction: row.recommendedAction,
      }));

    return {
      status: "valid" as const,
      message:
        "Query executed. The 0-40% onboarding band has the highest average churn risk and strongest intervention case.",
      columns: onboardingColumns,
      rows,
      executionTimeMs: 342,
      summary: {
        table: "cohort_accounts",
        rowsScanned: cohortAccounts.length,
        highestRiskDriver: rows[0]?.onboardingBand ?? "Unknown",
        recommendationSignal:
          "Use milestone-based onboarding recovery for accounts below 40% completion.",
      },
    };
  }

  if (!asksForRetention) {
    return {
      status: "invalid" as const,
      message:
        "Unsupported query pattern. Try retained_revenue variance, churned_accounts churn rate, or onboarding_band risk analysis.",
      columns: [] as string[],
      rows: [] as QueryResultRow[],
      executionTimeMs: 0,
      summary: null,
    };
  }

  const hasGrouping =
    normalizedSql.includes("group by") &&
    (normalizedSql.includes("onboarding_band") ||
      normalizedSql.includes("segment") ||
      normalizedSql.includes("region"));

  if (!hasGrouping) {
    return {
      status: "invalid" as const,
      message:
        "Query runs conceptually, but add GROUP BY with onboarding_band, segment, or region to explain the churn driver.",
      columns: [] as string[],
      rows: [] as QueryResultRow[],
      executionTimeMs: 0,
      summary: null,
    };
  }

  const rows = cohortAccounts
    .map((account) => {
      const variance = account.retainedRevenue - account.priorRetainedRevenue;
      const change = (variance / account.priorRetainedRevenue) * 100;
      const signal =
        account.churnRiskScore >= 0.75
          ? "Critical churn exposure"
          : account.churnRiskScore >= 0.55
            ? "Elevated risk"
            : "Stable";

      return {
        driver: `${account.region} / ${account.segment} / ${account.onboardingBand}`,
        currentRevenue: formatCurrency(account.retainedRevenue),
        priorRevenue: formatCurrency(account.priorRetainedRevenue),
        change: formatPercent(change),
        variance: formatCurrency(variance),
        signal,
        rawVariance: variance,
      };
    })
    .sort((a, b) => a.rawVariance - b.rawVariance)
    .slice(0, 4)
    .map((row) => ({
      driver: row.driver,
      currentRevenue: row.currentRevenue,
      priorRevenue: row.priorRevenue,
      change: row.change,
      variance: row.variance,
      signal: row.signal,
    }));

  return {
    status: "valid" as const,
    message:
      "Query executed. Low-onboarding North America cohorts show the largest retained-revenue loss and churn exposure.",
    columns: retentionColumns,
    rows,
    executionTimeMs: 426,
    summary: {
      table: "cohort_accounts",
      rowsScanned: cohortAccounts.length,
      highestRiskDriver: rows[0]?.driver ?? "Unknown",
      recommendationSignal:
        "Prioritize onboarding intervention for low-completion enterprise and mid-market cohorts.",
    },
  };
}
