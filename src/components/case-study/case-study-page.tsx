import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { caseStudy } from "@/content/case-study";

export function CaseStudyPage() {
  return (
    <CaseStudyShell>
      <CaseStudyHero />

      <CaseStudySection
        eyebrow="Business Problem"
        title="Start with the business question"
        description="This case study is framed for recruiters and hiring managers first: what problem existed, why it mattered, and what the analyst needed to clarify."
        delay={0.04}
      >
        <GlassPanel className="max-w-4xl bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-6 lg:p-7" glow="none">
          <p className="text-base leading-8 text-slate-300">{caseStudy.businessProblem}</p>
        </GlassPanel>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Dataset Context"
        title="What data was used and why"
        description="The goal was not to show every table, but to make the analytical inputs legible to a non-technical reviewer."
        delay={0.08}
      >
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-6" glow="blue">
            <p className="text-base leading-8 text-slate-300">{caseStudy.dataset.summary}</p>
          </GlassPanel>
          <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-6" glow="none">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Data Inputs</p>
            <div className="mt-4 space-y-3">
              {caseStudy.dataset.bullets.map((item) => (
                <div key={item} className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Method"
        title="A process that stays decision-focused"
        description="The analysis was designed to move from framing, to signal isolation, to actionability without bloating the story."
        delay={0.12}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {caseStudy.method.map((step, index) => (
            <GlassPanel key={step.label} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow={index === 1 ? "cyan" : "none"}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">0{index + 1}</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-white">{step.label}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{step.description}</p>
            </GlassPanel>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Showcase"
        title="Decision-ready analytical surfaces"
        description="Instead of showing a noisy product dashboard, the case study highlights the most persuasive analytical views and why they mattered."
        delay={0.16}
      >
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_0.9fr]">
          <GlassPanel className="bg-[linear-gradient(180deg,rgba(8,17,29,0.96),rgba(7,13,23,0.92))] p-6" glow="cyan">
            <div className="rounded-[1.25rem] border border-cyan-300/12 bg-slate-950/88 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/72">Analyst View</p>
                  <p className="mt-2 text-sm leading-7 text-slate-400">Cohort risk and retained-revenue movement</p>
                </div>
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                  Decision lens
                </div>
              </div>

              <div className="mt-6 grid h-[18rem] gap-3 rounded-[1.1rem] border border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4">
                <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-3">
                  {[78, 54, 32].map((value, index) => (
                    <div key={value} className="rounded-[1rem] border border-white/6 bg-white/[0.03] p-3">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Band 0{index + 1}</p>
                      <div className="mt-4 h-24 rounded-[0.9rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.18),rgba(34,211,238,0.04))] p-2">
                        <div className="flex h-full items-end">
                          <div
                            className="w-full rounded-[0.8rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.95),rgba(34,211,238,0.18))]"
                            style={{ height: `${value}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {caseStudy.showcase.slice(0, 3).map((item) => (
                    <div key={item.title} className="rounded-[1rem] border border-white/6 bg-white/[0.03] px-3 py-3">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">{item.title}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-200">{item.stat}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>

          <div className="space-y-4">
            {caseStudy.showcase.map((item) => (
              <GlassPanel key={item.title} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="none">
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">{item.title}</p>
                <h3 className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">{item.stat}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Insights"
        title="What the analysis made clear"
        description="The value of the project is in the clarity of the read, not just in the existence of charts or SQL."
        delay={0.2}
      >
        <div className="space-y-4">
          {caseStudy.insights.map((insight, index) => (
            <Reveal key={insight} delay={0.04 * index}>
              <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow={index === 0 ? "cyan" : "none"}>
                <div className="flex items-start gap-4">
                  <div className="rounded-full border border-cyan-300/18 bg-cyan-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-cyan-100">
                    0{index + 1}
                  </div>
                  <p className="text-base leading-8 text-slate-200">{insight}</p>
                </div>
              </GlassPanel>
            </Reveal>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Recommendation"
        title="The analyst recommendation"
        description="This section shows how the quantitative read was translated into an action leadership could understand and execute."
        delay={0.24}
      >
        <GlassPanel className="bg-[linear-gradient(180deg,rgba(34,211,238,0.1),rgba(34,211,238,0.03))] p-7" glow="cyan">
          <p className="text-lg leading-9 text-slate-100">{caseStudy.recommendation}</p>
        </GlassPanel>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Impact"
        title="Why this project matters"
        description="Recruiters are looking for clear proof that analysis can drive decisions. This is the section that makes that signal easy to evaluate."
        delay={0.28}
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {caseStudy.impact.map((item) => (
            <GlassPanel key={item.label} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="blue">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
              <p className="mt-4 text-base leading-8 text-slate-200">{item.value}</p>
            </GlassPanel>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Tools & Skills"
        title="Capabilities demonstrated"
        description="A concise recruiter-facing summary of the tools, methods, and communication skills shown in the project."
        delay={0.32}
      >
        <div className="flex flex-wrap gap-3">
          {caseStudy.tools.map((tool) => (
            <div
              key={tool}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-200"
            >
              {tool}
            </div>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection
        eyebrow="Related Projects"
        title="Where this story leads next"
        description="A recruiter or hiring manager should be able to continue through adjacent proof-of-skill without friction."
        delay={0.36}
      >
        <div className="grid gap-4 xl:grid-cols-2">
          {caseStudy.relatedProjects.map((project) => (
            <GlassPanel key={project.title} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="none">
              <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Next Case Study</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-white">{project.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{project.detail}</p>
            </GlassPanel>
          ))}
        </div>
      </CaseStudySection>

      <Reveal className="mt-24" delay={0.4}>
        <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-7 lg:p-8" glow="cyan">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">Recruiter CTA</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">{caseStudy.cta.title}</h2>
              <p className="mt-4 text-base leading-8 text-slate-300">{caseStudy.cta.body}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <GlowButton href={caseStudy.cta.primaryHref}>{caseStudy.cta.primaryLabel}</GlowButton>
              <GlowButton href={caseStudy.cta.secondaryHref} variant="secondary">
                {caseStudy.cta.secondaryLabel}
              </GlowButton>
            </div>
          </div>
        </GlassPanel>
      </Reveal>
    </CaseStudyShell>
  );
}
