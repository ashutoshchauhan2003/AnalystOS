import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { workflowSteps } from "@/content/marketing-home";

export function HowItWorksSection() {
  return (
    <section id="flow" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="A visible pipeline from learning to hiring signal."
          description="Instead of icon rows, the flow is presented as a system pipeline with depth, sequence, and momentum. The page should feel like stepping through an intelligent analyst engine."
          align="center"
        />

        <GlassPanel className="mt-16 overflow-visible p-8 lg:p-10" glow="cyan">
          <div className="pointer-events-none absolute inset-x-16 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-40" />
          <div className="grid gap-5 xl:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.1}>
                <div className="relative h-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.42),rgba(2,6,23,0.24))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="pointer-events-none absolute inset-y-1/2 right-[-20px] hidden h-px w-10 bg-gradient-to-r from-cyan-300/60 to-transparent xl:block" />
                  <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full bg-cyan-300/8 blur-2xl" />
                  <p className="text-xs uppercase tracking-[0.36em] text-cyan-200/70">{step.step}</p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-base leading-8 text-slate-300/76">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
}
