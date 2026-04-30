import type { Metadata } from "next";
import { Suspense } from "react";
import { LabWorkspaceExperience } from "@/components/lab-workspace/lab-workspace-experience";

export const metadata: Metadata = {
  title: "AnalystOS Lab Workspace",
  description:
    "Operational AnalystOS workbench for SQL drafting, insight framing, recommendation development, and portfolio-ready proof.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabWorkspacePage() {
  return (
    <Suspense fallback={null}>
      <LabWorkspaceExperience />
    </Suspense>
  );
}
