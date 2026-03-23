"use client";

import Link from "next/link";
import React from "react";
import { formatTimeAgo } from "@/lib/briefs";
import { proxiedImageSrc } from "@/lib/proxiedImageUrl";
import type { CustomArticle } from "@/types/customArticle";

export default function CustomArticleGridCard({
  article,
  locale,
  priority = false,
}: {
  article: CustomArticle;
  locale: string;
  priority?: boolean;
}) {
  const href = `/${locale}/read/${encodeURIComponent(article.id)}`;
  const rawUrl = article.image_url ?? "";
  const isExternalHttp =
    rawUrl.startsWith("https://") || rawUrl.startsWith("http://");
  const [imageError, setImageError] = React.useState(false);
  const [fallbackToDirect, setFallbackToDirect] = React.useState(false);
  const imageSrc =
    isExternalHttp && !fallbackToDirect ? proxiedImageSrc(rawUrl) : article.image_url;
  const showImage = Boolean(rawUrl) && !imageError && Boolean(imageSrc);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.55rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-3 shadow-[0_12px_30px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)] sm:p-4"
    >
      <div className="relative aspect-[1.7/1] overflow-hidden rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)]">
        {showImage ? (
          <img
            key={fallbackToDirect ? "direct" : "proxy"}
            src={imageSrc!}
            alt={article.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full min-w-0 object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ width: "100%", maxWidth: "100%" }}
            onError={() => {
              if (isExternalHttp && !fallbackToDirect) {
                setFallbackToDirect(true);
              } else {
                setImageError(true);
              }
            }}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(145deg,rgba(241,235,226,0.96),rgba(255,255,255,0.92))] text-center text-sm font-semibold text-[#28414C]/70"
            aria-hidden
          >
            Editorial
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem] text-text-muted">
          <span className="font-medium text-text-secondary">{article.category}</span>
          <span aria-hidden="true">•</span>
          <time dateTime={article.published_at}>
            {formatTimeAgo(article.published_at)}
          </time>
          {article.author ? (
            <>
              <span aria-hidden="true">•</span>
              <span>{article.author}</span>
            </>
          ) : null}
        </div>

        <h3 className="mt-2 line-clamp-3 text-[1.1rem] font-bold leading-tight text-text-primary transition-colors duration-300 group-hover:text-primary">
          {article.title}
        </h3>

        {article.dek ? (
          <p className="mt-2 line-clamp-none sm:line-clamp-3 text-[0.9rem] font-medium leading-relaxed text-text-secondary">
            {article.dek}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
