import type { Metadata } from "next";
import { PortfolioBuilder } from "@/components/portfolio/portfolio-builder";

export const metadata: Metadata = {
  title: "Portfolio Builder",
  description: "AnalystOS learner portfolio builder for publishing recruiter-ready proof.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortfolioPage() {
  return <PortfolioBuilder />;
}

