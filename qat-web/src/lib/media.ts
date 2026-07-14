export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(url);
}

export function isNextImageOptimizable(url: string) {
  if (url.startsWith("/")) return true;

  try {
    const hostname = new URL(url).hostname;
    return hostname === "supabase.co" || hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}
