import type { Metadata } from "next";
import { SubmissionsList } from "@/components/submissions/submissions-list";

export const metadata: Metadata = {
  title: "Submissions",
  description: "Learner submission history for AnalystOS labs and reviewer feedback.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubmissionsPage() {
  return <SubmissionsList />;
}
