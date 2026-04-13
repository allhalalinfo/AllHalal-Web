# Frontend/Technical SEO Audit Report
**Date:** 2026-04-14  
**Site:** allhalal.info  
**Focus:** Article pages (`/read/[slug]`) indexing issues

---

## 🔍 Executive Summary

**Status:** 🔴 CRITICAL SEO ISSUES FOUND

Проверено ~90+ статей на allhalal.info. Обнаружено **5 критических проблем**, которые блокируют или серьезно замедляют индексацию Google:

1. ❌ **Дублирующиеся H1 теги** в server-side HTML (блокирует индексацию)
2. ❌ **Неполный sitemap** - только 60 из 90+ статей (Google не знает о остальных)
3. ❌ **Слабая внутренняя перелинковка** - статьи изолированы от основного сайта
4. ⚠️ Client-side очистка контента (Google видит "грязный" HTML)
5. ✅ Metadata правильная (title, description, canonical, JSON-LD)

---

## 1. ❌ КРИТИЧНО: Дублирующиеся H1 теги

### Что найдено:
Каждая страница статьи содержит **ДВА H1 тега** в server-side HTML:

```html
<!-- Правильный H1 в <header> -->
<h1 class="font-display...">What Does "Suitable for Vegetarians" Really Mean?</h1>

<!-- ДУБЛЬ: H1 в контенте от Swift AI -->
<div class="prose-custom">
  <h1>What Does "Suitable for Vegetarians" Really Mean?</h1>
  <p>Content here...</p>
</div>
```

**Проверено на:**
- `https://allhalal.info/read/what-does-suitable-for-vegetarians-really-mean`
- `https://allhalal.info/read/are-mushroom-supplements-halal`

### Почему это критично для индексации:
1. **HTML semantic violation** - страница должна иметь ОДИН H1
2. **Google quality signal** - два H1 = сигнал о low-quality или spam
3. **Client-side cleaners не работают для Google** - компоненты `DuplicateTitleCleaner` и `ArticleH1Converter` запускаются ПОСЛЕ того, как Google бот прочитал HTML

### Технические детали:
**Файлы с проблемой:**
- `app/(main)/read/[slug]/page.tsx` - рендерит контент через `dangerouslySetInnerHTML`
- `components/articles/DuplicateTitleCleaner.tsx` - `"use client"` (слишком поздно)
- `components/articles/ArticleH1Converter.tsx` - `"use client"` (слишком поздно)

**Корневая причина:**
Swift AI агент добавляет H1 в начало article content → content санитизируется → но H1 НЕ удаляется на сервере → Google видит два H1.

### ✅ ИСПРАВЛЕНО:
**Файл:** `/lib/sanitizeArticleHtml.ts`

```typescript
export function sanitizeArticleHtml(html: string): string {
  if (!html?.trim()) {
    return "";
  }
  
  let cleaned = sanitizeHtml(html, OPTIONS);
  
  // CRITICAL SEO FIX: Remove H1 tags from article content on the server
  // Convert all H1 to H2 in article content on the server.
  cleaned = cleaned.replace(/<h1(\s[^>]*)?>/gi, '<h2$1>').replace(/<\/h1>/gi, '</h2>');
  
  return cleaned;
}
```

**Результат:** Все H1 в контенте автоматически конвертируются в H2 на сервере. Google видит только ОДИН H1 (заголовок страницы).

---

## 2. ❌ КРИТИЧНО: Неполный sitemap

### Что найдено:
- **В sitemap:** только 60 статей
- **На самом деле:** 90+ статей
- **Не индексированы:** ~30 статей отсутствуют в sitemap.xml

**Проверка:**
```bash
curl -s "https://allhalal.info/sitemap.xml" | grep -c "<loc>https://allhalal.info/read/"
# Результат: 60
```

### Почему это критично:
- Google **НЕ ЗНАЕТ** о существовании 30+ статей
- Статьи не появятся в поиске, даже если они идеально оптимизированы
- Прямая причина низкой индексации

