import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PremiumFooter } from "@/components/layout/premium-footer";
import { PremiumNavbar } from "@/components/navigation/premium-navbar";
import { Container } from "@/components/shared/container";
import { getJobs } from "@/data/jobs";
import { mockPortfolio } from "@/data/portfolio";
import { mockSubmissions } from "@/data/submissions";
import { calculateJobMatch } from "@/lib/matching";

export function generateStaticParams() {
  return getJobs().map((job) => ({ jobId: job.id }));
}

export function generateMetadata({ params }: { params: { jobId: string } }): Metadata {
  const job = getJobs().find((item) => item.id === params.jobId);

  if (!job) {
    return {
      title: "Job Not Found",
    };
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description,
    alternates: {
      canonical: `/jobs/${job.id}`,
    },
  };
}

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  const job = getJobs().find((item) => item.id === params.jobId);

  if (!job) {
    notFound();
  }

  const match = calculateJobMatch({
    job,
    portfolio: mockPortfolio,
    submissions: mockSubmissions,
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(34,211,238,0.15),transparent_28%),radial-gradient(circle_at_84%_14%,rgba(99,102,241,0.13),transparent_24%),linear-gradient(180deg,#07111d_0%,#050a14_48%,#03060d_100%)]" />
      <PremiumNavbar />

      <Container className="relative pb-24 pt-14 lg:pb-28 lg:pt-20">
        <Link
          href="/jobs"
          className="inline-flex rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
        >
          Back to Jobs
        </Link>

        <section className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_360px] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              {job.role} / {job.difficulty}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
              {job.title}
            </h1>
            <p className="mt-4 text-lg text-cyan-100">
              {job.company} / {job.location}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300/[0.78]">
              {job.description}
            </p>
          </div>

          <aside className="rounded-[28px] border border-cyan-300/[0.18] bg-cyan-300/[0.07] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-100">Match Score</p>
            <p className="mt-4 text-6xl font-semibold tracking-[-0.06em] text-white">
              {match.matchScore}%
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Based on demo-user skills and selected portfolio projects.
            </p>
            <a
              href="mailto:jobs@example.com"
              className="mt-6 inline-flex w-full justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Apply
            </a>
          </aside>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.62fr)_minmax(340px,0.38fr)]">
          <div className="space-y-5">
            <DetailPanel eyebrow="Job Description" title="What this role needs">
              <p className="text-sm leading-7 text-slate-300">{job.description}</p>
            </DetailPanel>
            <DetailPanel eyebrow="Role Expectations" title="How success will be judged">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  "Turn ambiguous business questions into useful analysis.",
                  "Create evidence-backed recommendations with clear tradeoffs.",
                  "Communicate work in a way hiring managers and stakeholders can inspect quickly.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.15rem] border border-white/[0.08] bg-white/[0.035] p-4">
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </DetailPanel>
          </div>

          <aside className="space-y-5">
            <DetailPanel eyebrow="Required Skills" title="Match checklist">
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <span key={skill} className="rounded-full border border-cyan-300/[0.14] bg-cyan-300/[0.07] px-3 py-2 text-xs text-cyan-100">
                    {skill}
                  </span>
                ))}
              </div>
            </DetailPanel>
            <DetailPanel eyebrow="Salary Range" title={job.salaryRange}>
              <p className="text-sm leading-7 text-slate-300">
                Local mock salary range for product simulation. Final compensation would depend on employer scope.
              </p>
            </DetailPanel>
            <DetailPanel eyebrow="Readiness Gaps" title="Improve before applying">
              <div className="space-y-2">
                {match.missingSkills.length ? (
                  match.missingSkills.map((skill) => (
                    <p key={skill} className="rounded-[1rem] border border-amber-300/[0.16] bg-amber-300/[0.07] p-3 text-sm text-amber-100">
                      {skill}
                    </p>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-emerald-100">Core skills are covered by the current portfolio.</p>
                )}
              </div>
            </DetailPanel>
          </aside>
        </section>
      </Container>

      <PremiumFooter />
    </main>
  );
}

function DetailPanel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_56px_rgba(5,10,20,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
      <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">{eyebrow}</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
