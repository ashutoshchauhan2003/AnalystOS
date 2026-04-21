import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { problemBrief } from "@/content/lab-workspace";
import { StatusPill } from "@/components/lab-workspace/status-pill";

export function ProblemBriefPanel() {
  return (
    <Reveal className="min-h-0 h-full">
      <GlassPanel
        className="flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.028))] p-5 lg:p-6"
        glow="blue"
      >
        <div className="shrink-0">
          <div className="mb-4 h-px w-14 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
            {problemBrief.eyebrow}
          </p>
          <h2 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-white">
            {problemBrief.title}
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-300/76">{problemBrief.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill label="Brief" tone="neutral" />
            <StatusPill label="Exec Output" tone="cyan" />
          </div>
        </div>

        <div className="mt-6 shrink-0 space-y-4 pr-1">
          <section>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Mission</p>
            <div className="mt-3 space-y-2.5">
              {problemBrief.objectives.slice(0, 2).map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    0{index + 1}
                  </span>
                  <p className="mt-1.5 text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Guardrails</p>
            <div className="mt-3 space-y-2.5">
              {problemBrief.constraints.slice(0, 2).map((item) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-sm leading-6 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Win Condition</p>
            <div className="mt-3 rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(34,211,238,0.07),rgba(34,211,238,0.02))] px-3.5 py-3 text-sm leading-6 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {problemBrief.successCriteria[0]}
            </div>
          </section>
        </div>
      </GlassPanel>
    </Reveal>
  );
}
