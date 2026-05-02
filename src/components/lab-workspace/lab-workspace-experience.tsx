"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";
import { BeginnerModeToggle, useBeginnerMode } from "@/components/beginner-mode/beginner-mode";
import { labs, type Lab, type LabId } from "@/content/labs";
import {
  initialInsightNotes,
  initialRecommendation,
  initialSqlDraft,
  simulationScenario,
  simulationStepDefinitions,
  type MissionReadiness,
  type SimulationStepState,
  type SimulationValidation,
  type WorkspaceMode,
} from "@/content/lab-workspace";
import { AnalysisWorkArea } from "@/components/lab-workspace/analysis-work-area";
import { AiAssistantPanel } from "@/components/lab-workspace/ai-assistant-panel";
import { ProblemBriefPanel } from "@/components/lab-workspace/problem-brief-panel";
import { WorkspaceShell } from "@/components/lab-workspace/workspace-shell";
import { WorkspaceTopBar } from "@/components/lab-workspace/workspace-top-bar";
import { StatusPill } from "@/components/lab-workspace/status-pill";
import {
  awardXp,
  getLockedReason,
  getNextMission,
  isLabUnlocked,
  readProgression,
  XP_REWARDS,
  type ProgressionState,
  type XpAward,
} from "@/data/progression";
import {
  createSubmission,
  updateSubmission,
  type Submission,
} from "@/data/submissions";
import { getCurrentUserId } from "@/lib/supabase/auth";

type SaveState = "synced" | "saving" | "dirty";
type QueryResultRow = Record<string, string>;

type QueryApiResponse = {
  status: "valid" | "invalid";
  message: string;
  columns: string[];
  rows: QueryResultRow[];
  executionTimeMs: number;
  summary: {
    table: string;
    rowsScanned: number;
    highestRiskDriver: string;
    recommendationSignal: string;
  } | null;
};

const sqlChallengeLabs = labs;

const sqlDraftByLab: Partial<Record<LabId, string>> = {
  "sql-join-challenge": `-- AnalystOS SQL join challenge adapted to the mock cohort_accounts engine
select
  region,
  segment,
  onboarding_band,
  sum(retained_revenue) as retained_revenue,
  sum(prior_retained_revenue) as prior_retained_revenue,
  sum(retained_revenue) - sum(prior_retained_revenue) as revenue_variance,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by region, segment, onboarding_band
order by revenue_variance asc;`,
  "debugging-broken-sql-query": `-- Debug the cohort query by keeping the table, grouping, and retained revenue fields aligned
select
  onboarding_band,
  segment,
  count(*) as cohort_rows,
  sum(retained_revenue) as retained_revenue,
  sum(prior_retained_revenue) as prior_retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by onboarding_band, segment
order by avg_churn_risk desc;`,
  "python-eda-notebook-task": `-- Notebook task warm-up: inspect onboarding risk before moving into EDA
select
  onboarding_band,
  count(*) as cohort_rows,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by onboarding_band
order by avg_churn_risk desc;`,
  "sales-dashboard-critique": `-- Dashboard critique data cut: find the clearest executive metric hierarchy
select
  region,
  segment,
  sum(retained_revenue) as retained_revenue,
  sum(prior_retained_revenue) as prior_retained_revenue,
  sum(retained_revenue) - sum(prior_retained_revenue) as revenue_variance
from cohort_accounts
group by region, segment
order by revenue_variance asc;`,
  "ba-requirements-case": `-- BA requirements case support query: quantify the operational segment before writing requirements
select
  onboarding_band,
  count(*) as cohort_rows,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by onboarding_band
order by avg_churn_risk desc;`,
  "churn-diagnostic-simulation": `-- Churn diagnostic simulation: locate the strongest retained-revenue risk pattern
select
  region,
  segment,
  onboarding_band,
  sum(retained_revenue) as retained_revenue,
  sum(prior_retained_revenue) as prior_retained_revenue,
  sum(retained_revenue) - sum(prior_retained_revenue) as revenue_variance,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by region, segment, onboarding_band
order by avg_churn_risk desc;`,
  "excel-cleaning-challenge": `-- Excel cleaning challenge support query: profile cohort quality and risk before documenting cleanup
select
  onboarding_band,
  region,
  count(*) as cohort_rows,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by onboarding_band, region
order by cohort_rows desc;`,
  "user-story-builder": `-- User story builder support query: quantify the affected operational cohorts
select
  segment,
  onboarding_band,
  count(*) as affected_accounts,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by segment, onboarding_band
order by avg_churn_risk desc;`,
};

