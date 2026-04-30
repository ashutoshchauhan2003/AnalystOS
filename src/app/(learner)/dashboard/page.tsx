import type { Metadata } from "next";
import { LearnerDashboardExperience } from "@/components/learner/learner-dashboard-experience";

export const metadata: Metadata = {
  title: "AnalystOS Dashboard",
  description:
    "Immersive AnalystOS simulation room for navigating progress, projects, recommendations, and job-ready learning signals.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LearnerDashboardPage() {
  return <LearnerDashboardExperience />;
}
