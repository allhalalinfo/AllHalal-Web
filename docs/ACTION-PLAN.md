# Code Review: Найденные проблемы + Action Plan

## 🔴 ПРОБЛЕМА 1: Избыточные Redis GET на каждый render

### Текущая ситуация:
```typescript
// app/[locale]/news/page.tsx
const initialNews = await getAggregatedNews({ limit: 18 });

// components/portal/NewsFeedWidget.tsx (на homepage)
const initialNews = await getAggregatedNews({ safeOnly: true, limit: 8 });
```

**Каждый page render = 1 Redis GET**

### Проблема:
- HomePage: 1 GET на каждый визит
- News page: 1 GET на каждый визит
- Не используем ISR/SSG (все SSR)
- Upstash бесплатно 500K/мес, но можем оптимизировать

### Решение:
```typescript
// Использовать Next.js cache с revalidate
export const revalidate = 1800; // 30 minutes

// Или ISR с generateStaticParams
export async function generateStaticParams() {
  return []; // Force ISR
}
```

**Результат:** 1 fetch на 30 минут для всех пользователей, не на каждого.

---

## 🔴 ПРОБЛЕМА 2: Большой JSON без компрессии

### Текущий код:
```typescript
// lib/redis.ts
await redisClient.set(key, cacheData, { ex: ttlSeconds });
// cacheData = { items: [...50 articles with full content], timestamp, source }
```

### Размер (estimated):
```
50 статей × (
  title: ~100 chars
  excerpt: ~500 chars
  url: ~100 chars
  imageUrl: ~150 chars
  categories: ~50 chars
  publishedAt: ~30 chars
  sourceName: ~30 chars
  sourceId: ~20 chars
) = ~1KB per article × 50 = ~50KB per cache key

2 cache keys (homepage + news) = ~100KB
```

