"use client";

import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { keymap, EditorView } from "@codemirror/view";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { premiumEase, premiumHover } from "@/components/motion/presets";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import { WorkspaceInfoCard } from "@/components/lab-workspace/workspace-info-card";
import { WorkspacePanelHeader } from "@/components/lab-workspace/workspace-panel-header";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  insightEvidenceCards,
  recommendationFrames,
  sqlExecutionNotes,
  simulationScenario,
  sqlResultCards,
  workspaceGuidanceByMode,
  workspaceMetrics,
  workspaceTabs,
  type MissionReadiness,
  type SimulationValidation,
  type WorkspaceMode,
} from "@/content/lab-workspace";

type PreviewState = {
  sqlDraft: string;
  insightNotes: string;
  recommendation: string;
};

type QueryResult = {
  [key: string]: string;
};

type AnalysisWorkAreaProps = {
  activeMode: WorkspaceMode;
  sqlDraft: string;
  insightNotes: string;
  recommendation: string;
  preview: PreviewState;
  readiness: MissionReadiness;
  queryStatus: SimulationValidation["status"];
  queryValidationMessage: string;
  queryColumns: string[];
  queryResults: QueryResult[];
  unlockedHintCount: number;
  validation: SimulationValidation;
  onRunQuery: () => void;
  onSqlDraftChange: (value: string) => void;
  onInsightNotesChange: (value: string) => void;
  onRecommendationChange: (value: string) => void;
};

const sqlEditorTheme = EditorView.theme(
  {
    "&": {
      height: "100%",
      backgroundColor: "transparent",
      color: "#dbeafe",
      fontSize: "13px",
    },
    ".cm-editor": {
      height: "100%",
      backgroundColor: "transparent",
    },
    ".cm-scroller": {
      height: "100%",
      overflow: "auto",
      overscrollBehavior: "contain",
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      lineHeight: "1.75",
      scrollbarWidth: "thin",
    },
    ".cm-content": {
      minHeight: "100%",
      padding: "18px 18px 18px 0",
      caretColor: "#67e8f9",
    },
    ".cm-gutters": {
      backgroundColor: "rgba(255,255,255,0.025)",
      color: "rgba(148,163,184,0.5)",
      borderRight: "1px solid rgba(255,255,255,0.07)",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 14px 0 18px",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(34,211,238,0.055)",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "rgba(34,211,238,0.08)",
      color: "#a5f3fc",
    },
    ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
      backgroundColor: "rgba(34,211,238,0.22)",
    },
    "&.cm-focused": {
      outline: "none",
    },
  },
  { dark: true },
);

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
      whileHover={premiumHover}
      transition={{ duration: 0.28, ease: premiumEase }}
      className={[
        "flex min-h-0 flex-col rounded-[1.55rem] border border-white/[0.08] bg-[#08111d]/[0.88] p-5 shadow-[0_18px_48px_rgba(2,6,16,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex shrink-0 items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">{title}</p>
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
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "block h-full min-h-0 w-full resize-none overflow-y-auto overscroll-contain rounded-[1.35rem] border border-cyan-300/[0.14] bg-slate-950/[0.92] px-5 py-4 text-sm leading-7 text-slate-200 outline-none transition duration-300 placeholder:text-slate-500 focus:border-cyan-300/40 focus:bg-slate-950/80 focus:ring-4 focus:ring-cyan-300/10",
        className ?? "",
      ].join(" ")}
      spellCheck={false}
    />
  );
}

function EditorHeader({
  queryStatus,
  onRunQuery,
}: {
  queryStatus: SimulationValidation["status"];
  onRunQuery: () => void;
}) {
  const isRunning = queryStatus === "running";
  const hasRun = queryStatus === "valid" || queryStatus === "invalid" || queryStatus === "submitted";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-[1.15rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-4 py-3.5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300/90" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
            SQL Workspace
          </p>
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Primary analyst execution surface. Press Ctrl+Enter to run the query.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <StatusPill label="draft.sql" tone="neutral" />
        <StatusPill label={isRunning ? "Running" : hasRun ? "Executed" : "Ready"} tone={isRunning ? "cyan" : "success"} />
        <button
          type="button"
          onClick={onRunQuery}
          disabled={isRunning}
          className="rounded-full border border-cyan-300/[0.24] bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100 transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-300/[0.14] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {isRunning ? "Running..." : "Run Query"}
        </button>
      </div>
    </div>
  );
}

