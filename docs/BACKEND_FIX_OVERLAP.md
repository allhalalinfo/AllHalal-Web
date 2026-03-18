# 🚨 CRITICAL: 64% Content Overlap + Too Few Articles

**Date:** March 18, 2026  
**Status:** CRITICAL - Two major problems  
**Priority:** P0 - Must fix immediately

---

## 🔴 PROBLEM #1: Content Overlap (64%)

```bash
HOME:  11 articles
NEWS:  11 articles
OVERLAP: 7 articles (64%)  ❌ КРИТИЧНО!
```

**Goal:** <30% overlap

---

## 🔴 PROBLEM #2: Too Few Articles

```bash
CURRENT:
- HOME: 11 articles (goal: 12)   → 92% ✅ близко
- NEWS: 11 articles (goal: 30+)  → 37% ❌ МАЛО!

TARGET:
- HOME: 12 articles
- NEWS: 30+ articles
```

**Почему так мало новостей?**

1. **Только 5 активных источников в NEWS:**
   - Dawn (3 статьи)
   - Hindu (1 статья)
   - Sound Vision (3 статьи)
   - MuslimMatters (1 статья)
   - SeekersGuidance (3 статьи)

2. **Не добавлены новые RSS источники:**
   - ❌ Al Jazeera
   - ❌ Middle East Eye
   - ❌ TRT World
   - ❌ 5Pillars UK
   - ❌ Premium Times
   - ❌ CNA Singapore
   - ❌ The Star Malaysia
   - ❌ Malaysiakini
   - ❌ Anadolu Agency
   
3. **Низкие fetch limits:**
   - Сейчас: fetch ~20-30 items per source
   - Нужно: fetch 50-100 items per source

4. **Нет source balancing:**
   - Один источник может давать 10+ статей
   - Другие источники блокируются

**Проверка:**
```bash
curl https://api.allhalal.info/api/v1/briefs/home | jq '[.hero.id, (.featured[].id), (.compact[].id)]'
curl https://api.allhalal.info/api/v1/briefs/feed | jq '[.items[].id]'

# 7 из 11 статей одинаковые!
```

**Дублирующиеся статьи:**
- Sound Vision: 3 статьи (4915, 4920, 4921)
- MuslimMatters: 1 статья (95285)
- SeekersGuidance: 3 статьи (372271, 372279, 372283)

---

## 🎯 ROOT CAUSE

**Backend НЕ РЕАЛИЗОВАЛ content differentiation!**

Оба endpoint'а берут из **одного пула** источников:
- HOME: MuslimMatters, SeekersGuidance, Sound Vision
- NEWS: MuslimMatters, SeekersGuidance, Sound Vision, Dawn, Hindu

**Результат:** 7 из 11 статей дублируются!

---

## ✅ SOLUTION: Separate Source Pools

### **Strategy 1: HOME = Lifestyle ONLY**

```python
# HOME endpoint - LIFESTYLE sources ONLY
LIFESTYLE_SOURCES = [
    "MuslimMatters",
    "SeekersGuidance", 
    "Sound Vision",
    "About Islam",
    "Muslim Heritage",
    "Virtual Mosque",
    "Muslim Girl",
    "Bayyinah Institute",
    "Muslim Converts",
    "Muslim Youth Musings"
]

# EXCLUDE from Home: Dawn, Hindu, Al Jazeera, MEE, TRT, Premium Times
```

### **Strategy 2: NEWS = Regional News DOMINANT**

```python
# NEWS endpoint - NEWS sources DOMINANT (70%)
NEWS_SOURCES = [
    "Dawn",              # Pakistan
    "The Hindu",         # India
    "Al Jazeera",        # Qatar
    "5Pillars UK",       # UK
    "CNA",               # Singapore
    "Premium Times",     # Nigeria
    "The Star Malaysia", # Malaysia
    "Malaysiakini",      # Malaysia
    "Anadolu Agency"     # Turkey
]

# Allow SOME lifestyle (30%), but EXCLUDE if already in Home
LIFESTYLE_SUPPLEMENT = [
    "Muslim Girl",       # Opinion/lifestyle
    "About Islam"        # Commentary
]

# EXCLUDE from News: MuslimMatters, SeekersGuidance, Sound Vision if they're in Home
```

