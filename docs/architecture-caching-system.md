# Архитектура системы кэширования новостей

## 🔒 Критические исправления безопасности

### ❌ **ЧТО БЫЛО НЕПРАВИЛЬНО:**
```
Hetzner Redis → Открытый порт 6379 → Vercel
```
**Проблемы:**
- Direct TCP connection через интернет (небезопасно)
- Требует открытия порта в firewall
- Уязвимо к атакам (brute force, DDoS)
- @upstash/redis не поддерживает прямые TCP подключения безопасно

### ✅ **ЧТО ПРАВИЛЬНО:**
```
Hetzner Cron → HTTPS → Vercel API → HTTPS REST API → Upstash Redis
```
**Преимущества:**
- TLS encryption на всех этапах
- No direct TCP exposure
- Upstash REST API built for serverless
- Authentication через tokens

---

## 📊 Реальная архитектура

```
┌─────────────────────────────────────────┐
│ Hetzner Server (ваш существующий)      │
│                                         │
│ Cron Scheduler (встроенный в Linux)    │
│ └─ Запускается каждые 30 минут        │
│    └─ curl https://allhalal.info/...   │
│       с Authorization header            │
└─────────────────────────────────────────┘
          ↓ HTTPS Request
┌─────────────────────────────────────────┐
│ Vercel (serverless functions)          │
│                                         │
│ /api/cron/update-news                   │
│ ├─ Проверка CRON_SECRET               │
│ ├─ Парсинг 15 RSS feeds (8-15s)       │
│ └─ Сохранение в Redis                  │
└─────────────────────────────────────────┘
          ↓ HTTPS REST API
┌─────────────────────────────────────────┐
│ Upstash Redis (managed, secure)        │
│                                         │
│ REST API endpoint (не прямой TCP!)      │
│ ├─ TLS encryption                      │
│ ├─ Token authentication                │
│ └─ TTL: 30 minutes                     │
└─────────────────────────────────────────┘
          ↓ Read cache
┌─────────────────────────────────────────┐
│ Next.js Pages (/news, homepage)         │
│                                         │
│ getAggregatedNews()                     │
│ ├─ Try Upstash Redis first             │
│ └─ Fallback to memory if unavailable   │
└─────────────────────────────────────────┘
```

---

## ⚙️ Компоненты системы

### 1. **Hetzner Cron (Scheduler)**
**Назначение:** Триггерит обновление каждые 30 минут

**Почему Hetzner, а не Vercel Cron:**
```
Vercel Hobby Plan:
- Cron limit: 1 execution/day
- Cost to upgrade: $20/month

Hetzner (ваш сервер):
- Cron: unlimited (встроен в Linux)
- Cost: $0 (уже платите за сервер)
```

**Команда:**
```bash
*/30 * * * * curl -H "Authorization: Bearer SECRET" \
  https://allhalal.info/api/cron/update-news \
  >> /var/log/allhalal-cron.log 2>&1
```

---

### 2. **Vercel API Endpoint**
**Путь:** `/api/cron/update-news/route.ts`

**Что делает:**
1. Проверяет `Authorization: Bearer CRON_SECRET`
2. Вызывает `getAggregatedNews({ bypassCache: true })`
3. RSS parsing занимает 8-15 секунд
4. Сохраняет результаты в Redis
5. Возвращает JSON с результатами

**Ограничения:**
- `maxDuration: 60` (Vercel timeout)
- Нет retry logic (если упадет, ждет следующего cron)
- Работает только при правильном CRON_SECRET

---

### 3. **Upstash Redis**
**Тип:** Managed Redis с REST API

**Почему Upstash для Vercel:**
- ✅ REST API over HTTPS (secure by design)
- ✅ Работает с serverless из коробки
- ✅ Free tier: 500K commands/month (достаточно)
- ✅ No firewall configuration needed
- ✅ TLS encryption included

**Ваше использование (estimated):**
```
48 cron runs/день × 30 дней = 1,440 runs/мес
Each run: 1 SET + ~20 GET requests/день = ~1,000 commands/день
Total: ~30,000 commands/мес
Free tier: 500,000 commands/мес
Headroom: 16x ✅
```

**Альтернативы:**
- ✅ Self-hosted Hetzner Redis через SSH tunnel (secure, $0)
- ✅ Vercel KV (дороже, меньше free tier)
- ⚠️ Direct Hetzner Redis TCP from Vercel (insecure без VPN/tunnel)

---

### 4. **Fallback Chain**
```typescript
1. Try Upstash Redis (secure REST API)
   ↓ if fails
2. Use in-memory Map (no persistence)
```

