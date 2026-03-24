import "server-only";

import { getCustomArticlesApiBase } from "@/lib/customArticles";

function writeHeaders(extra?: HeadersInit): Headers {
  const h = new Headers(extra);
  const token = process.env.CUSTOM_ARTICLES_WRITE_TOKEN?.trim();
  if (token) {
    h.set("Authorization", `Bearer ${token}`);
  }
  return h;
}

export async function proxyCreateArticle(body: unknown) {
  const base = getCustomArticlesApiBase();
  return fetch(`${base}/articles`, {
    method: "POST",
    headers: writeHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
}

export async function proxyUpdateArticle(id: string, body: unknown) {
  const base = getCustomArticlesApiBase();
  const safe = encodeURIComponent(id);
  return fetch(`${base}/articles/${safe}`, {
    method: "PUT",
    headers: writeHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
}

export async function proxyDeleteArticle(id: string) {
  const base = getCustomArticlesApiBase();
  const safe = encodeURIComponent(id);
  return fetch(`${base}/articles/${safe}`, {
    method: "DELETE",
    headers: writeHeaders(),
  });
}

export async function proxyUploadImage(formData: FormData) {
  const base = getCustomArticlesApiBase();
  const token = process.env.CUSTOM_ARTICLES_WRITE_TOKEN?.trim();
  if (!token) {
    return null;
  }
  return fetch(`${base}/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
}