---

---

## 🎯 WHY ONLY 11 ARTICLES IN NEWS?

### Current Backend Behavior:

**Problem:** Backend fetches too few items and doesn't use all sources!

```python
# Current (bad):
all_items = await fetch_from_sources(sources, limit_per_source=10)  # Too low!
result = all_items[:30]  # But only got 11 items total!
```

**What's happening:**
1. Fetch limit too low (10 per source)
2. Only 5 sources active (Dawn, Hindu, Sound Vision, MuslimMatters, SeekersGuidance)
3. Missing 9+ news sources (Al Jazeera, MEE, TRT, 5Pillars, etc.)
4. Result: Only 11 items instead of 30+

### Solution: Increase Fetch Limits + Add Sources

```python
# Fixed (good):
all_items = await fetch_from_sources(
    sources=ALL_NEWS_SOURCES,  # 15+ sources, not 5!
    limit_per_source=50,       # Fetch MORE per source
    total_limit=200            # Fetch 200 total, then balance to 30
)

# Balance sources (max 3 per source)
balanced = balance_sources(all_items, max_per_source=3)

# Return top 30
result = balanced[:30]
```

**This ensures:**
- ✅ Fetch from 15+ sources (not 5)
- ✅ Get 50+ items per source (not 10)
- ✅ Balance to max 3 per source
- ✅ Return 30 articles (not 11)

---

## 📋 MISSING RSS SOURCES

**These RSS sources were tested and WORK but are NOT ACTIVE:**

```python
# Regional News (TESTED, WORKING):
ACTIVE_NEWS_SOURCES = [
    # Already working:
    "Dawn",                  # ✅ Pakistan (3 articles)
    "The Hindu",             # ✅ India (1 article)
    
    # WORKING but NOT ACTIVE:
    "Al Jazeera",            # ❌ Qatar - 25 items available
    "5Pillars UK",           # ❌ UK - 50 items available (very active!)
    "CNA",                   # ❌ Singapore - 12 items, 100% real images
    "Premium Times",         # ❌ Nigeria - 15 items, 100% real images
    "The Star Malaysia",     # ❌ Malaysia - 10 items
    "Malaysiakini",          # ❌ Malaysia - 30 items
    "Anadolu Agency",        # ❌ Turkey - 30 items
]
```

**Why aren't these active?**
- Either not added to RSS config
- Or fetch limit too low to see them
- Or not in NEWS_SOURCES list

**Action:** Add these to config and ensure they're fetched!

---

## 🔧 CODE CHANGES NEEDED

### 0. **FIRST: Add Missing RSS Sources to Config**

```python
# In config or RSS_SOURCES list:
RSS_SOURCES = [
    # Existing working sources:
    {"name": "Dawn", "url": "https://www.dawn.com/feeds/home", "type": "news"},
    {"name": "The Hindu", "url": "https://www.thehindu.com/news/national/feeder/default.rss", "type": "news"},
    
    # ADD THESE (all tested and working):
    {"name": "Al Jazeera", "url": "https://www.aljazeera.com/xml/rss/all.xml", "type": "news"},
    {"name": "5Pillars UK", "url": "https://5pillarsuk.com/feed/", "type": "news"},
    {"name": "CNA", "url": "https://www.channelnewsasia.com/rssfeeds/8395884", "type": "news"},
    {"name": "Premium Times", "url": "https://www.premiumtimesng.com/feed", "type": "news"},
    {"name": "The Star Malaysia", "url": "https://www.thestar.com.my/rss/news/nation/", "type": "news"},
    {"name": "Malaysiakini", "url": "https://www.malaysiakini.com/feed", "type": "news"},
    {"name": "Anadolu Agency", "url": "https://www.aa.com.tr/en/rss/default?cat=world", "type": "news"},
    
    # Existing lifestyle sources:
    {"name": "MuslimMatters", "url": "https://muslimmatters.org/feed/", "type": "lifestyle"},
    {"name": "SeekersGuidance", "url": "https://seekersguidance.org/feed/", "type": "lifestyle"},
    {"name": "Sound Vision", "url": "https://www.soundvision.com/rss.xml", "type": "lifestyle"},
    # ... etc
]
```

