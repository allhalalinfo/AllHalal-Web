# 🚀 READY TO GO: Hetzner-only Architecture (100% FREE)

## ✅ Что готово (Adelya - твоя часть)

### Next.js переделан под Hetzner API:
- ✅ Удалены все зависимости от Redis/Upstash
- ✅ Теперь `lib/newsFeed.ts` обращается к `https://api.allhalal.info/api/v1/news/cached`
- ✅ ISR кеширование: 30 минут
- ✅ Fallback: если API недоступен → парсит RSS напрямую
- ✅ Build успешный
- ✅ Удалены файлы:
  - `lib/redis.ts` (больше не нужен)
  - `app/api/cron/update-news/route.ts` (новости обновляются на Hetzner)

---

## 📋 Что нужно сделать ТЕБЕ (2 минуты)

### 1️⃣ Добавить переменную в Vercel

https://vercel.com/adelyanurusheva/allhalal-web/settings/environment-variables

```
Name: NEXT_PUBLIC_API_URL
Value: https://api.allhalal.info
Environments: Production, Preview, Development
```

### 2️⃣ Передать задание Cursor агенту на Hetzner

Скопируй и отправь агенту:

```
Привет! Прочитай /Users/adelyanurusheva/Desktop/Allhalal-Web/docs/CURSOR-AGENT-INSTRUCTIONS.md
и выполни все 3 задачи. После завершения напиши отчет.
```

---

## 🤖 Что сделает Cursor агент (15-20 мин)

### Задача 1: RSS Parser Script
- Создаст `/root/allhalal_news_updater.py`
- Установит `feedparser`, `redis`, `requests`
- Парсит 5-10 RSS источников
- Сохраняет в Redis (TTL 30 мин)

### Задача 2: FastAPI Endpoint
- Добавит `/api/v1/news/cached` в существующий FastAPI
- Читает из Redis (localhost, быстро)
- Возвращает JSON с новостями

### Задача 3: Cron Job
- `*/30 * * * * python3 /root/allhalal_news_updater.py`
- Логи в `/var/log/allhalal-news.log`
- Ротация логов

**Агент НЕ будет:**
- ❌ Устанавливать платные сервисы
- ❌ Запрашивать API ключи
- ❌ Использовать внешние сервисы

**Все 100% бесплатно!**

---

## 📊 Финальная архитектура

```
Hetzner (твой сервер, $5/мес)
├── Redis Docker (localhost:6379)
├── Python Cron (каждые 30 мин)
│   └── Парсит RSS → Redis
├── FastAPI
│   └── GET /api/v1/news/cached
│       └── Читает Redis → JSON
└── HTTPS (твой SSL)

           ↓ (HTTPS API call)

Vercel Next.js
├── ISR cache: 30 мин
├── Fallback: direct RSS если Hetzner down
└── Пользователи видят новости мгновенно
```

### Скорость:
- Redis read: **1-5ms**
- FastAPI response: **10-20ms**
- Next.js ISR hit: **50-100ms**
- User experience: **🚀 instant**

### Стоимость:
- Hetzner: **$5/мес** (уже оплачен)
- Redis: **0** (локально)
- API ключи: **0** (не используем)
- **Итого: $0 дополнительных**

---

## 🧪 Как проверить что всё работает

### После деплоя:

```bash
# 1. Проверь API health
curl https://api.allhalal.info/api/v1/news/health
# Ожидаем: {"redis_connected": true, "status": "healthy"}

# 2. Проверь данные
curl https://api.allhalal.info/api/v1/news/cached?safe_only=false&limit=5
# Ожидаем: {"success": true, "items": [...], "count": 5}

# 3. Проверь homepage
curl https://allhalal.info/en
# Должны быть новости в NewsFeedWidget

# 4. Логи на Hetzner (SSH)
tail -f /var/log/allhalal-news.log
# Должны быть успешные запуски
```

---

## 🎯 Action Plan (последовательность)

1. **ТЫ**: Добавь `NEXT_PUBLIC_API_URL` в Vercel (2 мин)
2. **Cursor агент**: Настройка Hetzner (15-20 мин)
3. **Cursor агент**: Отчет о тестах
4. **ТЫ**: `git push` (деплой) (1 мин)
5. **ТЫ**: Проверь сайт (1 мин)

**Общее время: ~20-25 минут**

---

## 📄 Документация

- **Для тебя:** `docs/WHAT-YOU-NEED-TO-DO.md` (подробные инструкции)
- **Для агента:** `docs/CURSOR-AGENT-INSTRUCTIONS.md` (технические детали)
- **`.env.example`**: обновлен (убрал Upstash, добавил `NEXT_PUBLIC_API_URL`)

---

## ❓ Вопросы?

**Q: Агент знает что всё бесплатно?**
A: Да! В инструкциях 3 раза повторяется "БЕСПЛАТНО" + список что НЕ устанавливать.

**Q: Где API URL? Агент сам разберется?**
A: Да. Агент выполнит команду `find` чтобы найти FastAPI проект и добавит endpoint туда.

**Q: Нужны ли мне API ключи?**
A: Нет! RSS feeds публичные, Redis локальный.

---

**✅ Готов начинать? Добавь переменную в Vercel и передай задание агенту!**
