import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { progressSummary } from "@/content/learner-dashboard";

export function ProgressSummaryPanel() {
  return (
    <Reveal delay={0.08}>
      <GlassPanel className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-7 lg:p-8" glow="cyan">
        <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">Progress Summary</p>
        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
          Multi-layer advancement view
        </h2>

        <div className="mt-8 space-y-6">
          {progressSummary.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-slate-300">{item.label}</p>
                <p className="text-sm text-white">{item.value}</p>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/6">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(103,232,249,0.95),rgba(59,130,246,0.78))] shadow-[0_0_18px_rgba(103,232,249,0.25)]"
                  style={{ width: `${item.bar}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[1.4rem] border border-cyan-300/14 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(34,211,238,0.05))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/70">Trajectory</p>
          <p className="mt-3 text-base leading-7 text-slate-100">
            You are on pace to publish your next portfolio case study within the current review cycle.
          </p>
        </div>
      </GlassPanel>
    </Reveal>
  );
}
