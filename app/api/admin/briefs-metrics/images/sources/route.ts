import { NextResponse } from "next/server";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://api.allhalal.info").replace(/\/$/, "");

export async function GET() {
  const url = `${API_BASE}/api/v1/briefs/metrics/images/sources`;
  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to reach source metrics API" },
      { status: 502 }
    );
  }
}
