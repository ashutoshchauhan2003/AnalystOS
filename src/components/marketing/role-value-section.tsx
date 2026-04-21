import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { rolePanels } from "@/content/marketing-home";

export function RoleValueSection() {
  return (
    <section id="platform" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_34%)]" />
      <Container>
        <SectionHeading
          eyebrow="Role-Based Value"
          title="Three vantage points, one premium system."
          description="The homepage introduces the platform as a layered control surface for candidates, learners, and recruiters, with each view grounded in workflow depth instead of shallow feature cards."
        />

        <div className="mt-16 grid gap-6 xl:grid-cols-3">
          {rolePanels.map((panel, index) => (
            <Reveal key={panel.eyebrow} delay={index * 0.12}>
              <GlassPanel
                className="group h-full min-h-[420px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 transition-transform duration-500 hover:-translate-y-1.5 lg:p-8"
                glow={index === 1 ? "cyan" : "blue"}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_28%)] opacity-70" />
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-6 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                    <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/75">
                      {panel.eyebrow}
                    </p>
                    <h3 className="mt-5 max-w-sm text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
                      {panel.title}
                    </h3>
                    <p className="mt-6 max-w-md text-base leading-8 text-slate-300/76">
                      {panel.description}
                    </p>
                  </div>

                  <div className="mt-10 space-y-3">
                    {panel.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={bullet}
                        className="flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                            0{bulletIndex + 1}
                          </span>
                          <span className="text-sm text-slate-200">{bullet}</span>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]" />
                      </div>
                    ))}
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
