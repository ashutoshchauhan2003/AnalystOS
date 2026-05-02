"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { labs, type Lab, type LabDifficulty, type PathTrack } from "@/content/labs";
import { cn } from "@/lib/utils";
import {
  getLockedReason,
  isLabUnlocked,
  labRewards,
  readProgression,
  type ProgressionState,
} from "@/data/progression";

type RoleFilter = "All" | PathTrack;
type SkillFilter =
  | "All"
  | "SQL"
  | "Python"
  | "Excel"
  | "Power BI"
  | "Requirements"
  | "Communication";
type DifficultyFilter = "All" | LabDifficulty;

const roleOptions: RoleFilter[] = ["All", "Data Analyst", "Business Analyst", "Data Scientist"];
const skillOptions: SkillFilter[] = [
  "All",
  "SQL",
  "Python",
  "Excel",
  "Power BI",
  "Requirements",
  "Communication",
];
const difficultyOptions: DifficultyFilter[] = ["All", "Beginner", "Intermediate", "Advanced"];

const skillMatchers: Record<Exclude<SkillFilter, "All">, string[]> = {
  SQL: ["sql"],
  Python: ["python", "pandas", "eda", "notebook"],
  Excel: ["excel", "spreadsheet", "cleaning"],
  "Power BI": ["power bi", "dashboard", "bi"],
  Requirements: ["requirements", "acceptance criteria", "scope", "user stories"],
  Communication: ["communication", "storytelling", "executive", "stakeholder", "readout"],
};

export function LabsCatalog() {
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("All");
  const [skillFilter, setSkillFilter] = useState<SkillFilter>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [progression, setProgression] = useState<ProgressionState | null>(null);

  useEffect(() => {
    setProgression(readProgression());
  }, []);

  const filteredLabs = useMemo(
    () =>
      labs.filter((lab) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const roleMatch = roleFilter === "All" || lab.role.includes(roleFilter);
        const skillMatch =
          skillFilter === "All" ||
          lab.skill === skillFilter ||
          lab.skills.some((skill) =>
            skillMatchers[skillFilter].some((matcher) =>
              skill.toLowerCase().includes(matcher),
            ),
          ) ||
          lab.title.toLowerCase().includes(skillFilter.toLowerCase()) ||
          lab.brief.toLowerCase().includes(skillFilter.toLowerCase());
        const difficultyMatch =
          difficultyFilter === "All" || lab.difficulty === difficultyFilter;
        const searchMatch =
          normalizedSearch.length === 0 ||
          lab.title.toLowerCase().includes(normalizedSearch);

        return roleMatch && skillMatch && difficultyMatch && searchMatch;
      }),
    [difficultyFilter, roleFilter, searchTerm, skillFilter],
  );

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:p-6">
        <label className="block">
          <span className="mb-3 block text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
            Search by task title
          </span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search tables, dashboards, clear steps, notebooks..."
            className="w-full rounded-[1.15rem] border border-white/[0.1] bg-slate-950/[0.62] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.42] focus:ring-4 focus:ring-cyan-300/[0.08]"
          />
        </label>

        <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_1fr_0.9fr]">
          <FilterGroup
            label="Role"
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
          />
          <FilterGroup
            label="Skill"
            options={skillOptions}
            value={skillFilter}
            onChange={setSkillFilter}
          />
          <FilterGroup
            label="Difficulty"
            options={difficultyOptions}
            value={difficultyFilter}
            onChange={setDifficultyFilter}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-400">
          Showing <span className="text-cyan-100">{filteredLabs.length}</span> of{" "}
          <span className="text-cyan-100">{labs.length}</span> AnalystOS missions
        </p>
        <button
          type="button"
          onClick={() => {
            setRoleFilter("All");
            setSkillFilter("All");
            setDifficultyFilter("All");
            setSearchTerm("");
          }}
          className="rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/[0.3] hover:text-cyan-100"
        >
          Reset filters
        </button>
      </div>

      {filteredLabs.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredLabs.map((lab, index) => (
            <LabCard key={lab.id} lab={lab} index={index} progression={progression} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <p className="text-xl font-medium text-white">No practice tasks match this search.</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Try broadening the title search, role, skill, or difficulty filter.
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
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] transition",
              value === option
                ? "border-cyan-300/[0.5] bg-cyan-300 text-slate-950 shadow-[0_0_24px_rgba(103,232,249,0.16)]"
                : "border-white/[0.1] bg-white/[0.035] text-slate-300 hover:border-cyan-300/[0.28] hover:text-cyan-100",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function LabCard({
  lab,
  index,
  progression,
}: {
  lab: Lab;
  index: number;
  progression: ProgressionState | null;
}) {
  const unlocked = progression ? isLabUnlocked(lab, progression) : true;
  const lockedReason = progression ? getLockedReason(lab, progression) : "";

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
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
            {lab.skill}
          </p>
          <span
            className={cn(
              "rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]",
              unlocked
                ? "border-cyan-300/[0.22] bg-cyan-300/10 text-cyan-100"
                : "border-amber-300/[0.2] bg-amber-300/[0.08] text-amber-100",
            )}
          >
            {unlocked ? lab.difficulty : "Locked"}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-semibold tracking-[-0.035em] text-white">
          {lab.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-300/[0.78]">{lab.brief}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {lab.role.map((role) => (
            <span
              key={role}
              className="rounded-full border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
            >
              {role}
            </span>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <MiniMetric label="Mission time" value={lab.estimatedTime} />
          <MiniMetric label="Reward" value={`+${labRewards[lab.id]} XP`} />
        </div>

        <div className="mt-6 rounded-[1.25rem] border border-white/[0.08] bg-slate-950/[0.36] p-4">
          <p className="text-[10px] uppercase tracking-[0.24em] text-cyan-200/[0.72]">
            Mission objective
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            {unlocked ? lab.expectedOutput : lockedReason}
          </p>
        </div>

        {unlocked ? (
          <Link
            href={`/labs/${lab.id}`}
            className="mt-7 inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            Accept Mission
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-7 inline-flex cursor-not-allowed items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
          >
            Mission Locked
          </button>
        )}
      </div>
    </motion.article>
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
