"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { labs } from "@/content/labs";
import { getPortfolioByUser, type Portfolio } from "@/data/portfolio";
import { getSubmissionsByUser, type Submission } from "@/data/submissions";

export function RecruiterMarketplace() {
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPortfolioByUser("demo-user"), getSubmissionsByUser("demo-user")]).then(
      ([portfolioData, submissionData]) => {
        setPortfolio(portfolioData);
        setSubmissions(submissionData);
      },
    ).finally(() => setIsLoading(false));
  }, []);

  const topProject = useMemo(() => {
    if (!portfolio) {
      return undefined;
    }

    const selected = submissions
      .filter((submission) => portfolio.projects.includes(submission.id))
      .sort((a, b) => b.score - a.score);

    return selected[0];
  }, [portfolio, submissions]);

  if (isLoading) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-slate-300">
        Loading recruiter portfolio feed...
      </section>
    );
  }

  if (!portfolio) {
    return (
      <section className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-slate-300">
        No published portfolios are available yet. Check Supabase configuration or publish a demo portfolio.
      </section>
    );
  }

  const topLab = topProject ? labs.find((lab) => lab.id === topProject.labId) : undefined;

  return (
    <section className="grid gap-5 lg:grid-cols-2">
      <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_56px_rgba(5,10,20,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.13),transparent_28%)]" />
        <div className="relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
              {portfolio.published ? "Published Portfolio" : "Prototype Portfolio"}
            </p>
            <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100">
              Local data
            </span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-white">{portfolio.name}</h2>
          <p className="mt-2 text-sm font-medium text-cyan-100">{portfolio.role}</p>
          <p className="mt-4 text-sm leading-7 text-slate-300">{portfolio.headline}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {portfolio.skills.slice(0, 8).map((skill) => (
              <span key={skill} className="rounded-full border border-cyan-300/[0.14] bg-cyan-300/[0.07] px-3 py-1.5 text-xs text-cyan-100">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Top Project</p>
            <p className="mt-3 text-base font-medium text-white">{topLab?.title ?? "Reviewed project pending"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {topProject?.insightNote ?? "Publish reviewed work in the portfolio builder to strengthen this recruiter card."}
            </p>
          </div>

          <Link
            href="/u/demo-user"
            className="mt-7 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            View Profile
          </Link>
        </div>
      </article>
    </section>
  );
}
