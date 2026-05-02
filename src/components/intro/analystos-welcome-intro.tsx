"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { premiumEase } from "@/components/motion/presets";

const LOCAL_STORAGE_KEY = "analystos-welcome-intro-viewed";
const SESSION_STORAGE_KEY = "analystos-welcome-intro-session-viewed";
const SOUND_STORAGE_KEY = "analystos-welcome-intro-muted";
const TITLE_TEXT = "Welcome to AnalystOS";
const AUTO_ENTER_MS = 5200;
const REDUCED_MOTION_AUTO_ENTER_MS = 1500;

const signalDots = [
  { left: "12%", top: "20%", size: 4, delay: 0, mobile: true },
  { left: "24%", top: "72%", size: 3, delay: 0.2, mobile: true },
  { left: "36%", top: "15%", size: 5, delay: 0.35, mobile: false },
  { left: "47%", top: "82%", size: 3, delay: 0.1, mobile: false },
  { left: "58%", top: "22%", size: 4, delay: 0.45, mobile: true },
  { left: "67%", top: "68%", size: 5, delay: 0.25, mobile: false },
  { left: "77%", top: "18%", size: 3, delay: 0.15, mobile: false },
  { left: "88%", top: "58%", size: 4, delay: 0.32, mobile: true },
];

const telemetryRows = ["CORE SYSTEMS", "SIGNAL MAP", "ANALYST LAB", "READY STATE"];

function canUseStorage(storage: Storage | undefined): storage is Storage {
  try {
    if (!storage) {
      return false;
    }

    const probeKey = "__analystos_intro_probe__";
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function getStoredValue(storage: Storage | undefined, key: string) {
  const availableStorage = storage;

  if (!canUseStorage(availableStorage)) {
    return null;
  }

  try {
    return availableStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStoredValue(storage: Storage | undefined, key: string, value: string) {
  const availableStorage = storage;

  if (!canUseStorage(availableStorage)) {
    return;
  }

  try {
    availableStorage.setItem(key, value);
  } catch {
    // Storage can be blocked in private or locked-down contexts.
  }
}

function playBootSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }

    const audioContext = new AudioContextClass();
    const gain = audioContext.createGain();
    const oscillator = audioContext.createOscillator();
    const secondOscillator = audioContext.createOscillator();
    const now = audioContext.currentTime;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(96, now);
    oscillator.frequency.exponentialRampToValueAtTime(184, now + 0.48);

    secondOscillator.type = "triangle";
    secondOscillator.frequency.setValueAtTime(384, now + 0.08);
    secondOscillator.frequency.exponentialRampToValueAtTime(620, now + 0.42);

    oscillator.connect(gain);
    secondOscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);
    secondOscillator.start(now + 0.08);
    oscillator.stop(now + 0.58);
    secondOscillator.stop(now + 0.5);
  } catch {
    // Audio is progressive enhancement only.
  }
}

function useTypedText(text: string, active: boolean, reduceMotion: boolean) {
  const [typedText, setTypedText] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (reduceMotion) {
      setTypedText(text);
      return undefined;
    }

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
    }, 48);

    return () => window.clearInterval(intervalId);
  }, [active, reduceMotion, text]);

  return typedText;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

