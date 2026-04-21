"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";

export function LearnerTopUtilityBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 lg:p-5" glow="none">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-cyan-200/75">
              Learner Dashboard
            </div>
            <div className="hidden h-5 w-px bg-white/10 lg:block" />
            <p className="text-sm text-slate-400">Workspace status: high momentum</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-sm text-slate-300">
              Streak 14d
            </div>
            <div className="rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-2 text-sm text-slate-300">
              2 reviews pending
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-3 py-2">
              <div className="h-8 w-8 rounded-full bg-[linear-gradient(180deg,#67e8f9,#2563eb)]" />
              <div>
                <p className="text-sm text-white">Ariana Patel</p>
                <p className="text-xs text-slate-400">Analyst Candidate</p>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
