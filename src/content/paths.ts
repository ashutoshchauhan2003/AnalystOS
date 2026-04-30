import type { CapstoneId } from "@/content/capstones";
import type { LabId, PathTrack } from "@/content/labs";

export type PathId = "data-analyst" | "business-analyst" | "data-scientist";

export type PathDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface PathModule {
  id: string;
  title: string;
  description: string;
  skills: string[];
  labIds: LabId[];
}

export interface AnalystPath {
  id: PathId;
  title: PathTrack;
  subtitle: string;
  description: string;
  roleFit: string[];
  skills: string[];
  tools: string[];
  weeklyModules: PathModule[];
  difficulty: PathDifficulty;
  estimatedDuration: string;
  portfolioOutcome: string;
  recommendedLabs: LabId[];
  capstoneId: CapstoneId;

  // Compatibility fields used by existing route components.
  modules: PathModule[];
  portfolioOutput: string;
  recommendedLabIds: LabId[];
}

const dataAnalystModules: PathModule[] = [
  {
    id: "da-week-01-sql-evidence",
    title: "SQL Evidence For Business Questions",
    description:
      "Use joins, filters, and grouped analysis to turn raw tables into decision-ready outputs.",
    skills: ["SQL", "Joins", "Aggregation", "Result validation"],
    labIds: ["sql-join-challenge", "debugging-broken-sql-query"],
  },
  {
    id: "da-week-02-diagnostics",
    title: "Diagnostic Analysis And Churn Signals",
    description:
      "Diagnose concentration, compare segments, and explain where the business should act first.",
    skills: ["Cohort analysis", "Variance analysis", "Insight writing"],
    labIds: ["churn-diagnostic-simulation"],
  },
  {
    id: "da-week-03-dashboard-judgment",
    title: "Dashboard Judgment And Metric Hierarchy",
    description:
      "Evaluate dashboard quality, metric hierarchy, scanability, and stakeholder usefulness.",
    skills: ["Power BI", "Dashboard critique", "Metric hierarchy"],
    labIds: ["sales-dashboard-critique"],
  },
  {
    id: "da-week-04-cleaning-and-eda",
    title: "Cleaning, EDA, And Portfolio Synthesis",
    description:
      "Prepare messy data, explore patterns, and convert the analysis into portfolio-ready evidence.",
    skills: ["Excel", "Python", "EDA", "Business recommendation"],
    labIds: ["excel-cleaning-challenge", "python-eda-notebook-task"],
  },
];

const businessAnalystModules: PathModule[] = [
  {
    id: "ba-week-01-problem-framing",
    title: "Problem Framing And Stakeholder Context",
    description:
      "Clarify business goals, users, constraints, and the decisions a solution must support.",
    skills: ["Problem framing", "Stakeholder analysis", "Scope control"],
    labIds: ["ba-requirements-case"],
  },
  {
    id: "ba-week-02-requirements-mapping",
    title: "Requirement Mapping And Acceptance Criteria",
    description:
      "Write functional requirements, assumptions, acceptance criteria, and open questions.",
    skills: ["Requirements", "Acceptance criteria", "Edge cases"],
    labIds: ["ba-requirements-case"],
  },
  {
    id: "ba-week-03-user-stories",
    title: "User Stories And Delivery Backlog",
    description:
      "Convert stakeholder needs into release-ready user stories and prioritized scope.",
    skills: ["User stories", "Prioritization", "Communication"],
    labIds: ["user-story-builder"],
  },
  {
    id: "ba-week-04-decision-surfaces",
    title: "Decision Surfaces For Stakeholders",
    description:
      "Critique dashboards and reporting flows through the lens of stakeholder action.",
    skills: ["Dashboard critique", "Metric clarity", "Executive framing"],
    labIds: ["sales-dashboard-critique", "excel-cleaning-challenge"],
  },
];

const dataScientistModules: PathModule[] = [
  {
    id: "ds-week-01-python-eda",
    title: "Python EDA And Data Quality",
    description:
      "Use notebooks to inspect, clean, visualize, and summarize behavioral data.",
    skills: ["Python", "Pandas", "Data quality", "Visualization"],
    labIds: ["python-eda-notebook-task"],
  },
  {
    id: "ds-week-02-sql-validation",
    title: "SQL Validation And Debugging",
    description:
      "Validate upstream logic and debug analytical queries before modeling.",
    skills: ["SQL debugging", "Cohort logic", "Validation discipline"],
    labIds: ["debugging-broken-sql-query", "churn-diagnostic-simulation"],
  },
  {
    id: "ds-week-03-feature-reasoning",
    title: "Feature Reasoning And Readiness Signals",
    description:
      "Translate exploratory patterns into feature ideas, cohorts, and testable hypotheses.",
    skills: ["Feature exploration", "Segmentation", "Hypothesis framing"],
    labIds: ["python-eda-notebook-task", "excel-cleaning-challenge"],
  },
  {
    id: "ds-week-04-model-communication",
    title: "Model Communication And Business Action",
    description:
      "Explain model outputs, uncertainty, risks, and recommended interventions to non-technical users.",
    skills: ["Model interpretation", "Experiment framing", "Stakeholder communication"],
    labIds: ["user-story-builder", "churn-diagnostic-simulation"],
  },
];

