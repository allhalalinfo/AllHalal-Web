import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_CUSTOM_COOKIE, verifyAdminCustomToken } from "@/lib/adminCustomSession";
import { proxyCreateArticle } from "@/lib/customArticlesWriteProxy";
import { revalidateAfterArticleChange } from "@/lib/revalidation";
import { notifyArticleChange } from "@/lib/indexnow";

async function requireAuth(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(ADMIN_CUSTOM_COOKIE)?.value;
  return verifyAdminCustomToken(t);
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const upstream = await proxyCreateArticle(body);
  const text = await upstream.text();
  if (!upstream.ok) {
    return NextResponse.json(
      {
        error: "Upstream rejected the request",
        status: upstream.status,
        detail: text.slice(0, 2000),
      },
      { status: 502 },
    );
  }

  let responseData: any;
  try {
    responseData = text ? JSON.parse(text) : { ok: true };
  } catch {
    responseData = { ok: true, raw: text };
  }

  // Extract article ID from response (common patterns: id, article_id, slug, title)
  const articleId = 
    responseData?.id || 
    responseData?.article_id || 
    responseData?.slug ||
    (body && typeof body === 'object' && 'id' in body ? body.id : undefined);

  // Trigger automatic revalidation and indexing in background
  // Don't await - let it run async to not slow down the response
  if (articleId) {
    Promise.all([
      revalidateAfterArticleChange(String(articleId)),
      notifyArticleChange(String(articleId), 'created'),
    ]).catch(error => {
      console.error('Background indexing tasks failed:', error);
    });
  } else {
    // If no article ID, at least revalidate sitemap
    revalidateAfterArticleChange().catch(error => {
      console.error('Background revalidation failed:', error);
    });
  }

  return NextResponse.json(responseData);
}
