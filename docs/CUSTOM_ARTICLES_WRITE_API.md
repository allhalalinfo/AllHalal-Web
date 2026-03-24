# Write API для кастомных статей (FastAPI на Ubuntu)

Фронт (Vercel) отдаёт **админ-панель** по адресу:

`https://allhalal.info/en/admin/custom-articles`  
(логин: `/en/admin/custom-articles/login`)

Панель **не пишет в Redis сама**: она шлёт запросы на **Next.js API routes**, те проксируют на ваш **`CUSTOM_ARTICLES_API_BASE`** с заголовком:

```http
Authorization: Bearer <CUSTOM_ARTICLES_WRITE_TOKEN>
```

Токен задаётся **одинаково** на Vercel (`CUSTOM_ARTICLES_WRITE_TOKEN`) и на FastAPI (проверка того же секрета).

---

## Эндпоинты, которые нужно реализовать на backend

База: тот же префикс, что и для чтения, например `https://api.allhalal.info/api/v1/custom`.

### 1. `POST /articles`

Создание статьи. Тело JSON — как в `docs/CUSTOM_ARTICLES_BACKEND_SPEC.md` (поля `id`, `title`, `dek`, `content`, `image_url`, `category`, `tags`, `author`, `published_at`, `updated_at`).

- Без валидного `Authorization` → **401**.
- Успех → **200/201** и JSON `{ "success": true }` или объект статьи.

### 2. `PUT /articles/{article_id}`

Обновление. Тело — полный или частичный объект (как договоритесь; фронт шлёт полный набор полей).

- **401** без токена.
- **404** если нет статьи.

### 3. `DELETE /articles/{article_id}`

Удаление из Redis (и из sorted set индекса).

- **401** без токена.

### 4. `POST /upload` (опционально, для кнопки «Upload file»)

`multipart/form-data`, поле файла: **`file`**.

Ответ JSON, например:

```json
{ "url": "https://cdn.example.com/custom/2026/photo.webp" }
```

Допустимы алиасы: `image_url` или `publicUrl` — фронт попробует их прочитать.

- Сохраняйте файл на диск/S3/R2 и отдавайте **публичный HTTPS URL**.
- Без этого эндпоинта редактор всё равно работает: поле **Cover image URL** вручную.

---

## Переменные окружения (Vercel / локально)

| Переменная | Назначение |
|------------|------------|
| `ADMIN_CUSTOM_DASHBOARD_PASSWORD` | Пароль входа в админку (длинная случайная строка). |
| `ADMIN_CUSTOM_SESSION_SECRET` | Секрет HMAC для cookie-сессии (32+ случайных символов). |
| `CUSTOM_ARTICLES_WRITE_TOKEN` | Bearer-токен для прокси на Ubuntu. |
| `CUSTOM_ARTICLES_API_BASE` | Уже используется для чтения; тот же хост для write. |

См. `.env.example`.

---

## Проверка

1. Локально: `.env.local` с паролем и секретом → `npm run dev` → `/en/admin/custom-articles/login`.
2. После реализации POST/PUT/DELETE на API: создать статью из панели → `curl GET …/custom/articles?limit=5`.

---

## Безопасность

- Не публикуйте `ADMIN_CUSTOM_*` и `CUSTOM_ARTICLES_WRITE_TOKEN` в клиентский код (они только server-side на Vercel).
- Ограничьте rate limit на `POST /articles` и `/upload` на стороне API по IP при необходимости.
