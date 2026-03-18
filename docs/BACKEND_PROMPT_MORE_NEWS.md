# 🚀 BACKEND TASK: Больше новостей, больше источников, больше разнообразия

## 🎯 ГЛАВНАЯ ЦЕЛЬ

**Сейчас работает хорошо, но МАЛО!** Нужно:
- ✅ **В 3 раза больше новостей** (10 → 30+)
- ✅ **В 3 раза больше источников** (4 → 10-15)
- ✅ **Максимум разнообразия** (разные регионы, категории, темы)
- ✅ **Больше фото** (сейчас хорошо, но нужно 80%+ статей с фото)
- ✅ **Никаких повторений** (каждая статья - уникальная)

---

## 📊 ТЕКУЩЕЕ СОСТОЯНИЕ vs ЦЕЛЬ

### HOME (`/api/v1/briefs/home`)
| Параметр | Сейчас | Цель |
|----------|---------|------|
| Статей | 9 | **12** (1 hero + 4 featured + 7 compact) |
| Источников | 2 | **5-7** |
| Категории | Faith only | Faith 40%, Finance 25%, Lifestyle 20%, Family 15% |
| Фокус | ✅ Lifestyle | ✅ Lifestyle (без новостей) |

### NEWS (`/api/v1/briefs/feed`)
| Параметр | Сейчас | Цель |
|----------|---------|------|
| Статей | 10 | **30+** |
| Источников | 4 | **10-15** |
| Регионов | 2 | **5+** (Middle East, Asia, Africa, Europe, Americas) |
| Regional news | ? | **70%** (Ummah & World category) |
| Фото | хорошо | **80%+** статей с фото |

---

## 🌍 ДОБАВИТЬ ЭТИ RSS ИСТОЧНИКИ (15 новых)

### **Региональные новости** (приоритет!)

```python
# Middle East
"https://www.middleeasteye.net/rss",           # Middle East Eye
"https://www.trtworld.com/api/rss",             # TRT World (Turkey)
"https://english.alarabiya.net/rss.xml",        # Al Arabiya

# South Asia
"https://www.dawn.com/feeds/home",              # Dawn (Pakistan) ✅ УЖЕ РАБОТАЕТ
"https://www.thehindu.com/news/national/feeder/default.rss", # The Hindu
"https://bdnews24.com/feed",                    # BDNews24 (Bangladesh)

# Africa
"https://www.premiumtimesng.com/feed",          # Premium Times ✅ УЖЕ РАБОТАЕТ
"https://www.middleeasteye.net/africa/rss",     # MEE Africa
"https://www.aa.com.tr/en/africa/rss.xml",      # Anadolu Africa

# Southeast Asia
"https://www.thestar.com.my/rss/news/nation/",  # The Star Malaysia
"https://www.channelnewsasia.com/rssfeeds/8395884", # CNA Singapore

# UK/Europe
"https://5pillarsuk.com/feed/",                 # 5Pillars UK
"https://www.middleeasteye.net/europe/rss",     # MEE Europe

# North America
"https://muslimmatters.org/feed/",              # MuslimMatters ✅ УЖЕ РАБОТАЕТ
"https://aboutislam.net/feed/",                 # About Islam
```

### **Lifestyle/Faith источники** (для Home)

```python
# Уже есть + добавить:
"https://seekersguidance.org/feed/",            # ✅ УЖЕ РАБОТАЕТ
"https://muslimmatters.org/feed/",              # ✅ УЖЕ РАБОТАЕТ
"https://islamicfinanceguru.com/feed/",         # Islamic Finance Guru
"https://muslimsistermag.com/feed/",            # Muslim Sister Magazine
"https://productivemuslim.com/feed/",           # Productive Muslim
```

---

## 🔧 ЧТО ИЗМЕНИТЬ В КОДЕ

### 1. **HOME Endpoint - увеличить до 12 статей**

