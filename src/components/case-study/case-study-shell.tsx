import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CaseStudyShellProps = {
  children: ReactNode;
  className?: string;
};

export function CaseStudyShell({ children, className }: CaseStudyShellProps) {
  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#07111d_0%,#050a14_45%,#04070f_100%)] text-slate-50",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_12%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_88%_14%,rgba(99,102,241,0.08),transparent_18%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)] opacity-35" />
      <div className="pointer-events-none absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-cyan-400/8 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-6%] top-[22%] h-64 w-64 rounded-full bg-indigo-400/8 blur-[120px]" />
      <Container className="relative py-10 lg:py-14">{children}</Container>
    </main>
  );
}
