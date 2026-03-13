# Background News Processing Setup Guide

## Overview

This document explains how to setup automatic news caching using **Hetzner cron + Redis** for AllHalal.info.

**Problem:** News currently parses RSS feeds on-demand, taking 8-15 seconds  
**Solution:** Background job updates cache every 30 minutes, users get content in <100ms

**Cost:** $0 (using your existing Hetzner server)

---

## Architecture

```
┌─────────────────────────────────────┐
│ Hetzner Server                      │
│                                     │
│ 1. Redis (cache storage)           │
│ 2. Cron (scheduler)                │
│    └─ Every 30 min:                │
│       curl Vercel API endpoint      │
└─────────────────────────────────────┘
          ↓ HTTP Request
┌─────────────────────────────────────┐
│ Vercel: /api/cron/update-news       │
│                                     │
│ 1. Verify auth token                │
│ 2. Parse 15 RSS feeds               │
│ 3. Save to Redis cache              │
└─────────────────────────────────────┘
          ↓ Read cache
┌─────────────────────────────────────┐
│ Next.js Pages (/news, homepage)     │
│                                     │
│ 1. Try Redis first (10ms)           │
│ 2. Fallback to fresh parse if miss │
└─────────────────────────────────────┘
```

---

## Step 1: Setup Redis on Hetzner (5 minutes)

### Option A: Redis Already Installed

```bash
# SSH into your server
ssh root@your-hetzner-ip

# Check if Redis is running
redis-cli ping
# Should return: PONG

# Get Redis password (if secured)
grep requirepass /etc/redis/redis.conf

# Test connection
redis-cli -a YOUR_PASSWORD ping
```

### Option B: Install Redis (if needed)

```bash
# SSH into your server
ssh root@your-hetzner-ip

# Install Redis
apt update
apt install redis-server -y

# Secure Redis (set password)
nano /etc/redis/redis.conf

# Add this line (replace with strong password):
requirepass YOUR_STRONG_PASSWORD_HERE

# Restart Redis
systemctl restart redis
systemctl enable redis

# Test
redis-cli -a YOUR_PASSWORD ping
# Should return: PONG
```

### Allow External Connections (if Vercel needs direct access)

```bash
# Edit Redis config
nano /etc/redis/redis.conf

# Change bind line to:
bind 0.0.0.0

# Restart
systemctl restart redis

# IMPORTANT: Ensure firewall only allows Vercel IPs
# Or use SSH tunnel (more secure, see below)
```

**Note:** For better security, use SSH tunnel or keep Redis on localhost and run cron locally.

---

## Step 2: Setup Environment Variables (2 minutes)

### On Vercel

1. Go to: https://vercel.com/your-project/settings/environment-variables

2. Add these variables:

```bash
# Generate random secret
CRON_SECRET=paste_result_of_openssl_rand_hex_32_here

# Your Hetzner Redis
HETZNER_REDIS_URL=redis://:YOUR_PASSWORD@YOUR_SERVER_IP:6379

# Optional: explicit password
HETZNER_REDIS_PASSWORD=YOUR_PASSWORD
```

3. Save and redeploy

### Locally (for testing)

```bash
# Copy example
cp .env.example .env.local

# Edit .env.local and fill in your values
nano .env.local
```

---

## Step 3: Setup Hetzner Cron (3 minutes)

### SSH into Hetzner

```bash
ssh root@your-hetzner-ip
```

### Edit Crontab

```bash
crontab -e
```

### Add Cron Job

Paste this line (replace YOUR_CRON_SECRET and YOUR_DOMAIN):

```bash
# Update AllHalal news cache every 30 minutes
*/30 * * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://YOUR_DOMAIN/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1
```

**Example:**
```bash
*/30 * * * * curl -H "Authorization: Bearer abc123xyz789" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1
```

### Save and Exit

- For `nano`: Ctrl+X, then Y, then Enter
- For `vim`: Esc, then `:wq`, then Enter

### Verify Cron is Active

```bash
# List all cron jobs
crontab -l

# Should show your new job
```

---

## Step 4: Test Everything (5 minutes)

### Test 1: Local Development

```bash
# Start dev server
npm run dev

# In another terminal, test endpoint (use your .env.local CRON_SECRET)
curl -H "Authorization: Bearer YOUR_SECRET" http://localhost:3000/api/cron/update-news

# Should return JSON with success: true
```

