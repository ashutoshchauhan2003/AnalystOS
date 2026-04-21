import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials, trustStats } from "@/content/marketing-home";

export function TestimonialsSection() {
  return (
    <section id="outcomes" className="relative py-28">
      <div className="pointer-events-none absolute left-0 top-12 h-56 w-56 rounded-full bg-indigo-400/5 blur-[120px]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="Trust, Testimonials, Outcomes"
            title="Signal that feels credible, calm, and recruiter-ready."
            description="The trust layer balances premium restraint with outcomes. It shows what candidates gain, what recruiters can evaluate, and why the platform creates stronger evidence than passive learning."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {trustStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <GlassPanel
                  className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 lg:p-6"
                  glow={index === 0 ? "cyan" : "blue"}
                >
                  <p className="text-4xl font-semibold tracking-[-0.04em] text-white">{stat.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300/72">{stat.label}</p>
                </GlassPanel>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.12}>
              <GlassPanel
                className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 lg:p-9"
                glow={index === 0 ? "cyan" : "blue"}
              >
                <div className="mb-8 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                <p className="text-[1.15rem] leading-9 text-slate-100/92">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-10 flex items-end justify-between gap-6">
                  <div>
                    <p className="text-base font-medium text-white">{item.name}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.role}</p>
                  </div>
                  <div className="max-w-[220px] rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">
                      Outcome
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300/72">{item.outcome}</p>
                  </div>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
