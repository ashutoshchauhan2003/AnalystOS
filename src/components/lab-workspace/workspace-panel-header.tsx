import type { ReactNode } from "react";

type WorkspacePanelHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: ReactNode;
};

export function WorkspacePanelHeader({
  eyebrow,
  title,
  description,
  aside,
}: WorkspacePanelHeaderProps) {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <div className="mb-4 h-px w-20 bg-gradient-to-r from-cyan-300/70 to-transparent" />
        <p className="text-[11px] uppercase tracking-[0.34em] text-cyan-200/72">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{description}</p>
        ) : null}
      </div>

      {aside ? <div className="flex flex-wrap gap-3">{aside}</div> : null}
    </div>
  );
}
