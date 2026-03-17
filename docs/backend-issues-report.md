# Backend API Issues Report
**Date:** March 17, 2026  
**Reporter:** Cursor Agent  
**Environment:** Production (api.allhalal.info)

---

## 🎯 Executive Summary

Backend API на Hetzner работает **частично**. Основные endpoints доступны, но критические endpoints для News и Briefs detail страниц возвращают **404** или **пустые данные**.

---

## ✅ Working Endpoints (200 OK)

### 1. Health & System
- ✅ `GET /health` - Working
  ```json
  {"status":"healthy","timestamp":"2026-03-17T13:06:55Z","version":"1.0.0"}
  ```
- ✅ `GET /api/nisab` - Working (Gold/Silver prices)
- ✅ `GET /api/v1/nisab` - Working

### 2. News Feed (List Only)
- ✅ `GET /api/v1/news/cached` - Working
  - Returns news items list
  - Example titles:
    - "When Is a Spiritual Retreat (I'tikaf) Appropriate..."
    - "Should Society Focus On Empowering Men..."

### 3. Briefs Feed (List Only)
- ✅ `GET /api/v1/briefs/feed` - Working
  - Returns briefs items list
  - Contains slug: `exotic-herbs-in-prophetic-hadith`

### 4. Calendar & Events
- ✅ `GET /api/v1/calendar/events` - Working
  - Returns Islamic events (Eid, Hajj, etc.)

### 5. Live Streams
- ✅ `GET /api/v1/config/live-streams` - Working
  - Returns Makkah & Madinah live stream configs

### 6. Finance
- ✅ `GET /api/v1/finance/rates` - Assumed working (not tested but in openapi.json)

---

## ❌ Broken/Missing Endpoints (404)

### Critical Issues

#### 1. **Briefs Detail Pages** 🔴 HIGH PRIORITY
**Problem:**
```bash
GET /api/v1/briefs/{slug}
```
- Returns 404 even for slugs that exist in `/api/v1/briefs/feed`
- Example:
  ```bash
  curl https://api.allhalal.info/api/v1/briefs/exotic-herbs-in-prophetic-hadith
  # {"error":"Brief not found","status_code":404}
  ```

**Impact:**
- All news detail pages show 404 on frontend
- Example broken URL: `https://allhalal.info/en/news/exotic-herbs-in-prophetic-hadith`

**Root Cause:**
- Slug exists in feed endpoint
- But detail endpoint can't find/retrieve the full article
- Possible database query issue or missing data in briefs table

---

#### 2. **Briefs Homepage Layout** 🟡 MEDIUM PRIORITY
**Problem:**
```bash
GET /api/v1/briefs/home
```
- Returns `{"hero": null, "featured": [], "compact": []}`
- All arrays empty

**Impact:**
- Homepage can't show curated news layout
- Frontend falls back to RSS aggregated news

**Root Cause:**
- No data in briefs table, OR
- Query logic not selecting/prioritizing articles correctly

---

#### 3. **Hadith of the Day** 🟡 MEDIUM PRIORITY
**Problem:**
```bash
GET /api/v1/hadith/of-the-day
```
- Returns `{"hadith": {"text": null}}`

**Impact:**
- Today For You widget can't show daily hadith
- Frontend probably shows empty or fallback state

---

#### 4. **Non-V1 Aliases (404)** 🟢 LOW PRIORITY
These endpoints exist in openapi but return 404:
- `/api/briefs/feed` → 404 (should alias to `/api/v1/briefs/feed`)
- `/api/news/cached` → 404 (should alias to `/api/v1/news/cached`)
- `/api/calendar-events` → 404 (should alias to `/api/v1/calendar/events`)
- `/api/live-streams` → 404 (should alias to `/api/v1/config/live-streams`)
- `/api/hadith-of-the-day` → 404 (should alias to `/api/v1/hadith/of-the-day`)

**Impact:**
- Frontend has some hardcoded `/api/` routes (not `/api/v1/`)
- These return 404, but frontend has fallback logic

---

## 🔧 Required Fixes

### Priority 1: Briefs Detail Endpoint
**File:** `api/routers/briefs.py` (backend)

**Action:**
1. Debug `GET /api/v1/briefs/{slug}` endpoint
2. Check database query:
   ```sql
   SELECT * FROM briefs WHERE slug = 'exotic-herbs-in-prophetic-hadith';
   ```
3. Verify data exists in table
4. If no data: ETL pipeline needs to populate briefs table
5. If data exists but query fails: fix SQL query/ORM logic

