# News Feed - Best Practices & Maintenance Guide

## 📊 Current Status

### Update Frequency:
- **Cache TTL:** 30 minutes
- **RSS Revalidation:** 30 minutes
- **Result:** News updates every 30 minutes

### Categories (6):
1. **Faith & Practice** - Islamic knowledge, fiqh, spirituality
2. **Family & Education** - Parenting, learning, productivity
3. **Halal Living** - Food, lifestyle, consumer goods
4. **Islamic Finance** - Halal investing, banking, economics
5. **Health & Wellness** - Fitness, mental health, lifestyle
6. **Ummah & World** - Global Muslim community news

### Active Sources: 15
- **Priority 1 (Highest):** Yaqeen, Productive Muslim, IFG, SeekersGuidance
- **Priority 2:** About Islam, HalalZilla, Salaam Gateway, Muslim Girl
- **Priority 3:** Islam21c, Muslim Heritage, etc.
- **Priority 4-5:** Al Jazeera (dedicated news page only)

---

## ✅ Best Practices

### 1. Source Selection Criteria:

**✓ Good sources should have:**
- Consistent RSS feed (no SSL errors, no 402/403)
- High-quality content (not just product promo)
- Regular updates (at least 2-3 times per week)
- Clean metadata (images, excerpts, publish dates)
- Safe for Muslim audience (no inappropriate ads/content)

**✗ Avoid sources with:**
- Broken RSS feeds
- Heavy/disturbing headlines (war, violence) for homepage
- Clickbait titles
- Inconsistent publishing schedule
- Low-quality images or no images

### 2. Homepage Curation Strategy:

The homepage uses **"safe mode"** with quotas:
```typescript
'Faith & Practice': 2 articles max
'Family & Education': 1 article max
'Halal Living': 1 article max
'Islamic Finance': 1 article max
'Health & Wellness': 1 article max
'Ummah & World': 0 (reserved for /news page)
```

**Why?** Homepage is the first impression. We want:
- Balanced content (not all finance or all news)
- Positive/uplifting tone
- Evergreen content that ages well
- No heavy headlines (assassinations, war, deaths)

### 3. Quality Filters:

**Automatically excluded:**
- Titles with "podcast", "roundup", "newsletter"
- Articles with very short titles (<24 chars) or excerpts (<40 chars)
- Bad images (emojis, gravatars, logos, icons)
- Stale content (>120 hours old for homepage, >1 year for /news)
- Heavy headlines (assassination, attack, war, bomb, killed)

### 4. Ranking Algorithm:

Articles are scored based on:
```
Score = (Source Priority Weight) + (Excerpt Boost) + (Image Boost) - (Freshness Penalty)

- Priority Weight: (6 - priority) × 14
  - Priority 1 source = 70 points
  - Priority 5 source = 14 points
  
- Excerpt Boost:
  - >90 chars = +4 points
  - >45 chars = +2 points
  - <45 chars = -2 points
  
- Image Boost: +2 points if has image
- Freshness Penalty: -0.18 points per hour (capped at 120 hours)
```

**Result:** Recent articles from high-priority sources with images and good excerpts rise to the top.

### 5. Deduplication:

Articles are deduplicated by:
- Normalized title (removes punctuation, lowercase)
- Normalized URL (removes protocol, trailing slash)

If duplicates exist, the one with the highest score wins.

---

## 🔧 Maintenance Tasks

### Weekly:
- [ ] Check build logs for RSS feed errors
- [ ] Review disabled sources (can they be re-enabled?)
- [ ] Spot-check homepage for quality/diversity

### Monthly:
- [ ] Evaluate source performance (are they still publishing?)
- [ ] Consider adding new sources to underrepresented categories
- [ ] Review scoring algorithm effectiveness

### Quarterly:
- [ ] Survey users for source suggestions
- [ ] Re-evaluate homepage quotas based on user engagement
- [ ] Check for new high-quality Islamic content sites

