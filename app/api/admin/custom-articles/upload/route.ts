import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_CUSTOM_COOKIE, verifyAdminCustomToken } from "@/lib/adminCustomSession";
import { proxyUploadImage } from "@/lib/customArticlesWriteProxy";

async function requireAuth(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(ADMIN_CUSTOM_COOKIE)?.value;
  return verifyAdminCustomToken(t);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.CUSTOM_ARTICLES_WRITE_TOKEN?.trim()) {
    return NextResponse.json(
      {
        error: "NOT_CONFIGURED",
        message: "Set CUSTOM_ARTICLES_WRITE_TOKEN and implement POST /upload on the API (see docs/CUSTOM_ARTICLES_WRITE_API.md). You can paste an image URL manually until then.",
      },
      { status: 501 },
    );
  }

  const incoming = await request.formData();
  const file = incoming.get("file");
  if (!file || !(file instanceof Blob) || file.size === 0) {
    return NextResponse.json({ error: "Missing file field" }, { status: 400 });
  }

  const out = new FormData();
  out.append("file", file);

  const upstream = await proxyUploadImage(out);
  if (!upstream) {
    return NextResponse.json({ error: "Upload proxy unavailable" }, { status: 503 });
  }

  const text = await upstream.text();
  if (!upstream.ok) {
    return NextResponse.json(
      {
        error: "UPSTREAM_UPLOAD_FAILED",
        status: upstream.status,
        detail: text.slice(0, 2000),
        hint: "Implement POST {CUSTOM_ARTICLES_API_BASE}/upload on Ubuntu or use an external image URL.",
      },
      { status: 502 },
    );
  }

  try {
    return NextResponse.json(text ? JSON.parse(text) : { ok: true });
  } catch {
    return NextResponse.json({ ok: true, raw: text });
  }
}
