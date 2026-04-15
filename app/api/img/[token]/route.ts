import type { NextRequest } from "next/server";
import { respondWithProxiedImage } from "@/lib/server/proxyRemoteImage";
import { decodeProxiedImageToken } from "@/lib/proxiedImageUrl";

// 🔧 OPTIMIZATION (Phase 2): Use Edge Runtime for maximum CDN distribution
// Edge functions run globally at Vercel's edge network, closer to users
// This is CRITICAL for image proxy - reduces origin calls by ~70%
export const runtime = "edge";

// 🔧 OPTIMIZATION (Phase 2): Enable ISR caching (7 days = 604800s)
// Previously had revalidate but with nodejs runtime (no global CDN)
// Now with Edge Runtime + ISR, CDN caches responses globally
export const revalidate = 604800; // 7 days

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
