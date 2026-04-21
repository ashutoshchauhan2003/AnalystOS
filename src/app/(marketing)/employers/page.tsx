import type { Metadata } from "next";
import { EmployerDirectoryPage } from "@/components/employer-directory/employer-directory-page";

export const metadata: Metadata = {
  title: "Employer Directory",
  description:
    "Recruiter-facing candidate discovery page for scanning analyst proof-of-skill, featured projects, and hiring signals.",
  alternates: {
    canonical: "/employers",
  },
};

export default function EmployersPage() {
  return <EmployerDirectoryPage />;
}