function ResultsTable({
  queryStatus,
  queryValidationMessage,
  queryColumns,
  queryResults,
}: {
  queryStatus: SimulationValidation["status"];
  queryValidationMessage: string;
  queryColumns: string[];
  queryResults: QueryResult[];
}) {
  const isRunning = queryStatus === "running";
  const hasRun = queryStatus === "valid" || queryStatus === "invalid" || queryStatus === "submitted";
  const hasRows = queryResults.length > 0;
  const columns =
    queryColumns.length > 0
      ? queryColumns
      : queryResults[0]
        ? Object.keys(queryResults[0])
        : [];

  const formatColumnLabel = (column: string) =>
    column
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (letter) => letter.toUpperCase());

  return (
    <div className="overflow-hidden rounded-[1.2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))]">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Query Results</p>
          <p className="mt-1 text-sm text-slate-300">
            {isRunning
              ? `Executing mock query against ${simulationScenario.dataset.name}...`
              : hasRun
                ? queryValidationMessage
                : "Run the query to load variance results from the local mock dataset."}
          </p>
        </div>
        <StatusPill
          label={isRunning ? "Running" : hasRun ? queryStatus : "Preview"}
          tone={queryStatus === "invalid" ? "warning" : hasRun ? "success" : "neutral"}
        />
      </div>

      {!hasRun || isRunning ? (
        <div className="px-5 py-8">
          <div className="rounded-[1.15rem] border border-white/[0.08] bg-slate-950/50 px-4 py-5 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
              {isRunning ? "Running Query" : "Ready State"}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {isRunning
                ? "The mock engine is matching your SQL to a supported churn-analysis pattern."
                : "Run a supported SQL pattern to render a structured result table here."}
            </p>
          </div>
        </div>
      ) : hasRun && !hasRows ? (
        <div className="px-5 py-8">
          <div className="rounded-[1.15rem] border border-white/[0.08] bg-slate-950/50 px-4 py-5 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
              {queryStatus === "invalid" ? "Error State" : "Empty State"}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{queryValidationMessage}</p>
          </div>
        </div>
      ) : (
        <div className="max-h-[22vh] overflow-auto overscroll-contain">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="sticky top-0 z-10 bg-[#09111f] text-[10px] uppercase tracking-[0.22em] text-slate-500">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-4 py-3 font-medium">
                    {formatColumnLabel(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {(hasRun ? queryResults : queryResults.slice(0, 2)).map((row, index) => (
                <tr
                  key={`${Object.values(row).join("-")}-${index}`}
                  className={[
                    "text-slate-300 transition",
                    !hasRun ? "opacity-35 blur-[0.4px]" : "",
                    isRunning && index === 0 ? "bg-cyan-300/[0.035]" : "",
                  ].join(" ")}
                >
                  {columns.map((column, columnIndex) => (
                    <td
                      key={column}
                      className={[
                        "px-4 py-3",
                        columnIndex === 0 ? "text-slate-100" : "",
                        ["variance", "churnRate", "avgChurnRisk"].includes(column)
                          ? "text-cyan-100"
                          : "",
                      ].join(" ")}
                    >
                      {column === "signal" ? (
                        <span className="rounded-full border border-cyan-300/[0.16] bg-cyan-300/[0.08] px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100">
                          {row[column]}
                        </span>
                      ) : (
                        row[column]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function WorkbenchModule({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      whileHover={premiumHover}
      transition={{ duration: 0.28, ease: premiumEase }}
      className={[
        "rounded-[1.35rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.022))] p-4 shadow-[0_16px_44px_rgba(2,8,20,0.22),inset_0_1px_0_rgba(255,255,255,0.045)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/[0.68]">{eyebrow}</p>
          <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-slate-50">{title}</h3>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function QueryResultPreview({
  queryColumns,
  queryResults,
  queryStatus,
}: Pick<AnalysisWorkAreaProps, "queryColumns" | "queryResults" | "queryStatus">) {
  const leadingRows = queryResults.slice(0, 3);
  const columns = queryColumns.length > 0 ? queryColumns : Object.keys(queryResults[0] ?? {});

  return (
    <WorkbenchModule eyebrow="Query Result Preview" title="Evidence table">
      {leadingRows.length > 0 ? (
        <div className="overflow-hidden rounded-[1.05rem] border border-cyan-300/[0.12] bg-slate-950/[0.66]">
          <div className="max-h-72 overflow-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="sticky top-0 bg-[#08111d] text-[10px] uppercase tracking-[0.22em] text-slate-500">
                <tr>
                  {columns.slice(0, 5).map((column) => (
                    <th key={column} className="px-3.5 py-3 font-medium">
                      {column.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {leadingRows.map((row, index) => (
                  <tr key={`${Object.values(row).join("-")}-${index}`} className="text-slate-300">
                    {columns.slice(0, 5).map((column, columnIndex) => (
                      <td key={column} className={["px-3.5 py-3", columnIndex === 0 ? "text-cyan-100" : ""].join(" ")}>
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-[1.05rem] border border-white/[0.08] bg-slate-950/[0.54] px-4 py-5">
          <p className="text-sm leading-6 text-slate-300">
            {queryStatus === "running"
              ? "The result preview is waiting for the execution response."
              : "Run the SQL query to populate this lower workbench with result-backed evidence."}
          </p>
        </div>
      )}
    </WorkbenchModule>
  );
}

function KeyPatternModule({
  queryResults,
  queryStatus,
}: Pick<AnalysisWorkAreaProps, "queryResults" | "queryStatus">) {
  const primaryRow = queryResults[0];
  const pattern =
    primaryRow && Object.keys(primaryRow).length > 0
      ? Object.entries(primaryRow)
          .slice(0, 3)
          .map(([key, value]) => `${key.replace(/_/g, " ")}: ${value}`)
          .join(" | ")
      : "Low activation cohorts are the expected first signal to validate.";

  return (
    <WorkbenchModule eyebrow="Key Pattern Detected" title="Analysis output">
      <div className="rounded-[1.1rem] border border-cyan-300/[0.14] bg-cyan-300/[0.055] p-4">
        <StatusPill
          label={queryStatus === "valid" || queryStatus === "submitted" ? "Signal detected" : "Awaiting evidence"}
          tone={queryStatus === "invalid" ? "warning" : "cyan"}
        />
        <p className="mt-4 text-sm leading-7 text-slate-100">{pattern}</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {sqlResultCards.map((card) => (
          <WorkspaceInfoCard key={card.label} label={card.label} value={card.value} />
        ))}
      </div>
    </WorkbenchModule>
  );
}

function DraftWorkspaceModule({
  insightNotes,
  recommendation,
}: Pick<AnalysisWorkAreaProps, "insightNotes" | "recommendation">) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <WorkbenchModule eyebrow="Insight Workspace" title="Insight draft">
        <p className="line-clamp-[8] min-h-44 whitespace-pre-line rounded-[1.05rem] border border-white/[0.08] bg-slate-950/[0.54] px-4 py-4 text-sm leading-7 text-slate-300">
          {insightNotes}
        </p>
      </WorkbenchModule>
      <WorkbenchModule eyebrow="Recommendation Builder" title="Recommendation draft">
        <p className="line-clamp-[8] min-h-44 whitespace-pre-line rounded-[1.05rem] border border-white/[0.08] bg-slate-950/[0.54] px-4 py-4 text-sm leading-7 text-slate-300">
          {recommendation}
        </p>
      </WorkbenchModule>
    </div>
  );
}

function SubmissionReadinessModule({
  readiness,
}: Pick<AnalysisWorkAreaProps, "readiness">) {
  const visibleChecks = [
    ...readiness.completedItems.slice(0, 3).map((item) => ({ label: item, complete: true })),
    ...readiness.missingItems.slice(0, 3).map((item) => ({ label: item, complete: false })),
  ].slice(0, 5);

  return (
    <WorkbenchModule eyebrow="Mission Progress" title="Submission readiness">
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill label={readiness.label} tone={readiness.tone} />
        <StatusPill label={`${readiness.score}% mission score`} tone="cyan" />
        <StatusPill label={`${readiness.confidence} confidence`} tone="neutral" />
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">{readiness.message}</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {visibleChecks.map((item) => (
          <div
            key={`${item.label}-${item.complete}`}
            className={[
              "rounded-[1rem] border px-3.5 py-3 text-sm leading-6",
              item.complete
                ? "border-cyan-300/[0.14] bg-cyan-300/[0.045] text-cyan-50"
                : "border-amber-300/[0.14] bg-amber-300/[0.04] text-slate-300",
            ].join(" ")}
          >
            {item.label}
          </div>
        ))}
      </div>
    </WorkbenchModule>
  );
}

function GuidanceWorkbenchModules({
  activeMode,
  readiness,
  unlockedHintCount,
  validation,
}: Pick<
  AnalysisWorkAreaProps,
  "activeMode" | "readiness" | "unlockedHintCount" | "validation"
>) {
  const guidance = workspaceGuidanceByMode[activeMode];
  const unlockedHints = simulationScenario.hints.slice(0, unlockedHintCount);
  const lockedHints = simulationScenario.hints.slice(unlockedHintCount);

  return (
    <section className="rounded-[1.55rem] border border-cyan-300/[0.12] bg-[linear-gradient(180deg,rgba(8,17,29,0.92),rgba(5,10,18,0.74))] p-4 shadow-[0_22px_58px_rgba(2,8,20,0.28),inset_0_1px_0_rgba(255,255,255,0.05)] lg:p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.025] px-4 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.72]">
            Guidance & Evaluation Board
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
            Decision support for the current lab mode
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Evaluator feedback, rubric signals, progressive hints, readiness, and next action stay close to the work surface.
          </p>
        </div>
        <StatusPill
          label={`${unlockedHintCount}/${simulationScenario.hints.length} hints open`}
          tone="cyan"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <WorkbenchModule eyebrow="Evaluator Feedback" title="Guidance layer">
          <div className="rounded-[1.1rem] border border-cyan-300/[0.14] bg-cyan-300/[0.045] p-4">
            <StatusPill
              label={validation.status === "idle" ? "Evaluator ready" : validation.status}
              tone={validation.status === "invalid" ? "warning" : "cyan"}
            />
            <p className="mt-4 text-sm leading-7 text-slate-100">
              {validation.status === "idle" ? guidance.feedback[0] : validation.message}
            </p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {guidance.feedback.slice(1, 3).map((item, index) => (
              <div
                key={item}
                className="rounded-[1rem] border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-sm leading-6 text-slate-300"
              >
                <span className="mr-2 text-[10px] uppercase tracking-[0.22em] text-cyan-200/[0.7]">
                  F0{index + 2}
                </span>
                {item}
              </div>
            ))}
          </div>
        </WorkbenchModule>

        <WorkbenchModule eyebrow="Rubric" title="Evaluation criteria">
          <div className="grid gap-2">
            {guidance.rubric.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-[1rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.018))] px-3.5 py-3"
              >
                <span className="text-sm leading-6 text-slate-200">{item.label}</span>
                <StatusPill label={item.score} tone="neutral" />
              </div>
            ))}
          </div>
        </WorkbenchModule>

        <WorkbenchModule eyebrow="Hints / Progressive Guidance" title="Hint flow">
          <div className="grid gap-3 lg:grid-cols-2">
            {unlockedHints.map((item, index) => (
              <div
                key={`${item.step}-${item.text}`}
                className="rounded-[1.05rem] border border-cyan-300/[0.12] bg-cyan-300/[0.035] px-4 py-3.5"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                  Hint 0{index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">{item.text}</p>
              </div>
            ))}
            {lockedHints.map((item, index) => (
              <div
                key={`locked-${item.step}-${item.text}`}
                className="rounded-[1.05rem] border border-white/[0.06] bg-white/[0.018] px-4 py-3.5 opacity-65"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-slate-600">
                  Locked 0{unlockedHintCount + index + 1}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-500">
                  Progress the mission to reveal this hint.
                </p>
              </div>
            ))}
          </div>
        </WorkbenchModule>

        <SubmissionReadinessModule readiness={readiness} />

        <WorkbenchModule eyebrow="Next Action" title="Analyst notes">
          <div className="space-y-3">
            {sqlExecutionNotes.map((note, index) => (
              <div
                key={note}
                className="rounded-[1rem] border border-white/[0.08] bg-white/[0.03] px-3.5 py-3 text-sm leading-6 text-slate-300"
              >
                <span className="mr-2 text-[10px] uppercase tracking-[0.22em] text-cyan-200/[0.7]">
                  0{index + 1}
                </span>
                {note}
              </div>
            ))}
          </div>
        </WorkbenchModule>
      </div>
    </section>
  );
}

function TechnicalTraceModule({
  sqlDraft,
  queryValidationMessage,
  queryStatus,
}: Pick<AnalysisWorkAreaProps, "sqlDraft" | "queryValidationMessage" | "queryStatus">) {
  return (
    <WorkbenchModule eyebrow="Technical Trace" title="Execution trace">
      <div className="rounded-[1.05rem] border border-white/[0.08] bg-slate-950/[0.78] p-4 font-mono text-[12px] leading-6 text-slate-300">
        <p className="mb-3 text-cyan-100">{queryStatus.toUpperCase()} | {queryValidationMessage}</p>
        <pre className="max-h-52 overflow-auto whitespace-pre-wrap">{sqlDraft}</pre>
      </div>
    </WorkbenchModule>
  );
}

function SqlWorkbenchContinuation({
  sqlDraft,
  insightNotes,
  recommendation,
  queryStatus,
  queryValidationMessage,
  queryColumns,
  queryResults,
}: Pick<
  AnalysisWorkAreaProps,
  | "sqlDraft"
  | "insightNotes"
  | "recommendation"
  | "queryStatus"
  | "queryValidationMessage"
  | "queryColumns"
  | "queryResults"
>) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <QueryResultPreview
          queryColumns={queryColumns}
          queryResults={queryResults}
          queryStatus={queryStatus}
        />
        <KeyPatternModule queryResults={queryResults} queryStatus={queryStatus} />
      </div>
      <DraftWorkspaceModule insightNotes={insightNotes} recommendation={recommendation} />
      <TechnicalTraceModule
        sqlDraft={sqlDraft}
        queryValidationMessage={queryValidationMessage}
        queryStatus={queryStatus}
      />
    </div>
  );
}

function SqlEditorSurface({
  sqlDraft,
  queryStatus,
  queryValidationMessage,
  queryColumns,
  queryResults,
  onRunQuery,
  onSqlDraftChange,
}: Pick<
  AnalysisWorkAreaProps,
  | "sqlDraft"
  | "queryStatus"
  | "queryValidationMessage"
  | "queryColumns"
  | "queryResults"
  | "onRunQuery"
  | "onSqlDraftChange"
>) {
  const runQuery = useCallback(() => {
    if (queryStatus === "running") {
      return;
    }

    onRunQuery();
  }, [onRunQuery, queryStatus]);

  const editorExtensions = useMemo(
    () => [
      sql(),
      sqlEditorTheme,
      EditorView.lineWrapping,
      keymap.of([
        {
          key: "Mod-Enter",
          run: () => {
            runQuery();
            return true;
          },
        },
        {
          key: "Ctrl-Enter",
          run: () => {
            runQuery();
            return true;
          },
        },
      ]),
    ],
    [runQuery],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, ease: premiumEase }}
      className="flex flex-col rounded-[1.7rem] border border-cyan-300/[0.14] bg-[linear-gradient(180deg,rgba(8,17,29,0.96),rgba(7,13,23,0.92))] p-5 shadow-[0_24px_70px_rgba(2,8,20,0.36),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <EditorHeader queryStatus={queryStatus} onRunQuery={runQuery} />

      <div className="grid gap-4">
        <div className="relative h-[64vh] min-h-[64vh] overflow-hidden rounded-[1.35rem] border border-cyan-300/[0.16] bg-slate-950/[0.92] shadow-[0_16px_40px_rgba(2,8,20,0.34),inset_0_1px_0_rgba(255,255,255,0.04)]">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-[linear-gradient(180deg,rgba(34,211,238,0.12),transparent)]"
            animate={{ opacity: [0.35, 0.62, 0.35] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-cyan-300/[0.45]"
            animate={{ y: [0, 420, 0], opacity: [0, 0.35, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <CodeMirror
            value={sqlDraft}
            height="100%"
            theme={sqlEditorTheme}
            extensions={editorExtensions}
            basicSetup={{
              autocompletion: true,
              bracketMatching: true,
              closeBrackets: true,
              defaultKeymap: true,
              foldGutter: true,
              highlightActiveLine: true,
              highlightActiveLineGutter: true,
              lineNumbers: true,
              searchKeymap: true,
              syntaxHighlighting: true,
            }}
            onChange={onSqlDraftChange}
            className="h-full"
          />
        </div>

        <ResultsTable
          queryStatus={queryStatus}
          queryValidationMessage={queryValidationMessage}
          queryColumns={queryColumns}
          queryResults={queryResults}
        />
      </div>
    </motion.div>
  );
}

function SqlMode({
  sqlDraft,
  insightNotes,
  recommendation,
  readiness,
  queryStatus,
  queryValidationMessage,
  queryColumns,
  queryResults,
  onRunQuery,
  onSqlDraftChange,
}: Pick<
  AnalysisWorkAreaProps,
  | "sqlDraft"
  | "insightNotes"
  | "recommendation"
  | "readiness"
  | "queryStatus"
  | "queryValidationMessage"
  | "queryColumns"
  | "queryResults"
  | "onRunQuery"
  | "onSqlDraftChange"
>) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)]">
        <SqlEditorSurface
          sqlDraft={sqlDraft}
          queryStatus={queryStatus}
          queryValidationMessage={queryValidationMessage}
          queryColumns={queryColumns}
          queryResults={queryResults}
          onRunQuery={onRunQuery}
          onSqlDraftChange={onSqlDraftChange}
        />
      </div>
      <SqlWorkbenchContinuation
        sqlDraft={sqlDraft}
        insightNotes={insightNotes}
        recommendation={recommendation}
        queryStatus={queryStatus}
        queryValidationMessage={queryValidationMessage}
        queryColumns={queryColumns}
        queryResults={queryResults}
      />
    </div>
  );
}

function InsightsMode({
  insightNotes,
  onInsightNotesChange,
}: Pick<AnalysisWorkAreaProps, "insightNotes" | "onInsightNotesChange">) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 xl:grid-cols-2">
        {insightEvidenceCards.slice(0, 2).map((card) => (
          <WorkspaceInfoCard key={card.label} label={card.label} value={card.value} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_340px]">
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
              className="rounded-[1.25rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4"
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
    <div className="flex flex-col gap-5">
      <div className="grid gap-3 xl:grid-cols-2">
        {recommendationFrames.slice(0, 2).map((frame) => (
          <WorkspaceInfoCard key={frame.label} label={frame.label} value={frame.description} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_340px]">
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

function PreviewMode({
  preview,
  readiness,
  queryColumns,
  queryResults,
  queryValidationMessage,
}: Pick<
  AnalysisWorkAreaProps,
  "preview" | "readiness" | "queryColumns" | "queryResults" | "queryValidationMessage"
>) {
  const leadingRows = queryResults.slice(0, 3);
  const findingColumns = queryColumns.length > 0 ? queryColumns : Object.keys(queryResults[0] ?? {});
  const formatColumnLabel = (column: string) =>
    column
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, (letter) => letter.toUpperCase());

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_340px]">
      <SurfaceFrame
        title="Analyst Deliverable"
        description="Polished preview of the work product leadership would receive from this mission."
        className="min-h-0"
        contentClassName="overflow-y-auto overscroll-contain pr-1"
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 rounded-[1.25rem] border border-cyan-300/[0.14] bg-cyan-300/[0.045] p-4">
            <StatusPill label={readiness.label} tone={readiness.tone} />
            <StatusPill label={`${readiness.score} mission score`} tone="cyan" />
            <StatusPill label={`${readiness.confidence} confidence`} tone="neutral" />
          </div>

          <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Executive Summary</p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              The analysis points to onboarding activation as the highest-risk retention lever. The
              recommendation should focus leadership on the customer segment where retained revenue is
              deteriorating earliest, then connect that signal to an operating intervention.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Key Findings</p>
            {leadingRows.length > 0 ? (
              <div className="mt-3 space-y-3">
                {leadingRows.map((row, index) => (
                  <div
                    key={`${Object.values(row).join("-")}-${index}`}
                    className="rounded-[1rem] border border-white/[0.08] bg-slate-950/[0.42] px-3.5 py-3"
                  >
                    <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                      Finding 0{index + 1}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">
                      {findingColumns.slice(0, 3).map((column) => (
                        <span key={column} className="mr-3 inline-block">
                          <span className="text-slate-500">{formatColumnLabel(column)}:</span>{" "}
                          {row[column]}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Run a successful query to attach result-backed findings to the submission preview.
              </p>
            )}
          </div>

          <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Recommendation</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-200">
              {preview.recommendation}
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">Analyst Notes</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-200">{preview.insightNotes}</p>
          </div>
        </div>
      </SurfaceFrame>

      <SurfaceFrame
        title="Trace & Readiness"
        description="Compact audit of source SQL, validation state, and remaining submission gaps."
        className="min-h-0"
        contentClassName="overflow-y-auto overscroll-contain pr-1"
      >
        <div className="mb-4 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Readiness State</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{readiness.message}</p>
          <p className="mt-3 text-xs leading-5 text-slate-500">{queryValidationMessage}</p>
        </div>

        {readiness.missingItems.length > 0 ? (
        <div className="mb-4 rounded-[1.25rem] border border-amber-300/[0.12] bg-amber-300/[0.04] p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-amber-100/70">Missing Before Submit</p>
            <div className="mt-3 space-y-2">
              {readiness.missingItems.map((item) => (
                <p key={item} className="text-sm leading-6 text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <div className="rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.82] p-4 font-mono text-[13px] leading-7 text-slate-300">
          <pre className="whitespace-pre-wrap">{preview.sqlDraft}</pre>
        </div>
        <div className="mt-4 grid gap-3">
          {[
            { label: "Submission state", value: readiness.label },
            { label: "Confidence signal", value: readiness.confidence },
            { label: "Completed checks", value: String(readiness.completedItems.length) },
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
  readiness,
  queryStatus,
  queryValidationMessage,
  queryColumns,
  queryResults,
  unlockedHintCount,
  validation,
  onRunQuery,
  onSqlDraftChange,
  onInsightNotesChange,
  onRecommendationChange,
}: AnalysisWorkAreaProps) {
  const activeTab = workspaceTabs.find((tab) => tab.id === activeMode) ?? workspaceTabs[0];

  return (
    <Reveal delay={0.05}>
      <GlassPanel
        className="flex flex-col self-start bg-[linear-gradient(180deg,rgba(255,255,255,0.088),rgba(255,255,255,0.032))] p-5 lg:p-6"
        glow="cyan"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_80%_10%,rgba(99,102,241,0.08),transparent_22%)]" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: premiumEase }}
          className="relative flex flex-col"
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

          <div className="mt-5 pr-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.34, ease: premiumEase }}
                className="min-h-full"
              >
                {activeMode === "sql" ? (
                  <SqlMode
                    sqlDraft={sqlDraft}
                    insightNotes={insightNotes}
                    recommendation={recommendation}
                    readiness={readiness}
                    queryStatus={queryStatus}
                    queryValidationMessage={queryValidationMessage}
                    queryColumns={queryColumns}
                    queryResults={queryResults}
                    onRunQuery={onRunQuery}
                    onSqlDraftChange={onSqlDraftChange}
                  />
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
                {activeMode === "preview" ? (
                  <PreviewMode
                    preview={preview}
                    readiness={readiness}
                    queryColumns={queryColumns}
                    queryResults={queryResults}
                    queryValidationMessage={queryValidationMessage}
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>

            <div className="mt-5">
              <GuidanceWorkbenchModules
                activeMode={activeMode}
                readiness={readiness}
                unlockedHintCount={unlockedHintCount}
                validation={validation}
              />
            </div>
          </div>
        </motion.div>
      </GlassPanel>
    </Reveal>
  );
}
