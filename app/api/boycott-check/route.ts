import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get("brand");

  if (!brand) {
    return NextResponse.json({ error: "Brand is required" }, { status: 400 });
  }

  try {
    const backendUrl = new URL("https://api.allhalal.info/api/v1/boycott/check");
    backendUrl.searchParams.set("brand", brand);

    const res = await fetch(backendUrl.toString(), {
      headers: {
        Accept: "application/json",
        "X-Source": "web",
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`Backend API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Boycott proxy error:", error);
    return NextResponse.json(
      { error: "Failed to check boycott data from backend" },
      { status: 500 }
    );
  }
}
