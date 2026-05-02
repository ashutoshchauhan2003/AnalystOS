import type { Metadata } from "next";
import { ReviewQueue } from "@/components/review/review-queue";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Peer and mentor feedback for AnalystOS work, scoring, and next-step decisions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewPage() {
  return <ReviewQueue />;
}
