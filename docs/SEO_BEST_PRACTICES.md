# SEO Best Practices Guide - allhalal.info

## Quick Start: Adding SEO to New Pages

### Basic Page Metadata

For any new page, use the `generateMetadata()` function:

```typescript
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: "Page Title",  // Don't include "| allhalal.info" - added automatically
  description: "Clear, concise description (150-160 characters)",
  path: "/your-page-path",  // Must start with /
  keywords: [
    "specific keyword 1",
    "specific keyword 2", 
    "specific keyword 3"
  ]
});
```

**Important:**
- ✅ DO: Use specific, page-relevant keywords
- ❌ DON'T: Use generic keywords like "halal scanner, muslim app"
- ✅ DO: Keep descriptions under 160 characters
- ❌ DON'T: Include site name in title (added automatically)

---

## Collection Pages (Lists of Items)

For pages showing a list of articles, guides, or resources:

```typescript
import { 
  generateMetadata as genMeta,
  generateItemListJSONLD,
  SITE_URL 
} from "@/lib/seo/metadata";

export const metadata = genMeta({
  title: "Collection Title",
  description: "Description of the collection",
  path: "/collection-path",
  keywords: ["relevant", "keywords"]
});

export default async function CollectionPage() {
  const items = await fetchItems();

  // Generate JSON-LD schema
  const itemListSchema = generateItemListJSONLD({
    name: "Collection Name",
    description: "Collection description",
    url: `${SITE_URL}/collection-path`,
    items: items.map(item => ({
      name: item.title,
      url: `${SITE_URL}/item/${item.slug}`,
      description: item.description,
      image: item.image  // optional
    }))
  });

  return (
    <main>
      {/* Add schema at the top */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListSchema }}
      />
      
      {/* Rest of page content */}
    </main>
  );
}
```

**Example Pages:**
- `/is-it-halal/page.tsx` - Halal living guides
- `/news/page.tsx` - News briefs
- `/guides/page.tsx` - Zakat guides

---

## Article/Blog Pages

For individual articles, use article-specific metadata:

```typescript
import { generateMetadata as genMeta } from "@/lib/seo/metadata";

export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await fetchArticle(params.slug);
  
  return genMeta({
    title: article.title,
    description: article.excerpt,
    path: `/article/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    author: article.author,
    image: article.coverImage,
    keywords: [...article.tags, article.category]
  });
}
```

**Schema for Articles:**
```typescript
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: article.title,
  description: article.excerpt,
  datePublished: article.publishedAt,
  dateModified: article.updatedAt,
  author: {
    "@type": "Person",
    name: article.author
  },
  publisher: {
    "@type": "Organization",
    name: "allhalal.info",
    url: SITE_URL
  },
  image: article.coverImage ? [article.coverImage] : undefined,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}/article/${article.slug}`
  }
};
```

**Example Page:** `/read/[slug]/page.tsx`

---

## Programmatic/Dynamic Pages

For pages with dynamic slugs (cities, countries, categories):

```typescript
// City page example
export async function generateMetadata({ params }): Promise<Metadata> {
  const city = await fetchCity(params.slug);
  
  return genMeta({
    title: `Halal Restaurants in ${city.name}`,
    description: `Discover ${city.halalCount} halal restaurants in ${city.name}, ${city.country}`,
    path: `/restaurants/${params.slug}`,
    keywords: [
      `halal restaurants ${city.name}`,
      `halal food ${city.name}`,
      city.name,
      city.country
    ]
  });
}
```

---

## Common Patterns

### Pattern 1: Hub Page with Subcategories
```typescript
// Finance hub page showing banks, investing, mortgages
export const metadata = genMeta({
  title: "Halal Finance Hub",
  description: "Zakat calculation, halal investing, Islamic banking",
  path: "/finance",
  keywords: ["halal finance", "Islamic banking", "zakat"]
});
```

### Pattern 2: Guide/Tutorial Page
```typescript
export const metadata = genMeta({
  title: "How to Calculate Zakat on Stocks",
  description: "Step-by-step guide to calculating Zakat on stock portfolios",
  path: "/guides/zakat-on-stocks",
  keywords: ["zakat on stocks", "Islamic finance", "stock portfolio"],
  type: "article"  // Makes it an article in OG
});
```

### Pattern 3: Tool/Calculator Page
```typescript
export const metadata = genMeta({
  title: "Zakat Calculator",
  description: "Free online Zakat calculator with live Nisab values",
  path: "/finance/zakat-calculator",
  keywords: ["zakat calculator", "nisab calculator", "zakat online"]
});
```

---

## Advanced Options

