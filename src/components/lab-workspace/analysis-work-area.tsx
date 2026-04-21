"use client";

import { motion } from "framer-motion";
import { useMemo, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import { WorkspaceInfoCard } from "@/components/lab-workspace/workspace-info-card";
import { WorkspacePanelHeader } from "@/components/lab-workspace/workspace-panel-header";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  insightEvidenceCards,
  recommendationFrames,
  workspaceMetrics,
  workspaceTabs,
  type WorkspaceMode,
} from "@/content/lab-workspace";

type PreviewState = {
  sqlDraft: string;
  insightNotes: string;
  recommendation: string;
};

type AnalysisWorkAreaProps = {
  activeMode: WorkspaceMode;
  sqlDraft: string;
  insightNotes: string;
  recommendation: string;
  preview: PreviewState;
  onSqlDraftChange: (value: string) => void;
  onInsightNotesChange: (value: string) => void;
  onRecommendationChange: (value: string) => void;
};

function SurfaceFrame({
  title,
  description,
  children,
  className,
  contentClassName,
}: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "flex min-h-0 flex-col rounded-[1.55rem] border border-white/8 bg-[#08111d]/88 p-5 shadow-[0_18px_48px_rgba(2,6,16,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex shrink-0 items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/72">{title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <StatusPill label="Live Draft" tone="cyan" />
      </div>
      <div className={["mt-5 min-h-0 flex-1", contentClassName ?? ""].join(" ")}>{children}</div>
    </motion.div>
  );
}

