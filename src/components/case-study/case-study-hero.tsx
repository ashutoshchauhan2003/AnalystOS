"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { caseStudy } from "@/content/case-study";

export function CaseStudyHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_360px]"
    >
      <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 lg:p-8" glow="cyan">
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">Portfolio Case Study</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <div className="rounded-full border border-cyan-300/22 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
            {caseStudy.role}
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
            Recruiter-ready proof
          </div>
        </div>
        <h1 className="mt-6 max-w-[14ch] text-4xl font-semibold leading-[1] tracking-[-0.05em] text-white lg:text-6xl">
          {caseStudy.title}
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg leading-8 text-slate-300/78">{caseStudy.summary}</p>
        <p className="mt-5 max-w-[52ch] text-base leading-8 text-slate-400">{caseStudy.outcome}</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <GlowButton href={caseStudy.cta.primaryHref}>{caseStudy.cta.primaryLabel}</GlowButton>
          <GlowButton href={caseStudy.cta.secondaryHref} variant="secondary">
            {caseStudy.cta.secondaryLabel}
          </GlowButton>
        </div>
      </GlassPanel>

      <GlassPanel className="bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-6" glow="blue">
        <div className="mb-5 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
        <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/70">Key Metrics</p>
        <div className="mt-5 space-y-4">
          {caseStudy.heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4"
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{metric.label}</p>
              <p className="mt-3 text-2xl font-medium tracking-[-0.03em] text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </GlassPanel>
    </motion.section>
  );
}
