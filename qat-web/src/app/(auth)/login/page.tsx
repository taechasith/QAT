"use client";

import { useState } from "react";
import { LogoMark } from "@/components/layout/LogoMark";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <div className="flex justify-center">
          <LogoMark />
        </div>

        {status === "sent" ? (
          <div className="mt-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
              Check your inbox
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-white">
              Magic link sent
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              We sent a login link to{" "}
              <span className="font-medium text-white">{email}</span>. Click it
              to sign in — no password needed.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setEmail("");
              }}
              className="mt-8 text-sm text-cyan-100 underline underline-offset-4 hover:text-white"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">
                Sign in
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-white">
                Welcome to QAT
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Enter your email to receive a magic link. No password required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                />
              </div>

              {status === "error" && errorMsg ? (
                <p className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
                  {errorMsg}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {status === "loading" ? "Sending…" : "Send magic link"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              By signing in you can subscribe to QAT update notifications.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