export const analystPaths: AnalystPath[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    subtitle: "SQL, dashboards, Excel cleaning, and business insight for decision-ready analytics.",
    description:
      "A practical path for learners who want to answer business questions with SQL, dashboards, EDA, and concise stakeholder-ready insights.",
    roleFit: ["Junior Data Analyst", "Business Intelligence Analyst", "Product Analyst", "Operations Analyst"],
    skills: [
      "SQL",
      "Data cleaning",
      "Dashboard critique",
      "Excel",
      "EDA",
      "Cohort analysis",
      "Insight storytelling",
    ],
    tools: ["SQL", "Excel", "Power BI", "Python", "Notebooks"],
    weeklyModules: dataAnalystModules,
    difficulty: "Intermediate",
    estimatedDuration: "8-10 weeks",
    portfolioOutcome:
      "A recruiter-ready analytics portfolio with SQL evidence, a retail dashboard case, diagnostic reasoning, and a clear executive recommendation.",
    recommendedLabs: [
      "sql-join-challenge",
      "churn-diagnostic-simulation",
      "sales-dashboard-critique",
      "excel-cleaning-challenge",
      "python-eda-notebook-task",
      "debugging-broken-sql-query",
    ],
    capstoneId: "retail-operations-dashboard",
    modules: dataAnalystModules,
    portfolioOutput:
      "A recruiter-ready analytics portfolio with SQL evidence, a retail dashboard case, diagnostic reasoning, and a clear executive recommendation.",
    recommendedLabIds: [
      "sql-join-challenge",
      "churn-diagnostic-simulation",
      "sales-dashboard-critique",
      "excel-cleaning-challenge",
      "python-eda-notebook-task",
      "debugging-broken-sql-query",
    ],
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    subtitle: "Requirements, process clarity, user stories, and stakeholder-ready delivery artifacts.",
    description:
      "A requirements and decision-support path for learners who want to clarify messy business problems and translate them into useful workflows.",
    roleFit: ["Business Analyst", "Product Analyst", "Operations Analyst", "Implementation Analyst"],
    skills: [
      "Requirements",
      "Stakeholder analysis",
      "Acceptance criteria",
      "User stories",
      "Process mapping",
      "Dashboard critique",
      "Business communication",
    ],
    tools: ["Excel", "Process maps", "User stories", "Acceptance criteria", "Dashboards"],
    weeklyModules: businessAnalystModules,
    difficulty: "Beginner",
    estimatedDuration: "6-8 weeks",
    portfolioOutcome:
      "A business analyst requirements portfolio with stakeholder framing, user stories, process redesign, and a university placement capstone.",
    recommendedLabs: [
      "ba-requirements-case",
      "user-story-builder",
      "sales-dashboard-critique",
      "excel-cleaning-challenge",
      "sql-join-challenge",
    ],
    capstoneId: "university-placement-process-redesign",
    modules: businessAnalystModules,
    portfolioOutput:
      "A business analyst requirements portfolio with stakeholder framing, user stories, process redesign, and a university placement capstone.",
    recommendedLabIds: [
      "ba-requirements-case",
      "user-story-builder",
      "sales-dashboard-critique",
      "excel-cleaning-challenge",
      "sql-join-challenge",
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    subtitle: "Python EDA, feature reasoning, validation, and interpretable model communication.",
    description:
      "A job-ready applied analytics path for learners who want to explore data, build interpretable models, and frame experiments from evidence.",
    roleFit: ["Junior Data Scientist", "Machine Learning Analyst", "Applied Data Analyst", "Decision Scientist"],
    skills: [
      "Python",
      "Pandas",
      "EDA",
      "Feature exploration",
      "SQL validation",
      "Segmentation",
      "Model interpretation",
      "Experiment framing",
    ],
    tools: ["Python", "Pandas", "SQL", "Notebooks", "Visualization"],
    weeklyModules: dataScientistModules,
    difficulty: "Advanced",
    estimatedDuration: "10-12 weeks",
    portfolioOutcome:
      "A graduate placement prediction portfolio case with EDA, feature reasoning, baseline model interpretation, and intervention recommendations.",
    recommendedLabs: [
      "python-eda-notebook-task",
      "debugging-broken-sql-query",
      "churn-diagnostic-simulation",
      "excel-cleaning-challenge",
      "sql-join-challenge",
    ],
    capstoneId: "graduate-placement-prediction-model",
    modules: dataScientistModules,
    portfolioOutput:
      "A graduate placement prediction portfolio case with EDA, feature reasoning, baseline model interpretation, and intervention recommendations.",
    recommendedLabIds: [
      "python-eda-notebook-task",
      "debugging-broken-sql-query",
      "churn-diagnostic-simulation",
      "excel-cleaning-challenge",
      "sql-join-challenge",
    ],
  },
];
