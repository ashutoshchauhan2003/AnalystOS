import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PremiumFooter } from "@/components/layout/premium-footer";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { capstones } from "@/content/capstones";
import { labs } from "@/content/labs";
import { analystPaths, type PathId, type PathModule } from "@/content/paths";

type PathPageProps = {
  params: {
    pathId: string;
  };
};

export function generateStaticParams() {
  return analystPaths.map((path) => ({
    pathId: path.id,
  }));
}

export function generateMetadata({ params }: PathPageProps): Metadata {
  const path = getPath(params.pathId);

  if (!path) {
    return {
      title: "Path Not Found",
    };
  }

  return {
    title: `${path.title} Path`,
    description: `${path.title} path in AnalystOS: ${path.description}`,
    alternates: {
      canonical: `/paths/${path.id}`,
    },
  };
}

export default function PathDetailPage({ params }: PathPageProps) {
  const path = getPath(params.pathId);

  if (!path) {
    notFound();
  }

  const capstone = capstones.find((item) => item.id === path.capstoneId);
  const recommendedLabs = labs.filter((lab) => path.recommendedLabs.includes(lab.id));

  return (
    <main className="relative min-h-screen overflow-hidden scroll-smooth bg-[#03060d] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(99,102,241,0.13),transparent_24%),linear-gradient(180deg,#07111d_0%,#050a14_48%,#03060d_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-28 h-[44rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)] opacity-40" />
      <div className="pointer-events-none absolute left-[-8%] top-[24%] h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[42%] h-72 w-72 rounded-full bg-indigo-400/[0.08] blur-[130px]" />

      <PremiumNavbar />

      <Container className="relative pb-24 pt-14 lg:pb-28 lg:pt-20">
        <section className="grid gap-7 lg:grid-cols-[minmax(0,0.92fr)_minmax(300px,0.42fr)] lg:items-end">
          <Reveal>
            <div>
              <Link
                href="/paths"
                className="inline-flex items-center rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
              >
                Back to paths
              </Link>
              <p className="mt-8 text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                AnalystOS Role Path
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
                {path.title}
              </h1>
              <p className="mt-5 max-w-3xl text-xl font-medium leading-8 text-cyan-100">
                {path.subtitle}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300/[0.78] lg:text-lg">
                {path.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {path.roleFit.map((role) => (
                  <span
                    key={role}
                    className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassPanel className="p-6" glow="cyan">
              <div className="relative grid gap-3">
                <SummaryMetric label="Difficulty" value={path.difficulty} />
                <SummaryMetric label="Duration" value={path.estimatedDuration} />
                <SummaryMetric label="Weekly modules" value={`${path.weeklyModules.length}`} />
                <Link
                  href="/sign-up"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                  Start Path
                </Link>
              </div>
            </GlassPanel>
          </Reveal>
        </section>

        <section className="mt-12 grid gap-5 lg:grid-cols-2">
          <ChipPanel eyebrow="Skills" title="Capabilities You Will Build" items={path.skills} />
          <ChipPanel eyebrow="Tools" title="Tooling And Work Surfaces" items={path.tools} accent />
        </section>

        <SectionHeader
          eyebrow="Weekly Modules"
          title="A structured timeline from fundamentals to proof."
          description="Each week connects topics, goals, outcomes, and recommended practice so progress stays visible."
        />

        <section className="relative mt-8">
          <div className="pointer-events-none absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-cyan-300/50 via-cyan-300/[0.2] to-transparent lg:block" />
          <div className="grid gap-5">
            {path.weeklyModules.map((module, index) => (
              <TimelineModule key={module.id} module={module} index={index} />
            ))}
          </div>
        </section>

        <SectionHeader
          eyebrow="Recommended Labs"
          title="Practice work mapped to this path."
          description="These local-content labs are designed to create evidence for the path outcome before capstone work."
        />

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recommendedLabs.map((lab, index) => (
            <Reveal key={lab.id} delay={index * 0.04} hover="lift">
              <GlassPanel className="flex h-full flex-col p-5 lg:p-6" glow={index % 2 === 0 ? "cyan" : "blue"}>
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
                      {lab.skill}
                    </p>
                    <span className="rounded-full border border-cyan-300/[0.2] bg-cyan-300/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                      {lab.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {lab.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300/[0.78]">{lab.brief}</p>
                  <div className="mt-5 rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.34] p-4">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                      Output
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{lab.expectedOutput}</p>
                  </div>
                  <Link
                    href={`/labs/${lab.id}`}
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  >
                    Start Lab
                  </Link>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </section>

        {capstone ? (
          <section id="capstone" className="mt-16 lg:mt-20">
            <Reveal>
              <GlassPanel className="p-6 lg:p-8" glow="cyan">
                <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(300px,0.48fr)]">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                      Capstone
                    </p>
                    <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white lg:text-5xl">
                      {capstone.title}
                    </h2>
                    <p className="mt-5 text-base leading-8 text-slate-300/[0.8]">
                      {capstone.problemStatement}
                    </p>
                    <div className="mt-7 rounded-[1.4rem] border border-cyan-300/[0.18] bg-cyan-300/[0.07] p-5">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-100">
                        Portfolio summary
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-200">
                        {capstone.portfolioSummary}
                      </p>
                    </div>
                    <Link
                      href="#capstone"
                      className="mt-7 inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-cyan-300/[0.3] hover:text-cyan-100"
                    >
                      View Capstone
                    </Link>
                  </div>

                  <div className="space-y-5">
                    <MiniList title="Required Artefacts" items={capstone.requiredArtefacts} />
                    <MiniList title="Evaluation Criteria" items={capstone.evaluationCriteria} />
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          </section>
        ) : null}

        <section className="mt-16 lg:mt-20">
          <Reveal>
            <GlassPanel className="p-6 lg:p-8" glow="blue">
              <div className="relative grid gap-8 lg:grid-cols-[0.65fr_1fr] lg:items-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                    Outcome
                  </p>
                  <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white lg:text-5xl">
                    Build proof recruiters can scan.
                  </h2>
                </div>
                <div>
                  <p className="text-lg leading-8 text-slate-200">{path.portfolioOutcome}</p>
                  <p className="mt-6 text-sm uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                    After completing this path, you will be able to...
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {getOutcomeBullets(path.id).map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-6 text-slate-300"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassPanel>
          </Reveal>
        </section>
      </Container>

      <PremiumFooter />
    </main>
  );
}

function getPath(pathId: string) {
  return analystPaths.find((path) => path.id === (pathId as PathId));
}

function getOutcomeBullets(pathId: PathId) {
  const bullets: Record<PathId, string[]> = {
    "data-analyst": [
      "Write SQL-backed evidence for business questions.",
      "Critique dashboards and improve metric hierarchy.",
      "Package insights into recruiter-readable case studies.",
    ],
    "business-analyst": [
      "Turn ambiguity into scoped requirements.",
      "Write user stories and acceptance criteria.",
      "Communicate process changes with stakeholder clarity.",
    ],
    "data-scientist": [
      "Explore messy datasets with Python and SQL validation.",
      "Explain model-ready signals and assumptions.",
      "Recommend experiments from interpretable analysis.",
    ],
  };

  return bullets[pathId];
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-base font-medium text-white">{value}</p>
    </div>
  );
}

function ChipPanel({
  eyebrow,
  title,
  items,
  accent = false,
}: {
  eyebrow: string;
  title: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <Reveal>
      <GlassPanel className="h-full p-6 lg:p-7" glow={accent ? "cyan" : "blue"}>
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.72]">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
            {title}
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {items.map((item) => (
              <span
                key={item}
                className={
                  accent
                    ? "rounded-full border border-cyan-300/[0.14] bg-cyan-300/[0.07] px-3 py-2 text-xs text-cyan-100"
                    : "rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
                }
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mt-16 max-w-3xl lg:mt-20">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-white lg:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-300/[0.78]">{description}</p>
      </Reveal>
    </section>
  );
}

function TimelineModule({ module, index }: { module: PathModule; index: number }) {
  const moduleLabs = labs.filter((lab) => module.labIds.includes(lab.id));
  const outcomes = moduleLabs.length
    ? moduleLabs.map((lab) => lab.expectedOutput)
    : ["A completed practice artifact connected to this week's goal."];

  return (
    <Reveal delay={index * 0.04}>
      <GlassPanel className="p-5 lg:grid lg:grid-cols-[96px_minmax(0,1fr)] lg:gap-6 lg:p-6" glow={index % 2 === 0 ? "cyan" : "none"}>
        <div className="relative mb-5 flex items-center gap-4 lg:mb-0 lg:block">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/[0.35] bg-cyan-300/10 text-xs font-semibold tracking-[0.2em] text-cyan-100 shadow-[0_0_28px_rgba(103,232,249,0.14)]">
            W{index + 1}
          </div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500 lg:mt-5">
            Module
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                {module.title}
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300/[0.78]">
                {module.description}
              </p>
            </div>
            <span className="rounded-full border border-cyan-300/[0.22] bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100">
              {module.skills.length} topics
            </span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <ModuleBlock title="Topics" items={module.skills} />
            <ModuleBlock title="Goals" items={[module.description]} />
            <ModuleBlock title="Outcomes" items={outcomes.slice(0, 3)} />
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function ModuleBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.34] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.35rem] border border-white/[0.08] bg-slate-950/[0.34] p-5">
      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
            <span className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
              0{index + 1}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
