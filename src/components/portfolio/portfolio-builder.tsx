"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import { labs } from "@/content/labs";
import { analystPaths } from "@/content/paths";
import { getPortfolioByUser, updatePortfolio, type Portfolio } from "@/data/portfolio";
import { getSubmissionsByUser, type Submission } from "@/data/submissions";

const demoUserId = "demo-user";

export function PortfolioBuilder() {
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [reviewedSubmissions, setReviewedSubmissions] = useState<Submission[]>([]);
  const skillOptions = useMemo(
    () => Array.from(new Set(analystPaths.flatMap((path) => path.skills))).sort(),
    [],
  );

  useEffect(() => {
    Promise.all([getPortfolioByUser(demoUserId), getSubmissionsByUser(demoUserId)]).then(
      ([portfolioData, submissions]) => {
        setPortfolio(portfolioData);
        setReviewedSubmissions(
          submissions.filter((submission) => submission.status === "reviewed"),
        );
      },
    );
  }, []);

  if (!portfolio) {
    return (
      <main className="min-h-screen bg-[#03060d] px-6 py-12 text-slate-50">
        <p className="text-sm text-slate-300">Loading portfolio builder...</p>
      </main>
    );
  }

  const savePortfolio = async (data: Partial<Portfolio>) => {
    const next = await updatePortfolio({ ...data, userId: demoUserId });
    setPortfolio(next);
  };

  const toggleSkill = (skill: string) => {
    const nextSkills = portfolio.skills.includes(skill)
      ? portfolio.skills.filter((item) => item !== skill)
      : [...portfolio.skills, skill];

    void savePortfolio({ skills: nextSkills });
  };

  const toggleProject = (submissionId: string) => {
    const nextProjects = portfolio.projects.includes(submissionId)
      ? portfolio.projects.filter((item) => item !== submissionId)
      : [...portfolio.projects, submissionId];

    void savePortfolio({ projects: nextProjects });
  };

  const selectedProjects = reviewedSubmissions.filter((submission) =>
    portfolio.projects.includes(submission.id),
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] px-5 py-6 text-slate-50 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.08),transparent_18%)]" />
      <div className="relative mx-auto max-w-[1460px]">
        <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_360px] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              AnalystOS Your Proof
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white lg:text-7xl">
              Turn feedback-approved practice work into clear proof.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/[0.78]">
              Curate your profile, skills, and reviewed tasks into a public proof page.
              Supabase persistence is used when configured, with local fallback for demo feedback.
            </p>
          </div>
          <GlassPanel className="p-5" glow="cyan">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
              Publish State
            </p>
            <p className="mt-4 text-4xl font-semibold capitalize tracking-[-0.05em] text-white">
              {portfolio.published ? "Published" : "Draft"}
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Public route: <span className="text-cyan-100">/u/demo-user</span>
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => void savePortfolio({ published: true })}
                className="rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
              >
                Publish Your Proof
              </button>
              {portfolio.published ? (
                <Link
                  href="/u/demo-user"
                  className="rounded-full border border-white/[0.12] bg-white/[0.05] px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:text-cyan-100"
                >
                  View Public Link
                </Link>
              ) : null}
            </div>
          </GlassPanel>
        </section>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,0.62fr)_minmax(360px,0.38fr)]">
          <div className="space-y-5">
            <BuilderPanel eyebrow="Profile Section" title="Recruiter-facing identity">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name">
                  <input
                    value={portfolio.name}
                    onChange={(event) => void savePortfolio({ name: event.target.value })}
                    className="w-full rounded-[1rem] border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.4]"
                  />
                </Field>
                <Field label="Headline">
                  <input
                    value={portfolio.headline}
                    onChange={(event) => void savePortfolio({ headline: event.target.value })}
                    className="w-full rounded-[1rem] border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.4]"
                  />
                </Field>
                <Field label="Role">
                  <input
                    value={portfolio.role}
                    onChange={(event) => void savePortfolio({ role: event.target.value })}
                    className="w-full rounded-[1rem] border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.4]"
                  />
                </Field>
                <Field label="Created">
                  <input
                    value={new Date(portfolio.createdAt).toLocaleDateString("en-US")}
                    readOnly
                    className="w-full rounded-[1rem] border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm text-white opacity-70 outline-none transition"
                  />
                </Field>
              </div>
              <Field label="Bio" className="mt-4">
                <textarea
                  value={portfolio.bio}
                  onChange={(event) => void savePortfolio({ bio: event.target.value })}
                  rows={5}
                  className="w-full resize-none rounded-[1rem] border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.4]"
                />
              </Field>
            </BuilderPanel>

            <BuilderPanel eyebrow="Skills Section" title="Select visible skills">
              <div className="flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const selected = portfolio.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-full border px-3 py-2 text-xs transition ${
                        selected
                          ? "border-cyan-300/[0.42] bg-cyan-300/[0.16] text-cyan-50"
                          : "border-white/[0.08] bg-white/[0.035] text-slate-400 hover:border-cyan-300/[0.2] hover:text-cyan-100"
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </BuilderPanel>

            <BuilderPanel eyebrow="Work Section" title="Feedback-approved work eligible for Your Proof">
              <div className="space-y-3">
                {reviewedSubmissions.map((submission) => {
                  const lab = labs.find((item) => item.id === submission.labId);
                  return (
                    <label
                      key={submission.id}
                      className="flex cursor-pointer flex-col gap-4 rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4 transition hover:border-cyan-300/[0.2] md:flex-row md:items-start"
                    >
                      <input
                        type="checkbox"
                        checked={portfolio.projects.includes(submission.id)}
                        onChange={() => toggleProject(submission.id)}
                        className="mt-1 h-4 w-4 accent-cyan-300"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-medium text-white">{lab?.title ?? submission.labId}</h3>
                          <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-100">
                            Score {submission.score}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                          {submission.reviewerFeedback || "Feedback-approved work ready for your proof page."}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </BuilderPanel>
          </div>

          <aside className="space-y-5 xl:sticky xl:top-8 xl:self-start">
            <BuilderPanel eyebrow="Preview Section" title="Live proof card">
              <div className="rounded-[1.35rem] border border-cyan-300/[0.16] bg-slate-950/[0.58] p-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                  {portfolio.role}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
                  {portfolio.name}
                </h2>
                <p className="mt-2 text-base text-cyan-100">{portfolio.headline}</p>
                <p className="mt-5 text-sm leading-7 text-slate-300">{portfolio.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {portfolio.skills.slice(0, 8).map((skill) => (
                    <span key={skill} className="rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <MiniMetric label="Selected projects" value={String(selectedProjects.length)} />
                  <MiniMetric label="Publish state" value={portfolio.published ? "Live" : "Draft"} />
                </div>
              </div>
            </BuilderPanel>

            <BuilderPanel eyebrow="Public Link" title="Proof page preview">
              <p className="text-sm leading-7 text-slate-300">
                Publishing makes Your Proof visible at the public demo route.
              </p>
              <Link
                href="/u/demo-user"
                className="mt-5 inline-flex w-full justify-center rounded-full border border-cyan-300/[0.4] bg-cyan-300/[0.12] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-50 transition hover:border-cyan-200 hover:bg-cyan-300/[0.18]"
              >
                Open /u/demo-user
              </Link>
            </BuilderPanel>
          </aside>
        </section>
      </div>
    </main>
  );
}

function BuilderPanel({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
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

function Field({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.05rem] border border-white/[0.08] bg-white/[0.035] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
