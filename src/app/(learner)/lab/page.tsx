import type { Metadata } from "next";
import { LabWorkspaceExperience } from "@/components/lab-workspace/lab-workspace-experience";

export const metadata: Metadata = {
  title: "Lab Workspace",
  description: "Operational analyst workbench for SQL drafting, insight framing, and recommendation development.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabWorkspacePage() {
  return <LabWorkspaceExperience />;
}
