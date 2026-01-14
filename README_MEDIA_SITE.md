# AllHalal.info - Lifestyle Media Site

**Version:** 2.0  
**Status:** 🚧 In Development  
**Framework:** Next.js 15 (App Router)

---

## 📖 Overview

AllHalal.info is transforming from an app landing page into a comprehensive **Muslim lifestyle media platform** featuring:

- 🌍 **Travel Guides** - Muslim-friendly destinations worldwide
- 🍽️ **Restaurant Directory** - Halal dining from street food to Michelin stars
- 🧪 **Ingredients Database** - 60+ ingredients with halal status
- 🏷️ **E-Codes Reference** - 30+ E-numbers explained
- 🏦 **Islamic Finance** - Murabaha, Ijara, Takaful guides
- 🏠 **Real Estate** - Dubai properties with Sharia-compliant payment plans
- ✅ **Certification** - Global halal certification bodies
- 🛠️ **Tools** - Ingredient checker, travel checklist, finance calculator

---

## 🎯 Project Goals

1. **SEO-First**: Capture organic traffic for high-intent queries
2. **Programmatic SEO**: Auto-generate location pages (cities, countries, areas)
3. **Premium UX**: Modern, fast, mobile-first design
4. **Monetization**: Ad slots without compromising user experience
5. **Trust & Authority**: Editorial policy, sources, methodology

---

## 📁 Project Structure

```
allhalal-web/
├── app/
│   ├── (admin)/              # Admin panel (existing)
│   ├── (ceo)/                # CEO panel (existing)
│   ├── [locale]/             # i18n pages (existing)
│   ├── (media)/              # NEW: Media site
│   │   ├── blog/
│   │   ├── guides/
│   │   ├── travel/
│   │   ├── restaurants/
│   │   ├── ingredients/
│   │   ├── e-codes/
│   │   ├── certification/
│   │   ├── finance/
│   │   ├── real-estate/
│   │   ├── cosmetics/
│   │   ├── tools/
│   │   └── ...
│   └── api/
│
├── components/
│   └── media/                # NEW: Media components
│       ├── layout/
│       ├── hub/
│       ├── article/
│       ├── cards/
│       ├── content/
│       ├── engagement/
│       ├── search/
│       ├── filters/
│       ├── tools/
│       └── monetization/
│
├── content/                  # NEW: MDX content files
│   ├── blog/
│   ├── guides/
│   └── ...
│
├── data/                     # NEW: Seed data
│   ├── types.ts              ✅ Created
│   ├── countries.ts          ✅ Created (25 countries)
│   ├── cities.ts             ✅ Created (30+ cities)
│   ├── ingredients.ts        ✅ Created (60+ ingredients)
│   ├── e-codes.ts            ✅ Created (30+ E-codes)
│   ├── dubai-areas.ts        ✅ Created (25+ areas)
│   ├── developers.ts         ✅ Created (20+ developers)
│   └── index.ts              ✅ Created
│
├── lib/
│   ├── content/              # NEW: Content utilities
│   ├── seo/                  # NEW: SEO utilities
│   ├── search/               # NEW: Search functionality
│   └── analytics/            # NEW: Analytics
│
├── docs/                     # NEW: Documentation
│   ├── benchmark-lifestyle-patterns.md  ✅ Created
│   ├── information-architecture.md      ✅ Created
│   ├── content-plan.md                  ✅ Created (58 ideas)
│   └── ...
│
└── public/
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0+
- npm or yarn
- TypeScript knowledge

### Installation

```bash
# Clone the repository
git clone git@github.com-allhalal-web:allhalalinfo/AllHalal-Web.git
cd AllHalal-Web

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

## 📊 Data Layer

### Seed Data Statistics

| Data Type | Count | File |
|-----------|-------|------|
| Countries | 25 | `data/countries.ts` |
| Cities | 30+ | `data/cities.ts` |
| Ingredients | 60+ | `data/ingredients.ts` |
| E-Codes | 30+ | `data/e-codes.ts` |
| Dubai Areas | 25+ | `data/dubai-areas.ts` |
| Developers | 20+ | `data/developers.ts` |

### Usage Example

```typescript
import { countries, cities, ingredients } from '@/data';

// Get country by slug
const uae = countries.find(c => c.slug === 'united-arab-emirates');

// Search ingredients
const gelatinResults = ingredients.filter(i => 
  i.name.toLowerCase().includes('gelatin')
);

// Filter by halal status
const halalIngredients = ingredients.filter(i => i.status === 'halal');
```

---

## 🎨 Components Architecture

### Layout Components
- `MediaHeader` - Navigation for media site
- `MediaFooter` - Footer with links
- `Breadcrumbs` - SEO breadcrumbs with structured data

