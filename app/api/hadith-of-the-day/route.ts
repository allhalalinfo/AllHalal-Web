import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language") || "en";

  try {
    const backendUrl = new URL("https://api.allhalal.info/api/v1/hadith/of-the-day");
    backendUrl.searchParams.set("language", language);

    const res = await fetch(backendUrl.toString(), {
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
    console.error("Hadith proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch hadith of the day from backend" },
      { status: 500 }
    );
  }
}
