"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";
import { employerDirectory } from "@/content/employer-directory";

export function EmployerDirectoryHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 lg:p-8" glow="cyan">
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">Recruiter Discovery</p>
        <h1 className="mt-5 max-w-[12ch] text-4xl font-semibold leading-[1] tracking-[-0.05em] text-white lg:text-6xl">
          {employerDirectory.title}
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-8 text-slate-300/78">
          {employerDirectory.summary}
        </p>
      </GlassPanel>

      <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="none">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Search</p>
              <p className="mt-2 text-base text-slate-200">{employerDirectory.searchPlaceholder}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded-full border border-cyan-300/22 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
              Recruiter Mode
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              Quick Scan
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              Proof First
            </div>
          </div>
        </div>
      </GlassPanel>
    </motion.section>
  );
}
