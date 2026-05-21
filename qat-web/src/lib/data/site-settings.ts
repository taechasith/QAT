import { createClient } from "@/lib/supabase/server";

export type HomepageSettings = {
  upcomingTitle: string;
  emptyState: string;
};

const defaultHomepageSettings: HomepageSettings = {
  upcomingTitle: "Upcoming events and projects",
  emptyState: "New content will appear here once published.",
};

export async function getHomepageSettings() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "homepage")
      .maybeSingle();

    if (error || !data?.value) {
      return defaultHomepageSettings;
    }

    return {
      ...defaultHomepageSettings,
      ...(data.value as Partial<HomepageSettings>),
    };
  } catch {
    return defaultHomepageSettings;
  }
}
