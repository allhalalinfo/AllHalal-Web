# Web: RSS curation & categories (January 2026)

Краткая выжимка для фронта; полный текст промпта см. в истории задач / у команды бэкенда.

## Backend → фронт

| Поле | Назначение |
|------|------------|
| **`category`** | Отображаемая legacy-категория (`Faith & Practice`, …) — **основа для UI**, фильтров, `CategoryBadge`, плейсхолдеров. |
| **`categories`** | Массив из Redis: часто **слаги** (`islam`, `family`, `finance`, …), иногда смесь со старыми строками до протухания кеша. |

Правило балансировки при двух слагах (второй приоритетнее для отображения) реализовано на бэкенде в `category_from_rss_item()`; на вебе **`normalizeBriefDisplayCategory()`** в `lib/briefs.ts` дублирует запасной путь для смешанного `categories[]`.

## Реализация на Allhalal-Web

- `types/brief.ts`: опциональное поле `categories?: string[]`.
- `lib/briefs.ts`: `THEMATIC_SLUG_TO_BRIEF_CATEGORY`, `normalizeBriefDisplayCategory()`, вызов из **`sanitizeBrief()`** (все ответы `/briefs/*` проходят через нормализацию).
- Fallback RSS (`mapNewsItemToBrief`, счётчики категорий) и **`NewsHubClient`**: не используют слепо `categories[0]`.

Стоп-слова и список фидов — только на бэкенде (`news_curation_config.py`, `RSS_SOURCES`).
