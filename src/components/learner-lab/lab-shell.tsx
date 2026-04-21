import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type LabShellProps = {
  children: ReactNode;
  className?: string;
};

export function LabShell({ children, className }: LabShellProps) {
  return (
    <main
      className={cn(
        "relative isolate h-screen min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] text-slate-50",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(99,102,241,0.1),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)] opacity-40" />
      <div className="pointer-events-none absolute left-[-10%] top-[16%] h-80 w-80 rounded-full bg-cyan-400/7 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[28%] h-72 w-72 rounded-full bg-indigo-400/8 blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-[16%] top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-40 blur-2xl" />
      {children}
    </main>
  );
}

export function LabLoadingScreen() {
  return (
    <LabShell className="flex items-center justify-center">
      <div className="relative z-10 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-[11px] uppercase tracking-[0.32em] text-cyan-100 shadow-[0_0_28px_rgba(103,232,249,0.12)]">
        Loading Analyst Simulation Room
      </div>
    </LabShell>
  );
}
