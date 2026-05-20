import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { isAdminEmail } from "@/lib/auth/admin";
import { LogoutButton } from "./LogoutButton";

export async function AuthButton() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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

  const admin = isAdminEmail(user.email);

  return (
    <div className="flex items-center gap-1">
      {admin ? (
        <Link
          href="/admin"
          className="rounded-full px-3 py-2 text-sm font-medium text-violet-300 transition hover:bg-white/8 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
        >
          Admin
        </Link>
      ) : null}
      <Link
        href="/account"
        className="rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
      >
        Account
      </Link>
      <LogoutButton />
    </div>
  );
}
