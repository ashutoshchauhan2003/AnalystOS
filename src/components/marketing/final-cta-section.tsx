import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCtaSection() {
  return (
    <section className="pb-28 pt-18">
      <Container>
        <Reveal>
          <GlassPanel className="overflow-hidden p-10 lg:p-14" glow="cyan">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]" />
            <div className="pointer-events-none absolute left-[8%] top-[18%] h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl" />
            <div className="pointer-events-none absolute right-[10%] top-[10%] h-36 w-36 rounded-full bg-indigo-400/10 blur-[90px]" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                <p className="text-[11px] uppercase tracking-[0.36em] text-cyan-200/[0.72]">
                  AnalystOS Free Core
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white lg:text-5xl">
                  Practise real analyst work and turn it into recruiter-visible proof.
                </h2>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300/[0.76]">
                  AnalystOS teaches judgment, simulates execution, and presents your strongest work
                  with the clarity recruiters actually need.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 self-start lg:self-auto">
                <GlowButton href="/sign-up">Start In AnalystOS</GlowButton>
                <GlowButton href="#platform" variant="secondary">
                  View Platform Flow
                </GlowButton>
              </div>
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </section>
  );
}
