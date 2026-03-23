import { Buffer } from "node:buffer";
import type { NextRequest } from "next/server";
import { respondWithProxiedImage } from "@/lib/server/proxyRemoteImage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 25;

function decodeProxiedImageToken(token: string): string | null {
  try {
    const normalized = token.trim();
    if (!normalized) {
      return null;
    }
    const padded = normalized.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (padded.length % 4)) % 4;
    const b64 = padded + "=".repeat(padLen);
    return Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const imageUrl = decodeProxiedImageToken(token);

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return respondWithProxiedImage(imageUrl);
}
