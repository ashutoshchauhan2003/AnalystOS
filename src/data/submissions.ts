import type { LabId } from "@/content/labs";
import { supabase } from "@/lib/supabase/client";

export type SubmissionStatus = "draft" | "submitted" | "reviewed";

export type Submission = {
  id: string;
  userId: string;
  labId: LabId;
  status: SubmissionStatus;
  sqlAnswer: string;
  insightNote: string;
  recommendation: string;
  score: number;
  reviewerFeedback: string;
  createdAt: string;
};

export type SubmissionInput = Omit<Submission, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};

const STORAGE_KEY = "analystos.localSubmissions";

export const mockSubmissions: Submission[] = [
  {
    id: "sub-sql-join-001",
    userId: "demo-user",
    labId: "sql-join-challenge",
    status: "reviewed",
    sqlAnswer: `select
  region,
  segment,
  sum(retained_revenue) as retained_revenue,
  sum(prior_retained_revenue) as prior_retained_revenue,
  sum(retained_revenue) - sum(prior_retained_revenue) as revenue_variance
from cohort_accounts
group by region, segment
order by revenue_variance asc;`,
    insightNote:
      "North America Enterprise and Mid-market cohorts show the clearest retained-revenue loss. The signal is concentrated enough to avoid a broad churn response.",
    recommendation:
      "Prioritize onboarding recovery for the high-value North America segments, then validate whether milestone completion improves retained revenue over the next cohort cycle.",
    score: 91,
    reviewerFeedback:
      "Strong query structure and business framing. The next pass should explain why the selected grouping is better than channel or plan-level cuts.",
    createdAt: "2026-04-24T09:20:00.000Z",
  },
  {
    id: "sub-dashboard-critique-001",
    userId: "demo-user",
    labId: "sales-dashboard-critique",
    status: "submitted",
    sqlAnswer:
      "No executable SQL required. Submitted dashboard critique notes and revised executive metric hierarchy.",
    insightNote:
      "The current dashboard overweights activity volume and underweights conversion quality. Revenue leaders need pipeline movement, win-rate quality, and stalled opportunity exposure first.",
    recommendation:
      "Move pipeline risk, conversion rate, and revenue variance into the top row. Push activity counts into a diagnostic section for manager follow-up.",
    score: 0,
    reviewerFeedback: "",
    createdAt: "2026-04-25T14:45:00.000Z",
  },
  {
    id: "sub-ba-requirements-001",
    userId: "demo-user",
    labId: "ba-requirements-case",
    status: "draft",
    sqlAnswer:
      "Draft requirements artifact in progress. SQL support optional for this business analyst case.",
    insightNote:
      "The discount exception workflow needs clearer approval thresholds, exception reasons, and SLA ownership before implementation.",
    recommendation:
      "Define a lightweight approval matrix with thresholds by discount band, required justification, and escalation owner.",
    score: 0,
    reviewerFeedback: "",
    createdAt: "2026-04-26T11:10:00.000Z",
  },
  {
    id: "sub-debug-sql-001",
    userId: "demo-user",
    labId: "debugging-broken-sql-query",
    status: "reviewed",
    sqlAnswer: `select
  onboarding_band,
  segment,
  count(*) as cohort_rows,
  sum(retained_revenue) as retained_revenue,
  avg(churn_risk_score) as avg_churn_risk
from cohort_accounts
group by onboarding_band, segment
order by avg_churn_risk desc;`,
    insightNote:
      "The original query failed because it mixed cohort-level fields without grouping. Grouping by onboarding band and segment makes the risk concentration visible.",
    recommendation:
      "Use the corrected query as the validation layer, then focus the intervention on low-completion onboarding cohorts with elevated risk.",
    score: 86,
    reviewerFeedback:
      "Good debugging explanation and strong validation discipline. Add one sentence on business impact to make it portfolio-ready.",
    createdAt: "2026-04-27T16:30:00.000Z",
  },
];

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readLocalSubmissions(): Submission[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
}

function writeLocalSubmissions(submissions: Submission[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

function getAllSubmissions() {
  const localSubmissions = readLocalSubmissions();
  const localIds = new Set(localSubmissions.map((submission) => submission.id));
  return [
    ...localSubmissions,
    ...mockSubmissions.filter((submission) => !localIds.has(submission.id)),
  ];
}

export const submissions = mockSubmissions;

function mapSubmissionRow(row: {
  id: string;
  user_id: string;
  lab_id: string;
  status: SubmissionStatus;
  sql_answer: string;
  insight_note: string;
  recommendation: string;
  score: number;
  feedback: string;
  created_at: string;
}): Submission {
  return {
    id: row.id,
    userId: row.user_id,
    labId: row.lab_id as LabId,
    status: row.status,
    sqlAnswer: row.sql_answer,
    insightNote: row.insight_note,
    recommendation: row.recommendation,
    score: row.score,
    reviewerFeedback: row.feedback,
    createdAt: row.created_at,
  };
}

function toSubmissionRow(data: Partial<Submission>) {
  return {
    user_id: data.userId,
    lab_id: data.labId,
    status: data.status,
    sql_answer: data.sqlAnswer,
    insight_note: data.insightNote,
    recommendation: data.recommendation,
    score: data.score,
    feedback: data.reviewerFeedback,
    created_at: data.createdAt,
  };
}

export async function getSubmissionsByUser(userId: string) {
  if (supabase) {
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data.map(mapSubmissionRow);
    }
  }

  return getAllSubmissions().filter((submission) => submission.userId === userId);
}

export async function getSubmissionById(id: string) {
  if (supabase) {
    const { data, error } = await supabase.from("submissions").select("*").eq("id", id).maybeSingle();

    if (!error && data) {
      return mapSubmissionRow(data);
    }
  }

  return getAllSubmissions().find((submission) => submission.id === id);
}

export async function createSubmission(data: SubmissionInput) {
  const submission: Submission = {
    ...data,
    id: data.id ?? `sub-${data.labId}-${Date.now()}`,
    createdAt: data.createdAt ?? new Date().toISOString(),
  };

  if (supabase) {
    const { data: inserted, error } = await supabase
      .from("submissions")
      .insert(toSubmissionRow(submission))
      .select("*")
      .single();

    if (!error && inserted) {
      return mapSubmissionRow(inserted);
    }
  }

  const localSubmissions = readLocalSubmissions();
  writeLocalSubmissions([submission, ...localSubmissions]);
  return submission;
}

export async function updateSubmission(id: string, data: Partial<Submission>) {
  const existing = await getSubmissionById(id);
  if (!existing) {
    return undefined;
  }

  const updated: Submission = {
    ...existing,
    ...data,
    id,
  };

  if (supabase) {
    const { data: saved, error } = await supabase
      .from("submissions")
      .update(toSubmissionRow(updated))
      .eq("id", id)
      .select("*")
      .single();

    if (!error && saved) {
      return mapSubmissionRow(saved);
    }
  }

  const localSubmissions = readLocalSubmissions();
  const withoutUpdated = localSubmissions.filter((submission) => submission.id !== id);
  writeLocalSubmissions([updated, ...withoutUpdated]);
  return updated;
}
