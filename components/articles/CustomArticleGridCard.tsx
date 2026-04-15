"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { CustomArticle } from "@/types/customArticle";

/**
 * 🔧 OPTIMIZATION (Phase 2): Migrated from image proxy to Next.js Image
 * - Before: All external images proxied through /api/img/[token] (dynamic route)
 * - After: Native Next.js Image with automatic optimization + CDN caching
 * - Saves 10-15% of Fast Origin Transfer
 */
export default function CustomArticleGridCard({
  article,
  locale,
  priority = false,
}: {
  article: CustomArticle;
  locale: string;
  priority?: boolean;
}) {
  const href = `/read/${encodeURIComponent(article.id)}`;
  const [imageError, setImageError] = React.useState(false);
  const showImage = Boolean(article.image_url) && !imageError;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[1.55rem] border border-[rgba(47,37,30,0.08)] bg-white/88 p-3 shadow-[0_12px_30px_rgba(43,34,24,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)] sm:p-4"
    >
      <div className="relative aspect-[1.7/1] overflow-hidden rounded-[1.2rem] border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.65)]">
        {showImage ? (
          <Image
            src={article.image_url!}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setImageError(true)}
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
        <h3 className="line-clamp-3 text-[1.1rem] font-bold leading-tight text-text-primary transition-colors duration-300 group-hover:text-primary">
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
