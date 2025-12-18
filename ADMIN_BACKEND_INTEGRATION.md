# 🔗 Admin Panel - Backend Integration Guide

## 📊 Что было добавлено

Админ-панель теперь делает **реальные запросы** к backend API вместо показа хардкодных данных.

---

## 🎯 Новые возможности

### ✅ Реальная интеграция с Backend
- Запросы к backend через прокси-route (`/api/admin/stats`)
- Автоматическое обновление статистики каждые 30 секунд
- Обработка ошибок и loading states

### ✅ Табы для разных разделов
- **Overview** - общая статистика
- **Database** - статистика базы данных
- **ETL** - мониторинг ETL процессов
- **API** - статистика использования API
- **Health** - здоровье системы

### ✅ Расширенные метрики
- Total Products, Halal %, Haram, Mushbooh
- API Scans (total, today, this week)
- Unique Users
- ETL Status (last run, products processed, errors)
- System Health (status, database connection, uptime, version)

---

## 🔧 Требования к Backend API

Backend должен предоставлять следующие endpoints:

### 1. Database Statistics
```
GET /admin/stats/database
```

**Expected Response:**
```json
{
  "total_products": 2270000,
  "halal_percentage": 46.6,
  "haram_count": 500000,
  "mushbooh_count": 700000,
  "last_updated": "2025-12-18T17:00:00Z"
}
```

### 2. ETL Statistics
```
GET /admin/stats/etl
```

**Expected Response:**
```json
{
  "last_run": "2025-12-18T16:00:00Z",
  "status": "success",
  "products_processed": 50000,
  "errors": 0
}
```

### 3. API Statistics
```
GET /admin/stats/api
```

**Expected Response:**
```json
{
  "total_scans": 15200,
  "scans_today": 450,
  "scans_this_week": 3200,
  "unique_users": 8500
}
```

### 4. System Health
```
GET /admin/health/system
```

**Expected Response:**
```json
{
  "status": "healthy",
  "database_connected": true,
  "api_uptime": 86400,
  "version": "1.0.0"
}
```

### 5. All Stats (Optional)
```
GET /admin/stats/all
```

**Expected Response:**
```json
{
  "database": { ... },
  "etl": { ... },
  "api": { ... },
  "health": { ... }
}
```

---

## ⚙️ Настройка

### 1. Environment Variables

**Vercel:**
```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com
ADMIN_PASSWORD=your_secure_password
```

**Локально (.env.local):**
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
ADMIN_PASSWORD=test123
```

### 2. Backend CORS

Backend должен разрешить запросы с frontend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://allhalal.info",
        "https://*.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

---

## 🔒 Безопасность

### ✅ Прокси через Next.js API Route
- Backend URL не раскрывается клиенту
- Проверка аутентификации перед запросами
- HttpOnly cookies для сессий

### ✅ Защита от несанкционированного доступа
- Только аутентифицированные пользователи могут видеть статистику
- Автоматический logout при истечении сессии (24 часа)

---

## 📊 Формат данных

### Форматирование чисел:
- `1000000+` → `1.00M`
- `1000+` → `1.0K`
- Меньше 1000 → как есть

### Форматирование дат:
- `2025-12-18T17:00:00Z` → `Dec 18, 2025, 05:00 PM`

### Форматирование uptime:
- `86400` секунд → `1d 0h`
- `3600` секунд → `1h 0m`

---

## 🐛 Troubleshooting

### Статистика не загружается

**Проверь:**
1. ✅ `NEXT_PUBLIC_BACKEND_URL` установлен в Vercel
2. ✅ Backend запущен и доступен
3. ✅ Backend CORS настроен правильно
4. ✅ Endpoints возвращают правильный формат JSON

**Ошибки в консоли:**
- `Backend URL not configured` → Добавь `NEXT_PUBLIC_BACKEND_URL`
- `Backend error: 404` → Проверь что endpoints существуют
- `CORS error` → Проверь CORS настройки backend

### Данные не обновляются

- Статистика обновляется автоматически каждые 30 секунд
- Можно нажать "Retry" для ручного обновления
- Проверь что backend возвращает актуальные данные

---

## 🚀 Что дальше?

### Возможные улучшения:
- [ ] Графики и визуализации (Charts.js или Recharts)
- [ ] Экспорт статистики в CSV/JSON
- [ ] Управление скриптами (запуск ETL вручную)
- [ ] TODO список из backend
- [ ] История изменений
- [ ] Уведомления о проблемах

---

**Готово!** Админ-панель теперь показывает реальные данные из backend! 🎉
