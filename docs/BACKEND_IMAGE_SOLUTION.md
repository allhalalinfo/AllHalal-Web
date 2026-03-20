# Backend Solution: Replace Pexels Fallback with og:image Scraping

**Date:** March 20, 2026  
**Issue:** Pexels fallback images don't load reliably in browser, and look generic/repetitive when they do

---

## 🎯 Recommended Solution

**Stop using generic Pexels fallback.** Instead:

### 1. Scrape og:image from Article Pages

When RSS feed doesn't provide an image:
1. Fetch the article page HTML
2. Extract `<meta property="og:image" content="...">` tag
3. Use that image URL (it's article-specific!)
4. If no og:image, use Pexels as last resort

### 2. Implementation Priority

**Phase 1 - High Impact Sources (implement first):**
- About Islam
- MuslimMatters  
- Islam21c
- Sound Vision
- Qalam Institute

These sources have RSS without images, but their websites have og:image tags.

**Phase 2 - Verify Working Sources:**
- Al Jazeera ✅ (already has images in RSS)
- Middle East Eye ✅ (already has images in RSS)
- NY Times ✅ (already has images in RSS)
- Dawn ✅ (already has images in RSS)

---

## 📊 Current Status

### What Works:
✅ NY Times, MEE, Dawn, Al Jazeera - have real images in RSS  
✅ Pexels URLs are valid (200 OK)  
✅ Frontend loads all images correctly (direct loading, no proxy)

### What Doesn't Work:
❌ About Islam, MuslimMatters, Islam21c - get generic Pexels fallback  
❌ Pexels images are repetitive (same photo for multiple articles)  
❌ Users see "AI", "M", "I" placeholder badges instead of photos

---

## 🔧 Implementation Example (Python)

```python
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def get_og_image(article_url: str, timeout: int = 5) -> str | None:
    """
    Scrape og:image from article page.
    Returns image URL or None if not found.
    """
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (compatible; allhalal.info/1.0)",
            "Accept": "text/html",
        }
        
        response = requests.get(article_url, headers=headers, timeout=timeout)
        
        if not response.ok:
            return None
            
        soup = BeautifulSoup(response.content, "html.parser")
        
        # Try og:image first
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            img_url = og_image["content"]
            # Handle relative URLs
            return urljoin(article_url, img_url)
        
        # Fallback: try twitter:image
        twitter_image = soup.find("meta", attrs={"name": "twitter:image"})
        if twitter_image and twitter_image.get("content"):
            return urljoin(article_url, twitter_image["content"])
            
        return None
        
    except Exception as e:
        print(f"Failed to scrape og:image from {article_url}: {e}")
        return None


def get_article_image(rss_image: str | None, article_url: str) -> str | None:
    """
    Get article image with fallback priority:
    1. RSS feed image (if provided)
    2. og:image from article page
    3. Pexels generic (last resort)
    """
    # Priority 1: RSS image
    if rss_image:
        return rss_image
    
    # Priority 2: Scrape og:image
    scraped_image = get_og_image(article_url)
    if scraped_image:
        return scraped_image
    
    # Priority 3: Pexels fallback (generic)
    return get_pexels_fallback()  # Your existing function
```

---

## ⚡ Performance Notes

**Concern:** Scraping adds latency

**Solution:**
1. **Cache og:image URLs** (1 day TTL) - same article won't be scraped twice
2. **Async/parallel** scraping - don't block API response
3. **Timeout 5 seconds** - if scraping fails, use Pexels immediately
4. **Only scrape when needed** - RSS images take priority

**Expected Impact:**
- First request: +2-5s (one-time scraping)
- Cached requests: +0s (instant from cache)
- Failed scraping: +5s max (timeout), then Pexels fallback

---

## 📈 Expected Results

### Before (Current):
- About Islam, MuslimMatters: Generic Pexels (mosque photo #4195342 for EVERY article)
- User sees: Placeholder badges "AI", "M", "I"
- Image diversity: ⭐⭐☆☆☆ (40% Pexels duplicates)

### After (With og:image):
- About Islam, MuslimMatters: Article-specific images from their websites
- User sees: Real photos relevant to article content
- Image diversity: ⭐⭐⭐⭐⭐ (95%+ unique images)

---

## 🎯 Action Items for Backend AI

### High Priority (Do Now):
1. ✅ Implement `get_og_image()` scraping function
2. ✅ Add to image fallback chain (RSS → og:image → Pexels)
3. ✅ Test with About Islam article: https://aboutislam.net/...
4. ✅ Deploy and verify images appear for About Islam briefs

### Medium Priority (This Week):
5. ✅ Add caching layer (Redis/in-memory) for scraped og:image URLs
6. ✅ Implement async scraping (don't block API response)
7. ✅ Add retry logic (3 attempts with exponential backoff)

### Low Priority (Future):
8. Monitor scraping success rate (log failures)
9. Add more fallback sources (twitter:image, article:image)
10. Implement image validation (check size, format, 404s)

---

## ✅ Success Metrics

How to verify it's working:

```bash
# Test API after deployment
curl -s "https://api.allhalal.info/api/v1/briefs/feed?limit=30" | \
  jq -r '.items[] | select(.sources[0].name | contains("About Islam")) | 
  {title: .title[0:50], image: .image_url[0:80]}'
```

**Before:** `"image": "https://images.pexels.com/photos/4195342/..."`  
**After:** `"image": "https://aboutislam.net/wp-content/uploads/2026/03/..."`

---

## 🚫 What NOT to Do

❌ Don't remove Pexels completely - it's a good last-resort fallback  
❌ Don't scrape synchronously - will timeout API requests  
❌ Don't scrape ALL articles - only those missing RSS images  
❌ Don't cache forever - og:image URLs can change (1 day TTL max)

---

## Summary

**Current Issue:** Generic Pexels fallback looks like placeholders  
**Root Cause:** RSS feeds (About Islam, MuslimMatters) don't include images  
**Solution:** Scrape og:image from article pages (article-specific images)  
**Impact:** 95%+ image coverage with relevant, unique images  
**Effort:** ~2-3 hours implementation + testing

Send this document to Backend AI! 🚀
