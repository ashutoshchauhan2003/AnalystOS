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
    title: "Answer Business Questions With Tables",
    description:
      "Use simple filters, table connections, and groups to answer a business question.",
    skills: ["SQL basics", "Combining tables", "Grouping results", "Checking answers"],
    labIds: ["sql-join-challenge", "debugging-broken-sql-query"],
  },
  {
    id: "da-week-02-diagnostics",
    title: "Find Customer Risk Patterns",
    description:
      "Compare customer groups and explain where the team should act first.",
    skills: ["Finding patterns", "Comparing groups", "Writing insights"],
    labIds: ["churn-diagnostic-simulation"],
  },
  {
    id: "da-week-03-dashboard-judgment",
    title: "Make Dashboards Easier To Read",
    description:
      "Spot confusing dashboard parts and choose what should appear first.",
    skills: ["Dashboard reading", "Choosing key numbers", "Clear layout"],
    labIds: ["sales-dashboard-critique"],
  },
  {
    id: "da-week-04-cleaning-and-eda",
    title: "Clean Data And Explain Patterns",
    description:
      "Prepare messy data, find patterns, and turn the result into simple proof.",
    skills: ["Excel", "Python basics", "Finding patterns", "Recommendations"],
    labIds: ["excel-cleaning-challenge", "python-eda-notebook-task"],
  },
];

const businessAnalystModules: PathModule[] = [
  {
    id: "ba-week-01-problem-framing",
    title: "Understand The Business Problem",
    description:
      "Clarify the goal, who needs help, and what decision must be made.",
    skills: ["Problem framing", "User needs", "Keeping scope small"],
    labIds: ["ba-requirements-case"],
  },
  {
    id: "ba-week-02-requirements-mapping",
    title: "Write Clear Build Steps",
    description:
      "Write clear requirements, simple success checks, and open questions.",
    skills: ["Requirements", "Success checks", "Open questions"],
    labIds: ["ba-requirements-case"],
  },
  {
    id: "ba-week-03-user-stories",
    title: "Write User Stories",
    description:
      "Turn user needs into short stories a product team can build.",
    skills: ["User stories", "Prioritization", "Communication"],
    labIds: ["user-story-builder"],
  },
  {
    id: "ba-week-04-decision-surfaces",
    title: "Make Reports Useful For Teams",
    description:
      "Improve dashboards and reports so teams know what to do next.",
    skills: ["Dashboard reading", "Clear numbers", "Business writing"],
    labIds: ["sales-dashboard-critique", "excel-cleaning-challenge"],
  },
];

const dataScientistModules: PathModule[] = [
  {
    id: "ds-week-01-python-eda",
    title: "Explore Data With Python",
    description:
      "Use notebooks to inspect, clean, chart, and summarize data.",
    skills: ["Python basics", "Notebook work", "Data checks", "Charts"],
    labIds: ["python-eda-notebook-task"],
  },
  {
    id: "ds-week-02-sql-validation",
    title: "Check And Fix SQL Answers",
    description:
      "Check that a query is correct and fix it when it is not.",
    skills: ["Fixing SQL", "Checking logic", "Explaining fixes"],
    labIds: ["debugging-broken-sql-query", "churn-diagnostic-simulation"],
  },
  {
    id: "ds-week-03-feature-reasoning",
    title: "Choose Useful Data Clues",
    description:
      "Turn patterns into useful clues and simple test ideas.",
    skills: ["Finding clues", "Grouping users", "Testing ideas"],
    labIds: ["python-eda-notebook-task", "excel-cleaning-challenge"],
  },
  {
    id: "ds-week-04-model-communication",
    title: "Explain Results To Non-Technical People",
    description:
      "Explain results, risks, and next steps in plain language.",
    skills: ["Explaining results", "Testing ideas", "Business communication"],
    labIds: ["user-story-builder", "churn-diagnostic-simulation"],
  },
];

export const analystPaths: AnalystPath[] = [
  {
    id: "data-analyst",
    title: "Data Analyst",
    subtitle: "Learn tables, spreadsheets, dashboards, and simple business explanations.",
    description:
      "A practical track for beginners who want to answer business questions with tables, dashboards, and plain explanations.",
    roleFit: ["Junior Data Analyst", "Business Intelligence Analyst", "Product Analyst", "Operations Analyst"],
    skills: [
      "SQL",
      "Cleaning data",
      "Reading dashboards",
      "Excel",
      "Finding patterns",
      "Comparing groups",
      "Explaining insights",
    ],
    tools: ["SQL", "Excel", "Power BI", "Python", "Notebooks"],
    weeklyModules: dataAnalystModules,
    difficulty: "Intermediate",
    estimatedDuration: "8-10 weeks",
    portfolioOutcome:
      "A proof page with table answers, a dashboard improvement task, and a clear business recommendation.",
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
      "A proof page with table answers, a dashboard improvement task, and a clear business recommendation.",
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
    subtitle: "Learn clear requirements, user stories, and simple process improvement.",
    description:
      "A beginner-friendly track for learners who want to turn messy business requests into clear steps.",
    roleFit: ["Business Analyst", "Product Analyst", "Operations Analyst", "Implementation Analyst"],
    skills: [
      "Requirements",
      "Understanding users",
      "Success checks",
      "User stories",
      "Process mapping",
      "Reading dashboards",
      "Business communication",
    ],
    tools: ["Excel", "Process maps", "User stories", "Acceptance criteria", "Dashboards"],
    weeklyModules: businessAnalystModules,
    difficulty: "Beginner",
    estimatedDuration: "6-8 weeks",
    portfolioOutcome:
      "A proof page with requirements, user stories, process fixes, and a guided placement project.",
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
      "A proof page with requirements, user stories, process fixes, and a guided placement project.",
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
    subtitle: "Learn Python basics, data exploration, checks, and simple result explanations.",
    description:
      "A guided track for learners who want to explore data, find patterns, and explain results clearly.",
    roleFit: ["Junior Data Scientist", "Machine Learning Analyst", "Applied Data Analyst", "Decision Scientist"],
    skills: [
      "Python",
      "Pandas",
      "Finding patterns",
      "Choosing useful clues",
      "Checking SQL",
      "Grouping users",
      "Explaining model results",
      "Testing ideas",
    ],
    tools: ["Python", "Pandas", "SQL", "Notebooks", "Visualization"],
    weeklyModules: dataScientistModules,
    difficulty: "Advanced",
    estimatedDuration: "10-12 weeks",
    portfolioOutcome:
      "A proof page with a notebook, pattern findings, simple model explanation, and next-step recommendations.",
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
      "A proof page with a notebook, pattern findings, simple model explanation, and next-step recommendations.",
    recommendedLabIds: [
      "python-eda-notebook-task",
      "debugging-broken-sql-query",
      "churn-diagnostic-simulation",
      "excel-cleaning-challenge",
      "sql-join-challenge",
    ],
  },
];
