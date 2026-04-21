"use client";

import { Container } from "@/components/shared/container";
import { GlassPanel } from "@/components/shared/glass-panel";
import { GlowButton } from "@/components/shared/glow-button";
import { heroMetrics } from "@/content/marketing-home";
import { motion } from "framer-motion";

export function CinematicHero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 lg:pb-28 lg:pt-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_75%_20%,rgba(99,102,241,0.18),transparent_24%),linear-gradient(180deg,#08111f_0%,#060b16_48%,#04070f_100%)]" />
      <div className="absolute inset-x-0 top-12 -z-10 h-[680px] bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)] opacity-45" />
      <div className="absolute left-[10%] top-10 -z-10 h-48 w-48 rounded-full border border-cyan-300/12 bg-cyan-300/6 blur-3xl" />
      <div className="absolute right-[6%] top-28 -z-10 h-64 w-64 rounded-full bg-indigo-400/10 blur-[110px]" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(103,232,249,0.16),rgba(103,232,249,0.06))] px-4 py-2 text-[11px] uppercase tracking-[0.32em] text-cyan-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
            Analyst learning, portfolio proof, recruiter visibility
          </div>

          <h1 className="mt-10 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white xl:text-[5.3rem]">
            Build analyst
            <span className="block bg-[linear-gradient(180deg,#d7fbff_0%,#67e8f9_55%,#8ab4ff_100%)] bg-clip-text text-transparent">
              proof in motion.
            </span>
            <span className="mt-3 block text-slate-300">Learn, practice, publish, get hired.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300/76 xl:max-w-3xl">
            A cinematic analyst platform built around real workflow simulation, portfolio-grade
            projects, and a premium talent signal for modern hiring teams.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <GlowButton href="/sign-up">Enter The Platform</GlowButton>
            <GlowButton href="#projects" variant="secondary">
              Explore Real Projects
            </GlowButton>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-3 gap-4">
            {heroMetrics.map((metric, index) => (
              <GlassPanel
                key={metric.label}
                className="p-5 transition-transform duration-500 hover:-translate-y-1"
                glow={index % 2 === 0 ? "cyan" : "blue"}
              >
                <p className="text-3xl font-semibold tracking-[-0.03em] text-white">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300/72">{metric.label}</p>
              </GlassPanel>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, rotateX: 10, rotateY: -4 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="relative [perspective:2200px]"
        >
          <div className="relative mx-auto max-w-[680px]">
            <motion.div
              className="absolute -left-8 top-12 h-36 w-36 rounded-[2rem] border border-cyan-300/12 bg-cyan-300/6 backdrop-blur-sm"
              animate={{ y: [0, -10, 0], rotate: [-6, -2, -6] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -right-10 bottom-12 h-44 w-44 rounded-full border border-white/8 bg-indigo-300/5"
              animate={{ y: [0, 12, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute -inset-10 rounded-[44px] bg-cyan-400/10 blur-3xl" />
            <div className="absolute left-10 top-10 h-[82%] w-[88%] rounded-[42px] border border-white/6 bg-white/[0.03] shadow-[0_40px_90px_rgba(2,6,23,0.26)]" />

            <GlassPanel className="relative min-h-[640px] border-cyan-300/20 p-6 lg:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.16),transparent_24%),linear-gradient(180deg,rgba(8,15,28,0.72),rgba(5,8,18,0.96))]" />
              <div className="absolute inset-6 rounded-[28px] border border-white/10" />
              <div className="absolute left-[8%] top-[10%] h-[72%] w-[72%] rounded-[30px] border border-cyan-300/8 opacity-50" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.08)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_center,black,transparent_90%)] opacity-60" />
              <motion.div
                className="absolute inset-x-12 top-20 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
                animate={{ y: [0, 280, 0], opacity: [0.15, 0.75, 0.15] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative flex h-full flex-col justify-between">
                <div className="grid grid-cols-[1.18fr_0.82fr] gap-4">
                  <GlassPanel className="p-4" glow="blue">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-200/72">
                      Workflow signal
                    </p>
                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-4xl font-semibold tracking-[-0.04em] text-white">94%</p>
                        <p className="mt-2 text-sm text-slate-400">completion fidelity</p>
                      </div>
                      <div className="relative h-20 w-28 rounded-[20px] border border-cyan-300/20 bg-[linear-gradient(180deg,rgba(34,211,238,0.28),rgba(34,211,238,0.02))]">
                        <div className="absolute inset-x-3 top-4 h-px bg-cyan-200/70" />
                        <div className="absolute bottom-4 left-4 right-4 h-8 rounded-full bg-cyan-300/10 blur-md" />
                      </div>
                    </div>
                  </GlassPanel>

                  <GlassPanel className="p-4" glow="cyan">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-cyan-200/72">
                      Portfolio output
                    </p>
                    <p className="mt-8 text-3xl font-semibold tracking-[-0.04em] text-white">
                      18 live artifacts
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Portfolio surfaces shaped for public proof and hiring visibility.
                    </p>
                  </GlassPanel>
                </div>

                <div className="relative mt-6 flex-1 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(2,6,23,0.34),rgba(2,6,23,0.56))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_60px_rgba(2,6,23,0.35)]">
                  <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-30" />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-200/75">
                        Holographic analyst board
                      </p>
                      <p className="mt-2 text-xl text-white">Case simulation live surface</p>
                    </div>
                    <div className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200/80">
                      Active
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-[0.9fr_1.1fr] gap-4">
                    <GlassPanel className="p-4" glow="none">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Path</p>
                      <div className="mt-4 space-y-3">
                        {["Learn", "Practice", "Publish", "Get Hired"].map((item, index) => (
                          <div
                            key={item}
                            className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                          >
                            <span className="text-sm text-slate-200">{item}</span>
                            <span className="text-xs text-cyan-200/75">0{index + 1}</span>
                          </div>
                        ))}
                      </div>
                    </GlassPanel>

                    <div className="space-y-4">
                      <GlassPanel className="p-4" glow="cyan">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Recruiter signal
                        </p>
                        <div className="mt-5 h-28 rounded-[22px] border border-cyan-300/20 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.22),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01))]">
                          <div className="flex h-full items-end gap-2 px-4 pb-4">
                            {[38, 54, 44, 66, 74].map((height) => (
                              <span
                                key={height}
                                className="w-full rounded-t-full bg-gradient-to-t from-cyan-400/10 to-cyan-200/70"
                                style={{ height }}
                              />
                            ))}
                          </div>
                        </div>
                      </GlassPanel>
                      <GlassPanel className="p-4" glow="blue">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                          Data motion
                        </p>
                        <div className="mt-4 flex h-20 items-end gap-2">
                          {[34, 48, 62, 56, 76, 92].map((height) => (
                            <motion.span
                              key={height}
                              className="w-full rounded-t-full bg-gradient-to-t from-cyan-500/15 to-cyan-300/80"
                              initial={{ height: 0, opacity: 0.2 }}
                              animate={{ height, opacity: [0.72, 1, 0.78] }}
                              transition={{
                                duration: 3.4,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: height / 120,
                              }}
                            />
                          ))}
                        </div>
                      </GlassPanel>
                    </div>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
