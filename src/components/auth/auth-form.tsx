"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SUPABASE_SESSION_COOKIE } from "@/lib/supabase/auth";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("analyst@example.com");
  const [password, setPassword] = useState("analystos");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignUp = mode === "sign-up";

  function handleDemoFlow() {
    document.cookie = `${SUPABASE_SESSION_COOKIE}=1; path=/; max-age=86400; samesite=lax`;
    router.push("/diagnostic");
    router.refresh();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = isSignUp
      ? await supabase?.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name || email.split("@")[0],
              role: "learner",
            },
          },
        })
      : await supabase?.auth.signInWithPassword({
          email,
          password,
        });

    if (isSupabaseConfigured && result?.error) {
      setIsSubmitting(false);
      setError(result.error.message);
      return;
    }

    if (isSupabaseConfigured && isSignUp && result?.data.user) {
      await supabase?.from("profiles").upsert(
        {
          id: result.data.user.id,
          name: name || email.split("@")[0],
          email,
          role: "learner",
        },
        { onConflict: "id" },
      );
    }

    document.cookie = `${SUPABASE_SESSION_COOKIE}=1; path=/; max-age=604800; samesite=lax`;

    setIsSubmitting(false);

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="rounded-2xl border border-cyan-300/[0.18] bg-cyan-300/[0.055] px-4 py-3 text-sm leading-6 text-cyan-50">
        {isSupabaseConfigured
          ? isSignUp
            ? "First time here? Create a new account to save your AnalystOS progress, drafts, reviews, and portfolio."
            : "Already created an account? Sign in to continue. First-time users should create a new account first."
          : "Supabase env variables are missing, so AnalystOS is using a local demo session fallback."}
      </div>

      {isSignUp ? (
        <label className="block">
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            Full name
          </span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Alex Morgan"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.55] focus:ring-4 focus:ring-cyan-300/10"
          />
        </label>
      ) : null}

      <label className="block">
        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
          Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="analyst@example.com"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.55] focus:ring-4 focus:ring-cyan-300/10"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
          Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={isSignUp ? "Create password" : "Enter password"}
          required
          minLength={6}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/[0.55] focus:ring-4 focus:ring-cyan-300/10"
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100">
          {error}
        </div>
      ) : null}

      {!isSignUp ? (
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-3 text-slate-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-300"
            />
            Keep me signed in
          </label>
          <Link href="/sign-up" className="text-cyan-200 transition hover:text-cyan-100">
            New account
          </Link>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center rounded-full border border-cyan-300/[0.55] bg-cyan-300 px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-950 shadow-[0_0_36px_rgba(103,232,249,0.2)] transition hover:-translate-y-0.5 hover:bg-cyan-200 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {isSubmitting
          ? "Opening workspace..."
          : isSignUp
            ? "Create Workspace"
            : "Enter Workspace"}
      </button>

      <button
        type="button"
        onClick={handleDemoFlow}
        className="flex w-full items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.045] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/[0.35] hover:text-cyan-100"
      >
        Try demo flow without account
      </button>

      {isSignUp ? (
        <p className="text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-cyan-200 transition hover:text-cyan-100">
            Sign in
          </Link>
        </p>
      ) : null}
    </form>
  );
}
