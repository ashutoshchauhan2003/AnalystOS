"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import type { EmployerCandidate } from "@/content/employer-directory";

type CandidateCardProps = {
  candidate: EmployerCandidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
      <GlassPanel className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.028))] p-5" glow="none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/72">{candidate.title}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">{candidate.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{candidate.location}</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300 transition duration-300 hover:border-cyan-300/20 hover:text-white"
          >
            Shortlist
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {candidate.badges.map((badge) => (
            <div key={badge} className="rounded-full border border-cyan-300/16 bg-cyan-300/8 px-3 py-2 text-xs uppercase tracking-[0.22em] text-cyan-100">
              {badge}
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.2rem] border border-white/8 bg-slate-950/72 p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Featured Project</p>
          <h4 className="mt-3 text-lg font-medium tracking-[-0.03em] text-white">{candidate.featuredProject}</h4>
          <p className="mt-3 text-sm leading-7 text-slate-300">{candidate.projectHighlight}</p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {candidate.metrics.map((metric) => (
            <div key={metric.label} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">{metric.label}</p>
              <p className="mt-2 text-sm font-medium text-white">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Skills & Tools</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <div key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-200">
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <GlowButton href={candidate.profileHref}>View Candidate Profile</GlowButton>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
