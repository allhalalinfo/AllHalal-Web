# 📸 ПРОБЛЕМА: Многие новости без фото или с одинаковыми фото

**Date:** March 20, 2026  
**Issue:** User reports "many news without photos" on NEWS page  
**Status:** Investigated

---

## 🔍 INVESTIGATION

### **Backend Data:**
```
Total NEWS items: 30
Pexels fallback images: 12 (40%)
Real source images: 18 (60%)
```

### **Image Proxy Status:**
- ✅ `/api/image-proxy` работает (200 OK)
- ✅ `BriefMediaClient` использует proxy
- ✅ `BriefsHomeSection` использует proxy
- ✅ CORS/hotlinking обходятся

---

## ❌ РЕАЛЬНАЯ ПРОБЛЕМА

### **1. Слишком много Pexels placeholder (40%)**

**Источники с Pexels (не имеют своих изображений):**
- MuslimMatters - Pexels fallback
- SeekersGuidance - Pexels fallback
- Qalam Institute - Pexels fallback
- Islam21c - Pexels fallback
- MEMO - Pexels fallback
- Guardian - часто Pexels

**Итого:** ~12 из 30 статей с Pexels = **40% placeholder**

### **2. Pexels изображения ОДНООБРАЗНЫЕ**

Backend использует похожие keywords:
- "mosque" → одни и те же фото мечетей
- "prayer" → одни и те же фото молитвы
- "muslim" → одни и те же generic фото

**Результат:** Визуально выглядит как "нет фото" или "все фото одинаковые"

---

## ✅ ЧТО РАБОТАЕТ

**Источники с РЕАЛЬНЫМИ фото (60%):**
- ✅ NY Times - реальные фото новостей
- ✅ Middle East Eye - реальные фото
- ✅ Dawn - реальные фото
- ✅ Hindu - реальные фото
- ✅ CNA - реальные фото
- ✅ Premium Times - реальные фото
- ✅ Sound Vision - реальные фото (lifestyle)
- ✅ Muslim Heritage - реальные фото

---

## 🎯 РЕШЕНИЕ: Backend AI

### **Приоритет 1: Улучшить Pexels diversity**

**Проблема:** Backend использует простые keywords и берет первое фото

**Решение:**
```python
def get_diverse_pexels_image(title: str, article_id: str, category: str) -> str:
    """
    Get DIVERSE Pexels images using better strategy.
    """
    import hashlib
    import random
    
    # Use article_id as seed for randomization
    seed = int(hashlib.md5(article_id.encode()).hexdigest()[:8], 16)
    random.seed(seed)
    
    # Extract better keywords (not just "muslim", "prayer")
    keywords = extract_meaningful_keywords(title)
    
    # Category-specific queries
    category_queries = {
        "Ummah & World": ["world news", "international", "people", "city", "landscape"],
        "Faith & Practice": ["meditation", "spirituality", "peace", "light", "books"],
        "Family & Education": ["family", "children", "education", "learning", "home"],
        "Halal Living": ["food", "healthy", "organic", "natural", "lifestyle"]
    }
    
    base_queries = category_queries.get(category, ["people", "nature", "city"])
    
    # Try multiple queries
    all_queries = [
        " ".join(keywords[:2]),  # From title
        random.choice(base_queries),  # From category
        f"{keywords[0]} {random.choice(base_queries)}"  # Mix
    ]
    
    for query in all_queries:
        results = search_pexels(query, per_page=30)  # Get MORE results
        if results and len(results) > 5:
            # Pick random from top 30 (not always first)
            return random.choice(results[:30])
    
    return default_fallback()
```

**Результат:** Разные фото для разных статей

---

### **Приоритет 2: Scrape og:image from article pages**

**Если RSS не имеет изображения → попытаться scrape:**

```python
async def enrich_article_with_image(article: dict) -> dict:
    """
    If RSS doesn't have image, try to scrape from article page.
    """
    if not article.get("image_url"):
        try:
            html = await fetch_with_timeout(article["url"], timeout=5)
            
            # Try og:image
            og_image = extract_og_image(html)
            if og_image:
                article["image_url"] = og_image
                return article
            
            # Try twitter:image
            twitter_image = extract_twitter_image(html)
            if twitter_image:
                article["image_url"] = twitter_image
                return article
            
            # Fallback to Pexels
            article["image_url"] = get_diverse_pexels_image(
                article["title"],
                article["id"],
                article["category"]
            )
        except:
            # If scraping fails, use Pexels
            article["image_url"] = get_diverse_pexels_image(
                article["title"],
                article["id"],
                article["category"]
            )
    
    return article
```

**Результат:** 70-80% real images (вместо 60%)

---

### **Приоритет 3: Добавить больше источников с реальными фото**

**Текущие источники С фото:**
- NY Times ✅
- MEE ✅
- Dawn ✅
- Hindu ✅
- CNA ✅
- Premium Times ✅

**Добавить (если еще нет):**
- Al Jazeera - отличные фото
- TRT World - профессиональные фото
- BBC World - качественные фото
- Reuters - агентские фото
- 5Pillars UK - часто с фото

**Результат:** Больше статей с реальными фото

---

## 📊 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ

**СЕЙЧАС:**
```
Real images: 18/30 (60%)
Pexels fallback: 12/30 (40%)
Pexels diversity: LOW (одинаковые фото)
```

**ПОСЛЕ ИСПРАВЛЕНИЙ:**
```
Real images: 24/30 (80%) - благодаря scraping og:image
Pexels fallback: 6/30 (20%)
Pexels diversity: HIGH (разные фото)
```

---

## 🧪 КАК ПРОВЕРИТЬ

```bash
# Test Pexels diversity
curl https://api.allhalal.info/api/v1/briefs/feed?limit=50 | \
  jq '[.items[] | select(.image_url | contains("pexels")) | .image_url] | unique | length'
# Should be close to total Pexels count (high diversity)

# Test scraping working
curl https://api.allhalal.info/api/v1/briefs/feed?limit=50 | \
  jq '[.items[] | select(.image_url | contains("pexels"))] | length'
# Should be < 10 (less than 20%)
```

---

## 💬 SUMMARY FOR BACKEND AI

> **"Проблема: 40% статей с Pexels placeholder, и они ОДНООБРАЗНЫЕ"**
> 
> **Три решения:**
> 
> 1. **Улучши Pexels diversity** (СРОЧНО)
>    - Random selection из 30 results (не первое фото)
>    - Разные keywords (не только "muslim", "prayer")
>    - Seed по article_id для consistent randomization
> 
> 2. **Scrape og:image** (ВАЖНО)
>    - Если RSS без фото → scrape article page
>    - Extract og:image or twitter:image
>    - Fallback to Pexels только если scraping fails
>    - Target: 80% real images (сейчас 60%)
> 
> 3. **Больше sources с фото** (ХОРОШО ИМЕТЬ)
>    - Al Jazeera, TRT World, BBC World, Reuters
>    - Эти sources всегда имеют профессиональные фото
> 
> **Цель:** 80% real images + 20% diverse Pexels

---

**Created:** March 20, 2026  
**Status:** Waiting for Backend AI implementation  
**Priority:** P1 - High (user experience issue)
