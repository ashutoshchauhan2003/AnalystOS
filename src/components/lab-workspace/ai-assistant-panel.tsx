"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { premiumEase } from "@/components/motion/presets";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import type { SimulationValidation } from "@/content/lab-workspace";

type AssistantMode = "explain" | "next" | "insights";

type QueryResultRow = Record<string, string>;

type AiAssistantPanelProps = {
  sqlDraft: string;
  insightNotes: string;
  recommendation: string;
  queryResults: QueryResultRow[];
  validation: SimulationValidation;
  onUseAssistant?: () => void;
};

function getSqlExplanation(sqlDraft: string) {
  const normalized = sqlDraft.toLowerCase();
  const detectedGrouping = ["onboarding_band", "segment", "region"].filter((term) =>
    normalized.includes(term),
  );

  return [
    "This query is trying to isolate churn exposure by comparing retained revenue across cohort dimensions.",
    detectedGrouping.length > 0
      ? `It groups the read by ${detectedGrouping.join(", ")}, which helps explain where the retained-revenue loss is concentrated.`
      : "Add a cohort dimension like onboarding_band, segment, or region so the result explains where the problem is happening.",
    normalized.includes("churn_risk_score")
      ? "Including churn_risk_score is useful because it connects revenue movement to forward-looking churn exposure."
      : "Consider adding churn_risk_score so the output connects revenue loss to churn risk.",
  ];
}

function getNextSteps(validation: SimulationValidation, queryResults: QueryResultRow[]) {
  if (validation.status === "idle") {
    return [
      "Run the SQL query to validate the retained-revenue signal.",
      "Check whether the query groups by a business dimension leadership can act on.",
      "Use the result table to identify the highest-risk cohort before writing insights.",
    ];
  }

  if (validation.status === "invalid") {
    return [
      "Fix the SQL validation issue shown in the evaluator panel.",
      "Use cohort_accounts and retained_revenue as the core table and measure.",
      "Add churn or onboarding context so the engine can validate the diagnostic intent.",
    ];
  }

  const topDriver =
    queryResults[0]?.driver ??
    queryResults[0]?.cohort ??
    queryResults[0]?.onboardingBand ??
    "the highest-risk cohort";

  return [
    `Write the first insight around ${topDriver}.`,
    "Quantify the business consequence before explaining the operational cause.",
    "Move to Recommendation once the insight clearly links cohort behavior to retained-revenue risk.",
  ];
}

function getGeneratedInsights(queryResults: QueryResultRow[], insightNotes: string) {
  const topResult = queryResults[0];

  if (!topResult) {
    return [
      "Run the query first so the assistant can generate evidence-backed insights.",
      "The strongest insight should name the cohort, quantify the variance, and explain why it matters.",
    ];
  }

  return [
    `${topResult.driver ?? topResult.cohort ?? topResult.onboardingBand} is the clearest priority because it shows ${
      topResult.variance ?? topResult.churnRate ?? topResult.avgChurnRisk
    } as the strongest churn-retention signal.`,
    "The business issue appears concentrated rather than broad, which supports a focused retention intervention instead of a generic churn program.",
    insightNotes.length > 220
      ? "Your notes are detailed enough to convert into an executive recommendation."
      : "Add one sentence explaining why this cohort is actionable for lifecycle or customer success teams.",
  ];
}

export function AiAssistantPanel({
  sqlDraft,
  insightNotes,
  recommendation,
  queryResults,
  validation,
  onUseAssistant,
}: AiAssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AssistantMode>("explain");

  const responses = useMemo(
    () => ({
      explain: getSqlExplanation(sqlDraft),
      next: getNextSteps(validation, queryResults),
      insights: getGeneratedInsights(queryResults, insightNotes),
    }),
    [insightNotes, queryResults, sqlDraft, validation],
  );

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.28, ease: premiumEase }}
            className="mb-4 max-h-[min(38rem,calc(100vh-8rem))] w-[min(390px,calc(100vw-2.5rem))] overflow-y-auto overscroll-contain rounded-[1.6rem] border border-cyan-300/[0.18] bg-[linear-gradient(180deg,rgba(8,17,29,0.96),rgba(4,9,17,0.94))] p-5 text-slate-50 shadow-[0_24px_80px_rgba(0,0,0,0.46),0_0_42px_rgba(34,211,238,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.72]">
                  AI Analyst Assistant
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                  Mock guidance engine
                </h3>
              </div>
              <StatusPill label={validation.status} tone={validation.status === "valid" ? "success" : validation.status === "invalid" ? "warning" : "neutral"} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { id: "explain", label: "Explain SQL" },
                { id: "next", label: "Next Steps" },
                { id: "insights", label: "Insights" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMode(item.id as AssistantMode);
                    onUseAssistant?.();
                  }}
                  className={[
                    "rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.18em] transition",
                    mode === item.id
                      ? "border-cyan-300/[0.28] bg-cyan-300/[0.12] text-cyan-100"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-slate-100",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              {responses[mode].map((response, index) => (
                <div
                  key={response}
                  className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                    Response 0{index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{response}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.1rem] border border-cyan-300/[0.12] bg-cyan-300/[0.045] px-4 py-3 text-sm leading-6 text-cyan-50/90">
              Recommendation draft length: {recommendation.length} chars. This is a mock
              assistant response and does not call an AI API yet.
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          onUseAssistant?.();
        }}
        className="ml-auto flex items-center gap-3 rounded-full border border-cyan-300/[0.28] bg-cyan-300 px-5 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-slate-950 shadow-[0_0_40px_rgba(103,232,249,0.28)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050913]"
      >
        {isOpen ? "Close Assistant" : "Ask Assistant"}
      </button>
    </div>
  );
}
