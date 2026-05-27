"use client";

import Image from "next/image";
import { CatAvatar, type CatType } from "./CatAvatar";
import type { AvatarType } from "@/lib/data/profile";

const CAT_TYPES: CatType[] = ["artist_cat", "technologist_cat", "scientist_cat"];

export function ProfileAvatarDisplay({
  avatarType,
  avatarUrl,
  size = 72,
}: {
  avatarType: AvatarType;
  avatarUrl: string | null;
  size?: number;
}) {
  if (avatarType === "upload" && avatarUrl) {
    return (
      <Image
        src={avatarUrl}
        alt="Profile"
        width={size}
        height={size}
        className="rounded-full object-cover ring-2 ring-primary/30"
        style={{ width: size, height: size }}
      />
    );
  }

  if ((CAT_TYPES as string[]).includes(avatarType)) {
    return (
      <div className="rounded-full ring-2 ring-primary/30 overflow-hidden" style={{ width: size, height: size }}>
        <CatAvatar type={avatarType as CatType} size={size} />
      </div>
    );
  }

  // Fallback
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white/10 ring-2 ring-white/15 text-2xl"
      style={{ width: size, height: size }}
    >
      👤
    </div>
  );
}
