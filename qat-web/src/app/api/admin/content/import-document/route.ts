import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/auth/admin";
import { importDocx, importPlainText } from "@/lib/document-import";
import {
  ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_BYTES,
  ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_MB,
  fileTooLargeMessage,
} from "@/lib/upload-limits";

export const runtime = "nodejs";

function extensionFromName(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: fileTooLargeMessage(ADMIN_DOCUMENT_IMPORT_MAX_UPLOAD_MB) },
      { status: 400 },
    );
  }

  const ext = extensionFromName(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    if (ext === "docx") {
      const imported = await importDocx(buffer, createAdminClient());
      return NextResponse.json(imported);
    }

    if (ext === "md" || ext === "markdown" || ext === "txt") {
      return NextResponse.json(importPlainText(buffer.toString("utf8")));
    }

    return NextResponse.json(
      { error: "Upload a .docx file, or a Markdown/text file. Export Google Docs as Word (.docx) first." },
      { status: 400 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not import this document." },
      { status: 400 },
    );
  }
}
