# Search Functionality 🔍

## Overview

Full-featured site search with Cmd+K modal, powered by Fuse.js. Indexes 100+ pages across all content types.

## Features

- ⌨️ **Cmd+K / Ctrl+K shortcut** - Global keyboard shortcut
- 🎯 **Smart fuzzy search** - Finds relevant results even with typos
- 📂 **Categorized results** - Groups results by category (Restaurants, Travel, Ingredients, etc.)
- 🚀 **Fast client-side search** - No server roundtrips
- 📱 **Mobile-friendly** - Touch-optimized with responsive design
- ⌨️ **Keyboard navigation** - Arrow keys to navigate, Enter to select
- 🔥 **Popular searches** - Shows trending searches when idle
- 🎨 **Beautiful UI** - Modern modal with smooth animations

## Architecture

### Search Index Builder (`lib/search/build-index.ts`)

Builds search index from all data sources:
- Cities (restaurants pages)
- Countries (travel pages)
- Ingredients (halal status)
- E-codes (food additives)
- Dubai areas (real estate)
- Developers
- Static pages

**Index structure:**
```typescript
{
  items: SearchResult[], // All searchable items
  lastUpdated: string    // ISO timestamp
}
```

**SearchResult fields:**
- `type` - Content type (city/area/ingredient/e-code/developer/country/page)
- `slug` - URL slug
- `title` - Display title
- `description` - Search-friendly description
- `category` - Group category (Restaurants/Travel/Ingredients/etc.)
- `url` - Full URL path
- `snippet` - Quick status/info (e.g. "✅ HALAL")
- `metadata` - Type-specific data (status, price range, country, etc.)

### Search Client (`lib/search/client.ts`)

Fuse.js wrapper with:
- Weighted search keys (title: 2x, description: 1x)
- Configurable threshold (default 0.3)
- Category filtering
- Result grouping
- Search suggestions

### Components

**SearchModal** (`components/media/search/SearchModal.tsx`)
- Full-screen modal with backdrop
- Real-time search with debouncing
- Keyboard navigation (↑/↓/Enter/Esc)
- Grouped results by category
- Popular searches when idle
- No results state

**SearchButton** (`components/media/search/SearchButton.tsx`)
- Header button with Cmd+K hint
- Auto-detects Mac/Windows for correct key

**SearchProvider** (`components/media/search/SearchProvider.tsx`)
- Global state management
- Cmd+K shortcut handler
- Index initialization

## Usage

### Opening Search

**Keyboard:**
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)

**Programmatically:**
```tsx
import { useSearch } from '@/components/media/search';

function MyComponent() {
  const { openSearch, closeSearch, isOpen } = useSearch();
  
  return (
    <button onClick={openSearch}>
      Search Site
    </button>
  );
}
```

### Adding New Content to Index

Edit `lib/search/build-index.ts`:

```typescript
// Example: Add blog posts
blogPosts.forEach(post => {
  items.push({
    type: 'post',
    slug: post.slug,
    title: post.title,
    description: post.excerpt,
    category: 'Blog',
    url: `/blog/${post.slug}`,
    metadata: {
      // Optional type-specific data
    }
  });
});
```

The index rebuilds automatically on each deployment.

## Search Statistics

Current index size:
- **Cities:** 30+ (restaurants)
- **Countries:** 25+ (travel/finance/certification)
- **Ingredients:** 60+
- **E-codes:** 30+
- **Dubai Areas:** 25+ (real estate)
- **Developers:** 30+
- **Static Pages:** 4+

**Total:** 200+ searchable items

## Performance

- **Index size:** ~50-100KB (gzipped)
- **Search speed:** <10ms per query (client-side)
- **First load:** Index cached in memory
- **Revalidation:** Every hour (ISR)

## Analytics

Tracked events:
- `search_open` - When modal opens
- `search_query` - When user types (with result count)
- `search_result_click` - When user clicks result (with query, URL, position)

See `lib/analytics/events.ts` for details.

## API Route

`/api/search` - Returns full search index (JSON)
- Static generation
- Revalidates every hour
- Cache headers: `s-maxage=3600, stale-while-revalidate=86400`

## Future Enhancements

- [ ] Search analytics dashboard
- [ ] "Did you mean" suggestions
- [ ] Recent searches (localStorage)
- [ ] Search filters (halal/haram, price range, etc.)
- [ ] Voice search
- [ ] Search highlights in results
- [ ] Autocomplete suggestions
- [ ] Related searches
- [ ] Search by image (ingredient scan)

## Testing

**Manual test checklist:**
1. Open search with Cmd+K ✓
2. Type "dubai" → see restaurants + real estate ✓
3. Type "gelatin" → see ingredient with status badge ✓
4. Navigate with arrow keys ✓
5. Select with Enter ✓
6. Close with Esc ✓
7. Test on mobile (touch) ✓
8. Verify popular searches show when idle ✓
9. Verify "no results" state ✓
10. Verify results grouped by category ✓

**Lighthouse:**
- No impact on Performance score (lazy-loaded)
- No CLS (modal overlays, no layout shift)
- Accessible (keyboard navigation, ARIA labels)
