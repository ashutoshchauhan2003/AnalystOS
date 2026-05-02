"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { labRewards, getNextMission, readProgression, type ProgressionState } from "@/data/progression";

export function TodaysMissionPanel() {
  const [progression, setProgression] = useState<ProgressionState | null>(null);

  useEffect(() => {
    setProgression(readProgression());
  }, []);

  const mission = progression ? getNextMission(progression) : null;

  if (!mission) {
    return (
      <Reveal>
        <GlassPanel className="p-6 lg:p-7" glow="cyan">
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Today&apos;s Mission
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
            Mission board cleared.
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            You have cleared every current mission. Publish Your Proof or ask for feedback to keep momentum.
          </p>
        </GlassPanel>
      </Reveal>
    );
  }

  return (
    <Reveal>
      <GlassPanel
        className="overflow-hidden bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(255,255,255,0.03))] p-6 lg:p-7"
        glow="cyan"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.14),transparent_28%)]" />
        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              Today&apos;s Mission
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {mission.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {mission.brief}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <MissionPill label={mission.estimatedTime} />
              <MissionPill label={`+${labRewards[mission.id]} XP reward`} />
              <MissionPill label={mission.difficulty} />
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Next unlock</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Complete and submit this mission to earn XP and reveal your next recommended task.
            </p>
            <div className="mt-5">
              <GlowButton href={`/lab?challenge=${mission.id}`}>Start the Mission</GlowButton>
            </div>
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function MissionPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-3 py-1.5 text-xs text-cyan-100">
      {label}
    </span>
  );
}
