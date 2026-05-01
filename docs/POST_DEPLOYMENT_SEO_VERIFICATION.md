# Post-Deployment SEO Verification Checklist

Выполнить после деплоя GSC SEO fixes на production (Hetzner).

---

## 1️⃣ НЕМЕДЛЕННАЯ ПРОВЕРКА (в течение 5 минут после деплоя)

### A. FAQ Schema Validation

Проверить наличие FAQPage schema на production:

```bash
# Выбрать 3-5 случайных is-it-halal страниц
curl -s https://allhalal.info/is-it-halal/is-nutella-halal | grep -A 30 '"@type":"FAQPage"'
curl -s https://allhalal.info/is-it-halal/is-doritos-halal | grep -A 30 '"@type":"FAQPage"'
curl -s https://allhalal.info/is-it-halal/is-mcdonalds-halal | grep -A 30 '"@type":"FAQPage"'
```

**Ожидаемый результат:**
- JSON-LD блок с `"@type":"FAQPage"`
- Массив `mainEntity` с 3 вопросами
- Все вопросы содержат `@type: "Question"` и `acceptedAnswer`

**Если НЕ найдено:**
- Проверить что build прошёл успешно
- Проверить что код был запушен в main branch
- Проверить логи Next.js на Hetzner

---

### B. Breadcrumbs Schema Validation

```bash
curl -s https://allhalal.info/is-it-halal/is-nutella-halal | grep -A 20 '"@type":"BreadcrumbList"'
curl -s https://allhalal.info/read/is-ashwagandha-halal | grep -A 20 '"@type":"BreadcrumbList"'
```

**Ожидаемый результат:**
- JSON-LD блок с `"@type":"BreadcrumbList"`
- `itemListElement` с позициями 1, 2, 3
- Все item URL начинаются с `https://allhalal.info`

---

### C. Article Schema Enhancement

```bash
curl -s https://allhalal.info/read/is-ashwagandha-halal | grep -A 40 '"@type":"BlogPosting"'
```

**Ожидаемый результат:**
- `@type: "BlogPosting"` (НЕ "Article")
- Поля: `image`, `publisher.logo`, `articleSection`, `wordCount`, `inLanguage`

---

### D. Sitemap Health

```bash
# Убедиться что нет заблокированных URL
curl -s https://allhalal.info/sitemap.xml | grep -o '<loc>[^<]*</loc>' | grep -E '/(en|ar|nl|de|fr|es|it|ru|blog)/'
```

**Ожидаемый результат:** Пустой вывод (нет конфликтов)

---

## 2️⃣ GOOGLE RICH RESULTS TEST (в течение 1 часа)

Протестировать 5-10 страниц вручную:

### is-it-halal страницы (FAQ Schema):
1. https://search.google.com/test/rich-results?url=https://allhalal.info/is-it-halal/is-nutella-halal
2. https://search.google.com/test/rich-results?url=https://allhalal.info/is-it-halal/is-doritos-halal
3. https://search.google.com/test/rich-results?url=https://allhalal.info/is-it-halal/is-mcdonalds-halal

**Проверить:**
- ✅ "Valid items detected" для FAQPage
- ✅ 3 вопроса отображаются
- ❌ Нет ошибок или предупреждений

### /read/ страницы (Article + Breadcrumbs):
1. https://search.google.com/test/rich-results?url=https://allhalal.info/read/is-ashwagandha-halal
2. https://search.google.com/test/rich-results?url=https://allhalal.info/read/[другая-статья]

**Проверить:**
- ✅ BlogPosting detected
- ✅ BreadcrumbList detected
- ✅ Все поля заполнены

---

## 3️⃣ GOOGLE SEARCH CONSOLE ACTIONS (в течение 24 часов)

### A. Resubmit Sitemap

1. GSC → Sitemaps
2. Кликнуть на `https://allhalal.info/sitemap.xml`
3. Если статус "Couldn't fetch" → **Resubmit**
4. Если статус "Success" → ничего не делать

**Ожидаемый результат:**
- Статус меняется на "Pending" → "Success" в течение 24-48 часов
- Discovered URLs: ~154

---

### B. Request Removal для битого URL

1. GSC → Removals
2. New Request
3. URL: `https://allhalal.info/&`
4. Temporary removal
5. Submit

**Примечание:** URL уже возвращает 404, но Request Removal ускоряет удаление из индекса.

---

