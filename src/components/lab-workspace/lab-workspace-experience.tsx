"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PageTransition } from "@/components/motion/page-transition";
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

function includesAllTerms(value: string, terms: string[]) {
  const normalized = value.toLowerCase();
  return terms.every((term) => normalized.includes(term.toLowerCase()));
}

function includesAnyTerm(value: string, terms: string[]) {
  const normalized = value.toLowerCase();
  return terms.some((term) => normalized.includes(term.toLowerCase()));
}

export function LabWorkspaceExperience() {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>("sql");
  const [sqlDraft, setSqlDraft] = useState(initialSqlDraft);
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
  const [saveState, setSaveState] = useState<SaveState>("synced");
  const [lastSavedAt, setLastSavedAt] = useState("just now");

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

  const preview = useMemo(
    () => ({
      sqlDraft,
      insightNotes,
      recommendation,
    }),
    [insightNotes, recommendation, sqlDraft],
  );

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

  const handleSubmit = useCallback(() => {
    setSubmitted(true);

    if (!submissionReady) {
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
  }, [
    queryValidation.status,
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
    setSaveState("dirty");
  };

  const handleRecommendationChange = (value: string) => {
    setRecommendation(value);
    setRecommendationEdited(true);
    setSubmitted(false);
    setSaveState("dirty");
  };

  return (
    <WorkspaceShell>
      <PageTransition className="flex flex-col gap-5 pb-6">
        <WorkspaceTopBar
          activeMode={activeMode}
          onModeChange={setActiveMode}
          onSubmit={handleSubmit}
          progress={progress}
          saveState={saveState}
          lastSavedAt={lastSavedAt}
        />

        <div className="grid gap-7 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start 2xl:grid-cols-[380px_minmax(0,1fr)]">
          <ProblemBriefPanel
            activeMode={activeMode}
            readiness={missionReadiness}
            progress={progress}
            steps={simulationSteps}
            validation={queryValidation}
            unlockedHintCount={unlockedHintCount}
            onStepSelect={handleStepSelect}
          />
          <AnalysisWorkArea
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
