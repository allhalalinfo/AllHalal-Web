# Backend Task: Home/News Differentiation + Regional Sources

**Priority:** HIGH  
**Complexity:** Medium  
**Estimated effort:** 3-4 hours  
**Dependencies:** None

---

## 🎯 Goal

Transform content strategy to differentiate Home (lifestyle portal) from News (regional news desk).

**Current Problem:**
- Home and News show 80% identical content (same 12 articles)
- Only 4 sources total (MuslimMatters, SeekersGuidance, Al Jazeera, Muslim Girl)
- News lacks real regional coverage (Middle East, Asia, Africa)
- Too much Faith & Practice content (67%), not enough actual news

**Target Result:**
- Home: Unique lifestyle/faith content (<30% overlap with News)
- News: 70% real regional news from 15+ sources
- Geographic diversity: 6 regions covered
- 30+ items on News page vs 12 on Home

---

## 📋 Task Breakdown

### Task 1: Add Regional News RSS Sources (Priority 1)

Add these 15 RSS feeds to your RSS aggregator/parser:

```yaml
# Middle East (High Priority)
- name: "Middle East Eye"
  url: "https://www.middleeasteye.net/rss"
  category: "Ummah & World"
  
- name: "TRT World"
  url: "https://www.trtworld.com/api/rss"
  category: "Ummah & World"
  
- name: "The New Arab"
  url: "https://www.newarab.com/rss"
  category: "Ummah & World"
  
- name: "MEMO - Middle East Monitor"
  url: "https://www.middleeastmonitor.com/feed/"
  category: "Ummah & World"

# South Asia
- name: "Dawn (Pakistan)"
  url: "https://www.dawn.com/feeds/home"
  category: "Ummah & World"
  
- name: "The Daily Star (Bangladesh)"
  url: "https://www.thedailystar.net/feed/rss.xml"
  category: "Ummah & World"

# Southeast Asia
- name: "The Jakarta Post"
  url: "https://www.thejakartapost.com/rss"
  category: "Ummah & World"
  
- name: "Malaysiakini"
  url: "https://www.malaysiakini.com/rss/en/news.rss"
  category: "Ummah & World"

# UK/Europe
- name: "5Pillars UK"
  url: "https://5pillarsuk.com/feed/"
  category: "Ummah & World"
  
- name: "Islam21c"
  url: "https://www.islam21c.com/feed/"
  category: "Ummah & World"

# Africa
- name: "Daily Trust (Nigeria)"
  url: "https://dailytrust.com/feed/"
  category: "Ummah & World"
  
- name: "Premium Times (Nigeria)"
  url: "https://www.premiumtimesng.com/feed"
  category: "Ummah & World"

# Additional Quality Sources
- name: "Anadolu Agency"
  url: "https://www.aa.com.tr/en/rss/default?cat=world"
  category: "Ummah & World"
  
- name: "IslamicFinanceGuru"
  url: "https://www.islamicfinanceguru.com/feed/"
  category: "Islamic Finance"
  
- name: "Productive Muslim"
  url: "https://productivemuslim.com/feed/"
  category: "Halal Lifestyle"
```

**Validation:**
- Test each RSS feed works
- Verify articles parse correctly
- Check images are included
- Confirm at least 5-10 articles per source

---

### Task 2: Update Homepage Endpoint Logic

**File:** `backend/api/routers/briefs.py` (or equivalent)  
**Endpoint:** `GET /api/v1/briefs/home`

**Current behavior:** Returns recent news briefs  
**Required behavior:** Return ONLY lifestyle/faith content

**Implementation:**

