import type { RubricId } from "@/content/rubrics";

export type LabId =
  | "sql-join-challenge"
  | "churn-diagnostic-simulation"
  | "sales-dashboard-critique"
  | "excel-cleaning-challenge"
  | "ba-requirements-case"
  | "user-story-builder"
  | "python-eda-notebook-task"
  | "debugging-broken-sql-query";

export type LabDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type LabFormat =
  | "SQL Challenge"
  | "Diagnostic Simulation"
  | "Dashboard Critique"
  | "Excel Challenge"
  | "Requirements Case"
  | "User Story Exercise"
  | "Notebook Task"
  | "Debugging Exercise";

export type PathTrack = "Data Analyst" | "Business Analyst" | "Data Scientist";

export interface Lab {
  id: LabId;
  title: string;
  role: PathTrack[];
  skill: string;
  difficulty: LabDifficulty;
  estimatedTime: string;
  brief: string;
  datasetDescription: string;
  expectedOutput: string;
  instructions: string[];
  starterPrompt: string;
  rubricId: RubricId;

  // Compatibility fields used by existing route components.
  description: string;
  format: LabFormat;
  estimatedDuration: string;
  skills: string[];
  trackFit: PathTrack[];
  datasetContext: string;
  deliverables: string[];
  portfolioOutput: string;
}

