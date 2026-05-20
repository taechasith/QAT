import { createClient } from "@/lib/supabase/server";

export type Achievement = {
  id: string;
  item_id: string;
  item_type: "game" | "course";
};

export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_achievements")
    .select("id, item_id, item_type")
    .eq("user_id", userId);
  return (data ?? []) as Achievement[];
}

export async function addAchievement(
  userId: string,
  itemId: string,
  itemType: "game" | "course",
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_achievements")
    .insert({ user_id: userId, item_id: itemId, item_type: itemType });
  return error ? { error: error.message } : {};
}

export async function removeAchievement(
  userId: string,
  itemId: string,
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("user_achievements")
    .delete()
    .eq("user_id", userId)
    .eq("item_id", itemId);
  return error ? { error: error.message } : {};
}
