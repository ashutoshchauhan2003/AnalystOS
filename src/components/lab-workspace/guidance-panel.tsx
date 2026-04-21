import { Reveal } from "@/components/motion/reveal";
import { WorkspaceInfoCard } from "@/components/lab-workspace/workspace-info-card";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import { WorkspacePanelHeader } from "@/components/lab-workspace/workspace-panel-header";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  workspaceGuidanceByMode,
  workspaceTabs,
  type WorkspaceMode,
} from "@/content/lab-workspace";

type GuidancePanelProps = {
  activeMode: WorkspaceMode;
};

export function GuidancePanel({ activeMode }: GuidancePanelProps) {
  const guidance = workspaceGuidanceByMode[activeMode];
  const activeTab = workspaceTabs.find((tab) => tab.id === activeMode) ?? workspaceTabs[0];

  return (
    <Reveal className="min-h-0 h-full" delay={0.08}>
      <GlassPanel
        className="flex h-full min-h-0 flex-col overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.028))] p-5 lg:p-6"
        glow="blue"
      >
        <div className="shrink-0">
          <WorkspacePanelHeader
            eyebrow="Guidance Layer"
            title="Guidance"
            description={`Mode-aware support for ${activeTab.label.toLowerCase()}.`}
            aside={<StatusPill label={activeTab.shortLabel} tone="cyan" />}
          />
        </div>

        <div className="mt-5 shrink-0 space-y-4 pr-1">
          <section>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Readiness</p>
            <div className="mt-3 grid gap-2.5">
              {guidance.readiness.slice(0, 1).map((item) => (
                <WorkspaceInfoCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Top Hint</p>
            <div className="mt-3 space-y-2.5">
              {guidance.hints.slice(0, 1).map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                    Hint 0{index + 1}
                  </span>
                  <p className="mt-1.5 text-sm leading-6 text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Rubric</p>
            <div className="mt-3 space-y-2.5">
              {guidance.rubric.slice(0, 2).map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-[1.1rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-3.5 py-3"
                >
                  <span className="text-sm text-slate-200">{item.label}</span>
                  <StatusPill label={item.score} tone="neutral" />
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Feedback</p>
            <div className="mt-3 rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-3.5 py-3 text-sm leading-6 text-slate-200">
              {guidance.feedback[0]}
            </div>
          </section>
        </div>
      </GlassPanel>
    </Reveal>
  );
}
