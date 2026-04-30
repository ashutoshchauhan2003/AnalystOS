import type { LabId, PathTrack } from "@/content/labs";
import type { RubricId } from "@/content/rubrics";

export type CapstoneId =
  | "retail-operations-dashboard"
  | "university-placement-process-redesign"
  | "graduate-placement-prediction-model";

export type CapstoneDifficulty = "Intermediate" | "Advanced";

export interface Capstone {
  id: CapstoneId;
  title: string;
  role: PathTrack;
  problemStatement: string;
  requiredArtefacts: string[];
  evaluationCriteria: string[];
  portfolioSummary: string;
  rubricId: RubricId;

  // Compatibility fields used by existing route components.
  path: PathTrack;
  description: string;
  difficulty: CapstoneDifficulty;
  estimatedDuration: string;
  prerequisiteLabIds: LabId[];
  skills: string[];
  milestones: string[];
  portfolioOutput: string;
}

export const capstones: Capstone[] = [
  {
    id: "retail-operations-dashboard",
    title: "Retail Operations Dashboard",
    role: "Data Analyst",
    problemStatement:
      "A regional retail team needs a weekly operating dashboard that explains revenue movement, stock pressure, and store-level intervention priorities.",
    requiredArtefacts: [
      "KPI definition sheet",
      "Cleaned operations dataset notes",
      "Dashboard wireframe or BI mock",
      "Executive readout with three recommended actions",
    ],
    evaluationCriteria: [
      "Clear operating question and metric hierarchy",
      "Accurate calculations and segmentation",
      "Readable dashboard structure",
      "Specific store or category recommendations",
      "Evidence that assumptions were checked",
    ],
    portfolioSummary:
      "A retail operations dashboard case study showing how raw store signals become an executive action surface.",
    rubricId: "portfolio-capstone",
    path: "Data Analyst",
    description:
      "Build a retail operations dashboard and decision memo from sales, inventory, and store performance data.",
    difficulty: "Intermediate",
    estimatedDuration: "1-2 weeks",
    prerequisiteLabIds: [
      "sql-join-challenge",
      "churn-diagnostic-simulation",
      "sales-dashboard-critique",
      "excel-cleaning-challenge",
      "debugging-broken-sql-query",
    ],
    skills: ["SQL", "Excel cleaning", "Dashboard design", "KPI hierarchy", "Executive recommendation"],
    milestones: [
      "Define the operating question and decision owner",
      "Clean and validate the weekly retail dataset",
      "Build a dashboard-ready metric hierarchy",
      "Write the executive action memo",
    ],
    portfolioOutput:
      "A recruiter-readable retail dashboard case with metrics, visuals, and operational recommendations.",
  },
  {
    id: "university-placement-process-redesign",
    title: "University Placement Process Redesign",
    role: "Business Analyst",
    problemStatement:
      "A university placement cell has fragmented student, recruiter, and interview workflows that cause missed follow-ups and weak placement visibility.",
    requiredArtefacts: [
      "Stakeholder map",
      "Current-state and future-state process notes",
      "Functional requirements",
      "User stories with acceptance criteria",
      "Implementation risk register",
    ],
    evaluationCriteria: [
      "Strong stakeholder and process framing",
      "Clear requirements without overbuilding",
      "Useful acceptance criteria and edge cases",
      "Business relevance for students, placement staff, and recruiters",
      "Evidence of iteration from ambiguity to scope",
    ],
    portfolioSummary:
      "A business analyst case pack that redesigns a university placement workflow into clear requirements and user stories.",
    rubricId: "portfolio-capstone",
    path: "Business Analyst",
    description:
      "Turn a messy placement workflow into a scoped process redesign, requirement pack, and user-story backlog.",
    difficulty: "Intermediate",
    estimatedDuration: "1-2 weeks",
    prerequisiteLabIds: [
      "ba-requirements-case",
      "user-story-builder",
      "sales-dashboard-critique",
      "excel-cleaning-challenge",
    ],
    skills: ["Requirements analysis", "Process mapping", "User stories", "Acceptance criteria", "Stakeholder communication"],
    milestones: [
      "Frame the placement process problem",
      "Map stakeholders, workflow gaps, and constraints",
      "Write requirements and user stories",
      "Package the redesign for leadership review",
    ],
    portfolioOutput:
      "A business analyst requirements portfolio piece for a university placement process redesign.",
  },
  {
    id: "graduate-placement-prediction-model",
    title: "Graduate Placement Prediction Model",
    role: "Data Scientist",
    problemStatement:
      "A career services team wants to identify placement readiness signals and predict which graduates may need targeted intervention before recruitment season.",
    requiredArtefacts: [
      "EDA notebook",
      "Feature quality notes",
      "Baseline prediction model",
      "Model interpretation summary",
      "Intervention recommendation memo",
    ],
    evaluationCriteria: [
      "Sound data quality and leakage checks",
      "Useful exploratory analysis",
      "Reasonable baseline model and validation logic",
      "Clear interpretation for non-technical stakeholders",
      "Business-safe recommendation for student support",
    ],
    portfolioSummary:
      "A graduate placement prediction case showing EDA, modeling judgment, interpretation, and intervention design.",
    rubricId: "portfolio-capstone",
    path: "Data Scientist",
    description:
      "Build an interpretable placement-readiness model and explain how career services should use the signal.",
    difficulty: "Advanced",
    estimatedDuration: "2-3 weeks",
    prerequisiteLabIds: [
      "python-eda-notebook-task",
      "debugging-broken-sql-query",
      "churn-diagnostic-simulation",
    ],
    skills: ["Python", "EDA", "Feature engineering", "Model interpretation", "Experiment framing"],
    milestones: [
      "Audit placement dataset quality",
      "Explore readiness and outcome patterns",
      "Build and validate a baseline model",
      "Translate predictions into intervention strategy",
    ],
    portfolioOutput:
      "A placement prediction model case study with notebook evidence, feature reasoning, and stakeholder recommendations.",
  },
];
