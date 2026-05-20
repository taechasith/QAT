import { createClient } from "@/lib/supabase/server";

const BUCKET = "qat-media";

export async function uploadMedia(file: File): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type,
  });

  if (error) return { error: error.message };

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl };
}
