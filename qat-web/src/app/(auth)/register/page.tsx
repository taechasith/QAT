"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LogoMark } from "@/components/layout/LogoMark";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useTr } from "@/lib/i18n/context";
import { createClient } from "@/lib/supabase/client";

const inputCls =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30";

export default function RegisterPage() {
  const tr = useTr();
  const a = tr.auth.register;
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function friendlySignUpError(msg: string): string {
    if (
      msg.toLowerCase().includes("already registered") ||
      msg.toLowerCase().includes("already been registered")
    ) {
      return a.alreadyExists;
    }
    if (msg.toLowerCase().includes("invalid email")) {
      return a.invalidEmail;
    }
    return msg;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg(a.passwordsMismatch);
      return;
    }
    if (password.length < 8) {
      setErrorMsg(a.passwordTooShort);
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

    router.push("/login?registered=1");
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-16">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8">
        <div className="flex justify-center">
          <LogoMark />
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">{a.eyebrow}</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">{a.heading}</h1>
        </div>

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
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground/85">
              {a.password}
            </label>
            <PasswordInput
              id="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={a.passwordPlaceholder}
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-foreground/85">
              {a.confirmPassword}
            </label>
            <PasswordInput
              id="confirm"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder={a.confirmPlaceholder}
              className={inputCls}
            />
          </div>

          {errorMsg && (
            <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">
              {errorMsg}
              {errorMsg === a.alreadyExists && (
                <Link
                  href="/login"
                  className="ml-2 underline underline-offset-4 hover:text-red-100"
                >
                  {a.signIn} →
                </Link>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {loading ? a.creating : a.createAccount}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {a.alreadyHaveAccount}{" "}
          <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary">
            {a.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
}
