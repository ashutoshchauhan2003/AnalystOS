import { notFound } from "next/navigation";
import { CandidateProfileActions } from "@/components/employer-directory/candidate-profile-actions";
import { EmployerDirectoryShell } from "@/components/employer-directory/employer-directory-shell";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { employerCandidates } from "@/content/employer-directory";

type CandidateProfilePageProps = {
  candidateId: string;
};

function Pill({ children, tone = "neutral" }: { children: string; tone?: "cyan" | "neutral" }) {
  return (
    <span
      className={[
        "inline-flex rounded-full border px-3 py-2 text-xs uppercase tracking-[0.22em]",
        tone === "cyan"
          ? "border-cyan-300/[0.16] bg-cyan-300/[0.08] text-cyan-100"
          : "border-white/10 bg-white/[0.035] text-slate-300",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
      {children}
    </p>
  );
}

export function CandidateProfilePage({ candidateId }: CandidateProfilePageProps) {
  const candidate = employerCandidates.find((item) => item.id === candidateId);

  if (!candidate) {
    notFound();
  }

  return (
    <EmployerDirectoryShell>
      <div className="mb-8">
        <GlowButton href="/employers" variant="secondary">
          Back to Directory
        </GlowButton>
      </div>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_420px]">
        <GlassPanel className="p-6 lg:p-8" glow="cyan">
          <div className="relative">
            <SectionLabel>{candidate.title}</SectionLabel>
            <h1 className="mt-5 max-w-4xl text-5xl font-medium tracking-[-0.06em] text-white lg:text-7xl">
              {candidate.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {candidate.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {candidate.badges.map((badge) => (
                <Pill key={badge} tone="cyan">
                  {badge}
                </Pill>
              ))}
              <Pill>{candidate.location}</Pill>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {candidate.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.58] px-4 py-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </GlassPanel>

        <GlassPanel className="p-6 lg:p-7" glow="blue">
          <div className="relative">
            <SectionLabel>Recruiter Actions</SectionLabel>
            <p className="mt-4 text-sm leading-7 text-slate-300">{candidate.recruiterFit}</p>
            <CandidateProfileActions
              contactHref={candidate.contactHref}
              caseStudyHref={candidate.caseStudyHref}
            />
          </div>
        </GlassPanel>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <div className="space-y-6">
          <GlassPanel className="p-6" glow="none">
            <div className="relative">
              <SectionLabel>Skills</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <Pill key={skill}>{skill}</Pill>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6" glow="none">
            <div className="relative">
              <SectionLabel>Tools Used</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {candidate.tools.map((tool) => (
                  <Pill key={tool} tone="cyan">
                    {tool}
                  </Pill>
                ))}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6" glow="none">
            <div className="relative">
              <SectionLabel>Project Coverage</SectionLabel>
              <div className="mt-4 space-y-3">
                {candidate.projects.map((project) => (
                  <div
                    key={project}
                    className="rounded-[1rem] border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                  >
                    {project}
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>

        <div className="space-y-6">
          <GlassPanel className="p-6 lg:p-7" glow="cyan">
            <div className="relative">
              <SectionLabel>Featured Case Study</SectionLabel>
              <div className="mt-4 rounded-[1.35rem] border border-white/[0.08] bg-slate-950/[0.62] p-5">
                <h2 className="text-3xl font-medium tracking-[-0.05em] text-white">
                  {candidate.featuredProject}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {candidate.projectHighlight}
                </p>
                <div className="mt-5">
                  <GlowButton href={candidate.caseStudyHref} variant="secondary">
                    Open Case Study
                  </GlowButton>
                </div>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6 lg:p-7" glow="blue">
            <div className="relative">
              <SectionLabel>Proof-of-Skill Metrics</SectionLabel>
              <div className="mt-5 grid gap-4 lg:grid-cols-2">
                {candidate.proofMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[1.25rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.052),rgba(255,255,255,0.022))] p-5"
                  >
                    <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {metric.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{metric.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>
    </EmployerDirectoryShell>
  );
}
