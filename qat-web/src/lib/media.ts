export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(url);
}
