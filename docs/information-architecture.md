# AllHalal.info - Information Architecture

## 🎯 Overview
Трансформация allhalal.info из лендинга приложения в полноценный muslim lifestyle медиа-сайт с directory, programmatic SEO и монетизацией рекламой.

---

## 📁 Folder Structure

```
/Users/adelyanurusheva/Desktop/Allhalal-Web/
├── app/
│   ├── (admin)/              # Существующий admin panel
│   ├── (ceo)/                # Существующий CEO panel
│   ├── [locale]/             # Существующие i18n страницы (home, contact, legal, support)
│   │
│   ├── (media)/              # 🆕 НОВЫЙ: Media site route group (no layout bar)
│   │   ├── layout.tsx        # Media layout (nav, footer для медиа-сайта)
│   │   │
│   │   ├── blog/             # Блог (новости, обзоры, короткие статьи)
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx  # Individual blog post
│   │   │   └── category/
│   │   │       └── [category]/
│   │   │           └── page.tsx  # Category page
│   │   │
│   │   ├── guides/           # Evergreen guides (длинные, обновляемые)
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx  # Individual guide
│   │   │   └── category/
│   │   │       └── [category]/
│   │   │           └── page.tsx
│   │   │
│   │   ├── travel/           # Halal travel
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── destinations/
│   │   │   │   ├── page.tsx  # All destinations
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Destination detail
│   │   │   ├── country/
│   │   │   │   └── [country]/
│   │   │   │       └── page.tsx  # Country guide (programmatic)
│   │   │   └── cities/
│   │   │       └── [city]/
│   │   │           └── page.tsx  # City guide (programmatic)
│   │   │
│   │   ├── restaurants/      # Halal restaurants directory
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── [city]/
│   │   │   │   ├── page.tsx  # City restaurants (programmatic)
│   │   │   │   └── michelin/
│   │   │   │       └── page.tsx  # Michelin halal in city
│   │   │   └── category/
│   │   │       └── [category]/
│   │   │           └── page.tsx  # Fine dining, casual, etc.
│   │   │
│   │   ├── ingredients/      # Halal ingredients database
│   │   │   ├── page.tsx      # Hub page + search
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Ingredient detail (programmatic)
│   │   │
│   │   ├── e-codes/          # E-codes database
│   │   │   ├── page.tsx      # Hub page + search
│   │   │   └── [code]/
│   │   │       └── page.tsx  # E-code detail (programmatic)
│   │   │
│   │   ├── certification/    # Halal certification
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── bodies/
│   │   │   │   ├── page.tsx  # All certification bodies
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Body detail
│   │   │   └── [country]/
│   │   │       └── page.tsx  # Certification in country (programmatic)
│   │   │
│   │   ├── finance/          # Islamic finance
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── banks/
│   │   │   │   ├── page.tsx  # All Islamic banks
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Bank detail
│   │   │   ├── guides/
│   │   │   │   ├── page.tsx  # Finance guides index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Guide detail
│   │   │   └── [country]/
│   │   │       └── page.tsx  # Finance in country (programmatic)
│   │   │
│   │   ├── cosmetics/        # Halal cosmetics
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── ingredients/
│   │   │   │   └── page.tsx  # Cosmetic ingredients
│   │   │   └── brands/
│   │   │       └── page.tsx  # Halal cosmetic brands
│   │   │
│   │   ├── real-estate/      # 🆕 Halal real estate & construction
│   │   │   ├── page.tsx      # Hub page
│   │   │   ├── dubai/
│   │   │   │   ├── page.tsx  # Dubai hub
│   │   │   │   └── [area]/
│   │   │   │       └── page.tsx  # Area guide (programmatic)
│   │   │   ├── developers/
│   │   │   │   ├── page.tsx  # All developers
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Developer detail
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx  # All projects
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Project detail
│   │   │   ├── guides/
│   │   │   │   ├── page.tsx  # Guides index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Guide detail
│   │   │   └── faq/
│   │   │       └── page.tsx  # FAQ page
│   │   │
│   │   ├── tools/            # Interactive tools
│   │   │   ├── page.tsx      # Tools hub
│   │   │   ├── ingredient-checker/
│   │   │   │   └── page.tsx
│   │   │   ├── restaurant-finder/
│   │   │   │   └── page.tsx
│   │   │   ├── travel-checklist/
│   │   │   │   └── page.tsx
│   │   │   └── finance-estimator/
│   │   │       └── page.tsx
│   │   │
│   │   ├── app/              # Страница приложения (переместить из [locale])
│   │   │   └── page.tsx
│   │   │
│   │   ├── about/            # О нас
│   │   │   └── page.tsx
│   │   │
│   │   ├── editorial-policy/ # 🆕 Editorial policy
│   │   │   └── page.tsx
│   │   │
│   │   ├── disclosures/      # 🆕 Advertising disclosures
│   │   │   └── page.tsx
│   │   │
│   │   ├── authors/          # 🆕 Author pages
│   │   │   ├── page.tsx      # All authors
│   │   │   └── [slug]/
│   │   │       └── page.tsx  # Author profile + articles
│   │   │
│   │   ├── newsletter/       # 🆕 Newsletter signup
│   │   │   └── page.tsx
│   │   │
│   │   └── search/           # 🆕 Search results page (fallback)
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── search/           # 🆕 Search API
│   │   │   └── route.ts
│   │   ├── newsletter/       # 🆕 Newsletter API
│   │   │   └── route.ts
│   │   └── analytics/        # 🆕 Analytics events
│   │       └── route.ts
│   │
│   ├── globals.css
│   ├── layout.tsx            # Root layout
│   └── robots.txt/
│       └── route.ts          # Robots.txt (уже есть)
│
├── components/
│   ├── layout/               # Существующие layout components
│   │
│   ├── media/                # 🆕 Media site components
│   │   ├── layout/
│   │   │   ├── MediaHeader.tsx       # Header для медиа-сайта
│   │   │   ├── MediaFooter.tsx       # Footer для медиа-сайта
│   │   │   ├── MediaNav.tsx          # Главная навигация
│   │   │   └── Breadcrumbs.tsx       # Breadcrumb navigation
│   │   │
│   │   ├── hub/
│   │   │   ├── HubHero.tsx           # Hero section для hub pages
│   │   │   ├── CategoryGrid.tsx      # Grid категорий
│   │   │   ├── FeaturedContent.tsx   # Featured блок
│   │   │   └── QuickActions.tsx      # Quick action links
│   │   │
│   │   ├── article/
│   │   │   ├── ArticleHeader.tsx     # Article hero
│   │   │   ├── ArticleContent.tsx    # MDX content renderer
│   │   │   ├── TableOfContents.tsx   # Sticky TOC
│   │   │   ├── ArticleFooter.tsx     # Sources, updated date
│   │   │   ├── AuthorBio.tsx         # Author info
│   │   │   └── SeriesNav.tsx         # Series navigation
│   │   │
│   │   ├── cards/
│   │   │   ├── ArticleCard.tsx       # Article preview card
│   │   │   ├── ArticleCardSmall.tsx
│   │   │   ├── ArticleCardLarge.tsx
│   │   │   ├── CategoryCard.tsx      # Category card
│   │   │   ├── RestaurantCard.tsx    # Restaurant card
│   │   │   └── DeveloperCard.tsx     # Real estate developer card
│   │   │
│   │   ├── content/
│   │   │   ├── CalloutBox.tsx        # Tip/Warning/Note blocks
│   │   │   ├── ComparisonTable.tsx   # Side-by-side comparisons
│   │   │   ├── MethodologyBlock.tsx  # "How we evaluate"
│   │   │   ├── SourcesList.tsx       # Cited sources
│   │   │   ├── FAQAccordion.tsx      # FAQ component
│   │   │   └── GlossaryTooltip.tsx   # Inline term tooltips
│   │   │
│   │   ├── engagement/
│   │   │   ├── TrendingBlock.tsx     # Trending content
│   │   │   ├── EditorsPick.tsx       # Editors' picks
│   │   │   ├── RelatedContent.tsx    # Related articles
│   │   │   ├── NewsletterCapture.tsx # Email signup
│   │   │   ├── WasThisHelpful.tsx    # Feedback widget
│   │   │   └── ShareButtons.tsx      # Social share
│   │   │
│   │   ├── search/
│   │   │   ├── SearchModal.tsx       # Cmd+K modal
│   │   │   ├── SearchInput.tsx       # Search input
│   │   │   ├── SearchResults.tsx     # Results display
│   │   │   └── AutoSuggest.tsx       # Search suggestions
│   │   │
│   │   ├── filters/
│   │   │   ├── FilterSidebar.tsx     # Faceted filters
│   │   │   ├── FilterChips.tsx       # Active filters
│   │   │   └── SortControls.tsx      # Sort dropdown
│   │   │
│   │   ├── tools/
│   │   │   ├── IngredientChecker.tsx
│   │   │   ├── TravelChecklist.tsx
│   │   │   ├── FinanceCalculator.tsx
│   │   │   └── RestaurantFinder.tsx
│   │   │
│   │   └── monetization/
│   │       ├── AdSlot.tsx            # Universal ad container
│   │       ├── NativeAd.tsx          # Native ad styling
│   │       ├── SponsoredLabel.tsx    # "Sponsored" indicator
│   │       └── AdFreeZone.tsx        # Wrapper для no-ads
│   │
│   ├── ui/                   # Существующие UI components
│   └── ...
│
├── content/                  # 🆕 MDX content files
│   ├── blog/
│   │   └── *.mdx
│   ├── guides/
│   │   └── *.mdx
│   ├── destinations/
│   │   └── *.mdx
│   └── authors/
│       └── *.mdx
│
├── data/                     # 🆕 Seed data & types
│   ├── cities.ts             # 30+ городов для restaurants
│   ├── countries.ts          # 25+ стран
│   ├── ingredients.ts        # 60+ ингредиентов
│   ├── e-codes.ts            # 30+ E-codes
│   ├── developers.ts         # 15-30 застройщиков
│   ├── dubai-areas.ts        # 20-50 районов Дубая
│   ├── certifiers.ts         # Certification bodies
│   ├── banks.ts              # Islamic banks
│   └── types.ts              # TypeScript types для данных
│
├── lib/
│   ├── content/              # 🆕 Content utilities
│   │   ├── mdx.ts            # MDX processing
│   │   ├── contentlayer.ts   # Contentlayer config
│   │   └── types.ts          # Content types
│   │
│   ├── seo/                  # 🆕 SEO utilities
│   │   ├── metadata.ts       # Metadata generation
│   │   ├── structured-data.ts # JSON-LD generators
│   │   ├── sitemap.ts        # Sitemap generation
│   │   └── breadcrumbs.ts    # Breadcrumb helpers
│   │
│   ├── search/               # 🆕 Search functionality
│   │   ├── index.ts          # Search index builder
│   │   ├── client.ts         # Client-side search (fuse.js)
│   │   └── types.ts          # Search types
│   │
│   ├── analytics/            # 🆕 Analytics abstraction
│   │   ├── index.ts          # Analytics provider
│   │   ├── events.ts         # Event definitions
│   │   └── types.ts
│   │
│   └── utils/                # Existing + new utilities
│       ├── programmatic.ts   # Programmatic page helpers
│       └── internal-linking.ts # Related content logic
│
├── docs/
│   ├── benchmark-lifestyle-patterns.md  # ✅ Создан
│   ├── information-architecture.md      # ✅ Создается
│   ├── content-guide.md                 # 🔜 Гайд для контент-команды
│   ├── seo-checklist.md                 # 🔜 SEO чеклист
│   └── component-library.md             # 🔜 Библиотека компонентов
│
└── public/
    └── ... (existing assets)
```

