import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_CUSTOM_COOKIE, verifyAdminCustomToken } from "@/lib/adminCustomSession";
import { proxyCreateArticle } from "@/lib/customArticlesWriteProxy";

async function requireAuth(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(ADMIN_CUSTOM_COOKIE)?.value;
  return verifyAdminCustomToken(t);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const upstream = await proxyCreateArticle(body);
  const text = await upstream.text();
  if (!upstream.ok) {
    return NextResponse.json(
      {
        error: "Upstream rejected the request",
        status: upstream.status,
        detail: text.slice(0, 2000),
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
