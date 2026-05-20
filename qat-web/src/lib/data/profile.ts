import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  wants_update_email: boolean;
};

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, avatar_url, wants_update_email")
    .eq("id", userId)
    .maybeSingle();
  return data as Profile | null;
}

export async function upsertProfile(
  userId: string,
  email: string,
): Promise<void> {
  const supabase = await createClient();
  await supabase.from("profiles").upsert(
    { id: userId, email },
    { onConflict: "id", ignoreDuplicates: true },
  );
}

export async function updateNotificationPreference(
  userId: string,
  wants: boolean,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({ wants_update_email: wants })
    .eq("id", userId);
  return error ? { error: error.message } : {};
}
