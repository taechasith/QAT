import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profile";
import { getPublishedContentByType } from "@/lib/data/content";
import { getUserAchievements } from "@/lib/data/achievements";
import { getTranslations } from "@/lib/i18n/locale";

import { NotificationPreferences } from "@/components/auth/NotificationPreferences";
import { AvatarPicker } from "@/components/profile/AvatarPicker";
import { AchievementList } from "@/components/profile/AchievementList";
import { ProfileNameForm } from "@/components/profile/ProfileNameForm";
import { ProfileAvatarDisplay } from "@/components/profile/ProfileAvatarDisplay";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [profile, gamesResult, coursesResult, achievements, tr] = await Promise.all([
    getProfile(user.id),
    getPublishedContentByType("game"),
    getPublishedContentByType("course"),
    getUserAchievements(user.id),
    getTranslations(),
  ]);

  const a = tr.account;
  const avatarType = profile?.avatar_type ?? "artist_cat";
  const avatarUrl = profile?.avatar_url ?? null;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
        {a.eyebrow}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-white">
        {profile?.full_name ?? a.unnamedExplorer}
      </h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-[340px_1fr] lg:gap-8">

        {/* LEFT: identity + settings */}
        <div className="flex flex-col gap-6">

          <section className="glass-panel rounded-xl p-6">
            <div className="flex items-center gap-4">
              <ProfileAvatarDisplay avatarType={avatarType} avatarUrl={avatarUrl} />
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-white">
                  {profile?.full_name ?? a.unnamedExplorer}
                </h2>
                <p className="truncate text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
            <div className="mt-5 border-t border-white/8 pt-5">
              <ProfileNameForm
                key={profile?.full_name ?? ""}
                initialName={profile?.full_name ?? ""}
              />
            </div>
          </section>

          <section className="glass-panel rounded-xl p-6">
            <h2 className="text-base font-semibold text-white">{a.settings}</h2>
            <div className="mt-5">
              <h3 className="mb-1 text-sm font-medium text-slate-200">{a.emailUpdates}</h3>
              <p className="mb-3 text-xs text-slate-400">{a.emailUpdatesDesc}</p>
              <NotificationPreferences
                userId={user.id}
                initialValue={profile?.wants_update_email ?? false}
              />
            </div>
            <div className="mt-5 border-t border-white/8 pt-5">
              <h3 className="mb-1 text-sm font-medium text-slate-200">{a.password}</h3>
              <p className="mb-3 text-xs text-slate-400">{a.passwordDesc}</p>
              <Link
                href="/forgot-password"
                className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
              >
                {a.changePassword}
              </Link>
            </div>
          </section>

        </div>

        {/* RIGHT: avatar + achievements */}
        <div className="flex flex-col gap-6">

          <section className="glass-panel rounded-xl p-6">
            <h2 className="mb-5 text-base font-semibold text-white">{a.avatar}</h2>
            <AvatarPicker
              userId={user.id}
              current={avatarType}
              currentUrl={avatarUrl}
            />
          </section>

          <section className="glass-panel rounded-xl p-6">
            <h2 className="mb-5 text-base font-semibold text-white">{a.achievements}</h2>
            <AchievementList
              games={gamesResult.items}
              courses={coursesResult.items}
              achievements={achievements}
            />
          </section>

        </div>
      </div>
    </div>
  );
}
