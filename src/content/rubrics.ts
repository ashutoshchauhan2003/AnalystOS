export type RubricId =
  | "universal-analyst-rubric"
  | "sql-analysis"
  | "dashboard-critique"
  | "business-analysis"
  | "python-eda"
  | "portfolio-capstone";

export type RubricLevel = "Needs Work" | "Developing" | "Job Ready" | "Excellent";

export interface RubricCriterion {
  id: string;
  label: string;
  description: string;
  weight: number;
}

export interface Rubric {
  id: RubricId;
  title: string;
  description: string;
  passingLevel: RubricLevel;
  criteria: RubricCriterion[];
}

export const universalRubricCriteria: RubricCriterion[] = [
  {
    id: "problem-framing",
    label: "Problem framing",
    description:
      "Clarifies the business question, audience, constraints, assumptions, and decision context before solving.",
    weight: 18,
  },
  {
    id: "technical-correctness",
    label: "Technical correctness",
    description:
      "Uses correct logic, calculations, query structure, analysis methods, and validation checks for the task.",
    weight: 20,
  },
  {
    id: "data-handling-requirements-quality",
    label: "Data handling / requirements quality",
    description:
      "Handles source data, requirements, edge cases, and quality risks with enough discipline to support the recommendation.",
    weight: 18,
  },
  {
    id: "communication-clarity",
    label: "Communication clarity",
    description:
      "Explains the work in clean stakeholder language with strong hierarchy, concise evidence, and clear next steps.",
    weight: 16,
  },
  {
    id: "business-relevance",
    label: "Business relevance",
    description:
      "Connects findings to business impact, operational tradeoffs, stakeholder value, and a useful decision.",
    weight: 16,
  },
  {
    id: "debugging-iteration-evidence",
    label: "Debugging / iteration evidence",
    description:
      "Shows checks, revisions, tradeoffs, debugging notes, or iteration history that makes the final answer trustworthy.",
    weight: 12,
  },
];

export const rubrics: Rubric[] = [
  {
    id: "universal-analyst-rubric",
    title: "Universal AnalystOS Rubric",
    description:
      "Universal AnalystOS scoring model for labs, submissions, reviews, and portfolio-ready artifacts.",
    passingLevel: "Job Ready",
    criteria: universalRubricCriteria,
  },
  {
    id: "sql-analysis",
    title: "SQL Analysis Rubric",
    description:
      "Evaluates SQL logic, analytical framing, result interpretation, and communication quality.",
    passingLevel: "Job Ready",
    criteria: universalRubricCriteria,
  },
  {
    id: "dashboard-critique",
    title: "Dashboard Critique Rubric",
    description:
      "Evaluates whether a learner can diagnose dashboard issues and recommend cleaner decision surfaces.",
    passingLevel: "Job Ready",
    criteria: universalRubricCriteria,
  },
  {
    id: "business-analysis",
    title: "Business Analysis Rubric",
    description:
      "Evaluates requirements thinking, stakeholder framing, assumptions, constraints, and acceptance criteria.",
    passingLevel: "Job Ready",
    criteria: universalRubricCriteria,
  },
  {
    id: "python-eda",
    title: "Python EDA Rubric",
    description:
      "Evaluates notebook structure, data cleaning, exploration depth, visualization, and insight quality.",
    passingLevel: "Job Ready",
    criteria: universalRubricCriteria,
  },
  {
    id: "portfolio-capstone",
    title: "Portfolio Capstone Rubric",
    description:
      "Evaluates whether a finished project is credible, polished, and useful as recruiter-facing proof.",
    passingLevel: "Job Ready",
    criteria: universalRubricCriteria,
  },
];
