import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  problemBrief,
  simulationScenario,
  workspaceGuidanceByMode,
  workspaceTabs,
  type MissionReadiness,
  type SimulationStepState,
  type SimulationValidation,
  type WorkspaceMode,
} from "@/content/lab-workspace";
import { SimulationProgressPanel } from "@/components/lab-workspace/simulation-progress-panel";
import { StatusPill } from "@/components/lab-workspace/status-pill";

type ProblemBriefPanelProps = {
  activeMode: WorkspaceMode;
  readiness: MissionReadiness;
  progress: number;
  steps: SimulationStepState[];
  validation: SimulationValidation;
  unlockedHintCount: number;
  onStepSelect: (step: SimulationStepState) => void;
};

export function ProblemBriefPanel({
  activeMode,
  readiness,
  progress,
  steps,
  validation,
  unlockedHintCount,
  onStepSelect,
}: ProblemBriefPanelProps) {
  const guidance = workspaceGuidanceByMode[activeMode];
  const activeTab = workspaceTabs.find((tab) => tab.id === activeMode) ?? workspaceTabs[0];
  const leadingHint = simulationScenario.hints[Math.max(0, unlockedHintCount - 1)];

  return (
    <Reveal className="self-start">
      <GlassPanel
        className="flex flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.028))] p-5 lg:p-6"
        glow="blue"
      >
        <div className="shrink-0">
          <div className="mb-4 h-px w-14 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            {problemBrief.eyebrow}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
            {problemBrief.title}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-slate-300/[0.84]">{problemBrief.summary}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill label="Brief" tone="neutral" />
            <StatusPill label="Dataset Loaded" tone="cyan" />
            <StatusPill label={activeTab.shortLabel} tone="neutral" />
          </div>
        </div>

        <div className="mt-6 shrink-0 space-y-5 pr-1">
          <section className="rounded-[1.2rem] border border-cyan-300/[0.16] bg-[linear-gradient(180deg,rgba(34,211,238,0.09),rgba(34,211,238,0.025))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
              Scenario
            </p>
            <p className="mt-3 text-[15px] leading-7 text-slate-100">
              A subscription product is losing retained revenue shortly after onboarding.
              Find the highest-risk segment and recommend corrective action.
            </p>
          </section>

          <SimulationProgressPanel
            readiness={readiness}
            progress={progress}
            steps={steps}
            validation={validation}
            onStepSelect={onStepSelect}
          />

          <section>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Dataset</p>
            <div className="mt-3 rounded-[1.1rem] border border-white/[0.08] bg-white/[0.03] px-4 py-4">
              <p className="text-sm font-medium text-slate-100">{simulationScenario.dataset.name}</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                {simulationScenario.dataset.description}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">
                {simulationScenario.dataset.rowCount} rows loaded
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Key Guidance</p>
              <StatusPill label={`${unlockedHintCount}/${simulationScenario.hints.length} hints`} tone="neutral" />
            </div>
            <div className="mt-3 space-y-2.5">
              <div className="rounded-[1.1rem] border border-cyan-300/[0.14] bg-cyan-300/[0.045] px-4 py-3.5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                  Evaluator Focus
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {validation.status === "idle" ? guidance.feedback[0] : validation.message}
                </p>
              </div>
              <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.03] px-4 py-3.5">
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">Current Hint</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  {leadingHint?.text ?? guidance.hints[0]}
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Mission</p>
            <div className="mt-3 space-y-2.5">
              {problemBrief.objectives.slice(0, 2).map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    0{index + 1}
                  </span>
                  <p className="mt-1.5 text-sm leading-7 text-slate-200">{item}</p>
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
                  className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-sm leading-7 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Win Condition</p>
            <div className="mt-3 rounded-[1.1rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(34,211,238,0.07),rgba(34,211,238,0.02))] px-4 py-3.5 text-sm leading-7 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              {problemBrief.successCriteria[0]}
            </div>
          </section>
        </div>
      </GlassPanel>
    </Reveal>
  );
}
