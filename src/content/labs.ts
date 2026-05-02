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
  | "Guided Practice"
  | "Diagnostic Simulation"
  | "Dashboard Fix"
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
    title: "Combine Two Tables",
    role: ["Data Analyst", "Business Analyst"],
    skill: "SQL",
    difficulty: "Beginner",
    estimatedTime: "45-60 minutes",
    brief:
      "Combine simple customer and order tables to find where money is being lost.",
    datasetDescription:
      "Customer orders, refunds, customer groups, and revenue fields.",
    expectedOutput:
      "A working answer, a small results table, and three plain sentences about what to fix first.",
    instructions: [
      "Read the question and identify the tables you need.",
      "Connect the customer and revenue information.",
      "Group the results by customer type or region.",
      "Write three simple sentences explaining what you found.",
    ],
    starterPrompt:
      "Find the customer group losing the most money and explain what the team should do next.",
    rubricId: "sql-analysis",
    description:
      "Combine simple customer and order tables to find where money is being lost.",
    format: "SQL Challenge",
    estimatedDuration: "45-60 minutes",
    skills: ["SQL basics", "Combining tables", "Grouping results", "Explaining results"],
    trackFit: ["Data Analyst", "Business Analyst"],
    datasetContext:
      "Customer orders, refunds, customer groups, and revenue fields.",
    deliverables: ["Working answer", "Result table", "Three-sentence explanation"],
    portfolioOutput: "A simple proof card showing where revenue is dropping.",
  },
  {
    id: "churn-diagnostic-simulation",
    title: "Find At-Risk Customers",
    role: ["Data Analyst", "Data Scientist"],
    skill: "SQL",
    difficulty: "Intermediate",
    estimatedTime: "70-90 minutes",
    brief:
      "Find which customers may leave and suggest one helpful action.",
    datasetDescription:
      "Customer groups, onboarding progress, revenue, and risk scores.",
    expectedOutput:
      "A short risk summary, a small evidence table, and one suggested action.",
    instructions: [
      "Compare risk by customer group and region.",
      "Check where revenue has dropped.",
      "Name the clearest risk pattern.",
      "Suggest one action the team can measure.",
    ],
    starterPrompt:
      "Which customers are most likely to leave, and what should the team try first?",
    rubricId: "sql-analysis",
    description:
      "Find which customers may leave and suggest one helpful action.",
    format: "Guided Practice",
    estimatedDuration: "70-90 minutes",
    skills: ["SQL basics", "Finding patterns", "Risk explanation", "Recommendation writing"],
    trackFit: ["Data Analyst", "Data Scientist"],
    datasetContext:
      "Customer groups, onboarding progress, revenue, and risk scores.",
    deliverables: ["Working answer", "Result table", "Risk summary", "Recommendation"],
    portfolioOutput: "A simple customer-risk note with evidence and next steps.",
  },
  {
    id: "sales-dashboard-critique",
    title: "Fix a Confusing Dashboard",
    role: ["Data Analyst", "Business Analyst"],
    skill: "Power BI",
    difficulty: "Beginner",
    estimatedTime: "40-55 minutes",
    brief:
      "Review a cluttered sales dashboard and make it easier to understand.",
    datasetDescription:
      "A sales dashboard with too many numbers, charts, and labels.",
    expectedOutput:
      "A list of confusing parts, a better order for the numbers, and one improvement plan.",
    instructions: [
      "Decide who will use the dashboard.",
      "Mark what is confusing or repeated.",
      "Put the most important numbers first.",
      "Suggest clearer labels, charts, or notes.",
    ],
    starterPrompt:
      "What should the sales leader see first, and what should be removed or moved down?",
    rubricId: "dashboard-critique",
    description:
      "Review a cluttered sales dashboard and make it easier to understand.",
    format: "Dashboard Fix",
    estimatedDuration: "40-55 minutes",
    skills: ["Dashboard reading", "Choosing key numbers", "Clear writing", "Business communication"],
    trackFit: ["Data Analyst", "Business Analyst"],
    datasetContext:
      "Mock sales dashboard with revenue, activity, sales stage, and region metrics.",
    deliverables: ["Issue list", "Priority fixes", "Better dashboard order"],
    portfolioOutput: "A before-and-after dashboard improvement note.",
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
    title: "Turn a Request Into Clear Steps",
    role: ["Business Analyst"],
    skill: "Requirements",
    difficulty: "Intermediate",
    estimatedTime: "60-75 minutes",
    brief:
      "Turn a vague business request into clear steps a team can build.",
    datasetDescription:
      "Stakeholder notes for a discount approval workflow with unclear roles, thresholds, exception reasons, and SLA ownership.",
    expectedOutput:
      "A simple requirement list, clear success checks, and open questions.",
    instructions: [
      "Write the business goal in one sentence.",
      "List what is known and what is unclear.",
      "Write simple checks for success.",
      "Name what is outside the first version.",
    ],
    starterPrompt:
      "Turn the request into simple build steps without adding extra work.",
    rubricId: "business-analysis",
    description:
      "Turn a vague business request into clear steps a team can build.",
    format: "Requirements Case",
    estimatedDuration: "60-75 minutes",
    skills: ["Writing requirements", "Asking questions", "Success checks", "Keeping scope small"],
    trackFit: ["Business Analyst"],
    datasetContext:
      "Stakeholder notes for a discount approval workflow with unclear roles, thresholds, exception reasons, and SLA ownership.",
    deliverables: ["Problem statement", "Requirement list", "Success checks", "Open questions"],
    portfolioOutput: "A clear business request document for Your Proof page.",
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
    title: "Explore Data in a Notebook",
    role: ["Data Analyst", "Data Scientist"],
    skill: "Python",
    difficulty: "Intermediate",
    estimatedTime: "90-120 minutes",
    brief:
      "Look through messy customer activity data and find useful patterns.",
    datasetDescription:
      "Customer product usage, plan type, support activity, onboarding completion, activity frequency, and retention status.",
    expectedOutput:
      "A notebook with clean notes, a few charts, findings, and ideas to test.",
    instructions: [
      "Check what columns exist and what is missing.",
      "Create simple groups and summaries.",
      "Make charts that reveal patterns.",
      "Write notes and ideas to test later.",
    ],
    starterPrompt:
      "Use Python to find patterns worth checking further and explain why.",
    rubricId: "python-eda",
    description:
      "Look through messy customer activity data and find useful patterns.",
    format: "Notebook Task",
    estimatedDuration: "90-120 minutes",
    skills: ["Python basics", "Notebook work", "Charts", "Finding patterns"],
    trackFit: ["Data Analyst", "Data Scientist"],
    datasetContext:
      "Customer product usage, plan type, support activity, onboarding completion, activity frequency, and retention status.",
    deliverables: ["Clean notebook", "Data notes", "Charts", "Pattern summary"],
    portfolioOutput: "A beginner-friendly notebook showing patterns and explanations.",
  },
  {
    id: "debugging-broken-sql-query",
    title: "Fix a Broken Query",
    role: ["Data Analyst", "Data Scientist"],
    skill: "SQL",
    difficulty: "Intermediate",
    estimatedTime: "45-70 minutes",
    brief:
      "Fix a broken SQL query and explain what was wrong in plain language.",
    datasetDescription:
      "Subscription cohorts with signup dates, invoices, onboarding bands, churn flags, retained revenue, and risk scores.",
    expectedOutput:
      "A fixed answer, what changed, a quick check, and a short business summary.",
    instructions: [
      "Find why the query is wrong.",
      "Fix the filter, grouping, join, or calculation.",
      "Check that the answer matches the question.",
      "Explain the fix in simple words.",
    ],
    starterPrompt:
      "Fix the query and show that the corrected answer can help a business decision.",
    rubricId: "sql-analysis",
    description:
      "Fix a broken SQL query and explain what was wrong in plain language.",
    format: "Debugging Exercise",
    estimatedDuration: "45-70 minutes",
    skills: ["SQL basics", "Fixing errors", "Checking answers", "Simple explanation"],
    trackFit: ["Data Analyst", "Data Scientist"],
    datasetContext:
      "Subscription cohorts with signup dates, invoices, onboarding bands, churn flags, retained revenue, and risk scores.",
    deliverables: ["Fixed query", "What was wrong", "Check notes", "Business summary"],
    portfolioOutput: "A simple proof note showing how you fixed a broken query.",
  },
];
