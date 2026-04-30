"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getJobsFromBackend, type Job, type JobRole } from "@/data/jobs";
import { getPortfolioByUser, type Portfolio } from "@/data/portfolio";
import { getSubmissionsByUser, type Submission } from "@/data/submissions";
import { calculateJobMatch } from "@/lib/matching";
import { cn } from "@/lib/utils";

type RoleFilter = "All" | JobRole;

const roleOptions: RoleFilter[] = ["All", "DA", "BA", "DS"];
const demoUserId = "demo-user";

export function JobMatchBoard() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [portfolio, setPortfolio] = useState<Portfolio>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [jobs, setJobs] = useState<Job[]>([]);
  const locations = useMemo(() => ["All", ...Array.from(new Set(jobs.map((job) => job.location))).sort()], [jobs]);
  const skills = useMemo(
    () => ["All", ...Array.from(new Set(jobs.flatMap((job) => job.requiredSkills))).sort()],
    [jobs],
  );

  useEffect(() => {
    Promise.all([
      getJobsFromBackend(),
      getPortfolioByUser(demoUserId),
      getSubmissionsByUser(demoUserId),
    ]).then(([jobData, portfolioData, submissionData]) => {
      setJobs(jobData);
      setPortfolio(portfolioData);
      setSubmissions(submissionData);
    }).finally(() => setIsLoading(false));
  }, []);

  const matchedJobs = useMemo(() => {
    const activePortfolio =
      portfolio ??
      ({
        userId: demoUserId,
        name: "Demo Analyst",
        headline: "",
        role: "",
        bio: "",
        skills: [],
        projects: [],
        published: false,
        createdAt: new Date().toISOString(),
      } satisfies Portfolio);

    return jobs
      .map((job) => ({
        job,
        match: calculateJobMatch({ job, portfolio: activePortfolio, submissions }),
      }))
      .filter(({ job }) => {
        const roleMatch = roleFilter === "All" || job.role === roleFilter;
        const locationMatch = locationFilter === "All" || job.location === locationFilter;
        const skillMatch = skillFilter === "All" || job.requiredSkills.includes(skillFilter);
        const searchMatch = job.title.toLowerCase().includes(search.toLowerCase().trim());

        return roleMatch && locationMatch && skillMatch && searchMatch;
      });
  }, [jobs, locationFilter, portfolio, roleFilter, search, skillFilter, submissions]);

  const averageScore = Math.round(
    matchedJobs.reduce((sum, item) => sum + item.match.matchScore, 0) /
      Math.max(matchedJobs.length, 1),
  );

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:p-6">
        <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr_1fr_1fr]">
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
              Search
            </p>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search job title"
              className="w-full rounded-full border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.4]"
            />
          </div>
          <FilterGroup label="Role" options={roleOptions} value={roleFilter} onChange={setRoleFilter} />
          <FilterGroup label="Location" options={locations} value={locationFilter} onChange={setLocationFilter} />
          <FilterGroup label="Skill" options={skills} value={skillFilter} onChange={setSkillFilter} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span>
            Showing <span className="text-cyan-100">{matchedJobs.length}</span> of{" "}
            <span className="text-cyan-100">{jobs.length}</span> jobs
          </span>
          <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-3 py-1 text-cyan-100">
            Avg match {averageScore}%
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            setRoleFilter("All");
            setLocationFilter("All");
            setSkillFilter("All");
            setSearch("");
          }}
          className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/[0.3] hover:text-cyan-100"
        >
          Reset filters
        </button>
      </div>

      {isLoading ? (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          Loading job matches...
        </div>
      ) : matchedJobs.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {matchedJobs.map((item, index) => (
            <JobCard key={item.job.id} job={item.job} match={item.match} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <p className="text-xl font-medium text-white">No jobs match this filter set.</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Try broadening the role, location, skill, or title search to see more mock AnalystOS jobs.
          </p>
        </div>
      )}
    </section>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">{label}</p>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-full border border-white/[0.1] bg-slate-950/[0.54] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/[0.4]"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-slate-950">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function JobCard({
  job,
  match,
  index,
}: {
  job: Job;
  match: ReturnType<typeof calculateJobMatch>;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4, scale: 1.006 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.48, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.078),rgba(255,255,255,0.03))] p-6 shadow-[0_18px_56px_rgba(5,10,20,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.13),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-cyan-300/[0.38]" />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">{job.role}</p>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]",
              match.matchScore >= 80
                ? "border-emerald-300/[0.22] bg-emerald-300/[0.08] text-emerald-100"
                : "border-amber-300/[0.22] bg-amber-300/[0.08] text-amber-100",
            )}
          >
            Match Score: {match.matchScore}%
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white">{job.title}</h2>
        <p className="mt-2 text-sm font-medium text-cyan-100">{job.company}</p>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-300/[0.78]">{job.description}</p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <MiniMetric label="Location" value={job.location} />
          <MiniMetric label="Salary" value={job.salaryRange} />
        </div>

        <SkillCloud title="Required skills" skills={job.requiredSkills} tone="cyan" />

        <div className="mt-5 rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">Missing Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {match.missingSkills.length ? (
              match.missingSkills.map((skill) => (
                <span key={skill} className="rounded-full border border-amber-300/[0.18] bg-amber-300/[0.08] px-3 py-1.5 text-xs text-amber-100">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-sm text-emerald-100">Core skills covered.</span>
            )}
          </div>
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">Recommended Labs</p>
          <ul className="mt-3 space-y-2">
            {(match.recommendedLabs.length ? match.recommendedLabs : []).map((lab) => (
              <li key={lab.id}>
                <Link href={`/labs/${lab.id}`} className="text-sm leading-6 text-slate-300 transition hover:text-cyan-100">
                  {lab.title}
                </Link>
              </li>
            ))}
            {!match.recommendedLabs.length ? (
              <li className="text-sm leading-6 text-slate-300">Keep polishing portfolio projects before applying.</li>
            ) : null}
          </ul>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="mt-7 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
        >
          View Details
        </Link>
      </div>
    </motion.article>
  );
}

function SkillCloud({ title, skills, tone }: { title: string; skills: string[]; tone: "cyan" }) {
  return (
    <div className="mt-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs",
              tone === "cyan" && "border-cyan-300/[0.14] bg-cyan-300/[0.07] text-cyan-100",
            )}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-white/[0.08] bg-white/[0.035] p-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-medium leading-5 text-white">{value}</p>
    </div>
  );
}