### Проблемы:
- ❌ No compression (Upstash charges by data transfer too)
- ❌ No versioning (can't rollback if bad data)
- ❌ Full payload каждый раз (даже если нужно только 8 items)

### Решение:
```typescript
// 1. Compress with zlib
import { gzip, gunzip } from 'zlib';
import { promisify } from 'util';

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

// 2. Version the cache
interface VersionedCache {
  version: string; // 'v1'
  data: CompressedData;
  compressed: true;
}

// 3. Store compressed
const json = JSON.stringify(cacheData);
const compressed = await gzipAsync(Buffer.from(json));
await redis.set(key, {
  version: 'v1',
  data: compressed.toString('base64'),
  compressed: true
});
```

**Результат:** ~70-80% reduction in size (50KB → ~10-15KB)

---

## 🔴 ПРОБЛЕМА 3: Токены в логах

### Найденные места:

**1. Cron endpoint (строка 68-71):**
```typescript
console.warn('❌ Unauthorized cron attempt:', {
  ip: request.headers.get('x-forwarded-for'),
  userAgent: request.headers.get('user-agent'),
  // ✅ НЕ логирует authHeader - хорошо!
});
```
**Status:** ✅ OK (токен НЕ логируется)

**2. Redis client init (lib/redis.ts):**
```typescript
// ✅ Token только в process.env, не логируется
token: process.env.UPSTASH_REDIS_REST_TOKEN,
```
**Status:** ✅ OK

**3. Vercel logs (автоматические):**
```bash
# Vercel может логировать:
# - Request headers (включая Authorization!)
# - Response bodies
# - Environment variables (в plaintext при деплое)
```
**Status:** ⚠️ RISK

### Проблема:
- Vercel logs могут содержать Authorization header
- Cron log файл (`/var/log/allhalal-cron.log`) содержит полный curl response

### Решение:
```bash
# 1. Hetzner cron: sanitize logs
*/30 * * * * curl -s -H "Authorization: Bearer $CRON_SECRET" \
  https://allhalal.info/api/cron/update-news \
  | jq -r 'del(.redis.token) | del(.authHeader)' \
  >> /var/log/allhalal-cron.log 2>&1

# 2. Add to cron endpoint response:
return NextResponse.json({
  success: true,
  // ... other fields
  // ❌ Don't return sensitive data
});
```

**Текущий response безопасен**, но добавить защиту на будущее.

---

## ✅ ЧТО ВЫ НЕ МОЖЕТЕ (для Cursor агента на Hetzner)

### Задача 1: Setup Upstash Redis
**Кто:** Вы (браузер)  
**Почему:** Cursor не имеет доступа к Upstash console  
**Действия:**
1. Зарегистрироваться на https://console.upstash.com
2. Create database (free tier)
3. Copy REST URL + Token
4. Add to Vercel env vars

---

### Задача 2: Configure Vercel Environment Variables
**Кто:** Вы (браузер)  
**Почему:** Cursor не имеет доступа к Vercel dashboard  
**Действия:**
1. Go to https://vercel.com/your-project/settings/environment-variables
2. Add 3 vars:
   - `CRON_SECRET` (generate: `openssl rand -hex 32`)
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Redeploy

---

## ✅ ЧТО CURSOR АГЕНТ МОЖЕТ (с доступом к Hetzner)

### Задача 3: Setup Hetzner Cron
**Кто:** Cursor агент  
**Команды:**
```bash
# 1. Проверить что curl установлен
which curl

# 2. Проверить что jq установлен (для sanitizing logs)
which jq || apt install -y jq

# 3. Создать cron job
crontab -l > /tmp/current_cron
echo "*/30 * * * * curl -s -H \"Authorization: Bearer \$CRON_SECRET\" https://allhalal.info/api/cron/update-news | jq -r 'del(.redis)' >> /var/log/allhalal-cron.log 2>&1" >> /tmp/current_cron
crontab /tmp/current_cron

# 4. Создать env file для cron
echo "CRON_SECRET=YOUR_SECRET_HERE" > /root/.allhalal_cron_env
chmod 600 /root/.allhalal_cron_env

# 5. Update cron to use env file
crontab -l > /tmp/current_cron
echo "*/30 * * * * . /root/.allhalal_cron_env && curl -s -H \"Authorization: Bearer \$CRON_SECRET\" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1" >> /tmp/current_cron
crontab /tmp/current_cron

# 6. Verify
crontab -l
```

---

### Задача 4: Setup Log Rotation
**Кто:** Cursor агент  
**Команды:**
```bash
# Create logrotate config
cat > /etc/logrotate.d/allhalal-cron <<EOF
/var/log/allhalal-cron.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 0640 root root
}
EOF

# Test
logrotate -d /etc/logrotate.d/allhalal-cron
```

---

### Задача 5: Install Monitoring (optional)
**Кто:** Cursor агент  
**Команды:**
```bash
# Simple health check script
cat > /root/check-allhalal-cron.sh <<'EOF'
#!/bin/bash
LAST_SUCCESS=$(grep "success.*true" /var/log/allhalal-cron.log | tail -1)
LAST_TIMESTAMP=$(echo "$LAST_SUCCESS" | jq -r '.timestamp' 2>/dev/null)

if [ -z "$LAST_TIMESTAMP" ]; then
    echo "ERROR: No successful cron runs found"
    exit 1
fi

# Check if last success was within 60 minutes
LAST_EPOCH=$(date -d "$LAST_TIMESTAMP" +%s 2>/dev/null || echo 0)
NOW_EPOCH=$(date +%s)
DIFF=$((NOW_EPOCH - LAST_EPOCH))

if [ $DIFF -gt 3600 ]; then
    echo "WARNING: Last successful run was $((DIFF/60)) minutes ago"
    exit 1
fi

echo "OK: Last successful run was $((DIFF/60)) minutes ago"
EOF

chmod +x /root/check-allhalal-cron.sh

# Add to cron for alerts (optional)
echo "0 * * * * /root/check-allhalal-cron.sh || echo 'AllHalal cron health check failed' | mail -s 'Alert' your@email.com" | crontab -
```

---

## 📝 МНЕ НУЖНО ОТ ВАС (чтобы продолжить)

### Option A: Информация для оптимизации
Если хотите, чтобы я оптимизировал код (Redis GET, compression, versioning):

**Дайте мне:**
1. ✅ Разрешение применить оптимизации
2. ⚠️ Хотите ISR или оставить SSR?
3. ⚠️ Нужна ли compression или размер ok?

### Option B: Готовы к setup
Если код готов, setup можно делать:

**Вы делаете:**
1. Upstash account → get credentials
2. Vercel env vars → add 3 variables
3. Сообщаете мне `CRON_SECRET` (я дам Cursor агенту)

**Cursor агент делает (после вашей команды):**
1. Setup Hetzner cron
2. Configure log rotation
3. Setup monitoring (optional)

---

## 🎯 РЕКОМЕНДАЦИЯ

### Минимально (чтобы работало сейчас):
1. **Вы:** Setup Upstash + Vercel env vars (15 min)
2. **Cursor агент:** Setup Hetzner cron (5 min)
3. **Тест:** Проверить что работает
4. **Move to:** Week 1 Day 3 (Content Audit)

### Оптимально (production-ready):
1. **Я:** Оптимизирую код (compression, ISR, versioning)
2. **Вы:** Setup Upstash + Vercel
3. **Cursor агент:** Setup Hetzner cron + monitoring
4. **Measure:** Real performance in production
5. **Iterate:** Based on measurements

---

## ❓ ЧТО ВЫБИРАЕТЕ?

**A.** Сначала setup как есть, оптимизация потом  
**B.** Сначала оптимизация кода, потом setup  
**C.** Что-то другое (напишите что)

**Или дайте конкретные команды для Cursor агента на Hetzner.**
