export const navItems = [
  { label: "Platform", href: "/#platform" },
  { label: "Learning Tracks", href: "/paths" },
  { label: "Practice Tasks", href: "/labs" },
  { label: "Jobs", href: "/jobs" },
  { label: "Recruiters", href: "/recruiters" },
  { label: "Projects", href: "/#projects" },
  { label: "Skill Check", href: "/diagnostic" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Flow", href: "/#flow" },
  { label: "Outcomes", href: "/#outcomes" },
  { label: "Pricing", href: "/#pricing" },
];

export const heroMetrics = [
  { label: "Beginner learning tracks", value: "12" },
  { label: "Practice tasks", value: "48" },
  { label: "Guided demo flow", value: "Live" },
];

export const rolePanels = [
  {
    eyebrow: "For Analysts",
    title: "Start from zero and practise simple business tasks with guidance.",
    description:
      "Move beyond lectures into beginner-friendly practice tasks with hints, examples, and clear steps.",
    bullets: ["Start from zero", "No coding required at first", "Step-by-step practice"],
  },
  {
    eyebrow: "For Learners",
    title: "Turn each small practice win into proof you can show.",
    description:
      "Every learning track leads into guided practice, saved work, and a profile that explains what you can do in plain language.",
    bullets: ["Simple progress view", "Feedback-ready work", "Public proof page"],
  },
  {
    eyebrow: "For Recruiters",
    title: "See real work samples without decoding confusing jargon.",
    description:
      "Browse learner proof pages, compare beginner-to-job-ready progress, and shortlist candidates using clear evidence.",
    bullets: ["Clear work previews", "Simple skill filters", "Shortlist workflow"],
  },
];

export const featuredProjects = [
  {
    title: "Find Where Revenue Is Dropping",
    problem: "Look at simple customer data and explain where money is being lost.",
    tools: ["SQL", "Spreadsheet Modeling", "Presentation"],
    impact: "+14% expansion recovery scenario",
    relevance: "Product Analyst",
  },
  {
    title: "Spot Stock Problems",
    problem: "Find which products or regions need attention first.",
    tools: ["Python", "Forecasting", "Dashboarding"],
    impact: "-9 days planning lag",
    relevance: "Operations Analyst",
  },
  {
    title: "Group Customers Clearly",
    problem: "Group customers by behavior so a team can decide what to do next.",
    tools: ["SQL", "BI", "Experiment Design"],
    impact: "+11% retention uplift hypothesis",
    relevance: "Growth Analyst",
  },
];

export const workflowSteps = [
  {
    step: "01",
    title: "Learn",
    description:
      "Start from zero with simple lessons, plain examples, and guided practice.",
  },
  {
    step: "02",
    title: "Practice",
    description:
      "Complete practice tasks with hints, examples, and a clear Step 1 to Step 5 path.",
  },
  {
    step: "03",
    title: "Publish",
    description:
      "Turn your work into a clean proof page that explains what you did and why it matters.",
  },
  {
    step: "04",
    title: "Get Hired",
    description:
      "Share your proof with employers through simple skills, saved work, and clear feedback.",
  },
];

export const testimonials = [
  {
    quote:
      "The labs felt like stepping into a real analyst seat. I stopped collecting certificates and started building evidence.",
    name: "Maya Chen",
    role: "Business Analyst Candidate",
    outcome: "Built 5 portfolio-ready projects in 8 weeks",
  },
  {
    quote:
      "The strongest difference was signal quality. We could quickly see how candidates framed problems and communicated tradeoffs.",
    name: "Jordan Alvarez",
    role: "Hiring Manager, Growth Analytics",
    outcome: "Shortlisted candidates from project evidence, not resumes alone",
  },
];

export const trustStats = [
  { value: "4x", label: "more proof signals than a standard course completion flow" },
  { value: "85%", label: "of projects structured for portfolio publication" },
  { value: "1", label: "connected loop from lesson to hiring visibility" },
];

export const pricingTiers = [
  {
    name: "Core",
    price: "Free",
    cadence: "",
    description: "For beginners starting from zero.",
    features: ["Guided learning tracks", "Practice task access", "Your Proof publishing"],
  },
  {
    name: "Pro",
    price: "$89",
    cadence: "/month",
    description: "For learners who want deeper practice and richer feedback.",
    features: ["Advanced practice tasks", "Your Work feedback flow", "Premium proof templates"],
    featured: true,
  },
  {
    name: "Teams",
    price: "Custom",
    cadence: "",
    description: "For academies, bootcamps, and hiring teams running AnalystOS talent programs.",
    features: ["Recruiter access", "Shared candidate views", "Workflow analytics"],
  },
];
