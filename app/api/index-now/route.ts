import { NextRequest, NextResponse } from "next/server";
import { collectSiteUrlsForIndexNow, submitToIndexNow } from "@/lib/indexnow";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.INDEXNOW_API_SECRET;
  if (!secret) {
    // Secret not configured — allow (same as previous workflow behaviour).
    return true;
  }

  const header = request.headers.get("authorization") || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const querySecret = request.nextUrl.searchParams.get("secret") || "";
  return bearer === secret || querySecret === secret;
}

export async function GET() {
  return NextResponse.json({
    message: "IndexNow API endpoint. Use POST to submit URLs.",
    usage: {
      all: "POST /api/index-now",
      custom: 'POST /api/index-now  { "urls": ["https://allhalal.info/is-it-halal"] }',
      auth: "Optional Authorization: Bearer $INDEXNOW_API_SECRET",
    },
  });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.INDEXNOW_KEY) {
    return NextResponse.json(
      { success: false, error: "INDEXNOW_KEY is not configured on the server" },
      { status: 500 },
    );
  }

  try {
    let customUrls: string[] | undefined;
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const body = (await request.json().catch(() => null)) as { urls?: string[] } | null;
      if (Array.isArray(body?.urls) && body.urls.length > 0) {
        customUrls = body.urls;
      }
    }

    const candidateUrls = customUrls?.length
      ? customUrls
      : await collectSiteUrlsForIndexNow();
    const result = await submitToIndexNow(candidateUrls);

    return NextResponse.json(
      {
        success: result.ok,
        submitted: result.submitted,
        status: result.status,
        detail: result.detail,
        sample: candidateUrls.slice(0, 8),
        totalCandidates: candidateUrls.length,
      },
      { status: result.ok ? 200 : 502 },
    );
  } catch (error) {
    console.error("IndexNow API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "IndexNow submission failed",
      },
      { status: 500 },
    );
  }
}
