import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { SectionHeading } from "@/components/shared/section-heading";
import { featuredProjects } from "@/content/marketing-home";

export function FeaturedProjectsSection() {
  return (
    <section id="projects" className="relative py-28">
      <div className="pointer-events-none absolute right-0 top-10 h-56 w-56 rounded-full bg-cyan-400/5 blur-[110px]" />
      <Container>
        <SectionHeading
          eyebrow="Featured Projects"
          title="Project work that reads like real analyst execution."
          description="Each project preview is framed around a business problem, working tools, measurable upside, and role relevance so the product immediately communicates practical depth."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <GlassPanel
                className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 transition-transform duration-500 hover:-translate-y-1.5 lg:p-8"
                glow={index === 1 ? "cyan" : "blue"}
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/75">
                        {project.relevance}
                      </p>
                      <h3 className="mt-4 text-[1.9rem] font-semibold leading-[1.12] tracking-[-0.03em] text-white">
                        {project.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200/70">
                      Real Work
                    </span>
                  </div>

                  <p className="mt-6 flex-1 text-base leading-8 text-slate-300/76">{project.problem}</p>

                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="mt-9 rounded-[24px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(34,211,238,0.04))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">
                      Projected impact
                    </p>
                    <p className="mt-3 text-lg tracking-[-0.02em] text-white">{project.impact}</p>
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