### No-Index Pages
For pages you don't want indexed (admin, login, etc.):

```typescript
export const metadata = genMeta({
  title: "Admin Login",
  description: "Admin access",
  path: "/admin/login",
  noindex: true,
  nofollow: true
});
```

### Custom Canonical
For pages that should point to a different canonical:

```typescript
export const metadata = genMeta({
  title: "Page Title",
  description: "Description",
  path: "/page-a",
  canonical: `${SITE_URL}/page-b`  // Point to different URL
});
```

### Custom OG Image
```typescript
export const metadata = genMeta({
  title: "Page Title",
  description: "Description",
  path: "/page",
  image: `${SITE_URL}/og-images/custom-page.png`
});
```

---

## SEO Checklist for New Pages

Before publishing a new page:

- [ ] Title is descriptive and under 60 characters
- [ ] Description is compelling and under 160 characters
- [ ] Keywords are specific to the page content
- [ ] Canonical URL is correct (auto-generated if not specified)
- [ ] H1 tag matches page title (for SEO consistency)
- [ ] Schema markup added if it's a collection/article
- [ ] OG image is set (or default is acceptable)
- [ ] Tested with social media debuggers
- [ ] Added to sitemap.xml (if static route)

---

## Common Mistakes to Avoid

### ❌ Don't: Generic Keywords
```typescript
keywords: ["halal", "muslim", "islamic"]  // Too generic
```

### ✅ Do: Specific Keywords
```typescript
keywords: ["halal mortgage UK", "Islamic home financing", "Sharia compliant loans"]
```

### ❌ Don't: Duplicate Titles
```typescript
title: "allhalal.info | Finance"  // Site name added automatically
```

### ✅ Do: Clean Titles
```typescript
title: "Halal Finance Hub"  // Will become "Halal Finance Hub | allhalal.info"
```

### ❌ Don't: Missing Path Slash
```typescript
path: "finance/banks"  // Missing leading slash
```

### ✅ Do: Proper Path
```typescript
path: "/finance/banks"  // Correct
```

### ❌ Don't: Use Same Description Everywhere
```typescript
description: "allhalal.info - Muslim portal for prayer times and halal guides"
```

### ✅ Do: Page-Specific Description
```typescript
description: "Find Islamic banks offering Sharia-compliant mortgages in the UK"
```

---

## Schema Markup Guidelines

### When to Use ItemList
- Collection pages (guides, articles, news)
- Category pages
- Search results pages
- Directory listings

### When to Use Article
- Blog posts
- News articles
- Guides and tutorials
- Long-form content

### When to Use WebPage
- Static pages (About, Contact)
- Landing pages
- Home page

### When to Use BreadcrumbList
- Pages with clear hierarchy
- Multi-level navigation
- E-commerce category pages

---

## Testing Your SEO

### Before Publishing
1. **Rich Results Test**
   ```
   https://search.google.com/test/rich-results
   ```
   Paste your page URL after deployment

2. **Facebook Debugger**
   ```
   https://developers.facebook.com/tools/debug/
   ```
   Check OG image and title

3. **Twitter Card Validator**
   ```
   https://cards-dev.twitter.com/validator
   ```
   Verify Twitter card rendering

### After Publishing
1. Check Google Search Console for:
   - Index coverage
   - Schema markup recognition
   - Mobile usability

2. Monitor for:
   - Crawl errors
   - Duplicate content issues
   - Missing metadata

---

## SEO Utility Functions Reference

### Core Function
```typescript
generateMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
}): Metadata
```

### Schema Functions
```typescript
generateItemListJSONLD(options: {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
    image?: string;
  }>;
}): string

generateBreadcrumbJSONLD(
  items: Array<{ name: string; url: string }>
): string

generateJSONLD(data: Record<string, any>): string
```

### Constants
```typescript
SITE_URL: string  // https://allhalal.info
```

---

## Performance Considerations

### Revalidation Settings
- **Static pages:** No revalidate (cached indefinitely)
- **Home page:** `revalidate = 300` (5 minutes)
- **News page:** `revalidate = 600` (10 minutes)
- **Article pages:** `revalidate = 3600` (1 hour)

### Image Optimization
- Use Next.js Image component when possible
- Provide OG images at 1200x630px
- Use WebP format for better compression
- Consider lazy loading for below-fold images

---

## Questions & Support

For SEO questions or to propose improvements:
1. Check this guide first
2. Review `/docs/SEO_AUDIT_REPORT.md`
3. Examine existing pages like `/is-it-halal/page.tsx`
4. Test changes in development first

---

**Last Updated:** May 1, 2026
**Version:** 1.0
**Maintainer:** SEO Team
