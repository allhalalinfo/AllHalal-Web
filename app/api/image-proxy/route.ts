import { NextRequest } from "next/server";
import { respondWithProxiedImage } from "@/lib/server/proxyRemoteImage";

export const runtime = "nodejs";
/** Do not cache this route at the framework level; we set Cache-Control on the response body. */
export const dynamic = "force-dynamic";
/** Vercel / Node serverless budget (seconds); requires plan that allows >10s if >10. */
export const maxDuration = 25;

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
