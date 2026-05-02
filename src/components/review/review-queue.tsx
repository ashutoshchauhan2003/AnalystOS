"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs } from "@/content/labs";
import { getSubmissionsByUser, type Submission } from "@/data/submissions";

export function ReviewQueue() {
  const [items, setItems] = useState<Submission[]>([]);

  useEffect(() => {
    getSubmissionsByUser("demo-user").then((submissions) =>
      setItems(submissions.filter((item) => item.status === "submitted")),
    );
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] px-5 py-6 text-slate-50 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(34,211,238,0.14),transparent_24%),radial-gradient(circle_at_86%_16%,rgba(99,102,241,0.1),transparent_20%)]" />
      <div className="relative mx-auto max-w-[1240px]">
        <section className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/[0.3] hover:text-cyan-100"
          >
            Dashboard
          </Link>
          <p className="mt-8 text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Prototype Feedback Queue
          </p>
          <h1 className="mt-4 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
            Submitted work waiting for feedback.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300/[0.78]">
            Supabase-backed feedback queue when configured, with local prototype data as a fallback.
          </p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          {items.map((submission) => {
            const lab = labs.find((item) => item.id === submission.labId);
            return (
              <GlassPanel key={submission.id} className="p-6" glow="cyan">
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
                      {lab?.skill ?? "Work item"}
                    </p>
                    <span className="rounded-full border border-cyan-300/[0.22] bg-cyan-300/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100">
                      submitted
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {lab?.title ?? submission.labId}
                  </h2>
                  <p className="mt-3 text-sm text-slate-400">
                    User {submission.userId} / {new Date(submission.createdAt).toLocaleDateString("en-US")}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300">
                    {submission.insightNote}
                  </p>
                  <Link
                    href={`/review/${submission.id}`}
                    className="mt-7 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
                  >
                    Give Feedback
                  </Link>
                </div>
              </GlassPanel>
            );
          })}
        </section>
      </div>
    </main>
  );
}
