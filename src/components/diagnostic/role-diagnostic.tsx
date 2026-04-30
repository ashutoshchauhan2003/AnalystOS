"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { analystPaths, type AnalystPath, type PathId } from "@/content/paths";
import { labs, type Lab } from "@/content/labs";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DiagnosticQuestion = {
  id: string;
  prompt: string;
  options: Array<{
    label: string;
    description: string;
    scores: Record<PathId, number>;
    weakSkillSignals: string[];
  }>;
};

type ResultSummary = {
  path: AnalystPath;
  score: number;
  confidence: string;
  weakSkills: string[];
  suggestedLabs: Lab[];
  nextAction: string;
};

const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "work-style",
    prompt: "Which kind of work sounds most energizing right now?",
    options: [
      {
        label: "Find patterns in data",
        description: "Query tables, compare segments, and explain what changed.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 2 },
        weakSkillSignals: ["SQL joins", "Result interpretation"],
      },
      {
        label: "Clarify messy business needs",
        description: "Turn vague stakeholder asks into useful requirements.",
        scores: { "data-analyst": 1, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Requirements writing", "Stakeholder analysis"],
      },
      {
        label: "Explore models and experiments",
        description: "Use notebooks, features, and hypotheses to guide strategy.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Python", "Experiment framing"],
      },
    ],
  },
  {
    id: "tool-comfort",
    prompt: "Which tool environment feels closest to your current comfort zone?",
    options: [
      {
        label: "SQL and dashboards",
        description: "You like structured data, tables, and visual summaries.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["Dashboard critique", "Cohort analysis"],
      },
      {
        label: "Docs, flows, and stakeholder notes",
        description: "You are comfortable making work clear for teams.",
        scores: { "data-analyst": 0, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Acceptance criteria", "Process mapping"],
      },
      {
        label: "Python notebooks",
        description: "You enjoy exploring data with code and experiments.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Pandas", "Model interpretation"],
      },
    ],
  },
  {
    id: "business-question",
    prompt: "A sales leader says revenue dropped. What do you want to do first?",
    options: [
      {
        label: "Break revenue down by segment",
        description: "Find where the drop is concentrated and quantify it.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["Aggregation", "Revenue analysis"],
      },
      {
        label: "Clarify the decision they need",
        description: "Define the audience, decision, timeline, and constraints.",
        scores: { "data-analyst": 1, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Problem framing", "Scope control"],
      },
      {
        label: "Explore leading indicators",
        description: "Look for behavioral signals that predict the drop.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Feature exploration", "Data quality checks"],
      },
    ],
  },
  {
    id: "deliverable",
    prompt: "Which portfolio artifact would you be proud to show recruiters?",
    options: [
      {
        label: "SQL-backed analytics case study",
        description: "A clean problem, query evidence, charts, and recommendation.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["Insight storytelling", "Executive recommendation"],
      },
      {
        label: "Requirements and workflow pack",
        description: "A business brief with requirements, criteria, and tradeoffs.",
        scores: { "data-analyst": 0, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Functional requirements", "Tradeoff communication"],
      },
      {
        label: "EDA and segmentation notebook",
        description: "A notebook that finds patterns and proposes experiments.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Visualization", "Segmentation"],
      },
    ],
  },
  {
    id: "ambiguity",
    prompt: "How do you prefer to handle ambiguity?",
    options: [
      {
        label: "Reduce it with metrics",
        description: "Cut the problem into measurable slices and compare results.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["Metric hierarchy", "Result validation"],
      },
      {
        label: "Reduce it with questions",
        description: "Identify assumptions, stakeholders, and missing decisions.",
        scores: { "data-analyst": 1, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Open questions", "Stakeholder communication"],
      },
      {
        label: "Reduce it with experiments",
        description: "Form hypotheses, test patterns, and refine the model.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Hypothesis design", "Experiment framing"],
      },
    ],
  },
  {
    id: "debugging",
    prompt: "When something is broken, what do you instinctively inspect?",
    options: [
      {
        label: "The query logic",
        description: "Joins, filters, grouping, and whether the output matches the question.",
        scores: { "data-analyst": 3, "business-analyst": 0, "data-scientist": 2 },
        weakSkillSignals: ["SQL debugging", "Validation discipline"],
      },
      {
        label: "The process handoff",
        description: "Where teams, requirements, or decisions fell out of sync.",
        scores: { "data-analyst": 0, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Process mapping", "Acceptance criteria"],
      },
      {
        label: "The data assumptions",
        description: "Schema drift, missing values, leakage, and feature quality.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Data quality checks", "Feature exploration"],
      },
    ],
  },
  {
    id: "communication",
    prompt: "Which communication style feels most natural?",
    options: [
      {
        label: "Evidence-first readout",
        description: "Show the result, explain the pattern, then recommend action.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["Insight synthesis", "Executive communication"],
      },
      {
        label: "Stakeholder-ready brief",
        description: "Clarify context, decisions, requirements, and next steps.",
        scores: { "data-analyst": 1, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Business communication", "Requirements quality"],
      },
      {
        label: "Experiment narrative",
        description: "Explain what the model suggests and what should be tested next.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Model interpretation", "Experiment design"],
      },
    ],
  },
  {
    id: "learning-goal",
    prompt: "What outcome matters most over the next 60 days?",
    options: [
      {
        label: "Become useful with analytics work",
        description: "Build enough SQL, dashboard, and insight fluency to contribute.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["SQL", "Dashboard critique"],
      },
      {
        label: "Become credible in business teams",
        description: "Show you can shape requirements and improve decision quality.",
        scores: { "data-analyst": 0, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Requirements writing", "Stakeholder analysis"],
      },
      {
        label: "Become stronger with applied data science",
        description: "Build notebook, modeling, and experiment framing confidence.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Python", "Segmentation"],
      },
    ],
  },
  {
    id: "job-signal",
    prompt: "Which hiring signal do you want AnalystOS to strengthen first?",
    options: [
      {
        label: "Analytical execution",
        description: "Clear evidence that you can answer business questions with data.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["Cohort analysis", "Result explanation"],
      },
      {
        label: "Business judgment",
        description: "Clear evidence that you can structure problems and align people.",
        scores: { "data-analyst": 1, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Problem framing", "Stakeholder communication"],
      },
      {
        label: "Technical exploration",
        description: "Clear evidence that you can explore data and propose experiments.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["EDA", "Experiment framing"],
      },
    ],
  },
  {
    id: "feedback-style",
    prompt: "Which kind of feedback would help you improve fastest?",
    options: [
      {
        label: "Query and metric critique",
        description: "You want feedback on logic, segmentation, and whether the answer is useful.",
        scores: { "data-analyst": 3, "business-analyst": 1, "data-scientist": 1 },
        weakSkillSignals: ["SQL", "Metric hierarchy", "Result validation"],
      },
      {
        label: "Scope and stakeholder critique",
        description: "You want feedback on clarity, assumptions, requirements, and handoff quality.",
        scores: { "data-analyst": 0, "business-analyst": 3, "data-scientist": 0 },
        weakSkillSignals: ["Requirements", "Acceptance criteria", "Stakeholder communication"],
      },
      {
        label: "Notebook and experiment critique",
        description: "You want feedback on exploration depth, features, assumptions, and next experiments.",
        scores: { "data-analyst": 1, "business-analyst": 0, "data-scientist": 3 },
        weakSkillSignals: ["Python", "Feature exploration", "Model interpretation"],
      },
    ],
  },
];

