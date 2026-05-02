"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs } from "@/content/labs";
import {
  getSubmissionById,
  updateSubmission,
  type Submission,
} from "@/data/submissions";
import { awardXp, XP_REWARDS, type XpAward } from "@/data/progression";

const criteria = [
  "Problem framing",
  "Technical correctness",
  "Data handling",
  "Communication clarity",
  "Business relevance",
  "Debugging evidence",
] as const;

export function ReviewDetail({ submissionId }: { submissionId: string }) {
  const [submission, setSubmission] = useState<Submission | undefined>();
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(criteria.map((criterion) => [criterion, 4])),
  );
  const [feedback, setFeedback] = useState("");
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [xpFeedback, setXpFeedback] = useState<XpAward | null>(null);

  useEffect(() => {
    getSubmissionById(submissionId).then((item) => {
      setSubmission(item);
      setFeedback(item?.reviewerFeedback ?? "");
    }).finally(() => setIsLoading(false));
  }, [submissionId]);

  const finalScore = useMemo(() => {
    const values = Object.values(scores);
    return Math.round((values.reduce((sum, value) => sum + value, 0) / (values.length * 5)) * 100);
  }, [scores]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <p className="text-sm text-slate-300">Loading review workspace...</p>
      </main>
    );
  }

  if (!submission) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <Link href="/review" className="text-cyan-200">Back to review queue</Link>
        <p className="mt-8 text-2xl font-semibold">Submission not found.</p>
      </main>
    );
  }

  const lab = labs.find((item) => item.id === submission.labId);

  async function submitReview() {
    const updated = await updateSubmission(submissionId, {
      status: "reviewed",
      score: finalScore,
      reviewerFeedback: feedback,
    });
    if (updated) {
      setSubmission(updated);
      setXpFeedback(
        awardXp(`review:${submissionId}`, XP_REWARDS.review, "Feedback completed", {
          reviewedSubmissionId: submissionId,
        }),
      );
    }
    setSaved(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] px-5 py-6 text-slate-50 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_86%_16%,rgba(99,102,241,0.1),transparent_20%)]" />
      <div className="relative mx-auto max-w-[1320px]">
        <section className="mb-8">
          <Link href="/review" className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/[0.3] hover:text-cyan-100">
            Back to review queue
          </Link>
          <p className="mt-8 text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Feedback Interface
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
            {lab?.title ?? submission.labId}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300/[0.78]">
            Supabase-backed feedback when configured, with local prototype fallback if Supabase is unavailable.
          </p>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.58fr)_minmax(420px,0.42fr)]">
          <GlassPanel className="p-6" glow="blue">
            <div className="relative space-y-5">
              <Evidence title="Submitted SQL / Answers" value={submission.sqlAnswer} code />
              <Evidence title="Insight Note" value={submission.insightNote} />
              <Evidence title="Recommendation" value={submission.recommendation} />
            </div>
          </GlassPanel>

          <GlassPanel className="p-6" glow="cyan">
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
                Feedback Scoring
              </p>
              <div className="mt-5 space-y-4">
                {criteria.map((criterion) => (
                  <label key={criterion} className="block rounded-[1.15rem] border border-white/[0.08] bg-slate-950/[0.34] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{criterion}</span>
                      <span className="text-cyan-100">{scores[criterion]}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={scores[criterion]}
                      onChange={(event) =>
                        setScores((current) => ({
                          ...current,
                          [criterion]: Number(event.target.value),
                        }))
                      }
                      className="mt-3 w-full accent-cyan-300"
                    />
                  </label>
                ))}
              </div>

              <label className="mt-5 block">
                <span className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
                  Feedback that helps them level up
                </span>
                <textarea
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  className="mt-3 min-h-36 w-full rounded-[1.2rem] border border-white/[0.1] bg-slate-950/[0.55] p-4 text-sm leading-7 text-slate-100 outline-none focus:border-cyan-300/[0.42] focus:ring-4 focus:ring-cyan-300/[0.08]"
                />
              </label>

              <div className="mt-5 rounded-[1.15rem] border border-cyan-300/[0.18] bg-cyan-300/[0.07] p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-100">Score</p>
                <p className="mt-2 text-4xl font-semibold text-white">{finalScore}</p>
              </div>

              <button
                type="button"
                onClick={submitReview}
                className="mt-5 w-full rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Submit Feedback
              </button>
              {saved ? (
                <Link href={`/submissions/${submission.id}`} className="mt-4 inline-flex text-sm text-emerald-200">
                  Feedback submitted. View work.
                </Link>
              ) : null}
              {xpFeedback ? (
                <div className="mt-4 rounded-[1.15rem] border border-emerald-300/[0.18] bg-emerald-300/[0.08] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-100">XP earned</p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    +{xpFeedback.xp} XP / {xpFeedback.level}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Feedback keeps the learning loop alive.
                  </p>
                </div>
              ) : null}
            </div>
          </GlassPanel>
        </section>
      </div>
    </main>
  );
}

function Evidence({ title, value, code = false }: { title: string; value: string; code?: boolean }) {
  return (
    <section>
      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">{title}</p>
      {code ? (
        <pre className="mt-3 whitespace-pre-wrap rounded-[1.15rem] border border-cyan-300/[0.14] bg-slate-950/[0.72] p-4 font-mono text-sm leading-7 text-slate-200">
          {value}
        </pre>
      ) : (
        <p className="mt-3 rounded-[1.15rem] border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-7 text-slate-300">
          {value}
        </p>
      )}
    </section>
  );
}