```python
@router.get("/home")
async def get_homepage_layout():
    """
    ИЗМЕНЕНИЯ:
    - 12 статей вместо 9 (1 hero + 4 featured + 7 compact вместо 4)
    - 5-7 источников (добавить IFG, Muslim Girl, ProductiveMuslim)
    - Категории: Faith 40%, Finance 25%, Lifestyle 20%, Family 15%
    - ИСКЛЮЧИТЬ все news sources (Al Jazeera, MEE, TRT, Dawn, Premium Times)
    """
    
    # Fetch from NON-NEWS sources only
    lifestyle_sources = [
        "MuslimMatters", "SeekersGuidance", "IFG", "Muslim Girl",
        "Productive Muslim", "Muslim Sister Magazine", "About Islam"
    ]
    
    all_briefs = await fetch_from_sources(lifestyle_sources, limit=50)
    
    # Category balance
    faith_items = [b for b in all_briefs if b.category == "Faith & Practice"][:5]
    finance_items = [b for b in all_briefs if b.category == "Islamic Finance"][:3]
    lifestyle_items = [b for b in all_briefs if b.category in ["Halal Living", "Wellness"]][:2]
    family_items = [b for b in all_briefs if b.category == "Family & Community"][:2]
    
    balanced = faith_items + finance_items + lifestyle_items + family_items
    
    # Select best
    hero = select_hero(balanced)  # Best image, engaging title
    featured = select_featured(balanced, exclude=[hero], count=4)
    compact = select_compact(balanced, exclude=[hero] + featured, count=7)  # ← ВОТ ТУТ: 7 вместо 4
    
    return {
        "hero": hero,
        "featured": featured,
        "compact": compact
    }
```

### 2. **NEWS Feed - увеличить до 30+ статей, 70% региональные**

```python
@router.get("/feed")
async def get_news_feed(
    category: Optional[str] = None,
    limit: int = 30,  # ← default 30 вместо 20
    offset: int = 0
):
    """
    ИЗМЕНЕНИЯ:
    - 30+ статей вместо 10
    - 70% из news sources (региональные)
    - 10-15 уникальных источников
    - Максимальное разнообразие регионов
    """
    
    # NEWS sources (региональные)
    news_sources = [
        "Al Jazeera", "Middle East Eye", "TRT World", "Al Arabiya",  # ME
        "Dawn", "The Hindu", "BDNews24",  # South Asia
        "Premium Times", "Anadolu Africa",  # Africa
        "The Star Malaysia", "CNA",  # SE Asia
        "5Pillars UK",  # Europe
    ]
    
    # OTHER sources (lifestyle/opinion)
    other_sources = [
        "MuslimMatters", "About Islam", "SeekersGuidance"
    ]
    
    # Fetch MORE items to ensure diversity
    news_items = await fetch_from_sources(news_sources, limit=100)  # ← БОЛЬШЕ
    other_items = await fetch_from_sources(other_sources, limit=30)
    
    # Source diversity: max 3 per source
    news_items = balance_sources(news_items, max_per_source=3)
    other_items = balance_sources(other_items, max_per_source=2)
    
    # 70% news, 30% other
    news_count = int(limit * 0.7)  # 21 из 30
    other_count = limit - news_count  # 9 из 30
    
    result = news_items[:news_count] + other_items[:other_count]
    
    # Shuffle slightly for variety (but keep quality order)
    result = smart_shuffle(result)
    
    return {
        "items": result[offset:offset+limit],
        "total": len(result),
        "offset": offset,
        "limit": limit
    }
```

### 3. **Source Balancing - без повторений**

```python
def balance_sources(items: list, max_per_source: int = 3) -> list:
    """
    Ограничить количество статей с одного источника.
    Это обеспечит РАЗНООБРАЗИЕ и избежит повторений.
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

### 4. **Больше фото - улучшить Pexels fallback**

```python
async def ensure_images(briefs: list) -> list:
    """
    Убедиться, что у 80%+ статей есть фото.
    """
    for brief in briefs:
        if not brief.image_url or "placeholder" in brief.image_url:
            # Pexels search by keywords from title
            keywords = extract_keywords(brief.title)
            brief.image_url = await search_pexels(keywords)
    
    return briefs

def extract_keywords(title: str) -> str:
    """
    Извлечь ключевые слова для поиска фото.
    """
    # Remove common words
    stop_words = {"the", "a", "an", "in", "on", "at", "to", "for"}
    words = title.lower().split()
    keywords = [w for w in words if w not in stop_words and len(w) > 3]
    return " ".join(keywords[:3])  # Top 3 keywords
