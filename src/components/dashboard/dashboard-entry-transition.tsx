"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { premiumEase } from "@/components/motion/presets";

const SESSION_STORAGE_KEY = "analystos_dashboard_seen";
const BOOT_LINES = [
  "Loading user profile...",
  "Syncing learning paths...",
  "Preparing workspace...",
];

type DashboardEntryTransitionProps = {
  children: ReactNode;
};

function canUseSessionStorage() {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) {
      return false;
    }

    const probeKey = "__analystos_dashboard_entry_probe__";
    window.sessionStorage.setItem(probeKey, "1");
    window.sessionStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function markDashboardSeen() {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
  } catch {
    // Session storage is a convenience; the dashboard should never depend on it.
  }
}

function hasSeenDashboardThisSession() {
  if (!canUseSessionStorage()) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function useTerminalText(text: string, active: boolean, speed = 26) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (!active) {
      setTypedText("");
      return undefined;
    }

    let index = 0;
    setTypedText("");

    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(intervalId);
      }
    }, speed);

    return () => window.clearInterval(intervalId);
  }, [active, speed, text]);

  return typedText;
}

function TerminalLine({
  text,
  active,
  delay = 0,
}: {
  text: string;
  active: boolean;
  delay?: number;
}) {
  const [isTyping, setIsTyping] = useState(false);
  const typedText = useTerminalText(text, isTyping);

  useEffect(() => {
    if (!active) {
      setIsTyping(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setIsTyping(true), delay);
    return () => window.clearTimeout(timeoutId);
  }, [active, delay]);

  return (
    <p className="min-h-5 text-[11px] leading-5 text-cyan-50/80 sm:text-xs">
      <span className="text-cyan-300/80">&gt;</span> {typedText}
    </p>
  );
}

export function DashboardEntryTransition({ children }: DashboardEntryTransitionProps) {
  const reduceMotion = useReducedMotion();
  const [showTransition, setShowTransition] = useState(false);
  const [dashboardReady, setDashboardReady] = useState(false);
  const [linesActive, setLinesActive] = useState(false);
  const initializingText = useTerminalText("Initializing AnalystOS...", showTransition && !reduceMotion, 30);

  const finishTransition = useCallback(() => {
    markDashboardSeen();
    setDashboardReady(true);
    setShowTransition(false);
  }, []);

  useEffect(() => {
    if (reduceMotion || hasSeenDashboardThisSession()) {
      markDashboardSeen();
      setDashboardReady(true);
      setShowTransition(false);
      return undefined;
    }

    setShowTransition(true);

    const linesTimer = window.setTimeout(() => setLinesActive(true), 800);
    const finishTimer = window.setTimeout(finishTransition, 2500);

    return () => {
      window.clearTimeout(linesTimer);
      window.clearTimeout(finishTimer);
    };
  }, [finishTransition, reduceMotion]);

  return (
    <div className="relative min-h-screen bg-[#04070f]">
      <motion.div
        className="relative min-h-screen"
        initial={false}
        animate={{
          opacity: dashboardReady ? 1 : 0.42,
          scale: dashboardReady ? 1 : 0.98,
          filter: dashboardReady ? "blur(0px)" : "blur(8px)",
        }}
        transition={{ duration: reduceMotion ? 0.01 : 0.68, ease: premiumEase }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {showTransition ? (
          <motion.button
            type="button"
            aria-label="Skip dashboard entry animation"
            className="fixed inset-0 z-[90] cursor-default overflow-hidden bg-[#020611]/80 text-left text-white outline-none"
            onClick={finishTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: premiumEase }}
          >
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(103,232,249,0.06)_1px,transparent_1px)] bg-[size:54px_54px] opacity-0 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]"
              animate={{ opacity: 0.32 }}
              transition={{ duration: 0.8, ease: premiumEase }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(34,211,238,0.16),transparent_28%),linear-gradient(180deg,rgba(2,6,17,0.72),rgba(2,6,17,0.92))]" />
            <motion.div
              className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent shadow-[0_0_30px_rgba(103,232,249,0.72)]"
              animate={{ y: [-90, 120], opacity: [0.1, 0.8, 0.18] }}
              transition={{ delay: 0.8, duration: 1.45, ease: "easeInOut" }}
            />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-5">
              <motion.div
                className="w-full max-w-xl rounded-2xl border border-cyan-200/20 bg-slate-950/45 p-5 font-mono shadow-[0_30px_90px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:p-6"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.5, ease: premiumEase }}
              >
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.9)]" />
                    <span className="text-[10px] uppercase tracking-[0.28em] text-cyan-100/70">
                      Workspace Entry
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Click to skip</span>
                </div>

                <div className="space-y-2">
                  <p className="min-h-5 text-[11px] leading-5 text-cyan-50/90 sm:text-xs">
                    <span className="text-cyan-300/80">&gt;</span> {initializingText}
                    <motion.span
                      aria-hidden="true"
                      className="ml-1 inline-block h-4 w-px translate-y-0.5 bg-cyan-200"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </p>
                  <div className="pt-3">
                    {BOOT_LINES.map((line, index) => (
                      <TerminalLine
                        key={line}
                        text={line}
                        active={linesActive}
                        delay={index * 230}
                      />
                    ))}
                  </div>
                </div>

                <motion.div
                  className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.07]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: linesActive ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-200 to-blue-400 shadow-[0_0_18px_rgba(34,211,238,0.5)]"
                    initial={{ width: "18%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.25, ease: premiumEase, delay: 0.85 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
