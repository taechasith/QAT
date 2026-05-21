import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type HomepageSettings = {
  upcomingTitle: string;
  emptyState: string;
};

export type SiteOgSettings = {
  imageUrl: string;
  description: string;
};

const defaultHomepageSettings: HomepageSettings = {
  upcomingTitle: "Upcoming events and projects",
  emptyState: "New content will appear here once published.",
};

const defaultOgSettings: SiteOgSettings = {
  imageUrl: "",
  description:
    "A CreativeLabTH Group initiative connecting quantum science, art, and public imagination.",
};

export async function getHomepageSettings(): Promise<HomepageSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "homepage")
      .maybeSingle();

    if (error || !data?.value) return defaultHomepageSettings;
    return {
      ...defaultHomepageSettings,
      ...(data.value as Partial<HomepageSettings>),
    };
  } catch {
    return defaultHomepageSettings;
  }
}

export async function getOgSettings(): Promise<SiteOgSettings> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "og")
      .maybeSingle();

    if (error || !data?.value) return defaultOgSettings;
    return {
      ...defaultOgSettings,
      ...(data.value as Partial<SiteOgSettings>),
    };
  } catch {
    return defaultOgSettings;
  }
}

export async function saveSettings(key: string, value: Record<string, unknown>) {
  const db = createAdminClient();
  const { error } = await db
    .from("site_settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}
