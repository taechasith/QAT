/* Hallmark · genre: atmospheric · macrostructure: Rail · design-system: design.md · designed-as-app */
import { Suspense } from "react";
import Link from "next/link";

import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";

import { LogoMark } from "./LogoMark";
import { NavMenu } from "./NavMenu";

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
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030711]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <LogoMark />

        <div className="flex items-center gap-3">
          <Suspense fallback={<AuthFallback />}>
            <AuthButton />
          </Suspense>
          <NavMenu />
        </div>
      </div>
    </header>
  );
}
