import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type DashboardShellProps = {
  sidebar: ReactNode;
  topbar: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardShell({
  sidebar,
  topbar,
  children,
  className,
}: DashboardShellProps) {
  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(99,102,241,0.1),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[48rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)] opacity-40" />
      <div className="pointer-events-none absolute left-[-10%] top-[16%] h-80 w-80 rounded-full bg-cyan-400/7 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[28%] h-72 w-72 rounded-full bg-indigo-400/8 blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-[16%] top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-40 blur-2xl" />

      <div className="relative mx-auto grid min-h-screen max-w-[1600px] gap-6 px-6 py-6 lg:grid-cols-[296px_minmax(0,1fr)] lg:px-8 lg:py-7">
        {sidebar}
        <div className="min-w-0 space-y-6 lg:space-y-7">
          {topbar}
          {children}
        </div>
      </div>
    </main>
  );
}
