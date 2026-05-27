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
        className="hidden border-primary/30 bg-primary/8 text-foreground hover:bg-primary/14 hover:text-white sm:inline-flex"
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
          className="rounded-full px-3 py-2 text-sm font-medium text-accent transition hover:bg-white/8 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Admin
        </Link>
      ) : null}
      <Link
        href="/account"
        className="rounded-full px-3 py-2 text-sm font-medium text-foreground/70 transition hover:bg-white/8 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        Profile
      </Link>
      <LogoutButton />
    </div>
  );
}