**Нет Hetzner Redis в production по безопасности!**

---

## 📈 Реалистичные performance метрики

### ⚠️ **Estimates (not measured in production yet)**

**Текущая система (in-memory cache):**
- First request after deploy: 8-15 seconds (RSS parsing) - estimated
- Subsequent requests (cache hit): 50-200ms (memory read) - estimated
- After 30 minutes: cache expires, next user waits 8-15s

**С Redis cache (estimated):**
- First request after deploy: ~150-300ms (Redis REST API + SSR) - estimated
- Cache hit: ~150-300ms (depends on Vercel region, network) - estimated
- After 30 minutes: cache expires, BUT cron updates it before users

**Estimated latency breakdown:**
```
Redis REST API: 20-50ms (Upstash → Vercel) - estimated
Next.js SSR: 50-150ms (rendering) - estimated
Network (user → Vercel): 50-200ms (depends on region) - estimated
Total: 120-400ms (typically ~200ms) - estimated
```

**Expected improvement:**
- ✅ Should eliminate cold starts (8-15s)
- ✅ Should provide consistent latency
- ⚠️ Actual performance needs measurement

**⚠️ Measure in production to confirm these estimates.**

---

## 💰 Стоимость (фактическая)

| Компонент | Free Tier | Ваше использование | Достаточно? | Стоимость |
|-----------|-----------|---------------------|-------------|-----------|
| Hetzner Cron | Unlimited | 48/день | ✅ | $0 (уже оплачено) |
| Upstash Redis | 500K cmd/мес | ~30K/мес (estimated) | ✅ (16x запас) | $0 |
| Vercel Hobby | 100GB bandwidth | ~1GB/месяц | ✅ | $0 |
| **TOTAL** | - | - | - | **$0/месяц** |

**Расчет команд (estimated):**
```
48 cron runs/день × 30 дней = 1,440 runs/мес
Each run: 1 SET + ~20 GET requests/день = ~1,000 commands/день  
Total: ~30,000 commands/мес (estimated)
Free tier: 500,000 commands/мес
Headroom: 16x ✅
```

**Если превысите free tier Upstash:**
- Paid tier: $0.2 за 100K команд = ~$0.06/мес при 30K команд/мес

---

## 🔍 Мониторинг и отладка

### Проверить работу cron:
```bash
# На Hetzner сервере
tail -f /var/log/allhalal-cron.log

# Должны видеть каждые 30 минут:
{"success":true,"redis":{"connected":true,"source":"upstash"},...}
```

### Проверить Redis:
```bash
# Upstash Console
https://console.upstash.com

# Смотрим:
- Command count graph (должно быть ~2,500/день)
- Data usage (должно быть <5MB)
```

### Проверить Vercel logs:
```bash
# Vercel Dashboard → Logs
# Фильтр: /api/cron/update-news
# Ожидаем: 48 успешных запросов/день
```

### Замерить реальную latency:
```bash
# Chrome DevTools → Network
# Загрузить https://allhalal.info/en/news
# Смотрим: Document timing
# Обычно: 150-300ms (не 50-100ms как обещали!)
```

---

## ⚠️ Что исправлено

### 1. Безопасность
- ⚠️ Public direct TCP Redis from Vercel (insecure без VPN/tunnel)
- ✅ Upstash REST API (TLS encrypted, secure)
- ✅ Self-hosted Hetzner Redis через SSH tunnel (также secure)

### 2. Vercel Cron
- ❌ Vercel Hobby limit: 1/день (не 48/день!)
- ✅ Hetzner cron: unlimited

### 3. Performance claims
- ❌ All previous numbers were estimates, not measurements
- ✅ Now clearly marked as "estimated until measured"
- ⚠️ Measure in production to confirm

---

## 🎯 Выводы

**Что работает:**
- ✅ Cron на Hetzner (бесплатно, надежно)
- ✅ Upstash Redis (бесплатно, безопасно)
- ✅ Устраняет медленные cold starts
- ✅ $0/месяц

**Чего НЕ гарантируем:**
- ⚠️ Нет "99% faster" (не измеряли)
- ⚠️ Latency ~200ms (не 50ms)
- ⚠️ Зависит от Upstash/Vercel availability

**Security best practices:**
- ✅ No direct TCP Redis exposure
- ✅ TLS encryption everywhere
- ✅ Token authentication (CRON_SECRET)
- ✅ Principle of least privilege

---

## 📚 Дополнительные ресурсы

- [Upstash Redis Docs](https://docs.upstash.com/redis)
- [Vercel Cron Limits](https://vercel.com/docs/cron-jobs/usage-and-pricing)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
