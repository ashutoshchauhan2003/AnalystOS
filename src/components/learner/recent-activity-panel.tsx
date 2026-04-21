import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { recentActivity } from "@/content/learner-dashboard";

export function RecentActivityPanel() {
  return (
    <Reveal>
      <GlassPanel className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-7 lg:p-8" glow="blue">
        <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
              Recent Activity
            </p>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
              Latest workspace signals
            </h2>
          </div>
          <span className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-3 py-1 text-xs text-slate-400">
            Synced now
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {recentActivity.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-[10px] uppercase tracking-[0.28em] text-cyan-200">
                    0{index + 1}
                  </span>
                  <p className="text-base text-white">{item.title}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {item.timestamp}
                </p>
              </div>
              <p className="mt-3 pl-12 text-sm leading-7 text-slate-400">{item.summary}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </Reveal>
  );
}