---

## 🗺️ Site Map

### Homepage
```
/ (allhalal.info)
├─ Hero (Find Halal Everything)
├─ Featured Categories Grid
│  ├─ Travel
│  ├─ Restaurants
│  ├─ Finance
│  ├─ Real Estate
│  ├─ Ingredients
│  └─ Certification
├─ Trending This Week
├─ Editors' Picks
└─ Newsletter CTA
```

### Main Navigation
```
Home | Travel | Restaurants | Ingredients | Certification | Finance | Real Estate | Blog | Tools | App
```

### Travel Section
```
/travel
├─ /travel/destinations (All destinations)
├─ /travel/country/[country] (Programmatic: 25+ countries)
├─ /travel/cities/[city] (Programmatic: связка с restaurants)
└─ Related guides in /guides
```

### Restaurants Section
```
/restaurants
├─ /restaurants/[city] (Programmatic: 30+ cities)
│  ├─ Filters: certification, cuisine, price, features
│  └─ /restaurants/[city]/michelin (Sub-landing)
└─ /restaurants/category/[category] (fine-dining, casual, etc.)
```

### Ingredients Section
```
/ingredients
├─ Search + Browse
├─ /ingredients/[slug] (Programmatic: 60+ ingredients)
│  ├─ Halal status
│  ├─ Alternative names
│  ├─ Sources
│  └─ Related E-codes
└─ Link to /e-codes
```

