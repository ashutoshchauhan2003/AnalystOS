import type { Metadata } from "next";
import { PortfolioBuilder } from "@/components/portfolio/portfolio-builder";

export const metadata: Metadata = {
  title: "Your Proof",
  description: "AnalystOS proof builder for publishing clear beginner-friendly work samples.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortfolioPage() {
  return <PortfolioBuilder />;
}
