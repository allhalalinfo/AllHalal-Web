# Setup Guide: Background News Caching

## Overview

Replace slow on-demand RSS parsing with background updates using:
- **Hetzner cron** (scheduler, $0)
- **Upstash Redis** (cache, free tier)
- **Vercel API** (endpoint, free tier)

**Why this architecture:**
- Vercel Hobby cron limit: 1/day (insufficient)
- Direct Redis TCP: security risk
- Upstash REST API: secure, serverless-friendly

---

## Step 1: Create Upstash Redis (5 minutes)

### 1.1 Sign Up

Visit: https://console.upstash.com

- Sign up with GitHub/Google
- No credit card required for free tier

### 1.2 Create Database

1. Click "Create Database"
2. Name: `allhalal-news-cache`
3. Type: **Redis**
4. Region: Choose closest to your Vercel region (e.g., `us-east-1`)
5. Plan: **Free** (10K commands/day)
6. TLS: **Enabled** (default, don't change)

### 1.3 Get Credentials

After creation, you'll see:
- **REST URL**: `https://xxx-xxxxx.upstash.io`
- **REST Token**: Long string starting with `AY...`

Copy both - you'll need them for Vercel.

---

## Step 2: Configure Vercel (3 minutes)

### 2.1 Add Environment Variables

Visit: https://vercel.com/your-project/settings/environment-variables

Add these 3 variables:

```bash
# 1. Generate CRON_SECRET (run in terminal):
openssl rand -hex 32

# 2. Add to Vercel:
Name: CRON_SECRET
Value: <paste output from step 1>
Environments: Production, Preview, Development

# 3. Add Upstash REST URL:
Name: UPSTASH_REDIS_REST_URL
Value: https://xxx-xxxxx.upstash.io
Environments: Production, Preview, Development

# 4. Add Upstash REST Token:
Name: UPSTASH_REDIS_REST_TOKEN
Value: AYxxxxxxxxxxxxx
Environments: Production, Preview, Development
```

### 2.2 Redeploy

Click "Redeploy" button in Vercel dashboard to apply env vars.

---

## Step 3: Setup Hetzner Cron (5 minutes)

### 3.1 SSH into Hetzner

```bash
ssh root@your-server-ip
```

### 3.2 Create Cron Job

```bash
# Edit crontab
crontab -e

# Add this line at the end (replace YOUR_CRON_SECRET):
*/30 * * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1
```

**Replace `YOUR_CRON_SECRET`** with the value you generated in Step 2.1.

**Save and exit:**
- Nano: `Ctrl+X`, then `Y`, then `Enter`
- Vim: `Esc`, then `:wq`, then `Enter`

### 3.3 Verify Cron is Active

```bash
# List cron jobs
crontab -l

# Should see your new job
```

---

## Step 4: Test Everything (5 minutes)

### Test 1: Manual Trigger

```bash
# From your local machine or Hetzner:
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://allhalal.info/api/cron/update-news

# Expected response:
{
  "success": true,
  "redis": {
    "connected": true,
    "source": "upstash",
    "latency": 25
  },
  "updates": {
    "homepage": 8,
    "newsPage": 20
  },
  "duration": 12543,
  "timestamp": "2026-03-12T10:30:00.000Z"
}
```

### Test 2: Check Cron Logs

```bash
# On Hetzner server
tail -f /var/log/allhalal-cron.log

# Wait for next 30-minute mark (e.g., 11:00, 11:30, 12:00)
# Should see JSON response similar to Test 1
```

### Test 3: Verify Cache

Visit: https://allhalal.info/en/news

Open Chrome DevTools → Console → Check for log:
```
✅ Cache hit (upstash): news:aggregated:safe-false
```

### Test 4: Check Upstash Dashboard

Visit: https://console.upstash.com

1. Click your database
2. Go to "Metrics" tab
3. Should see:
   - Commands graph increasing every 30 minutes
   - ~50-100 commands per cron run
   - Total ~2,500 commands/day

---

## Monitoring

### Check Cron Status

```bash
# On Hetzner
tail -n 50 /var/log/allhalal-cron.log | grep success

# Count successful runs today
grep success /var/log/allhalal-cron.log | grep $(date +%Y-%m-%d) | wc -l
# Should be ~48 (24 hours × 2 runs/hour)
```

### Check Vercel Logs

1. Visit: https://vercel.com/your-project
2. Go to "Logs" tab
3. Filter: `/api/cron/update-news`
4. Should see 48 successful executions per day

### Check Upstash Usage

1. Visit: https://console.upstash.com
2. Click database
3. Check "Usage" section:
   - Commands: ~2,500/day (< 10,000 free limit)
   - Storage: ~5-10MB (< 256MB free limit)

---

## Troubleshooting

### Error: "CRON_SECRET not configured"

**Fix:** Add `CRON_SECRET` to Vercel environment variables, then redeploy.

### Error: "Unauthorized"

**Fix:** Verify cron command uses exact same secret as Vercel env var.

```bash
# Check Vercel env var matches your cron command
vercel env pull .env.local
cat .env.local | grep CRON_SECRET
```

### Error: "Upstash connection failed"

**Fix 1:** Check env vars are correct:
```bash
# In Vercel dashboard, verify:
UPSTASH_REDIS_REST_URL=https://...upstash.io (not redis://...)
UPSTASH_REDIS_REST_TOKEN=AY... (starts with AY)
```

**Fix 2:** Test Upstash directly:
```bash
curl https://YOUR-UPSTASH-URL/ping \
  -H "Authorization: Bearer YOUR_TOKEN"
# Should return: {"result":"PONG"}
```

### Cron Not Running

**Fix 1:** Check cron service:
```bash
systemctl status cron
# Should show: active (running)
```

**Fix 2:** Check syntax:
```bash
crontab -l
# Verify no syntax errors
```

**Fix 3:** Check logs for errors:
```bash
grep CRON /var/log/syslog | tail -20
```

### Cache Not Working

**Fix:** Check Vercel logs for errors:
```
✅ Good: Cache hit (upstash)
⚠️ Issue: Cache hit (memory) ← Upstash not working
❌ Bad: Cache write error ← Check env vars
```

---

## Performance Expectations

### Realistic Latency

**Current (in-memory cache):**
- Cold start: 8-15 seconds
- Warm: 50-200ms

**With Redis (after setup):**
- Typical: ~200ms (Upstash REST API + SSR)
- Range: 150-400ms (depends on region/network)
- No more cold starts ✅

### Why not "50-100ms"?

Latency breakdown:
```
Upstash REST API: 20-50ms
Next.js SSR: 50-150ms
Network (user → Vercel): 50-200ms
Total: 120-400ms (typically ~200ms)
```

### What improves?

- ✅ **Eliminates cold starts** (no more 8-15s waits)
- ✅ **Consistent performance** (doesn't depend on RSS availability)
- ✅ **Cross-deployment cache** (survives redeploys)
- ⚠️ Not "99% faster" (not measured, depends on baseline)

---

## Cost

| Item | Free Tier | Your Usage | Cost |
|------|-----------|------------|------|
| Hetzner cron | Unlimited | 48/day | $0 |
| Upstash Redis | 10K commands/day | ~2,500/day | $0 |
| Vercel API | 100K requests/month | ~1,440/month | $0 |
| **TOTAL** | - | - | **$0/month** |

**If you exceed free tier:**
- Upstash paid: $0.20/100K commands = ~$0.50/month at 250K

---

## Security Notes

### What's Secure

✅ **Upstash REST API:** HTTPS with TLS encryption  
✅ **CRON_SECRET:** Prevents unauthorized access  
✅ **No direct TCP:** Redis not exposed to internet  

### What to Avoid

❌ **Direct Redis connections:** Don't open port 6379 to internet  
❌ **Unencrypted connections:** Always use HTTPS/TLS  
❌ **Shared secrets:** Generate unique CRON_SECRET per project  

---

## Next Steps

After setup is working:

1. ✅ Monitor logs for 24 hours
2. ✅ Check Upstash usage doesn't spike
3. ✅ Verify /news page loads faster
4. ✅ Move to Week 1, Day 3: Content Audit

---

## Summary

**What you built:**
- Background news updates (no user waits)
- Persistent Redis cache (survives deploys)
- $0/month cost (free tiers sufficient)

**Architecture:**
```
Hetzner Cron (every 30 min)
  → HTTPS → Vercel API
  → HTTPS → Upstash Redis
  → Read by Next.js pages
```

**Performance:**
- Before: 8-15s cold starts
- After: ~200ms consistent
- Improvement: Eliminates cold starts (not "99%" claim)

**Security:**
- TLS encryption everywhere
- Token authentication
- No direct TCP exposure
