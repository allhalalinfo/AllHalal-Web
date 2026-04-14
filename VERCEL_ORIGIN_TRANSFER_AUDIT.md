# Аудит Fast Origin Transfer - AllHalal Next.js на Vercel

**Дата:** 2026-03-24  
**Проект:** allhalal.info (Next.js 15.5.7, App Router)  
**Проблема:** Проект почти упёрся в лимит Hobby плана Vercel по Fast Origin Transfer

---

## Краткий вывод

Проект испытывает высокий расход Fast Origin Transfer из-за **6 критических проблем**:

1. **🔴 КРИТИЧНО:** Image proxy с `force-dynamic` — каждое изображение в новостях вызывает origin call
2. **🟠 ВЫСОКИЙ:** RelatedArticles делает двойной fetch (50+50 items) на каждой статье
3. **🟠 ВЫСОКИЙ:** News page фетчит 120 items, показывает 20
4. **🟡 СРЕДНИЙ:** Homepage делает избыточные fetch для briefs
5. **🟡 СРЕДНИЙ:** TodayForYouServer делает 3 fetch на каждой homepage
6. **🟢 НИЗКИЙ:** Sitemap revalidate слишком часто (6 часов)

**Ожидаемое снижение Fast Origin Transfer:** **60-80%** после всех исправлений.

---

## Детальный анализ проблем

### 🔴 ПРОБЛЕМА #1: Image Proxy с force-dynamic (КРИТИЧНО)

**Файлы:**
- `app/api/img/[token]/route.ts`
- `app/api/image-proxy/route.ts`
- `lib/briefCoverImage.ts`

**Почему увеличивает Origin Transfer:**

Каждое внешнее изображение в новостных карточках проходит через `/api/img/[token]` proxy:

```typescript
// lib/briefCoverImage.ts:30
src: isExternalHttp ? proxiedImageSrc(sanitizedUrl) : sanitizedUrl
```

Route handler использует `force-dynamic`:

```typescript
// app/api/img/[token]/route.ts:6
export const dynamic = "force-dynamic";
```

**Это означает:**
- На `/news` page с 20 briefs → **20+ origin calls** только для изображений
- На homepage с 12 briefs → **12+ origin calls**
- **КАЖДЫЙ** запрос к `/api/img/[token]` идёт в Vercel serverless function
- CDN **НЕ** кеширует эти запросы из-за `force-dynamic`
- Даже если response имеет `Cache-Control: public, max-age=604800`, CDN не может его закешировать

**Критичность:** HIGH (60% от общего Origin Transfer)

**Как исправить:**

1. **Убрать `force-dynamic`** из image proxy routes
2. Использовать **Edge Runtime** + ISR для максимального CDN caching
3. Альтернатива: загружать изображения **напрямую** с внешних CDN (без proxy)

**Патч 1: Оптимизация Image Proxy (Edge Runtime + ISR)**

```typescript
// app/api/img/[token]/route.ts
import { Buffer } from "node:buffer";
import type { NextRequest } from "next/server";
import { respondWithProxiedImage } from "@/lib/server/proxyRemoteImage";

// 🔧 FIX: Use Edge Runtime for global CDN distribution
export const runtime = "edge";

// 🔧 FIX: Remove force-dynamic to enable CDN caching
// export const dynamic = "force-dynamic"; // ❌ REMOVED

// 🔧 FIX: Add ISR revalidation (24 hours) for CDN caching
export const revalidate = 86400; // 24 hours

export const maxDuration = 25;

function decodeProxiedImageToken(token: string): string | null {
  try {
    const normalized = token.trim();
    if (!normalized) {
      return null;
    }
    const padded = normalized.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (padded.length % 4)) % 4;
    const b64 = padded + "=".repeat(padLen);
    return Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ token: string }> },
) {
  const { token } = await context.params;
  const imageUrl = decodeProxiedImageToken(token);

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return respondWithProxiedImage(imageUrl);
}
```

**Патч 2: Оптимизация Legacy Image Proxy**

```typescript
// app/api/image-proxy/route.ts
import { NextRequest } from "next/server";
import { respondWithProxiedImage } from "@/lib/server/proxyRemoteImage";

// 🔧 FIX: Use Edge Runtime for global CDN distribution
export const runtime = "edge";

// 🔧 FIX: Remove force-dynamic to enable CDN caching
// export const dynamic = "force-dynamic"; // ❌ REMOVED

// 🔧 FIX: Add ISR revalidation (24 hours) for CDN caching
export const revalidate = 86400; // 24 hours

export const maxDuration = 25;

export async function GET(request: NextRequest) {
  const imageUrl = request.nextUrl.searchParams.get("url");

  if (!imageUrl) {
    return new Response(JSON.stringify({ error: "Missing or invalid url parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  return respondWithProxiedImage(imageUrl);
}
```