const nextActions: Record<PathId, string> = {
  "data-analyst": "Start with the SQL Join Challenge, then publish a short evidence card.",
  "business-analyst": "Start with the BA Requirements Case, then draft acceptance criteria for review.",
  "data-scientist": "Start with the Python EDA Notebook Task, then summarize your first pattern findings.",
};

const pathTone: Record<PathId, string> = {
  "data-analyst": "border-cyan-300/[0.35] bg-cyan-300/10 text-cyan-100",
  "business-analyst": "border-sky-300/[0.32] bg-sky-300/10 text-sky-100",
  "data-scientist": "border-indigo-300/[0.35] bg-indigo-300/10 text-indigo-100",
};

function getInitialScores(): Record<PathId, number> {
  return {
    "data-analyst": 0,
    "business-analyst": 0,
    "data-scientist": 0,
  };
}

function getResult(answers: number[]): ResultSummary {
  const scores = getInitialScores();
  const weakSkillCounts = new Map<string, number>();

  answers.forEach((answerIndex, questionIndex) => {
    const option = diagnosticQuestions[questionIndex]?.options[answerIndex];
    if (!option) return;

    (Object.entries(option.scores) as Array<[PathId, number]>).forEach(([pathId, score]) => {
      scores[pathId] += score;
    });

    option.weakSkillSignals.forEach((skill) => {
      weakSkillCounts.set(skill, (weakSkillCounts.get(skill) ?? 0) + 1);
    });
  });

  const winningPathId = (Object.entries(scores) as Array<[PathId, number]>).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
  const maxScore = diagnosticQuestions.length * 3;
  const winningScore = scores[winningPathId];
  const path = analystPaths.find((item) => item.id === winningPathId) ?? analystPaths[0];
  const confidence =
    winningScore / maxScore >= 0.72 ? "High match" : winningScore / maxScore >= 0.54 ? "Strong signal" : "Exploratory fit";

  const weakSkills = Array.from(weakSkillCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill)
    .filter((skill) => path.skills.some((pathSkill) => pathSkill.toLowerCase().includes(skill.toLowerCase().split(" ")[0])))
    .slice(0, 4);
  const suggestedLabs = labs
    .filter((lab) => path.recommendedLabs.includes(lab.id))
    .slice(0, 3);

  return {
    path,
    score: Math.round((winningScore / maxScore) * 100),
    confidence,
    weakSkills: weakSkills.length > 0 ? weakSkills : path.skills.slice(0, 4),
    suggestedLabs,
    nextAction: nextActions[path.id],
  };
}

