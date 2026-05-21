"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LogoMark } from "@/components/layout/LogoMark";
import { useTr } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

function ForgotPasswordForm() {
  const tr = useTr();
  const a = tr.auth.forgotPassword;
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/reset-password`,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <div className="flex justify-center">
          <LogoMark />
        </div>

        {sent ? (
          <div className="mt-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
              {a.checkInbox}
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">{a.resetLinkSent}</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {a.sentMessage(email)}
            </p>
            <p className="mt-3 text-xs text-slate-500">{a.spamNote}</p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-sm text-cyan-300 underline underline-offset-4 hover:text-cyan-100"
              >
                {a.sendAgain}
              </button>
              <Link
                href="/login"
                className="text-sm text-slate-400 underline underline-offset-4 hover:text-slate-200"
              >
                {a.backToSignIn}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
                {a.eyebrow}
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-white">{a.heading}</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">{a.description}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-200">
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

              {errorMsg && (
                <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {loading ? a.sending : a.sendResetLink}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              <Link
                href="/login"
                className="text-cyan-300 underline underline-offset-4 hover:text-cyan-100"
              >
                {a.backToSignIn}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