function WorkbenchTextarea({
  value,
  onChange,
  className,
  mono = false,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  mono?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const lineNumbers = useMemo(() => {
    const totalLines = Math.max(value.split("\n").length, 10);
    return Array.from({ length: totalLines }, (_, index) => index + 1);
  }, [value]);

  return (
    <div
      className={[
        "relative flex h-full min-h-0 min-w-0 overflow-hidden rounded-[1.35rem] border border-cyan-300/14 bg-slate-950/92 shadow-[0_16px_40px_rgba(2,8,20,0.34),inset_0_1px_0_rgba(255,255,255,0.04)]",
        className ?? "",
      ].join(" ")}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),transparent)]"
        animate={{ opacity: [0.35, 0.62, 0.35] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-cyan-300/45"
        animate={{ y: [0, 320, 0], opacity: [0, 0.35, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative flex h-full w-full min-h-0">
        <div className="h-full w-14 shrink-0 overflow-hidden border-r border-white/6 bg-white/[0.02]">
          <div
            className="flex flex-col items-end gap-0.5 px-3 py-4 text-[11px] leading-7 text-slate-600"
            style={{ transform: `translateY(-${scrollTop}px)` }}
          >
            {lineNumbers.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          className={[
            "block h-full min-h-0 min-w-0 flex-1 resize-none overflow-y-auto overscroll-contain bg-transparent px-5 py-4 text-sm leading-7 text-slate-200 outline-none transition duration-300 placeholder:text-slate-500 focus:bg-slate-950/16",
            mono ? "font-mono text-[13px]" : "",
          ].join(" ")}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

function EditorHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-4 py-3.5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/90" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/72">{title}</p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <StatusPill label="draft.sql" tone="neutral" />
        <StatusPill label="Ready" tone="success" />
        <button
          type="button"
          className="rounded-full border border-cyan-300/24 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300/14"
        >
          Run Query
        </button>
      </div>
    </div>
  );
}

function SqlEditorSurface({
  sqlDraft,
  onSqlDraftChange,
}: Pick<AnalysisWorkAreaProps, "sqlDraft" | "onSqlDraftChange">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.7rem] border border-cyan-300/14 bg-[linear-gradient(180deg,rgba(8,17,29,0.96),rgba(7,13,23,0.92))] p-5 shadow-[0_24px_70px_rgba(2,8,20,0.36),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <EditorHeader
        title="SQL Workspace"
        subtitle="Primary analyst execution surface for query drafting, testing, and retained-revenue analysis."
      />

      <div className="grid min-h-0 flex-1 gap-4 overflow-hidden xl:grid-rows-[minmax(0,1fr)_auto]">
        <WorkbenchTextarea
          value={sqlDraft}
          onChange={onSqlDraftChange}
          mono
          className="h-[60vh] min-h-[60vh] max-h-[60vh] flex-none"
        />

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_220px]">
          <div className="rounded-[1.15rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-4 py-3.5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Live Context</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Write the first cut to isolate the highest-risk onboarding band before exploring deeper segmentation.
            </p>
          </div>
          <div className="rounded-[1.15rem] border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(34,211,238,0.02))] px-4 py-3.5">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/72">Result State</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">Ready to run against cohort_accounts.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SqlMode({
  sqlDraft,
  onSqlDraftChange,
}: Pick<AnalysisWorkAreaProps, "sqlDraft" | "onSqlDraftChange">) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="grid min-h-0 flex-1 gap-5 xl:grid-cols-[minmax(0,1fr)]">
        <SqlEditorSurface sqlDraft={sqlDraft} onSqlDraftChange={onSqlDraftChange} />
      </div>
    </div>
  );
}

function InsightsMode({
  insightNotes,
  onInsightNotesChange,
}: Pick<AnalysisWorkAreaProps, "insightNotes" | "onInsightNotesChange">) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="grid gap-3 xl:grid-cols-2">
        {insightEvidenceCards.slice(0, 2).map((card) => (
          <WorkspaceInfoCard key={card.label} label={card.label} value={card.value} />
        ))}
      </div>

      <div className="grid min-h-0 flex-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_340px]">
        <SurfaceFrame
          title="Insight Notes"
          description="Structure the reasoning in consequence-first language while the signal remains crisp."
          className="min-h-0"
          contentClassName="flex min-h-0 flex-1 flex-col"
        >
          <WorkbenchTextarea
            value={insightNotes}
            onChange={onInsightNotesChange}
            className="min-h-[28rem] flex-1"
          />
        </SurfaceFrame>

        <SurfaceFrame
          title="Evidence Blocks"
          description="Keep reusable findings visible so recommendation writing stays grounded."
          className="min-h-0"
          contentClassName="overflow-y-auto overscroll-contain pr-1"
        >
          <div className="space-y-4">
            {[
              "Accounts below 40% onboarding completion create the highest retained-revenue loss.",
              "Revenue decline becomes meaningful before explicit cancellation behavior appears.",
              "Activation-quality intervention is more credible than lifecycle messaging alone.",
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Evidence 0{index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item}</p>
              </div>
            ))}
          </div>
        </SurfaceFrame>
      </div>
    </div>
  );
}

