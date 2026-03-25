# Инструкции для ИИ-агентов (AllHalal): backend, редакция, картинки

Один документ — чтобы **локальный backend-агент**, **агент на Ubuntu** и **агенты-редакторы** смотрели на одни и те же правила.  
Технический контракт API: **`docs/CUSTOM_ARTICLES_BACKEND_SPEC.md`**.  
Контекст фронта ↔ бэка: **`docs/SEND_TO_BACKEND_AI.md`**.  
**Write API + админка Vercel:** **`docs/CUSTOM_ARTICLES_WRITE_API.md`** и промпт для реализации на FastAPI — **`docs/BACKEND_PROMPT_CUSTOM_WRITE_RU.md`**.

---

## Схема потока

1. **Редакция** → текст + метаданные (+ URL обложки).  
2. **Backend (локально / CI)** → валидация → пуш на сервер (файлы / скрипт).  
3. **Сервер (Ubuntu)** → Redis / FastAPI, ответы `GET /api/v1/custom/articles`.  
4. **Фронт (Vercel)** → тянет API; главная показывает кастомные статьи, если список **не пустой**.

---

## Промпт для Backend-агента (скопировать целиком)

```
Ты — backend-инженер проекта allhalal.info (FastAPI, Redis на Ubuntu).

Цель: кастомные статьи редакции отдаются по контракту, который уже ждёт Next.js-фронт.

ОБЯЗАТЕЛЬНО прочитай и соблюдай: docs/CUSTOM_ARTICLES_BACKEND_SPEC.md (в репозитории AllHalal-Web).

Твои задачи:
1. Реализовать или поддерживать GET /api/v1/custom/articles (query: page, limit, category), GET /articles/{id}, при необходимости GET /categories.
2. Хранение в Redis по схеме из спеки (sorted set + hash/JSON на статью).
3. Скрипт публикации (например add_article.py): читает Markdown + YAML frontmatter, конвертирует тело в HTML, пишет в Redis. id/slug стабильный для URL /en/read/{id}.
4. Валидация перед записью: у каждой статьи непустые id (или slug→id) и title; image_url — абсолютный HTTPS или null; published_at в ISO 8601.
5. Не ломать поля: фронт нормализует dek/summary, articles/items, total/count — поддержи совместимость.
6. После изменений: curl на прод/стейдж из спеки; убедись, что на главной появляется блок «Curated reads», если в ответе есть статьи.

Не смешивай с wire-новостями: /briefs/feed — отдельный пайплайн. Кастом — только /api/v1/custom/...
```

При работе **вне репозитория** вставь в промпт **содержимое** `CUSTOM_ARTICLES_BACKEND_SPEC.md` или дай агенту путь клонировать AllHalal-Web.

---

## Промпт для агентов, которые пишут статьи (скопировать)

```
Ты — редактор allhalal.info. Пишешь оригинальные статьи (не копипаст RSS).

Выход для backend-скрипта:
- Один файл Markdown с YAML frontmatter сверху (между ---).
- Поля frontmatter: id (стабильный slug латиницей), title, dek (краткое описание для карточки), category, author (опционально), published_at (ISO 8601), image_url (HTTPS на обложку или пусто), tags (опционально, список).
- После второго --- — тело статьи в Markdown (заголовки ##, списки, ссылки).

Требования к тексту: фактчек, уважительный тон, при спорных фикх-вопросах — оговорка «уточните у учёного». Не вставляй script, iframe, произвольный HTML в теле — только безопасный Markdown.

Язык статьи согласуй с владельцем продукта (EN для /en/…).
```

---

## Промпт для подготовки обложек (скопировать)

```
Ты готовишь обложку статьи для allhalal.info.

Технические требования:
- Горизонтальное изображение, соотношение близко к 16:9 или ~17:10; важный объект ближе к центру (на карточке будет object-cover).
- Размер: ориентир 1600×900 px (допустимо 1200×675 … 1920×1080).
- Формат: WebP предпочтительно, иначе JPEG качество ~80–85%; вес целить ≤ 300–500 KB.
- Итог: публичный HTTPS URL (CDN/storage). Права на изображение должны быть чистыми (сток/свой/генерация по правилам проекта).

В метаданных статьи указать тот же URL в image_url.
```