**Critical:** These sources were already tested in the audit and WORK! Just need to be added!

---

### 1. Update HOME Endpoint

```python
@router.get("/home")
async def get_homepage_layout():
    """
    HOME = Pure lifestyle/faith content
    NO NEWS sources allowed!
    """
    
    # Fetch ONLY from lifestyle sources
    lifestyle_sources = [
        "MuslimMatters", "SeekersGuidance", "Sound Vision",
        "About Islam", "Muslim Heritage", "Virtual Mosque",
        "Muslim Girl", "Bayyinah Institute", "Muslim Converts"
    ]
    
    # Fetch more items to ensure 12
    all_briefs = await fetch_from_sources(
        source_names=lifestyle_sources,
        limit_per_source=20,
        total_limit=100
    )
    
    # Filter by category (NO "Ummah & World")
    lifestyle_briefs = [
        b for b in all_briefs 
        if b.category in ["Faith & Practice", "Islamic Finance", "Halal Living", "Family & Community", "Wellness"]
    ]
    
    # Sort by quality (engagement, images, recency)
    sorted_briefs = sort_by_quality(lifestyle_briefs)
    
    # Select 12 best
    hero = sorted_briefs[0]
    featured = sorted_briefs[1:5]   # 4 items
    compact = sorted_briefs[5:12]   # 7 items
    
    return {
        "hero": hero,
        "featured": featured,
        "compact": compact
    }
```

### 2. Update NEWS Feed Endpoint

```python
@router.get("/feed")
async def get_news_feed(
    category: Optional[str] = None,
    limit: int = 30,
    offset: int = 0
):
    """
    NEWS = Regional news (70%) + some lifestyle commentary (30%)
    MUST exclude articles already shown in Home!
    MUST fetch from MORE sources with HIGHER limits!
    """
    
    # Step 1: Get current Home articles to EXCLUDE
    home_data = await get_homepage_layout()
    home_ids = {home_data["hero"]["id"]} | {f["id"] for f in home_data["featured"]} | {c["id"] for c in home_data["compact"]}
    
    # Step 2: Fetch from NEWS sources (70%) - INCREASED LIMITS!
    news_sources = [
        "Dawn", "The Hindu", "Al Jazeera", "5Pillars UK",
        "CNA", "Premium Times", "The Star Malaysia", 
        "Malaysiakini", "Anadolu Agency"
    ]
    
    news_briefs = await fetch_from_sources(
        source_names=news_sources,
        limit_per_source=50,      # ← INCREASED from 10 to 50!
        total_limit=300           # ← INCREASED from 50 to 300!
    )
    
    # Step 3: Fetch from lifestyle sources for commentary (30%) - INCREASED LIMITS!
    lifestyle_sources = ["Muslim Girl", "About Islam", "MuslimMatters"]
    
    lifestyle_briefs = await fetch_from_sources(
        source_names=lifestyle_sources,
        limit_per_source=20,      # ← INCREASED from 5 to 20!
        total_limit=100           # ← INCREASED from 30 to 100!
    )
    
    # Step 4: EXCLUDE anything in Home
    news_briefs = [b for b in news_briefs if b.id not in home_ids]
    lifestyle_briefs = [b for b in lifestyle_briefs if b.id not in home_ids]
    
    # Step 5: Balance 70/30
    news_count = int(limit * 0.7)     # 21 из 30
    lifestyle_count = limit - news_count  # 9 из 30
    
    # Step 6: Source diversity (max 3 per source) - CRITICAL for variety!
    news_briefs = balance_sources(news_briefs, max_per_source=3)
    lifestyle_briefs = balance_sources(lifestyle_briefs, max_per_source=2)
    
    # Step 7: Combine
    result = news_briefs[:news_count] + lifestyle_briefs[:lifestyle_count]
    
    # Step 8: Sort by date/quality
    result = sort_by_date(result)
    
    return {
        "items": result[offset:offset+limit],
        "total": len(result),
        "offset": offset,
        "limit": limit
    }
```

