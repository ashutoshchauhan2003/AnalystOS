"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { premiumEase, premiumHover } from "@/components/motion/presets";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: "none" | "lift";
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  hover = "none",
  y = 24,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y, scale: 0.985 }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      whileHover={!reduceMotion && hover === "lift" ? premiumHover : undefined}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.82, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}
