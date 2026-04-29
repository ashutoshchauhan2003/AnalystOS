"use client";

import { motion } from "framer-motion";
import { premiumEase } from "@/components/motion/presets";
import {
  workspaceProject,
  workspaceTabs,
  type WorkspaceMode,
} from "@/content/lab-workspace";
import { SegmentedControl } from "@/components/lab-workspace/segmented-control";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import { GlassPanel } from "@/components/shared/glass-panel";

type WorkspaceTopBarProps = {
  activeMode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
  onSubmit: () => void;
  progress: number;
  saveState: "synced" | "saving" | "dirty";
  lastSavedAt: string;
};

function getSaveLabel(saveState: WorkspaceTopBarProps["saveState"], lastSavedAt: string) {
  if (saveState === "saving") return "Saving draft";
  if (saveState === "dirty") return "Pending changes";
  return `Synced ${lastSavedAt}`;
}

function getSaveTone(saveState: WorkspaceTopBarProps["saveState"]) {
  if (saveState === "saving") return "warning" as const;
  if (saveState === "dirty") return "blue" as const;
  return "success" as const;
}

export function WorkspaceTopBar({
  activeMode,
  onModeChange,
  onSubmit,
  progress,
  saveState,
  lastSavedAt,
}: WorkspaceTopBarProps) {
  const activeTab = workspaceTabs.find((tab) => tab.id === activeMode) ?? workspaceTabs[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.62, ease: premiumEase }}
      className="shrink-0"
    >
      <GlassPanel
        className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] px-4 py-4 lg:px-5 lg:py-4"
        glow="none"
      >
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill label={workspaceProject.scenarioLabel} tone="cyan" />
              <StatusPill label={getSaveLabel(saveState, lastSavedAt)} tone={getSaveTone(saveState)} />
            </div>
            <div className="mt-3 flex flex-col gap-2 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <h1 className="text-[1.7rem] font-semibold tracking-[-0.04em] text-white">
                  {workspaceProject.name}
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">
                  {workspaceProject.summary}
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden flex-wrap gap-2 xl:flex">
              {workspaceProject.statusChips.slice(0, 2).map((chip, index) => (
                <StatusPill
                  key={chip}
                  label={chip}
                  tone={index === 0 ? "blue" : "neutral"}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={onSubmit}
              className="inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-medium uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050913]"
            >
              {workspaceProject.submitLabel}
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <SegmentedControl
            options={workspaceTabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
            }))}
            value={activeMode}
            onChange={onModeChange}
            className="max-w-fit"
          />

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">
              <span className="text-slate-500">Mode:</span> {activeTab.label}
            </div>
            <div className="hidden rounded-full border border-cyan-300/[0.16] bg-cyan-300/[0.08] px-4 py-2 text-sm text-cyan-100 xl:block">
              Simulation {progress}% complete
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
