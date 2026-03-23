# Brief / news card images (frontend)

## Поведение загрузки

1. **Попытки** (для внешних `https`/`http`): same-origin **`/api/img/{base64url}`** → прямой URL → снова прокси **без query** → прямой URL без query. После исчерпания — `BriefImagePlaceholder` + `console.warn` в development.

2. **Прокси** уже на фронте (Next Route Handler); отдельный бэкенд-прокси не требуется. Ожидание: `GET /api/img/{token}` возвращает тело изображения с корректным `Content-Type`.

3. **Legacy поле** `imageUrl` (camelCase) подхватывается в `sanitizeBrief` наряду с `image_url`.

4. **`category_fallback`**: плейсхолдер только если нет валидного URL после санитизации; при валидном URL картинка показывается.

5. **ISR**: `BRIEFS_LIST_FETCH_REVALIDATE_SECONDS` = **300** для `/briefs/home` и `/briefs/feed` (экспорт в `lib/briefs.ts`).

6. **Одинаковые `image_url` подряд**: вариант `object-position` (`center` / `top` / `bottom` / `left`) через `consecutiveBriefImageCropVariant`.

## Проверка

- `curl` по `…/briefs/home` и `…/briefs/feed`, затем `/en` и `/en/news` в DevTools → Network: статусы 200 для `/api/img/…`.
- LCP: первые карточки с `priority` / `fetchPriority="high"` как раньше.
