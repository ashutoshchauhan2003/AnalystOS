import { GlassPanel } from "@/components/shared/glass-panel";
import { employerDirectory } from "@/content/employer-directory";

export function FilterPanel() {
  const { filters } = employerDirectory;

  return (
    <GlassPanel className="h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.028))] p-5" glow="blue">
      <div className="mb-4 h-px w-16 bg-gradient-to-r from-cyan-300/70 to-transparent" />
      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/72">Filters</p>

      <div className="mt-6 space-y-6">
        <section>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Role</p>
          <div className="mt-3 space-y-2">
            {filters.role.map((item) => (
              <div key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Proof</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.proof.map((item) => (
              <div key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section>
          <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Hiring Signal</p>
          <div className="mt-3 space-y-2">
            {filters.readiness.map((item) => (
              <div key={item} className="rounded-[1rem] border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(34,211,238,0.08),rgba(34,211,238,0.02))] px-4 py-3 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </GlassPanel>
  );
}
