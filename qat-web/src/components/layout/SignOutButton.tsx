"use client";

import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export function SignOutButton({ label }: { label: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
    >
      {label}
    </button>
  );
}
