import { NextResponse } from "next/server";
import {
  ADMIN_CUSTOM_COOKIE,
  ADMIN_CUSTOM_MAX_AGE,
  createAdminCustomToken,
} from "@/lib/adminCustomSession";

export async function POST(request: Request) {
  const password = process.env.ADMIN_CUSTOM_DASHBOARD_PASSWORD?.trim();
  const secret = process.env.ADMIN_CUSTOM_SESSION_SECRET?.trim();
  if (!password || !secret) {
    return NextResponse.json(
      { error: "Admin dashboard is not configured (missing env vars)." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  let token: string;
  try {
    token = createAdminCustomToken();
  } catch {
    return NextResponse.json({ error: "Session misconfigured" }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_CUSTOM_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_CUSTOM_MAX_AGE,
  });
  return res;
}
