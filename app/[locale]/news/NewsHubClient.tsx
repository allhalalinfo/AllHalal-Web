"use client";

import { useEffect, useState } from "react";
import type { NewsCategory } from "@/lib/newsSources";
import type { NewsItem } from "@/lib/newsFeed";

const FILTERS = [
  { id: "all", label: "Latest" },
  { id: "Faith & Practice", label: "Faith" },
  { id: "Family & Education", label: "Family" },
  { id: "Halal Living", label: "Halal Living" },
  { id: "Islamic Finance", label: "Finance" },
  { id: "Health & Wellness", label: "Wellness" },
  { id: "Ummah & World", label: "Ummah & World" },
] as const;

export default function NewsHubClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [loading, setLoading] = useState(initialNews.length === 0);

  useEffect(() => {
    let ignore = false;

    if (activeFilter === "all" && initialNews.length > 0) {
      setNews(initialNews);
      setLoading(false);
      return () => {
        ignore = true;
      };
    }

    const fetchNews = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          limit: "18",
          _t: String(Date.now()),
        });

        if (activeFilter !== "all") {
          params.set("category", activeFilter);
        }

        const res = await fetch(`/api/news?${params.toString()}`);
        const json = await res.json();

        if (!ignore && json.status === "success") {
          setNews(json.data || []);
        }
      } catch (error) {
        if (!ignore) {
          setNews([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      ignore = true;
    };
  }, [activeFilter, initialNews]);

  return (
    <section className="rounded-[2rem] border border-border bg-white p-8 shadow-card">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary mb-3">
            Live Muslim News
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-3">
            Follow trusted Muslim publications in one place.
          </h2>
          <p className="text-text-secondary max-w-3xl leading-relaxed">
            Track faith, family, halal living, finance, wellness and wider Ummah coverage without leaving AllHalal.
          </p>
        </div>
        <div className="text-sm text-text-muted">
          Curated automatically for source quality, freshness and category balance.
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
              activeFilter === filter.id
                ? "bg-gradient-gold text-[#4A3319] border-primary/30"
                : "bg-bg-secondary text-text-primary border-border hover:border-primary/30"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5 animate-pulse">
              <div className="h-4 w-32 bg-gray-200 rounded mb-4" />
              <div className="h-6 w-full bg-gray-200 rounded mb-3" />
              <div className="h-4 w-full bg-gray-200 rounded mb-2" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : news.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-5 hover:bg-white hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {item.categories?.[0] && (
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.16em]">
                    {item.categories[0] as NewsCategory}
                  </span>
                )}
                <span className="text-[11px] font-bold text-text-secondary">{item.sourceName}</span>
              </div>
              <h3 className="text-lg font-bold text-text-primary leading-snug mb-3 line-clamp-3">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed line-clamp-4 mb-4">
                {item.excerpt}
              </p>
              <span className="text-sm font-bold text-primary">Open source article →</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-[1.5rem] border border-border bg-bg-secondary/50 p-6 text-text-secondary">
          No articles are available right now for this category.
        </div>
      )}
    </section>
  );
}
