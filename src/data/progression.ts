import { labs, type Lab, type LabId } from "@/content/labs";
import type { Submission } from "@/data/submissions";

export type LevelName = "Beginner" | "Explorer" | "Analyst" | "Job Ready";

export type ProgressionState = {
  xp: number;
  completedLabs: LabId[];
  submittedLabs: LabId[];
  reviewedSubmissions: string[];
  awardedEvents: string[];
  streakDates: string[];
};

export type XpAward = {
  xp: number;
  reason: string;
  level: LevelName;
  unlockedLabs: Lab[];
  nextMission: Lab | null;
};

const STORAGE_KEY = "analystos.progression";

export const XP_REWARDS = {
  completeLab: 50,
  submitWork: 100,
  review: 150,
};

export const labRewards: Record<LabId, number> = {
  "sql-join-challenge": 50,
  "sales-dashboard-critique": 50,
  "excel-cleaning-challenge": 50,
  "user-story-builder": 50,
  "ba-requirements-case": 75,
  "churn-diagnostic-simulation": 100,
  "debugging-broken-sql-query": 100,
  "python-eda-notebook-task": 125,
};

export const labPrerequisites: Partial<Record<LabId, LabId[]>> = {
  "churn-diagnostic-simulation": ["sql-join-challenge"],
  "ba-requirements-case": ["user-story-builder"],
  "debugging-broken-sql-query": ["sql-join-challenge"],
  "python-eda-notebook-task": ["excel-cleaning-challenge"],
};

const defaultState: ProgressionState = {
  xp: 0,
  completedLabs: [],
  submittedLabs: [],
  reviewedSubmissions: [],
  awardedEvents: [],
  streakDates: [],
};

export function getLevel(xp: number): LevelName {
  if (xp >= 700) return "Job Ready";
  if (xp >= 350) return "Analyst";
  if (xp >= 150) return "Explorer";
  return "Beginner";
}

export function getNextLevelXp(xp: number) {
  if (xp < 150) return 150;
  if (xp < 350) return 350;
  if (xp < 700) return 700;
  return 700;
}

export function getLevelProgress(xp: number) {
  const currentFloor = xp >= 700 ? 700 : xp >= 350 ? 350 : xp >= 150 ? 150 : 0;
  const nextLevel = getNextLevelXp(xp);
  if (nextLevel === currentFloor) return 100;
  return Math.min(100, Math.round(((xp - currentFloor) / (nextLevel - currentFloor)) * 100));
}

export function canUseProgressionStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readProgression(): ProgressionState {
  if (!canUseProgressionStorage()) return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...(JSON.parse(raw) as Partial<ProgressionState>) } : defaultState;
  } catch {
    return defaultState;
  }
}

export function writeProgression(state: ProgressionState) {
  if (!canUseProgressionStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function isLabUnlocked(lab: Lab, state: ProgressionState) {
  const prerequisites = labPrerequisites[lab.id] ?? [];
  return prerequisites.every((labId) => state.completedLabs.includes(labId));
}

export function getLockedReason(lab: Lab, state: ProgressionState) {
  const missing = (labPrerequisites[lab.id] ?? []).filter(
    (labId) => !state.completedLabs.includes(labId),
  );

  if (missing.length === 0) return "";

  return `Unlock by completing ${missing
    .map((labId) => labs.find((lab) => lab.id === labId)?.title ?? labId)
    .join(", ")}.`;
}

export function getNextMission(state: ProgressionState) {
  return (
    labs.find((lab) => isLabUnlocked(lab, state) && !state.completedLabs.includes(lab.id)) ??
    labs.find((lab) => !state.completedLabs.includes(lab.id)) ??
    null
  );
}

export function awardXp(
  eventId: string,
  xp: number,
  reason: string,
  options: { completedLabId?: LabId; submittedLabId?: LabId; reviewedSubmissionId?: string } = {},
): XpAward {
  const before = readProgression();

  if (before.awardedEvents.includes(eventId)) {
    return {
      xp: 0,
      reason: "Already earned",
      level: getLevel(before.xp),
      unlockedLabs: [],
      nextMission: getNextMission(before),
    };
  }

  const previouslyUnlocked = new Set(
    labs.filter((lab) => isLabUnlocked(lab, before)).map((lab) => lab.id),
  );

  const after: ProgressionState = {
    ...before,
    xp: before.xp + xp,
    awardedEvents: unique([...before.awardedEvents, eventId]),
    completedLabs: unique([
      ...before.completedLabs,
      ...(options.completedLabId ? [options.completedLabId] : []),
    ]),
    submittedLabs: unique([
      ...before.submittedLabs,
      ...(options.submittedLabId ? [options.submittedLabId] : []),
    ]),
    reviewedSubmissions: unique([
      ...before.reviewedSubmissions,
      ...(options.reviewedSubmissionId ? [options.reviewedSubmissionId] : []),
    ]),
  };

  writeProgression(after);

  const unlockedLabs = labs.filter(
    (lab) => isLabUnlocked(lab, after) && !previouslyUnlocked.has(lab.id),
  );

  return {
    xp,
    reason,
    level: getLevel(after.xp),
    unlockedLabs,
    nextMission: getNextMission(after),
  };
}

export function recordDailyUsage() {
  const state = readProgression();
  const today = new Date().toISOString().slice(0, 10);

  if (state.streakDates.includes(today)) {
    return state;
  }

  const nextState = {
    ...state,
    streakDates: unique([...state.streakDates, today]).slice(-30),
  };
  writeProgression(nextState);
  return nextState;
}

export function getCurrentStreak(state: ProgressionState) {
  const dates = new Set(state.streakDates);
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function getPathCompletionPercent(submissions: Submission[], state: ProgressionState) {
  const completed = new Set([
    ...state.completedLabs,
    ...submissions.filter((submission) => submission.status === "reviewed").map((submission) => submission.labId),
  ]);

  return Math.round((completed.size / labs.length) * 100);
}