### E-Codes Section
```
/e-codes
├─ Search + Browse
└─ /e-codes/[code] (Programmatic: 30+ codes)
   ├─ Halal status
   ├─ Common sources
   └─ Found in (products)
```

### Certification Section
```
/certification
├─ /certification/bodies (All certification bodies)
│  └─ /certification/bodies/[slug] (Body detail)
└─ /certification/[country] (Programmatic: 25+ countries)
```

### Finance Section
```
/finance
├─ /finance/banks (All Islamic banks)
│  └─ /finance/banks/[slug] (Bank detail)
├─ /finance/guides (Finance guides)
│  └─ /finance/guides/[slug] (Murabaha, Ijara, Takaful, etc.)
└─ /finance/[country] (Programmatic: 25+ countries)
```

### Real Estate Section (🆕 NEW)
```
/real-estate
├─ /real-estate/dubai (Dubai hub)
│  └─ /real-estate/dubai/[area] (Programmatic: 20-50 areas)
│     ├─ Area overview
│     ├─ Available projects
│     ├─ Sharia-compliant payment plans
│     └─ Developers active in area
├─ /real-estate/developers (All developers)
│  └─ /real-estate/developers/[slug] (Developer detail)
│     ├─ Company overview
│     ├─ Projects
│     ├─ Payment plan methodology
│     └─ Sharia compliance
├─ /real-estate/projects (All projects)
│  └─ /real-estate/projects/[slug] (Project detail)
├─ /real-estate/guides (Finance guides)
│  └─ /real-estate/guides/[slug]
│     ├─ Murabaha financing
│     ├─ Installment plans
│     ├─ Developer payment plans
│     └─ Sharia-compliant mortgages
└─ /real-estate/faq
```

