# Muslim News Aggregator Architecture

## Product goal

The homepage should feel like a living Muslim portal, not a blog index.

Core question the interface must answer:

`What is happening in Muslim life today, and where should I look next?`

That means:

- one primary dashboard entry point on the homepage
- a clear top story
- distinct information streams
- compact visual cards with images
- one main CTA into the full news hub

## Homepage structure

Recommended homepage block:

1. `Live Muslim World`
2. `Muslim World Today`
3. One global CTA: `Explore Muslim World`
4. `Top Story`
5. `Live Radar` for 3 quick reads
6. Thematic streams in a dashboard grid

Recommended homepage stream order:

1. Faith & Practice
2. Ummah & Society
3. World & Regions
4. Islamic Finance
5. Health & Wellness
6. Halal Living
7. Learning & Family

Phase 2 stream:

- Travel

Travel should not be forced into the homepage until real travel-grade sources exist. It can be introduced once the source pool is strong enough.

## Stream taxonomy

### Faith & Practice

Use for:

- Quran and tafsir
- hadith
- worship and fiqh
- Ramadan and fasting
- duas and spiritual life

### Ummah & Society

Use for:

- Muslim world developments
- Muslim communities
- institutions, education and civic life
- humanitarian and cultural updates

### World & Regions

Use for:

- Muslim countries
- regional developments
- Middle East, North Africa and South Asia coverage
- major Muslim communities across Europe and North America

### Islamic Finance

Use for:

- halal investing
- Islamic banking
- sukuk
- zakat, mortgages and personal finance

### Health & Wellness

Use for:

- nutrition
- mental health
- wellness
- Muslim family wellbeing

### Halal Living

Use for:

- food and ingredient updates
- halal products
- lifestyle decisions
- everyday Muslim consumer questions

### Learning & Family

Use for:

- books
- lectures
- Muslim history
- education and family learning

### Travel

Phase 2 only:

- Umrah
- halal travel guides
- Muslim-friendly cities
- route and destination coverage

## Source strategy

Use a hybrid source model.

Also separate content into two modes:

- `news mode` for live homepage dashboard
- `editorial mode` for evergreen and deeper reading

The homepage dashboard should only use `news mode`.

### Tier 1: Curated Muslim-first sources

These should define trust and tone.

Faith and learning:

- Yaqeen Institute
- About Islam
- Muslim Matters
- Productive Muslim

Lifestyle and learning:

- Muslim Vibe
- Haute Hijab
- Muslim Heritage

Finance:

- Islamic Finance Guru
- Islamic Finance News
- MIFC

Ummah and world:

- Al Jazeera
- TRT World
- Middle East Eye
- Islamic Relief
- AP Middle East when licensing or access allows

Travel phase:

- Muslim-friendly travel publishers
- halal travel blogs with clean RSS
- Umrah and destination sources

### Tier 2: General news APIs

Use for breadth, not for trust leadership.

Examples:

- Google News RSS
- NewsData
- Mediastack

Rule:

- API stories should support coverage gaps
- curated Muslim-first sources should still dominate homepage ranking

### Tier 3: Internal editorial

AllHalal originals should be first-class items in the same content graph:

- explainers
- finance briefings
- halal living guides
- Ramadan and learning content

Internal content should appear in streams when relevant, not in a separate “blog style” bucket.

## Delivery architecture

### 1. Ingestion

Create a feed ingestion job that runs on a schedule:

- every 10 minutes for live sources
- every 30 minutes for slow editorial RSS
- on-demand refresh for admin overrides

Pipeline:

1. pull RSS and API feeds
2. normalize payloads into one schema
3. enrich with categories, entities and image selection
4. dedupe by canonical URL and normalized title
5. run safety filters
6. rank
7. store curated output

### 2. Normalized content model

Suggested record:

