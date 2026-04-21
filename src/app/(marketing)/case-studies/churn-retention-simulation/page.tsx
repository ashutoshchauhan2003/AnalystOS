import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/case-study-page";

export const metadata: Metadata = {
  title: "Churn Retention Simulation",
  description:
    "Recruiter-friendly business analyst case study showing SQL thinking, cohort analysis, recommendation quality, and business impact.",
  alternates: {
    canonical: "/case-studies/churn-retention-simulation",
  },
};

export default function ChurnRetentionCaseStudyPage() {
  return <CaseStudyPage />;
}
