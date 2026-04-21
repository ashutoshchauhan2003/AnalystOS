export const learnerSidebarItems = [
  { label: "Overview", href: "/dashboard", active: true },
  { label: "Course Path", href: "/course-path" },
  { label: "Lab Workspace", href: "/lab" },
  { label: "Projects", href: "/projects" },
  { label: "Submissions", href: "/submission-review" },
  { label: "Progress", href: "/progress" },
  { label: "Settings", href: "/settings" },
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

export const activeLearningPath = {
  eyebrow: "Active Learning Path",
  title: "Business Analyst Systems Track",
  progressLabel: "68% complete",
  description:
    "A structured path spanning analyst reasoning, SQL fluency, business storytelling, and portfolio publication.",
  modules: [
    { label: "Problem Framing", status: "Completed", progress: 100 },
    { label: "SQL for Decision Work", status: "In Progress", progress: 74 },
    { label: "Experiment Analysis", status: "Queued", progress: 22 },
    { label: "Executive Narrative", status: "Locked", progress: 0 },
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
