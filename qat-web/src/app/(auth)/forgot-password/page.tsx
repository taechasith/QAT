"use client";

import Link from "next/link";
import { useState } from "react";

import { LogoMark } from "@/components/layout/LogoMark";
import { createClient } from "@/lib/supabase/client";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
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
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">Check inbox</p>
            <h1 className="mt-3 text-2xl font-semibold text-white">Reset link sent</h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              We sent a password reset link to{" "}
              <span className="font-medium text-white">{email}</span>. Click it to set a new
              password.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-block text-sm text-cyan-100 underline underline-offset-4 hover:text-white"
            >
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
                Forgot password
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-white">Reset your password</h1>
              <p className="mt-2 text-sm text-slate-300">
                Enter your email and we will send a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
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
                {loading ? "Sending…" : "Send reset link"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              <Link href="/login" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-100">
                Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
