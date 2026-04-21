import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { recommendedNextStep } from "@/content/learner-dashboard";

export function RecommendedNextStepPanel() {
  return (
    <Reveal delay={0.08}>
      <GlassPanel
        className="h-full overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-7 lg:p-8"
        glow="blue"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_24%)]" />
        <div className="relative">
          <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
            {recommendedNextStep.eyebrow}
          </p>
          <h2 className="mt-5 text-2xl font-semibold leading-[1.12] tracking-[-0.03em] text-white">
            {recommendedNextStep.title}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300/76">
            {recommendedNextStep.description}
          </p>

          <div className="mt-7 grid gap-3">
            <div className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Effort</p>
              <p className="mt-2 text-base text-white">{recommendedNextStep.effort}</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Impact</p>
              <p className="mt-2 text-base text-white">{recommendedNextStep.impact}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <GlowButton href="/lab">{recommendedNextStep.actionLabel}</GlowButton>
            <GlowButton href="/course-path" variant="secondary">
              {recommendedNextStep.secondaryActionLabel}
            </GlowButton>
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}
