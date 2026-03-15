import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.allhalal.info/api/v1/finance/nisab", {
      headers: {
        Accept: "application/json",
        "X-Source": "web",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Backend API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Nisab proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch Nisab data from backend" },
      { status: 500 }
    );
  }
}
