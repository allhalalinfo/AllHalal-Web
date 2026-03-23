import { NextResponse } from "next/server";

const FETCH_TIMEOUT_MS = 18_000;

function isAllowedRemoteUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" && u.protocol !== "http:") {
      return false;
    }
    if (u.username || u.password) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/** When CDN sends application/octet-stream but body is a known raster format. */
function sniffImageContentType(buffer: ArrayBuffer): string | null {
  if (buffer.byteLength < 12) {
    return null;
  }
  const u = new Uint8Array(buffer.slice(0, 12));
  if (u[0] === 0xff && u[1] === 0xd8 && u[2] === 0xff) {
    return "image/jpeg";
  }
  if (u[0] === 0x89 && u[1] === 0x50 && u[2] === 0x4e && u[3] === 0x47) {
    return "image/png";
  }
  if (u[0] === 0x47 && u[1] === 0x49 && u[2] === 0x46) {
    return "image/gif";
  }
  if (u[0] === 0x52 && u[1] === 0x49 && u[2] === 0x46 && u[3] === 0x46) {
    const tag = new Uint8Array(buffer.slice(8, 12));
    const sig = String.fromCharCode(...tag);
    if (sig === "WEBP") {
      return "image/webp";
    }
  }
  return null;
}

function isNonImageContentType(ct: string): boolean {
  const lower = ct.toLowerCase();
  return (
    lower.includes("text/html") ||
    lower.includes("application/json") ||
    lower.includes("text/plain") ||
    lower.includes("application/xml")
  );
}

async function fetchUpstream(imageUrl: string, referer: string, signal: AbortSignal) {
  return fetch(imageUrl, {
    redirect: "follow",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: referer,
    },
    signal,
  });
}

/**
 * Fetch a remote image and stream it back with caching headers.
 * Used by `/api/image-proxy` (legacy query) and `/api/img/[token]` (path token — fewer adblock false positives).
 */
export async function respondWithProxiedImage(imageUrl: string): Promise<NextResponse> {
  if (!imageUrl || imageUrl.length > 8_000) {
    return NextResponse.json({ error: "Missing or invalid url parameter" }, { status: 400 });
  }

  if (!isAllowedRemoteUrl(imageUrl)) {
    return NextResponse.json({ error: "URL scheme not allowed" }, { status: 400 });
  }

  let originReferer = "https://allhalal.info/";
  try {
    originReferer = `${new URL(imageUrl).origin}/`;
  } catch {
    // keep default
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    let response = await fetchUpstream(imageUrl, originReferer, controller.signal);

    if (response.status === 403 || response.status === 401) {
      response = await fetchUpstream(imageUrl, "https://allhalal.info/", controller.signal);
    }
    if (response.status === 403 || response.status === 401) {
      response = await fetch(imageUrl, {
        redirect: "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        signal: controller.signal,
      });
    }

    if (!response.ok) {
      console.error(`Image fetch failed: ${imageUrl} - Status: ${response.status}`);
      return NextResponse.json(
        { error: `Upstream status ${response.status}` },
        { status: 502 },
      );
    }

    const declaredType = (response.headers.get("content-type") || "").split(";")[0].trim();
    const imageBuffer = await response.arrayBuffer();

    if (declaredType && isNonImageContentType(declaredType)) {
      console.error(`Image proxy non-image content-type: ${declaredType} for ${imageUrl.slice(0, 80)}`);
      return NextResponse.json({ error: "Upstream returned non-image" }, { status: 502 });
    }

    let contentType = declaredType || "image/jpeg";
    if (!contentType.toLowerCase().startsWith("image/")) {
      const sniffed = sniffImageContentType(imageBuffer);
      if (sniffed) {
        contentType = sniffed;
      } else {
        return NextResponse.json({ error: "Unknown binary format" }, { status: 502 });
      }
    }

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    console.error("Failed URL:", imageUrl.slice(0, 120));
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  } finally {
    clearTimeout(timeoutId);
  }
}
