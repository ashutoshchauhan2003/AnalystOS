"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SegmentedOption<T extends string> = {
  id: T;
  label: string;
};

type SegmentedControlProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-2",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.id === value;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "relative overflow-hidden rounded-[1rem] px-4 py-2.5 text-sm transition",
              isActive ? "text-white" : "text-slate-400 hover:text-slate-100",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="workspace-segment"
                className="absolute inset-0 rounded-[1rem] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.18),rgba(34,211,238,0.08))] shadow-[0_0_28px_rgba(103,232,249,0.08),inset_0_1px_0_rgba(255,255,255,0.06)]"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
