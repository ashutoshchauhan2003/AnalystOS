"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs } from "@/content/labs";
import {
  getSubmissionsByUser,
  type Submission,
  type SubmissionStatus,
} from "@/data/submissions";

const statusStyles: Record<SubmissionStatus, string> = {
  draft: "border-amber-300/[0.22] bg-amber-300/[0.08] text-amber-100",
  submitted: "border-cyan-300/[0.22] bg-cyan-300/[0.08] text-cyan-100",
  reviewed: "border-emerald-300/[0.22] bg-emerald-300/[0.08] text-emerald-100",
};

export function SubmissionsList() {
  const [items, setItems] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSubmissionsByUser("demo-user")
      .then(setItems)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] px-5 py-6 text-slate-50 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.08),transparent_18%)]" />
      <div className="relative mx-auto max-w-[1420px]">
        <section className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              Dashboard
            </Link>
            <p className="mt-8 text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              AnalystOS Your Work
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
              Your practice task work and feedback state.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/[0.78]">
              Saved work history when configured. The page falls back to local prototype data if Supabase is unavailable.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:w-[520px]">
            <SummaryCard label="Drafts" value={countByStatus(items, "draft")} />
            <SummaryCard label="Submitted" value={countByStatus(items, "submitted")} />
            <SummaryCard label="Reviewed" value={countByStatus(items, "reviewed")} />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {isLoading ? (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-slate-300">
              Loading your work...
            </div>
          ) : null}
          {!isLoading && items.map((submission, index) => {
            const lab = labs.find((item) => item.id === submission.labId);
            return (
              <Reveal key={submission.id} delay={index * 0.05} hover="lift">
                <GlassPanel className="h-full p-6 lg:p-7" glow={submission.status === "reviewed" ? "cyan" : "blue"}>
                  <div className="relative flex h-full flex-col">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.72]">
                        {lab?.skill ?? "Practice task"}
                      </p>
                      <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em] ${statusStyles[submission.status]}`}>
                        {submission.status}
                      </span>
                    </div>
                    <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {lab?.title ?? submission.labId}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      Created {new Date(submission.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <MiniMetric label="Score" value={submission.status === "reviewed" ? `${submission.score}` : "Pending"} />
                      <MiniMetric label="User" value={submission.userId} />
                    </div>

                    <Link
                      href={`/submissions/${submission.id}`}
                      className="mt-7 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                    >
                      View Details
                    </Link>
                  </div>
                </GlassPanel>
              </Reveal>
            );
          })}
        </section>
      </div>
    </main>
  );
}

function countByStatus(items: Submission[], status: SubmissionStatus) {
  return String(items.filter((submission) => submission.status === status).length);
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.035] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
