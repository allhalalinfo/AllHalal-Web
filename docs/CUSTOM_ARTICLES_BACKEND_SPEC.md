# Custom articles API + Redis (backend spec for AllHalal-Backend)

Фронт (`AllHalal-Web`) уже ждёт эти эндпоинты. База по умолчанию:  
`https://api.allhalal.info/api/v1/custom`  
(переопределение: `CUSTOM_ARTICLES_API_BASE` в Vercel / `.env.local`.)

**Админ-панель на фронте** (`/en/admin/custom-articles`) проксирует **POST/PUT/DELETE** (и опционально **upload**) на этот же хост с Bearer-токеном — см. **`docs/CUSTOM_ARTICLES_WRITE_API.md`**.

## Цели

1. **Главная** — при наличии хотя бы одной статьи показывается сетка **только кастомных** материалов (`GET /custom/articles`). Иначе остаётся блок **curated briefs** с `GET /briefs/home` (как сейчас).
2. **Новости** — отдельная страница `/news` берёт **wire/RSS** из `GET /briefs/feed` (и дальше бэкенд должен отдавать **полный** список и **стабильные `image_url`** для карточек — это правки пайплайна feed/Redis, не фронта).

## Redis (рекомендуемая схема)

| Ключ | Тип | Назначение |
|------|-----|------------|
| `custom:articles:ids` | sorted set | `member = article_id`, `score = published_at` (unix ms) |
| `custom:article:{id}` | hash или JSON string | поля статьи |

Альтернатива: один ключ `custom:articles:list` как JSON array — проще, но хуже для пагинации на больших объёмах.

### Поля статьи (JSON)

Согласуйте с типом `CustomArticle` на фронте:

```json
{
  "id": "zakat-on-crypto-basics",
  "title": "…",
  "dek": "Краткое описание до ~200 символов",
  "content": "<p>HTML…</p>",
  "image_url": "https://…",
  "category": "zakat",
  "tags": ["zakat", "crypto"],
  "author": "Имя",
  "published_at": "2026-03-23T10:00:00Z",
  "updated_at": "2026-03-23T12:00:00Z"
}
```

- `id` — стабильный slug (URL `/en/read/{id}`).
- `content` — доверенный HTML от редакции; фронт прогоняет через `sanitize-html`.
- `image_url` — абсолютный HTTPS для карточки и OG.

## FastAPI роутер (префикс `/api/v1/custom`)

### `GET /articles`

Query: `page` (default 1), `limit` (default 20, max 60), `category` (optional).

Ответ (минимум):

```json
{
  "success": true,
  "articles": [ { … } ],
  "total": 42,
  "page": 1,
  "limit": 20
}
```

Допустим алиас `items` вместо `articles` — фронт поддерживает оба.

### `GET /articles/{article_id}`

Path: `article_id` — без дополнительного encode на сервере (фронт шлёт `encodeURIComponent`).

Ответ (любой из вариантов):

```json
{ "success": true, "article": { … } }
```

или плоский объект статьи с полями `id`, `title`, …

### `GET /categories`

```json
{ "success": true, "categories": ["zakat", "faith", "family"] }
```

Уникальные категории из всех статей (или фиксированный список).

## CORS / кеш

- Публичные GET, без секретов в ответах.
- Заголовки кеша по желанию (`Cache-Control`); на Vercel главная уже `revalidate: 120` при рендере.

## Скрипт публикации `add_article.py` (на сервере)

1. Читать Markdown с YAML frontmatter (`title`, `category`, `image_url`, `author`, …).
2. Тело после `---` → HTML через `markdown` (или `markdown-it`).
3. `slug = slugify(title)` или явный `id` из frontmatter.
4. `HSET` / `JSON.SET` + `ZADD custom:articles:ids score id`.
5. Запуск только по SSH / CI (без публичного write API).

Зависимости: `markdown`, `python-slugify`, клиент Redis.

## Wire feed «всё в новости + картинки»

Отдельная задача для того же бэкенда:

- Пайплайн `briefs/feed` должен наполнять Redis **всеми** свежими items (лимиты `limit`/`page` по контракту).
- Для каждого item — **валидный** `image_url` (RSS enclosure, og scrape, или placeholder policy), чтобы карточки на `/news` не сыпались в плейсхолдер из‑за пустого URL.

## Проверка с фронта

```bash
curl -sS "https://api.allhalal.info/api/v1/custom/articles?page=1&limit=5"
curl -sS "https://api.allhalal.info/api/v1/custom/articles/your-slug"
```

После деплоя бэкенда на главной автоматически появится сетка кастомных статей (если список не пустой).
