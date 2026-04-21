import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type GlowButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function GlowButton({
  children,
  className,
  variant = "primary",
  ...props
}: GlowButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-medium tracking-[0.22em] uppercase transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050913]",
        variant === "primary" &&
          "border-cyan-300/55 bg-cyan-300 text-slate-950 shadow-[0_0_32px_rgba(103,232,249,0.22)] hover:-translate-y-0.5 hover:bg-cyan-200",
        variant === "secondary" &&
          "border-white/12 bg-white/6 text-slate-100 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