### Hub Components
- `HubHero` - Hero section for category hubs
- `CategoryGrid` - Grid of category cards
- `FeaturedContent` - Highlighted articles
- `QuickActions` - Quick links

### Article Components
- `ArticleHeader` - Title, author, date
- `ArticleContent` - MDX renderer
- `TableOfContents` - Sticky TOC (desktop)
- `ArticleFooter` - Sources, updated date
- `AuthorBio` - Author information
- `SeriesNav` - Multi-part article navigation

### Content Components
- `CalloutBox` - Tip/Warning/Note blocks
- `ComparisonTable` - Side-by-side comparisons
- `MethodologyBlock` - "How we evaluate" disclosure
- `SourcesList` - Cited sources
- `FAQAccordion` - Expandable FAQ
- `GlossaryTooltip` - Inline term definitions

### Engagement Components
- `TrendingBlock` - Popular content
- `EditorsPick` - Curated highlights
- `RelatedContent` - Smart related articles
- `NewsletterCapture` - Email signup
- `WasThisHelpful` - Feedback widget
- `ShareButtons` - Social sharing

### Search Components
- `SearchModal` - Cmd+K modal
- `SearchInput` - Search input
- `SearchResults` - Categorized results
- `AutoSuggest` - Search suggestions

### Filter Components
- `FilterSidebar` - Faceted filters
- `FilterChips` - Active filters
- `SortControls` - Sort options

### Monetization Components
- `AdSlot` - Universal ad container (lazy-loaded)
- `NativeAd` - Native ad styling
- `SponsoredLabel` - "Sponsored" indicator
- `AdFreeZone` - Wrapper for ad-free pages

---

## 🔍 SEO Infrastructure

### Metadata
- Unique title/description for every page
- OpenGraph & Twitter cards
- Canonical URLs
- robots directives
- hreflang (future)

### Structured Data (JSON-LD)
- `Article` / `BlogPosting` - Posts & guides
- `FAQPage` - Pages with FAQ
- `BreadcrumbList` - Nested pages
- `ItemList` - List pages
- `Organization` + `WebSite` - Homepage

### Sitemap
```
/sitemap.xml (index)
├── /sitemap-blog.xml
├── /sitemap-guides.xml
├── /sitemap-travel.xml
├── /sitemap-restaurants.xml
├── /sitemap-finance.xml
├── /sitemap-real-estate.xml
└── /sitemap-programmatic.xml
```

### Internal Linking Strategy
1. **Breadcrumbs** - All nested pages
2. **Related Content** - End of articles (2-3 similar + 1 guide + 1 tool)
3. **Hub → Spoke** - Hub pages link to top items
4. **Topic Clusters** - Pillar + cluster content
5. **Glossary Tooltips** - In-line term links

---

## 🛠️ Programmatic SEO

### Auto-Generated Pages

| Pattern | Example | Data Source |
|---------|---------|-------------|
| `/restaurants/[city]` | `/restaurants/dubai` | `cities.ts` |
| `/travel/country/[country]` | `/travel/country/turkey` | `countries.ts` |
| `/finance/[country]` | `/finance/united-arab-emirates` | `countries.ts` |
| `/certification/[country]` | `/certification/malaysia` | `countries.ts` |
| `/real-estate/dubai/[area]` | `/real-estate/dubai/downtown-dubai` | `dubai-areas.ts` |
| `/ingredients/[slug]` | `/ingredients/gelatin` | `ingredients.ts` |
| `/e-codes/[code]` | `/e-codes/e120-carmine` | `e-codes.ts` |

### Unique Content Requirements
Each programmatic page MUST have:
- ✅ Unique intro paragraph
- ✅ Quick facts / stats
- ✅ FAQ section (3-5 questions)
- ✅ Internal links (related pages)
- ✅ Structured data (JSON-LD)
- ✅ Breadcrumbs

---

## 🔎 Search Functionality

### Cmd+K Search
- Keyboard shortcut: `Cmd+K` (Mac) / `Ctrl+K` (Windows)
- Categorized results:
  - Guides & Articles
  - Restaurants & Travel
  - Ingredients & E-Codes
  - Finance & Real Estate
- Auto-suggest with preview

### Search Index
```typescript
// lib/search/index.ts
interface SearchResult {
  type: 'blog' | 'guide' | 'ingredient' | ...;
  slug: string;
  title: string;
  description: string;
  url: string;
  snippet?: string;
}
```

---

## 💰 Monetization

### Ad Slots
- **In-Article** - After 3-4 paragraphs (not before LCP)
- **Sidebar** - Desktop only (≥1024px)
- **In-Feed** - Every 6-8 cards on list pages
- **Sticky Bottom** - Mobile (with dismiss button)
- **Footer** - Above footer

