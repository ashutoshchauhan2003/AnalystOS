export const learnerSidebarItems = [
  { label: "Overview", href: "/dashboard", active: true },
  { label: "Role Paths", href: "/paths" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Lab Workspace", href: "/lab" },
  { label: "Lab Catalog", href: "/labs" },
  { label: "Submissions", href: "/submissions" },
  { label: "Review", href: "/review" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Jobs", href: "/jobs" },
];

export const learnerKpis = [
  {
    label: "Path completion",
    value: "68%",
    detail: "up 12% this month",
  },
  {
    label: "Portfolio-ready projects",
    value: "05",
    detail: "2 under active review",
  },
  {
    label: "Lab streak",
    value: "14d",
    detail: "consistent execution window",
  },
  {
    label: "Recruiter visibility score",
    value: "91",
    detail: "high signal profile quality",
  },
];

export const dashboardProfile = {
  learnerName: "Ariana Patel",
  roleLabel: "Analyst Candidate",
  activePathId: "data-analyst",
  activePathTitle: "Data Analyst",
  activePathSummary:
    "SQL-first analytics track focused on business questions, dashboard judgment, EDA, and recruiter-ready proof.",
  currentWeek: "Week 04",
  currentMission: "SQL joins and retention evidence",
};

export const activeLearningPath = {
  eyebrow: "Active Learning Path",
  title: "Data Analyst Path",
  progressLabel: "68% complete",
  description:
    "A structured path spanning SQL fluency, dashboard judgment, EDA, business storytelling, and portfolio publication.",
  modules: [
    { label: "SQL Foundations For Business Questions", status: "Completed", progress: 100 },
    { label: "Dashboard Judgment", status: "In Progress", progress: 74 },
    { label: "EDA To Insight", status: "Queued", progress: 22 },
    { label: "Portfolio Case Study", status: "Locked", progress: 0 },
  ],
};

export const recommendedNextStep = {
  eyebrow: "Recommended Next Step",
  title: "Finish the churn retention lab and publish your findings snapshot.",
  description:
    "You are one step away from converting your latest analysis into a portfolio-grade case study with recruiter-facing highlights.",
  effort: "42 min focused session",
  impact: "Unlocks portfolio visibility boost",
  actionLabel: "Resume Lab Session",
  secondaryActionLabel: "View Path Details",
};

export const recentActivity = [
  {
    title: "Retention cohort workbook submitted",
    timestamp: "18 minutes ago",
    summary: "Uploaded workbook revision with executive summary and metric framing.",
  },
  {
    title: "SQL checkpoint unlocked",
    timestamp: "Yesterday",
    summary: "New module opened after reaching the required accuracy band on query drills.",
  },
  {
    title: "Case study draft reviewed",
    timestamp: "2 days ago",
    summary: "Feedback added around insight hierarchy, visual clarity, and recommendation structure.",
  },
];

export const progressSummary = [
  {
    label: "Lessons completed",
    value: "23 / 34",
    bar: 68,
  },
  {
    label: "Labs completed",
    value: "11 / 16",
    bar: 72,
  },
  {
    label: "Portfolio pieces published",
    value: "3 / 5",
    bar: 60,
  },
];

export const overviewHighlights = [
  "Priority focus: finish SQL for Decision Work",
  "Best-performing skill signal: stakeholder communication",
  "Next portfolio unlock: churn retention case study",
];

export const skillHeatmap = [
  { skill: "SQL joins", level: 86, status: "Strong" },
  { skill: "Aggregation", level: 78, status: "Ready" },
  { skill: "Dashboard critique", level: 64, status: "Building" },
  { skill: "EDA", level: 52, status: "Needs reps" },
  { skill: "Cohort analysis", level: 71, status: "Ready" },
  { skill: "Insight storytelling", level: 68, status: "Building" },
  { skill: "Executive recommendation", level: 59, status: "Needs reps" },
  { skill: "Validation discipline", level: 82, status: "Strong" },
];

export const weeklyMissions = [
  {
    week: "Week 04",
    title: "Debug retention SQL and explain the evidence",
    status: "Active",
    dueLabel: "Due in 2 days",
    progress: 72,
    focus: "Fix cohort query, validate retained revenue, write the business readout.",
  },
  {
    week: "Week 05",
    title: "Critique sales dashboard hierarchy",
    status: "Queued",
    dueLabel: "Unlocks after SQL mission",
    progress: 18,
    focus: "Identify weak metrics, reorganize the executive surface, and recommend changes.",
  },
  {
    week: "Week 06",
    title: "Publish retention risk case note",
    status: "Locked",
    dueLabel: "Portfolio milestone",
    progress: 0,
    focus: "Convert lab evidence into a recruiter-readable proof artifact.",
  },
];

export const labProgress = [
  {
    title: "SQL Join Challenge",
    type: "SQL Challenge",
    status: "Submitted",
    score: 91,
    readiness: "Portfolio usable",
  },
  {
    title: "Debugging Broken SQL Query",
    type: "Debugging Exercise",
    status: "Active",
    score: 72,
    readiness: "Needs final readout",
  },
  {
    title: "Sales Dashboard Critique",
    type: "Dashboard Critique",
    status: "Next",
    score: 24,
    readiness: "Not started",
  },
  {
    title: "Python EDA Notebook Task",
    type: "Notebook Task",
    status: "Queued",
    score: 12,
    readiness: "Future module",
  },
];

export const portfolioStatus = {
  headline: "3 portfolio artifacts are recruiter-visible",
  summary:
    "Your strongest proof is SQL execution. The next upgrade is adding a cleaner recommendation layer to the retention case study.",
  artifacts: [
    { label: "Published case studies", value: "03", state: "Live" },
    { label: "Drafts under review", value: "02", state: "Review" },
    { label: "Proof quality score", value: "84", state: "Strong" },
  ],
};

export const interviewReadiness = {
  score: 78,
  label: "Interview readiness",
  confidence: "Strong signal, still polishing story depth",
  strengths: ["SQL reasoning", "Revenue framing", "Validation discipline"],
  gaps: ["Executive narrative", "EDA confidence"],
};