**Expected Response:**
```json
{
  "success": true,
  "brief": {
    "slug": "exotic-herbs-in-prophetic-hadith",
    "title": "Exotic Herbs in Prophetic Hadith",
    "summary": "...",
    "image_url": "...",
    "content": "Full article content here...",
    "sources": [...]
  },
  "related": [...]
}
```

---

### Priority 2: Briefs Homepage Layout
**File:** `api/routers/briefs.py` (backend)

**Action:**
1. Check `GET /api/v1/briefs/home` logic
2. Ensure it selects:
   - 1 hero article (recent, high-quality)
   - 3 featured articles
   - 8+ compact articles
3. If table empty: run ETL to populate
4. If query returns nothing: fix selection criteria

**Expected Response:**
```json
{
  "success": true,
  "hero": { "slug": "...", "title": "..." },
  "featured": [{...}, {...}, {...}],
  "compact": [{...}, {...}, ...]
}
```

---

### Priority 3: Hadith of the Day
**File:** `api/routers/hadith.py` (backend)

**Action:**
1. Check hadith table has data
2. Verify daily rotation logic works
3. Test endpoint returns valid hadith

---

### Priority 4: Add API Aliases (Optional)
**File:** `main.py` (backend)

**Action:**
Add non-versioned aliases for frontend compatibility:
```python
# Add to main.py
app.add_api_route("/api/briefs/feed", briefs_router.feed)
app.add_api_route("/api/news/cached", news_router.cached)
# ... etc
```

---

## 📊 Endpoint Status Matrix

| Endpoint | Status | Frontend Uses | Priority |
|----------|--------|---------------|----------|
| `/api/v1/health` | ✅ Working | ❌ No | Low |
| `/api/v1/nisab` | ✅ Working | ✅ Yes | - |
| `/api/nisab` | ✅ Working | ✅ Yes | - |
| `/api/v1/news/cached` | ✅ Working | ✅ Yes (feed) | - |
| `/api/v1/briefs/feed` | ✅ Working | ✅ Yes (feed) | - |
| `/api/v1/briefs/{slug}` | ❌ 404 | ✅ Yes (detail) | 🔴 HIGH |
| `/api/v1/briefs/home` | ⚠️ Empty | ✅ Yes (homepage) | 🟡 MEDIUM |
| `/api/v1/hadith/of-the-day` | ⚠️ Empty | ✅ Yes (widget) | 🟡 MEDIUM |
| `/api/v1/calendar/events` | ✅ Working | ✅ Yes | - |
| `/api/v1/config/live-streams` | ✅ Working | ✅ Yes | - |
| `/api/briefs/*` (no v1) | ❌ 404 | ❌ No (has fallback) | 🟢 LOW |
| `/api/news/*` (no v1) | ❌ 404 | ❌ No (has fallback) | 🟢 LOW |

---

## 🧪 Testing Commands

### Test Brief Detail (Currently Broken)
```bash
# Should return full article, currently returns 404
curl -s https://api.allhalal.info/api/v1/briefs/exotic-herbs-in-prophetic-hadith | jq '.'
```

### Test Homepage Layout (Currently Empty)
```bash
# Should return hero/featured/compact, currently returns nulls
curl -s https://api.allhalal.info/api/v1/briefs/home | jq '.'
```

### Test Hadith (Currently Empty)
```bash
# Should return hadith text, currently returns null
curl -s https://api.allhalal.info/api/v1/hadith/of-the-day | jq '.hadith.text'
```

---

## 🎯 Next Steps

1. **Backend Agent:**
   - Fix `/api/v1/briefs/{slug}` endpoint (Priority 1)
   - Populate briefs table via ETL if empty
   - Fix homepage layout endpoint (Priority 2)
   - Fix hadith endpoint (Priority 3)

2. **Frontend:**
   - Already has fallback logic for missing data ✅
   - Will work properly once backend is fixed
   - No changes needed on frontend

3. **Testing:**
   - After backend fixes, test all URLs:
     - `https://allhalal.info/en/news`
     - `https://allhalal.info/en/news/exotic-herbs-in-prophetic-hadith`
     - `https://allhalal.info/en`

---

## 📝 Notes

- Backend FastAPI server is running and healthy
- OpenAPI docs available at: `https://api.allhalal.info/docs`
- Database connection is working
- Issue is NOT with infrastructure, but with specific endpoint logic/data

---

**Report Generated:** 2026-03-17 13:07 UTC  
**Next Review:** After backend fixes are deployed
