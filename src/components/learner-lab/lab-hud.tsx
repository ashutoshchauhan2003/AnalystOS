"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { cn } from "@/lib/utils";
import { labStations, type LabStationId } from "@/content/learner-lab";
import type { LabQualityMode } from "@/components/learner-lab/analyst-lab-experience";

type LabHudProps = {
  activeStationId: LabStationId;
  onSelectStation: (stationId: LabStationId) => void;
  qualityMode: LabQualityMode;
  onQualityModeChange: (mode: LabQualityMode) => void;
};

function LabHudComponent({
  activeStationId,
  onSelectStation,
  qualityMode,
  onQualityModeChange,
}: LabHudProps) {
  const activeStation = useMemo(
    () => labStations.find((station) => station.id === activeStationId) ?? labStations[0],
    [activeStationId],
  );
  const accentGlow =
    activeStation.accent === "cyan"
      ? "shadow-[0_0_32px_rgba(103,232,249,0.12)]"
      : "shadow-[0_0_32px_rgba(139,155,255,0.12)]";

  return (
    <div className="pointer-events-none absolute inset-0 flex h-full min-h-0 w-full flex-col justify-between overflow-hidden p-5 text-slate-50 lg:p-6">
      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="pointer-events-auto">
          <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5" glow="blue">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
                A3
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-white">
                  Analyst 3D
                </p>
                <p className="mt-1 text-xs text-slate-400">Learner Lab Simulation</p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/70">
                Interaction Model
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Guided node-based exploration with smooth camera travel and station inspection.
              </p>
            </div>
          </GlassPanel>
        </div>

        <div className="pointer-events-auto">
          <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 lg:p-5" glow="none">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
                  Analyst Simulation Room
                </p>
                <h1 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white lg:text-3xl">
                  Explore stations, inspect surfaces, activate analyst workflows.
                </h1>
              </div>

              <div className="flex flex-wrap gap-3">
                <div
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm text-white",
                    activeStation.accent === "cyan"
                      ? "border-cyan-300/22 bg-cyan-300/10"
                      : "border-indigo-300/22 bg-indigo-300/10",
                    accentGlow,
                  )}
                >
                  Active: {activeStation.shortLabel}
                </div>
                <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-sm text-slate-300">
                  Arrow keys cycle
                </div>
                <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-sm text-slate-300">
                  1-7 jump to station
                </div>
                <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-sm text-slate-300">
                  Drag to inspect
                </div>
                <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-sm text-slate-300">
                  Q toggles quality
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)_380px]">
        <div className="pointer-events-auto">
          <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-5" glow="blue">
            <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
              Station Navigator
            </p>
            <div className="mt-5 flex gap-2">
              {(["standard", "low"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onQualityModeChange(mode)}
                  className={cn(
                    "rounded-full border px-3 py-2 text-xs uppercase tracking-[0.26em] transition",
                    qualityMode === mode
                      ? "border-cyan-300/22 bg-cyan-300/10 text-cyan-100"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-200",
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Mode intent</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The chamber stays lightweight while the main interface richness lives in the HUD for smoother interaction.
              </p>
            </div>

            <div className="mt-5 space-y-2.5">
              {labStations.map((station, index) => (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => onSelectStation(station.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-[1.15rem] border px-4 py-3.5 text-left text-sm transition duration-300",
                    station.id === activeStationId
                      ? "border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.16),rgba(34,211,238,0.06))] text-white shadow-[0_0_28px_rgba(103,232,249,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]"
                      : "border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] text-slate-300 hover:border-cyan-300/16 hover:bg-white/[0.04]",
                  )}
                >
                  <span>{station.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>
          </GlassPanel>
        </div>

        <div className="pointer-events-none hidden items-end justify-center lg:flex">
          <motion.div
            key={activeStationId}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-white/10 bg-slate-950/55 px-5 py-3 text-xs uppercase tracking-[0.28em] text-slate-300 backdrop-blur-xl"
          >
            Inspecting {activeStation.label}
          </motion.div>
        </div>

        <div className="pointer-events-auto">
          <GlassPanel
            className={cn(
              "overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-6",
              accentGlow,
            )}
            glow={activeStation.accent}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_24%)]" />
            <div className="relative">
              <div className="mb-5 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
              <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">
                {activeStation.detailEyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-[1.1] tracking-[-0.03em] text-white">
                {activeStation.detailTitle}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300/76">
                {activeStation.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{activeStation.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-slate-500">
                Quality mode: {qualityMode}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {activeStation.overlayKpis.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {activeStation.detailLines.map((line, index) => (
                  <div
                    key={line}
                    className="flex items-center gap-3 rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                      0{index + 1}
                    </span>
                    <span className="text-sm text-slate-200">{line}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {activeStation.overlayNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-[1.15rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-slate-300"
                  >
                    {note}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                <GlowButton href="/lab">Open Lab Surface</GlowButton>
                <GlowButton href="/progress" variant="secondary">
                  View Overlay Progress
                </GlowButton>
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}

export const LabHud = memo(LabHudComponent);
