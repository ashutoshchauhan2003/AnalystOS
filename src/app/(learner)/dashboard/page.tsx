import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LabLoadingScreen } from "@/components/learner-lab/lab-shell";

export const metadata: Metadata = {
  title: "Learner Dashboard",
  description: "Immersive analyst simulation room for navigating progress, projects, recommendations, and learning signals.",
  robots: {
    index: false,
    follow: false,
  },
};

const AnalystLabExperience = dynamic(
  () =>
    import("@/components/learner-lab/analyst-lab-experience").then(
      (module) => module.AnalystLabExperience,
    ),
  {
    ssr: false,
    loading: () => <LabLoadingScreen />,
  },
);

export default function LearnerDashboardPage() {
  return <AnalystLabExperience />;
}
