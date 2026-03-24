# Промпт для Backend: запись кастомных статей (FastAPI + Redis)

Скопируйте всё между **«НАЧАЛО ПРОМПТА»** и **«КОНЕЦ ПРОМПТА»** и отправьте ИИ/разработчику бэкенда на Ubuntu.

**Связанные файлы в репо фронта:** `docs/CUSTOM_ARTICLES_BACKEND_SPEC.md`, `docs/CUSTOM_ARTICLES_WRITE_API.md`.

---

## НАЧАЛО ПРОМПТА

Ты — backend-инженер FastAPI на Ubuntu (allhalal.info). Нужно добавить **защищённые write-эндпоинты** для редакционных статей, которые уже **читаются** через `GET /api/v1/custom/articles` и `GET /api/v1/custom/articles/{id}`.

### Авторизация

- Все **POST / PUT / DELETE / POST upload** принимают заголовок:  
  `Authorization: Bearer <токен>`
- Значение токена хранится в env на сервере, например **`CUSTOM_ARTICLES_WRITE_TOKEN`** (та же строка, что уже задана на **Vercel** в переменной `CUSTOM_ARTICLES_WRITE_TOKEN` — фронт проксирует с этим Bearer).
- Неверный или отсутствующий токен → **401 Unauthorized**.
- Токен сравнивай на сервере **константное время** (например `secrets.compare_digest`), без утечек по таймингу.

### Префикс роутера

Тот же базовый путь, что и у чтения: **`/api/v1/custom`** (итого полные пути ниже).

### Эндпоинты (обязательные)

1. **`POST /api/v1/custom/articles`**  
   - Тело: JSON с полями как в спеке чтения: `id` (slug), `title`, `dek`, `content` (HTML, опционально), `image_url` (string или null), `category`, `tags` (массив строк, опционально), `author` (опционально), `published_at`, `updated_at` (ISO 8601).  
   - Запись в Redis: обновить hash/json `custom:article:{id}` и **`ZADD custom:articles:ids`** с score = unix ms от `published_at`.  
   - Если `id` уже есть — либо **409 Conflict**, либо идемпотентный upsert (зафиксируй поведение в коде).  
   - Успех: **200** или **201** + JSON `{ "success": true }` или полный объект статьи.

2. **`PUT /api/v1/custom/articles/{article_id}`**  
   - `article_id` — path, URL-decoded.  
   - Тело: полный объект полей (фронт шлёт полный набор).  
   - Нет статьи → **404**.  
   - Обновить Redis + при смене даты обновить score в sorted set.

3. **`DELETE /api/v1/custom/articles/{article_id}`**  
   - Удалить ключ статьи и **удалить member из** `custom:articles:ids`.  
   - Нет статьи → **404** (или **204** если идемпотентно — выбери одно).

### Эндпоинт (желательно)

4. **`POST /api/v1/custom/upload`**  
   - `multipart/form-data`, поле файла **`file`**.  
   - Сохранить на диск под префиксом (например `/var/www/custom-media/`) **или** загрузить в S3/R2.  
   - Ответ JSON: **`{ "url": "https://…" }`** — абсолютный HTTPS URL, по которому картинка отдаётся публично (nginx static или CDN).  
   - Фронт также понимает ключи `image_url` или `publicUrl` в JSON.  
   - Ограничь типы: `image/jpeg`, `image/png`, `image/webp`, размер (например ≤ 5 MB).

### Согласованность с GET

- После POST/PUT ответы **`GET /articles`** и **`GET /articles/{id}`** должны отдавать те же данные (формат как сейчас на проде).  
- Поля **`id`/`title`** обязательны для отображения на главной; см. нормализацию на фронте в типе `CustomArticle`.

### Проверка после деплоя

```bash
export TOKEN='тот_же_что_на_Vercel'
curl -sS -X POST "https://api.allhalal.info/api/v1/custom/articles" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":"test-slug-demo","title":"Test","dek":"Demo","category":"general","published_at":"2026-03-23T12:00:00Z","image_url":null}'

curl -sS "https://api.allhalal.info/api/v1/custom/articles?limit=5" | head -c 500
```

Затем с **Vercel**: зайти в админку → New article → Publish — должно вернуться **без 502**.

### Не делать

- Не открывать write без Bearer.  
- Не класть `CUSTOM_ARTICLES_WRITE_TOKEN` в репозиторий.  
- Не смешивать с роутами `briefs/*` — это отдельный пайплайн.

## КОНЕЦ ПРОМПТА

---

*Документ в репозитории AllHalal-Web; при расхождении с кодом прокси смотри `lib/customArticlesWriteProxy.ts`.*
