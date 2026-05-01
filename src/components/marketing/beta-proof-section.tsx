import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { Reveal } from "@/components/motion/reveal";

const proofSteps = [
  {
    title: "Diagnostic",
    detail: "Find your best-fit analyst role path before choosing what to practise.",
  },
  {
    title: "Lab",
    detail: "Work through realistic SQL, dashboard, BA, and EDA challenges.",
  },
  {
    title: "Review",
    detail: "Submit evidence and get rubric-based feedback on job-ready quality.",
  },
  {
    title: "Portfolio",
    detail: "Package reviewed work into a recruiter-facing proof profile.",
  },
];

export function BetaProofSection() {
  return (
    <section id="beta" className="py-20 lg:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-stretch">
          <Reveal>
            <GlassPanel className="h-full p-7 lg:p-8" glow="cyan">
              <div className="relative">
                <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                <p className="text-[11px] uppercase tracking-[0.36em] text-cyan-200/[0.72]">
                  Join the beta / Share feedback
                </p>
                <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white lg:text-5xl">
                  Help shape AnalystOS for Indian graduate hiring.
                </h2>
                <p className="mt-6 text-base leading-8 text-slate-300/[0.78]">
                  The beta is focused on one clear outcome: helping learners show credible analyst proof before they apply.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <GlowButton href="/sign-up">Join Beta</GlowButton>
                  <GlowButton href="https://forms.gle/analystos-feedback" variant="secondary">
                    Share Feedback
                  </GlowButton>
                </div>
                <p className="mt-5 text-xs leading-5 text-slate-500">
                  Feedback link is a placeholder while the beta intake form is being finalized.
                </p>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassPanel className="h-full p-7 lg:p-8" glow="blue">
              <div className="relative">
                <p className="text-[11px] uppercase tracking-[0.36em] text-cyan-200/[0.72]">
                  Product proof loop
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">
                  From role clarity to recruiter-visible work.
                </h3>
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {proofSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.36] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <p className="text-[10px] uppercase tracking-[0.26em] text-cyan-200/[0.72]">
                        0{index + 1}
                      </p>
                      <h4 className="mt-3 text-lg font-semibold text-white">{step.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
