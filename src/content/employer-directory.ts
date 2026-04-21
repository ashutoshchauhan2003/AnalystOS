export type EmployerCandidate = {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  featuredProject: string;
  projectHighlight: string;
  metrics: { label: string; value: string }[];
  badges: string[];
  profileHref: string;
};

export const employerDirectory = {
  title: "Employer Directory",
  summary:
    "A recruiter-facing discovery surface for scanning analyst candidates by proof-of-skill, featured work, and hiring signal.",
  searchPlaceholder: "Search by skill, project, or analyst name",
  filters: {
    role: ["Business Analyst", "Data Analyst", "Product Analyst"],
    proof: ["SQL", "Case Study", "Dashboard", "Recommendation"],
    readiness: ["Interview Ready", "Portfolio Strong", "High Signal"],
  },
};

export const employerCandidates: EmployerCandidate[] = [
  {
    id: "candidate-ash",
    name: "Ash Chauhan",
    title: "Business Analyst",
    location: "India",
    skills: ["SQL", "Cohort Analysis", "Executive Storytelling", "Retention"],
    featuredProject: "Churn Retention Simulation",
    projectHighlight: "Turned a broad churn concern into a cohort-level recommendation with one-quarter intervention framing.",
    metrics: [
      { label: "Recruiter Signal", value: "91" },
      { label: "Case Studies", value: "3" },
      { label: "SQL Readiness", value: "Advanced" },
    ],
    badges: ["Interview Ready", "Strong Business Reasoning", "Portfolio Strong"],
    profileHref: "/case-studies/churn-retention-simulation",
  },
  {
    id: "candidate-mira",
    name: "Mira Patel",
    title: "Product Analyst",
    location: "Remote",
    skills: ["Funnel Analysis", "Experiment Readouts", "SQL", "Stakeholder Reporting"],
    featuredProject: "Activation Funnel Breakdown",
    projectHighlight: "Identified the drop-off stage most responsible for activation loss and reframed the dashboard into a decision path.",
    metrics: [
      { label: "Recruiter Signal", value: "88" },
      { label: "Featured Projects", value: "4" },
      { label: "Story Clarity", value: "High" },
    ],
    badges: ["Interview Ready", "Product Focus", "Dashboard Strong"],
    profileHref: "/case-studies/churn-retention-simulation",
  },
  {
    id: "candidate-ryan",
    name: "Ryan Dsouza",
    title: "Data Analyst",
    location: "Bangalore",
    skills: ["SQL", "Revenue Diagnostics", "BI Dashboards", "Forecasting"],
    featuredProject: "Revenue Leakage Review",
    projectHighlight: "Connected leakage across lifecycle stages to a shortlist of operational fixes and a cleaner executive reporting structure.",
    metrics: [
      { label: "Recruiter Signal", value: "86" },
      { label: "BI Artifacts", value: "5" },
      { label: "SQL Readiness", value: "Strong" },
    ],
    badges: ["High Signal", "BI Focus", "Revenue Analysis"],
    profileHref: "/case-studies/churn-retention-simulation",
  },
  {
    id: "candidate-sana",
    name: "Sana Verma",
    title: "Business Analyst",
    location: "Remote",
    skills: ["Process Mapping", "SQL", "Operations Analytics", "Executive Recommendations"],
    featuredProject: "Support Escalation Prioritization",
    projectHighlight: "Converted noisy support operations into a prioritization model with clear analyst recommendations for leadership review.",
    metrics: [
      { label: "Recruiter Signal", value: "89" },
      { label: "Case Studies", value: "2" },
      { label: "Ops Focus", value: "High" },
    ],
    badges: ["Interview Ready", "Operations Lens", "Recommendation Strong"],
    profileHref: "/case-studies/churn-retention-simulation",
  },
];
