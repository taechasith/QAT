"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";

import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LogoMark } from "./LogoMark";

const navItems = [
  { label: "Atlas", href: "https://qatatlas.creativelabth.com" },
  { label: "Game", href: "/game" },
  { label: "Course", href: "/course" },
  { label: "Exhibition", href: "/exhibition" },
  { label: "Research", href: "/research" },
  { label: "News", href: "/news" },
  { label: "Talk", href: "/talk" },
  { label: "Experiment", href: "/experiment" },
  { label: "Video", href: "/video" },
];

function AuthFallback() {
  return (
    <Button
      variant="outline"
      className="border-cyan-200/30 bg-cyan-200/8 text-cyan-50 hover:bg-cyan-200/14 hover:text-white"
      asChild
    >
      <Link href="/login">Login</Link>
    </Button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030711]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <LogoMark />

        <div className="flex items-center gap-3">
          <Suspense fallback={<AuthFallback />}>
            <AuthButton />
          </Suspense>

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
                      key={item.label}
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
