import type { Metadata } from "next";
import { PublicPortfolio } from "@/components/portfolio/public-portfolio";

export const metadata: Metadata = {
  title: "Demo User Portfolio",
  description:
    "Recruiter-facing AnalystOS public portfolio for a demo learner with reviewed lab projects, skills, and recommendations.",
  alternates: {
    canonical: "/u/demo-user",
  },
};

export default function PublicDemoUserPage() {
  return <PublicPortfolio userId="demo-user" />;
}
