import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a demo Analyst 3D simulation workspace for portfolio-ready analyst practice.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] px-6 py-8 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(34,211,238,0.17),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(14,165,233,0.12),transparent_34%),linear-gradient(180deg,#050914_0%,#03060d_56%,#02040a_100%)]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden lg:block">
            <Link
              href="/"
              className="mb-12 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-300/[0.35] hover:text-cyan-100"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/[0.35] bg-cyan-300/10 text-xs font-semibold tracking-[0.22em] text-cyan-200">
                A3
              </span>
              Analyst 3D
            </Link>

            <p className="mb-5 text-xs font-medium uppercase tracking-[0.36em] text-cyan-200">
              Demo Proof Of Skill
            </p>
            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.04em] text-white">
              Start inside the analyst lab.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
              Create a demo workspace for simulation-driven analysis, SQL
              practice, project evidence, and recruiter-ready portfolio outcomes.
              This does not create a production-secure account.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["6", "Lab stations"],
                ["3", "Portfolio paths"],
                ["24/7", "Workspace access"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                >
                  <p className="text-2xl font-semibold text-cyan-100">{value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.11)] backdrop-blur-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200">
                  Demo Sign Up
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
                  Create demo workspace
                </h2>
              </div>
              <Link
                href="/"
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100 lg:hidden"
              >
                Home
              </Link>
            </div>

            <Suspense fallback={null}>
              <AuthForm mode="sign-up" />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
