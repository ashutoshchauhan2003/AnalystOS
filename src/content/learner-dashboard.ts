export const learnerSidebarItems = [
  { label: "Overview", href: "/dashboard", active: true },
  { label: "Learning Tracks", href: "/paths" },
  { label: "Skill Check", href: "/diagnostic" },
  { label: "Guided Workspace", href: "/lab" },
  { label: "Practice Tasks", href: "/labs" },
  { label: "Your Work", href: "/submissions" },
  { label: "Feedback", href: "/review" },
  { label: "Your Proof", href: "/portfolio" },
  { label: "Jobs", href: "/jobs" },
];

export const learnerKpis = [
  {
    label: "Track progress",
    value: "68%",
    detail: "up 12% this month",
  },
  {
    label: "Proof-ready tasks",
    value: "05",
    detail: "2 under active review",
  },
  {
    label: "Practice streak",
    value: "14d",
    detail: "consistent execution window",
  },
  {
    label: "Proof clarity score",
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
    "Beginner-friendly track focused on business questions, dashboard reading, pattern finding, and clear proof.",
  currentWeek: "Week 04",
  currentMission: "SQL joins and retention evidence",
};

export const activeLearningPath = {
  eyebrow: "Active Learning Track",
  title: "Data Analyst Track",
  progressLabel: "68% complete",
  description:
    "A structured track spanning table work, dashboard reading, pattern finding, business writing, and proof publishing.",
  modules: [
    { label: "Table Basics For Business Questions", status: "Completed", progress: 100 },
    { label: "Dashboard Reading", status: "In Progress", progress: 74 },
    { label: "Find Patterns", status: "Queued", progress: 22 },
    { label: "Your Proof Case", status: "Locked", progress: 0 },
  ],
};

export const recommendedNextStep = {
  eyebrow: "Recommended Next Step",
  title: "Finish the customer-risk task and publish your findings snapshot.",
  description:
    "You are one step away from turning your latest practice work into a clear proof card.",
  effort: "42 min focused session",
  impact: "Unlocks Your Proof visibility boost",
  actionLabel: "Resume Guided Task",
  secondaryActionLabel: "View Track Details",
};

export const recentActivity = [
  {
    title: "Customer-risk workbook submitted",
    timestamp: "18 minutes ago",
    summary: "Uploaded workbook revision with a simple summary and key numbers.",
  },
  {
    title: "Table practice checkpoint unlocked",
    timestamp: "Yesterday",
    summary: "New module opened after completing the required practice checks.",
  },
  {
    title: "Proof draft received feedback",
    timestamp: "2 days ago",
    summary: "Feedback added around clarity, layout, and recommendation structure.",
  },
];

export const progressSummary = [
  {
    label: "Lessons completed",
    value: "23 / 34",
    bar: 68,
  },
  {
    label: "Practice tasks completed",
    value: "11 / 16",
    bar: 72,
  },
  {
    label: "Proof pieces published",
    value: "3 / 5",
    bar: 60,
  },
];

export const overviewHighlights = [
  "Priority focus: finish table work for decisions",
  "Best-performing skill: clear business communication",
  "Next proof unlock: customer-risk case note",
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
