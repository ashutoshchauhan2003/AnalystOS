"use client";

import { navItems } from "@/content/marketing-home";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/container";
import { GlowButton } from "@/components/shared/glow-button";
import Link from "next/link";

export function PremiumNavbar() {
  return (
    <div className="sticky top-0 z-50 pt-5">
      <Container>
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,28,0.88),rgba(5,10,20,0.66))] px-6 py-4 shadow-[0_18px_50px_rgba(2,6,23,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
        >
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-xs font-semibold tracking-[0.22em] text-cyan-200">
              A3
            </span>
            <div>
              <p className="text-sm font-medium tracking-[0.28em] text-white uppercase">
                Analyst 3D
              </p>
              <p className="text-xs text-slate-400">Premium Analyst Platform</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-cyan-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <GlowButton href="/sign-in" variant="secondary">
              Sign In
            </GlowButton>
            <GlowButton href="/sign-up">Start Building</GlowButton>
          </div>
        </motion.header>
      </Container>
    </div>
  );
}