function getValidLabId(value: string | null): LabId {
  return labs.some((lab) => lab.id === value) ? (value as LabId) : "sql-join-challenge";
}

function getInitialDraftForLab(labId: LabId) {
  return sqlDraftByLab[labId] ?? initialSqlDraft;
}

function includesAllTerms(value: string, terms: string[]) {
  const normalized = value.toLowerCase();
  return terms.every((term) => normalized.includes(term.toLowerCase()));
}

function includesAnyTerm(value: string, terms: string[]) {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

export function LabWorkspaceExperience() {
  const searchParams = useSearchParams();
  const { enabled: beginnerMode } = useBeginnerMode();
  const initialLabId = getValidLabId(searchParams.get("challenge"));
  const [activeMode, setActiveMode] = useState<WorkspaceMode>("sql");
  const [selectedLabId, setSelectedLabId] = useState<LabId>(initialLabId);
  const selectedLab = sqlChallengeLabs.find((lab) => lab.id === selectedLabId) ?? sqlChallengeLabs[0];
  const [sqlDraft, setSqlDraft] = useState(() => getInitialDraftForLab(selectedLabId));
  const [insightNotes, setInsightNotes] = useState(initialInsightNotes);
  const [recommendation, setRecommendation] = useState(initialRecommendation);
  const [queryValidation, setQueryValidation] = useState<SimulationValidation>({
    status: "idle",
    message: "Dataset loaded. Write SQL and run the query to begin validation.",
  });
  const [queryResults, setQueryResults] = useState<QueryResultRow[]>([]);
  const [queryColumns, setQueryColumns] = useState<string[]>([]);
  const [reviewedScenario, setReviewedScenario] = useState(false);
  const [interpretedResults, setInterpretedResults] = useState(false);
  const [insightEdited, setInsightEdited] = useState(false);
  const [recommendationEdited, setRecommendationEdited] = useState(false);
  const [assistantUsed, setAssistantUsed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [submittedAt, setSubmittedAt] = useState("");
  const [currentSubmissionId, setCurrentSubmissionId] = useState("");
  const [saveState, setSaveState] = useState<SaveState>("synced");
  const [lastSavedAt, setLastSavedAt] = useState("just now");
  const [userId, setUserId] = useState("demo-user");
  const [xpFeedback, setXpFeedback] = useState<XpAward | null>(null);
  const [progression, setProgression] = useState<ProgressionState | null>(null);

  useEffect(() => {
    getCurrentUserId().then((id) => setUserId(id ?? "demo-user"));
    setProgression(readProgression());
  }, []);

  useEffect(() => {
    if (!progression || isLabUnlocked(selectedLab, progression)) return;

    const nextMission = getNextMission(progression);
    if (nextMission) {
      handleChallengeChange(nextMission.id);
    }
  }, [progression, selectedLab]);

  const sqlHasRequiredTerms = includesAllTerms(
    sqlDraft,
    simulationScenario.validation.requiredSqlTerms,
  );
  const sqlHasPreferredTerms = includesAnyTerm(
    sqlDraft,
    simulationScenario.validation.preferredSqlTerms,
  );
  const sqlDraftMeaningful =
    sqlDraft.trim().length >= 120 && sqlHasRequiredTerms && sqlHasPreferredTerms;
  const queryCompleted = queryValidation.status === "valid" || queryValidation.status === "submitted";
  const queryRan = queryCompleted;
  const resultsPresent = queryResults.length > 0;
  const insightCompleted =
    insightEdited &&
    insightNotes.trim().length >= 160 &&
    includesAnyTerm(insightNotes, simulationScenario.validation.insightTerms);
  const recommendationCompleted =
    recommendationEdited &&
    recommendation.trim().length >= 150 &&
    includesAnyTerm(recommendation, simulationScenario.validation.recommendationTerms);
  const submissionReady =
    reviewedScenario &&
    sqlHasRequiredTerms &&
    sqlHasPreferredTerms &&
    queryRan &&
    resultsPresent &&
    interpretedResults &&
    insightCompleted &&
    recommendationCompleted;
  const submissionPreviewReady =
    queryRan && resultsPresent && interpretedResults && insightCompleted && recommendationCompleted;
  const currentStepId =
    !reviewedScenario
      ? "understand-problem"
      : !sqlDraftMeaningful
        ? "draft-sql"
        : !queryRan
          ? "run-analysis"
          : !resultsPresent || !insightCompleted || !interpretedResults
            ? "capture-insights"
            : !recommendationCompleted
              ? "write-recommendation"
              : "prepare-submission";

  const readinessChecks = useMemo(
    () => [
      { label: "Problem understood", complete: reviewedScenario },
      { label: "Meaningful SQL drafted", complete: sqlDraftMeaningful },
      { label: "Analysis ran successfully", complete: queryRan },
      { label: "Results are present", complete: resultsPresent },
      { label: "Insights captured", complete: insightCompleted },
      { label: "Recommendation written", complete: recommendationCompleted },
      { label: "Submission preview ready", complete: submissionPreviewReady },
    ],
    [
      insightCompleted,
      queryRan,
      recommendationCompleted,
      resultsPresent,
      reviewedScenario,
      sqlDraftMeaningful,
      submissionPreviewReady,
    ],
  );

  const missionScore = Math.min(
    100,
    (sqlDraftMeaningful ? 15 : 0) +
      (queryRan ? 25 : 0) +
      (resultsPresent ? 10 : 0) +
      (insightCompleted ? 20 : 0) +
      (recommendationCompleted ? 20 : 0) +
      (submissionReady ? 10 : 0),
  );

  const simulationSteps = useMemo<SimulationStepState[]>(
    () =>
      simulationStepDefinitions.map((step) => ({
        ...step,
        active: step.id === currentStepId,
        completed:
          step.id === "understand-problem"
            ? reviewedScenario
            : step.id === "draft-sql"
              ? sqlDraftMeaningful
              : step.id === "run-analysis"
                ? queryRan
                : step.id === "capture-insights"
                  ? interpretedResults && insightCompleted
                  : step.id === "write-recommendation"
                    ? recommendationCompleted
                    : submissionPreviewReady,
      })),
    [
      currentStepId,
      interpretedResults,
      insightCompleted,
      queryRan,
      recommendationCompleted,
      reviewedScenario,
      sqlDraftMeaningful,
      submissionPreviewReady,
    ],
  );

  const completedStepCount = simulationSteps.filter((step) => step.completed).length;
  const progress = Math.round((completedStepCount / simulationSteps.length) * 100);
  const missionReadiness = useMemo<MissionReadiness>(() => {
    if (submitted && submissionReady) {
      return {
        label: "Submitted",
        tone: "success",
        message:
          "Mission submitted. The workflow has enough evidence, interpretation, and recommendation quality.",
        confidence: "High",
        score: missionScore,
        completedItems: readinessChecks.filter((item) => item.complete).map((item) => item.label),
        missingItems: readinessChecks.filter((item) => !item.complete).map((item) => item.label),
      };
    }

    if (submissionReady) {
      return {
        label: "Ready",
        tone: "success",
        message: "Submission-ready. Review the preview once, then submit the recommendation.",
        confidence: "High",
        score: missionScore,
        completedItems: readinessChecks.filter((item) => item.complete).map((item) => item.label),
        missingItems: readinessChecks.filter((item) => !item.complete).map((item) => item.label),
      };
    }

    if (queryValidation.status === "invalid") {
      return {
        label: "Needs Fix",
        tone: "warning",
        message:
          "The mission is blocked by query validation. Fix the SQL and rerun before writing final insights.",
        confidence: "Low",
        score: missionScore,
        completedItems: readinessChecks.filter((item) => item.complete).map((item) => item.label),
        missingItems: readinessChecks.filter((item) => !item.complete).map((item) => item.label),
      };
    }

    if (progress >= 58) {
      return {
        label: "Nearly Ready",
        tone: "cyan",
        message:
          "The mission has a validated signal. Complete interpretation, insights, and recommendation polish.",
        confidence: "Medium",
        score: missionScore,
        completedItems: readinessChecks.filter((item) => item.complete).map((item) => item.label),
        missingItems: readinessChecks.filter((item) => !item.complete).map((item) => item.label),
      };
    }

    return {
      label: "Incomplete",
      tone: "neutral",
      message:
        "Work through the checklist from scenario review to query validation before preparing submission.",
      confidence: missionScore >= 50 ? "Medium" : "Low",
      score: missionScore,
      completedItems: readinessChecks.filter((item) => item.complete).map((item) => item.label),
      missingItems: readinessChecks.filter((item) => !item.complete).map((item) => item.label),
    };
  }, [missionScore, progress, queryValidation.status, readinessChecks, submissionReady, submitted]);
  const unlockedHintCount = Math.min(
    simulationScenario.hints.length,
    Math.max(
      1,
      1 +
        (queryRan ? 1 : 0) +
        (insightEdited ? 1 : 0) +
        (recommendationEdited || assistantUsed ? 1 : 0) +
        (queryValidation.status === "invalid" ? 1 : 0),
    ),
  );

  useEffect(() => {
    if (saveState !== "dirty") return;

    const savingTimer = window.setTimeout(() => {
      setSaveState("saving");
    }, 220);

    const syncedTimer = window.setTimeout(() => {
      setSaveState("synced");
      setLastSavedAt("just now");
    }, 1200);

    return () => {
      window.clearTimeout(savingTimer);
      window.clearTimeout(syncedTimer);
    };
  }, [saveState, sqlDraft, insightNotes, recommendation]);

  useEffect(() => {
    const queryLabId = getValidLabId(searchParams.get("challenge"));
    if (queryLabId !== selectedLabId) {
      handleChallengeChange(queryLabId, { syncUrl: false });
    }
  }, [searchParams, selectedLabId]);

  const preview = useMemo(
    () => ({
      sqlDraft,
      insightNotes,
      recommendation,
    }),
    [insightNotes, recommendation, sqlDraft],
  );

  const handleChallengeChange = (
    labId: LabId,
    options: { syncUrl?: boolean } = { syncUrl: true },
  ) => {
    const nextLab = sqlChallengeLabs.find((lab) => lab.id === labId);
    if (!nextLab) return;
    const currentProgression = readProgression();
    if (!isLabUnlocked(nextLab, currentProgression)) return;

    if (options.syncUrl && typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("challenge", labId);
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }

    setSelectedLabId(labId);
    setActiveMode("sql");
    setSqlDraft(getInitialDraftForLab(labId));
    setInsightNotes(`Challenge: ${nextLab.title}\n\nKey insight draft:\n`);
    setRecommendation(`Recommendation draft for ${nextLab.title}:\n`);
    setQueryResults([]);
    setQueryColumns([]);
    setReviewedScenario(true);
    setInterpretedResults(false);
    setInsightEdited(false);
    setRecommendationEdited(false);
    setSubmitted(false);
    setSubmittedAt("");
    setDraftSaved(false);
    setCurrentSubmissionId("");
    setXpFeedback(null);
    setSaveState("dirty");
    setQueryValidation({
      status: "idle",
      message: `${nextLab.title} loaded. Run the SQL query against the mock cohort_accounts engine.`,
    });
  };

  const persistSubmission = useCallback(
    async (status: Submission["status"]) => {
      const payload = {
        userId,
        labId: selectedLab.id,
        status,
        sqlAnswer: sqlDraft,
        insightNote: insightNotes,
        recommendation,
        score: 0,
        reviewerFeedback: "",
      };
      const saved = currentSubmissionId
        ? updateSubmission(currentSubmissionId, payload)
        : createSubmission(payload);
      const resolved = await saved;

      setCurrentSubmissionId(resolved?.id ?? "");
      return resolved;
    },
    [currentSubmissionId, insightNotes, recommendation, selectedLab.id, sqlDraft, userId],
  );

  const handleSaveDraft = useCallback(async () => {
    await persistSubmission("draft");
    setSaveState("synced");
    setDraftSaved(true);
    setLastSavedAt("just now");
  }, [persistSubmission]);

  const handleRunQuery = useCallback(async () => {
    setQueryValidation({
      status: "running",
      message: "Running SQL against /api/query...",
    });

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: sqlDraft }),
      });
      const payload = (await response.json()) as QueryApiResponse;

      setQueryColumns(payload.columns);
      setQueryResults(payload.rows);
      if (payload.status === "valid" && payload.rows.length > 0) {
        setInterpretedResults(false);
      }
      setQueryValidation({
        status: payload.status,
        message: payload.message,
      });
    } catch {
      setQueryResults([]);
      setQueryColumns([]);
      setQueryValidation({
        status: "invalid",
        message: "Query API request failed. Check the local dev server and try again.",
      });
    }
  }, [sqlDraft]);

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    setSubmittedAt(new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }));

    const saved = await persistSubmission("submitted");
    const submitAward = awardXp(
      `submit-work:${selectedLab.id}:${saved?.id ?? "local"}`,
      XP_REWARDS.submitWork,
      "Work submitted",
      { submittedLabId: selectedLab.id },
    );

    if (!submissionReady) {
      setXpFeedback(submitAward);
      setQueryValidation({
        status: queryValidation.status,
        message:
          "Submission blocked. Complete scenario review, query validation, result interpretation, insights, and recommendation framing first.",
      });
      return;
    }

    setQueryValidation({
      status: "submitted",
      message: "Recommendation submitted. The simulation engine marked the workflow complete.",
    });
    setActiveMode("preview");
    setCurrentSubmissionId(saved?.id ?? "");
    const completeAward = awardXp(
      `complete-lab:${selectedLab.id}`,
      XP_REWARDS.completeLab,
      "Mission complete",
      { completedLabId: selectedLab.id },
    );
    setXpFeedback({
      xp: submitAward.xp + completeAward.xp,
      reason: "Mission submitted and completed",
      level: completeAward.level,
      unlockedLabs: [...submitAward.unlockedLabs, ...completeAward.unlockedLabs],
      nextMission: completeAward.nextMission,
    });
    setProgression(readProgression());
  }, [
    persistSubmission,
    queryValidation.status,
    selectedLab.id,
    submissionReady,
  ]);

  const handleStepSelect = useCallback((step: SimulationStepState) => {
    if (step.id === "understand-problem") {
      setReviewedScenario(true);
    }

    if (step.id === "capture-insights" && queryResults.length > 0) {
      setInterpretedResults(true);
    }

    setActiveMode(step.mode);
  }, [queryResults.length]);

  const handleSqlDraftChange = (value: string) => {
    setSqlDraft(value);
    setSubmitted(false);
    setSubmittedAt("");
    setDraftSaved(false);
    setInterpretedResults(false);
    setQueryValidation({
      status: "idle",
      message: "SQL changed. Run the query again to refresh validation.",
    });
    setQueryResults([]);
    setQueryColumns([]);
    setSaveState("dirty");
  };

  const handleInsightNotesChange = (value: string) => {
    setInsightNotes(value);
    setInsightEdited(true);
    setSubmitted(false);
    setSubmittedAt("");
    setDraftSaved(false);
    setSaveState("dirty");
  };

  const handleRecommendationChange = (value: string) => {
    setRecommendation(value);
    setRecommendationEdited(true);
    setSubmitted(false);
    setSubmittedAt("");
    setDraftSaved(false);
    setSaveState("dirty");
  };

  return (
    <WorkspaceShell>
      <PageTransition className="flex flex-col gap-5 pb-6">
        <WorkspaceTopBar
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onSaveDraft={handleSaveDraft}
          onSubmit={handleSubmit}
          progress={progress}
          saveState={saveState}
          lastSavedAt={lastSavedAt}
        />

        <ChallengeSelector
          selectedLab={selectedLab}
          labs={sqlChallengeLabs}
          progression={progression}
          onChallengeChange={handleChallengeChange}
        />

        <BeginnerWorkspaceGuide selectedLab={selectedLab} enabled={beginnerMode} />

        <PrototypeNotice
          draftSaved={draftSaved}
          submitted={submitted}
          submittedAt={submittedAt}
          submissionReady={submissionReady}
          selectedLab={selectedLab}
          submissionId={currentSubmissionId}
        />

        <InstantXpFeedback feedback={xpFeedback} />

        <div className="grid gap-7 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start 2xl:grid-cols-[380px_minmax(0,1fr)]">
          <ProblemBriefPanel
            selectedLab={selectedLab}
            activeMode={activeMode}
            readiness={missionReadiness}
            progress={progress}
            steps={simulationSteps}
            validation={queryValidation}
            unlockedHintCount={unlockedHintCount}
            onStepSelect={handleStepSelect}
          />
          <AnalysisWorkArea
            selectedLab={selectedLab}
            activeMode={activeMode}
            sqlDraft={sqlDraft}
            insightNotes={insightNotes}
            recommendation={recommendation}
            preview={preview}
            readiness={missionReadiness}
            queryStatus={queryValidation.status}
            queryValidationMessage={queryValidation.message}
            queryColumns={queryColumns}
            queryResults={queryResults}
            unlockedHintCount={unlockedHintCount}
            validation={queryValidation}
            onRunQuery={handleRunQuery}
            onSqlDraftChange={handleSqlDraftChange}
            onInsightNotesChange={handleInsightNotesChange}
            onRecommendationChange={handleRecommendationChange}
          />
        </div>
      </PageTransition>
      <AiAssistantPanel
        sqlDraft={sqlDraft}
        insightNotes={insightNotes}
        recommendation={recommendation}
        queryResults={queryResults}
        validation={queryValidation}
        onUseAssistant={() => setAssistantUsed(true)}
      />
    </WorkspaceShell>
  );
}

