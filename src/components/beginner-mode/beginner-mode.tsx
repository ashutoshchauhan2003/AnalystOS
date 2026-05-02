"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const BEGINNER_MODE_KEY = "analystos_beginner_mode";
const BEGINNER_MODE_EVENT = "analystos-beginner-mode-change";

function canUseLocalStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) {
      return false;
    }

    const probeKey = "__analystos_beginner_mode_probe__";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function readBeginnerMode() {
  if (!canUseLocalStorage()) {
    return true;
  }

  try {
    return window.localStorage.getItem(BEGINNER_MODE_KEY) !== "false";
  } catch {
    return true;
  }
}

function writeBeginnerMode(enabled: boolean) {
  if (canUseLocalStorage()) {
    try {
      window.localStorage.setItem(BEGINNER_MODE_KEY, String(enabled));
    } catch {
      // Beginner Mode should still work for this page even if storage is unavailable.
    }
  }

  window.dispatchEvent(new CustomEvent(BEGINNER_MODE_EVENT, { detail: enabled }));
}

export function useBeginnerMode() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(readBeginnerMode());

    const handleChange = (event: Event) => {
      const customEvent = event as CustomEvent<boolean>;
      setEnabled(Boolean(customEvent.detail));
    };

    window.addEventListener(BEGINNER_MODE_EVENT, handleChange);
    return () => window.removeEventListener(BEGINNER_MODE_EVENT, handleChange);
  }, []);

  const updateEnabled = useCallback((nextEnabled: boolean) => {
    setEnabled(nextEnabled);
    writeBeginnerMode(nextEnabled);
  }, []);

  const toggle = useCallback(() => {
    updateEnabled(!enabled);
  }, [enabled, updateEnabled]);

  return { enabled, setEnabled: updateEnabled, toggle };
}

export function BeginnerModeToggle({ compact = false }: { compact?: boolean }) {
  const { enabled, toggle } = useBeginnerMode();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/[0.07] px-3 py-2 text-xs font-medium text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:border-cyan-200/40 hover:bg-cyan-300/[0.1]",
        compact ? "px-2.5" : "px-3",
      )}
    >
      <span
        className={cn(
          "relative h-5 w-9 rounded-full border transition",
          enabled ? "border-cyan-200/50 bg-cyan-300/25" : "border-white/15 bg-white/[0.06]",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-cyan-100 shadow-[0_0_14px_rgba(103,232,249,0.6)] transition",
            enabled ? "left-[1.15rem]" : "left-1",
          )}
        />
      </span>
      <span className={compact ? "hidden xl:inline" : ""}>Beginner Mode</span>
    </button>
  );
}
