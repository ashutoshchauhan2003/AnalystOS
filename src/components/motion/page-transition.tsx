"use client";

import { motion, useReducedMotion } from "framer-motion";
import { premiumEase } from "@/components/motion/presets";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}
