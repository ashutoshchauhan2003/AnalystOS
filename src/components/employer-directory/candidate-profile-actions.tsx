"use client";

import { useState } from "react";
import { GlowButton } from "@/components/shared/glow-button";

type CandidateProfileActionsProps = {
  contactHref: string;
  caseStudyHref: string;
};

export function CandidateProfileActions({
  contactHref,
  caseStudyHref,
}: CandidateProfileActionsProps) {
  const [isShortlisted, setIsShortlisted] = useState(false);

  return (
    <div className="mt-6 grid gap-3">
      <GlowButton href={contactHref}>Contact Candidate</GlowButton>
      <button
        type="button"
        onClick={() => setIsShortlisted((current) => !current)}
        className={[
          "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium uppercase tracking-[0.22em] transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050913]",
          isShortlisted
            ? "border-cyan-300/40 bg-cyan-300/[0.12] text-cyan-100 shadow-[0_0_26px_rgba(103,232,249,0.14)]"
            : "border-white/[0.12] bg-white/[0.06] text-slate-100 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/10",
        ].join(" ")}
      >
        {isShortlisted ? "Shortlisted" : "Shortlist Candidate"}
      </button>
      <GlowButton href={caseStudyHref} variant="secondary">
        View Featured Case
      </GlowButton>
    </div>
  );
}
