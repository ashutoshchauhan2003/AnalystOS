import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  glow?: "cyan" | "blue" | "none";
};

export function GlassPanel({
  className,
  glow = "cyan",
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] backdrop-blur-xl",
        "shadow-[0_18px_56px_rgba(5,10,20,0.34),inset_0_1px_0_rgba(255,255,255,0.1)]",
        "before:pointer-events-none after:pointer-events-none",
        "supports-[backdrop-filter]:bg-white/[0.055]",
        glow === "cyan" &&
          "before:absolute before:inset-x-10 before:top-0 before:h-px before:bg-cyan-300/45 before:content-[''] after:absolute after:-right-14 after:top-8 after:h-28 after:w-28 after:rounded-full after:bg-cyan-400/8 after:blur-3xl after:content-['']",
        glow === "blue" &&
          "before:absolute before:inset-x-10 before:top-0 before:h-px before:bg-sky-200/35 before:content-[''] after:absolute after:-left-10 after:bottom-0 after:h-24 after:w-24 after:rounded-full after:bg-indigo-400/8 after:blur-3xl after:content-['']",
        glow === "none" &&
          "before:absolute before:inset-x-12 before:top-0 before:h-px before:bg-white/10 before:content-['']",
        "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_22%)]",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-[1px] rounded-[25px] border border-white/6" />
      <div className="pointer-events-none absolute inset-x-[18%] top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent)] opacity-55 blur-2xl" />
      {children}
    </div>
  );
}
