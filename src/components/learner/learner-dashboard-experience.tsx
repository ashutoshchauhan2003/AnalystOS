import { ActiveLearningPathPanel } from "@/components/learner/active-learning-path-panel";
import { DashboardKpiGrid } from "@/components/learner/dashboard-kpi-grid";
import { DashboardOverview } from "@/components/learner/dashboard-overview";
import { LearnerSidebar } from "@/components/learner/learner-sidebar";
import { LearnerTopUtilityBar } from "@/components/learner/learner-top-utility-bar";
import { RecommendedNextStepPanel } from "@/components/learner/recommended-next-step-panel";
import { TodaysMissionPanel } from "@/components/learner/todays-mission-panel";
import { Reveal } from "@/components/motion/reveal";
import { GlassPanel } from "@/components/shared/glass-panel";
import {
  interviewReadiness,
  labProgress,
  portfolioStatus,
  skillHeatmap,
  weeklyMissions,
} from "@/content/learner-dashboard";

export function LearnerDashboardExperience() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.08),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)] opacity-35" />
      <div className="pointer-events-none absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[130px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[22%] h-64 w-64 rounded-full bg-indigo-400/[0.08] blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-[1660px] gap-6 px-5 py-5 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-7 lg:py-6">
        <LearnerSidebar />

        <div className="min-w-0 space-y-5">
          <LearnerTopUtilityBar />
          <DashboardOverview />
          <DashboardKpiGrid />
          <TodaysMissionPanel />

          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.62fr)_minmax(360px,0.38fr)]">
            <ActiveLearningPathPanel />
            <RecommendedNextStepPanel />
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.58fr)_minmax(360px,0.42fr)]">
            <SkillHeatmapPanel />
            <InterviewReadinessPanel />
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.55fr)_minmax(360px,0.45fr)]">
            <WeeklyMissionsPanel />
            <LabProgressPanel />
          </div>

          <PortfolioStatusPanel />
        </div>
      </div>
    </main>
  );
}

function SkillHeatmapPanel() {
  return (
    <Reveal>
      <GlassPanel className="h-full p-6 lg:p-7" glow="cyan">
        <div className="relative">
          <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Skill Heatmap
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
            Job-ready capability map
          </h2>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {skillHeatmap.map((item) => (
              <div
                key={item.skill}
                className="rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.34] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{item.skill}</p>
                  <span className="text-xs text-cyan-200">{item.level}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,rgba(103,232,249,0.95),rgba(59,130,246,0.72))] shadow-[0_0_16px_rgba(103,232,249,0.22)]"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-500">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function InterviewReadinessPanel() {
  return (
    <Reveal delay={0.08}>
      <GlassPanel className="h-full p-6 lg:p-7" glow="blue">
        <div className="relative">
          <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Interview Readiness
          </p>
          <div className="mt-5 flex items-end gap-5">
            <p className="text-6xl font-semibold leading-none tracking-[-0.06em] text-white">
              {interviewReadiness.score}
            </p>
            <p className="pb-2 text-sm leading-6 text-slate-400">{interviewReadiness.confidence}</p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <ReadinessList title="Strengths" items={interviewReadiness.strengths} />
            <ReadinessList title="Gaps" items={interviewReadiness.gaps} />
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function WeeklyMissionsPanel() {
  return (
    <Reveal>
      <GlassPanel className="h-full p-6 lg:p-7" glow="blue">
        <div className="relative">
          <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Weekly Missions
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
            This sprint in AnalystOS
          </h2>
          <div className="mt-7 space-y-4">
            {weeklyMissions.map((mission) => (
              <div
                key={mission.title}
                className="rounded-[1.3rem] border border-white/[0.08] bg-white/[0.035] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/[0.72]">
                      {mission.week} / {mission.status}
                    </p>
                    <p className="mt-2 text-base font-medium text-white">{mission.title}</p>
                  </div>
                  <span className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
                    {mission.dueLabel}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{mission.focus}</p>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full bg-cyan-300" style={{ width: `${mission.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function LabProgressPanel() {
  return (
    <Reveal delay={0.08}>
      <GlassPanel className="h-full p-6 lg:p-7" glow="cyan">
        <div className="relative">
          <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
            Lab Progress
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
            Practice-to-proof pipeline
          </h2>
          <div className="mt-7 space-y-3">
            {labProgress.map((lab) => (
              <div
                key={lab.title}
                className="rounded-[1.2rem] border border-white/[0.08] bg-slate-950/[0.34] p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-white">{lab.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{lab.type}</p>
                  </div>
                  <span className="text-sm text-cyan-100">{lab.score}%</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-3 py-1 text-xs text-cyan-100">
                    {lab.status}
                  </span>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-xs text-slate-300">
                    {lab.readiness}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function PortfolioStatusPanel() {
  return (
    <Reveal>
      <GlassPanel className="p-6 lg:p-7" glow="cyan">
        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(300px,0.4fr)] xl:items-center">
          <div>
            <div className="mb-6 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
            <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
              Portfolio Status
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {portfolioStatus.headline}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300/[0.76]">
              {portfolioStatus.summary}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {portfolioStatus.artifacts.map((artifact) => (
              <div
                key={artifact.label}
                className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
                  {artifact.label}
                </p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-semibold text-white">{artifact.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{artifact.state}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassPanel>
    </Reveal>
  );
}

function ReadinessList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.035] p-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-sm text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
