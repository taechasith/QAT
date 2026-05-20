import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data/profile";
import { getPublishedContentByType } from "@/lib/data/content";
import { getUserAchievements } from "@/lib/data/achievements";

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

  const [profile, gamesResult, coursesResult, achievements] = await Promise.all([
    getProfile(user.id),
    getPublishedContentByType("game"),
    getPublishedContentByType("course"),
    getUserAchievements(user.id),
  ]);

  const avatarType = profile?.avatar_type ?? "artist_cat";
  const avatarUrl = profile?.avatar_url ?? null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
        Your profile
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-white">
        {profile?.full_name ?? "Unnamed explorer"}
      </h1>

      <div className="mt-10 flex flex-col gap-8">

        {/* Identity */}
        <section className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-5">
            <ProfileAvatarDisplay avatarType={avatarType} avatarUrl={avatarUrl} />
            <div>
              <h2 className="text-lg font-semibold text-white">
                {profile?.full_name ?? "Unnamed explorer"}
              </h2>
              <p className="text-sm text-slate-400">{user.email}</p>
            </div>
          </div>
          <div className="mt-6 border-t border-white/8 pt-6">
            <ProfileNameForm userId={user.id} initialName={profile?.full_name ?? ""} />
          </div>
        </section>

        {/* Avatar picker */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="mb-5 text-lg font-semibold text-white">Avatar</h2>
          <AvatarPicker
            userId={user.id}
            current={avatarType}
            currentUrl={avatarUrl}
          />
        </section>

        {/* Achievements */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="mb-5 text-lg font-semibold text-white">Achievements</h2>
          <AchievementList
            games={gamesResult.items}
            courses={coursesResult.items}
            achievements={achievements}
          />
        </section>

        {/* Settings */}
        <section className="glass-panel rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white">Settings</h2>
          <div className="mt-5">
            <h3 className="mb-1 text-sm font-medium text-slate-200">Email updates</h3>
            <p className="mb-4 text-xs text-slate-400">
              Receive news and upcoming event notifications.
            </p>
            <NotificationPreferences
              userId={user.id}
              initialValue={profile?.wants_update_email ?? false}
            />
          </div>
          <div className="mt-6 border-t border-white/8 pt-6">
            <h3 className="mb-1 text-sm font-medium text-slate-200">Password</h3>
            <p className="mb-4 text-xs text-slate-400">Request a reset link to your email.</p>
            <Link
              href="/forgot-password"
              className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
            >
              Change password
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
