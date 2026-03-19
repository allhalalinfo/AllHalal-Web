# 🚨 BACKEND AI: КРИТИЧНЫЕ ПРОБЛЕМЫ С КОНТЕНТОМ

**Date:** March 20, 2026  
**From:** Frontend Team  
**To:** Backend AI  
**Priority:** P0 - CRITICAL

---

## ❌ ГЛАВНАЯ ПРОБЛЕМА: МАЛО КОНТЕНТА И РАЗНООБРАЗИЯ!

### 📊 **Текущее состояние (ПЛОХО):**

#### **HOME (`/api/v1/briefs/home`):**
```json
{
  "total": 15,
  "sources": [
    {"source": "MuslimMatters", "count": 6},
    {"source": "SeekersGuidance", "count": 6},
    {"source": "About Islam", "count": 3}
  ],
  "categories": [
    {"category": "Faith & Practice", "count": 15}  // 100%!
  ]
}
```

**Проблемы:**
- ❌ **Только 3 источника** (цель: 5-7)
- ❌ **100% Faith & Practice** - нет разнообразия категорий!
- ❌ **2 источника доминируют:** MuslimMatters + SeekersGuidance = 80%
- ❌ **Нет Islamic Finance** (0%)
- ❌ **Нет Halal Living** (0%)
- ❌ **Нет Wellness** (0%)
- ❌ **Только 1% Family** (0 статей)

#### **NEWS (`/api/v1/briefs/feed`):**
```json
{
  "total": 50,
  "sources": [
    {"source": "CNA", "count": 12},           // 24%! Слишком много
    {"source": "Premium Times", "count": 12}, // 24%! Слишком много
    {"source": "The Hindu", "count": 10},     // 20%!
    {"source": "NY Times World", "count": 8}, // 16%
    {"source": "The Guardian World", "count": 5},
    {"source": "Dawn", "count": 3}
  ],
  "unique_sources": 6,  // Цель: 10-15!
  "categories": [
    {"category": "Ummah & World", "count": 50}  // 100%
  ]
}
```

**Проблемы:**
- ❌ **Только 6 источников** (цель: 10-15)
- ❌ **CNA доминирует:** 12 статей (24%) - должно быть max 3!
- ❌ **Premium Times доминирует:** 12 статей (24%) - должно быть max 3!
- ❌ **The Hindu доминирует:** 10 статей (20%) - должно быть max 3!
- ❌ **НЕТ source balancing!**
- ❌ **Отсутствуют источники:**
  - Al Jazeera (0)
  - Middle East Eye (0)
  - TRT World (0)
  - 5Pillars UK (0)
  - The Star Malaysia (0)
  - Malaysiakini (0)
  - Anadolu Agency (0)

---

## 🎯 ТРЕБУЕМОЕ СОСТОЯНИЕ:

### **HOME:**
```json
{
  "total": 12,
  "sources": 5-7,
  "max_per_source": 3,
  "categories": {
    "Faith & Practice": 40%,
    "Islamic Finance": 25%,
    "Halal Living": 20%,
    "Family & Education": 15%
  }
}
```

### **NEWS:**
```json
{
  "total": 30,
  "sources": 10-15,
  "max_per_source": 3,
  "categories": {
    "Ummah & World": 70%,
    "Other": 30%
  }
}
```

---

## 📋 ДЕТАЛЬНЫЕ ПРЕТЕНЗИИ:

### **1. НЕТ SOURCE BALANCING (КРИТИЧНО!)**

**Проблема:** Один источник дает 24% всех новостей!

**Пример:**
- CNA: 12 статей (должно быть max 3)
- Premium Times: 12 статей (должно быть max 3)
- Hindu: 10 статей (должно быть max 3)

**Решение:**
```python
def balance_sources(items: list, max_per_source: int = 3) -> list:
    """Limit articles per source for diversity."""
    from collections import defaultdict
    
    source_count = defaultdict(int)
    result = []
    
    for item in items:
        source = item.sources[0].name
        if source_count[source] < max_per_source:
            result.append(item)
            source_count[source] += 1
    
    return result

# Usage in NEWS endpoint:
news_items = await fetch_from_sources(news_sources, limit=200)
balanced = balance_sources(news_items, max_per_source=3)  # ← ДОБАВЬ ЭТО!
return balanced[:30]
```

---

### **2. МАЛО ИСТОЧНИКОВ (КРИТИЧНО!)**

**HOME: только 3 источника** (цель: 5-7)
- MuslimMatters ✅
- SeekersGuidance ✅
- About Islam ✅
- **ОТСУТСТВУЮТ:**
  - Islamic Finance Guru (IFG) ❌
  - Muslim Girl ❌
  - Muslim Heritage ❌
  - Virtual Mosque ❌
  - Bayyinah Institute ❌
  - Muslim Converts ❌
  - Productive Muslim ❌