### Cosmetics Section
```
/cosmetics
├─ /cosmetics/ingredients (Cosmetic ingredients database)
└─ /cosmetics/brands (Halal cosmetic brands)
```

### Blog & Guides
```
/blog
├─ /blog/[slug] (Individual posts)
└─ /blog/category/[category]

/guides
├─ /guides/[slug] (Evergreen guides)
└─ /guides/category/[category]
```

### Tools Section
```
/tools
├─ /tools/ingredient-checker (Search ingredient)
├─ /tools/restaurant-finder (Find restaurants)
├─ /tools/travel-checklist (Interactive checklist)
└─ /tools/finance-estimator (Simple calculator)
```

### Trust & Editorial
```
/about
/editorial-policy (NEW - How we evaluate, sources, update frequency)
/disclosures (NEW - Ad disclosure, partnerships)
/authors (NEW - All authors)
/authors/[slug] (NEW - Author profile + articles)
/newsletter (NEW - Newsletter signup)
```

### Legal (Existing)
```
/legal
├─ /legal/privacy-policy
├─ /legal/terms-of-service
└─ /legal/disclaimer
```

### App Page
```
/app (Deep links, app download)
```

---

## 🏗️ Content Types & Schema

### TypeScript Types (data/types.ts)

```typescript
// Base types
export interface Author {
  id: string;
  slug: string;
  name: string;
  bio: string;
  avatar?: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
}

// Content types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX
  author: string; // Author ID
  category: string;
  tags: string[];
  coverImage?: string;
  datePublished: string;
  dateUpdated?: string;
  readTime?: number;
  featured?: boolean;
  noindex?: boolean;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string; // MDX
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  datePublished: string;
  dateUpdated: string; // Required for guides
  lastReviewed: string;
  version: string; // "2.1"
  featured?: boolean;
  series?: {
    id: string;
    title: string;
    order: number;
  };
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  description: string;
  content: string; // MDX
  type: 'country' | 'city';
  muslimFriendlyScore?: number;
  halalRestaurantCount?: number;
  mosqueCount?: number;
  highlights: string[];
  bestTimeToVisit?: string;
  coverImage?: string;
  datePublished: string;
  dateUpdated?: string;
}

export interface Ingredient {
  slug: string;
  name: string;
  alternativeNames?: string[];
  status: 'halal' | 'haram' | 'doubtful' | 'depends';
  description: string;
  content?: string; // MDX for detailed explanation
  category: string; // dairy, meat, additives, etc.
  relatedECodes?: string[];
  sources: string[];
  datePublished: string;
  dateUpdated?: string;
}

export interface ECode {
  code: string; // "E120"
  name: string;
  slug: string; // "e120-carmine"
  status: 'halal' | 'haram' | 'doubtful' | 'depends';
  description: string;
  content?: string; // MDX
  category: string;
  commonSources: string[];
  foundIn: string[]; // Product types
  sources: string[];
  datePublished: string;
  dateUpdated?: string;
}

export interface CertificationBody {
  slug: string;
  name: string;
  acronym?: string;
  country: string;
  description: string;
  content?: string; // MDX
  website?: string;
  recognizedBy: string[]; // Countries/organizations
  standards: string[];
  datePublished: string;
  dateUpdated?: string;
}

export interface Bank {
  slug: string;
  name: string;
  country: string;
  description: string;
  content?: string; // MDX
  website?: string;
  services: string[]; // murabaha, ijara, takaful
  shariaBoardMembers?: string[];
  datePublished: string;
  dateUpdated?: string;
}

export interface Developer {
  slug: string;
  name: string;
  description: string;
  content?: string; // MDX
  website?: string;
  activeAreas: string[]; // Dubai areas
  projectCount?: number;
  paymentPlanTypes: string[]; // "installment", "developer-plan", "mortgage"
  shariaCompliance: {
    certified: boolean;
    certifiedBy?: string;
    methodology?: string;
  };
  projects: string[]; // Project IDs
  datePublished: string;
  dateUpdated?: string;
}

export interface DubaiArea {
  slug: string;
  name: string;
  description: string;
  content?: string; // MDX
  zone: string; // "Downtown", "Marina", etc.
  developerCount?: number;
  projectCount?: number;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  amenities: string[];
  nearbyMosques?: number;
  halalRestaurants?: number;
  datePublished: string;
  dateUpdated?: string;
}

export interface RealEstateProject {
  slug: string;
  name: string;
  developer: string; // Developer ID
  area: string; // Area slug
  description: string;
  content?: string; // MDX
  status: 'planning' | 'under-construction' | 'completed';
  paymentPlans: Array<{
    type: string;
    description: string;
    downPayment?: string;
    installmentPeriod?: string;
  }>;
  shariaCompliant: boolean;
  amenities: string[];
  nearbyMosques?: number;
  datePublished: string;
  dateUpdated?: string;
}

export interface City {
  slug: string;
  name: string;
  country: string;
  description?: string;
  halalRestaurantCount?: number;
  michelinHalalCount?: number;
  population?: number;
  muslimPercentage?: number;
}

export interface Country {
  slug: string;
  name: string;
  code: string; // ISO code
  muslimPercentage?: number;
  halalCertificationBodies?: string[];
  islamicBankCount?: number;
  description?: string;
}
```