### Технические детали:
**Файл:** `lib/customArticles.ts`

```typescript
// ПРОБЛЕМА: жесткий лимит 60
const limit = Math.min(60, Math.max(1, options.limit ?? 20));
```

**Файл:** `app/sitemap.ts`

```typescript
// Запрашивает 100, но получает только 60
fetchCustomArticlesList({ page: 1, limit: 100 })
```

### ✅ ИСПРАВЛЕНО:
**Файлы:**
1. `lib/customArticles.ts` (2 места):
   ```typescript
   const limit = Math.min(200, Math.max(1, options.limit ?? 20));
   const limit = Math.min(200, Math.max(1, options.limit ?? 60));
   ```

2. `app/sitemap.ts`:
   ```typescript
   fetchCustomArticlesList({ page: 1, limit: 200 })
   ```

**Результат:** Sitemap теперь включает до 200 статей (вместо 60).

---

## 3. ❌ КРИТИЧНО: Слабая внутренняя перелинковка

### Что найдено:
**Ссылки на `/read/*` статьи:**
- **`/news` page:** 0 ссылок ❌
- **Homepage (`/`):** 1 ссылка ⚠️
- **`/learn` (blog) page:** 1 ссылка ⚠️

**Проверка:**
```bash
curl -s "https://allhalal.info/news" | grep -E "href=\"/read/" | wc -l
# Результат: 0

curl -s "https://allhalal.info" | grep -E "href=\"/read/" | wc -l
# Результат: 1
```

### Почему это критично:
1. **Google discovery crawls** через внутренние ссылки
2. **Orphaned pages** (изолированные страницы) индексируются хуже
3. Даже если статья в sitemap, отсутствие internal links снижает её priority для Google

### Рекомендация:
**⚠️ НЕ ИСПРАВЛЕНО (ТРЕБУЕТ РЕШЕНИЯ ПОЛЬЗОВАТЕЛЯ):**

Нужно определить, где именно отображать custom articles:
- Добавить секцию "Featured Articles" на `/news` page?
- Создать отдельную страницу `/blog` или `/articles`?
- Добавить больше ссылок на homepage?

**Временное решение:**
Текущая секция "Keep learning" на каждой странице статьи создает некоторую перелинковку между статьями, но это недостаточно для discovery.

---

## 4. ⚠️ СРЕДНЕ: Client-side очистка контента

### Что найдено:
Все content-cleaner компоненты работают **client-side**:
- `DuplicateTitleCleaner.tsx` - `"use client"`
- `ArticleH1Converter.tsx` - `"use client"`
- `FinalThoughtCleaner.tsx` - `"use client"`
- `KeepLearningCleaner.tsx` - `"use client"`

### Почему это проблема:
Google бот видит **исходный server-side HTML** до того, как JavaScript выполнится:
- С дублями H1 (теперь исправлено на сервере)
- С секцией "Final thought" (если она есть)
- С старыми "Keep learning" секциями

### Рекомендация:
**Частично исправлено:** H1 теперь конвертируется на сервере.

**Оставшиеся client-side cleaners:**
- Нужно обновить `docs/SWIFT_AGENT_ARTICLE_WRITING_GUIDE.md` чтобы агент НЕ создавал проблемные секции
- Или переместить логику очистки на сервер (в `sanitizeArticleHtml.ts`)

---

## 5. ✅ ХОРОШО: Metadata правильная

### Проверено на всех статьях:
- ✅ `<title>` уникальный для каждой статьи
- ✅ `<meta name="description">` присутствует и уникальный
- ✅ `<link rel="canonical">` правильный, без www
- ✅ `<meta name="robots" content="index, follow"/>` правильно
- ✅ OpenGraph tags заполнены (og:title, og:description, og:url, og:image, og:type)
- ✅ Twitter Card tags заполнены
- ✅ JSON-LD structured data (Article schema) присутствует
- ✅ **Контент есть в server-side HTML** (Google может прочитать)

