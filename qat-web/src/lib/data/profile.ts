import { createClient } from "@/lib/supabase/server";

export type AvatarType = "artist_cat" | "technologist_cat" | "scientist_cat" | "upload";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  avatar_type: AvatarType;
  wants_update_email: boolean;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("id, email, full_name, bio, avatar_url, avatar_type, wants_update_email")
      .eq("id", userId)
      .maybeSingle();
    if (!data) return null;
    return { ...data, avatar_type: data.avatar_type ?? "artist_cat" } as Profile;
  } catch {
    return null;
  }
}

export async function upsertProfile(
  userId: string,
  email: string,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("profiles").upsert(
    { id: userId, email },
    { onConflict: "id", ignoreDuplicates: true },
  );
  return error ? { error: error.message } : {};
}

export async function updateProfile(
  userId: string,
  fields: {
    full_name?: string;
    bio?: string | null;
    avatar_type?: AvatarType;
    avatar_url?: string;
  },
): Promise<{ profile?: Profile; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", userId)
    .select("id, email, full_name, bio, avatar_url, avatar_type, wants_update_email")
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return { error: "Profile was not saved." };
  return { profile: { ...data, avatar_type: data.avatar_type ?? "artist_cat" } as Profile };
}

export async function updateNotificationPreference(
  userId: string,
  wants: boolean,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({
      wants_update_email: wants,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("id")
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return { error: "Notification preference was not saved." };
  return {};
}