**NEWS: только 6 источников** (цель: 10-15)
- CNA ✅
- Premium Times ✅
- Hindu ✅
- NY Times ✅
- Guardian ✅
- Dawn ✅
- **ОТСУТСТВУЮТ:**
  - Al Jazeera ❌
  - Middle East Eye ❌
  - TRT World ❌
  - 5Pillars UK ❌
  - The Star Malaysia ❌
  - Malaysiakini ❌
  - Anadolu Agency ❌

**Решение:** Добавь эти RSS feeds в конфиг!

---

### **3. НЕТ РАЗНООБРАЗИЯ КАТЕГОРИЙ НА HOME**

**Проблема:** 100% Faith & Practice

**Причина:** Ты сказал "Islamic Finance и Halal Living RSS не работают"

**НО:** Нужно искать больше источников!

**Islamic Finance sources (искать новые):**
```
- Islamic Finance Guru: https://islamicfinanceguru.com/feed/
- Ethis: https://www.ethis.co/blog/feed/
- IslamicMarkets: https://www.islamicmarkets.com/feed
- Muslim Money Matters: https://muslimmoneymatters.com/feed
```

**Halal Living sources (искать новые):**
```
- Haute Hijab Blog: проверь альтернативный URL
- Muslim Vibe: проверь альтернативный URL
- Amaliah: проверь альтернативный URL
- Honest Food Guide: https://honestfoodguide.com/feed
```

**Family & Education sources:**
```
- Muslim Girl: https://muslimgirl.com/feed/
- Muslim Youth Musings: https://muslimyouthmusings.com/feed/
- Ummah Wide: проверь доступность
```

---

### **4. НЕДОСТАТОЧНЫЙ FETCH LIMIT**

**Проблема:** Запрашиваешь слишком мало статей

**Текущее (плохо):**
```python
news_items = await fetch_from_sources(sources, limit_per_source=20)
# Result: 6 sources × 20 = 120 items
```

**Нужно (хорошо):**
```python
news_items = await fetch_from_sources(
    sources=news_sources,
    limit_per_source=50,   # ← УВЕЛИЧЬ с 20 до 50
    total_limit=500        # ← УВЕЛИЧЬ с 200 до 500
)

# Then balance:
balanced = balance_sources(news_items, max_per_source=3)
```

**Почему:** Больший pool → больше разнообразия после balancing

---

### **5. ОДНООБРАЗНЫЕ ФОТО НА HOME**

**Проблема:** Все статьи на HOME имеют **одинаковые Pexels placeholder** фото

**Причина:**
- MuslimMatters, SeekersGuidance, About Islam **не имеют** изображений в RSS
- Backend использует Pexels fallback
- Pexels возвращает похожие фото для похожих keywords

**Решение:**

**Option A: Улучшить Pexels diversity**
```python
def get_pexels_image(title: str, article_id: str) -> str:
    """
    Get diverse Pexels images using:
    1. Better keywords extraction
    2. Randomization based on article_id
    3. Multiple queries per article
    """
    keywords = extract_diverse_keywords(title)
    
    # Use article_id as seed for randomization
    seed = int(hashlib.md5(article_id.encode()).hexdigest(), 16)
    random.seed(seed)
    
    # Try multiple keyword combinations
    queries = [
        " ".join(keywords[:2]),
        " ".join(keywords[1:3]),
        keywords[0],
    ]
    
    for query in queries:
        image = search_pexels(query, per_page=20)
        if image:
            # Pick random image from results (using seed)
            return random.choice(image)
    
    return default_fallback()
```

**Option B: Scrape images from article pages**
```python
async def enrich_article_with_image(article: dict) -> dict:
    """
    If RSS doesn't have image, scrape from article page.
    """
    if not article.get("image_url"):
        html = await fetch_article_page(article["url"])
        og_image = extract_og_image(html)
        article["image_url"] = og_image
    
    return article
```

---

## 🚀 ACTION PLAN (PRIORITY ORDER):

### **P0 - СРОЧНО (сделай сегодня):**

1. ✅ **Добавь source balancing:**
   ```python
   balanced = balance_sources(items, max_per_source=3)
   ```

2. ✅ **Увеличь fetch limits:**
   ```python
   limit_per_source=50  # было 20
   total_limit=500      # было 200
   ```

3. ✅ **Добавь 7 новых NEWS sources:**
   - Al Jazeera: `https://www.aljazeera.com/xml/rss/all.xml`
   - Middle East Eye: `https://www.middleeasteye.net/rss`
   - TRT World: `https://www.trtworld.com/api/rss`
   - 5Pillars UK: `https://5pillarsuk.com/feed/`
   - The Star Malaysia: `https://www.thestar.com.my/rss/news/nation/`
   - Malaysiakini: `https://www.malaysiakini.com/feed`
   - Anadolu Agency: `https://www.aa.com.tr/en/rss/default?cat=world`

