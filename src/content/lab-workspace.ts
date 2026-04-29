import salesDropScenario from "@/data/sales-drop-scenario.json";

export type WorkspaceMode = "sql" | "insights" | "recommendation" | "preview";
export type SimulationStepId =
  | "understand-problem"
  | "draft-sql"
  | "run-analysis"
  | "capture-insights"
  | "write-recommendation"
  | "prepare-submission";

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

export type SimulationScenario = typeof salesDropScenario;

export type SimulationStepState = {
  id: SimulationStepId;
  label: string;
  description: string;
  mode: WorkspaceMode;
  completed: boolean;
  active: boolean;
};

export type SimulationValidation = {
  status: "idle" | "running" | "valid" | "invalid" | "submitted";
  message: string;
};

export type MissionReadiness = {
  label: string;
  tone: "neutral" | "warning" | "success" | "cyan";
  message: string;
  confidence: "Low" | "Medium" | "High";
  score: number;
  completedItems: string[];
  missingItems: string[];
};

export const simulationScenario: SimulationScenario = salesDropScenario;

export const simulationStepDefinitions: Array<
  Omit<SimulationStepState, "completed" | "active">
> = [
  {
    id: "understand-problem",
    label: "Understand the problem",
    description: "Clarify the churn mission, dataset, audience, and final business decision.",
    mode: "sql",
  },
  {
    id: "draft-sql",
    label: "Draft SQL",
    description: "Write a focused query using cohort_accounts, retained revenue, and cohort dimensions.",
    mode: "sql",
  },
  {
    id: "run-analysis",
    label: "Run analysis",
    description: "Execute the SQL and validate a believable churn signal from the result set.",
    mode: "sql",
  },
  {
    id: "capture-insights",
    label: "Capture insights",
    description: "Turn the results into evidence-backed findings with clear business meaning.",
    mode: "insights",
  },
  {
    id: "write-recommendation",
    label: "Write recommendation",
    description: "Convert the analysis into a focused corrective action for leadership.",
    mode: "recommendation",
  },
  {
    id: "prepare-submission",
    label: "Prepare submission",
    description: "Confirm the final output is complete, readable, and ready to submit.",
    mode: "preview",
  },
];

export const workspaceProject = {
  scenarioLabel: simulationScenario.scenarioLabel,
  name: simulationScenario.title,
  summary:
    "Operational analyst simulation for diagnosing a 20% sales decline, validating the signal with SQL, and submitting a recommendation.",
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
  title: simulationScenario.title,
  summary: simulationScenario.summary,
  audience: simulationScenario.audience,
  deliverable: simulationScenario.deliverable,
  objectives: simulationScenario.questions,
  constraints: [
    "Use only the provided cohort_accounts churn dataset",
    "Frame findings for decision-makers, not a technical audience",
    "Separate query evidence from recommendation opinion",
  ],
  successCriteria: simulationScenario.successCriteria,
};

export const workspaceMetrics: WorkspaceMetric[] = [
  { label: "Rows loaded", value: "48.9K" },
  { label: "Dataset", value: "Churn" },
  { label: "Engine", value: "API" },
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
  segment,
  region,
  count(*) as accounts,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by onboarding_band, segment, region
order by retained_revenue asc;`;

export const initialInsightNotes = `North America Enterprise appears to explain the largest portion of the sales decline based on revenue variance.

The signal should be checked against channel mix, discounting, and pipeline conversion before assuming broad demand weakness.

The likely operating issue is concentrated enough for a targeted recovery plan rather than a company-wide sales reset.`;

export const initialRecommendation = `Prioritize a focused recovery sprint for North America Enterprise accounts.

The first action should combine pipeline inspection, discount governance, and manager review of stalled enterprise opportunities. This keeps the response tied to the largest diagnosed revenue variance instead of spreading effort across every segment.`;
