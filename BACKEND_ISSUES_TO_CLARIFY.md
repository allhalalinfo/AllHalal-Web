# 🔧 Backend Issues - Вопросы для Backend Team

**Дата:** 18 декабря 2025  
**Frontend:** AllHalal-Web (Next.js)  
**Backend:** https://api.allhalal.info (FastAPI)

---

## ✅ Что работает:

1. ✅ `/admin/stats/database` - работает, возвращает данные
2. ✅ `/admin/health/system` - работает, возвращает health checks
3. ✅ CORS настроен правильно - запросы с `allhalal.info` проходят
4. ✅ Frontend admin panel подключен и работает

---

## ❌ Проблемы (нужно исправить на backend):

### 1. 🔴 `/admin/stats/etl` - Internal Server Error (500)

**Проблема:**
```
GET https://api.allhalal.info/admin/stats/etl
→ Возвращает: {"error":"Internal server error","status_code":500}
```

**Ожидаемый формат:**
```json
{
  "last_run": "2025-12-18T16:00:00Z",
  "status": "success",
  "products_processed": 50000,
  "errors": 0
}
```

**Вопросы для backend:**
- ❓ Почему endpoint возвращает 500?
- ❓ Есть ли ошибки в логах backend?
- ❓ Нужно ли создать этот endpoint или он должен быть, но не работает?
- ❓ Какой формат данных должен возвращать этот endpoint?

---

### 2. 🔴 `/admin/stats/api` - Internal Server Error (500)

**Проблема:**
```
GET https://api.allhalal.info/admin/stats/api
→ Возвращает: {"error":"Internal server error","status_code":500}
```

**Ожидаемый формат:**
```json
{
  "total_scans": 15200,
  "scans_today": 450,
  "scans_this_week": 3200,
  "unique_users": 8500
}
```

**Вопросы для backend:**
- ❓ Почему endpoint возвращает 500?
- ❓ Есть ли ошибки в логах backend?
- ❓ Нужно ли создать этот endpoint или он должен быть, но не работает?
- ❓ Какой формат данных должен возвращать этот endpoint?
- ❓ Откуда брать статистику API scans? (логи, база данных, аналитика?)

---

### 3. ⚠️ `/admin/stats/all` - Not Found (404)

**Проблема:**
```
GET https://api.allhalal.info/admin/stats/all
→ Возвращает: {"detail":"Not Found"}
```

**Решение на frontend:**
✅ Уже исправлено - делаем отдельные запросы к `database` и `health`

**Вопросы для backend (опционально):**
- ❓ Нужен ли aggregated endpoint `/admin/stats/all` который возвращает все статистики сразу?
- ❓ Или оставляем как есть (отдельные endpoints)?

---

### 4. ⚠️ Health Check - Database Status

**Текущая ситуация:**
```
GET https://api.allhalal.info/admin/health/system
→ Возвращает: {"status": "unhealthy", "checks": {"database": {"status": "error"}}}
```

**Но при этом:**
- ✅ `/admin/stats/database` работает и возвращает данные
- ✅ База данных явно работает (есть 2.28M продуктов)

**Вопросы для backend:**
- ❓ Почему health check показывает `database.status: "error"` если база работает?
- ❓ Это проблема с health check логикой или реальная проблема?
- ❓ Нужно ли исправить health check для database?

---

## 📋 Что нужно от Backend:

### Приоритет 1 (Критично):

1. **Исправить `/admin/stats/etl` endpoint**
   - Убрать 500 ошибку
   - Вернуть правильный формат данных
   - Или объяснить почему endpoint не нужен

2. **Исправить `/admin/stats/api` endpoint**
   - Убрать 500 ошибку
   - Вернуть правильный формат данных
   - Или объяснить почему endpoint не нужен

### Приоритет 2 (Желательно):

3. **Проверить health check для database**
   - Почему показывает "error" если база работает?
   - Исправить health check логику

4. **Опционально: создать `/admin/stats/all` endpoint**
   - Агрегированный endpoint для всех статистик
   - Или оставить как есть (отдельные endpoints)

---

## 📊 Текущий формат данных (что работает):

### Database Stats (`/admin/stats/database`):
```json
{
  "products": {
    "food": 2202437,
    "cosmetics": 80342,
    "total": 2282779
  },
  "halal_status": {
    "halal": 1027102,
    "haram": 270128,
    "invalid": 219,
    "mushbooh": 812695,
    "unknown": 92293
  },
  "labels": {...},
  "product_safety": {...}
}
```
✅ **Работает правильно!**

### Health Check (`/admin/health/system`):
```json
{
  "status": "unhealthy",
  "timestamp": "2025-12-18T21:26:39.936016+00:00",
  "checks": {
    "database": {
      "status": "error",
      "response_time_ms": 2220,
      "products": {...}
    },
    "redis": {
      "status": "healthy",
      "uptime_hours": 20.5
    },
    "memory": {...},
    "cpu": {...},
    "disk": {...}
  }
}
```
⚠️ **Работает, но database status показывает "error"**

---

## 🔍 Как проверить на backend:

### Проверка ETL endpoint:
```bash
curl https://api.allhalal.info/admin/stats/etl
# Должен вернуть JSON, а не 500
```

### Проверка API endpoint:
```bash
curl https://api.allhalal.info/admin/stats/api
# Должен вернуть JSON, а не 500
```

### Проверка логов:
```bash
# На сервере backend
docker-compose logs api | grep -i "error\|500\|etl\|api"
# Или
tail -f /path/to/backend/logs
```

---

## 💡 Рекомендации:

1. **Если endpoints не нужны:**
   - Можно удалить их из backend
   - Frontend уже обрабатывает ошибки gracefully
   - Пользователи увидят понятное сообщение об ошибке

2. **Если endpoints нужны:**
   - Исправить 500 ошибки
   - Вернуть правильный формат данных
   - Проверить логи на предмет реальных ошибок

3. **Для health check:**
   - Проверить почему database показывает "error"
   - Возможно проблема с timeout или connection pool
   - Исправить health check логику

---

## 📞 Контакты:

**Frontend Developer:** (ты)  
**Backend Developer:** (нужно уточнить)

---

**Готово к отправке Backend Team!** 🚀
