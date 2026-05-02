import type { Metadata } from "next";
import Link from "next/link";
import { PremiumFooter } from "@/components/layout/premium-footer";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { analystPaths } from "@/content/paths";

export const metadata: Metadata = {
  title: "Learning Tracks",
  description:
    "Explore beginner-friendly AnalystOS learning tracks for Data Analyst, Business Analyst, and Data Scientist learners.",
  alternates: {
    canonical: "/paths",
  },
};

export default function PathsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden scroll-smooth bg-[#03060d] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(99,102,241,0.13),transparent_24%),linear-gradient(180deg,#07111d_0%,#050a14_48%,#03060d_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-28 h-[44rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_84%)] opacity-40" />
      <div className="pointer-events-none absolute left-[-8%] top-[24%] h-80 w-80 rounded-full bg-cyan-400/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[42%] h-72 w-72 rounded-full bg-indigo-400/[0.08] blur-[130px]" />

      <PremiumNavbar />

      <Container className="relative pb-24 pt-14 lg:pb-28 lg:pt-20">
        <section className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
          <div className="inline-flex items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-cyan-200">
            AnalystOS Learning Tracks
          </div>
          <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
            Choose a learning track that starts at your level.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300/[0.78] lg:text-lg">
            Each track gives you simple lessons, guided practice tasks, and proof you can show.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {analystPaths.map((path, index) => (
            <Reveal key={path.id} delay={index * 0.06} hover="lift">
              <GlassPanel
                className="flex h-full flex-col p-6 lg:p-7"
                glow={index === 1 ? "blue" : "cyan"}
              >
                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.72]">
                        Track 0{index + 1}
                      </p>
                      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                        {path.title}
                      </h2>
                    </div>
                    <span className="rounded-full border border-cyan-300/[0.22] bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100">
                      {path.difficulty}
                    </span>
                  </div>

                  <p className="mt-4 text-base font-medium leading-7 text-cyan-100">
                    {path.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-300/[0.78]">
                    {path.description}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Metric label="Estimated time" value={path.estimatedDuration} />
                    <Metric label="Guided steps" value={`${path.weeklyModules.length} phases`} />
                  </div>

                  <TagGroup label="Skills" items={path.skills.slice(0, 7)} />
                  <TagGroup label="Tools" items={path.tools} variant="cyan" />

                  <div className="mt-6 rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.38] p-4">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                      Your proof outcome
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {path.portfolioOutcome}
                    </p>
                  </div>

                  <Link
                    href={`/paths/${path.id}`}
                    className="mt-7 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  >
                    View Track
                  </Link>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </section>
      </Container>

      <PremiumFooter />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.035] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function TagGroup({
  label,
  items,
  variant = "neutral",
}: {
  label: string;
  items: string[];
  variant?: "neutral" | "cyan";
}) {
  return (
    <div className="mt-6">
      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className={
              variant === "cyan"
                ? "rounded-full border border-cyan-300/[0.14] bg-cyan-300/[0.07] px-3 py-1.5 text-xs text-cyan-100"
                : "rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
