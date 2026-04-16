# Sitemap Fix for Google Search Console

## Проблема
Google Search Console показывал "Couldn't fetch" для sitemap.xml из-за лишних Next.js App Router headers:
```
vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
```

Эти headers мешали GSC правильно кэшировать и читать sitemap.

## Решение
Переключились с динамического sitemap (`app/sitemap.ts`) на статический файл (`public/sitemap.xml`).

### Изменения:
1. ✅ Создан статический `public/sitemap.xml` (47KB, 96 статей)
2. ✅ Отключен динамический `app/sitemap.ts` → `app/sitemap.ts.backup`
3. ✅ Middleware уже правильно пропускает `/sitemap.xml`

### Преимущества статического sitemap:
- ✅ Нет лишних Next.js headers
- ✅ Простой HTTP 200 + XML response
- ✅ Vercel отдаёт как статический asset (быстрее)
- ✅ Google Search Console правильно читает

### Обновление sitemap:
Когда добавляются новые статьи, обновить вручную:
```bash
curl -s https://allhalal.info/sitemap.xml > public/sitemap.xml
git add public/sitemap.xml
git commit -m "update: sitemap with new articles"
git push
```

Или вернуть динамический sitemap:
```bash
mv app/sitemap.ts.backup app/sitemap.ts
rm public/sitemap.xml
```

## После деплоя:
1. Удалить старый sitemap в GSC
2. Отправить заново `https://allhalal.info/sitemap.xml`
3. Проверить через "Test live URL"
4. Ожидать индексацию ~2-7 дней

Дата: 16 апреля 2026
