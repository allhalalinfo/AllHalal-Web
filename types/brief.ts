export const BRIEF_CATEGORIES = [
  "Faith & Practice",
  "Ummah & World",
  "Family & Education",
  "Islamic Finance",
  "Halal Lifestyle",
  "Tech & Innovation",
  "Travel & Wellness",
  "Travel & Lifestyle",
  "Halal Living",
  "Health & Wellness",
] as const;

export type BriefCategory = (typeof BRIEF_CATEGORIES)[number];

export interface BriefSource {
  name: string;
  url: string;
}

export interface Brief {
  id: number;
  slug: string;
  title: string;
  dek: string;
  summary: string;
  /** Short Gemini (or other) summary for cards; falls back to dek when absent. */
  ai_summary?: string | null;
  /** True when ai_summary was model-generated; false when excerpt fallback. */
  used_ai_summary?: boolean;
  why_it_matters: string;
  category: BriefCategory;
  image_url: string | null;
  published_at: string;
  source_published_at?: string | null;
  generated_at?: string | null;
  brief_type?: "news" | "evergreen" | string;
  image_strategy?: "real" | "source_pick" | "category_fallback" | "none" | string | null;
  /** API diagnostic: real, og_scraped, stock, jsonld_scraped, etc. */
  image_type?: string | null;
  is_real_image?: boolean;
  sources: BriefSource[];
  source_count: number;
  primary_source?: string;
  kind?: string;
  hero_candidate?: boolean;
}

export interface BriefsResponse {
  success: boolean;
  items: Brief[];
  count: number;
  cached_at?: number;
}
