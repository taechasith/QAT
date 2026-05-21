import { createClient } from "./client";

export async function clientUploadMedia(file: File): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = createClient();

    // Verify browser session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return { error: "Not authenticated. Please log in again." };
    }

    const ext = file.name.split(".").pop() ?? "bin";
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("qat-media")
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) {
      return { error: error.message };
    }

    const { data } = supabase.storage.from("qat-media").getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}
