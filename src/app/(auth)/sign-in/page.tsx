import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Enter the Analyst 3D demo simulation workspace with demo credentials.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03060d] px-6 py-8 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.12),transparent_32%),linear-gradient(180deg,#050914_0%,#03060d_54%,#02040a_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-12 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.08] blur-3xl" />
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
              Demo Simulation Access
            </p>
            <h1 className="max-w-xl text-5xl font-semibold tracking-[-0.04em] text-white">
              Return to your research lab.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
              Continue the guided analyst simulation with demo credentials. This
              login unlocks protected practice routes, but it is not production
              account security.
            </p>

            <div className="mt-10 grid max-w-lg gap-3">
              {["Resume active lab workspace", "Review dashboard progress", "Prepare recruiter-ready case evidence"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    <span className="mr-3 text-cyan-200">/</span>
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.035))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.11)] backdrop-blur-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-200">
                  Demo Sign In
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white">
                  Access demo workspace
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
              <AuthForm mode="sign-in" />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