---

## 🚨 Troubleshooting

### "Build shows RSS feed errors"
**Solution:** Temporarily disable the problematic source (comment out in `newsSources.ts`). Re-enable after source fixes their RSS.

### "Homepage shows too many finance articles"
**Solution:** Adjust `HOMEPAGE_QUOTAS` in `newsSources.ts`. Reduce finance quota or increase other categories.

### "News feels stale"
**Solution:** 
1. Check if high-priority sources are publishing regularly
2. Consider reducing `HOMEPAGE_MAX_AGE_HOURS` from 120 to 72 hours
3. Add more frequent publishers

### "Too many duplicate articles"
**Solution:** Deduplication already handles this. If still seeing duplicates, check if articles have significantly different titles but same content.

### "Want faster updates"
**Solution:** Reduce `CACHE_TTL` in `newsFeed.ts` from 1800s (30min) to 900s (15min). Be mindful of RSS rate limits.

---

## 📝 Adding a New Source

```typescript
{
  id: 'newsourceid',              // Unique, lowercase, no spaces
  name: 'Source Display Name',    // How it appears to users
  rssUrl: 'https://example.com/feed/', // Valid RSS/Atom feed URL
  categories: ['Faith & Practice', 'Family & Education'], // 1-3 categories
  priority: 2,                    // 1 (highest) to 5 (lowest)
  safe: true,                     // true = homepage eligible, false = /news only
  fallbackGradient: 'from-blue-500 to-purple-700', // Tailwind gradient for avatar
}
```

**Testing steps:**
1. Add source to `newsSources.ts`
2. Run `npm run build` - check for RSS errors
3. Visit `/en` (homepage) - should appear if `safe: true`
4. Visit `/en/blog` - all sources appear here
5. Check image/excerpt quality

---

## 🎯 Current Gaps & Opportunities

### Underrepresented Categories:
- **Health & Wellness:** Only 2 sources (was 3 before disabling Haute Hijab)
  - **Opportunity:** Add fitness, mental health, halal wellness sources
  
- **Halal Living:** Only 2 sources (was 3 before disabling Halal Focus)
  - **Opportunity:** Add halal food blogs, consumer goods reviews

### Potential New Sources:
- **Health:** MuslimMattersHealth, IlmFeed (health section)
- **Halal Living:** MyHalalKitchen, Halal Food Foundation blog
- **Tech & Innovation:** Muslim Tech Trends, Islamic Apps reviews
- **Modest Fashion:** Modanisa blog, Niswa Fashion
- **Youth & Students:** MIST blog, MSA content

### Advanced Features (Future):
- [ ] User can filter by category on /news page
- [ ] User can toggle "safe mode" on/off
- [ ] Personalized feed based on user interests
- [ ] Save articles for later
- [ ] Email digest of weekly top articles

---

## 📈 Success Metrics

### Quality Indicators:
- **High CTR** (click-through rate) on news widgets
- **Low bounce rate** on article pages
- **High time on page** for /news
- **Diverse source distribution** (not dominated by 1-2 sources)

### Health Indicators:
- **<5% RSS fetch failures** in build logs
- **>80% articles have images**
- **>90% articles have excerpts >40 chars**
- **Balanced category distribution** (no category >50% of homepage)

---

## 🔄 Change Log

### 2026-03-12:
- ✅ Disabled Haute Hijab (RSS 402 error)
- ✅ Disabled Halal Focus (SSL certificate error)
- ✅ Added SeekersGuidance (Priority 1, Faith & Practice)
- ✅ Added Muslim Girl (Priority 2, Health & Wellness)
- ✅ Documented best practices and maintenance guide

### Future:
- Monitor disabled sources for re-enablement
- Evaluate new sources for Health & Wellness category
- Consider adding user preference filters

---

**Maintained by:** AllHalal.info team  
**Last updated:** 2026-03-12
