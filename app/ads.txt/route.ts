import { NextResponse } from "next/server";

const ADS_TXT_CONTENT = "google.com, pub-5317347727083675, DIRECT, f08c47fec0942fa0\n";

export async function GET() {
  return new NextResponse(ADS_TXT_CONTENT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
