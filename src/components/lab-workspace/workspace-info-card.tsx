import { cn } from "@/lib/utils";

type WorkspaceInfoCardProps = {
  label: string;
  value: string;
  className?: string;
};

export function WorkspaceInfoCard({
  label,
  value,
  className,
}: WorkspaceInfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.35rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
        className,
      )}
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-cyan-200/70">{label}</p>
      <p className="mt-3 text-sm leading-7 text-slate-200">{value}</p>
    </div>
  );
}