export function AnalystOSWelcomeIntro() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [shouldShow, setShouldShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [titleActive, setTitleActive] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const typedTitle = useTypedText(TITLE_TEXT, titleActive, Boolean(reduceMotion));
  const autoEnterDelay = reduceMotion ? REDUCED_MOTION_AUTO_ENTER_MS : AUTO_ENTER_MS;

  const markViewed = useCallback(() => {
    setStoredValue(window.localStorage, LOCAL_STORAGE_KEY, "true");
    setStoredValue(window.sessionStorage, SESSION_STORAGE_KEY, "true");
  }, []);

  const closeIntro = useCallback(
    (withSound = false) => {
      if (withSound && !isMuted) {
        playBootSound();
      }

      markViewed();
      setIsVisible(false);
    },
    [isMuted, markViewed],
  );

  const toggleSound = useCallback(() => {
    setIsMuted((current) => {
      const nextMuted = !current;
      setStoredValue(window.localStorage, SOUND_STORAGE_KEY, String(nextMuted));

      if (!nextMuted) {
        playBootSound();
      }

      return nextMuted;
    });
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const hasLocalView = getStoredValue(window.localStorage, LOCAL_STORAGE_KEY) === "true";
    const hasSessionView = getStoredValue(window.sessionStorage, SESSION_STORAGE_KEY) === "true";
    const storedSoundPreference = getStoredValue(window.localStorage, SOUND_STORAGE_KEY);

    if (storedSoundPreference !== null) {
      setIsMuted(storedSoundPreference !== "false");
    }

    if (hasLocalView || hasSessionView) {
      return;
    }

    setShouldShow(true);
    setIsVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    if (reduceMotion) {
      setTitleActive(true);
      setSubtitleVisible(true);
      setCtaVisible(true);
    }

    const titleTimer = window.setTimeout(() => setTitleActive(true), reduceMotion ? 120 : 2000);
    const subtitleTimer = window.setTimeout(() => setSubtitleVisible(true), reduceMotion ? 160 : 3000);
    const ctaTimer = window.setTimeout(() => setCtaVisible(true), reduceMotion ? 200 : 4000);
    const autoTimer = window.setTimeout(() => closeIntro(false), autoEnterDelay);

    return () => {
      window.clearTimeout(titleTimer);
      window.clearTimeout(subtitleTimer);
      window.clearTimeout(ctaTimer);
      window.clearTimeout(autoTimer);
    };
  }, [autoEnterDelay, closeIntro, isVisible, reduceMotion]);

  const ringTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0.01 }
        : { duration: 5.6, repeat: Infinity, ease: "linear" as const },
    [reduceMotion],
  );

  if (pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={() => setShouldShow(false)}>
      {shouldShow && isVisible ? (
        <motion.div
          aria-label="Welcome to AnalystOS"
          className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#020611] px-4 py-5 text-white sm:px-5 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.78, ease: premiumEase }}
        >
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(34,211,238,0.24),transparent_24%),radial-gradient(circle_at_20%_14%,rgba(59,130,246,0.16),transparent_22%),linear-gradient(180deg,#040914_0%,#020611_54%,#01030a_100%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.1 : 1, ease: premiumEase }}
          />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(103,232,249,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(103,232,249,0.08)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25 [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            transition={{ duration: reduceMotion ? 0.1 : 1, ease: premiumEase }}
          />
          <motion.div
            className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent shadow-[0_0_32px_rgba(103,232,249,0.85)]"
            initial={{ opacity: 0 }}
            animate={reduceMotion ? { opacity: 0.45 } : { y: [-180, 180, -180], opacity: [0, 0.82, 0.18] }}
            transition={{ delay: reduceMotion ? 0 : 1, duration: 3.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
          />

          {signalDots.map((dot) => (
            <motion.span
              key={`${dot.left}-${dot.top}`}
              className={`${dot.mobile ? "" : "hidden sm:block"} absolute rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,0.95)]`}
              style={{ height: dot.size, left: dot.left, top: dot.top, width: dot.size }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={reduceMotion ? { opacity: 0.65, scale: 1 } : { opacity: [0.18, 1, 0.28], scale: [1, 1.8, 1] }}
              transition={{
                delay: reduceMotion ? 0 : dot.delay,
                duration: reduceMotion ? 0.1 : 2.4,
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="absolute right-4 top-4 z-20 flex items-center gap-2 sm:right-5 sm:top-5">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Unmute intro sound" : "Mute intro sound"}
              className="grid h-10 w-10 place-items-center rounded-full border border-cyan-200/20 bg-white/[0.06] text-cyan-100/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.08] hover:text-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 focus:ring-offset-2 focus:ring-offset-[#020611]"
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 9.25h3.4L12 5.5v13l-4.6-3.75H4v-5.5Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
                {isMuted ? (
                  <>
                    <path d="m17 9 4 4m0-4-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                  </>
                ) : (
                  <>
                    <path d="M16 9.25c.8.72 1.25 1.67 1.25 2.75S16.8 14.03 16 14.75" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                    <path d="M18.4 7.2A6.1 6.1 0 0 1 20.6 12a6.1 6.1 0 0 1-2.2 4.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
                  </>
                )}
              </svg>
            </button>
            <button
              type="button"
              onClick={() => closeIntro(true)}
              className="rounded-full border border-cyan-200/20 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-cyan-100/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:border-cyan-200/40 hover:bg-cyan-200/[0.08] hover:text-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 focus:ring-offset-2 focus:ring-offset-[#020611]"
            >
              Skip
            </button>
          </div>

          <motion.section
            className="relative grid w-full max-w-5xl place-items-center rounded-[2rem] border border-cyan-200/20 bg-white/[0.055] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl sm:p-8 lg:min-h-[560px]"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 22, scale: reduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.92, filter: reduceMotion ? "blur(0px)" : "blur(10px)" }}
            transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: premiumEase, delay: reduceMotion ? 0 : 0.1 }}
          >
            <div className="absolute inset-3 rounded-[1.55rem] border border-white/10" />
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_50%_42%,rgba(103,232,249,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.015))]" />
            <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-cyan-100/55 sm:left-6 sm:right-6 sm:top-6 sm:text-[10px]">
              <span>AnalystOS boot sequence</span>
              <span className="hidden sm:inline">HUD online</span>
            </div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.84 }}
              transition={{ duration: reduceMotion ? 0.1 : 1, ease: premiumEase, delay: reduceMotion ? 0 : 1 }}
            >
              <motion.div
                className="absolute h-[16rem] w-[16rem] rounded-full border border-cyan-200/25 shadow-[0_0_44px_rgba(34,211,238,0.16)] sm:h-[24rem] sm:w-[24rem]"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={ringTransition}
              />
              <motion.div
                className="absolute h-[12rem] w-[12rem] rounded-full border border-dashed border-cyan-100/35 sm:h-[19rem] sm:w-[19rem]"
                animate={reduceMotion ? undefined : { rotate: -360 }}
                transition={reduceMotion ? { duration: 0.01 } : { duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute h-[7.5rem] w-[7.5rem] rounded-full border border-cyan-300/30 bg-cyan-300/[0.035] blur-[0.2px] sm:h-[12rem] sm:w-[12rem]"
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 2.2, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
              <motion.div
                className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan-200/25 bg-cyan-200/[0.07] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-cyan-100/80 shadow-[0_0_28px_rgba(34,211,238,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] sm:text-[11px]"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: premiumEase, delay: reduceMotion ? 0 : 1.2 }}
              >
                <span className="h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_18px_rgba(103,232,249,1)]" />
                Launch signal acquired
              </motion.div>

              <h1 className="text-balance bg-[linear-gradient(180deg,#f8feff_0%,#bff8ff_44%,#67e8f9_72%,#8ab4ff_100%)] bg-clip-text text-4xl font-semibold leading-tight tracking-[-0.04em] text-transparent sm:text-6xl lg:text-7xl">
                <span>{typedTitle}</span>
                <motion.span
                  aria-hidden="true"
                  className="ml-1 inline-block h-[0.9em] w-px translate-y-1 bg-cyan-100 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
                  animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
              </h1>

              <motion.p
                className="mt-5 text-sm uppercase tracking-[0.28em] text-cyan-50/70 sm:text-base"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: subtitleVisible ? 1 : 0, y: subtitleVisible ? 0 : reduceMotion ? 0 : 10 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: premiumEase }}
              >
                Built by Ashutosh Chauhan
              </motion.p>

              <motion.div
                className="mt-8 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                animate={{ opacity: subtitleVisible ? 1 : 0, y: subtitleVisible ? 0 : reduceMotion ? 0 : 16 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.75, ease: premiumEase }}
              >
                {telemetryRows.map((row, index) => (
                  <div
                    key={row}
                    className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{row}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.span
                        className="block h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-200 shadow-[0_0_16px_rgba(45,212,191,0.7)]"
                        initial={{ width: "18%" }}
                        animate={{ width: subtitleVisible ? `${78 + index * 6}%` : "18%" }}
                        transition={{ duration: reduceMotion ? 0.15 : 0.9, ease: premiumEase, delay: reduceMotion ? 0 : index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              <AnimatePresence>
                {ctaVisible ? (
                  <motion.button
                    type="button"
                    onClick={() => closeIntro(true)}
                    className="mt-8 rounded-full border border-cyan-200/30 bg-[linear-gradient(180deg,rgba(103,232,249,0.26),rgba(34,211,238,0.1))] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-50 shadow-[0_0_40px_rgba(34,211,238,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-cyan-100/50 hover:bg-cyan-200/[0.16] focus:outline-none focus:ring-2 focus:ring-cyan-200/70 focus:ring-offset-2 focus:ring-offset-[#020611]"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                    transition={{ duration: reduceMotion ? 0.15 : 0.55, ease: premiumEase }}
                  >
                    Enter System
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
