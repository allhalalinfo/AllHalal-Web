/** Recommended editorial categories (backend accepts any string). */
export const CUSTOM_ARTICLE_CATEGORIES = [
  "finance",
  "zakat",
  "halal-living",
  "family",
  "faith",
  "guides",
  "blog",
  "news-analysis",
  "general",
] as const;

export const CUSTOM_ARTICLE_CONTENT_TYPES = [
  "article",
  "guide",
  "blog-post",
  "news-analysis",
] as const;

export const CUSTOM_ARTICLE_STATUSES = ["draft", "published", "scheduled"] as const;
