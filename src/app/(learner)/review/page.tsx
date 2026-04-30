import type { Metadata } from "next";
import { ReviewQueue } from "@/components/review/review-queue";

export const metadata: Metadata = {
  title: "Review Queue",
  description:
    "Peer and mentor review queue for AnalystOS submissions, rubric scoring, and feedback decisions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewPage() {
  return <ReviewQueue />;
}