### **P1 - ВАЖНО (сделай на этой неделе):**

4. ✅ **Найди и добавь Islamic Finance sources** (минимум 3)
   - Протестируй alternative URLs
   - Поищи новые Islamic Finance блоги
   - Target: 3-5 работающих sources

5. ✅ **Найди и добавь Halal Living sources** (минимум 2)
   - Протестируй alternative URLs
   - Поищи новые Halal lifestyle блоги
   - Target: 2-3 работающих sources

6. ✅ **Найди и добавь Family sources** (минимум 2)
   - Muslim Girl, Muslim Youth Musings
   - Target: 2-3 работающих sources

### **P2 - УЛУЧШЕНИЕ (сделай потом):**

7. ✅ **Улучши Pexels diversity** (разные фото для HOME)
   - Random selection based on article_id
   - Diverse keyword extraction
   - Multiple query attempts

8. ✅ **Scrape images from article pages** (если RSS не имеет)
   - Extract og:image from HTML
   - Fallback to Pexels only if scraping fails

---

## 📊 SUCCESS CRITERIA:

После всех исправлений:

### **HOME:**
```json
{
  "total": 12,
  "sources": 6,
  "source_distribution": [
    {"source": "MuslimMatters", "count": 2},
    {"source": "SeekersGuidance", "count": 2},
    {"source": "About Islam", "count": 2},
    {"source": "IFG", "count": 2},
    {"source": "Muslim Girl", "count": 2},
    {"source": "Muslim Heritage", "count": 2}
  ],
  "categories": {
    "Faith & Practice": 5,  // 42%
    "Islamic Finance": 3,   // 25%
    "Halal Living": 2,      // 17%
    "Family & Education": 2 // 16%
  }
}
```

### **NEWS:**
```json
{
  "total": 30,
  "sources": 12,
  "source_distribution": [
    {"source": "Al Jazeera", "count": 3},
    {"source": "Middle East Eye", "count": 3},
    {"source": "TRT World", "count": 3},
    {"source": "5Pillars UK", "count": 3},
    {"source": "CNA", "count": 3},
    {"source": "Premium Times", "count": 3},
    {"source": "The Hindu", "count": 3},
    {"source": "Dawn", "count": 3},
    {"source": "NY Times", "count": 2},
    {"source": "Guardian", "count": 2},
    {"source": "The Star Malaysia", "count": 1},
    {"source": "Malaysiakini", "count": 1}
  ],
  "categories": {
    "Ummah & World": 21,  // 70%
    "Other": 9            // 30%
  }
}
```

---

## 🧪 TESTING COMMANDS:

```bash
# Test source balancing
curl https://api.allhalal.info/api/v1/briefs/feed?limit=50 | \
  jq '.items | map(.sources[0].name) | group_by(.) | map({source: .[0], count: length}) | sort_by(-.count)'
# Expected: max 3 per source

# Test source diversity
curl https://api.allhalal.info/api/v1/briefs/feed?limit=50 | \
  jq '[.items[].sources[0].name] | unique | length'
# Expected: 10-12 sources

# Test HOME categories
curl https://api.allhalal.info/api/v1/briefs/home | \
  jq '[.hero.category, (.featured[].category), (.compact[].category)] | group_by(.) | map({cat: .[0], count: length})'
# Expected: 4 categories (Faith, Finance, Halal, Family)
```

---

## 💬 SUMMARY FOR BACKEND AI:

> **"Главная проблема: МАЛО КОНТЕНТА И РАЗНООБРАЗИЯ!"**
> 
> **HOME:**
> - Только 3 источника (нужно 6+)
> - 100% Faith & Practice (нужно 4 категории)
> - Нет Islamic Finance, Halal Living, Family
> 
> **NEWS:**
> - Только 6 источников (нужно 10-12)
> - CNA/Premium Times доминируют (24% каждый!)
> - НЕТ source balancing (max 3 per source!)
> - Отсутствуют: Al Jazeera, MEE, TRT, 5Pillars (7+ источников)
> 
> **ACTION:**
> 1. Добавь `balance_sources(max_per_source=3)` ← СРОЧНО!
> 2. Увеличь fetch limits (50 per source, 500 total)
> 3. Добавь 7 новых NEWS RSS (URLs в документе)
> 4. Найди Islamic Finance/Halal Living sources (3-5 новых)
> 
> **TARGET:**
> - HOME: 12 items, 6 sources, 4 categories
> - NEWS: 30 items, 12 sources, max 3 per source
> 
> **Файл с деталями:** `docs/BACKEND_FINAL_REQUIREMENTS.md`

---

**Created:** March 20, 2026  
**Priority:** P0 CRITICAL  
**Status:** Требует немедленных действий  
**Impact:** Плохой UX - мало контента и разнообразия
