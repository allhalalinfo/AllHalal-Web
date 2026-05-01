# URGENT FIX: www Subdomain Redirect

## Problem
`www.allhalal.info` returns HTTP 200 instead of redirecting to `allhalal.info` with 301.

## Impact
- ⚠️ Duplicate content risk
- ⚠️ Split link equity between www and non-www
- ⚠️ Canonical tag present but 301 preferred

## Quick Test
```bash
curl -sI "https://www.allhalal.info" | head -2
# Current: HTTP/2 200
# Expected: HTTP/2 301 + location: https://allhalal.info/
```

---

## Solution: Fix at Caddy/nginx Level

### Step 1: Check Current Web Server
```bash
# On Hetzner server
systemctl status caddy
# OR
systemctl status nginx
```

### Step 2: Add www Redirect (Caddy)

Edit Caddyfile:
```bash
sudo nano /etc/caddy/Caddyfile
```

Add BEFORE main site block:
```caddy
www.allhalal.info {
    redir https://allhalal.info{uri} 301
}

allhalal.info {
    reverse_proxy localhost:3000
    # ... existing config
}
```

### Step 3: Reload Caddy
```bash
sudo systemctl reload caddy
# OR test config first:
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

### Step 4: Verify Fix
```bash
curl -sI "https://www.allhalal.info"
# Should show:
# HTTP/2 301
# location: https://allhalal.info/

# Test with path:
curl -sI "https://www.allhalal.info/guides"
# Should redirect to:
# https://allhalal.info/guides
```

---

## Alternative: nginx Configuration

If using nginx instead:

```nginx
# /etc/nginx/sites-available/allhalal.info

server {
    listen 443 ssl http2;
    server_name www.allhalal.info;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    return 301 https://allhalal.info$request_uri;
}

server {
    listen 443 ssl http2;
    server_name allhalal.info;
    
    # ... existing config
}
```

Reload nginx:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Verification Checklist

After applying fix:

- [ ] `curl -sI "https://www.allhalal.info"` returns 301
- [ ] `curl -sI "https://www.allhalal.info/guides"` redirects to non-www
- [ ] Browser test: www.allhalal.info redirects to allhalal.info
- [ ] Google Search Console: Submit both URLs for recrawl
- [ ] Monitor GSC for duplicate content alerts (should resolve in 7-14 days)

---

## Why Middleware Didn't Work

The Next.js middleware code is correct:
```typescript
if (hostname === 'www.allhalal.info') {
  const url = request.nextUrl.clone();
  url.hostname = 'allhalal.info';
  return NextResponse.redirect(url, 301);
}
```

But it's likely:
1. Web server (Caddy/nginx) handles www as separate site
2. Request never reaches Next.js middleware
3. Or middleware matcher doesn't catch www subdomain

**Best practice:** Handle domain canonicalization at web server level (Caddy/nginx) before application layer.

---

## Timeline

**Priority:** 🔴 HIGH  
**Estimated Time:** 5-10 minutes  
**Downtime:** None (just reload web server)  
**Impact:** Immediate (www will redirect)

---

## After Fix

Update deployment docs to include www redirect in standard Hetzner/Caddy setup.

Add to monitoring:
```bash
# Cron job to verify redirect
0 */6 * * * curl -sI "https://www.allhalal.info" | grep -q "301" || echo "www redirect broken" | mail -s "Alert: www redirect" admin@allhalal.info
```

---

**Document Updated:** May 1, 2026  
**Status:** Awaiting implementation
