import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") || "en";
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  try {
    const backendUrl = new URL("https://api.allhalal.info/api/v1/calendar/events");
    backendUrl.searchParams.set("language", language);
    if (lat) {
      backendUrl.searchParams.set("lat", lat);
    }
    if (lon) {
      backendUrl.searchParams.set("lon", lon);
    }

    const res = await fetch(backendUrl.toString(), {
      headers: {
        Accept: "application/json",
        "X-Source": "web",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`Backend API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Calendar events proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events from backend" },
      { status: 500 }
    );
  }
}
