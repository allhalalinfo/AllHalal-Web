"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CUSTOM_ARTICLE_CATEGORIES,
  CUSTOM_ARTICLE_CONTENT_TYPES,
  CUSTOM_ARTICLE_STATUSES,
} from "@/data/customArticleConstants";
import type { CustomArticle } from "@/types/customArticle";

function toDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-border bg-bg-primary px-4 py-2.5 text-text-primary outline-none focus:border-primary/40";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-text-muted";

export default function CustomArticleAdminEditor({
  locale,
  mode,
  initial,
}: {
  locale: string;
  mode: "create" | "edit";
  initial?: CustomArticle | null;
}) {
  const router = useRouter();
  const [id, setId] = useState(initial?.id ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [dek, setDek] = useState(initial?.dek ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [category, setCategory] = useState(initial?.category ?? "general");
  const [contentType, setContentType] = useState(initial?.content_type ?? "article");
  const [status, setStatus] = useState(initial?.status ?? "published");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [publishedLocal, setPublishedLocal] = useState(
    toDatetimeLocalValue(initial?.published_at ?? new Date().toISOString()),
  );
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const canEditId = mode === "create";

  const payload = useMemo(() => {
    const published_at = publishedLocal
      ? new Date(publishedLocal).toISOString()
      : new Date().toISOString();
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    return {
      id: id.trim(),
      title: title.trim(),
      dek: dek.trim(),
      content: content.trim() || undefined,
      image_url: imageUrl.trim() || null,
      category: category.trim() || "general",
      content_type: contentType.trim() || "article",
      status: status.trim() || "published",
      featured: featured || undefined,
      tags: tagList.length ? tagList : undefined,
      author: author.trim() || null,
      published_at,
      updated_at: new Date().toISOString(),
    };
  }, [id, title, dek, content, imageUrl, category, tags, author, publishedLocal]);

  async function onUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) {
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/custom-articles/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(
          typeof data.message === "string"
            ? data.message
            : typeof data.detail === "string"
              ? data.detail.slice(0, 400)
              : `Upload failed (${res.status}). Paste an image URL or configure the server /upload endpoint.`,
        );
        return;
      }
      const url = (data.url ?? data.image_url ?? data.publicUrl) as string | undefined;
      if (url) {
        setImageUrl(url);
        setMessage("Image URL filled from upload.");
      } else {
        setMessage("Upload OK but no URL in response — check API returns { url } or { image_url }.");
      }
    } catch {
      setMessage("Upload network error.");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!payload.id || !payload.title) {
      setMessage("id and title are required.");
      return;
    }
    setLoading(true);
    try {
      const url =
        mode === "create"
          ? "/api/admin/custom-articles"
          : `/api/admin/custom-articles/${encodeURIComponent(initial!.id)}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(
          typeof data.detail === "string"
            ? data.detail.slice(0, 600)
            : typeof data.error === "string"
              ? data.error
              : `Save failed (${res.status}). Does the server implement ${method} on /articles?`,
        );
        return;
      }
      router.push(`/${locale}/admin/custom-articles`);
      router.refresh();
    } catch {
      setMessage("Network error while saving.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={`/${locale}/admin/custom-articles`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← Back to list
        </Link>
        {mode === "edit" && initial ? (
          <Link
            href={`/${locale}/read/${encodeURIComponent(initial.id)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-text-secondary hover:text-text-primary"
          >
            Open public page ↗
          </Link>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          id (slug, URL-safe)
          <input
            className={inputClass}
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={!canEditId}
            placeholder="my-article-slug"
            required
          />
        </label>
        <label className={labelClass}>
          category
          <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            {CUSTOM_ARTICLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <label className={labelClass}>
          content type
          <select className={inputClass} value={contentType} onChange={(e) => setContentType(e.target.value)}>
            {CUSTOM_ARTICLE_CONTENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          status
          <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
            {CUSTOM_ARTICLE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-end pb-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="mr-2 h-5 w-5 rounded border-border"
          />
          <span className="text-sm font-bold text-text-primary">Featured on home</span>
        </label>
      </div>

      <label className={labelClass}>
        title
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label className={labelClass}>
        dek (card summary)
        <textarea
          className={`${inputClass} min-h-[5rem] resize-y`}
          value={dek}
          onChange={(e) => setDek(e.target.value)}
          rows={3}
        />
      </label>

      <div>
        <span className={labelClass}>Cover image</span>
        <input
          className={inputClass}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://…"
        />
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <label className="cursor-pointer text-sm font-semibold text-primary hover:underline">
            {uploading ? "Uploading…" : "Upload file"}
            <input type="file" accept="image/*" className="sr-only" onChange={onUploadFile} disabled={uploading} />
          </label>
          <span className="text-xs text-text-muted">Requires POST /upload on API (see docs).</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          tags (comma-separated)
          <input className={inputClass} value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
        <label className={labelClass}>
          author
          <input className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
      </div>

      <label className={labelClass}>
        published_at (local)
        <input
          type="datetime-local"
          className={inputClass}
          value={publishedLocal}
          onChange={(e) => setPublishedLocal(e.target.value)}
        />
      </label>

      <label className={labelClass}>
        content (HTML — trusted, sanitized on read)
        <textarea
          className={`${inputClass} min-h-[20rem] font-mono text-sm`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
        />
        <p className="mt-2 text-xs text-text-muted">
          Safe HTML tags allowed: p, h2, h3, ul, ol, li, a, strong, em, img, blockquote, code, pre, table, tr, td,
          th. For galleries: wrap multiple &lt;img&gt; in a &lt;div class="gallery"&gt;.
        </p>
      </label>

      {message ? (
        <p className="rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#173640] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#13303a] disabled:opacity-60"
        >
          {loading ? "Saving…" : mode === "create" ? "Publish to server" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
