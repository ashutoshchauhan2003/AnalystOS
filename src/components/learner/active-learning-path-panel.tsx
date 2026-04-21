import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { activeLearningPath } from "@/content/learner-dashboard";

export function ActiveLearningPathPanel() {
  return (
    <Reveal>
      <GlassPanel
        className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-7 lg:p-8"
        glow="cyan"
      >
        <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
              {activeLearningPath.eyebrow}
            </p>
            <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white">
              {activeLearningPath.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300/76">
              {activeLearningPath.description}
            </p>
          </div>
          <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            {activeLearningPath.progressLabel}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {activeLearningPath.modules.map((module, index) => (
            <div
              key={module.label}
              className="rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/14 bg-cyan-300/8 text-[10px] uppercase tracking-[0.32em] text-cyan-100/80">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="text-base text-white">{module.label}</p>
                    <p className="mt-1 text-sm text-slate-400">{module.status}</p>
                  </div>
                </div>
                <p className="text-sm text-cyan-100">{module.progress}%</p>
              </div>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/6">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(103,232,249,0.95),rgba(59,130,246,0.75))] shadow-[0_0_18px_rgba(103,232,249,0.2)]"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </Reveal>
  );
}