**Key changes:**
- ✅ `limit_per_source=50` (was 10) - fetch MORE from each source
- ✅ `total_limit=300` (was 50) - fetch MORE total
- ✅ `balance_sources(max_per_source=3)` - ensure variety
- ✅ Exclude `home_ids` - prevent overlap
- ✅ Use 9 news sources (was 5)

### 3. Add Helper: `balance_sources()`

```python
def balance_sources(items: list, max_per_source: int = 3) -> list:
    """
    Limit articles per source for diversity.
    """
    from collections import defaultdict
    
    source_count = defaultdict(int)
    result = []
    
    for item in items:
        source = item.sources[0].name
        if source_count[source] < max_per_source:
            result.append(item)
            source_count[source] += 1
    
    return result
```

---

## 🧪 TESTING

After deployment, verify BOTH problems are fixed:

### Test #1: Content Overlap (<30%)

```bash
# Get IDs from both endpoints
curl -s https://api.allhalal.info/api/v1/briefs/home | \
  jq -r '[.hero.id, (.featured[].id), (.compact[].id)] | .[]' | sort > /tmp/home.txt

curl -s https://api.allhalal.info/api/v1/briefs/feed?limit=30 | \
  jq -r '.items[].id' | sort > /tmp/news.txt

# Count overlap
comm -12 /tmp/home.txt /tmp/news.txt | wc -l

# Calculate percentage
HOME_COUNT=$(cat /tmp/home.txt | wc -l)
NEWS_COUNT=$(cat /tmp/news.txt | wc -l)
OVERLAP=$(comm -12 /tmp/home.txt /tmp/news.txt | wc -l)

echo "HOME: $HOME_COUNT articles"
echo "NEWS: $NEWS_COUNT articles"
echo "OVERLAP: $OVERLAP articles"
echo "OVERLAP %: $(($OVERLAP * 100 / $HOME_COUNT))%"
```

### Test #2: Article Count (30+ in NEWS)

```bash
# Check article count and sources
curl -s https://api.allhalal.info/api/v1/briefs/feed?limit=50 | jq '{
  total_items: (.items | length),
  unique_sources: ([.items[].sources[0].name] | unique | length),
  all_sources: ([.items[].sources[0].name] | unique),
  source_distribution: ([.items[].sources[0].name] | group_by(.) | map({source: .[0], count: length}) | sort_by(-.count))
}'
```

### Test #3: Source Diversity

```bash
# Verify news sources are active
curl -s https://api.allhalal.info/api/v1/briefs/feed?limit=50 | \
  jq '[.items[].sources[0].name] | unique'

# Should include:
# - Dawn, The Hindu (already working)
# - Al Jazeera, 5Pillars UK, CNA, Premium Times (NEW)
# - The Star Malaysia, Malaysiakini, Anadolu (NEW)
```

---

## ✅ Success Criteria:

### Problem #1: Content Overlap
```bash
BEFORE:
HOME: 11 articles
NEWS: 11 articles
OVERLAP: 7 articles (64%) ❌

AFTER:
HOME: 12 articles
NEWS: 30+ articles
OVERLAP: 3-4 articles (25-30%) ✅ <30%
```

