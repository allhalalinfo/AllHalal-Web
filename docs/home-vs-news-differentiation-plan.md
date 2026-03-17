# Home vs News Differentiation Plan

**Date:** March 17, 2026  
**Goal:** Make Home unique + expand News with real regional news

---

## 🎯 Vision

### Home Page (Portal Style)
- **Purpose:** Quick overview of Muslim life
- **Content Mix:**
  - Faith & Practice tips
  - Islamic Finance insights
  - Halal Lifestyle content
  - Community highlights
  - NOT just news headlines

### News Page (News Desk)
- **Purpose:** Comprehensive Muslim world news
- **Content Focus:**
  - Breaking news from Muslim regions
  - Geopolitical coverage (Middle East, Asia, Africa)
  - Ummah & World category dominance
  - Real journalism, not just religious content

---

## 📋 Backend Changes Needed

### Priority 1: Add Regional News Sources

**Middle East:**
- Middle East Eye (https://www.middleeasteye.net/)
- The New Arab (https://www.newarab.com/)
- MEMO - Middle East Monitor (https://www.middleeastmonitor.com/)
- Gulf News (https://gulfnews.com/)
- Arab News (https://www.arabnews.com/)

**Asia:**
- The Muslim 500 (https://themuslim500.com/news/)
- Malaysia Today (https://www.malaysia-today.net/)
- Dawn (Pakistan) (https://www.dawn.com/)
- The Jakarta Post (Indonesia) (https://www.thejakartapost.com/)

**Africa:**
- Daily Trust (Nigeria) (https://dailytrust.com/)
- The Africa Report (https://www.theafricareport.com/)

**UK/Europe:**
- 5Pillars UK (https://5pillarsuk.com/)
- Islam21c (https://www.islam21c.com/)
- Middle East Eye UK section

**Global Muslim Media:**
- Al Jazeera (already have) ✅
- TRT World (Turkey) (https://www.trtworld.com/)
- Anadolu Agency (https://www.aa.com.tr/en)

---

### Priority 2: Separate Content Strategies

#### Home Endpoint: `/api/v1/briefs/home`

**Current:** Returns recent news briefs  
**Needed:** Return curated lifestyle/faith content

**Strategy:**
```python
def get_homepage_layout():
    # Faith & Practice: 40% (tips, how-tos)
    # Islamic Finance: 20% (practical advice)
    # Halal Lifestyle: 20% (food, travel, wellness)
    # Family & Education: 20% (parenting, learning)
    # Ummah News: 0% (redirect to News page)
    
    # Sources priority:
    # - MuslimMatters (community)
    # - SeekersGuidance (education)
    # - IslamicFinanceGuru (finance)
    # - Muslim Heritage (culture)
    # - Productive Muslim (lifestyle)
```

#### News Feed: `/api/v1/briefs/feed`

**Current:** Mixed content (faith + news)  
**Needed:** Focus on actual news

**Strategy:**
```python
def get_news_feed():
    # Ummah & World: 70% (real news)
    # Tech & Innovation: 10% (Muslim tech)
    # Islamic Finance: 10% (market news)
    # Faith & Practice: 10% (only if newsworthy)
    
    # Sources priority:
    # - Al Jazeera (global)
    # - Middle East Eye (regional)
    # - TRT World (Turkey)
    # - Dawn (Pakistan)
    # - Regional outlets
```

---

## 🔧 Implementation Steps

### Step 1: Add RSS Sources (Backend)

**File:** `backend/config/rss_sources.yaml` (or similar)

```yaml
news_sources:
  - name: "Middle East Eye"
    url: "https://www.middleeasteye.net/rss"
    category: "Ummah & World"
    priority: "high"
    
  - name: "TRT World"
    url: "https://www.trtworld.com/rss"
    category: "Ummah & World"
    priority: "high"
    
  - name: "Dawn"
    url: "https://www.dawn.com/feeds/home"
    category: "Ummah & World"
    priority: "medium"
    
  - name: "5Pillars UK"
    url: "https://5pillarsuk.com/feed/"
    category: "Ummah & World"
    priority: "medium"

lifestyle_sources:
  - name: "Productive Muslim"
    url: "https://productivemuslim.com/feed/"
    category: "Halal Lifestyle"
    priority: "high"
    
  - name: "IslamicFinanceGuru"
    url: "https://www.islamicfinanceguru.com/feed/"
    category: "Islamic Finance"
    priority: "high"
```

### Step 2: Update Homepage Logic (Backend)

**File:** `backend/api/routers/briefs.py`

**Current:**
```python
@router.get("/home")
async def get_homepage_layout():
    # Returns recent briefs
    items = await get_recent_briefs(limit=12)
    return curate_homepage(items)
```

**Needed:**
```python
@router.get("/home")
async def get_homepage_layout():
    # Get lifestyle/faith content only
    lifestyle = await get_briefs_by_categories([
        "Faith & Practice",
        "Islamic Finance", 
        "Halal Lifestyle",
        "Family & Education"
    ], limit=20)
    
    # Exclude news sources
    lifestyle = exclude_sources(lifestyle, [
        "Al Jazeera",
        "Middle East Eye",
        "TRT World"
    ])
    
    return {
        "hero": select_hero(lifestyle),
        "featured": lifestyle[1:5],
        "compact": lifestyle[5:12]
    }
```

### Step 3: Update News Feed Logic (Backend)

**File:** `backend/api/routers/briefs.py`

**Current:**
```python
@router.get("/feed")
async def get_feed(category: str = None):
    # Returns all briefs
    return await get_all_briefs(category=category)
```

**Needed:**
```python
@router.get("/feed")
async def get_feed(category: str = None):
    if category:
        return await get_briefs_by_category(category)
    
    # Default: prioritize news
    briefs = await get_all_briefs()
    
    # Sort: news first, then other
    news_categories = ["Ummah & World", "Tech & Innovation"]
    news = [b for b in briefs if b.category in news_categories]
    other = [b for b in briefs if b.category not in news_categories]
    
    # 70% news, 30% other
    result = news[:21] + other[:9]
    
    return result[:30]
```

---

## 📊 Expected Results

### Before:
```
Home: 12 items
- Faith & Practice: 8 (67%)
- Ummah & World: 4 (33%)
- Same as News first 12

News: 11 items
- Faith & Practice: 6 (55%)
- Ummah & World: 3 (27%)
- Sources: 3 (limited)
```

### After:
```
Home: 12 items
- Faith & Practice: 5 (42%)
- Islamic Finance: 3 (25%)
- Halal Lifestyle: 2 (17%)
- Family & Education: 2 (17%)
- NO overlap with News
- Sources: MuslimMatters, SeekersGuidance, IFG

News: 30+ items
- Ummah & World: 21 (70%)
- Tech & Innovation: 3 (10%)
- Islamic Finance: 3 (10%)
- Faith & Practice: 3 (10%)
- Sources: 10+ (regional focus)
- Geographic diversity: ✅
```

---

## 🚀 Frontend Changes (Optional)

### Update Home Title/Description

**File:** `components/briefs/BriefsHomeSection.tsx`

```tsx
// Current:
<h2>Muslim World Today</h2>
<p>Short briefs from across faith, family and the wider Ummah.</p>

// New:
<h2>Today For You</h2>
<p>Curated insights on faith, finance, and halal living.</p>
```

### Update News Title

**File:** `app/[locale]/news/page.tsx`

```tsx
// Current:
<h1>Fresh Muslim news, easier to follow</h1>

// Keep or enhance:
<h1>Muslim World News</h1>
<p>Breaking news and analysis from the global Muslim community.</p>
```

---

## 📝 Action Items

### For Backend AI:
- [ ] Add 15-20 regional news sources RSS feeds
- [ ] Create separate content strategies for /home vs /feed
- [ ] Update homepage endpoint to exclude news sources
- [ ] Update feed endpoint to prioritize Ummah & World (70%)
- [ ] Test that Home and News have <30% overlap
- [ ] Verify geographic diversity in News sources

### For Frontend (Optional):
- [ ] Update Home section title/description
- [ ] Add "More News" link prominently on Home
- [ ] Consider adding category indicators on News page

---

## 🎯 Success Metrics

- **Content Overlap:** <30% between Home and News
- **News Category Balance:** Ummah & World ≥60% on News page
- **Source Diversity:** ≥10 unique sources on News page
- **Geographic Coverage:** ≥3 regions represented (Middle East, Asia, Africa, Europe)
- **Home Uniqueness:** Focus on lifestyle/faith (not news headlines)

---

**Status:** 📋 PLANNING  
**Owner:** Backend AI  
**Depends On:** RSS source configuration, content strategy implementation  
**Frontend Ready:** Yes (will work with any backend changes)
