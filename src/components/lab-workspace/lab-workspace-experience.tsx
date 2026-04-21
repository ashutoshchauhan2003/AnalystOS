"use client";

import { useEffect, useMemo, useState } from "react";
import {
  initialInsightNotes,
  initialRecommendation,
  initialSqlDraft,
  type WorkspaceMode,
} from "@/content/lab-workspace";
import { AnalysisWorkArea } from "@/components/lab-workspace/analysis-work-area";
import { GuidancePanel } from "@/components/lab-workspace/guidance-panel";
import { ProblemBriefPanel } from "@/components/lab-workspace/problem-brief-panel";
import { WorkspaceShell } from "@/components/lab-workspace/workspace-shell";
import { WorkspaceTopBar } from "@/components/lab-workspace/workspace-top-bar";

type SaveState = "synced" | "saving" | "dirty";

export function LabWorkspaceExperience() {
  const [activeMode, setActiveMode] = useState<WorkspaceMode>("sql");
  const [sqlDraft, setSqlDraft] = useState(initialSqlDraft);
  const [insightNotes, setInsightNotes] = useState(initialInsightNotes);
  const [recommendation, setRecommendation] = useState(initialRecommendation);
  const [saveState, setSaveState] = useState<SaveState>("synced");
  const [lastSavedAt, setLastSavedAt] = useState("just now");

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

  const handleSqlDraftChange = (value: string) => {
    setSqlDraft(value);
    setSaveState("dirty");
  };

  const handleInsightNotesChange = (value: string) => {
    setInsightNotes(value);
    setSaveState("dirty");
  };

  const handleRecommendationChange = (value: string) => {
    setRecommendation(value);
    setSaveState("dirty");
  };

  return (
    <WorkspaceShell>
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <WorkspaceTopBar
          activeMode={activeMode}
          onModeChange={setActiveMode}
          saveState={saveState}
          lastSavedAt={lastSavedAt}
        />

        <div className="grid min-h-0 flex-1 gap-7 xl:grid-cols-[220px_minmax(0,2.45fr)_240px]">
          <ProblemBriefPanel />
          <AnalysisWorkArea
            activeMode={activeMode}
            sqlDraft={sqlDraft}
            insightNotes={insightNotes}
            recommendation={recommendation}
            preview={preview}
            onSqlDraftChange={handleSqlDraftChange}
            onInsightNotesChange={handleInsightNotesChange}
            onRecommendationChange={handleRecommendationChange}
          />
          <GuidancePanel activeMode={activeMode} />
        </div>
      </div>
    </WorkspaceShell>
  );
}
