"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs } from "@/content/labs";
import { getSubmissionById, type Submission } from "@/data/submissions";

export function SubmissionDetail({ submissionId }: { submissionId: string }) {
  const [submission, setSubmission] = useState<Submission | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSubmissionById(submissionId)
      .then(setSubmission)
      .finally(() => setIsLoading(false));
  }, [submissionId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <p className="text-sm text-slate-300">Loading submission...</p>
      </main>
    );
  }

  if (!submission) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <Link href="/submissions" className="text-cyan-200">Back to submissions</Link>
        <p className="mt-8 text-2xl font-semibold">Submission not found.</p>
      </main>
    );
  }

  const lab = labs.find((item) => item.id === submission.labId);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] px-5 py-6 text-slate-50 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.08),transparent_18%)]" />
      <div className="relative mx-auto max-w-[1420px]">
        <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_320px] lg:items-end">
          <div>
            <Link href="/submissions" className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100">
              Back to submissions
            </Link>
            <p className="mt-8 text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              Submission Detail
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
              {lab?.title ?? submission.labId}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/[0.78]">
              Supabase-backed submission record when configured, with local prototype fallback.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {submission.status === "draft" ? (
                <Link
                  href={`/lab?challenge=${submission.labId}`}
                  className="inline-flex rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950"
                >
                  Edit Submission
                </Link>
              ) : null}
              {submission.status === "reviewed" ? (
                <Link
                  href="/portfolio"
                  className="inline-flex rounded-full border border-cyan-300/[0.35] bg-cyan-300/[0.12] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-50 transition hover:border-cyan-200"
                >
                  Add to Portfolio
                </Link>
              ) : null}
            </div>
          </div>
          <GlassPanel className="p-5" glow="cyan">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">Status</p>
            <p className="mt-4 text-4xl font-semibold capitalize tracking-[-0.05em] text-white">
              {submission.status}
            </p>
            {submission.status === "reviewed" ? (
              <p className="mt-3 text-5xl font-semibold text-cyan-100">{submission.score}</p>
            ) : null}
          </GlassPanel>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.64fr)_minmax(360px,0.36fr)]">
          <div className="space-y-5">
            <SubmissionPanel eyebrow="Submitted SQL / Answers" title="Technical artifact">
              <pre className="whitespace-pre-wrap rounded-[1.2rem] border border-cyan-300/[0.14] bg-slate-950/[0.72] p-4 font-mono text-sm leading-7 text-slate-200">
                {submission.sqlAnswer}
              </pre>
            </SubmissionPanel>
            <SubmissionPanel eyebrow="Insight Note" title="Analyst interpretation">
              <p className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-7 text-slate-300">{submission.insightNote}</p>
            </SubmissionPanel>
            <SubmissionPanel eyebrow="Recommendation" title="Decision-ready action">
              <p className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4 text-sm leading-7 text-slate-300">{submission.recommendation}</p>
            </SubmissionPanel>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-8 xl:self-start">
            {submission.status === "reviewed" ? (
              <SubmissionPanel eyebrow="Reviewer Feedback" title="Review notes">
                <p className="rounded-[1.2rem] border border-cyan-300/[0.14] bg-cyan-300/[0.06] p-4 text-sm leading-7 text-cyan-50">
                  {submission.reviewerFeedback}
                </p>
              </SubmissionPanel>
            ) : null}
            <SubmissionPanel eyebrow="Metadata" title="Audit trail">
              <MetaRow label="Submission ID" value={submission.id} />
              <MetaRow label="User ID" value={submission.userId} />
              <MetaRow label="Created" value={new Date(submission.createdAt).toLocaleString("en-US")} />
            </SubmissionPanel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function SubmissionPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <GlassPanel className="p-6 lg:p-7" glow="cyan">
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">{eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
          <div className="mt-5">{children}</div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 rounded-[1.1rem] border border-white/[0.08] bg-white/[0.035] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm font-medium text-white">{value}</p>
    </div>
  );
}
