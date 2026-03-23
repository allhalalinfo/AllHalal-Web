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
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "title", "width", "height", "loading", "class"],
    a: ["href", "name", "target", "rel", "class"],
    code: ["class"],
    span: ["class"],
    div: ["class"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
};

export function sanitizeArticleHtml(html: string): string {
  if (!html?.trim()) {
    return "";
  }
  return sanitizeHtml(html, OPTIONS);
}
