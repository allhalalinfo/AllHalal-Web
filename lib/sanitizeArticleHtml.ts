import sanitizeHtml from "sanitize-html";

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "h1",
    "h2",
    "h3",
    "h4",
    "img",
    "figure",
    "figcaption",
    "hr",
    "span",
    "div",
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "title", "width", "height", "loading", "class"],
    a: ["href", "name", "target", "rel", "class"],
    code: ["class"],
    span: ["class"],
    div: ["class"],
    table: ["class"],
    td: ["colspan", "rowspan", "class"],
    th: ["colspan", "rowspan", "scope", "class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
};

export function sanitizeArticleHtml(html: string): string {
  if (!html?.trim()) {
    return "";
  }
  
  let cleaned = sanitizeHtml(html, OPTIONS);
  
  // CRITICAL SEO FIX: Remove H1 tags from article content on the server
  // Problem: Google bot sees server-side HTML with duplicate H1 tags:
  //   1. Page title H1 in <header>
  //   2. Article content H1 from Swift AI agent
  // This violates HTML semantics and hurts SEO.
  // Client-side cleaners (DuplicateTitleCleaner, ArticleH1Converter) run too late.
  // Solution: Convert all H1 to H2 in article content on the server.
  cleaned = cleaned.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>');
  
  return cleaned;
}