**Пример metadata:**
```html
<title>What Does "Suitable for Vegetarians" Really Mean? | allhalal.info</title>
<meta name="description" content="A practical guide to what "suitable for vegetarians"...">
<link rel="canonical" href="https://allhalal.info/read/what-does-suitable-for-vegetarians-really-mean">
<meta name="robots" content="index, follow">
```

---

## 📋 Checklist: Что исправлено

### ✅ Исправлено сразу:
- [x] **H1 дубли** - конвертируются в H2 на сервере (`lib/sanitizeArticleHtml.ts`)
- [x] **Sitemap limit** - увеличен с 60 до 200 статей (`lib/customArticles.ts`, `app/sitemap.ts`)

### ⏳ Требует действий пользователя:
- [ ] **Внутренняя перелинковка** - решить, где показывать custom articles
- [ ] **Deployment** - задеплоить исправления на Vercel
- [ ] **Google Search Console** - переподать sitemap после деплоя
- [ ] **Обновить Swift Agent guide** - запретить создание H1 в контенте

---

## 🚀 Что делать дальше

### 1. Задеплоить исправления
```bash
git add .
git commit -m "SEO critical fixes: remove duplicate H1, increase sitemap limit"
git push
```

### 2. Проверить после деплоя
```bash
# Проверить, что H1 больше не дублируется
curl -s "https://allhalal.info/read/are-mushroom-supplements-halal" | grep -E "<h1"

# Должен быть ТОЛЬКО ОДИН H1 в <header>

# Проверить sitemap
curl -s "https://allhalal.info/sitemap.xml" | grep -c "<loc>https://allhalal.info/read/"
# Должно быть 90+ (вместо 60)
```

### 3. Google Search Console
1. **Sitemap:** "Sitemaps" → Remove old sitemap → Add new sitemap URL: `https://allhalal.info/sitemap.xml`
2. **URL Inspection:** Проверить 2-3 статьи вручную, нажать "Request Indexing"
3. **Timeline:** Google переиндексирует sitemap за 1-7 дней

### 4. Решить вопрос перелинковки
**Варианты:**
- **Вариант A:** Добавить секцию "Our Articles" на `/news` page (показывать 6-10 последних статей)
- **Вариант B:** Создать отдельную страницу `/articles` или `/guides` для custom articles
- **Вариант C:** Увеличить количество ссылок на homepage (показывать 3-5 статей вместо 1)

---

## 📊 Ожидаемый результат

### После исправлений:
1. **Через 1-3 дня:** Google переобработает существующие страницы, увидит ОДИН H1
2. **Через 3-7 дней:** Google прочитает новый sitemap, обнаружит 30+ новых статей
3. **Через 1-2 недели:** Начнётся индексация ранее невидимых статей
4. **Через 2-4 недели:** Статьи начнут появляться в результатах поиска

### Метрики для отслеживания в GSC:
- **Coverage Report:** "Valid" pages должно вырасти с 60 до 90+
- **Sitemaps Report:** "Discovered" URLs должно увеличиться
- **Performance:** Impressions и clicks должны постепенно расти

---

## 🔗 Полезные ссылки

**Документация:**
- Google Search Console: https://search.google.com/search-console
- Sitemap Protocol: https://www.sitemaps.org/protocol.html
- HTML semantics: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements

**Внутренние файлы:**
- `docs/AUTO_INDEXING_SETUP.md` - настройка IndexNow API
- `docs/SWIFT_AGENT_ARTICLE_WRITING_GUIDE.md` - гайд для AI агента
- `docs/GSC_VALIDATION_ISSUES_APRIL_2026.md` - история GSC проблем

---

## ⚠️ Важные замечания

1. **H1 fix критичен** - без него индексация будет продолжаться медленно
2. **Sitemap fix критичен** - 30+ статей сейчас НЕВИДИМЫ для Google
3. **Internal linking желателен** - но не критичен если sitemap работает
4. **Деплой обязателен** - исправления сделаны в коде, но не на продакшене

---

**Конец отчёта**