```python
@router.get("/home")
async def get_homepage_layout():
    """
    Homepage curated content - lifestyle and faith focus
    NO news headlines - redirect to /news for that
    """
    
    # Define lifestyle sources (exclude news outlets)
    LIFESTYLE_SOURCES = [
        "MuslimMatters",
        "SeekersGuidance", 
        "Muslim Girl",
        "Muslim Heritage",
        "IslamicFinanceGuru",
        "Productive Muslim"
    ]
    
    # Define lifestyle categories
    LIFESTYLE_CATEGORIES = [
        "Faith & Practice",
        "Islamic Finance",
        "Halal Lifestyle",
        "Family & Education",
        "Health & Wellness",
        "Travel & Wellness"
    ]
    
    # Get recent items from lifestyle sources only
    all_items = await get_recent_briefs(limit=50)
    
    # Filter: only lifestyle sources AND lifestyle categories
    lifestyle_items = [
        item for item in all_items
        if (item.sources[0].name in LIFESTYLE_SOURCES and
            item.category in LIFESTYLE_CATEGORIES)
    ]
    
    # If not enough items, relax source filter but keep category filter
    if len(lifestyle_items) < 12:
        lifestyle_items = [
            item for item in all_items
            if item.category in LIFESTYLE_CATEGORIES
        ]
    
    # Apply freshness filter (14 days)
    fresh_items = filter_fresh_items(lifestyle_items, max_age_days=14)
    
    # Select hero (best quality, with image)
    hero = select_best_hero(fresh_items)
    
    # Category balance for remaining items
    remaining = [item for item in fresh_items if item.id != hero.id]
    
    featured = balance_categories(remaining, limit=4, target={
        "Faith & Practice": 2,
        "Islamic Finance": 1,
        "Halal Lifestyle": 1
    })
    
    compact = balance_categories(
        [item for item in remaining if item.id not in [f.id for f in featured]], 
        limit=7,
        target={
            "Faith & Practice": 3,
            "Islamic Finance": 2,
            "Family & Education": 1,
            "Health & Wellness": 1
        }
    )
    
    return {
        "success": True,
        "hero": hero,
        "featured": featured,
        "compact": compact,
        "total_count": 12,
        "source": "homepage_curated",
        "filters_applied": ["lifestyle_only", "no_news", "category_balance"]
    }
```

**Test:**
```bash
curl https://api.allhalal.info/api/v1/briefs/home | jq

# Verify:
# - No Al Jazeera, Middle East Eye, TRT World, Dawn, etc.
# - Categories: Faith, Finance, Lifestyle, Family (NO "Ummah & World")
# - Sources: MuslimMatters, SeekersGuidance, etc. (lifestyle-focused)
```

---

### Task 3: Update News Feed Endpoint Logic

**File:** `backend/api/routers/briefs.py` (or equivalent)  
**Endpoint:** `GET /api/v1/briefs/feed`

**Current behavior:** Mixed content (faith + news)  
**Required behavior:** 70% real news, 30% other

**Implementation:**

```python
@router.get("/feed")
async def get_news_feed(
    category: Optional[str] = None,
    limit: int = 30,
    offset: int = 0
):
    """
    News feed - prioritize real news from regional sources
    """
    
    # If specific category requested, honor it
    if category:
        items = await get_briefs_by_category(category, limit=limit, offset=offset)
        return {"success": True, "items": items, "count": len(items)}
    
    # Define news sources (prioritize these)
    NEWS_SOURCES = [
        "Al Jazeera",
        "Middle East Eye",
        "TRT World",
        "The New Arab",
        "MEMO",
        "Dawn",
        "The Daily Star",
        "The Jakarta Post",
        "Malaysiakini",
        "5Pillars UK",
        "Islam21c",
        "Daily Trust",
        "Premium Times",
        "Anadolu Agency"
    ]
    
    # News categories
    NEWS_CATEGORIES = [
        "Ummah & World",
        "Tech & Innovation"
    ]
    
    # Get all recent items
    all_items = await get_recent_briefs(limit=100)
    
    # Filter freshness (14 days for news)
    fresh_items = filter_fresh_items(all_items, max_age_days=14)
    
    # Separate news from other content
    news_items = [
        item for item in fresh_items
        if (item.sources[0].name in NEWS_SOURCES or 
            item.category in NEWS_CATEGORIES)
    ]
    
    other_items = [
        item for item in fresh_items
        if item.id not in [n.id for n in news_items]
    ]
    
    # Build result: 70% news, 30% other
    news_count = int(limit * 0.7)  # 21 out of 30
    other_count = limit - news_count  # 9 out of 30
    
    result = news_items[:news_count] + other_items[:other_count]
    
    # Apply offset
    result = result[offset:offset+limit]
    
    return {
        "success": True,
        "items": result,
        "count": len(result),
        "total": len(fresh_items),
        "hasMore": (offset + len(result)) < len(fresh_items),
        "offset": offset,
        "limit": limit,
        "filters_applied": ["news_priority_70", "freshness_14d"]
    }
```

**Test:**
```bash
curl https://api.allhalal.info/api/v1/briefs/feed?limit=30 | jq

# Verify:
# - ~21 items (70%) from news sources (Al Jazeera, MEE, TRT, Dawn, etc.)
# - ~9 items (30%) from lifestyle sources
# - Geographic diversity: Middle East, Asia, Africa, Europe
# - Category: Majority "Ummah & World"
```

---

