"use client";

import { useMemo, useState } from "react";
import { CandidateCard } from "@/components/employer-directory/candidate-card";
import { FilterPanel } from "@/components/employer-directory/filter-panel";
import { GlassPanel } from "@/components/shared/glass-panel";
import { employerCandidates, employerDirectory } from "@/content/employer-directory";

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

export function EmployerDashboard() {
  const [search, setSearch] = useState("");
  const [activeSkills, setActiveSkills] = useState<string[]>([]);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [activeProjects, setActiveProjects] = useState<string[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);

  const filteredCandidates = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return employerCandidates.filter((candidate) => {
      const searchableText = [
        candidate.name,
        candidate.title,
        candidate.location,
        candidate.featuredProject,
        candidate.projectHighlight,
        ...candidate.skills,
        ...candidate.tools,
        ...candidate.projects,
        ...candidate.badges,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 || searchableText.includes(normalizedSearch);
      const matchesSkills =
        activeSkills.length === 0 ||
        activeSkills.every((skill) => candidate.skills.includes(skill));
      const matchesTools =
        activeTools.length === 0 ||
        activeTools.every((tool) => candidate.tools.includes(tool));
      const matchesProjects =
        activeProjects.length === 0 ||
        activeProjects.some((project) => candidate.projects.includes(project));

      return matchesSearch && matchesSkills && matchesTools && matchesProjects;
    });
  }, [activeProjects, activeSkills, activeTools, search]);

  function clearFilters() {
    setActiveSkills([]);
    setActiveTools([]);
    setActiveProjects([]);
    setSearch("");
  }

  function toggleShortlist(candidateId: string) {
    setShortlistedIds((current) => toggleValue(current, candidateId));
  }

  return (
    <>
      <GlassPanel className="mt-8 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="none">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <label className="min-w-0 flex-1">
            <span className="mb-2 block text-[11px] uppercase tracking-[0.28em] text-slate-500">
              Search Candidates
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={employerDirectory.searchPlaceholder}
              className="w-full rounded-[1.2rem] border border-white/10 bg-slate-950/70 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40 focus:ring-4 focus:ring-cyan-300/10"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-3 xl:w-[460px]">
            {[
              { label: "Matches", value: filteredCandidates.length },
              { label: "Shortlisted", value: shortlistedIds.length },
              { label: "Total", value: employerCandidates.length },
            ].map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1rem] border border-white/[0.08] bg-white/[0.03] px-4 py-3"
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">
                  {metric.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>

      <section className="mt-8 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="xl:sticky xl:top-8 xl:h-fit">
          <FilterPanel
            activeSkills={activeSkills}
            activeTools={activeTools}
            activeProjects={activeProjects}
            onToggleSkill={(value) => setActiveSkills((current) => toggleValue(current, value))}
            onToggleTool={(value) => setActiveTools((current) => toggleValue(current, value))}
            onToggleProject={(value) =>
              setActiveProjects((current) => toggleValue(current, value))
            }
            onClear={clearFilters}
          />
        </div>

        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
                Candidate Grid
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Fast-scan by proof, tools, project relevance, and recruiter signal.
              </p>
            </div>
            <div className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-4 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100">
              {filteredCandidates.length} visible
            </div>
          </div>

          {filteredCandidates.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isShortlisted={shortlistedIds.includes(candidate.id)}
                  onToggleShortlist={toggleShortlist}
                />
              ))}
            </div>
          ) : (
            <GlassPanel className="p-8 text-center" glow="blue">
              <p className="text-lg font-medium text-white">No candidates match this filter set.</p>
              <p className="mt-3 text-sm text-slate-400">
                Clear filters or broaden the search to continue scanning.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full border border-cyan-300/[0.24] bg-cyan-300/10 px-5 py-3 text-xs uppercase tracking-[0.24em] text-cyan-100 transition hover:bg-cyan-300/[0.14]"
              >
                Reset Filters
              </button>
            </GlassPanel>
          )}
        </div>
      </section>
    </>
  );
}
