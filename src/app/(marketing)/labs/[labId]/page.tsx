import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PremiumFooter } from "@/components/layout/premium-footer";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs, type LabId } from "@/content/labs";
import { rubrics } from "@/content/rubrics";

type LabDetailPageProps = {
  params: {
    labId: string;
  };
};

export function generateStaticParams() {
  return labs.map((lab) => ({
    labId: lab.id,
  }));
}

export function generateMetadata({ params }: LabDetailPageProps): Metadata {
  const lab = getLab(params.labId);

  if (!lab) {
    return {
      title: "Lab Not Found",
    };
  }

  return {
    title: `${lab.title} Lab`,
    description: `${lab.title} in AnalystOS: ${lab.brief}`,
    alternates: {
      canonical: `/labs/${lab.id}`,
    },
  };
}

export default function LabDetailPage({ params }: LabDetailPageProps) {
  const lab = getLab(params.labId);

  if (!lab) {
    notFound();
  }

  const rubric = rubrics.find((item) => item.id === lab.rubricId);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.08),transparent_18%),linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)] opacity-35" />
      <div className="pointer-events-none absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[22%] h-64 w-64 rounded-full bg-indigo-400/[0.08] blur-[120px]" />

      <PremiumNavbar />

      <Container className="relative pb-24 pt-14 lg:pb-28 lg:pt-20">
        <section className="grid gap-7 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.42fr)] lg:items-end">
          <Reveal>
            <div>
              <Link
                href="/labs"
                className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
              >
                Back to labs
              </Link>
              <p className="mt-8 text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                AnalystOS Lab / {lab.skill}
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
                {lab.title}
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300/[0.78] lg:text-lg">
                {lab.brief}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassPanel className="p-6" glow="cyan">
              <div className="relative grid gap-3">
                <SummaryMetric label="Difficulty" value={lab.difficulty} />
                <SummaryMetric label="Estimated time" value={lab.estimatedTime} />
                <SummaryMetric label="Role fit" value={lab.role.join(" / ")} />
                <Link
                  href={`/lab?challenge=${lab.id}`}
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                  Open Workspace
                </Link>
              </div>
            </GlassPanel>
          </Reveal>
        </section>

        <section className="mt-12 grid gap-5 xl:grid-cols-[minmax(0,0.64fr)_minmax(360px,0.36fr)]">
          <div className="space-y-5">
            <InfoPanel
              eyebrow="Problem Brief"
              title="What you need to solve"
              description={lab.brief}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {lab.role.map((role) => (
                  <div key={role} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Role signal</p>
                    <p className="mt-2 text-base font-medium text-white">{role}</p>
                  </div>
                ))}
              </div>
            </InfoPanel>

            <InfoPanel
              eyebrow="Dataset Description"
              title="Working data context"
              description={lab.datasetDescription}
            >
              <div className="flex flex-wrap gap-2">
                {lab.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan-300/[0.14] bg-cyan-300/[0.07] px-3 py-2 text-xs text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </InfoPanel>

            <InfoPanel
              eyebrow="Instructions"
              title="Complete the workbench steps"
              description="Work through the lab as if you are preparing evidence for a real stakeholder review."
            >
              <div className="space-y-3">
                {getInstructions(lab.id).map((instruction, index) => (
                  <div
                    key={instruction}
                    className="flex gap-4 rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.34] px-4 py-4"
                  >
                    <span className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                      0{index + 1}
                    </span>
                    <p className="text-sm leading-6 text-slate-300">{instruction}</p>
                  </div>
                ))}
              </div>
            </InfoPanel>

            <InfoPanel
              eyebrow="Expected Output"
              title="What your submission should contain"
              description={lab.expectedOutput}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {lab.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4"
                  >
                    <p className="text-sm font-medium text-white">{deliverable}</p>
                  </div>
                ))}
              </div>
            </InfoPanel>

            <InfoPanel
              eyebrow="Starter Prompt"
              title="Use this to begin"
              description={lab.starterPrompt}
            >
              <Link
                href={`/lab?challenge=${lab.id}`}
                className="inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Open Workspace
              </Link>
            </InfoPanel>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
            {rubric ? (
              <Reveal delay={0.12}>
                <GlassPanel className="p-6" glow="blue">
                  <div className="relative">
                    <div className="mb-5 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                    <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                      Rubric
                    </p>
                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {rubric.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300/[0.78]">{rubric.description}</p>
                    <div className="mt-5 rounded-[1.15rem] border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-4 py-3">
                      <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">
                        Passing level
                      </p>
                      <p className="mt-2 text-sm font-medium text-cyan-50">{rubric.passingLevel}</p>
                    </div>
                    <div className="mt-5 space-y-3">
                      {rubric.criteria.map((criterion) => (
                        <div
                          key={criterion.id}
                          className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-medium text-white">{criterion.label}</p>
                            <span className="text-xs text-cyan-200">{criterion.weight}%</span>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-slate-400">{criterion.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassPanel>
              </Reveal>
            ) : null}

            <Reveal delay={0.16}>
              <GlassPanel className="p-6" glow="cyan">
                <div className="relative">
                  <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                    Practice Workflow
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                    Continue in the workspace.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300/[0.78]">
                    The workspace keeps the SQL editor, insight notes, recommendation draft, and preview tabs together for this challenge.
                  </p>
                  <Link
                    href={`/lab?challenge=${lab.id}`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  >
                    Open Workspace
                  </Link>
                </div>
              </GlassPanel>
            </Reveal>
          </aside>
        </section>
      </Container>

      <PremiumFooter />
    </main>
  );
}

function getLab(labId: string) {
  return labs.find((lab) => lab.id === (labId as LabId));
}

function getInstructions(labId: LabId) {
  const lab = getLab(labId);

  return lab?.instructions.length
    ? lab.instructions
    : [
        "Read the problem brief and identify the core business question.",
        "Use the dataset context to decide what evidence is needed before writing the final answer.",
      ];
}

function InfoPanel({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <GlassPanel className="p-6 lg:p-7" glow="cyan">
        <div className="relative">
          <div className="mb-5 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">{eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300/[0.78]">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-medium text-white">{value}</p>
    </div>
  );
}
