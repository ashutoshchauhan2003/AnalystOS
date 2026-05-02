"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { learnerKpis } from "@/content/learner-dashboard";
import {
  getCurrentStreak,
  getLevel,
  getLevelProgress,
  getNextLevelXp,
  readProgression,
  recordDailyUsage,
  type ProgressionState,
} from "@/data/progression";

export function DashboardKpiGrid() {
  const [progression, setProgression] = useState<ProgressionState | null>(null);

  useEffect(() => {
    setProgression(recordDailyUsage());
  }, []);

  const level = getLevel(progression?.xp ?? 0);
  const xpToNext = Math.max(0, getNextLevelXp(progression?.xp ?? 0) - (progression?.xp ?? 0));
  const streak = progression ? getCurrentStreak(progression) : 0;
  const dynamicKpis = [
    {
      label: "XP earned",
      value: String(progression?.xp ?? 0),
      detail: `${xpToNext} XP to next level`,
      progress: getLevelProgress(progression?.xp ?? 0),
    },
    {
      label: "Current level",
      value: level,
      detail: "Beginner -> Explorer -> Analyst -> Job Ready",
      progress: getLevelProgress(progression?.xp ?? 0),
    },
    {
      label: "Daily streak",
      value: `${streak}d`,
      detail: "Come back daily to keep the system warm",
      progress: Math.min(100, streak * 14),
    },
    learnerKpis[3],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {dynamicKpis.map((item, index) => (
        <Reveal key={item.label} delay={index * 0.08}>
          <GlassPanel
            className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.03))] p-5 lg:p-6"
            glow={index === 0 || index === 3 ? "cyan" : "blue"}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.68]">
                {item.label}
              </p>
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/80 shadow-[0_0_16px_rgba(103,232,249,0.7)]" />
            </div>
            <p className="text-[2.8rem] font-semibold leading-none tracking-[-0.06em] text-white">
              {item.value}
            </p>
            <div className="mt-4 h-px w-16 bg-gradient-to-r from-cyan-300/60 to-transparent" />
            {"progress" in item ? (
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(103,232,249,0.95),rgba(59,130,246,0.75))] shadow-[0_0_18px_rgba(103,232,249,0.25)]"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            ) : null}
            <p className="mt-4 text-sm leading-6 text-slate-400">{item.detail}</p>
          </GlassPanel>
        </Reveal>
      ))}
    </div>
  );
}
