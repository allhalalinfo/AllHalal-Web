# ☁️ Cloudflare CDN Integration (Опционально)

Добавление Cloudflare CDN для глобального кеширования и защиты DDoS.

## 🎯 Зачем нужен Cloudflare?

После переноса на Hetzner вы теряете глобальный CDN от Vercel. Cloudflare поможет:

- ✅ **Глобальный CDN** - кеширование контента по всему миру
- ✅ **DDoS защита** - автоматическая защита от атак
- ✅ **SSL сертификаты** - автоматические и бесплатные
- ✅ **Скорость** - ускорение загрузки сайта в 2-3 раза
- ✅ **Бесплатно** - Free план более чем достаточен

## 🚀 Настройка за 5 минут

### 1. Регистрация в Cloudflare

1. Перейдите на [cloudflare.com](https://www.cloudflare.com/)
2. Создайте аккаунт
3. Нажмите "Add a Site"
4. Введите `allhalal.info`
5. Выберите **Free план**

### 2. Обновление DNS записей

Cloudflare автоматически импортирует ваши текущие DNS записи. Проверьте:

```
A       allhalal.info       YOUR_HETZNER_IP     Proxied (оранжевое облако)
A       www                 YOUR_HETZNER_IP     Proxied (оранжевое облако)
CNAME   api                 allhalal.info       DNS only (серое облако)
```

**Важно**:
- Основной домен (`allhalal.info`) - **Proxied** 🟠
- API субдомен (`api.allhalal.info`) - **DNS only** ⚪ (чтобы не было лишнего кеширования API)

### 3. Обновление Nameservers

Cloudflare даст вам новые nameservers:

```
ns1.cloudflare.com
ns2.cloudflare.com
```

Обновите их у вашего регистратора домена (где покупали домен).

### 4. Настройка SSL/TLS

В Cloudflare панели:

1. Перейдите в **SSL/TLS**
2. Выберите режим: **Full (strict)**
3. Включите:
   - Always Use HTTPS ✅
   - Automatic HTTPS Rewrites ✅
   - Opportunistic Encryption ✅

### 5. Настройка Page Rules (опционально)

Создайте правила для оптимизации:

#### Rule 1: Кеширование статики

```
URL: *allhalal.info/_next/static/*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 year
- Browser Cache TTL: 1 year
```

#### Rule 2: Не кешировать API

```
URL: *allhalal.info/api/*
Settings:
- Cache Level: Bypass
```

#### Rule 3: Кеширование страниц

```
URL: *allhalal.info/*
Settings:
- Cache Level: Standard
- Edge Cache TTL: 2 hours
- Browser Cache TTL: 4 hours
```

### 6. Настройка Speed оптимизаций

В разделе **Speed**:

- ✅ Auto Minify (JavaScript, CSS, HTML)
- ✅ Brotli Compression
- ✅ Early Hints
- ✅ HTTP/2 to Origin
- ✅ HTTP/3 (QUIC)

### 7. Настройка Security

В разделе **Security**:

- Security Level: **Medium**
- Challenge Passage: **30 minutes**
- Browser Integrity Check: **On**
- ✅ Hotlink Protection

### 8. Firewall Rules (опционально)

Создайте правила для защиты админки:

```
Rule: Block Admin Access from Foreign Countries
Expression: (http.request.uri.path contains "/admin" and ip.geoip.country ne "RU")
Action: Block
```

## 🔧 Обновление конфигурации NGINX

Cloudflare будет проксировать весь трафик. Обновите NGINX для получения реальных IP:

```nginx
# Добавьте в nginx/conf.d/allhalal.conf в секцию http

# Cloudflare IP ranges
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;

real_ip_header CF-Connecting-IP;
```

Перезапустите NGINX:

```bash
docker compose restart nginx
```

## ✅ Проверка работы

### 1. Проверка DNS

```bash
dig allhalal.info

# Должны увидеть Cloudflare IP (не ваш Hetzner IP)
```

### 2. Проверка в браузере

Откройте Developer Tools (F12) → Network → Headers:

```
cf-cache-status: HIT  # Контент из кеша Cloudflare
cf-ray: ...           # ID запроса в Cloudflare
```

### 3. Проверка скорости

Используйте:
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)

## 📊 Мониторинг в Cloudflare

В панели Cloudflare вы увидите:

- **Analytics**: посещаемость, bandwidth, кеш hit rate
- **Security**: заблокированные угрозы
- **Speed**: время отклика
- **Traffic**: география посетителей

## 🔄 Purge кеша

### Полная очистка

```bash
# Через Cloudflare API
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Очистка конкретного URL

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"files":["https://allhalal.info/"]}'
```

### Через панель управления

1. Перейдите в **Caching**
2. Нажмите **Purge Cache**
3. Выберите нужный вариант

## 🎨 Дополнительные настройки

### Автоматическая оптимизация изображений

В разделе **Speed** → **Optimization**:

- ✅ Polish (Lossless)
- ✅ WebP
- ✅ Mirage (lazy loading)

### Workers (продвинутое)

Можно написать Cloudflare Worker для:
- A/B тестирования
- Редиректов
- Кастомной логики кеширования
- Персонализации контента

Пример Worker для редиректа www → без www:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  if (url.hostname === 'www.allhalal.info') {
    url.hostname = 'allhalal.info'
    return Response.redirect(url.toString(), 301)
  }
  
  return fetch(request)
}
```

## 💰 Стоимость

- **Free план**: $0/мес - более чем достаточно для вашего сайта
- **Pro план**: $20/мес - для расширенной аналитики
- **Business план**: $200/мес - для корпоративных нужд

## ⚡ Ожидаемое улучшение производительности

После включения Cloudflare:

| Метрика | Было (Hetzner только) | Стало (Hetzner + CF) | Улучшение |
|---------|----------------------|---------------------|-----------|
| TTFB | 200-400ms | 50-100ms | 2-4x |
| Load time | 2-3s | 1-1.5s | 2x |
| Bandwidth | 100% | 60-70% | 30-40% |

## 📝 Примечания

1. **DNS пропагация**: может занять до 24 часов
2. **SSL сертификаты**: Cloudflare автоматически выдаст свои сертификаты
3. **Кеширование**: первый запрос будет медленнее (cache miss), последующие - быстрее
4. **API**: не проксируйте API через Cloudflare (используйте DNS only)

## 🆘 Troubleshooting

### ERR_TOO_MANY_REDIRECTS

Проверьте SSL/TLS режим: должен быть **Full (strict)**, не **Flexible**.

### 522 Connection timed out

Cloudflare не может подключиться к вашему серверу:
- Проверьте, что NGINX работает
- Проверьте firewall (разрешены порты 80, 443)
- Проверьте, что домен резолвится в правильный IP

### Кеш не работает

- Проверьте Page Rules
- Проверьте CF-Cache-Status в headers
- Убедитесь, что оранжевое облако включено

---

**Итого**: Cloudflare + Hetzner = производительность как у Vercel, но с полным контролем! 🚀