---

## 🎨 Page Templates

### Hub Page Template
```tsx
// Structure
<HubHero
  title="Section Title"
  description="Brief intro"
  quickActions={[...]}
/>

<FeaturedContent items={...} />

<CategoryGrid categories={...} />

<TrendingBlock items={...} />

<FAQAccordion items={...} />

<NewsletterCapture />
```

### Article/Guide Template
```tsx
// Structure
<Breadcrumbs />

<ArticleHeader
  title={...}
  author={...}
  datePublished={...}
  dateUpdated={...}
  readTime={...}
/>

<div className="grid grid-cols-12">
  <aside className="col-span-3">
    <TableOfContents items={...} />
  </aside>
  
  <main className="col-span-9">
    <ArticleContent>
      {/* MDX content */}
    </ArticleContent>
    
    <SourcesList sources={...} />
    
    <AuthorBio author={...} />
    
    <RelatedContent items={...} />
  </main>
</div>

<NewsletterCapture />
```

### List Page Template (Restaurants, etc.)
```tsx
// Structure
<Breadcrumbs />

<PageHeader
  title={...}
  description={...}
  count={...}
/>

<div className="grid grid-cols-12">
  <aside className="col-span-3">
    <FilterSidebar
      filters={...}
      activeFilters={...}
      onChange={...}
    />
  </aside>
  
  <main className="col-span-9">
    <SortControls />
    
    <Grid>
      {items.map(item => (
        <ArticleCard key={item.id} {...item} />
      ))}
    </Grid>
    
    <Pagination />
  </main>
</div>
```

### Programmatic Page Template
```tsx
// Structure
<Breadcrumbs />

<PageHeader
  title={`Halal Restaurants in ${city}`}
  description={uniqueIntro}
/>

<QuickStats stats={...} />

<ContentSection>
  {/* Generated content */}
</ContentSection>

<FAQAccordion items={generatedFAQs} />

<RelatedContent items={relatedCities} />

{/* Structured data: ItemList, BreadcrumbList */}
```

---

## 🔗 Internal Linking Strategy

### 1. Breadcrumbs (всегда)
```
Home > Travel > Destinations > Dubai
Home > Finance > Banks > UAE
Home > Real Estate > Dubai > Downtown
```

