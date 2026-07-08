import { createClient } from "./client";
import {
  ADMIN_MEDIA_MAX_UPLOAD_BYTES,
  ADMIN_MEDIA_MAX_UPLOAD_MB,
  fileTooLargeMessage,
} from "@/lib/upload-limits";

const OPTIMIZED_IMAGE_MAX_DIMENSION = 3840;
const OPTIMIZED_IMAGE_QUALITY = 0.86;
const IMAGE_OPTIMIZATION_THRESHOLD_BYTES = 2 * 1024 * 1024;

const OPTIMIZABLE_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function fileNameWithoutExtension(name: string) {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

function isOptimizableImage(file: File) {
  return OPTIMIZABLE_IMAGE_TYPES.has(file.type);
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not prepare image for upload."));
    };

    image.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not optimize image for upload."));
        }
      },
      "image/webp",
      OPTIMIZED_IMAGE_QUALITY,
    );
  });
}

async function optimizeImageForUpload(file: File) {
  if (!isOptimizableImage(file) || typeof document === "undefined") {
    return file;
  }

  const image = await loadImage(file);
  const largestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const shouldResize = largestSide > OPTIMIZED_IMAGE_MAX_DIMENSION;
  const shouldReencode = file.size > IMAGE_OPTIMIZATION_THRESHOLD_BYTES;

  if (!shouldResize && !shouldReencode) {
    return file;
  }

  const scale = shouldResize ? OPTIMIZED_IMAGE_MAX_DIMENSION / largestSide : 1;
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    return file;
  }

  context.drawImage(image, 0, 0, width, height);
  const blob = await canvasToBlob(canvas);

  if (blob.size >= file.size && file.size <= ADMIN_MEDIA_MAX_UPLOAD_BYTES) {
    return file;
  }

  return new File([blob], `${fileNameWithoutExtension(file.name)}.webp`, {
    type: "image/webp",
    lastModified: file.lastModified,
  });
}

export async function clientUploadMedia(file: File): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = createClient();
    const uploadFile = await optimizeImageForUpload(file);

    if (uploadFile.size > ADMIN_MEDIA_MAX_UPLOAD_BYTES) {
      return { error: fileTooLargeMessage(ADMIN_MEDIA_MAX_UPLOAD_MB) };
    }

    // Verify browser session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return { error: "Not authenticated. Please log in again." };
    }

    const ext = uploadFile.name.split(".").pop() ?? "bin";
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from("qat-media")
      .upload(path, uploadFile, { contentType: uploadFile.type, upsert: false });

    if (error) {
      return { error: error.message };
    }

    const { data } = supabase.storage.from("qat-media").getPublicUrl(path);
    return { url: data.publicUrl };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Upload failed" };
  }
}