export const labs: Lab[] = [
  {
    id: "sql-join-challenge",
    title: "SQL Join Challenge",
    role: ["Data Analyst", "Business Analyst"],
    skill: "SQL",
    difficulty: "Beginner",
    estimatedTime: "45-60 minutes",
    brief:
      "Join customer, order, and refund signals to identify revenue leakage and explain which segment needs follow-up.",
    datasetDescription:
      "Customer orders, refund events, acquisition channels, customer segments, retained revenue, and account cohort attributes.",
    expectedOutput:
      "A working SQL query, result table, and concise business readout that names the highest-priority segment.",
    instructions: [
      "Identify the grain of each table or source view.",
      "Join the relevant customer and revenue signals.",
      "Aggregate leakage by segment or region.",
      "Write a three-sentence stakeholder readout.",
    ],
    starterPrompt:
      "Find the segment with the strongest retained-revenue leakage and explain the business follow-up.",
    rubricId: "sql-analysis",
    description:
      "Join customer, order, and refund signals to identify revenue leakage and explain which segment needs follow-up.",
    format: "SQL Challenge",
    estimatedDuration: "45-60 minutes",
    skills: ["SQL", "SQL joins", "Aggregation", "Revenue analysis", "Result interpretation"],
    trackFit: ["Data Analyst", "Business Analyst"],
    datasetContext:
      "Customer orders, refund events, acquisition channels, customer segments, retained revenue, and account cohort attributes.",
    deliverables: ["Working SQL query", "Result table", "Three-sentence business readout"],
    portfolioOutput: "A concise SQL evidence card showing revenue leakage by customer segment.",
  },
  {
    id: "churn-diagnostic-simulation",
    title: "Churn Diagnostic Simulation",
    role: ["Data Analyst", "Data Scientist"],
    skill: "SQL",
    difficulty: "Intermediate",
    estimatedTime: "70-90 minutes",
    brief:
      "Diagnose where churn risk is concentrated and translate the evidence into an intervention recommendation.",
    datasetDescription:
      "Account cohorts with onboarding bands, segments, retained revenue, prior revenue, churn flags, and risk scores.",
    expectedOutput:
      "A churn diagnosis, evidence table, key pattern summary, and recommended intervention.",
    instructions: [
      "Slice churn risk by onboarding band, segment, and region.",
      "Compare retained revenue against prior retained revenue.",
      "Name the highest-risk pattern and the likely business cause.",
      "Recommend one measurable intervention.",
    ],
    starterPrompt:
      "Where is churn risk most concentrated, and what action should the business take first?",
    rubricId: "sql-analysis",
    description:
      "Diagnose where churn risk is concentrated and translate the evidence into an intervention recommendation.",
    format: "Diagnostic Simulation",
    estimatedDuration: "70-90 minutes",
    skills: ["SQL", "Cohort analysis", "Churn diagnosis", "Business recommendation"],
    trackFit: ["Data Analyst", "Data Scientist"],
    datasetContext:
      "Account cohorts with onboarding bands, segments, retained revenue, prior revenue, churn flags, and risk scores.",
    deliverables: ["Diagnostic SQL", "Result table", "Key pattern summary", "Recommendation"],
    portfolioOutput: "A churn diagnostic memo with evidence, interpretation, and action priority.",
  },
  {
    id: "sales-dashboard-critique",
    title: "Dashboard Critique Lab",
    role: ["Data Analyst", "Business Analyst"],
    skill: "Power BI",
    difficulty: "Beginner",
    estimatedTime: "40-55 minutes",
    brief:
      "Review a cluttered sales dashboard and turn it into a clearer executive decision surface.",
    datasetDescription:
      "A sales performance dashboard with pipeline, win rate, revenue, activity, stage movement, and territory metrics.",
    expectedOutput:
      "A dashboard issue list, revised metric hierarchy, and stakeholder-ready improvement recommendation.",
    instructions: [
      "Identify the dashboard audience and primary decision.",
      "Flag metrics that are unclear, redundant, or low-action.",
      "Reorder metrics into an executive decision flow.",
      "Recommend visual and narrative improvements.",
    ],
    starterPrompt:
      "What should the sales leader see first, and which dashboard elements should move down or disappear?",
    rubricId: "dashboard-critique",
    description:
      "Review a cluttered sales dashboard and turn it into a clearer executive decision surface.",
    format: "Dashboard Critique",
    estimatedDuration: "40-55 minutes",
    skills: ["Power BI", "Dashboard critique", "Metric hierarchy", "Stakeholder communication", "Executive framing"],
    trackFit: ["Data Analyst", "Business Analyst"],
    datasetContext:
      "Mock sales dashboard with pipeline, win rate, revenue, activity, stage movement, and territory metrics.",
    deliverables: ["Dashboard issue list", "Priority fixes", "Revised metric hierarchy"],
    portfolioOutput: "A before-and-after dashboard critique memo for sales leadership.",
  },
  {
    id: "excel-cleaning-challenge",
    title: "Excel Cleaning Challenge",
    role: ["Data Analyst", "Business Analyst"],
    skill: "Excel",
    difficulty: "Beginner",
    estimatedTime: "45-60 minutes",
    brief:
      "Clean a messy operational spreadsheet so it can support reliable reporting and stakeholder decisions.",
    datasetDescription:
      "Spreadsheet export with duplicate rows, inconsistent dates, missing categories, currency formatting issues, and free-text status fields.",
    expectedOutput:
      "A cleaned data dictionary, transformation notes, and a quality-check summary.",
    instructions: [
      "Identify duplicate, missing, and inconsistent records.",
      "Standardize fields needed for reporting.",
      "Document cleaning decisions and assumptions.",
      "Summarize remaining data quality risks.",
    ],
    starterPrompt:
      "Prepare this spreadsheet for analysis and document what changed so another analyst can trust it.",
    rubricId: "universal-analyst-rubric",
    description:
      "Clean a messy operational spreadsheet so it can support reliable reporting and stakeholder decisions.",
    format: "Excel Challenge",
    estimatedDuration: "45-60 minutes",
    skills: ["Excel", "Data cleaning", "Data quality", "Documentation"],
    trackFit: ["Data Analyst", "Business Analyst"],
    datasetContext:
      "Spreadsheet export with duplicate rows, inconsistent dates, missing categories, currency formatting issues, and free-text status fields.",
    deliverables: ["Cleaned table", "Cleaning log", "Data quality summary"],
    portfolioOutput: "A data-cleaning evidence note showing spreadsheet judgment and documentation quality.",
  },
  {
    id: "ba-requirements-case",
    title: "BA Requirement Mapping Case",
    role: ["Business Analyst"],
    skill: "Requirements",
    difficulty: "Intermediate",
    estimatedTime: "60-75 minutes",
    brief:
      "Turn a vague stakeholder request into requirements, acceptance criteria, assumptions, and open questions.",
    datasetDescription:
      "Stakeholder notes for a discount approval workflow with unclear roles, thresholds, exception reasons, and SLA ownership.",
    expectedOutput:
      "A scoped requirement map with functional requirements, acceptance criteria, and unresolved decisions.",
    instructions: [
      "Clarify the business goal and stakeholder groups.",
      "Separate requirements from assumptions and open questions.",
      "Write testable acceptance criteria.",
      "Call out edge cases and scope boundaries.",
    ],
    starterPrompt:
      "Map the stakeholder request into implementation-ready requirements without overbuilding the workflow.",
    rubricId: "business-analysis",
    description:
      "Turn a vague stakeholder request into requirements, acceptance criteria, assumptions, and open questions.",
    format: "Requirements Case",
    estimatedDuration: "60-75 minutes",
    skills: ["Requirements", "Requirements writing", "Acceptance criteria", "Stakeholder analysis", "Scope control"],
    trackFit: ["Business Analyst"],
    datasetContext:
      "Stakeholder notes for a discount approval workflow with unclear roles, thresholds, exception reasons, and SLA ownership.",
    deliverables: ["Problem statement", "Functional requirements", "Acceptance criteria", "Open questions"],
    portfolioOutput: "A polished requirements brief suitable for a business analyst portfolio.",
  },
  {
    id: "user-story-builder",
    title: "User Story Builder",
    role: ["Business Analyst"],
    skill: "Communication",
    difficulty: "Beginner",
    estimatedTime: "35-50 minutes",
    brief:
      "Convert process needs into user stories, acceptance criteria, and a release-ready backlog slice.",
    datasetDescription:
      "Interview notes from students, placement coordinators, and recruiters describing a broken interview scheduling workflow.",
    expectedOutput:
      "A prioritized set of user stories with personas, acceptance criteria, and implementation notes.",
    instructions: [
      "Identify the actor, need, and value for each story.",
      "Write stories in a consistent format.",
      "Add acceptance criteria and edge cases.",
      "Prioritize the stories into a first release slice.",
    ],
    starterPrompt:
      "Write user stories that make the placement scheduling workflow clear enough for a product team to build.",
    rubricId: "business-analysis",
    description:
      "Convert process needs into user stories, acceptance criteria, and a release-ready backlog slice.",
    format: "User Story Exercise",
    estimatedDuration: "35-50 minutes",
    skills: ["Communication", "User stories", "Acceptance criteria", "Prioritization"],
    trackFit: ["Business Analyst"],
    datasetContext:
      "Interview notes from students, placement coordinators, and recruiters describing a broken interview scheduling workflow.",
    deliverables: ["User story set", "Acceptance criteria", "Priority notes"],
    portfolioOutput: "A user-story backlog sample that shows clear BA communication and scope judgment.",
  },
  {
    id: "python-eda-notebook-task",
    title: "Python EDA Notebook Task",
    role: ["Data Analyst", "Data Scientist"],
    skill: "Python",
    difficulty: "Intermediate",
    estimatedTime: "90-120 minutes",
    brief:
      "Explore a messy customer activity dataset and identify patterns that could guide retention experiments.",
    datasetDescription:
      "Customer product usage, plan type, support activity, onboarding completion, activity frequency, and retention status.",
    expectedOutput:
      "A clean notebook with data quality notes, exploratory charts, findings, and experiment hypotheses.",
    instructions: [
      "Inspect schema, missing values, and suspicious records.",
      "Create useful behavioral cuts and summaries.",
      "Visualize patterns tied to retention or placement outcomes.",
      "Write insight notes and experiment ideas.",
    ],
    starterPrompt:
      "Use Python to discover which behavioral signals deserve deeper investigation and explain why.",
    rubricId: "python-eda",
    description:
      "Explore a messy customer activity dataset and identify patterns that could guide retention experiments.",
    format: "Notebook Task",
    estimatedDuration: "90-120 minutes",
    skills: ["Python", "Pandas", "EDA", "Visualization", "Insight synthesis"],
    trackFit: ["Data Analyst", "Data Scientist"],
    datasetContext:
      "Customer product usage, plan type, support activity, onboarding completion, activity frequency, and retention status.",
    deliverables: ["Clean notebook", "Data quality notes", "Exploratory charts", "Insight summary"],
    portfolioOutput: "A recruiter-readable EDA notebook with retention pattern findings.",
  },
  {
    id: "debugging-broken-sql-query",
    title: "Broken SQL Debugging Drill",
    role: ["Data Analyst", "Data Scientist"],
    skill: "SQL",
    difficulty: "Intermediate",
    estimatedTime: "45-70 minutes",
    brief:
      "Repair a broken cohort query, explain the root cause, and validate that the fixed output answers the original question.",
    datasetDescription:
      "Subscription cohorts with signup dates, invoices, onboarding bands, churn flags, retained revenue, and risk scores.",
    expectedOutput:
      "A fixed SQL query, bug explanation, validation note, and business summary.",
    instructions: [
      "Identify why the query is failing or misleading.",
      "Repair grouping, filters, joins, or calculations.",
      "Validate that the output matches the business question.",
      "Explain the fix in plain analyst language.",
    ],
    starterPrompt:
      "Debug the cohort query and prove the corrected output can support a business decision.",
    rubricId: "sql-analysis",
    description:
      "Repair a broken cohort query, explain the root cause, and validate that the fixed output answers the original question.",
    format: "Debugging Exercise",
    estimatedDuration: "45-70 minutes",
    skills: ["SQL", "SQL debugging", "Cohort logic", "Validation", "Technical explanation"],
    trackFit: ["Data Analyst", "Data Scientist"],
    datasetContext:
      "Subscription cohorts with signup dates, invoices, onboarding bands, churn flags, retained revenue, and risk scores.",
    deliverables: ["Fixed SQL query", "Bug explanation", "Validation notes", "Business summary"],
    portfolioOutput: "A debugging case note showing SQL reasoning and validation discipline.",
  },
];
