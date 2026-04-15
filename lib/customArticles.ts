import type {
  CustomArticle,
  CustomArticlesListResponse,
  CustomCategoriesResponse,
} from "@/types/customArticle";

export function getCustomArticlesApiBase(): string {
  const fromEnv =
    process.env.CUSTOM_ARTICLES_API_BASE?.trim() ||
    process.env.NEXT_PUBLIC_CUSTOM_ARTICLES_API_BASE?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return "https://api.allhalal.info/api/v1/custom";
}

async function fetchCustomJson<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  const base = getCustomArticlesApiBase();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: revalidateSeconds },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const text = await res.text();
    if (!text) {
      return null;
    }
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

function normalizeArticle(raw: Record<string, unknown>): CustomArticle | null {
  const id = String(raw.id ?? raw.slug ?? "").trim();
  const title = String(raw.title ?? "").trim();
  if (!id || !title) {
    return null;
  }
  return {
    id,
    title,
    dek: String(raw.dek ?? raw.summary ?? "").trim(),
    content: typeof raw.content === "string" ? raw.content : undefined,
    image_url: raw.image_url != null ? String(raw.image_url) : null,
    category: String(raw.category ?? "general").trim() || "general",
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : undefined,
    author: raw.author != null ? String(raw.author) : null,
    published_at: String(raw.published_at ?? new Date().toISOString()),
    updated_at: raw.updated_at != null ? String(raw.updated_at) : null,
  };
}

export async function fetchCustomArticlesList(options: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<CustomArticlesListResponse> {
  const page = Math.max(1, options.page ?? 1);
  // Backend API max limit is 100, enforce it here
  const limit = Math.min(100, Math.max(1, options.limit ?? 20));
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (options.category) {
    params.set("category", options.category);
  }

  // 🔧 OPTIMIZATION: Increased from 120s (2min) to 3600s (1 hour)
  // Articles update rarely, 1-hour cache reduces origin API calls by 95%+
  const data = await fetchCustomJson<Record<string, unknown>>(
    `/articles?${params.toString()}`,
    3600,
  );

  if (!data) {
    return { articles: [], total: 0, page, limit };
  }

  const rawList =
    (Array.isArray(data.articles) && data.articles) ||
    (Array.isArray(data.items) && data.items) ||
    [];

  const articles: CustomArticle[] = [];
  for (const item of rawList) {
    if (item && typeof item === "object") {
      const a = normalizeArticle(item as Record<string, unknown>);
      if (a) {
        articles.push(a);
      }
    }
  }

  const total =
    typeof data.total === "number"
      ? data.total
      : typeof data.count === "number"
        ? data.count
        : articles.length;

  return { articles, total, page, limit };
}

/** Admin list: bypass Next fetch cache for fresh data. */
export async function fetchCustomArticlesListUncached(options: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<CustomArticlesListResponse> {
  const page = Math.max(1, options.page ?? 1);
  // SEO FIX: Increased limit from 60 to 200 for sitemap generation
  const limit = Math.min(200, Math.max(1, options.limit ?? 60));
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (options.category) {
    params.set("category", options.category);
  }

  const base = getCustomArticlesApiBase();
  try {
    const res = await fetch(`${base}/articles?${params.toString()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return { articles: [], total: 0, page, limit };
    }
    const data = (await res.json()) as Record<string, unknown>;
    const rawList =
      (Array.isArray(data.articles) && data.articles) ||
      (Array.isArray(data.items) && data.items) ||
      [];

    const articles: CustomArticle[] = [];
    for (const item of rawList) {
      if (item && typeof item === "object") {
        const a = normalizeArticle(item as Record<string, unknown>);
        if (a) {
          articles.push(a);
        }
      }
    }

    const total =
      typeof data.total === "number"
        ? data.total
        : typeof data.count === "number"
          ? data.count
          : articles.length;

    return { articles, total, page, limit };
  } catch {
    return { articles: [], total: 0, page, limit };
  }
}

export async function fetchCustomArticleById(id: string): Promise<CustomArticle | null> {
  const trimmed = id.trim();
  if (!trimmed) {
    return null;
  }
  const safeId = encodeURIComponent(trimmed);

  const data = await fetchCustomJson<Record<string, unknown>>(`/articles/${safeId}`, 120);

  if (!data) {
    return null;
  }

  const wrapped = data.article;
  if (wrapped && typeof wrapped === "object") {
    return normalizeArticle(wrapped as Record<string, unknown>);
  }

  if (typeof data.id === "string" && typeof data.title === "string") {
    return normalizeArticle(data);
  }

  return null;
}

export async function fetchCustomArticleByIdUncached(id: string): Promise<CustomArticle | null> {
  const trimmed = id.trim();
  if (!trimmed) {
    return null;
  }
  const base = getCustomArticlesApiBase();
  try {
    const res = await fetch(`${base}/articles/${encodeURIComponent(trimmed)}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as Record<string, unknown>;
    const wrapped = data.article;
    if (wrapped && typeof wrapped === "object") {
      return normalizeArticle(wrapped as Record<string, unknown>);
    }
    if (typeof data.id === "string" && typeof data.title === "string") {
      return normalizeArticle(data);
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchCustomCategories(): Promise<string[]> {
  const data = await fetchCustomJson<CustomCategoriesResponse | Record<string, unknown>>(
    "/categories",
    600,
  );
  if (!data) {
    return [];
  }
  const cats = (data as CustomCategoriesResponse).categories ?? (data as { items?: string[] }).items;
  if (!Array.isArray(cats)) {
    return [];
  }
  return cats.map(String).filter(Boolean);
}
