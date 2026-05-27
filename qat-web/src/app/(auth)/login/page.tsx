"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

import { LogoMark } from "@/components/layout/LogoMark";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useTr } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30";

const MAX_ATTEMPTS = 5;

function LoginForm() {
  const tr = useTr();
  const a = tr.auth.login;
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [attempts, setAttempts] = useState(0);

  const tooManyAttempts = attempts >= MAX_ATTEMPTS;

  function friendlyLoginError(msg: string, attemptsLeft: number): string {
    if (
      msg.toLowerCase().includes("invalid login credentials") ||
      msg.toLowerCase().includes("invalid email or password")
    ) {
      return attemptsLeft > 0 ? a.incorrectCredentials(attemptsLeft) : "";
    }
    if (msg.toLowerCase().includes("email not confirmed")) {
      return a.emailNotConfirmed;
    }
    return msg;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (tooManyAttempts) return;
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const next = attempts + 1;
      setAttempts(next);
      const attemptsLeft = MAX_ATTEMPTS - next;
      setErrorMsg(friendlyLoginError(error.message, attemptsLeft));
      setLoading(false);
    } else {
      router.push("/account");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <div className="flex justify-center">
          <LogoMark />
        </div>

        {justRegistered && (
          <div className="mt-6 rounded-lg border border-primary/25 bg-primary/8 px-4 py-3 text-center text-sm text-primary/80">
            {a.accountCreated}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{a.eyebrow}</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">{a.heading}</h1>
        </div>

        {tooManyAttempts ? (
          <div className="mt-8 rounded-xl border border-amber-400/25 bg-amber-400/8 p-6 text-center">
            <p className="text-sm font-semibold text-amber-200">{a.tooManyAttempts}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/70">{a.tooManyAttemptsDesc}</p>
            <Link
              href={`/forgot-password?email=${encodeURIComponent(email)}`}
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {a.resetPassword}
            </Link>
            <button
              type="button"
              onClick={() => { setAttempts(0); setErrorMsg(""); }}
              className="mt-4 block w-full text-xs text-muted-foreground/70 transition hover:text-foreground/80"
            >
              {a.tryAgain}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground/85">
                {a.email}
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={a.emailPlaceholder}
                className={inputCls}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-foreground/85">
                  {a.password}
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary underline underline-offset-4 hover:text-primary"
                >
                  {a.forgotPassword}
                </Link>
              </div>
              <PasswordInput
                id="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputCls}
              />
            </div>

            {errorMsg && (
              <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                {errorMsg}
              </p>
            )}

            {attempts > 0 && attempts < MAX_ATTEMPTS && (
              <p className="text-center text-xs text-muted-foreground/70">
                {a.havingTrouble}{" "}
                <Link
                  href={`/forgot-password?email=${encodeURIComponent(email)}`}
                  className="text-primary underline underline-offset-4 hover:text-primary"
                >
                  {a.resetYourPassword}
                </Link>
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {loading ? a.signingIn : a.signIn}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {a.noAccount}{" "}
          <Link href="/register" className="text-primary underline underline-offset-4 hover:text-primary">
            {a.createOne}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
