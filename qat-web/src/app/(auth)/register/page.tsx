"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogoMark } from "@/components/layout/LogoMark";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { createClient } from "@/lib/supabase/client";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

function friendlySignUpError(msg: string): string {
  if (msg.toLowerCase().includes("already registered") || msg.toLowerCase().includes("already been registered")) {
    return "An account with this email already exists. Sign in instead.";
  }
  if (msg.toLowerCase().includes("invalid email")) {
    return "Please enter a valid email address.";
  }
  return msg;
}

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(friendlySignUpError(error.message));
      setLoading(false);
      return;
    }

    // Redirect to login regardless of email confirmation state.
    // If Supabase email confirmation is ON, the user must confirm before they
    // can sign in — but we do not show that screen here. Disable confirmation
    // in Supabase Dashboard → Authentication → Email → "Enable email confirmations".
    router.push("/login?registered=1");
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <div className="flex justify-center">
          <LogoMark />
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-cyan-200">Join QAT</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Create account</h1>
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

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-200">
              Password
            </label>
            <PasswordInput
              id="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-slate-200">
              Confirm password
            </label>
            <PasswordInput
              id="confirm"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat password"
              className={inputCls}
            />
          </div>

          {errorMsg && (
            <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
              {errorMsg}
              {errorMsg.includes("already exists") && (
                <Link
                  href="/login"
                  className="ml-2 underline underline-offset-4 hover:text-red-100"
                >
                  Sign in →
                </Link>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-cyan-200 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-300 underline underline-offset-4 hover:text-cyan-100">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
