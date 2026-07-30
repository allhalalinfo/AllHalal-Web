/**
 * IndexNow API Integration
 *
 * Instantly notifies search engines (Bing, Yandex, Seznam, Naver; Google via partners)
 * about new/updated URLs. Docs: https://www.indexnow.org/documentation
 */

interface IndexNowSubmission {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export type IndexNowResult = {
  ok: boolean;
  submitted: number;
  status: number;
  detail?: string;
};

const HOST = "allhalal.info";
const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
] as const;

function normalizeUrlList(urls: string[]): string[] {
  const base = process.env.NEXT_PUBLIC_SITE_URL || `https://${HOST}`;
  const seen = new Set<string>();
  const out: string[] = [];

  for (const raw of urls) {
    if (!raw?.trim()) continue;
    const full = raw.startsWith("http")
      ? raw.trim()
      : `${base}${raw.startsWith("/") ? raw : `/${raw}`}`;
    try {
      const u = new URL(full);
      if (u.hostname !== HOST && u.hostname !== `www.${HOST}`) continue;
      u.hash = "";
      const normalized = u.toString().replace(/\/$/, "") || `https://${HOST}`;
      if (seen.has(normalized)) continue;
      seen.add(normalized);
      out.push(normalized);
    } catch {
      // skip invalid
    }
  }

  return out.slice(0, 10000);
}

/**
 * Submits URLs to IndexNow endpoints. Returns aggregate success if any endpoint accepts.
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  const indexNowKey = process.env.INDEXNOW_KEY;

  if (!indexNowKey) {
    console.warn("INDEXNOW_KEY not set - skipping IndexNow submission");
    return { ok: false, submitted: 0, status: 0, detail: "INDEXNOW_KEY not set" };
  }

  const urlList = normalizeUrlList(urls);
  if (urlList.length === 0) {
    return { ok: false, submitted: 0, status: 0, detail: "No URLs to submit" };
  }

  const payload: IndexNowSubmission = {
    host: HOST,
    key: indexNowKey,
    keyLocation: `https://${HOST}/indexnow-key.txt`,
    urlList,
  };

  const body = JSON.stringify(payload);
  let lastStatus = 0;
  let lastDetail = "";
  let anyOk = false;

  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body,
      });
      lastStatus = response.status;
      if (response.ok || response.status === 202) {
        anyOk = true;
        console.log(`✓ IndexNow (${endpoint}): ${urlList.length} URL(s)`);
      } else {
        lastDetail = (await response.text()).slice(0, 200);
        console.error(`IndexNow failed ${endpoint}: ${response.status}`, lastDetail);
      }
    } catch (error) {
      lastDetail = error instanceof Error ? error.message : "Unknown error";
      console.error(`IndexNow error ${endpoint}:`, error);
    }
  }

  return {
    ok: anyOk,
    submitted: anyOk ? urlList.length : 0,
    status: lastStatus,
    detail: anyOk ? undefined : lastDetail,
  };
}

export async function submitUrlToIndexNow(pathOrUrl: string): Promise<IndexNowResult> {
  return submitToIndexNow([pathOrUrl]);
}

/**
 * Build the URL set used by POST /api/index-now.
 * Prefer the live sitemap XML so we stay in sync with what crawlers see.
 */
export async function collectSiteUrlsForIndexNow(): Promise<string[]> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || `https://${HOST}`;

  try {
    const res = await fetch(`${base}/sitemap.xml`, {
      cache: "no-store",
      signal: AbortSignal.timeout(20000),
    });
    if (res.ok) {
      const xml = await res.text();
      const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      const normalized = normalizeUrlList(locs);
      if (normalized.length > 0) return normalized;
    }
  } catch (error) {
    console.error("Failed to read live sitemap for IndexNow:", error);
  }

  // Fallback priority set if sitemap is unreachable mid-deploy
  const { halalItems } = await import("@/data/halalItems");
  return normalizeUrlList([
    `${base}/`,
    `${base}/is-it-halal`,
    `${base}/news`,
    `${base}/learn/islamic-calendar`,
    `${base}/boycott-checker`,
    `${base}/prayer-times`,
    `${base}/learn/duas`,
    `${base}/methodology`,
    `${base}/sitemap.xml`,
    ...halalItems.map((item) => `${base}/is-it-halal/${item.slug}`),
  ]);
}

export async function submitAllSiteUrlsToIndexNow(): Promise<IndexNowResult> {
  const urls = await collectSiteUrlsForIndexNow();
  return submitToIndexNow(urls);
}

export async function notifyArticleChange(
  articleId: string,
  action: "created" | "updated" | "deleted",
): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${HOST}`;
  const urls: string[] =
    action === "deleted"
      ? [`${baseUrl}/sitemap.xml`]
      : [`${baseUrl}/read/${articleId}`, `${baseUrl}/sitemap.xml`];

  await submitToIndexNow(urls);
  console.log(`Search engines notified: Article ${articleId} ${action}`);
}
