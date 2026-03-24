import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_CUSTOM_COOKIE = "ah_custom_admin";

/** Session lifetime (seconds). */
export const ADMIN_CUSTOM_MAX_AGE = 60 * 60 * 24 * 7;

export function createAdminCustomToken(): string {
  const secret = process.env.ADMIN_CUSTOM_SESSION_SECRET;
  if (!secret?.trim()) {
    throw new Error("ADMIN_CUSTOM_SESSION_SECRET is not set");
  }
  const exp = Math.floor(Date.now() / 1000) + ADMIN_CUSTOM_MAX_AGE;
  const sig = createHmac("sha256", secret).update(String(exp)).digest("hex");
  return `${exp}.${sig}`;
}

export function verifyAdminCustomToken(token: string | undefined): boolean {
  const secret = process.env.ADMIN_CUSTOM_SESSION_SECRET?.trim();
  if (!secret || !token) {
    return false;
  }
  const parts = token.split(".");
  if (parts.length !== 2) {
    return false;
  }
  const [expStr, sig] = parts;
  const exp = parseInt(expStr, 10);
  if (Number.isNaN(exp) || Date.now() / 1000 > exp) {
    return false;
  }
  const expected = createHmac("sha256", secret).update(expStr).digest("hex");
  if (sig.length !== expected.length) {
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminCustomAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(ADMIN_CUSTOM_COOKIE)?.value;
  return verifyAdminCustomToken(t);
}
