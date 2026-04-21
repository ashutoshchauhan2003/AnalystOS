import { cn } from "@/lib/utils";

type StatusPillProps = {
  label: string;
  tone?: "cyan" | "blue" | "neutral" | "success" | "warning";
  className?: string;
};

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: StatusPillProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.28em]",
        tone === "cyan" && "border-cyan-300/22 bg-cyan-300/10 text-cyan-100",
        tone === "blue" && "border-indigo-300/20 bg-indigo-300/10 text-indigo-100",
        tone === "neutral" && "border-white/10 bg-white/[0.04] text-slate-300",
        tone === "success" && "border-emerald-300/18 bg-emerald-300/10 text-emerald-100",
        tone === "warning" && "border-amber-300/18 bg-amber-300/10 text-amber-100",
        className,
      )}
    >
      {label}
    </div>
  );
}
