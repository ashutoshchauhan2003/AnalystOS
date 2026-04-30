"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type SubmissionState = "not-started" | "started" | "draft-saved" | "submitted";

export function LabSubmissionPanel() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("not-started");
  const [workNotes, setWorkNotes] = useState("");
  const [artifactLink, setArtifactLink] = useState("");

  const stateCopy: Record<SubmissionState, string> = {
    "not-started": "Ready to begin. Start the lab when you want to open this work item.",
    started: "Lab started. Add notes, links, or draft evidence as you work.",
    "draft-saved": "Draft saved locally for this demo session.",
    submitted: "Submitted locally. In production this would enter the review queue.",
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-cyan-300/[0.18] bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(255,255,255,0.035))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl lg:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%)]" />
      <div className="relative">
        <div className="mb-5 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/[0.72]">
          Submission Area
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
          Local lab submission
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-300/[0.78]">{stateCopy[submissionState]}</p>

        <label className="mt-6 block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-slate-500">
            Work notes
          </span>
          <textarea
            value={workNotes}
            onChange={(event) => setWorkNotes(event.target.value)}
            placeholder="Summarize your approach, evidence, blocker, or final recommendation..."
            className="min-h-36 w-full resize-y rounded-[1.2rem] border border-white/[0.1] bg-slate-950/[0.55] px-4 py-4 text-sm leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.45] focus:ring-4 focus:ring-cyan-300/10"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-slate-500">
            Artifact link
          </span>
          <input
            value={artifactLink}
            onChange={(event) => setArtifactLink(event.target.value)}
            placeholder="Paste a notebook, dashboard, doc, or portfolio draft link"
            className="w-full rounded-[1.2rem] border border-white/[0.1] bg-slate-950/[0.55] px-4 py-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.45] focus:ring-4 focus:ring-cyan-300/10"
          />
        </label>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => setSubmissionState("started")}
            className={buttonClass("primary")}
          >
            Start
          </button>
          <button
            type="button"
            onClick={() => setSubmissionState("draft-saved")}
            className={buttonClass("secondary")}
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => setSubmissionState("submitted")}
            className={buttonClass("primary")}
          >
            Submit
          </button>
        </div>

        <div className="mt-5 rounded-[1.15rem] border border-white/[0.08] bg-slate-950/[0.4] px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Current state</p>
          <p className="mt-2 text-sm font-medium text-cyan-100">{submissionState.replace("-", " ")}</p>
        </div>
      </div>
    </div>
  );
}

function buttonClass(variant: "primary" | "secondary") {
  return cn(
    "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" &&
      "border-cyan-300/[0.55] bg-cyan-300 text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] hover:-translate-y-0.5 hover:bg-cyan-200",
    variant === "secondary" &&
      "border-white/[0.12] bg-white/[0.05] text-slate-200 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:text-cyan-100",
  );
}

