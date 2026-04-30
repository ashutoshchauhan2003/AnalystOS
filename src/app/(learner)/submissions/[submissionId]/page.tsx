import type { Metadata } from "next";
import { SubmissionDetail } from "@/components/submissions/submission-detail";

type SubmissionPageProps = {
  params: {
    submissionId: string;
  };
};

export const metadata: Metadata = {
  title: "Submission Detail",
  description: "Full AnalystOS local submission detail and reviewer feedback.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SubmissionDetailPage({ params }: SubmissionPageProps) {
  return <SubmissionDetail submissionId={params.submissionId} />;
}
