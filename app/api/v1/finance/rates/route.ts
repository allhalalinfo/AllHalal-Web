import { NextResponse } from "next/server";

const BACKEND_BASE_URL = (process.env.ALLHALAL_API_BASE_URL || "https://api.allhalal.info").replace(
  /\/$/,
  ""
);
const DEFAULT_SYMBOLS = ["EUR", "GBP", "SAR", "AED", "TRY", "MYR"];
const FALLBACK_USD_RATES: Record<string, number> = {
  EUR: 0.92,
  GBP: 0.79,
  SAR: 3.75,
  AED: 3.67,
  TRY: 32.18,
  MYR: 4.71,
};

function buildFallbackPayload(base: string, symbols: string[]) {
  const timestamp = Date.now() / 1000;

  return {
    success: true,
    base,
    rates: symbols.reduce<Record<string, number>>((accumulator, symbol) => {
      const rate = FALLBACK_USD_RATES[symbol];
      if (typeof rate === "number") {
        accumulator[symbol] = rate;
      }
      return accumulator;
    }, {}),
    timestamp,
    cached: false,
    age_hours: 0,
    fallback: true,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = (searchParams.get("base") || "USD").trim().toUpperCase();
  const requestedSymbols = (searchParams.get("symbols") || DEFAULT_SYMBOLS.join(","))
    .split(",")
    .map((symbol) => symbol.trim().toUpperCase())
    .filter(Boolean);
  const symbols = [...new Set(requestedSymbols)];
  const upstreamUrl = new URL(`${BACKEND_BASE_URL}/api/v1/finance/rates`);

  upstreamUrl.searchParams.set("base", base);
  upstreamUrl.searchParams.set("symbols", symbols.join(","));

  try {
    const response = await fetch(upstreamUrl.toString(), {
      headers: {
        Accept: "application/json",
        "X-Source": "allhalal-web",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      throw new Error(`Finance upstream returned ${response.status}`);
    }

    const payload = await response.json();

    return NextResponse.json(
      {
        ...payload,
        fallback: false,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=900, stale-while-revalidate=3600",
        },
      }
    );
  } catch (error) {
    console.error("Finance proxy failed, serving fallback snapshot:", error);

    if (base !== "USD") {
      return NextResponse.json(
        {
          success: false,
          base,
          rates: {},
          message: "Finance data is temporarily unavailable.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(buildFallbackPayload(base, symbols), {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
