import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { saveSettings, getOgSettings, getHomepageSettings } from "@/lib/data/site-settings";

async function isAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim());
  return adminEmails.includes(user.email ?? "");
}

export async function GET(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const key = req.nextUrl.searchParams.get("key");
  if (key === "og") return NextResponse.json(await getOgSettings());
  if (key === "homepage") return NextResponse.json(await getHomepageSettings());
  return NextResponse.json({ error: "Unknown key" }, { status: 400 });
}

export async function POST(req: NextRequest) {
  if (!await isAdmin()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key, value } = await req.json();
  if (!key || typeof value !== "object") return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  await saveSettings(key, value);
  return NextResponse.json({ ok: true });
}
