# IndexNow Setup Guide - Instant Search Engine Indexing

## What is IndexNow?

IndexNow is a **free API** that instantly notifies search engines when you publish or update content. Supported by:
- ✅ **Google** (via Bing partnership)
- ✅ **Bing** (Microsoft)
- ✅ **Yandex** (Russia)
- ✅ **Seznam.cz** (Czech Republic)
- ✅ **Naver** (South Korea)

**Benefits**:
- 🚀 Instant indexing (minutes instead of days/weeks)
- 💰 Free forever
- ⚡ Simple API
- 🌍 Multiple search engines at once

---

## Setup Steps

### 1. Generate Your IndexNow Key

Generate a random UUID (this is your API key):
```
https://www.uuidgenerator.net/version4
```

Example: `47e04c4c-8f2b-4e5a-8e4c-8f2b4e5a8e4c`

### 2. Add Environment Variables

**Local development** (`.env.local`):
```bash
INDEXNOW_KEY=47e04c4c-8f2b-4e5a-8e4c-8f2b4e5a8e4c
INDEXNOW_API_SECRET=your-random-secret-here
```

**Vercel production**:
1. Go to Vercel project settings
2. Environment Variables
3. Add:
   - `INDEXNOW_KEY` = your UUID
   - `INDEXNOW_API_SECRET` = random secret (optional but recommended)

### 3. Create Key File in Public Directory

Create a file in `/public` directory with your key:

**File**: `/public/47e04c4c-8f2b-4e5a-8e4c-8f2b4e5a8e4c.txt`
**Content**: Just the key itself
```
47e04c4c-8f2b-4e5a-8e4c-8f2b4e5a8e4c
```

This proves you own the domain.

### 4. Deploy

```bash
git add .
git commit -m "Add IndexNow instant indexing"
git push origin main
```

### 5. Test It

After deployment, test the endpoint:

**Option A: Manual test via browser**
```
https://allhalal.info/api/index-now
```
Should return: `{ message: "IndexNow API endpoint. Use POST to submit URLs." }`

**Option B: Submit all URLs**
```bash
curl -X POST https://allhalal.info/api/index-now \
  -H "Authorization: Bearer your-secret-here"
```

---

## Usage

### Automatic Submission (Recommended)

Add this to your deployment workflow:

**GitHub Actions** (`.github/workflows/deploy.yml`):
```yaml
- name: Notify IndexNow
  run: |
    curl -X POST https://allhalal.info/api/index-now \
      -H "Authorization: Bearer ${{ secrets.INDEXNOW_API_SECRET }}"
```

**Vercel Deploy Hook**:
1. Create a Vercel deploy hook
2. Add post-deploy webhook to call `/api/index-now`

### Manual Submission

Submit a single URL:
```typescript
import { submitUrlToIndexNow } from '@/lib/indexnow';

// In your API route or script
await submitUrlToIndexNow('/is-it-halal/is-shellac-halal');
```

Submit multiple URLs:
```typescript
import { submitToIndexNow } from '@/lib/indexnow';

const urls = [
  '/is-it-halal/is-shellac-halal',
  '/is-it-halal/is-coca-cola-halal',
  '/finance/zakat-calculator',
];

await submitToIndexNow(urls);
```

Submit all halal items:
```typescript
import { submitAllHalalItemsToIndexNow } from '@/lib/indexnow';

await submitAllHalalItemsToIndexNow();
```

---

## When to Submit?

✅ **Do submit**:
- New pages created
- Existing pages updated (significant changes)
- After fixing SEO issues
- After adding new content

❌ **Don't submit**:
- Minor typo fixes
- CSS/styling changes
- Pages that don't exist yet
- Too frequently (max 1x per hour per URL)

---

## Rate Limits

- **10,000 URLs** per request (batch)
- **No daily limit**
- **No cost**

Our implementation submits in batches of 100 URLs with 1-second delays between batches to be polite.

---

## Monitoring

Check if IndexNow is working:

1. **Bing Webmaster Tools**:
   - https://www.bing.com/webmasters
   - Add your site
   - Check "URL Inspection" → should see IndexNow submissions

2. **Google Search Console**:
   - https://search.google.com/search-console
   - Check "Coverage" → should see faster indexing

3. **Logs**:
   - Check Vercel logs after calling `/api/index-now`
   - Look for: `✅ Successfully submitted X URLs to IndexNow`

---

## Troubleshooting

### Error: "Invalid key"
- Make sure key file exists at `/public/{your-key}.txt`
- File content must be exactly the key (no extra spaces)
- Key must be a valid UUID

### Error: "Host not found"
- Wait 24-48 hours after creating key file
- Verify DNS is working: `nslookup allhalal.info`

### URLs not getting indexed
- IndexNow only **notifies** search engines
- Actual indexing depends on Google/Bing crawlers
- Usually takes 1-3 days (much faster than normal 1-4 weeks)
- Make sure pages have proper SEO (title, description, content)

---

## Current Implementation

We've added:

1. **`/lib/indexnow.ts`** - Core IndexNow functions
2. **`/app/api/index-now/route.ts`** - API endpoint
3. **Environment variables** in `.env.example`

**To use**:
```bash
# After deploying new content
curl -X POST https://allhalal.info/api/index-now \
  -H "Authorization: Bearer your-secret"
```

This will submit all halal item pages to IndexNow for instant indexing! 🚀

---

## Additional Resources

- [IndexNow Official Docs](https://www.indexnow.org/)
- [IndexNow FAQ](https://www.indexnow.org/faq)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
