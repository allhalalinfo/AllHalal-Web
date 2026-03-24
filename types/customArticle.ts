/** Editorial / custom articles served by backend Redis (see docs/CUSTOM_ARTICLES_BACKEND_SPEC.md). */
export interface CustomArticle {
  id: string;
  title: string;
  dek: string;
  /** Full HTML body; may be omitted in list responses. */
  content?: string;
  image_url: string | null;
  category: string;
  tags?: string[];
  author?: string | null;
  published_at: string;
  updated_at?: string | null;
  /** Optional: article / guide / blog-post / news-analysis */
  content_type?: string | null;
  /** Optional: draft / published / scheduled */
  status?: string | null;
  /** Optional: show on homepage featured section */
  featured?: boolean;
}

export interface CustomArticlesListResponse {
  success?: boolean;
  articles: CustomArticle[];
  total: number;
  page?: number;
  limit?: number;
}

export interface CustomArticleDetailResponse {
  success?: boolean;
  article: CustomArticle | null;
}

export interface CustomCategoriesResponse {
  success?: boolean;
  categories: string[];
}