export function RoleDiagnostic() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isComplete = answers.length === diagnosticQuestions.length;
  const activeQuestion = diagnosticQuestions[activeIndex];
  const selectedAnswer = answers[activeIndex];
  const progress = Math.round((answers.length / diagnosticQuestions.length) * 100);
  const result = useMemo(() => getResult(answers), [answers]);

  function selectAnswer(optionIndex: number) {
    setAnswers((current) => {
      const next = [...current];
      next[activeIndex] = optionIndex;
      return next;
    });
  }

  function goNext() {
    if (selectedAnswer === undefined) return;
    if (activeIndex < diagnosticQuestions.length - 1) {
      setActiveIndex((current) => current + 1);
    }
  }

  function goBack() {
    setActiveIndex((current) => Math.max(0, current - 1));
  }

  function resetDiagnostic() {
    setAnswers([]);
    setActiveIndex(0);
  }

  if (isComplete) {
    return (
      <ResultCard
        result={result}
        onReset={resetDiagnostic}
      />
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0.032))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl sm:p-7 lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.13),transparent_28%)]" />
        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.32em] text-cyan-200/[0.72]">
                Question {activeIndex + 1} / {diagnosticQuestions.length}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.04em] text-white lg:text-4xl">
                {activeQuestion.prompt}
              </h2>
            </div>
            <div className="rounded-full border border-cyan-300/[0.22] bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
              {progress}% mapped
            </div>
          </div>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(103,232,249,0.35)] transition-all duration-500"
              style={{ width: `${Math.max(progress, 6)}%` }}
            />
          </div>

          <div className="mt-8 grid gap-4">
            {activeQuestion.options.map((option, optionIndex) => {
              const isSelected = selectedAnswer === optionIndex;
              return (
                <motion.button
                  key={option.label}
                  type="button"
                  onClick={() => selectAnswer(optionIndex)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.992 }}
                  className={cn(
                    "group rounded-[1.35rem] border p-4 text-left transition duration-300 sm:p-5",
                    isSelected
                      ? "border-cyan-300/[0.48] bg-cyan-300/[0.12] shadow-[0_0_34px_rgba(103,232,249,0.14),inset_0_1px_0_rgba(255,255,255,0.08)]"
                      : "border-white/[0.08] bg-white/[0.035] hover:border-cyan-300/[0.24] hover:bg-white/[0.055]",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-medium text-white">{option.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{option.description}</p>
                    </div>
                    <span
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 rounded-full border transition",
                        isSelected
                          ? "border-cyan-200 bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.65)]"
                          : "border-white/20 group-hover:border-cyan-300/50",
                      )}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              disabled={activeIndex === 0}
              className="rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-35"
            >
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={selectedAnswer === undefined}
              className="rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
            >
              {activeIndex === diagnosticQuestions.length - 1 ? "Show Result" : "Next Question"}
            </button>
          </div>
        </div>
      </div>

      <aside className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">Live Path Signal</p>
        <div className="mt-5 space-y-3">
          {analystPaths.map((path) => {
            const score = getPathPreviewScore(answers, path.id);
            return (
              <div key={path.id} className="rounded-2xl border border-white/[0.08] bg-slate-950/[0.35] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{path.title}</p>
                  <span className="text-xs text-cyan-200">{score}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-cyan-300 transition-all duration-500"
                    style={{ width: `${Math.min(100, score * 8)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-400">
          Answer honestly. The diagnostic maps preference, working style, and proof goals into a
          recommended AnalystOS path.
        </p>
      </aside>
    </section>
  );
}

function getPathPreviewScore(answers: number[], pathId: PathId) {
  return answers.reduce((score, answerIndex, questionIndex) => {
    const option = diagnosticQuestions[questionIndex]?.options[answerIndex];
    return score + (option?.scores[pathId] ?? 0);
  }, 0);
}

function ResultCard({
  result,
  onReset,
}: {
  result: ResultSummary;
  onReset: () => void;
}) {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.45fr)]">
      <div className="relative overflow-hidden rounded-[30px] border border-cyan-300/[0.22] bg-[linear-gradient(180deg,rgba(103,232,249,0.12),rgba(255,255,255,0.035))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.38),0_0_44px_rgba(103,232,249,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_86%_20%,rgba(99,102,241,0.14),transparent_24%)]" />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.78]">
            Recommended AnalystOS Path
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white lg:text-6xl">
              {result.path.title}
            </h2>
            <span className={cn("rounded-full border px-4 py-2 text-xs uppercase tracking-[0.22em]", pathTone[result.path.id])}>
              {result.confidence}
            </span>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300/[0.82] lg:text-lg">
            {result.path.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <MetricCard label="Match score" value={`${result.score}%`} />
            <MetricCard label="Difficulty" value={result.path.difficulty} />
            <MetricCard label="Duration" value={result.path.estimatedDuration} />
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/[0.08] bg-slate-950/[0.38] p-5">
            <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">
              Portfolio output
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">{result.path.portfolioOutput}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`/paths/${result.path.id}`}
              className="inline-flex items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Start recommended path
            </a>
            <button
              type="button"
              onClick={onReset}
              className="rounded-full border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-300 transition hover:border-cyan-300/30 hover:text-cyan-100"
            >
              Retake Diagnostic
            </button>
          </div>
        </div>
      </div>

      <aside className="grid gap-5">
        <Panel title="Weak skills to strengthen">
          <div className="flex flex-wrap gap-2">
            {result.weakSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Next action">
          <p className="text-sm leading-7 text-slate-300">{result.nextAction}</p>
        </Panel>

        <Panel title="Suggested next labs">
          <div className="space-y-3">
            {result.suggestedLabs.map((lab) => (
              <a
                key={lab.id}
                href={`/labs/${lab.id}`}
                className="block rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition hover:border-cyan-300/[0.28] hover:bg-white/[0.055]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-white">{lab.title}</p>
                  <span className="rounded-full border border-cyan-300/[0.18] bg-cyan-300/[0.08] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                    {lab.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{lab.expectedOutput}</p>
              </a>
            ))}
          </div>
        </Panel>

        <Panel title="First modules">
          <div className="space-y-3">
            {result.path.modules.slice(0, 3).map((module) => (
              <div key={module.id} className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
                <p className="text-sm font-medium text-white">{module.title}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{module.description}</p>
              </div>
            ))}
          </div>
        </Panel>
      </aside>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/[0.08] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">{label}</p>
      <p className="mt-3 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}
