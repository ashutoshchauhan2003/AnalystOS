"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs } from "@/content/labs";
import { getPortfolioByUser, type Portfolio } from "@/data/portfolio";
import { getSubmissionsByUser, type Submission } from "@/data/submissions";

export function PublicPortfolio({ userId }: { userId: string }) {
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPortfolioByUser(userId), getSubmissionsByUser(userId)]).then(
      ([portfolioData, submissionData]) => {
        setPortfolio(portfolioData);
        setSubmissions(submissionData);
      },
    ).finally(() => setIsLoading(false));
  }, [userId]);

  const projects = useMemo(() => {
    if (!portfolio) {
      return [];
    }

    return portfolio.projects
      .map((projectId) => submissions.find((submission) => submission.id === projectId))
      .filter((submission): submission is Submission => Boolean(submission));
  }, [portfolio, submissions]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <p className="text-sm text-slate-300">Loading public portfolio...</p>
      </main>
    );
  }

  if (!portfolio) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <p className="text-sm text-slate-300">
          Portfolio not found. Check Supabase configuration or publish the demo portfolio first.
        </p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] px-5 py-8 text-slate-50 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(99,102,241,0.12),transparent_24%),linear-gradient(180deg,#07111d_0%,#050a14_48%,#03060d_100%)]" />
      <div className="relative mx-auto max-w-[1320px]">
        <section className="grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_360px] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              AnalystOS Recruiter Portfolio
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
              {portfolio.name}
            </h1>
            <p className="mt-4 text-xl text-cyan-100">{portfolio.headline}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500">{portfolio.role}</p>
          </div>
          <GlassPanel className="p-5" glow="cyan">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
              Recruiter Snapshot
            </p>
            <div className="mt-5 grid gap-3">
              <SnapshotMetric label="Reviewed projects" value={String(projects.length)} />
              <SnapshotMetric
                label="Average score"
                value={
                  projects.length
                    ? String(Math.round(projects.reduce((sum, item) => sum + item.score, 0) / projects.length))
                    : "N/A"
                }
              />
              <SnapshotMetric label="Public status" value={portfolio.published ? "Live" : "Draft"} />
            </div>
          </GlassPanel>
        </section>

        <section className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,0.66fr)_minmax(340px,0.34fr)]">
          <div className="space-y-5">
            <PublicPanel eyebrow="Projects" title="Proof of analyst work">
              <div className="grid gap-4 lg:grid-cols-2">
                {projects.map((submission) => {
                  const lab = labs.find((item) => item.id === submission.labId);
                  return (
                    <Link
                      key={submission.id}
                      href={`/submissions/${submission.id}`}
                      className="rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.36] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/[0.22]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">
                          Score {submission.score}
                        </p>
                        <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                          Reviewed
                        </span>
                      </div>
                      <h2 className="mt-4 text-lg font-medium text-white">{lab?.title ?? submission.labId}</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        <span className="text-slate-200">Problem solved:</span>{" "}
                        {lab?.brief ?? "Completed an AnalystOS practice challenge with reviewed evidence."}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        <span className="text-cyan-100">Insight:</span> {submission.insightNote}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        <span className="text-cyan-100">Recommendation:</span> {submission.recommendation}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </PublicPanel>

            <PublicPanel eyebrow="About" title="Candidate context">
              <p className="max-w-3xl text-sm leading-7 text-slate-300">{portfolio.bio}</p>
            </PublicPanel>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-8 xl:self-start">
            <PublicPanel eyebrow="Skills" title="Readable signals">
              <div className="flex flex-wrap gap-2">
                {portfolio.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-cyan-300/[0.14] bg-cyan-300/[0.07] px-3 py-2 text-xs text-cyan-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </PublicPanel>
            <PublicPanel eyebrow="CTA" title="Contact / Hire">
              <p className="text-sm leading-7 text-slate-300">
                This mock portfolio demonstrates the proof surface AnalystOS will expose to recruiters.
              </p>
              <a
                href="mailto:demo@example.com"
                className="mt-5 inline-flex w-full justify-center rounded-full border border-cyan-300/[0.45] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Contact / Hire
              </a>
            </PublicPanel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function PublicPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <GlassPanel className="p-6 lg:p-7" glow="cyan">
        <div className="relative">
          <div className="mb-5 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">{eyebrow}</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
          <div className="mt-5">{children}</div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function SnapshotMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.035] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
