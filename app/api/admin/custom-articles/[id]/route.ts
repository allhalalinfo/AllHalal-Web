import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_CUSTOM_COOKIE, verifyAdminCustomToken } from "@/lib/adminCustomSession";
import { proxyDeleteArticle, proxyUpdateArticle } from "@/lib/customArticlesWriteProxy";
import { revalidateAfterArticleChange } from "@/lib/revalidation";
import { notifyArticleChange } from "@/lib/indexnow";

async function requireAuth(): Promise<boolean> {
  const jar = await cookies();
  const t = jar.get(ADMIN_CUSTOM_COOKIE)?.value;
  return verifyAdminCustomToken(t);
}

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const articleId = decodeURIComponent(id);
  const upstream = await proxyUpdateArticle(articleId, body);
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

  // Trigger automatic revalidation and indexing in background
  Promise.all([
    revalidateAfterArticleChange(articleId),
    notifyArticleChange(articleId, 'updated'),
  ]).catch(error => {
    console.error('Background indexing tasks failed:', error);
  });

  return NextResponse.json(responseData);
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  if (!id?.trim()) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const articleId = decodeURIComponent(id);
  const upstream = await proxyDeleteArticle(articleId);
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

  // Trigger automatic revalidation and indexing in background
  Promise.all([
    revalidateAfterArticleChange(articleId),
    notifyArticleChange(articleId, 'deleted'),
  ]).catch(error => {
    console.error('Background indexing tasks failed:', error);
  });

  return NextResponse.json(responseData);
}