function ChallengeSelector({
  selectedLab,
  labs,
  progression,
  onChallengeChange,
}: {
  selectedLab: Lab;
  labs: Lab[];
  progression: ProgressionState | null;
  onChallengeChange: (labId: LabId) => void;
}) {
  return (
    <section className="rounded-[1.6rem] border border-cyan-300/[0.14] bg-[linear-gradient(180deg,rgba(8,17,29,0.92),rgba(5,10,18,0.72))] p-4 shadow-[0_18px_54px_rgba(2,8,20,0.28),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Practice Challenge Selector
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
            {selectedLab.title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            {selectedLab.brief}
          </p>
        </div>

        <label className="min-w-0 lg:w-[360px]">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-slate-500">
            Active challenge
          </span>
          <select
            value={selectedLab.id}
            onChange={(event) => onChallengeChange(event.target.value as LabId)}
            className="w-full rounded-[1.1rem] border border-white/[0.1] bg-slate-950/[0.78] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/[0.45] focus:ring-4 focus:ring-cyan-300/10"
          >
            {labs.map((lab) => (
              <option
                key={lab.id}
                value={lab.id}
                disabled={progression ? !isLabUnlocked(lab, progression) : false}
                className="bg-slate-950 text-slate-100"
              >
                {progression && !isLabUnlocked(lab, progression)
                  ? `${lab.title} - locked`
                  : lab.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <ChallengeMetric label="Role fit" value={selectedLab.role.join(" / ")} />
        <ChallengeMetric label="Skill" value={selectedLab.skill} />
        <ChallengeMetric label="Difficulty" value={selectedLab.difficulty} />
        <ChallengeMetric
          label="Unlock status"
          value={progression ? getLockedReason(selectedLab, progression) || "Unlocked" : "Unlocked"}
        />
        <ChallengeMetric label="Expected output" value={selectedLab.expectedOutput} />
      </div>
    </section>
  );
}

function BeginnerWorkspaceGuide({
  selectedLab,
  enabled,
}: {
  selectedLab: Lab;
  enabled: boolean;
}) {
  const [openPanel, setOpenPanel] = useState<"hint" | "example" | "solution" | null>("hint");
  const steps = [
    "Read the task and say the goal in one sentence.",
    "Look at the data fields and choose what seems useful.",
    selectedLab.instructions[1] ?? "Do the main practice action.",
    selectedLab.instructions[2] ?? "Write the clearest pattern you found.",
    "Save your work and explain your answer in simple language.",
  ];

  const panels = {
    hint:
      selectedLab.instructions[0] ??
      "Start by identifying the business question before touching the tool area.",
    example:
      "Example: I found that one customer group has lower revenue than before, so the team should inspect that group first.",
    solution:
      "A strong answer names the group or issue, points to one piece of evidence, and recommends one next action. You do not need a perfect answer on the first try.",
  };

  return (
    <section className="rounded-[1.45rem] border border-cyan-300/[0.16] bg-[linear-gradient(180deg,rgba(34,211,238,0.095),rgba(255,255,255,0.028))] p-4 shadow-[0_18px_54px_rgba(2,8,20,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-100">
              Beginner Mode
            </p>
            <BeginnerModeToggle compact />
          </div>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">
            {enabled ? "Guided task path: Step 1 to Step 5" : "Turn on Beginner Mode for guided steps"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            {enabled
              ? "Use this as your simple checklist. The workspace still stays premium, but the instructions stay beginner-friendly."
              : "Beginner Mode adds hints, examples, and guided steps without changing your saved work."}
          </p>
        </div>
      </div>

      {enabled ? (
        <>
          <div className="mt-5 grid gap-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div
                key={`${step}-${index}`}
                className="rounded-[1.1rem] border border-white/[0.08] bg-slate-950/[0.36] p-3"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">
                  Step {index + 1}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <GuideButton active={openPanel === "hint"} onClick={() => setOpenPanel("hint")}>
              Show Hint
            </GuideButton>
            <GuideButton active={openPanel === "example"} onClick={() => setOpenPanel("example")}>
              Show Example
            </GuideButton>
            <GuideButton active={openPanel === "solution"} onClick={() => setOpenPanel("solution")}>
              Explain Solution
            </GuideButton>
          </div>

          {openPanel ? (
            <div className="mt-4 rounded-[1.15rem] border border-cyan-300/[0.14] bg-cyan-300/[0.06] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">
                {openPanel === "hint"
                  ? "Hint"
                  : openPanel === "example"
                    ? "Example"
                    : "Solution Explanation"}
              </p>
              <p className="mt-2 text-sm leading-6 text-cyan-50">{panels[openPanel]}</p>
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}

function GuideButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition",
        active
          ? "border-cyan-300/[0.55] bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.18)]"
          : "border-white/[0.12] bg-white/[0.04] text-slate-300 hover:border-cyan-300/30 hover:text-cyan-100",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PrototypeNotice({
  draftSaved,
  submitted,
  submittedAt,
  submissionReady,
  selectedLab,
  submissionId,
}: {
  draftSaved: boolean;
  submitted: boolean;
  submittedAt: string;
  submissionReady: boolean;
  selectedLab: Lab;
  submissionId: string;
}) {
  return (
    <section className="rounded-[1.35rem] border border-cyan-300/[0.18] bg-cyan-300/[0.065] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-100">
            Prototype Workspace
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-200">
            Supabase persistence is used when configured. Without env variables, AnalystOS falls back to local prototype storage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill label={selectedLab.skill} tone="cyan" />
          <StatusPill label={draftSaved ? "Draft saved" : "Draft pending"} tone={draftSaved ? "success" : "neutral"} />
          {submitted ? (
            <StatusPill
              label={submissionReady ? `Submitted ${submittedAt}` : `Submitted with gaps ${submittedAt}`}
              tone={submissionReady ? "success" : "warning"}
            />
          ) : null}
        </div>
      </div>

      {submitted ? (
        <div className="mt-4 rounded-[1.15rem] border border-white/[0.08] bg-slate-950/[0.34] px-4 py-3">
          <p className="text-sm font-medium text-white">Submission confirmation</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {submissionReady
              ? `${selectedLab.title} was submitted with SQL, insight notes, recommendation, and preview evidence.`
              : `${selectedLab.title} was saved as a submission attempt. Complete the remaining readiness checks before treating it as portfolio-ready.`}
          </p>
          {submissionId ? (
            <a
              href={`/submissions/${submissionId}`}
              className="mt-4 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              View Submission
            </a>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function InstantXpFeedback({ feedback }: { feedback: XpAward | null }) {
  if (!feedback) {
    return null;
  }

  return (
    <section className="rounded-[1.45rem] border border-emerald-300/[0.18] bg-[linear-gradient(180deg,rgba(16,185,129,0.12),rgba(34,211,238,0.045))] px-4 py-4 shadow-[0_18px_54px_rgba(2,8,20,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-emerald-100">
            XP Earned
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
            +{feedback.xp} XP added. Level: {feedback.level}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-300">{feedback.reason}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {feedback.unlockedLabs.length > 0 ? (
            feedback.unlockedLabs.map((lab) => (
              <StatusPill key={lab.id} label={`Unlocked: ${lab.title}`} tone="success" />
            ))
          ) : (
            <StatusPill label="Momentum saved" tone="success" />
          )}
        </div>
      </div>

      {feedback.nextMission ? (
        <div className="mt-4 rounded-[1.15rem] border border-white/[0.08] bg-slate-950/[0.34] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Next mission</p>
          <p className="mt-2 text-sm font-medium text-cyan-50">{feedback.nextMission.title}</p>
          <a
            href={`/lab?challenge=${feedback.nextMission.id}`}
            className="mt-3 inline-flex rounded-full border border-cyan-300/[0.45] bg-cyan-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            Chase Next XP
          </a>
        </div>
      ) : null}
    </section>
  );
}

function ChallengeMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.035] px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
    </div>
  );
}
