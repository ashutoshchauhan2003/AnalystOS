import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { learnerKpis } from "@/content/learner-dashboard";

export function DashboardKpiGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {learnerKpis.map((item, index) => (
        <Reveal key={item.label} delay={index * 0.08}>
          <GlassPanel
            className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-5 lg:p-6"
            glow={index === 0 || index === 3 ? "cyan" : "blue"}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/68">
                {item.label}
              </p>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/80 shadow-[0_0_16px_rgba(103,232,249,0.7)]" />
            </div>
            <p className="text-[2.8rem] font-semibold leading-none tracking-[-0.06em] text-white">
              {item.value}
            </p>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-cyan-300/60 to-transparent" />
            <p className="mt-4 text-sm leading-6 text-slate-400">{item.detail}</p>
          </GlassPanel>
        </Reveal>
      ))}
    </div>
  );
}
