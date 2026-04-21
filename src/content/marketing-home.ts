export const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Projects", href: "#projects" },
  { label: "Flow", href: "#flow" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "Pricing", href: "#pricing" },
];

export const heroMetrics = [
  { label: "Hiring-ready analyst tracks", value: "12" },
  { label: "Portfolio-grade projects", value: "48" },
  { label: "Workflow simulations", value: "Live" },
];

export const rolePanels = [
  {
    eyebrow: "For Analysts",
    title: "Train on business problems that look and feel like the work itself.",
    description:
      "Move beyond lectures into guided analysis labs, decision frameworks, and presentation-ready deliverables that mirror modern analyst teams.",
    bullets: ["Structured learning arcs", "Portfolio-quality outputs", "Decision-making reps"],
  },
  {
    eyebrow: "For Learners",
    title: "Turn progress into visible proof with polished case studies and measurable growth.",
    description:
      "Every course path leads into practice, publishable artifacts, and a profile that shows how you think, not just what you watched.",
    bullets: ["Progress intelligence", "Review-ready submissions", "Public skill showcase"],
  },
  {
    eyebrow: "For Recruiters",
    title: "Evaluate candidates through signal-rich work, skills, and business impact.",
    description:
      "Browse analyst portfolios, compare project depth, and shortlist candidates using evidence grounded in real workflow execution.",
    bullets: ["Outcome-focused previews", "Skill-tag filters", "Shortlist workflow"],
  },
];

export const featuredProjects = [
  {
    title: "Revenue Leak Investigation",
    problem: "Diagnose why a subscription product is losing expansion revenue after onboarding.",
    tools: ["SQL", "Spreadsheet Modeling", "Presentation"],
    impact: "+14% expansion recovery scenario",
    relevance: "Product Analyst",
  },
  {
    title: "Supply Chain Volatility Model",
    problem: "Prioritize inventory interventions using uncertainty bands across regions and vendors.",
    tools: ["Python", "Forecasting", "Dashboarding"],
    impact: "-9 days planning lag",
    relevance: "Operations Analyst",
  },
  {
    title: "Customer Segmentation Rebuild",
    problem: "Redesign stale lifecycle segments using behavioral clustering and retention signals.",
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
      "Absorb analyst frameworks through guided modules, real company context, and strategic reasoning prompts.",
  },
  {
    step: "02",
    title: "Practice",
    description:
      "Work inside scenario-driven labs with feedback rails, deliverable structure, and focused constraints.",
  },
  {
    step: "03",
    title: "Publish",
    description:
      "Convert project work into polished case studies, metrics snapshots, and recruiter-friendly narratives.",
  },
  {
    step: "04",
    title: "Get Hired",
    description:
      "Surface your strongest work to employers through portfolios, searchable skills, and shortlist-ready profiles.",
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
    price: "$39",
    cadence: "/month",
    description: "For learners building their first serious analyst portfolio.",
    features: ["Guided learning paths", "Portfolio project access", "Profile publishing"],
  },
  {
    name: "Pro",
    price: "$89",
    cadence: "/month",
    description: "For ambitious candidates who want deeper labs and richer feedback.",
    features: ["Advanced labs", "Submission review workflow", "Premium case study templates"],
    featured: true,
  },
  {
    name: "Teams",
    price: "Custom",
    cadence: "",
    description: "For academies, bootcamps, and hiring teams running analyst talent programs.",
    features: ["Recruiter access", "Shared candidate views", "Workflow analytics"],
  },
];
