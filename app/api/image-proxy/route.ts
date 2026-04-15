import { NextRequest } from "next/server";
import { respondWithProxiedImage } from "@/lib/server/proxyRemoteImage";

// 🔧 OPTIMIZATION (Phase 2): Use Edge Runtime for maximum CDN distribution
// Legacy endpoint (/api/image-proxy?url=...) - prefer /api/img/[token] for better caching
export const runtime = "edge";

// 🔧 OPTIMIZATION (Phase 2): Enable ISR caching (7 days)
// Previously had force-dynamic (WORST for CDN caching!)
// Now with Edge Runtime + ISR, CDN caches responses globally
export const revalidate = 604800; // 7 days

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Missing or invalid url parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return respondWithProxiedImage(imageUrl);
}
