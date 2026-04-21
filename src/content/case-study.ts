export const caseStudy = {
  slug: "churn-retention-simulation",
  title: "Churn Retention Simulation",
  role: "Business Analyst",
  outcome: "Identified the highest-risk onboarding cohort and framed a measurable retention intervention plan.",
  summary:
    "A recruiter-friendly case study that shows how product, revenue, and lifecycle signals were translated into a practical analyst recommendation.",
  heroMetrics: [
    { label: "Revenue at risk", value: "$480K ARR" },
    { label: "Highest-risk segment", value: "Low setup completion" },
    { label: "Outcome horizon", value: "1 quarter plan" },
  ],
  businessProblem:
    "A subscription product was losing retained revenue shortly after onboarding. Leadership needed a concise analyst recommendation that could explain where the churn risk concentrated, what operational breakpoint was driving it, and what action would reduce the loss quickly.",
  dataset: {
    summary:
      "The analysis used cohort and account-level onboarding data, retained revenue values, and churn risk indicators to isolate where revenue decline became visible before cancellation behavior fully appeared.",
    bullets: [
      "Cohort onboarding completion bands",
      "Account-level retained revenue and churn-risk fields",
      "Lifecycle timing to compare activation progress against revenue decline",
    ],
  },
  method: [
    {
      label: "Frame the decision",
      description:
        "Start with the decision leadership needed to make, then narrow the analysis to the signal most useful for that decision.",
    },
    {
      label: "Isolate the signal",
      description:
        "Segment the onboarding population by completion behavior and compare retained revenue movement before broadening the investigation.",
    },
    {
      label: "Translate to action",
      description:
        "Convert the quantitative result into a one-quarter intervention plan that a product and lifecycle team could realistically execute.",
    },
  ],
  showcase: [
    {
      title: "Cohort risk view",
      stat: "Low-completion accounts showed the sharpest retained-revenue decline.",
      detail:
        "The comparison made it clear that the signal concentrated in early activation failure rather than in generic churn messaging issues.",
    },
    {
      title: "Revenue timing read",
      stat: "Revenue decline became meaningful before cancellation was fully visible.",
      detail:
        "That timing changed the recommendation from reactive outreach to earlier milestone-based intervention inside onboarding.",
    },
    {
      title: "Decision-ready framing",
      stat: "The final output centered one segment, one operational lever, and one business consequence.",
      detail:
        "The goal was not to show every cut of the data, but to produce a clear analyst recommendation that leadership could act on quickly.",
    },
  ],
  insights: [
    "Accounts below 40% onboarding completion contributed the highest retained-revenue exposure.",
    "Revenue risk appeared before explicit churn became obvious, which reduced the value of reactive retention tactics.",
    "The strongest intervention path was improving early activation quality rather than relying on lifecycle messaging alone.",
  ],
  recommendation:
    "Prioritize milestone-based onboarding intervention for low-activation accounts in the first 30 days. Combine activation milestone tracking, targeted setup support, and escalation rules for accounts that stall below key onboarding thresholds.",
  impact: [
    { label: "Analyst value", value: "Turned a broad churn concern into a decision-ready cohort priority." },
    { label: "Business clarity", value: "Connected revenue decline timing to a practical operational response." },
    { label: "Recruiter signal", value: "Demonstrated SQL thinking, business reasoning, and executive communication." },
  ],
  tools: ["SQL", "Cohort analysis", "Revenue diagnostics", "Business storytelling", "Executive recommendations"],
  relatedProjects: [
    {
      title: "Customer Health Scoring Review",
      detail: "A case study focused on lifecycle risk prioritization and signal design.",
    },
    {
      title: "Pipeline Conversion Breakdown",
      detail: "A project centered on funnel leakage, prioritization, and stakeholder-ready reporting.",
    },
  ],
  cta: {
    title: "Looking for analyst proof-of-skill?",
    body:
      "This case study is designed to make analytical thinking, business reasoning, and recommendation quality easy to evaluate quickly.",
    primaryLabel: "View Dashboard",
    primaryHref: "/dashboard",
    secondaryLabel: "Open Lab Workspace",
    secondaryHref: "/lab",
  },
};
