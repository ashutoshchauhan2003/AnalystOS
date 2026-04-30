import type { Metadata } from "next";
import { ReviewDetail } from "@/components/review/review-detail";

type ReviewPageProps = {
  params: {
    submissionId: string;
  };
};

export const metadata: Metadata = {
  title: "Review Submission",
  description: "Prototype AnalystOS reviewer interface for rubric scoring and feedback.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewSubmissionPage({ params }: ReviewPageProps) {
  return <ReviewDetail submissionId={params.submissionId} />;
}
