# ⚡ Quick Reference: Admin Backend Setup

## 🚀 Быстрая настройка (3 шага)

### 1️⃣ Vercel Environment Variable

```
Settings → Environment Variables → Add New

Name:  NEXT_PUBLIC_BACKEND_URL
Value: https://api.allhalal.info

✅ Production
✅ Preview  
✅ Development

→ Save → Redeploy
```

### 2️⃣ Backend CORS (FastAPI)

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

### 3️⃣ Backend Endpoints

```python
# app/routers/admin.py
@router.get("/stats/database")
def get_database_stats():
    return {
        "total_products": 2270000,
        "halal_percentage": 46.6,
        "haram_count": 500000,
        "mushbooh_count": 700000,
        "last_updated": datetime.now().isoformat()
    }

@router.get("/stats/etl")
def get_etl_stats():
    return {
        "last_run": datetime.now().isoformat(),
        "status": "success",
        "products_processed": 50000,
        "errors": 0
    }

@router.get("/stats/api")
def get_api_stats():
    return {
        "total_scans": 15200,
        "scans_today": 450,
        "scans_this_week": 3200,
        "unique_users": 8500
    }

@router.get("/health/system")
def get_system_health():
    return {
        "status": "healthy",
        "database_connected": True,
        "api_uptime": 86400,
        "version": "1.0.0"
    }
```

---

## 🔍 Проверка

### Проверить переменную в Vercel:
```
Settings → Environment Variables → 👁️ NEXT_PUBLIC_BACKEND_URL
```

### Проверить CORS:
```bash
curl -I -X OPTIONS https://your-backend.com/admin/stats/database \
  -H "Origin: https://allhalal.info"
```

Должен вернуть: `Access-Control-Allow-Origin: https://allhalal.info`

### Проверить endpoints:
```bash
curl https://your-backend.com/admin/stats/database
curl https://your-backend.com/admin/stats/etl
curl https://your-backend.com/admin/stats/api
curl https://your-backend.com/admin/health/system
```

---

## 🐛 Частые проблемы

| Проблема | Решение |
|----------|---------|
| "Backend URL not configured" | Добавь `NEXT_PUBLIC_BACKEND_URL` в Vercel + Redeploy |
| CORS error | Добавь CORS middleware в backend + перезапусти |
| 404 Not Found | Проверь что endpoints существуют и router подключен |
| "Failed to fetch" | Проверь что backend доступен по URL |
| Данные не показываются | Проверь формат JSON в DevTools → Network |

---

## 📚 Подробная инструкция

См. `ADMIN_BACKEND_SETUP_GUIDE.md` для детальных шагов.

---

**Готово!** ✅
