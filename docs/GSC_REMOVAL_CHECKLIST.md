# GOOGLE SEARCH CONSOLE REMOVAL CHECKLIST
**Date:** May 1, 2026  
**Status:** Partial cleanup in progress

## ✅ Already Submitted (Processing)
1. `https://allhalal.info/de/*` - Processing
2. `https://allhalal.info/blog/*` - Processing  
3. `https://allhalal.info/en/*` - Processing

---

## ❌ STILL NEED TO REMOVE - Old Locale Paths

### Missing Locale Removals (5 more)
These old locale paths have 301 redirects but still may be in Google index:

4. **`https://allhalal.info/ru/*`** - Russian (старый)
5. **`https://allhalal.info/nl/*`** - Dutch (старый)
6. **`https://allhalal.info/fr/*`** - French (старый)
7. **`https://allhalal.info/es/*`** - Spanish (старый)
8. **`https://allhalal.info/it/*`** - Italian (старый)
9. **`https://allhalal.info/ar/*`** - Arabic (старый)

### Why Remove?
- Все эти пути редиректят через middleware (301)
- Но могут быть проиндексированы Google
- Создают дублирование в индексе
- Занимают crawl budget

---

## 🔍 CHECK IN GOOGLE: Do These URLs Exist in Index?

### Search in Google Search Console
```
site:allhalal.info/ru
site:allhalal.info/nl  
site:allhalal.info/fr
site:allhalal.info/es
site:allhalal.info/it
site:allhalal.info/ar
```

**OR** use regular Google search:
```
site:allhalal.info inurl:/ru/
site:allhalal.info inurl:/nl/
site:allhalal.info inurl:/fr/
site:allhalal.info inurl:/es/
site:allhalal.info inurl:/it/
site:allhalal.info inurl:/ar/
```

---

## 📋 HOW TO SUBMIT REMOVALS

### Step 1: Go to Search Console Removals
https://search.google.com/search-console/removals?resource_id=sc-domain:allhalal.info

### Step 2: Click "New Request"

### Step 3: Submit Each Pattern
- Select: **Temporarily remove URL**
- URL pattern: `https://allhalal.info/ru/*`
- Reason: Outdated content / Page redirects
- Submit

### Step 4: Repeat for All 6 Locales
- /ru/*
- /nl/*
- /fr/*
- /es/*
- /it/*
- /ar/*

---

## ⚠️ OPTIONAL: Also Consider Removing

### Legacy Paths (если были в индексе)
10. `https://allhalal.info/index.html` (redirects to /)
11. `https://allhalal.info/index` (redirects to /)

Check if indexed:
```
site:allhalal.info inurl:index.html
site:allhalal.info inurl:index
```

### Old Admin Paths (if exposed)
Проверьте, есть ли в индексе:
```
site:allhalal.info/admin
```

Если да, можно временно удалить (admin pages обычно не должны быть в индексе).

---

## 🔧 IMPORTANT: Update robots.txt

Текущий robots.txt **неполный**:
```
# Current (INCOMPLETE)
Disallow: /en/
Disallow: /en
Disallow: /blog/
Disallow: /blog
```

**Нужно добавить:**
```
# All old locales (should be added)
Disallow: /ru/
Disallow: /ru
Disallow: /nl/
Disallow: /nl
Disallow: /fr/
Disallow: /fr
Disallow: /es/
Disallow: /es
Disallow: /it/
Disallow: /it
Disallow: /ar/
Disallow: /ar
```

### Why Update robots.txt?
- Предотвращает re-crawling удалённых путей
- Сигнализирует Google что эти пути deprecated
- Помогает быстрее удалить из индекса

---

## 📊 MONITORING

After submitting removals:

### Week 1: Check Processing
- All requests should show "Processing request"
- Usually takes 1-2 days to process

### Week 2: Verify Removed
- Check `site:allhalal.info/ru` in Google
- Should return no results or show redirect message
- GSC removals should show "Approved"

### Week 3-4: Monitor Index Coverage
**Google Search Console → Index → Coverage**
- Check for drop in "Indexed, not submitted in sitemap"
- Verify old locale URLs disappear
- Monitor for new crawl errors

---

## ✅ SUCCESS CRITERIA

1. All 9 removal requests approved in GSC
2. `site:allhalal.info/[locale]` returns 0 results
3. Index coverage report shows only valid URLs
4. No duplicate content warnings
5. Crawl stats show reduced crawling of old paths

---

## 🎯 PRIORITY ACTION NOW

**Срочно (сегодня):**
1. ✅ Submit 6 missing locale removals in GSC
2. ✅ Update robots.txt to block all old locales
3. ⏳ Wait for GSC to process (1-2 days)

**Мониторинг (через неделю):**
1. Verify all removals approved
2. Check Google index for old URLs
3. Update removal checklist

---

## 📝 TEMPLATE: Removal Request Message

When submitting to GSC, you can add note:

> These URLs are legacy locale-specific paths from our previous multilingual implementation. The site is now English-only with all content at root level. These paths permanently redirect (301) to the new structure. Requesting removal to clean up index and prevent duplicate content.

---

**Document Created:** May 1, 2026, 02:40 AM  
**Next Review:** May 8, 2026  
**Status:** 3/9 removals submitted, 6 pending