```ts
type AggregatedStory = {
  id: string;
  title: string;
  summary: string;
  url: string;
  imageUrl: string | null;
  sourceId: string;
  sourceName: string;
  sourceTier: "curated" | "api" | "internal";
  publishedAt: string;
  language: string;
  region?: string;
  stream: "faith" | "ummah" | "finance" | "health" | "living" | "learning" | "travel";
  subtopics: string[];
  trustScore: number;
  freshnessScore: number;
  visualScore: number;
  editorialPriority: number;
  heavy: boolean;
  sponsored: boolean;
};
```

### 3. Ranking

Homepage ranking should not be a plain chronological list.

Use weighted ranking:

- source trust
- freshness
- image quality
- summary quality
- stream diversity
- per-source caps
- per-stream caps

Recommended rules:

- max 2 stories per source on homepage
- max 1 lead story per source in the hero area
- at least 4 active streams on homepage
- no heavy conflict headline as hero
- no more than 1 consecutive card from the same source inside one section

## Freshness rules

Homepage freshness should be strict.

### Priority

- `0-24h` = breaking / very fresh
- `24-72h` = fresh

### Fallback

- `72h-7d` = acceptable fallback only when a stream is underfilled

### Reject from homepage

- anything older than `7 days`

Rule:

- if a stream has no fresh stories, show fewer cards
- do not fill the homepage with stale evergreen content just to complete a grid

## Homepage composition rules

### Lead story

Pick from the top-ranked pool with these constraints:

- strong image
- not heavy
- recent and preferably within 72 hours
- headline clear enough for broad readership

### Live radar

Use 3 compact items:

- highly recent
- source-diverse
- visually compact
- ideally from fast news sources before evergreen editorial sources

### Stream cards

Each stream should contain:

- 2 compact stories
- image, title, source and relative time
- max 2 lines of excerpt

This keeps the homepage looking like a dashboard instead of stacked article modules.

## Safety and trust

Add a moderation layer before homepage placement.

Rules:

- heavy conflict content can appear in the full hub but should not default into the homepage hero
- blocked feeds should degrade silently
- broken RSS, TLS failures or 402/403 source errors should not break the aggregate output
- missing or broken images should never render as empty white placeholders

Operational fallback:

- if a source fails, return empty set for that source
- if a stream is underfilled, fill from the next most relevant stream
- if external feeds fail broadly, show internal editorial plus cached stories
- image order: RSS image -> `og:image` -> category fallback art

## Caching strategy

Use 3 levels:

1. raw fetch cache
2. normalized aggregate cache
3. homepage composition cache

Recommended TTL:

- raw source fetch: 10-30 minutes
- normalized aggregate: 15-30 minutes
- homepage dashboard: 5-10 minutes

Add cache-bypass only for internal debugging and admin refresh.

## Monetization placement

Ads should feel native to the dashboard layout.

Recommended placements:

- one sponsored card inside the stream grid
- one sponsor rail item after the live radar
- never place ads between lead image and lead headline

Rules:

- sponsored cards must use the same visual system as news cards
- label clearly as `Sponsored`
- keep max one sponsored unit per homepage dashboard

## API surface

Recommended split:

- `/api/news/feed` for normalized feed output
- `/api/news/home` for homepage-ready dashboard payload
- `/api/news/stream/[id]` for a single stream
- `/api/news/admin/refresh` for manual re-ingestion

Homepage should ideally consume a dedicated composed payload instead of rebuilding all layout logic on the client.

## Recommended roadmap

### Phase 1

- homepage dashboard
- curated RSS only
- 6 streams
- cached client refresh

### Phase 2

- hybrid RSS + news API
- travel stream
- region-aware ranking
- sponsored card support

### Phase 3

- editor controls
- source health dashboard
- story pinning
- newsletter and push hooks

## Current implementation direction

For this repository, the practical next step is:

1. keep the homepage block as `Muslim World Today`
2. keep one CTA into `/blog`
3. use the homepage as a dashboard
4. let `/blog` remain the deeper full hub
5. continue hardening RSS reliability and source coverage behind the UI