---

## Фронтенд (Cursor / код)

- Контракт потребления: `lib/customArticles.ts`, типы `types/customArticle.ts`.  
- Главная: `app/[locale]/page.tsx` — при `articles.length > 0` показывается `CustomArticlesHomeSection`.  
- Страница статьи: `app/[locale]/read/[slug]/page.tsx`.  
- Менять код только если меняется контракт API или UX; новые статьи **не требуют** деплоя фронта, если JSON совместим.

**Промпт для агента фронта (кратко):**

```
Ты правишь репозиторий AllHalal-Web (Next.js). Не ломай контракт custom articles: поля как в types/customArticle.ts и docs/CUSTOM_ARTICLES_BACKEND_SPEC.md. Любое изменение API согласуй с backend-доком.
```

---

## Админ-панель (фронт уже есть)

- URL: **`/{locale}/admin/custom-articles`** (логин: **`…/login`**). Не в публичном меню — держите ссылку приватной.
- Нужны env на Vercel: `ADMIN_CUSTOM_DASHBOARD_PASSWORD`, `ADMIN_CUSTOM_SESSION_SECRET`, `CUSTOM_ARTICLES_WRITE_TOKEN`; на API — приём **POST/PUT/DELETE** и опционально **POST /upload**. Подробно: **`docs/CUSTOM_ARTICLES_WRITE_API.md`**.

---

## Визуальные паттерны статей (автоматическое оформление)

**Фронт автоматически применяет специальные стили** к секциям статей, если в ID заголовка H2 есть ключевые слова:

| Паттерн | Ключевые слова в ID | Описание стиля |
|---------|---------------------|----------------|
| **Quick Answer** | `quick`, `tldr`, `summary` | Золотая карточка с рамкой, молния (⚡), увеличенный шрифт |
| **Key Takeaways** | `takeaway` | Navy боковая граница (6px), градиент, тень |
| **Why This Matters** | `why`, `matter` | Вертикальная золотая полоса слева (5px gradient) |
| **Common Mistakes** | `mistake`, `error`, `avoid` | Оранжевый пунктирный border, warning-стиль |
| **Keep Learning** | `learning`, `reference`, `resource` | Стрелки вместо галочек, разделители, top border |
| **Step-by-Step** | `step`, `how-to` | Цветная прогрессия badges (navy→gold→yellow) |
| **FAQ** | `faq`, `question` | Alternating фон для вопросов (H3) |
| **Practical Tips** | `practical`, `tip` | Лампочка (💡) справа от заголовка |
| **Comparison** | `comparison`, `versus`, `vs` | Центрированный H2, градиент, усиленная тень таблицы |
| **Final CTA** | `final`, `conclusion`, `next-step` | Тёмно-синяя карточка, белый текст, центрирование |

**Пример использования в Markdown:**

```markdown
## Quick Answer {#quick-answer}

The short answer is...

## Key Takeaways {#key-takeaways}

- First important point
- Second important point

## How to Check If Product is Halal {#how-to-check}

1. Look for certification
2. Read ingredients
3. Contact manufacturer
```

**Важно:**
- ✅ ID нужен только для специальных секций (Quick Answer, FAQ, Takeaways, etc.)
- ✅ Комбинируй: `#common-mistakes-about-halal`, `#key-takeaways-for-beginners`
- ❌ Не ставь ID на каждый заголовок — только на те, что хочешь выделить
- ❌ Если ID не содержит ключевые слова, будет обычный стиль

**Детальное руководство:** **`docs/WRITER_AI_AGENT_PROMPT_FULL.md`**, раздел 6.3.

---

## Чеклист «всё опубликовано»

- [ ] `curl …/custom/articles?page=1&limit=5` возвращает статьи с `id`, `title`.  
- [ ] `curl …/custom/articles/{id}` отдаёт полный объект с `content` (HTML), если нужна страница чтения.  
- [ ] Обложка открывается по `image_url` с сервера (200, image/*).  
- [ ] Главная через ~2 мин (revalidate) или после hard refresh показывает карточки.

---

*Дата: март 2026. При расхождении с кодом приоритет у актуальных типов в репозитории.*