function RecommendationMode({
  recommendation,
  onRecommendationChange,
}: Pick<AnalysisWorkAreaProps, "recommendation" | "onRecommendationChange">) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="grid gap-3 xl:grid-cols-2">
        {recommendationFrames.slice(0, 2).map((frame) => (
          <WorkspaceInfoCard key={frame.label} label={frame.label} value={frame.description} />
        ))}
      </div>

      <div className="grid min-h-0 flex-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_340px]">
        <SurfaceFrame
          title="Recommendation Draft"
          description="Translate the analysis into a concise action plan that leadership can repeat back."
          className="min-h-0"
          contentClassName="flex min-h-0 flex-1 flex-col"
        >
          <WorkbenchTextarea
            value={recommendation}
            onChange={onRecommendationChange}
            className="min-h-[28rem] flex-1"
          />
        </SurfaceFrame>

        <SurfaceFrame
          title="Decision Frame"
          description="The output should carry segment, risk, action, and business consequence in a clean order."
          contentClassName="overflow-y-auto overscroll-contain pr-1"
        >
          <div className="space-y-4">
            {[
              {
                label: "Segment",
                value: "Low-activation onboarding accounts create the highest retained-revenue risk.",
              },
              {
                label: "Action",
                value: "Introduce milestone-based intervention and targeted setup support in the first 30 days.",
              },
              {
                label: "Consequence",
                value: "Reduce revenue exposure before churn becomes explicit and improve expansion readiness.",
              },
            ].map((item) => (
              <WorkspaceInfoCard key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </SurfaceFrame>
      </div>
    </div>
  );
}

function PreviewMode({ preview }: Pick<AnalysisWorkAreaProps, "preview">) {
  return (
    <div className="grid min-h-0 flex-1 gap-5 xl:grid-cols-[minmax(0,1.7fr)_340px]">
      <SurfaceFrame
        title="Submission Preview"
        description="Read-only compressed output representing what the current workbench state is ready to communicate."
        className="min-h-0"
        contentClassName="overflow-y-auto overscroll-contain pr-1"
      >
        <div className="space-y-5">
          <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Executive Summary</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">{preview.recommendation}</p>
          </div>
          <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Supporting Findings</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-200">
              {preview.insightNotes}
            </p>
          </div>
        </div>
      </SurfaceFrame>

      <SurfaceFrame
        title="Technical Trace"
        description="A compact audit of the analytical surface that produced the recommendation."
        className="min-h-0"
        contentClassName="overflow-y-auto overscroll-contain pr-1"
      >
        <div className="rounded-[1.25rem] border border-white/8 bg-slate-950/82 p-4 font-mono text-[13px] leading-7 text-slate-300">
          <pre className="whitespace-pre-wrap">{preview.sqlDraft}</pre>
        </div>
        <div className="mt-4 grid gap-3">
          {[
            { label: "Submission state", value: "Draft ready for final polish" },
            { label: "Executive readability", value: "Strong with minor tightening" },
            { label: "Analytical trace", value: "Clear and decision-oriented" },
          ].map((item) => (
            <WorkspaceInfoCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </SurfaceFrame>
    </div>
  );
}

export function AnalysisWorkArea({
  activeMode,
  sqlDraft,
  insightNotes,
  recommendation,
  preview,
  onSqlDraftChange,
  onInsightNotesChange,
  onRecommendationChange,
}: AnalysisWorkAreaProps) {
  const activeTab = workspaceTabs.find((tab) => tab.id === activeMode) ?? workspaceTabs[0];

  return (
    <Reveal className="min-h-0 h-full" delay={0.05}>
      <GlassPanel
        className="flex h-full min-h-0 flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.088),rgba(255,255,255,0.032))] p-5 lg:p-6"
        glow="cyan"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.08),transparent_22%)]" />
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-0 flex-1 flex-col"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[18%] top-0 h-20 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),transparent)] blur-2xl"
            animate={{ opacity: [0.28, 0.44, 0.28], y: [0, 4, 0] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <WorkspacePanelHeader
            eyebrow="Analysis Surface"
            title="Structured reasoning workspace"
            description={activeTab.description}
            aside={
              <>
                {workspaceMetrics.slice(0, 2).map((metric) => (
                  <StatusPill key={metric.label} label={`${metric.label}: ${metric.value}`} tone="neutral" />
                ))}
              </>
            }
          />

          <div className="mt-5 flex-1 min-h-0">
            {activeMode === "sql" ? (
              <SqlMode sqlDraft={sqlDraft} onSqlDraftChange={onSqlDraftChange} />
            ) : null}
            {activeMode === "insights" ? (
              <InsightsMode
                insightNotes={insightNotes}
                onInsightNotesChange={onInsightNotesChange}
              />
            ) : null}
            {activeMode === "recommendation" ? (
              <RecommendationMode
                recommendation={recommendation}
                onRecommendationChange={onRecommendationChange}
              />
            ) : null}
            {activeMode === "preview" ? <PreviewMode preview={preview} /> : null}
          </div>
        </motion.div>
      </GlassPanel>
    </Reveal>
  );
}
