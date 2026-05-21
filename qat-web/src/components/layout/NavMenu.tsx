"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { t, type Locale } from "@/lib/i18n/translations";

export function NavMenu({ locale = "en", user }: { locale?: Locale; user?: User | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const nav = t[locale].nav;

  const navItems = [
    { label: nav.atlas, href: "https://qatatlas.creativelabth.com" },
    { label: nav.game, href: "/game" },
    { label: nav.course, href: "/course" },
    { label: nav.exhibition, href: "/exhibition" },
    { label: nav.research, href: "/research" },
    { label: nav.news, href: "/news" },
    { label: nav.talk, href: "/talk" },
    { label: nav.experiment, href: "/experiment" },
    { label: nav.video, href: "/video" },
  ];

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-300 hover:bg-white/8 hover:text-white"
          aria-label="Open navigation menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 border-white/10 bg-[#030711]/95 backdrop-blur-xl"
      >
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="mt-8 flex flex-col gap-1" aria-label="Primary">
          {navItems.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <Link
                key={item.href}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition-all duration-200 hover:translate-x-1 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </Link>
            );
          })}

          <div className="my-2 border-t border-white/10" />

          {user ? (
            <>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-cyan-200 transition-all duration-200 hover:translate-x-1 hover:bg-white/8 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {nav.myAccount}
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-400 transition-all duration-200 hover:translate-x-1 hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {nav.signOut}
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-cyan-200 transition-all duration-200 hover:translate-x-1 hover:bg-white/8 hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              {nav.login}
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
