import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { SectionHeading } from "@/components/shared/section-heading";
import { pricingTiers } from "@/content/marketing-home";
import { cn } from "@/lib/utils";

export function PricingPreviewSection() {
  return (
    <section id="pricing" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-4 h-48 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.08),transparent_38%)]" />
      <Container>
        <SectionHeading
          eyebrow="Pricing Preview"
          title="Simple entry points, premium execution underneath."
          description="Pricing is framed as a clear progression: start building, go deeper with advanced practice, or activate team-level recruiting and training workflows."
          align="center"
        />

        <div className="mt-16 grid gap-6 xl:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index * 0.1}>
              <GlassPanel
                className={cn(
                  "h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 lg:p-8",
                  tier.featured &&
                    "border-cyan-300/35 bg-[linear-gradient(180deg,rgba(34,211,238,0.14),rgba(34,211,238,0.05))] shadow-[0_0_60px_rgba(103,232,249,0.16)]",
                )}
                glow={tier.featured ? "cyan" : "blue"}
              >
                <div className="flex h-full flex-col">
                  <div className="mb-6 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-[1.9rem] font-semibold tracking-[-0.03em] text-white">
                      {tier.name}
                    </h3>
                    {tier.featured ? (
                      <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
                        Recommended
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-7 flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-[-0.05em] text-white">
                      {tier.price}
                    </span>
                    <span className="pb-2 text-slate-400">{tier.cadence}</span>
                  </div>

                  <p className="mt-6 text-base leading-8 text-slate-300/76">{tier.description}</p>

                  <div className="mt-8 space-y-3">
                    {tier.features.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3 text-sm text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  <GlowButton
                    href="/sign-up"
                    variant={tier.featured ? "primary" : "secondary"}
                    className="mt-8"
                  >
                    Choose {tier.name}
                  </GlowButton>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
