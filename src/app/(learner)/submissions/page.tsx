import type { Metadata } from "next";
import { SubmissionsList } from "@/components/submissions/submissions-list";

export const metadata: Metadata = {
  title: "Your Work",
  description: "Learner work history for AnalystOS practice tasks and feedback.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubmissionsPage() {
  return <SubmissionsList />;
}
