import { GlassPanel } from "@/components/shared/glass-panel";
import { learnerSidebarItems } from "@/content/learner-dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LearnerSidebar() {
  return (
    <GlassPanel
      className="sticky top-6 hidden h-[calc(100vh-3rem)] flex-col justify-between bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 lg:flex"
      glow="blue"
    >
      <div>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            A3
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-white">
              Analyst 3D
            </p>
            <p className="mt-1 text-xs text-slate-400">Learner Workspace</p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/70">Live Mode</p>
          <p className="mt-3 text-lg font-medium text-white">Structured analyst training</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Priority flow: learn, execute, publish, and strengthen hiring signal.
          </p>
        </div>

        <nav className="mt-8 space-y-2.5">
          {learnerSidebarItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-[1.15rem] border px-4 py-3.5 text-sm transition duration-300",
                item.active
                  ? "border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.16),rgba(34,211,238,0.06))] text-white shadow-[0_0_28px_rgba(103,232,249,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-slate-300 hover:border-cyan-300/16 hover:bg-white/[0.04]",
              )}
            >
              <span>{item.label}</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                0{index + 1}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="rounded-[1.5rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/70">Current Focus</p>
        <p className="mt-3 text-base text-white">Churn Retention Lab</p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Finalize your SQL findings and turn them into a publishable decision memo.
        </p>
      </div>
    </GlassPanel>
  );
}
