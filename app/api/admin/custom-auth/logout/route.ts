import { NextResponse } from "next/server";
import { ADMIN_CUSTOM_COOKIE } from "@/lib/adminCustomSession";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_CUSTOM_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
