import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { overviewHighlights } from "@/content/learner-dashboard";

export function DashboardOverview() {
  return (
    <Reveal>
      <GlassPanel
        className="overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-7 lg:p-8"
        glow="cyan"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_84%_12%,rgba(99,102,241,0.12),transparent_20%)]" />
        <div className="pointer-events-none absolute inset-x-[10%] top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-40 blur-xl" />

        <div className="relative grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
              Welcome Back
            </p>
            <h1 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-white lg:text-[3.4rem]">
              Your analyst workspace is live.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300/76">
              Keep moving through structured labs, sharpen your portfolio signal, and turn today&apos;s
              work into visible progress recruiters can trust.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <GlowButton href="/lab">Resume Current Lab</GlowButton>
              <GlowButton href="/progress" variant="secondary">
                View Progress Layer
              </GlowButton>
            </div>
          </div>

          <div className="grid gap-3 pt-1">
            {overviewHighlights.map((highlight, index) => (
              <div
                key={highlight}
                className="flex items-center justify-between rounded-[1.4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase tracking-[0.32em] text-slate-500">
                    0{index + 1}
                  </span>
                  <span className="text-sm text-slate-200">{highlight}</span>
                </div>
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.7)]" />
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}
