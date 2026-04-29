import { GlassPanel } from "@/components/shared/glass-panel";
import { employerDirectory } from "@/content/employer-directory";
import { cn } from "@/lib/utils";

type FilterPanelProps = {
  activeSkills: string[];
  activeTools: string[];
  activeProjects: string[];
  onToggleSkill: (value: string) => void;
  onToggleTool: (value: string) => void;
  onToggleProject: (value: string) => void;
  onClear: () => void;
};

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-[1rem] border px-4 py-3 text-left text-sm transition duration-300",
        active
          ? "border-cyan-300/[0.24] bg-cyan-300/10 text-cyan-100 shadow-[0_0_20px_rgba(103,232,249,0.08)]"
          : "border-white/[0.08] bg-white/[0.03] text-slate-200 hover:border-cyan-300/[0.18] hover:text-white",
      )}
    >
      {children}
    </button>
  );
}

export function FilterPanel({
  activeSkills,
  activeTools,
  activeProjects,
  onToggleSkill,
  onToggleTool,
  onToggleProject,
  onClear,
}: FilterPanelProps) {
  const { filters } = employerDirectory;
  const activeCount = activeSkills.length + activeTools.length + activeProjects.length;

  return (
    <GlassPanel className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="blue">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="mb-4 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
          <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/[0.72]">Filters</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-slate-400 transition hover:border-cyan-300/20 hover:text-cyan-100"
        >
          Clear
        </button>
      </div>
      <p className="text-sm text-slate-400">{activeCount} active filters</p>

      <div className="mt-6 space-y-6">
        <section>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Skills</p>
          <div className="mt-3 space-y-2">
            {filters.skills.map((item) => (
              <FilterButton
                key={item}
                active={activeSkills.includes(item)}
                onClick={() => onToggleSkill(item)}
              >
                {item}
              </FilterButton>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Tools</p>
          <div className="mt-3 space-y-2">
            {filters.tools.map((item) => (
              <FilterButton
                key={item}
                active={activeTools.includes(item)}
                onClick={() => onToggleTool(item)}
              >
                {item}
              </FilterButton>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Projects</p>
          <div className="mt-3 space-y-2">
            {filters.projects.map((item) => (
              <FilterButton
                key={item}
                active={activeProjects.includes(item)}
                onClick={() => onToggleProject(item)}
              >
                {item}
              </FilterButton>
            ))}
          </div>
        </section>
      </div>
    </GlassPanel>
  );
}
