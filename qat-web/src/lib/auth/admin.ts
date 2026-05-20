import { env } from "@/lib/env";

export function isAdminEmail(email: string | null | undefined) {
  if (!email) {
    return false;
  }

  return env.adminEmails.includes(email.trim().toLowerCase());
}

export function assertAdminEmail(email: string | null | undefined) {
  if (!isAdminEmail(email)) {
    throw new Error("Admin access is required.");
  }
}
