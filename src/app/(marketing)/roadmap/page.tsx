import type { Metadata } from "next";
import { PremiumFooter } from "@/components/layout/premium-footer";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";

const roadmapStages = [
  {
    stage: "01",
    title: "Current Prototype Stage",
    status: "Live now",
    horizon: "Proof of concept",
    description:
      "AnalystOS currently demonstrates the cinematic learner experience, protected prototype auth, the SQL lab workspace, and recruiter-facing proof surfaces.",
    highlights: [
      "Premium marketing surface and prototype access",
      "Protected dashboard and lab routes",
      "Mock SQL engine, readiness checks, and case-study proof",
    ],
  },
  {
    stage: "02",
    title: "MVP Stage",
    status: "Next build",
    horizon: "Core product",
    description:
      "The MVP turns the prototype into a focused free-core product with persistent learner state, clearer onboarding, and a reliable task-to-proof loop.",
    highlights: [
      "Persistent user workspaces",
      "Structured onboarding and learner profile setup",
      "Stable submission model for lab progress",
    ],
  },
  {
    stage: "03",
    title: "Practice Lab Stage",
    status: "Planned",
    horizon: "Skill depth",
    description:
      "Practice labs expand beyond churn analysis into repeatable analyst missions across SQL, business diagnosis, experimentation, and stakeholder communication.",
    highlights: [
      "Multiple scenario-driven analytics labs",
      "Progressive hints and evaluator feedback",
      "Skill signals mapped to job-ready competencies",
    ],
  },
  {
    stage: "04",
    title: "Portfolio + Review Stage",
    status: "Planned",
    horizon: "Proof quality",
    description:
      "Learners convert lab outputs into polished public artifacts, receive review feedback, and improve the clarity of their recruiter-facing evidence.",
    highlights: [
      "Portfolio-ready case-study builder",
      "Review queues and revision history",
      "Public proof pages with metrics and narrative quality",
    ],
  },
  {
    stage: "05",
    title: "Recruiter Marketplace Stage",
    status: "Future",
    horizon: "Talent discovery",
    description:
      "Recruiters discover candidates through proof-of-skill, compare work samples, and shortlist learners based on demonstrated analyst execution.",
    highlights: [
      "Recruiter search and shortlist workflows",
      "Candidate proof profiles and skill filters",
      "Marketplace analytics for hiring signal quality",
    ],
  },
];

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "Explore the AnalystOS roadmap from the current prototype stage to MVP, practice labs, portfolio review, and recruiter marketplace.",
  alternates: {
    canonical: "/roadmap",
  },
};

export default function RoadmapPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_86%_16%,rgba(99,102,241,0.12),transparent_24%),linear-gradient(180deg,#07111d_0%,#050a14_48%,#03060d_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-28 h-[44rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)] opacity-40" />
      <div className="pointer-events-none absolute left-[-8%] top-[22%] h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[38%] h-72 w-72 rounded-full bg-indigo-400/[0.08] blur-[130px]" />

      <PremiumNavbar />

      <Container className="relative pb-24 pt-16 lg:pb-28 lg:pt-24">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <div>
              <div className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-cyan-200">
                AnalystOS Roadmap
              </div>
              <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
                From prototype lab to recruiter marketplace.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300/[0.78]">
                A staged product path for turning AnalystOS into a free-core job-ready analytics lab
                where learners practise real analyst tasks, build portfolio-ready proof, and become
                discoverable to recruiters.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassPanel className="p-6 lg:p-7" glow="cyan">
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
                  Current Direction
                </p>
                <p className="mt-5 text-2xl font-semibold leading-snug tracking-[-0.03em] text-white">
                  Keep the premium simulation feel, then make the proof loop durable enough for
                  real learner progress and recruiter trust.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {["Free core", "Practice labs", "Recruiter signal"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-4">
                  <GlowButton href="/sign-up">Try Workspace</GlowButton>
                  <GlowButton href="/lab" variant="secondary">
                    View Lab
                  </GlowButton>
                </div>
              </div>
            </GlassPanel>
          </Reveal>
        </section>

        <section className="mt-16 lg:mt-20">
          <div className="relative">
            <div className="pointer-events-none absolute left-5 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-gradient-to-b from-cyan-300/60 via-cyan-300/[0.22] to-transparent lg:block" />
            <div className="grid gap-5">
              {roadmapStages.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05} hover="lift">
                  <GlassPanel
                    className="grid gap-6 p-5 lg:grid-cols-[96px_minmax(0,0.82fr)_minmax(260px,0.58fr)] lg:items-stretch lg:p-6"
                    glow={index === 0 ? "cyan" : index % 2 === 0 ? "blue" : "none"}
                  >
                    <div className="relative flex items-start gap-4 lg:block">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-300/[0.35] bg-cyan-300/10 text-xs font-semibold tracking-[0.2em] text-cyan-100 shadow-[0_0_28px_rgba(103,232,249,0.14)]">
                        {item.stage}
                      </div>
                      <div className="lg:mt-5">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                          {item.horizon}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white lg:text-3xl">
                          {item.title}
                        </h2>
                        <span className="rounded-full border border-cyan-300/[0.22] bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-100">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300/[0.78] lg:text-base lg:leading-8">
                        {item.description}
                      </p>
                    </div>

                    <div className="relative rounded-[1.4rem] border border-white/[0.08] bg-slate-950/[0.38] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                        Key outcomes
                      </p>
                      <div className="mt-4 space-y-3">
                        {item.highlights.map((highlight) => (
                          <div key={highlight} className="flex gap-3 text-sm leading-6 text-slate-300">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.65)]" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassPanel>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Container>

      <PremiumFooter />
    </main>
  );
}