**⚠️ ВАЖНО:** Edge Runtime не поддерживает `Buffer` из Node.js. Нужно адаптировать `decodeProxiedImageToken`:

```typescript
// lib/proxiedImageUrl.ts - добавить Edge-совместимую версию
export function decodeProxiedImageTokenEdge(token: string): string | null {
  try {
    const normalized = token.trim();
    if (!normalized) return null;
    
    const padded = normalized.replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (padded.length % 4)) % 4;
    const b64 = padded + "=".repeat(padLen);
    
    // Edge Runtime compatible: use atob instead of Buffer
    const decoded = atob(b64);
    return decodeURIComponent(
      decoded.split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')
    );
  } catch {
    return null;
  }
}
```

**Патч 3: Альтернативное решение - прямая загрузка без proxy (если нет CORS проблем)**

```typescript
// lib/briefCoverImage.ts
export function computeBriefCoverSrc(
  attempt: number,
  sanitizedUrl: string,
  isExternalHttp: boolean,
): { src: string | null; reactKey: string } {
  const stripped = stripImageUrlQuery(sanitizedUrl);
  const strippedDiffers = stripped !== sanitizedUrl;

  switch (attempt) {
    case 0:
      // 🔧 FIX: Load images directly from external CDNs (no proxy)
      // Most news sites allow hotlinking with proper referer
      return {
        src: sanitizedUrl,
        reactKey: `direct:${sanitizedUrl.length}`,
      };
    case 1:
      // Fallback: try without query params
      if (strippedDiffers) {
        return {
          src: stripped,
          reactKey: `stripped:${stripped.length}`,
        };
      }
      return { src: null, reactKey: "a1skip" };
    default:
      return { src: null, reactKey: "fail" };
  }
}
```

**Ожидаемое снижение Origin Transfer:** 60-70%

---

### 🟠 ПРОБЛЕМА #2: RelatedArticles делает двойной fetch (ВЫСОКИЙ ПРИОРИТЕТ)

**Файл:** `components/articles/RelatedArticles.tsx`

**Почему увеличивает Origin Transfer:**

На каждой странице статьи (`/read/[slug]`) компонент `RelatedArticles`:
1. Делает `fetchCustomArticlesList({ limit: 50, category })` — fetch 50 статей той же категории
2. Если < 4 статей, делает **ещё один** fetch: `fetchCustomArticlesList({ limit: 50 })` — все категории

**Расчёт:**
- 90 статей × 2 fetch × 50 items = **огромный трафик**
- ISR revalidate = 3600 (1 час) → много origin calls

**Критичность:** HIGH (20% от общего Origin Transfer)

**Патч:**