### Test 2: Test Hetzner → Vercel

```bash
# SSH into Hetzner
ssh root@your-hetzner-ip

# Run cron command manually
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://allhalal.info/api/cron/update-news

# Should see JSON response with:
# - success: true
# - redis: { connected: true, source: "hetzner" }
# - updates: { homepage: 8, newsPage: 20 }
```

### Test 3: Check Logs

```bash
# On Hetzner, check cron logs
tail -f /var/log/allhalal-cron.log

# Should see successful responses every 30 minutes
```

### Test 4: Verify Cache is Working

1. Open https://allhalal.info/en/news
2. Check Network tab in DevTools
3. Page should load fast (<500ms)
4. Server logs (Vercel) should show: `✅ Cache hit (hetzner)`

---

## Monitoring & Maintenance

### Check Cron Status

```bash
# On Hetzner
tail -n 50 /var/log/allhalal-cron.log

# Look for:
# - "success": true
# - No error messages
```

### Check Redis Health

```bash
# SSH into Hetzner
redis-cli -a YOUR_PASSWORD

# Inside redis-cli:
KEYS news:*          # List cached news keys
TTL news:aggregated:safe-true  # Check time-to-live
GET news:aggregated:safe-true  # View cached data
```

### Vercel Logs

1. Go to: https://vercel.com/your-project
2. Click "Logs" tab
3. Filter by: `/api/cron/update-news`
4. Look for successful executions every 30 minutes

---

## Troubleshooting

### Error: "CRON_SECRET not configured"

**Fix:** Add `CRON_SECRET` to Vercel environment variables, then redeploy.

### Error: "Unauthorized"

**Fix:** Check that your cron command uses the exact same secret as Vercel env var.

### Error: "Redis connection failed"

**Fix 1:** Verify Redis is running on Hetzner:
```bash
systemctl status redis
```

**Fix 2:** Check firewall allows connection:
```bash
# On Hetzner
netstat -tulpn | grep 6379
```

**Fix 3:** Test Redis connection from Vercel:
```bash
# Use Vercel CLI
vercel env pull .env.local
# Check HETZNER_REDIS_URL is correct
```

### Cron Not Running

**Fix 1:** Check cron service is active:
```bash
systemctl status cron
```

**Fix 2:** Check crontab syntax:
```bash
crontab -l
# Ensure no syntax errors
```

**Fix 3:** Check logs for errors:
```bash
grep CRON /var/log/syslog
```

---

## Performance Metrics

### Before (on-demand parsing):
- First user after deploy: 8-15 seconds
- Subsequent users: 0-15 seconds (memory cache)
- After deploy: cache reset, slow again

### After (background processing):
- All users: 50-100ms (Redis cache)
- After deploy: cache persists (Redis)
- Stale cache: max 30 minutes old

---

## Cost Breakdown

| Item | Cost | Why |
|------|------|-----|
| Hetzner Server | $0 | Already paying |
| Redis | $0 | Installed on Hetzner |
| Cron | $0 | Built into Linux |
| Vercel API calls | $0 | Free tier (48 calls/day) |
| Bandwidth | $0 | <1MB per call |
| **TOTAL** | **$0/month** | 🎉 |

---

## Next Steps (Week 1, Day 3+)

Once cron is working:

1. ✅ Monitor logs for 24 hours
2. ✅ Check Redis memory usage (should be <10MB)
3. ✅ Verify page load speed improvement
4. ✅ Move to Week 1, Day 3: Content Audit

---

## Optional: Upstash Fallback

If you have issues with Hetzner Redis, you can use Upstash as fallback:

1. Go to: https://console.upstash.com
2. Create Redis database (free tier: 256MB, 500K commands/month)
3. Copy REST URL and token
4. Add to Vercel env vars:
   - `UPSTASH_REDIS_URL`
   - `UPSTASH_REDIS_TOKEN`
5. System will automatically use Upstash if Hetzner fails

**Cost:** $0 (free tier sufficient)

---

## Questions?

If something doesn't work:

1. Check Vercel logs
2. Check Hetzner cron logs
3. Test Redis connection manually
4. Verify all env vars are correct

**Remember:** The goal is fast page loads and fresh content. If users see content loading in <100ms, it's working! 🚀
