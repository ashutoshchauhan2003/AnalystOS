"use client";

import { motion } from "framer-motion";
import { premiumEase } from "@/components/motion/presets";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import type {
  MissionReadiness,
  SimulationStepState,
  SimulationValidation,
} from "@/content/lab-workspace";

type SimulationProgressPanelProps = {
  readiness: MissionReadiness;
  progress: number;
  steps: SimulationStepState[];
  validation: SimulationValidation;
  onStepSelect: (step: SimulationStepState) => void;
};

export function SimulationProgressPanel({
  readiness,
  progress,
  steps,
  validation,
  onStepSelect,
}: SimulationProgressPanelProps) {
  return (
    <section className="rounded-[1.25rem] border border-cyan-300/[0.14] bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(34,211,238,0.025))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
            Simulation Progress
          </p>
          <p className="mt-2 text-sm text-slate-300">{progress}% complete</p>
        </div>
        <StatusPill label={readiness.label} tone={readiness.tone} />
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-950/70">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.95),rgba(125,211,252,0.8))] shadow-[0_0_22px_rgba(103,232,249,0.35)]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: premiumEase }}
        />
      </div>

      <div className="mt-4 rounded-[1rem] border border-white/[0.08] bg-slate-950/40 px-3.5 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">
              Submission Readiness
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{readiness.message}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-2xl font-semibold text-cyan-100">{readiness.score}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-slate-500">
              Score
            </p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusPill label={`${readiness.confidence} confidence`} tone={readiness.tone} />
          <StatusPill
            label={`${readiness.completedItems.length} complete`}
            tone="success"
          />
          <StatusPill
            label={`${readiness.missingItems.length} missing`}
            tone={readiness.missingItems.length === 0 ? "success" : "warning"}
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        {readiness.missingItems.length > 0 ? (
          <div className="rounded-[1rem] border border-amber-300/[0.12] bg-amber-300/[0.04] px-3.5 py-3">
            <p className="text-[10px] uppercase tracking-[0.28em] text-amber-100/70">
              Missing Items
            </p>
            <div className="mt-2 space-y-1.5">
              {readiness.missingItems.slice(0, 3).map((item) => (
                <p key={item} className="text-xs leading-5 text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : null}
        {readiness.completedItems.length > 0 ? (
          <div className="rounded-[1rem] border border-emerald-300/[0.12] bg-emerald-300/[0.035] px-3.5 py-3">
            <p className="text-[10px] uppercase tracking-[0.28em] text-emerald-100/70">
              Completed Signals
            </p>
            <div className="mt-2 space-y-1.5">
              {readiness.completedItems.slice(-3).map((item) => (
                <p key={item} className="text-xs leading-5 text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-4 max-h-[24rem] space-y-2.5 overflow-y-auto pr-1">
        {steps.map((step, index) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepSelect(step)}
            className={[
              "flex w-full items-start gap-3 rounded-[1rem] border px-3.5 py-3 text-left transition duration-300",
              step.active
                ? "border-cyan-300/[0.24] bg-cyan-300/10 text-white"
                : "border-white/[0.08] bg-white/[0.025] text-slate-300 hover:border-cyan-300/[0.16] hover:bg-white/[0.04]",
            ].join(" ")}
          >
            <span
              className={[
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px]",
                step.completed
                  ? "border-emerald-300/[0.24] bg-emerald-300/[0.12] text-emerald-100"
                  : step.active
                    ? "border-cyan-300/30 bg-cyan-300/[0.12] text-cyan-100"
                    : "border-white/10 bg-slate-950/50 text-slate-500",
              ].join(" ")}
            >
              {step.completed ? "OK" : index + 1}
            </span>
            <span>
              <span className="block text-sm font-medium">{step.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-400">{step.description}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-[1rem] border border-white/[0.08] bg-slate-950/40 px-3.5 py-3 text-sm leading-6 text-slate-300">
        {validation.message}
      </div>
    </section>
  );
}
