export type WorkspaceMode = "sql" | "insights" | "recommendation" | "preview";

export type WorkspaceTab = {
  id: WorkspaceMode;
  label: string;
  shortLabel: string;
  description: string;
};

export type WorkspaceMetric = {
  label: string;
  value: string;
};

export type WorkspaceCard = {
  label: string;
  value: string;
};

export type WorkspaceGuidance = {
  hints: string[];
  rubric: { label: string; score: string }[];
  feedback: string[];
  readiness: { label: string; value: string }[];
};

export const workspaceProject = {
  scenarioLabel: "Analyst Workbench",
  name: "Churn Retention Simulation",
  summary:
    "Operational analyst workspace for framing the problem, testing the hypothesis, structuring findings, and assembling a submission-ready recommendation.",
  statusChips: ["Desktop Workbench", "Hybrid Lab System", "Local Simulation"],
  saveLabel: "Autosave",
  submitLabel: "Submit Work",
};

export const workspaceTabs: WorkspaceTab[] = [
  {
    id: "sql",
    label: "SQL Draft",
    shortLabel: "SQL",
    description: "Draft queries and validate the retention signal with lightweight execution summaries.",
  },
  {
    id: "insights",
    label: "Insight Notes",
    shortLabel: "Insights",
    description: "Capture evidence, analyst reasoning, and structured findings while the signal is fresh.",
  },
  {
    id: "recommendation",
    label: "Recommendation",
    shortLabel: "Recommendation",
    description: "Translate the analysis into an executive-ready action plan and business consequence.",
  },
  {
    id: "preview",
    label: "Submission Preview",
    shortLabel: "Preview",
    description: "Review a compressed read-only version of the current work product before submission.",
  },
];

export const problemBrief = {
  eyebrow: "Problem Brief",
  title: "Churn Retention Simulation",
  summary:
    "A subscription product is losing retained revenue shortly after onboarding. The analyst objective is to isolate the breakpoints, quantify the exposure, and recommend focused interventions that can be executed within one quarter.",
  audience: "Product leadership and lifecycle operations",
  deliverable: "Executive-facing recommendation memo with supporting analysis",
  objectives: [
    "Identify the top churn drivers by lifecycle stage",
    "Quantify revenue-at-risk across onboarding cohorts",
    "Recommend three practical interventions with analyst rationale",
  ],
  constraints: [
    "Use only the provided cohort and account tables",
    "Frame findings for decision-makers, not a technical audience",
    "Keep the intervention set achievable inside a single quarter",
  ],
  successCriteria: [
    "Lead with the highest-value churn segment",
    "Connect the signal to business consequence",
    "Translate the insight into measurable action",
  ],
};

export const workspaceMetrics: WorkspaceMetric[] = [
  { label: "Rows scanned", value: "1.2M" },
  { label: "Query accuracy", value: "94%" },
  { label: "Insight confidence", value: "High" },
];

export const sqlModeCards: WorkspaceCard[] = [
  {
    label: "Primary Question",
    value: "Which onboarding segment creates the largest retained-revenue loss before cancellation is obvious?",
  },
  {
    label: "Current Signal",
    value: "Accounts below 40% setup completion show the sharpest 60-day retained-revenue drop.",
  },
  {
    label: "Working Hypothesis",
    value: "Early activation friction suppresses expansion and accelerates churn risk during onboarding.",
  },
];

export const sqlResultCards: WorkspaceCard[] = [
  { label: "Highest-risk segment", value: "Low setup completion cohort" },
  { label: "Revenue at risk", value: "$480K retained ARR" },
  { label: "Earliest visible drop", value: "Day 21 after onboarding" },
];

export const sqlExecutionNotes = [
  "Compare churn by onboarding completion band before segmenting by account size.",
  "Track retained revenue decline before cancellation rate becomes visible.",
  "Use one practical follow-up cut to confirm whether enterprise accounts behave differently.",
];

export const insightEvidenceCards: WorkspaceCard[] = [
  {
    label: "Cohort Read",
    value: "The steepest retained-revenue loss appears in accounts failing to complete early setup milestones.",
  },
  {
    label: "Business Read",
    value: "Revenue risk concentrates before the customer is visibly lost, which makes reactive outreach too late.",
  },
  {
    label: "Analyst Read",
    value: "The churn signal is operational, not purely messaging-driven, so interventions should prioritize activation quality.",
  },
];

export const recommendationFrames = [
  {
    label: "Primary Recommendation",
    description: "Introduce milestone-based onboarding intervention for low-activation accounts in the first 30 days.",
  },
  {
    label: "Business Impact",
    description: "Reduce retained-revenue loss before cancellation becomes visible and improve expansion readiness.",
  },
  {
    label: "Execution Constraint",
    description: "Keep the operating model light enough for one quarter and measurable by cohort performance.",
  },
];