```

---

## ✅ КРИТЕРИИ УСПЕХА

Проверь эти команды после деплоя:

```bash
# HOME: должно быть 12 статей, 5-7 источников
curl https://api.allhalal.info/api/v1/briefs/home | jq '{
  total: ((.hero | if . then 1 else 0 end) + (.featured | length) + (.compact | length)),
  sources: ([.hero.sources[0].name] + [.featured[].sources[0].name] + [.compact[].sources[0].name] | unique),
  categories: ([.featured[].category, .compact[].category] | group_by(.) | map({cat: .[0], count: length}))
}'

# NEWS: должно быть 30+ статей, 10+ источников, 70% Ummah & World
curl https://api.allhalal.info/api/v1/briefs/feed?limit=30 | jq '{
  total: (.items | length),
  sources: ([.items[].sources[0].name] | unique | length),
  unique_sources: ([.items[].sources[0].name] | unique),
  categories: (.items | group_by(.category) | map({cat: .[0].category, count: length, percent: (length * 100 / 30)})),
  with_images: (.items | map(select(.image_url != null and .image_url != "")) | length)
}'

# OVERLAP: должно быть <30%
curl https://api.allhalal.info/admin/content-overlap | jq '{
  overlap: .overlap_percentage,
  home_ids: .home_ids,
  news_ids: .news_ids,
  common: .common_ids
}'
```

### Ожидаемые результаты:

**HOME:**
```json
{
  "total": 12,
  "sources": ["MuslimMatters", "SeekersGuidance", "IFG", "Muslim Girl", "Productive Muslim"],
  "categories": [
    {"cat": "Faith & Practice", "count": 5},
    {"cat": "Islamic Finance", "count": 3},
    {"cat": "Halal Living", "count": 2},
    {"cat": "Family & Community", "count": 2}
  ]
}
```

**NEWS:**
```json
{
  "total": 30,
  "sources": 12,
  "unique_sources": ["Al Jazeera", "MEE", "TRT World", "Dawn", "Premium Times", "The Hindu", "BDNews24", "5Pillars UK", "The Star Malaysia", "CNA", "MuslimMatters", "About Islam"],
  "categories": [
    {"cat": "Ummah & World", "count": 21, "percent": 70},
    {"cat": "Faith & Practice", "count": 5, "percent": 17},
    {"cat": "Halal Living", "count": 4, "percent": 13}
  ],
  "with_images": 25
}
```

**OVERLAP:**
```json
{
  "overlap": 15,
  "home_ids": 12,
  "news_ids": 30,
  "common": ["article-123"]
}
```

---

## 🚀 ПРИОРИТЕТЫ

1. **СРОЧНО:** Добавить 15 новых RSS источников (копируй URL выше)
2. **СРОЧНО:** Увеличить HOME до 12 статей (7 compact вместо 4)
3. **СРОЧНО:** Увеличить NEWS до 30+ статей (fetch limit=100, return 30)
4. **ВАЖНО:** Source balancing (max 3 per source в News)
5. **ВАЖНО:** 70% Ummah & World в News Feed
6. **ВАЖНО:** Больше фото (80%+ статей)

---

## 📝 DEPLOYMENT CHECKLIST

- [ ] Добавить 15 новых RSS в конфиг
- [ ] Обновить HOME endpoint (12 статей)
- [ ] Обновить NEWS endpoint (30+ статей, 70% news)
- [ ] Добавить `balance_sources()` функцию
- [ ] Улучшить Pexels fallback для фото
- [ ] Тестировать все новые RSS feeds
- [ ] Deploy на Hetzner
- [ ] Проверить все команды выше
- [ ] Подтвердить: 30+ статей, 10+ источников, <30% overlap

---

## 🎯 SUMMARY

**КАК СЕЙЧАС, ТОЛЬКО БОЛЬШЕ И ЛУЧШЕ:**

✅ **Сейчас работает хорошо:** Dawn Pakistan, Premium Times Nigeria, отличные фото, нет ошибок
✅ **Нужно просто БОЛЬШЕ:** 30 статей вместо 10, 12 источников вместо 4
✅ **Разнообразие:** Разные регионы (ME, Asia, Africa, Europe), разные темы, без повторений
✅ **Фото:** 80%+ статей с качественными фото (Pexels)

**Код работает стабильно - просто масштабируй его в 3 раза! 🚀**