### C. Request Indexing (выборочно)

Request re-indexing для 10-15 ключевых страниц:

**Приоритет 1 (5-7 страниц):**
- `/is-it-halal` (main hub)
- `/is-it-halal/is-nutella-halal`
- `/is-it-halal/is-doritos-halal`
- `/is-it-halal/is-mcdonalds-halal`
- `/news`
- `/finance`
- `/read/[топ-статья]`

**Как:**
1. GSC → URL Inspection
2. Вставить URL
3. Click "Request Indexing"
4. Подождать 2-3 дня

**НЕ** request indexing для всех страниц сразу - Google может расценить как spam.

---

## 4️⃣ MONITORING (7-14 дней)

### A. GSC Enhancements - FAQ

**Где:** GSC → Enhancements → FAQ

**Проверить:**
- Valid items: 0 → **130+** (количество is-it-halal страниц)
- Errors: 0
- Warnings: допустимы, но желательно 0

**Если Valid items = 0 через 7 дней:**
- Перепроверить Rich Results Test
- Проверить что Googlebot может crawl страницы (GSC → URL Inspection)
- Проверить что FAQ schema корректна в production HTML

---

### B. GSC Enhancements - Breadcrumbs

**Где:** GSC → Enhancements → Breadcrumbs

**Проверить:**
- Valid items: 1 → **150+**
- Errors: 0

---

### C. GSC Enhancements - Article

**Где:** GSC → Enhancements → Article

**Проверить:**
- Valid items: **~96** (все /read/ страницы)
- Type: BlogPosting (НЕ Article)

---

### D. GSC Performance - CTR

**Где:** GSC → Performance → Search Results

**Фильтр:** Queries содержащие "is [food] halal"

**Проверить:**
- Появление "FAQ" badge в SERP (через 7-14 дней)
- CTR increase: ожидается **+15-25%** для queries с FAQ rich snippets

---

### E. GSC Index Coverage

**Где:** GSC → Index → Coverage

**Проверить:**
- Excluded: уменьшение за счёт удаления `/en/*` paths
- Errors: 0 (или близко к 0)
- Valid: ~154 indexed pages

---

## 5️⃣ TROUBLESHOOTING

### FAQ Schema не появляется в GSC через 7 дней:

1. **Проверить production HTML:**
   ```bash
   curl -s https://allhalal.info/is-it-halal/is-nutella-halal | grep FAQPage
   ```

2. **Google Rich Results Test:**
   - Если валиден → ждать ещё 7 дней
   - Если ошибки → исправить и request indexing

3. **Проверить Googlebot access:**
   - GSC → URL Inspection → View crawled page
   - Убедиться что HTML содержит FAQ schema

---

### Breadcrumbs не появляются:

1. **Проверить что BreadcrumbsSchema компонент импортирован:**
   ```bash
   grep -r "BreadcrumbsSchema" app/
   ```

2. **Проверить production HTML:**
   ```bash
   curl -s https://allhalal.info/is-it-halal | grep BreadcrumbList
   ```

---

### Sitemap статус "Couldn't fetch" через 48 часов:

1. **Проверить Caddy logs на запросы от Googlebot:**
   ```bash
   # На Hetzner сервере
   tail -f /var/log/caddy/access.log | grep -i googlebot
   ```

2. **Проверить что sitemap.xml доступен:**
   ```bash
   curl -I https://allhalal.info/sitemap.xml
   # Expected: HTTP 200, Content-Type: application/xml
   ```

3. **Проверить размер sitemap:**
   ```bash
   curl -s https://allhalal.info/sitemap.xml | wc -c
   # Should be < 50MB (обычно ~50-100KB)
   ```

---

## ✅ SUCCESS CRITERIA

Через 14-21 день после деплоя:

- ✅ FAQ items в GSC: **130+**
- ✅ Breadcrumbs в GSC: **150+**
- ✅ BlogPosting items в GSC: **96+**
- ✅ Sitemap status: **Success**
- ✅ CTR increase для "is X halal" queries: **+15-25%**
- ✅ Нет errors в GSC Index Coverage

---

## 📊 DASHBOARD

Создать в GSC Custom Dashboard с метриками:
- FAQ valid items (target: 130+)
- Breadcrumbs valid items (target: 150+)
- CTR для "is * halal" queries
- Impressions с rich snippets

**Проверять:** 1 раз в неделю в течение первого месяца