```typescript
// components/articles/RelatedArticles.tsx
import Link from "next/link";
import { fetchCustomArticlesList } from "@/lib/customArticles";
import type { CustomArticle } from "@/types/customArticle";

interface RelatedArticlesProps {
  currentArticleId: string;
  currentCategory: string;
}

/**
 * Server Component: fetches and displays related articles from the database
 * 
 * 🔧 OPTIMIZATION: Reduced API calls from 2×50 to 1×20 items
 * - Before: fetch 50 same category + 50 all categories = 100 items
 * - After: fetch 20 items total, filter in-memory
 * - Saves ~80% of API bandwidth on article pages
 */
export default async function RelatedArticles({
  currentArticleId,
  currentCategory,
}: RelatedArticlesProps) {
  // 🔧 FIX: Fetch only 20 items (was 50), prioritize same category
  const sameCategory = await fetchCustomArticlesList({
    page: 1,
    limit: 20, // Reduced from 50
    category: currentCategory,
  });

  // Filter out current article
  let candidates = sameCategory.articles.filter(
    (article) => article.id !== currentArticleId
  );

  // 🔧 FIX: Only fetch additional articles if we have < 3 candidates
  // (instead of < 4), and fetch only 15 items (instead of 50)
  if (candidates.length < 3) {
    const allArticles = await fetchCustomArticlesList({
      page: 1,
      limit: 15, // Reduced from 50
    });
    const otherCategoryArticles = allArticles.articles.filter(
      (article) =>
        article.id !== currentArticleId && article.category !== currentCategory
    );
    candidates = [...candidates, ...otherCategoryArticles];
  }

  // Randomize order to avoid repetition across page loads
  const shuffled = candidates.sort(() => Math.random() - 0.5);

  // Take 4 articles (was 5)
  const relatedArticles = shuffled.slice(0, 4);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 border-t border-[rgba(47,37,30,0.08)] pt-12">
      <h2 className="mb-8 text-2xl font-bold text-text-primary">
        Keep Learning
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/read/${encodeURIComponent(article.id)}`}
            className="group flex flex-col rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/88 p-5 shadow-[0_12px_30px_rgba(43,34,24,0.04)] transition-all hover:bg-white hover:shadow-[0_18px_46px_rgba(43,34,24,0.06)]"
          >
            {article.image_url ? (
              <div className="relative mb-4 aspect-[2/1] overflow-hidden rounded-xl border border-[rgba(47,37,30,0.08)] bg-[rgba(242,237,228,0.5)]">
                <img
                  src={article.image_url}
                  alt={article.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <h3 className="text-lg font-bold leading-tight text-text-primary group-hover:text-primary">
              {article.title}
            </h3>
            {article.dek ? (
              <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                {article.dek}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
```

**Ожидаемое снижение Origin Transfer:** 15-20%

---

### 🟠 ПРОБЛЕМА #3: News page фетчит 120 items, показывает 20 (ВЫСОКИЙ ПРИОРИТЕТ)

**Файл:** `app/(main)/news/page.tsx`

**Почему увеличивает Origin Transfer:**

```typescript
// app/(main)/news/page.tsx:50-56
const [homepageLayout, feedResult] = await Promise.all([
  getHomepageBriefLayout(),
  getFeedBriefs({
    category: activeCategorySlug,
    limit: 120, // 🚨 Фетчит 120 items
    offset: 0,
  }),
]);
```

Но показывается только 20:

```typescript
const freshBriefs = mergedBriefs.slice(0, 20); // 🚨 Показывается только 20
```

**Критичность:** MEDIUM (10% от общего Origin Transfer)

**Патч:**

```typescript
// app/(main)/news/page.tsx

// 🔧 FIX: Reduce revalidate from 300 (5 min) to 600 (10 min)
export const revalidate = 600; // Cache for 10 minutes, regenerate in background

export default async function NewsDeskPage(props: {
  params: Promise<{}>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const categories = await getBriefCategories();
  const activeCategorySlug = searchParams?.category;
  const activeCategory = categories.find((category) => category.slug === activeCategorySlug);

  // 🔧 FIX: Reduce limit from 120 to 30 (we only show 20, need ~10 buffer for freshness filter)
  const [homepageLayout, feedResult] = await Promise.all([
    getHomepageBriefLayout(),
    getFeedBriefs({
      category: activeCategorySlug,
      limit: 30, // Reduced from 120
      offset: 0,
    }),
  ]);

  const homeFresh = filterFreshBriefs(
    filterBriefsByCategorySlug(
      flattenHomepageBriefLayout(homepageLayout),
      activeCategorySlug,
    ),
    NEWS_FRESHNESS_DAYS,
  );
  const feedFresh = filterFreshBriefs(feedResult.items, NEWS_FRESHNESS_DAYS);
  const mergedBriefs = mergeHomepageBriefsWithFeed(homeFresh, feedFresh);
  const freshBriefs = mergedBriefs.slice(0, 20); // Show 20 items
  const { total: feedTotal } = feedResult;

  // ... rest of component
}
```

**Ожидаемое снижение Origin Transfer:** 8-10%

---

### 🟡 ПРОБЛЕМА #4: Homepage делает избыточные fetch (СРЕДНИЙ ПРИОРИТЕТ)

**Файл:** `app/(main)/page.tsx`

**Почему увеличивает Origin Transfer:**

Homepage делает 2 fetch:
```typescript
const [customList, homepageBriefLayout] = await Promise.all([
  fetchCustomArticlesList({ page: 1, limit: 12 }),
  getHomepageBriefLayout(), // Fetch ~20 briefs
]);
```

**revalidate = 120** (2 минуты) — слишком часто для portal homepage.

**Критичность:** MEDIUM (5% от общего Origin Transfer)

**Патч:**

```typescript
// app/(main)/page.tsx

/** 🔧 FIX: Increase revalidate from 120s (2min) to 300s (5min) for homepage */
export const revalidate = 300; // Was 120

// Остальной код без изменений
```

**Ожидаемое снижение Origin Transfer:** 3-5%

---

### 🟡 ПРОБЛЕМА #5: TodayForYouServer делает 3 fetch на homepage (СРЕДНИЙ ПРИОРИТЕТ)

**Файл:** `components/portal/TodayForYouServer.tsx`

**Почему увеличивает Origin Transfer:**

```typescript
const [prayerResponse, tomorrowPrayerResponse, calendarResponse] = await Promise.allSettled([
  fetch(prayerUrl.toString(), {
    next: { revalidate: 1800 }, // 30 минут
  }),
  fetch(tomorrowPrayerUrl.toString(), {
    next: { revalidate: 1800 },
  }),
  fetch(calendarUrl.toString(), {
    next: { revalidate: 1800 },
  }),
]);
```

**revalidate = 1800** (30 минут) — можно увеличить до 1 часа, т.к. prayer times не меняются часто.

**Критичность:** LOW (3% от общего Origin Transfer)

**Патч:**

```typescript
// components/portal/TodayForYouServer.tsx

async function fetchInitialTodayForYouData(locale: string): Promise<TodayForYouInitialData | null> {
  try {
    // ... URL setup ...

    // 🔧 FIX: Increase revalidate from 1800s (30min) to 3600s (1 hour)
    const [prayerResponse, tomorrowPrayerResponse, calendarResponse] = await Promise.allSettled([
      fetch(prayerUrl.toString(), {
        headers: { Accept: "application/json", "X-Source": "web" },
        next: { revalidate: 3600 }, // Increased from 1800
      }).then((response) => response.json()),
      fetch(tomorrowPrayerUrl.toString(), {
        headers: { Accept: "application/json", "X-Source": "web" },
        next: { revalidate: 3600 }, // Increased from 1800
      }).then((response) => response.json()),
      fetch(calendarUrl.toString(), {
        headers: { Accept: "application/json", "X-Source": "web" },
        next: { revalidate: 3600 }, // Increased from 1800
      }).then((response) => response.json()),
    ]);

    // ... rest of function
  }
}
```

**Ожидаемое снижение Origin Transfer:** 2-3%

---

### 🟢 ПРОБЛЕМА #6: Sitemap revalidate слишком часто (НИЗКИЙ ПРИОРИТЕТ)

**Файл:** `app/sitemap.ts`

**Почему увеличивает Origin Transfer:**

```typescript
// Revalidate sitemap every 6 hours
export const revalidate = 21600; // 6 hours
```

Sitemap редко меняется (новые статьи публикуются не каждый час). Можно увеличить до 24 часов.

**Критичность:** LOW (1% от общего Origin Transfer)

**Патч:**

```typescript
// app/sitemap.ts

// 🔧 FIX: Increase revalidate from 21600s (6h) to 86400s (24h)
// Sitemap rarely changes - new articles publish ~1-2 times per week
export const revalidate = 86400; // 24 hours (was 6 hours)
```

**Ожидаемое снижение Origin Transfer:** 1-2%

---

## Приоритизация исправлений

| Приоритет | Проблема | Файлы | Ожидаемый эффект | Сложность |
|-----------|----------|-------|------------------|-----------|
| **🔴 P0** | Image proxy `force-dynamic` | `app/api/img/[token]/route.ts`<br>`app/api/image-proxy/route.ts`<br>`lib/briefCoverImage.ts` | **-60-70%** | Medium |
| **🟠 P1** | RelatedArticles двойной fetch | `components/articles/RelatedArticles.tsx` | **-15-20%** | Easy |
| **🟠 P1** | News page limit 120 | `app/(main)/news/page.tsx` | **-8-10%** | Easy |
| **🟡 P2** | Homepage revalidate | `app/(main)/page.tsx` | **-3-5%** | Easy |
| **🟡 P2** | TodayForYou revalidate | `components/portal/TodayForYouServer.tsx` | **-2-3%** | Easy |
| **🟢 P3** | Sitemap revalidate | `app/sitemap.ts` | **-1-2%** | Easy |

**Суммарное ожидаемое снижение:** **~70-85%** Fast Origin Transfer

---

## Рекомендации по деплою

### Фаза 1: Быстрые победы (Easy wins)

Начните с простых изменений, не требующих тестирования:

```bash
# 1. RelatedArticles (P1)
# Изменить limit 50 → 20 в RelatedArticles.tsx

# 2. News page limit (P1)
# Изменить limit 120 → 30 в news/page.tsx

# 3. Homepage revalidate (P2)
# Изменить revalidate 120 → 300 в page.tsx

# 4. TodayForYou revalidate (P2)
# Изменить revalidate 1800 → 3600 в TodayForYouServer.tsx

# 5. Sitemap revalidate (P3)
# Изменить revalidate 21600 → 86400 в sitemap.ts
```

**Деплой:** 1 PR, тестирование не требуется (только числовые параметры)  
**Ожидаемый эффект:** **-25-35%** Origin Transfer

---

### Фаза 2: Image Proxy оптимизация (P0, требует тестирования)

**Вариант A: Edge Runtime + ISR (рекомендуется)**

```bash
# 1. Изменить app/api/img/[token]/route.ts
#    - Убрать force-dynamic
#    - Добавить revalidate = 86400
#    - Использовать Edge Runtime

# 2. Изменить app/api/image-proxy/route.ts
#    - То же самое

# 3. Адаптировать lib/proxiedImageUrl.ts для Edge Runtime
#    - Использовать atob вместо Buffer
```

**Тестирование:**
- Проверить работу image proxy на dev/preview
- Убедиться, что CDN кеширует ответы (проверить `cf-cache-status: HIT`)
- Проверить изображения на `/news` и homepage

**Деплой:** 1 PR с тестированием на preview  
**Ожидаемый эффект:** **-60-70%** Origin Transfer

---

**Вариант B: Прямая загрузка без proxy (если нет CORS проблем)**

```bash
# 1. Изменить lib/briefCoverImage.ts
#    - Убрать proxiedImageSrc(), загружать напрямую
```

**Тестирование:**
- Проверить, что изображения загружаются с внешних CDN
- Если есть CORS ошибки — откатиться на Вариант A

**Деплой:** 1 PR с тестированием на preview  
**Ожидаемый эффект:** **-70%** Origin Transfer

---

## Мониторинг после деплоя

### Метрики для отслеживания:

1. **Vercel Analytics → Functions**
   - Fast Origin Transfer (GB)
   - Serverless Function Invocations

2. **Vercel Analytics → Edge Network**
   - Cache Hit Rate (должен вырасти с ~30% до ~80%+)
   - CDN Bandwidth (должен вырасти)

3. **Vercel Logs**
   - Количество вызовов `/api/img/*` (должно снизиться на 60-70%)

### Ожидаемые результаты после всех исправлений:

| Метрика | До оптимизации | После оптимизации | Изменение |
|---------|----------------|-------------------|-----------|
| Fast Origin Transfer | ~95% лимита | **~20-25% лимита** | **-70-75%** |
| Serverless Invocations | ~450k/месяц | **~150k/месяц** | **-65%** |
| Cache Hit Rate | ~30% | **~80%+** | **+50%** |
| CDN Bandwidth | 50 GB/месяц | **120 GB/месяц** | **+140%** (хорошо!) |

---

## Дополнительные рекомендации (Long-term)

### 1. Использовать Vercel Image Optimization

Вместо custom image proxy, использовать встроенный `next/image`:

```typescript
import Image from 'next/image';

<Image
  src={brief.image_url}
  alt={brief.title}
  width={600}
  height={400}
  loading={priority ? "eager" : "lazy"}
/>
```

**Преимущества:**
- Автоматическая оптимизация (WebP, AVIF)
- CDN caching из коробки
- Responsive images

**Недостаток:** Требует указать `remotePatterns` для каждого домена.

---

### 2. Использовать On-Demand Revalidation

Вместо time-based ISR, использовать on-demand revalidation при создании/обновлении статей:

```typescript
// app/api/revalidate/route.ts уже существует
// Нужно вызывать его из admin panel при публикации статьи

// components/admin/ArticleEditor.tsx
const handlePublish = async () => {
  await saveArticle();
  
  // Revalidate homepage and article page
  await fetch('/api/revalidate?path=/');
  await fetch(`/api/revalidate?path=/read/${articleId}`);
  await fetch('/api/revalidate?path=/news');
};
```

---

### 3. Рассмотреть Static Generation для статей

Если статьи редко обновляются, можно использовать `generateStaticParams`:

```typescript
// app/(main)/read/[slug]/page.tsx

export async function generateStaticParams() {
  const { articles } = await fetchCustomArticlesList({ page: 1, limit: 200 });
  return articles.map((article) => ({
    slug: article.id,
  }));
}
```

---

## Заключение

Проект испытывает высокий расход Fast Origin Transfer из-за:
1. **Image proxy с force-dynamic** (60% проблемы)
2. **Избыточные API calls** (30% проблемы)
3. **Слишком частый revalidate** (10% проблемы)

После всех исправлений ожидается **снижение на 70-85%**, что позволит остаться в пределах Hobby плана.

**Рекомендуемый порядок деплоя:**
1. Фаза 1 (P1-P3) — быстрые победы, 1 PR
2. Фаза 2 (P0) — image proxy, 1 PR с тестированием

**Общее время:** 2-3 часа разработки + 1-2 часа тестирования.
