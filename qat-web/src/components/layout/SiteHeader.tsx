import Link from "next/link";
import { Suspense } from "react";

import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";

import { LogoMark } from "./LogoMark";

const navItems = [
  { label: "Atlas", href: "https://qatatlas.creativelabth.com" },
  { label: "Game", href: "/game" },
  { label: "Course", href: "/course" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
];

function AuthFallback() {
  return (
    <Button
      variant="outline"
      className="hidden border-cyan-200/30 bg-cyan-200/8 text-cyan-50 hover:bg-cyan-200/14 hover:text-white sm:inline-flex"
      asChild
    >
      <Link href="/login">Login</Link>
    </Button>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030711]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <LogoMark />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const external = item.href.startsWith("http");
            return (
              <Link
                key={item.label}
                href={item.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Suspense fallback={<AuthFallback />}>
          <AuthButton />
        </Suspense>
      </div>
    </header>
  );
}
