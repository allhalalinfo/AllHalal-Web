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
  why_it_matters: string;
  category: BriefCategory;
  image_url: string | null;
  published_at: string;
  source_published_at?: string | null;
  generated_at?: string | null;
  brief_type?: "news" | "evergreen" | string;
  image_strategy?: "real" | "source_pick" | "category_fallback" | "none" | string | null;
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