### Ad-Free Zones
```typescript
// No ads on these pages:
- /editorial-policy
- /disclosures
- /about
- /legal/*
- /app (optional)
```

### Performance First
- Lazy load ads (Intersection Observer)
- Measure CLS impact
- No ads block initial render
- Max 3-4 ad slots per page

---

## 📈 Analytics Events

```typescript
// Track these events:
- search_open
- search_query
- search_result_click
- click_related_content
- newsletter_signup
- ad_impression
- ad_click
- outbound_click
- helpful_feedback
- tool_interaction
```

---

## ✍️ Content Guidelines

### Editorial Standards
1. Every article has unique title/description
2. Minimum 3-5 internal links
3. Sources section (where applicable)
4. FAQ section (minimum 3 questions)
5. "Last updated" date
6. Author attribution
7. Structured data

### Content Length
- **Listicles**: 1200-2000 words
- **Comprehensive Guides**: 2500-4000 words
- **Explainers**: 1500-2500 words
- **Programmatic Pages**: 800-1200 words
- **Developer Profiles**: 1000-1500 words

### Update Frequency
- **Evergreen Guides**: Review every 6 months
- **Seasonal Content**: Update before season
- **Programmatic Pages**: Update when data changes
- **Blog Posts**: No regular updates needed

---

## 🎯 Content Plan Summary

| Category | Ideas | Priority |
|----------|-------|----------|
| Travel | 10 | P0-P1 |
| Restaurants | 10 | P0-P1 |
| Ingredients | 10 | P0-P1 |
| Certification | 5 | P1 |
| Finance | 5 | P0-P1 |
| Real Estate | 15 | P0-P1 |
| Lifestyle | 3+ | P2 |
| **TOTAL** | **58+** | - |

See `/docs/content-plan.md` for full list.

---

## 🚦 Deployment Checklist

### Before Launch
- [ ] All P0 content published (20 pieces)
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] All programmatic pages have unique content
- [ ] Structured data validated (Google Rich Results)
- [ ] Breadcrumbs on all nested pages
- [ ] Search functionality working
- [ ] Ad slots implemented (but can be disabled)
- [ ] Editorial policy published
- [ ] Disclosures page published
- [ ] Author pages created
- [ ] Lighthouse score: Performance > 90, SEO > 95

### After Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor crawl errors
- [ ] Check Core Web Vitals
- [ ] Set up analytics
- [ ] Monitor ad performance
- [ ] Plan next content batch (P1)

---

## 🧪 Testing

### Performance
```bash
npm run build
npm run start

# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

### SEO
- Google Rich Results Test
- Schema.org validator
- Internal links audit
- Breadcrumbs check
- Canonical URLs check

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| `docs/benchmark-lifestyle-patterns.md` | 25 UX/SEO patterns from top sites |
| `docs/information-architecture.md` | Full IA, routes, content types |
| `docs/content-plan.md` | 58 content ideas with search intent |
| `README_MEDIA_SITE.md` | This file - project overview |

---

## 🤝 Contributing

### Content Team
1. Read `/docs/content-plan.md` for ideas
2. Follow editorial standards
3. Use content brief templates
4. Add internal links (minimum 3-5)
5. Include FAQ section
6. Cite sources

### Development Team
1. Follow TypeScript strict mode
2. Use existing component library
3. Ensure mobile-first responsive
4. Optimize images (next/image)
5. Lazy load non-critical content
6. Measure performance impact

---

## 📞 Support

- **Technical Issues**: [Create GitHub Issue]
- **Content Questions**: [Editorial Team]
- **SEO/Performance**: [Dev Team]

---

## 📄 License

Proprietary - AllHalal Info © 2026

---

## 🗺️ Roadmap

### Phase 1 (Current) - Foundation
- [x] IA designed
- [x] Seed data created
- [x] Content plan (58 ideas)
- [ ] SEO infrastructure
- [ ] UI components library
- [ ] Search functionality

### Phase 2 - Content & Launch
- [ ] P0 content (20 pieces)
- [ ] Programmatic pages
- [ ] Trust pages
- [ ] Ad slots
- [ ] Analytics
- [ ] Launch 🚀

### Phase 3 - Growth
- [ ] P1 content (20 pieces)
- [ ] Newsletter integration
- [ ] User accounts (optional)
- [ ] Comments (optional)
- [ ] Multi-language (i18n)

### Phase 4 - Scale
- [ ] API for mobile app integration
- [ ] Advanced filters
- [ ] Personalization
- [ ] ML-powered recommendations

---

**Last Updated**: 2026-01-14  
**Version**: 2.0-dev  
**Status**: 🚧 In Development
