export const caseStudy = {
  slug: "churn-retention-simulation",
  title: "Churn Retention Simulation",
  role: "Business Analyst",
  outcome: "Identified the highest-risk onboarding cohort and framed a measurable retention intervention plan.",
  summary:
    "A recruiter-friendly case study that shows how product, revenue, and lifecycle signals were translated into a practical analyst recommendation.",
  heroMetrics: [
    { label: "Revenue at risk", value: "$480K ARR" },
    { label: "Potential ARR protected", value: "$1.2M" },
    { label: "Target churn reduction", value: "18%" },
    { label: "Highest-risk segment", value: "Low setup completion" },
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
  charts: [
    {
      title: "ARR exposure by cohort",
      subtitle: "Mock chart showing retained-revenue risk concentrated in low onboarding completion.",
      bars: [
        { label: "0-40%", value: 92, amount: "$480K" },
        { label: "41-70%", value: 56, amount: "$290K" },
        { label: "71-100%", value: 24, amount: "$120K" },
      ],
    },
    {
      title: "Churn risk timing",
      subtitle: "Mock trend showing risk rising before formal cancellation behavior becomes visible.",
      bars: [
        { label: "Day 7", value: 28, amount: "Low" },
        { label: "Day 21", value: 68, amount: "Rising" },
        { label: "Day 45", value: 84, amount: "High" },
      ],
    },
  ],
  insights: [
    "Accounts below 40% onboarding completion contributed the highest retained-revenue exposure.",
    "Revenue risk appeared before explicit churn became obvious, which reduced the value of reactive retention tactics.",
    "The strongest intervention path was improving early activation quality rather than relying on lifecycle messaging alone.",
  ],
  recommendation:
    "Prioritize milestone-based onboarding intervention for low-activation accounts in the first 30 days. Combine activation milestone tracking, targeted setup support, and escalation rules for accounts that stall below key onboarding thresholds.",
  beforeAfterImpact: [
    {
      before: "Leadership had a broad churn concern with unclear ownership and too many possible explanations.",
      after: "The analysis narrowed the issue to low-activation onboarding cohorts with a clear operating owner.",
    },
    {
      before: "Retention outreach was reactive and triggered after cancellation risk was already visible.",
      after: "The recommendation moved intervention earlier, around milestone failure and setup completion.",
    },
    {
      before: "Dashboards showed churn movement but did not clarify which action should happen first.",
      after: "The final story connected cohort signal, ARR exposure, and one-quarter execution path.",
    },
  ],
  businessThinking: [
    {
      label: "Decision lens",
      value:
        "I prioritized the segment where actionability and revenue exposure overlapped, rather than chasing every churn correlation.",
    },
    {
      label: "Tradeoff",
      value:
        "The analysis intentionally avoided over-segmentation so leadership could align around one high-confidence intervention.",
    },
    {
      label: "Operating implication",
      value:
        "The recommendation assigns work to onboarding and lifecycle teams before churn appears in lagging cancellation metrics.",
    },
  ],
  impact: [
    { label: "ARR exposure clarified", value: "$480K in near-term retained ARR risk isolated to low-activation cohorts." },
    { label: "Potential ARR protected", value: "$1.2M protected annually if intervention reduces repeat exposure across future cohorts." },
    { label: "Churn reduction target", value: "18% relative reduction target for low-completion cohorts over one quarter." },
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
