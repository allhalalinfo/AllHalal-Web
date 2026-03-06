"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { NewsCategory } from "@/lib/newsSources";

interface NewsItem {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  publishedAt: string;
  excerpt: string;
  imageUrl: string | null;
  categories: NewsCategory[];
  fallbackGradient?: string;
}

export default function NewsFeedWidget({ locale }: { locale: string }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?safeOnly=true&limit=6&_t=' + Date.now());
        const json = await res.json();
        if (json.status === 'success') {
          setNews(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const featuredPost = news.length > 0 ? news[0] : null;
  const listPosts = news.length > 1 ? news.slice(1, 6) : [];

  return (
    <div className="bg-white rounded-[2rem] p-8 h-full shadow-card border border-border flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-bold font-display text-text-primary mb-1">Today's Highlights</h3>
          <p className="text-text-secondary text-sm">Curated feed from trusted sources</p>
        </div>
        <Link href={`/${locale}/news`} className="text-primary font-bold text-sm hover:underline shrink-0">
          View All &rarr;
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {loading ? (
          // Skeletons
          <div className="animate-pulse space-y-6">
            <div className="w-full h-48 rounded-2xl bg-gray-200" />
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : featuredPost ? (
          <>
            {/* Featured Post (Top 1) */}
            <a 
              href={featuredPost.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="aspect-[2/1] sm:aspect-[2.5/1] w-full bg-neutral-100 relative">
                {featuredPost.imageUrl ? (
                  <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${featuredPost.fallbackGradient || 'from-gray-700 to-gray-900'} flex items-center justify-center`}>
                    <span className="text-6xl text-white/20 font-display font-black">
                      {featuredPost.sourceName.charAt(0)}
                    </span>
                  </div>
                )}
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {featuredPost.categories?.[0] && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-accent-yellow text-black">
                      {featuredPost.categories[0]}
                    </span>
                  )}
                  <span className="text-xs font-bold text-white/90 drop-shadow-md">{featuredPost.sourceName}</span>
                  <span className="text-xs text-white/70">• {timeAgo(featuredPost.publishedAt)}</span>
                </div>
                <h4 className="font-bold text-white text-lg sm:text-xl leading-tight drop-shadow-md group-hover:text-accent-yellow transition-colors line-clamp-2">
                  {featuredPost.title}
                </h4>
              </div>
            </a>

            {/* List Posts (Next 5) */}
            <div className="space-y-1">
              {listPosts.map((item) => (
                <a 
                  key={item.id} 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex gap-4 p-3 -mx-3 rounded-2xl hover:bg-bg-secondary transition-colors items-start"
                >
                  <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden flex items-center justify-center relative shadow-sm">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.fallbackGradient || 'from-gray-200 to-gray-300'} flex items-center justify-center`}>
                        <span className="text-2xl text-white/70 font-display font-bold">
                          {item.sourceName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 py-0.5">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {item.categories?.[0] && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/5 text-text-secondary">
                          {item.categories[0]}
                        </span>
                      )}
                      <div className="text-[10px] font-bold text-primary">{item.sourceName}</div>
                      <div className="text-[10px] text-text-muted">• {timeAgo(item.publishedAt)}</div>
                    </div>
                    <h4 className="font-bold text-text-primary text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-text-muted">
            No updates available right now.
          </div>
        )}
      </div>
    </div>
  );
}