### 2. Related Content (конец статьи)
- 2 похожие статьи (same category + shared tags)
- 1 evergreen guide
- 1 tool (если применимо)

### 3. Hub → Spoke Links
- Hub page линкует на top 6-12 items
- Spoke pages линкуют обратно на hub

### 4. Topic Clusters
- Pillar page: "Islamic Finance Complete Guide"
  - Clusters: Murabaha, Ijara, Takaful, Sukuk
  - Bidirectional links

### 5. Glossary Tooltips
- Термины в finance/certification → tooltip + link

### 6. Series Navigation
- Previous / Next в multi-part guides

---

## 📊 SEO Requirements

### Metadata (every page)
- Unique `title` (50-60 chars)
- Unique `description` (150-160 chars)
- Canonical URL
- OpenGraph (og:title, og:description, og:image)
- Twitter Card
- robots directive (index/noindex)

### Structured Data (JSON-LD)
- **Article/BlogPosting**: All posts, guides
- **FAQPage**: Pages with FAQ section
- **BreadcrumbList**: All nested pages
- **ItemList**: List pages (restaurants, ingredients, etc.)
- **Organization**: Homepage
- **WebSite + SearchAction**: Homepage

### Sitemap
- `/sitemap.xml` (index)
- `/sitemap-blog.xml`
- `/sitemap-guides.xml`
- `/sitemap-travel.xml`
- `/sitemap-restaurants.xml`
- `/sitemap-finance.xml`
- `/sitemap-real-estate.xml`
- `/sitemap-programmatic.xml`

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /ceo/

Sitemap: https://allhalal.info/sitemap.xml
```

---

## 🎯 Programmatic SEO

### Cities (Restaurants)
**Pattern:** `/restaurants/[city]`
**Seed:** 30+ cities
**Unique Content:**
- Intro: "Discover [N] halal-certified restaurants in [City]..."
- Quick facts: Population, Muslim %, top cuisines
- FAQ: "Are there Michelin halal restaurants in [City]?"
- Related: Other cities in same country

### Countries (Travel, Finance, Certification)
**Pattern:** `/travel/country/[country]`, `/finance/[country]`, `/certification/[country]`
**Seed:** 25+ countries
**Unique Content:**
- Intro: "[Country] travel guide for Muslims"
- Stats: Muslim population, mosques, halal restaurants
- Finance: Islamic banks in country
- Certification: Local halal certifiers
- FAQ: Country-specific questions

### Dubai Areas (Real Estate)
**Pattern:** `/real-estate/dubai/[area]`
**Seed:** 20-50 areas
**Unique Content:**
- Intro: "[Area] real estate guide"
- Overview: Zone, amenities, price range
- Developers active in area
- Projects: Upcoming/completed
- Payment plans: Common financing options
- Sharia compliance: How developers ensure compliance
- FAQ: Area-specific questions
- Related: Nearby areas

### Ingredients
**Pattern:** `/ingredients/[slug]`
**Seed:** 60+ ingredients
**Unique Content:**
- Status: Halal/Haram/Doubtful/Depends
- Explanation: Why this status?
- Alternative names
- Related E-codes
- Sources: Islamic scholars, certification bodies
- FAQ: Common questions

### E-Codes
**Pattern:** `/e-codes/[code]`
**Seed:** 30+ codes
**Unique Content:**
- Status: Halal/Haram/Doubtful/Depends
- Full name: "E120 - Carmine"
- Common sources: Animal/plant/synthetic
- Found in: Product categories
- Related ingredients
- Sources
- FAQ

---

## 📱 Mobile Considerations

### Navigation
- Hamburger menu (collapse categories)
- Sticky header (hide on scroll down, show on scroll up)
- Bottom nav для tools? (optional)

### Filters (List Pages)
- Top collapsible section (не sidebar)
- Floating "Filter" button

### TOC (Article Pages)
- Collapsible header section (не sticky)
- Quick jump links

### Ads
- No sticky ads on mobile (или очень осторожно с dismiss)
- In-feed ads только (не sidebar)

### Cards
- Full-width на mobile
- Grid (2 col) на tablet
- Grid (3-4 col) на desktop

---

## ✅ Status
- [x] IA designed
- [x] Routes defined
- [x] Content types defined
- [x] SEO structure planned
- [x] Programmatic patterns defined
- [ ] Implementation (next phase)

**Version:** 1.0  
**Last Updated:** 2026-01-14  
**Ready for:** Implementation