### Task 4: Verify Differentiation

**Test overlap between Home and News:**

```python
# Add this test endpoint temporarily
@router.get("/admin/content-overlap")
async def check_content_overlap():
    home_data = await get_homepage_layout()
    news_data = await get_news_feed(limit=30)
    
    home_ids = [home_data["hero"]["id"]] + \
               [f["id"] for f in home_data["featured"]] + \
               [c["id"] for c in home_data["compact"]]
    
    news_ids = [item["id"] for item in news_data["items"]]
    
    overlap = set(home_ids) & set(news_ids)
    overlap_percentage = (len(overlap) / len(home_ids)) * 100
    
    return {
        "home_count": len(home_ids),
        "news_count": len(news_ids),
        "overlap_count": len(overlap),
        "overlap_percentage": overlap_percentage,
        "target_max": 30,
        "status": "PASS" if overlap_percentage < 30 else "FAIL"
    }
```

**Run test:**
```bash
curl https://api.allhalal.info/admin/content-overlap | jq

# Expected:
# {
#   "overlap_percentage": 15-25,
#   "status": "PASS"
# }
```

---

## 📊 Success Criteria

**Must achieve ALL of these:**

1. **Home Endpoint:**
   - ✅ 12 items total (1 hero + 4 featured + 7 compact)
   - ✅ 0% "Ummah & World" category
   - ✅ 0 items from news sources (Al Jazeera, MEE, etc.)
   - ✅ Categories: Faith (40%), Finance (25%), Lifestyle (20%), Family (15%)
   - ✅ Sources: MuslimMatters, SeekersGuidance, IFG, Muslim Girl

2. **News Feed Endpoint:**
   - ✅ 30+ items available
   - ✅ ≥70% "Ummah & World" category
   - ✅ ≥10 unique sources
   - ✅ Geographic diversity: ≥4 regions (ME, Asia, Africa, Europe)
   - ✅ News sources active: Al Jazeera, MEE, TRT, Dawn, 5Pillars, etc.

3. **Differentiation:**
   - ✅ Content overlap: <30%
   - ✅ Home feels like "lifestyle portal"
   - ✅ News feels like "news desk"

4. **Quality:**
   - ✅ All RSS feeds working
   - ✅ Images present (60%+ of articles)
   - ✅ No broken links
   - ✅ Articles parse correctly

---

## 🧪 Testing Commands

```bash
# Test new RSS sources work
curl https://www.middleeasteye.net/rss
curl https://www.trtworld.com/api/rss
curl https://www.dawn.com/feeds/home

# Test backend endpoints
curl https://api.allhalal.info/api/v1/briefs/home | jq '.hero.sources[0].name, .featured[].category'
curl https://api.allhalal.info/api/v1/briefs/feed?limit=30 | jq '.items | group_by(.category) | map({cat: .[0].category, count: length})'

# Test overlap
curl https://api.allhalal.info/admin/content-overlap | jq '.overlap_percentage'

# Test source diversity
curl https://api.allhalal.info/api/v1/briefs/feed?limit=30 | jq '[.items[].sources[0].name] | unique'
```

---

## 📝 Deliverables

1. **Code Changes:**
   - Add 15 RSS sources to configuration
   - Update `GET /api/v1/briefs/home` endpoint
   - Update `GET /api/v1/briefs/feed` endpoint
   - Add overlap test endpoint (temporary)

2. **Verification:**
   - Test results showing <30% overlap
   - List of active sources (≥15)
   - Category distribution report
   - Geographic diversity confirmation

3. **Documentation:**
   - Brief summary of changes made
   - Any issues encountered with RSS feeds
   - Recommendations for future improvements

---

## 🚨 Important Notes

- **DO NOT** modify frontend code (it will auto-consume new backend data)
- **DO** validate each RSS feed before adding
- **DO** handle RSS parsing errors gracefully
- **DO** ensure images are included when available
- **DO** apply deduplication (same article from multiple sources)
- **DO** maintain existing endpoints' response format (frontend depends on it)

---

## 📚 Reference Documents

- Full plan: `/Users/adelyanurusheva/Desktop/Allhalal-Web/docs/home-vs-news-differentiation-plan.md`
- Source list: `/Users/adelyanurusheva/Desktop/Allhalal-Web/docs/regional-news-sources.md`

---

**Start:** When ready  
**Report back:** With test results and any issues  
**Questions:** Ask if any RSS feeds don't work or requirements unclear

**Expected completion:** 3-4 hours  
**Impact:** HIGH (transforms user experience significantly)
