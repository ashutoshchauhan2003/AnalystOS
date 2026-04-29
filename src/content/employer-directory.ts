export type EmployerCandidate = {
  id: string;
  name: string;
  title: string;
  location: string;
  summary: string;
  recruiterFit: string;
  skills: string[];
  tools: string[];
  projects: string[];
  featuredProject: string;
  projectHighlight: string;
  caseStudyHref: string;
  metrics: { label: string; value: string }[];
  proofMetrics: { label: string; value: string; detail: string }[];
  badges: string[];
  profileHref: string;
  contactHref: string;
};

export const employerDirectory = {
  title: "Employer Directory",
  summary:
    "A recruiter-facing discovery surface for scanning analyst candidates by proof-of-skill, featured work, and hiring signal.",
  searchPlaceholder: "Search by skill, project, or analyst name",
  filters: {
    skills: ["SQL", "Cohort Analysis", "Revenue Diagnostics", "Executive Storytelling", "Operations Analytics"],
    tools: ["SQL", "Power BI", "Tableau", "Excel", "Looker"],
    projects: ["Churn Retention Simulation", "Activation Funnel Breakdown", "Revenue Leakage Review", "Support Escalation Prioritization"],
  },
};

export const employerCandidates: EmployerCandidate[] = [
  {
    id: "candidate-ash",
    name: "Ash Chauhan",
    title: "Business Analyst",
    location: "India",
    summary:
      "Business analyst focused on turning ambiguous revenue and retention problems into SQL-backed recommendations leadership can act on.",
    recruiterFit:
      "Strong fit for product, revenue operations, or customer success analytics teams that need business-readable analysis and clean executive framing.",
    skills: ["SQL", "Cohort Analysis", "Executive Storytelling", "Retention"],
    tools: ["SQL", "Power BI", "Excel"],
    projects: ["Churn Retention Simulation", "Revenue Leakage Review"],
    featuredProject: "Churn Retention Simulation",
    projectHighlight: "Turned a broad churn concern into a cohort-level recommendation with one-quarter intervention framing.",
    caseStudyHref: "/case-studies/churn-retention-simulation",
    metrics: [
      { label: "Recruiter Signal", value: "91" },
      { label: "Case Studies", value: "3" },
      { label: "SQL Readiness", value: "Advanced" },
    ],
    proofMetrics: [
      { label: "Retention diagnosis", value: "91", detail: "Evidence quality across churn and retained-revenue cuts." },
      { label: "Decision clarity", value: "High", detail: "Recommendation connects cohort risk to a focused operating action." },
      { label: "SQL signal", value: "Advanced", detail: "Uses grouped cohort analysis and risk scoring patterns confidently." },
      { label: "Portfolio depth", value: "3 cases", detail: "Public proof-of-skill artifacts with recruiter-readable summaries." },
    ],
    badges: ["Interview Ready", "Strong Business Reasoning", "Portfolio Strong"],
    profileHref: "/candidates/candidate-ash",
    contactHref: "mailto:ash@example.com?subject=AnalystOS%20candidate%20conversation",
  },
  {
    id: "candidate-mira",
    name: "Mira Patel",
    title: "Product Analyst",
    location: "Remote",
    summary:
      "Product analyst with a strong funnel lens, clean readout structure, and practical instincts for activation and experimentation problems.",
    recruiterFit:
      "Best matched with product analytics teams that need fast diagnosis, stakeholder-ready narratives, and dashboard-to-decision translation.",
    skills: ["Funnel Analysis", "Experiment Readouts", "SQL", "Stakeholder Reporting"],
    tools: ["SQL", "Looker", "Tableau"],
    projects: ["Activation Funnel Breakdown", "Churn Retention Simulation"],
    featuredProject: "Activation Funnel Breakdown",
    projectHighlight: "Identified the drop-off stage most responsible for activation loss and reframed the dashboard into a decision path.",
    caseStudyHref: "/case-studies/churn-retention-simulation",
    metrics: [
      { label: "Recruiter Signal", value: "88" },
      { label: "Featured Projects", value: "4" },
      { label: "Story Clarity", value: "High" },
    ],
    proofMetrics: [
      { label: "Activation read", value: "88", detail: "Finds the clearest product funnel breakpoint for decision-makers." },
      { label: "Experiment fluency", value: "Strong", detail: "Frames outcomes around tradeoffs, lift, and stakeholder action." },
      { label: "Dashboard clarity", value: "High", detail: "Turns BI artifacts into recruiter-readable project evidence." },
      { label: "Portfolio depth", value: "4 projects", detail: "Multiple examples across activation, retention, and reporting." },
    ],
    badges: ["Interview Ready", "Product Focus", "Dashboard Strong"],
    profileHref: "/candidates/candidate-mira",
    contactHref: "mailto:mira@example.com?subject=AnalystOS%20candidate%20conversation",
  },
  {
    id: "candidate-ryan",
    name: "Ryan Dsouza",
    title: "Data Analyst",
    location: "Bangalore",
    summary:
      "Data analyst focused on revenue diagnostics, BI artifacts, and operating metrics that help teams prioritize where leakage is happening.",
    recruiterFit:
      "Strong fit for revenue analytics, BI analyst, and operations analytics roles that require crisp dashboards plus practical recommendations.",
    skills: ["SQL", "Revenue Diagnostics", "BI Dashboards", "Forecasting"],
    tools: ["SQL", "Power BI", "Tableau"],
    projects: ["Revenue Leakage Review", "Activation Funnel Breakdown"],
    featuredProject: "Revenue Leakage Review",
    projectHighlight: "Connected leakage across lifecycle stages to a shortlist of operational fixes and a cleaner executive reporting structure.",
    caseStudyHref: "/case-studies/churn-retention-simulation",
    metrics: [
      { label: "Recruiter Signal", value: "86" },
      { label: "BI Artifacts", value: "5" },
      { label: "SQL Readiness", value: "Strong" },
    ],
    proofMetrics: [
      { label: "Revenue diagnosis", value: "86", detail: "Strong signal extraction across revenue leakage and lifecycle stages." },
      { label: "BI craft", value: "5 artifacts", detail: "Reusable dashboard surfaces with scan-friendly executive structure." },
      { label: "Forecasting base", value: "Solid", detail: "Understands metric movement and operational leading indicators." },
      { label: "SQL signal", value: "Strong", detail: "Comfortable with grouped revenue cuts and diagnostic segmentation." },
    ],
    badges: ["High Signal", "BI Focus", "Revenue Analysis"],
    profileHref: "/candidates/candidate-ryan",
    contactHref: "mailto:ryan@example.com?subject=AnalystOS%20candidate%20conversation",
  },
  {
    id: "candidate-sana",
    name: "Sana Verma",
    title: "Business Analyst",
    location: "Remote",
    summary:
      "Business analyst with an operations lens, strong process framing, and a bias toward actionable recommendations over decorative reporting.",
    recruiterFit:
      "Best suited for operations, customer support, and business analytics teams that need structured problem solving and crisp action plans.",
    skills: ["Process Mapping", "SQL", "Operations Analytics", "Executive Recommendations"],
    tools: ["SQL", "Excel", "Looker"],
    projects: ["Support Escalation Prioritization", "Churn Retention Simulation"],
    featuredProject: "Support Escalation Prioritization",
    projectHighlight: "Converted noisy support operations into a prioritization model with clear analyst recommendations for leadership review.",
    caseStudyHref: "/case-studies/churn-retention-simulation",
    metrics: [
      { label: "Recruiter Signal", value: "89" },
      { label: "Case Studies", value: "2" },
      { label: "Ops Focus", value: "High" },
    ],
    proofMetrics: [
      { label: "Ops diagnosis", value: "89", detail: "Converts messy operational signals into prioritization logic." },
      { label: "Recommendation quality", value: "High", detail: "Keeps outputs practical, sequenced, and leadership-readable." },
      { label: "Process clarity", value: "Strong", detail: "Maps workflows into decision points and escalation criteria." },
      { label: "Portfolio depth", value: "2 cases", detail: "Focused proof-of-skill projects with clear business outcomes." },
    ],
    badges: ["Interview Ready", "Operations Lens", "Recommendation Strong"],
    profileHref: "/candidates/candidate-sana",
    contactHref: "mailto:sana@example.com?subject=AnalystOS%20candidate%20conversation",
  },
];
