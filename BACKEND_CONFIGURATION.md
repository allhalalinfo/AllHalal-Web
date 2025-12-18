# 🔧 Backend Configuration - AllHalal

## 📍 Backend API Information

### ✅ Production Backend:
- **URL:** `https://api.allhalal.info`
- **Server:** Hetzner (49.12.186.18, ubuntu-8gb-fsn1-1)
- **Reverse Proxy:** Caddy 2 (ports 80, 443 with SSL)
- **API:** FastAPI on port 8000
- **Database:** PostgreSQL 16
- **Cache:** Redis 7

### 🖥️ Admin Panel (Backend):
- **URL:** `https://api.allhalal.info/admin/`
- **Status:** ✅ Already deployed and working

---

## 🔗 Frontend Admin Panel Integration

### Environment Variable для Vercel:

```
NEXT_PUBLIC_BACKEND_URL=https://api.allhalal.info
```

### Настройка в Vercel:

1. **Vercel Dashboard** → **Settings** → **Environment Variables**
2. Добавь:
   - **Name:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** `https://api.allhalal.info`
   - ✅ Production
   - ✅ Preview
   - ✅ Development
3. **Save** → **Redeploy**

---

## ✅ Проверка Backend Endpoints

### Доступные Admin Endpoints:

```bash
# Database Statistics
GET https://api.allhalal.info/admin/stats/database

# ETL Statistics  
GET https://api.allhalal.info/admin/stats/etl

# API Usage Statistics
GET https://api.allhalal.info/admin/stats/api

# System Health
GET https://api.allhalal.info/admin/health/system

# Scripts Management
GET https://api.allhalal.info/admin/scripts/list
POST https://api.allhalal.info/admin/scripts/run/{script_name}

# TODO List
GET https://api.allhalal.info/admin/todos
```

### Тест доступности:

```bash
# Проверь что backend доступен
curl https://api.allhalal.info/admin/stats/database

# Проверь CORS
curl -I -X OPTIONS https://api.allhalal.info/admin/stats/database \
  -H "Origin: https://allhalal.info" \
  -H "Access-Control-Request-Method: GET"
```

---

## 🔒 CORS Configuration

### Убедись что CORS настроен в FastAPI:

Backend должен разрешать запросы с `https://allhalal.info`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://allhalal.info",
        "https://www.allhalal.info",
        "https://*.vercel.app",  # Preview deployments
        "http://localhost:3000",  # Local development
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

---

## 🚀 Frontend Admin Panel

### URL Frontend Admin:
- **Production:** `https://allhalal.info/admin`
- **Local:** `http://localhost:3000/admin`

### Что делает Frontend Admin Panel:

1. **Проксирует запросы** к backend через `/api/admin/stats`
2. **Проверяет аутентификацию** (password-protected)
3. **Отображает статистику** в удобном формате
4. **Автоматически обновляет** данные каждые 30 секунд

### Отличия от Backend Admin Panel:

| Feature | Backend Admin (`/admin/`) | Frontend Admin (`/admin`) |
|---------|---------------------------|---------------------------|
| **URL** | `https://api.allhalal.info/admin/` | `https://allhalal.info/admin` |
| **Authentication** | Backend auth | Frontend password |
| **UI** | Backend templates | Next.js React |
| **Updates** | Manual refresh | Auto-refresh (30s) |
| **Integration** | Direct backend | Via proxy API route |

---

## 📊 Формат данных (ожидаемый)

### Database Stats:
```json
{
  "total_products": 2270000,
  "halal_percentage": 46.6,
  "haram_count": 500000,
  "mushbooh_count": 700000,
  "last_updated": "2025-12-18T17:00:00Z"
}
```

### ETL Stats:
```json
{
  "last_run": "2025-12-18T16:00:00Z",
  "status": "success",
  "products_processed": 50000,
  "errors": 0
}
```

### API Stats:
```json
{
  "total_scans": 15200,
  "scans_today": 450,
  "scans_this_week": 3200,
  "unique_users": 8500
}
```

### System Health:
```json
{
  "status": "healthy",
  "database_connected": true,
  "api_uptime": 86400,
  "version": "1.0.0"
}
```

---

## ✅ Checklist

Перед использованием Frontend Admin Panel:

- [ ] `NEXT_PUBLIC_BACKEND_URL=https://api.allhalal.info` установлен в Vercel
- [ ] Проект пересобран (redeploy)
- [ ] CORS настроен в FastAPI backend
- [ ] Backend endpoints доступны и возвращают правильный формат
- [ ] Frontend admin panel доступен по `https://allhalal.info/admin`
- [ ] Аутентификация работает (password login)

---

## 🐛 Troubleshooting

### Проблема: Frontend не может подключиться к backend

**Проверь:**
1. ✅ `NEXT_PUBLIC_BACKEND_URL` установлен в Vercel
2. ✅ Backend доступен: `curl https://api.allhalal.info/admin/stats/database`
3. ✅ CORS настроен правильно
4. ✅ Нет firewall блокирующего запросы

### Проблема: CORS error

**Решение:**
1. Проверь что `https://allhalal.info` в `allow_origins` в FastAPI
2. Перезапусти FastAPI после изменений CORS
3. Проверь что Caddy не блокирует CORS headers

### Проблема: 404 на endpoints

**Решение:**
1. Проверь что `admin_router` подключен в FastAPI
2. Проверь что endpoints существуют в backend коде
3. Проверь что Caddy правильно проксирует запросы на порт 8000

---

## 📝 Notes

- **Backend Admin Panel** (`/admin/`) - уже работает, используй для прямого доступа
- **Frontend Admin Panel** (`/admin`) - новый, интегрирован с сайтом, требует настройки
- Оба могут работать одновременно, у каждого свои преимущества

---

**Готово!** После настройки `NEXT_PUBLIC_BACKEND_URL` frontend admin panel будет работать! 🎉
