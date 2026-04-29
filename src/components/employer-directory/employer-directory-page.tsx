import { EmployerDashboard } from "@/components/employer-directory/employer-dashboard";
import { EmployerDirectoryHeader } from "@/components/employer-directory/employer-directory-header";
import { EmployerDirectoryShell } from "@/components/employer-directory/employer-directory-shell";

export function EmployerDirectoryPage() {
  return (
    <EmployerDirectoryShell>
      <EmployerDirectoryHeader />
      <EmployerDashboard />
    </EmployerDirectoryShell>
  );
}
