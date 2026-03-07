import { NextResponse } from "next/server";
import { getAggregatedNews } from "@/lib/newsFeed";
import type { NewsCategory } from "@/lib/newsSources";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as NewsCategory | null;
  const safeOnly = searchParams.get("safeOnly") === "true";
  const requestedLimit = parseInt(searchParams.get("limit") || "20", 10);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 50) : 20;
  const bypassCache = searchParams.get("_t") !== null;

  try {
    const items = await getAggregatedNews({
      category: category || undefined,
      safeOnly,
      limit,
      bypassCache,
    });

    return NextResponse.json({
      status: "success",
      data: items,
      cached: !bypassCache,
    });
  } catch (error) {
    console.error("RSS Feed Aggregation Error:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to aggregate news" },
      { status: 500 }
    );
  }
}