### Problem #2: Article Count
```bash
BEFORE:
NEWS: 11 articles from 5 sources ❌

AFTER:
NEWS: 30+ articles from 10-12 sources ✅
```

### Problem #3: Source Diversity
```bash
BEFORE:
NEWS sources: Dawn, Hindu, Sound Vision, MuslimMatters, SeekersGuidance (5) ❌

AFTER:
NEWS sources: Dawn, Hindu, Al Jazeera, 5Pillars, CNA, Premium Times, 
              The Star Malaysia, Malaysiakini, Anadolu, Muslim Girl, About Islam (11+) ✅
```

**Expected sources in NEWS:**
- Regional news (9): Dawn, Hindu, Al Jazeera, 5Pillars, CNA, Premium Times, Star Malaysia, Malaysiakini, Anadolu
- Lifestyle commentary (2-3): Muslim Girl, About Islam, MuslimMatters

**Expected sources in HOME:**
- Lifestyle only (5-7): MuslimMatters, SeekersGuidance, Sound Vision, About Islam, Muslim Heritage, Virtual Mosque, Muslim Girl

---

## 🎯 PRIORITY

**P0 - CRITICAL - TWO PROBLEMS!**

### Problem #1: Content Duplication (64%)
Users see duplicate content on Home and News pages - плохой UX!

### Problem #2: Too Few Articles (11 instead of 30+)
News page looks empty - should have 30+ articles from 10+ sources!

**Root causes:**
1. No source separation (Home and News use same sources)
2. No home_ids exclusion (News doesn't exclude Home articles)
3. Missing RSS sources (only 5 active, should be 10+)
4. Low fetch limits (10 per source, should be 50+)

**Action:**
1. ✅ Add missing RSS sources to config (Al Jazeera, 5Pillars, CNA, etc.)
2. ✅ Implement source separation (lifestyle vs news)
3. ✅ Add `home_ids` exclusion in News endpoint
4. ✅ Increase fetch limits (50 per source, 300 total)
5. ✅ Add source balancing (max 3 per source)
6. ✅ Test: overlap <30%, count 30+
7. ✅ Deploy ASAP

---

## 📋 DEPLOYMENT CHECKLIST

**Step 0: Add RSS Sources**
- [ ] Add Al Jazeera RSS to config
- [ ] Add 5Pillars UK RSS to config
- [ ] Add CNA Singapore RSS to config
- [ ] Add Premium Times RSS to config
- [ ] Add The Star Malaysia RSS to config
- [ ] Add Malaysiakini RSS to config
- [ ] Add Anadolu Agency RSS to config
- [ ] Verify all 7 new sources fetch correctly

**Step 1: Update Endpoints**
- [ ] Update `get_homepage_layout()` - lifestyle sources only
- [ ] Update `get_news_feed()` - increase limits to 50/300
- [ ] Update `get_news_feed()` - fetch Home IDs first
- [ ] Update `get_news_feed()` - exclude Home articles
- [ ] Add `balance_sources()` helper
- [ ] Update NEWS_SOURCES list (add 7 new sources)

**Step 2: Test**
- [ ] Test overlap calculation (<30%)
- [ ] Test article count (30+ in NEWS)
- [ ] Test source diversity (10+ sources in NEWS)
- [ ] Verify with curl commands above

**Step 3: Deploy**
- [ ] Deploy to production
- [ ] Restart API service
- [ ] Flush cache
- [ ] Verify endpoints return correct data

**Step 4: Final Verification**
- [ ] HOME: 12 articles, 5-7 sources, 100% lifestyle
- [ ] NEWS: 30+ articles, 10+ sources, 70% regional news
- [ ] OVERLAP: <30% (3-4 articles max)

---

**Created:** March 18, 2026  
**Priority:** P0 CRITICAL - TWO PROBLEMS  
**Status:** Waiting for Backend AI implementation  
**Impact:** Bad UX (duplicate content + empty news page)