export const workspaceGuidanceByMode: Record<WorkspaceMode, WorkspaceGuidance> = {
  sql: {
    hints: [
      "Use the first query to isolate the highest-risk onboarding band, not every segment at once.",
      "Check where retained revenue starts dropping relative to churn becoming explicit.",
      "Keep the first analysis cut decision-oriented instead of exhaustively diagnostic.",
    ],
    rubric: [
      { label: "Problem framing", score: "Strong" },
      { label: "Quant analysis", score: "On track" },
      { label: "Signal quality", score: "Strong" },
      { label: "Query discipline", score: "Stable" },
    ],
    feedback: [
      "Your query should make the highest-value loss segment obvious in one read.",
      "Avoid broad segmentation until the first cohort signal is locked.",
      "Keep the result summary usable by someone who never sees the SQL.",
    ],
    readiness: [
      { label: "Evidence locked", value: "76%" },
      { label: "Decision signal", value: "High" },
      { label: "Submission risk", value: "Low" },
    ],
  },
  insights: {
    hints: [
      "Write findings in consequence-first language before layering in supporting detail.",
      "Separate evidence from interpretation so the recommendation can inherit both cleanly.",
      "Keep one note focused on timing, not only magnitude.",
    ],
    rubric: [
      { label: "Evidence quality", score: "Strong" },
      { label: "Business reasoning", score: "Strong" },
      { label: "Story structure", score: "On track" },
      { label: "Clarity", score: "Needs tightening" },
    ],
    feedback: [
      "Lead with the revenue consequence before describing the cohort behavior.",
      "Name the operational breakpoint directly instead of implying it.",
      "Preserve one finding that bridges analysis to execution feasibility.",
    ],
    readiness: [
      { label: "Insight clarity", value: "81%" },
      { label: "Narrative shape", value: "Improving" },
      { label: "Executive fit", value: "Medium" },
    ],
  },
  recommendation: {
    hints: [
      "Tie each recommendation to one measurable operating change.",
      "Explain why the action is right for one quarter, not merely desirable.",
      "Quantify the business consequence of inaction where possible.",
    ],
    rubric: [
      { label: "Actionability", score: "Strong" },
      { label: "Executive clarity", score: "On track" },
      { label: "Business impact", score: "Strong" },
      { label: "Implementation realism", score: "Stable" },
    ],
    feedback: [
      "Keep the recommendation short enough that leadership can repeat it back.",
      "Anchor the recommendation in the highest-risk segment rather than all churn.",
      "State the expected operational shift, not just the analytical conclusion.",
    ],
    readiness: [
      { label: "Decision readiness", value: "88%" },
      { label: "Recommendation fit", value: "High" },
      { label: "Submission risk", value: "Low" },
    ],
  },
  preview: {
    hints: [
      "Read the preview as if you are the decision-maker seeing it cold for the first time.",
      "Check that the recommendation can stand without the underlying workbench context.",
      "Confirm the business consequence is visible in the first scan.",
    ],
    rubric: [
      { label: "Submission completeness", score: "Strong" },
      { label: "Executive scanability", score: "On track" },
      { label: "Argument cohesion", score: "Strong" },
      { label: "Final polish", score: "Needs pass" },
    ],
    feedback: [
      "The first paragraph should clarify the segment, risk, and action in one flow.",
      "Trim any insight that repeats the same business meaning.",
      "Use the preview to confirm the workbench output feels publication-ready.",
    ],
    readiness: [
      { label: "Preview confidence", value: "91%" },
      { label: "Memo state", value: "Ready soon" },
      { label: "Polish gap", value: "Minor" },
    ],
  },
};

export const initialSqlDraft = `-- retained revenue at risk by onboarding band
select
  onboarding_band,
  count(*) as accounts,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_risk
from cohort_accounts
group by onboarding_band
order by retained_revenue desc;`;

export const initialInsightNotes = `Accounts below 40% onboarding completion create the highest retained-revenue exposure and begin declining before cancellation becomes visible.

The strongest business implication is timing: by the time churn is explicit, the expansion path is already damaged.

The likely operational lever is activation quality in the first 30 days, not additional lifecycle messaging alone.`;

export const initialRecommendation = `Prioritize a milestone-based onboarding intervention for low-activation accounts in the first 30 days.

This recommendation focuses on the cohort creating the largest retained-revenue risk and addresses the signal before cancellation is visible. The intervention should combine activation milestone tracking, targeted setup support, and weekly escalation for accounts stuck below key setup thresholds.`;
