import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profile";
import { NotificationPreferences } from "@/components/auth/NotificationPreferences";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const profile = await getProfile(user.id);

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
        Your account
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Account settings</h1>

      <div className="mt-10 flex flex-col gap-8">
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          <p className="mt-2 text-sm text-slate-300">{user.email}</p>
        </section>

        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white">Email notifications</h2>
          <p className="mt-2 text-sm text-slate-300 mb-5">
            Opt in to receive updates about new QAT events, exhibitions, and news.
          </p>
          <NotificationPreferences
            userId={user.id}
            initialValue={profile?.wants_update_email ?? true}
          />
        </section>
      </div>
    </div>
  );
}
