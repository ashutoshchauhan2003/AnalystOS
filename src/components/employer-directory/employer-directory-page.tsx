import { CandidateCard } from "@/components/employer-directory/candidate-card";
import { EmployerDirectoryHeader } from "@/components/employer-directory/employer-directory-header";
import { EmployerDirectoryShell } from "@/components/employer-directory/employer-directory-shell";
import { FilterPanel } from "@/components/employer-directory/filter-panel";
import { employerCandidates } from "@/content/employer-directory";

export function EmployerDirectoryPage() {
  return (
    <EmployerDirectoryShell>
      <EmployerDirectoryHeader />

      <section className="mt-12 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-8 xl:h-fit">
          <FilterPanel />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {employerCandidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>
      </section>
    </EmployerDirectoryShell>
  );
}
