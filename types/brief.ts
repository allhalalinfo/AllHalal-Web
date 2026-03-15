export const BRIEF_CATEGORIES = [
  "Faith & Practice",
  "Islamic Finance",
  "Family & Education",
  "Halal Living",
  "Health & Wellness",
  "Ummah & World",
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
  sources: BriefSource[];
  source_count: number;
}

export interface BriefsResponse {
  success: boolean;
  items: Brief[];
  count: number;
  cached_at?: number;
}
