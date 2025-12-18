# 🔧 Подробная инструкция: Настройка Backend для Admin Panel

## 📋 Содержание

1. [Установка NEXT_PUBLIC_BACKEND_URL в Vercel](#1-установка-next_public_backend_url-в-vercel)
2. [Настройка Backend CORS](#2-настройка-backend-cors)
3. [Проверка формата данных endpoints](#3-проверка-формата-данных-endpoints)
4. [Тестирование](#4-тестирование)
5. [Troubleshooting](#5-troubleshooting)

---

## 1. Установка NEXT_PUBLIC_BACKEND_URL в Vercel

### Шаг 1: Открой Vercel Dashboard

1. Зайди на [vercel.com](https://vercel.com)
2. Войди в свой аккаунт
3. Выбери проект **AllHalal-Web**

### Шаг 2: Открой Settings → Environment Variables

1. В верхнем меню проекта нажми **Settings**
2. В левом сайдбаре выбери **Environment Variables**
3. Ты увидишь список существующих переменных окружения

### Шаг 3: Добавь новую переменную

1. Нажми кнопку **Add New** (или **+ Add**)
2. Заполни форму:

   **Name:**
   ```
   NEXT_PUBLIC_BACKEND_URL
   ```
   
   **Value:**
   ```
   https://api.allhalal.info
   ```
   ✅ **Это реальный URL твоего backend!**
   
   **Backend Information:**
   - URL: `https://api.allhalal.info`
   - Server: Hetzner (ubuntu-8gb-fsn1-1)
   - Reverse Proxy: Caddy 2
   - API: FastAPI on port 8000
   - Database: PostgreSQL 16
   - Cache: Redis 7

3. **Выбери окружения** (галочки):
   - ✅ **Production** (обязательно)
   - ✅ **Preview** (рекомендуется)
   - ✅ **Development** (опционально, для локальной разработки)

4. Нажми **Save**

### Шаг 4: Redeploy проект

⚠️ **ВАЖНО:** После добавления переменной окружения нужно пересобрать проект!

1. Перейди на вкладку **Deployments**
2. Найди последний deployment
3. Нажми на три точки (⋮) справа
4. Выбери **Redeploy**
5. Или просто нажми кнопку **Redeploy** вверху

**Альтернатива:** Сделай любой commit и push в git - это автоматически запустит новый deployment.

### Шаг 5: Проверь что переменная установлена

1. После redeploy, открой **Settings → Environment Variables**
2. Убедись что `NEXT_PUBLIC_BACKEND_URL` есть в списке
3. Проверь что значение правильное (нажми на глаз 👁️ чтобы увидеть значение)

---

## 2. Настройка Backend CORS

### Что такое CORS?

CORS (Cross-Origin Resource Sharing) - это механизм безопасности браузера. 
Если твой frontend на `allhalal.info`, а backend на другом домене, браузер 
блокирует запросы без правильной настройки CORS.

### Шаг 1: Найди файл где создается FastAPI app

Обычно это:
- `main.py`
- `app/__init__.py`
- `app/main.py`
- `src/main.py`

### Шаг 2: Добавь CORS middleware

**Пример для `main.py`:**

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Создай FastAPI app
app = FastAPI(
    title="AllHalal Backend API",
    version="1.0.0"
)

# ⬇️ ДОБАВЬ ЭТО ПЕРЕД ВСЕМИ ROUTES ⬇️
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://allhalal.info",           # Production сайт
        "https://www.allhalal.info",       # С www тоже
        "https://*.vercel.app",            # Preview deployments (важно!)
        "http://localhost:3000",           # Локальная разработка
        "http://localhost:3001",           # Если используешь другой порт
    ],
    allow_credentials=True,                # Разрешить cookies
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Разрешенные методы
    allow_headers=["*"],                   # Разрешить все заголовки
)

# Теперь добавь свои routes
@app.get("/")
def read_root():
    return {"message": "AllHalal Backend API"}

# ... остальные routes ...
```

### Шаг 3: Проверь что middleware добавлен ПЕРЕД routes

⚠️ **ВАЖНО:** CORS middleware должен быть добавлен **ДО** определения routes!

**Правильно:**
```python
app = FastAPI()
app.add_middleware(CORSMiddleware, ...)  # ✅ Сначала middleware
@app.get("/")                             # ✅ Потом routes
def root():
    return {}
```

**Неправильно:**
```python
app = FastAPI()
@app.get("/")                             # ❌ Routes первыми
def root():
    return {}
app.add_middleware(CORSMiddleware, ...)  # ❌ Middleware после routes
```

### Шаг 4: Для production - более строгие настройки

Если хочешь быть более безопасным, можешь ограничить origins:

```python
import os

# Получи список разрешенных origins из переменных окружения
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "https://allhalal.info,https://www.allhalal.info"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,  # Используй список из env
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

### Шаг 5: Перезапусти backend

После изменений перезапусти backend:

```bash
# Если используешь uvicorn напрямую
uvicorn main:app --reload

# Если используешь Docker
docker-compose restart

# Если используешь systemd
sudo systemctl restart allhalal-backend

# Если на Heroku/Railway/etc - сделай redeploy
```

---

## 3. Проверка формата данных endpoints

### Шаг 1: Создай тестовые endpoints (если их еще нет)

Создай файл `app/routers/admin.py` или добавь в существующий:

```python
from fastapi import APIRouter
from datetime import datetime
from typing import Optional

router = APIRouter(prefix="/admin", tags=["admin"])

# Database Statistics
@router.get("/stats/database")
def get_database_stats():
    """
    Возвращает статистику базы данных
    """
    return {
        "total_products": 2270000,
        "halal_percentage": 46.6,
        "haram_count": 500000,
        "mushbooh_count": 700000,
        "last_updated": datetime.now().isoformat()  # ISO формат: "2025-12-18T17:00:00"
    }

# ETL Statistics
@router.get("/stats/etl")
def get_etl_stats():
    """
    Возвращает статистику ETL процессов
    """
    return {
        "last_run": datetime.now().isoformat(),
        "status": "success",  # или "error", "running"
        "products_processed": 50000,
        "errors": 0
    }

# API Statistics
@router.get("/stats/api")
def get_api_stats():
    """
    Возвращает статистику использования API
    """
    return {
        "total_scans": 15200,
        "scans_today": 450,
        "scans_this_week": 3200,
        "unique_users": 8500
    }

# System Health
@router.get("/health/system")
def get_system_health():
    """
    Возвращает статус здоровья системы
    """
    return {
        "status": "healthy",  # или "degraded", "down"
        "database_connected": True,
        "api_uptime": 86400,  # секунды (1 день)
        "version": "1.0.0"
    }
```

### Шаг 2: Подключи router к main app

В `main.py`:

```python
from fastapi import FastAPI
from app.routers import admin  # или где у тебя router

app = FastAPI()

# ... CORS middleware ...

app.include_router(admin.router)  # Подключи admin router
```

### Шаг 3: Проверь endpoints вручную

**Вариант 1: Через браузер**

Открой в браузере:
```
https://your-backend-api.com/admin/stats/database
```

Должен вернуться JSON:
```json
{
  "total_products": 2270000,
  "halal_percentage": 46.6,
  "haram_count": 500000,
  "mushbooh_count": 700000,
  "last_updated": "2025-12-18T17:00:00"
}
```

**Вариант 2: Через curl**

```bash
curl https://your-backend-api.com/admin/stats/database
```

**Вариант 3: Через Postman/Insomnia**

1. Создай GET запрос
2. URL: `https://your-backend-api.com/admin/stats/database`
3. Отправь запрос
4. Проверь что возвращается правильный JSON

### Шаг 4: Проверь формат всех endpoints

Проверь все 4 endpoint:

```bash
# Database stats
curl https://your-backend-api.com/admin/stats/database

# ETL stats
curl https://your-backend-api.com/admin/stats/etl

# API stats
curl https://your-backend-api.com/admin/stats/api

# System health
curl https://your-backend-api.com/admin/health/system
```

### Шаг 5: Проверь CORS headers

```bash
curl -I -X OPTIONS https://your-backend-api.com/admin/stats/database \
  -H "Origin: https://allhalal.info" \
  -H "Access-Control-Request-Method: GET"
```

Должны быть заголовки:
```
Access-Control-Allow-Origin: https://allhalal.info
Access-Control-Allow-Methods: GET, POST, ...
Access-Control-Allow-Credentials: true
```

---

## 4. Тестирование

### Шаг 1: Локальное тестирование

1. Запусти backend локально:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

2. Создай `.env.local` в корне Next.js проекта:
   ```bash
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ADMIN_PASSWORD=test123
   ```

3. Запусти Next.js:
   ```bash
   npm run dev
   ```

4. Открой `http://localhost:3000/admin`
5. Войди с паролем `test123`
6. Проверь что статистика загружается

### Шаг 2: Production тестирование

1. Убедись что `NEXT_PUBLIC_BACKEND_URL` установлен в Vercel
2. Убедись что backend доступен по этому URL
3. Открой `https://allhalal.info/admin`
4. Войди с паролем
5. Проверь что статистика загружается

### Шаг 3: Проверь в DevTools

1. Открой `https://allhalal.info/admin`
2. Открой DevTools (F12)
3. Перейди на вкладку **Network**
4. Обнови страницу
5. Найди запросы к `/api/admin/stats`
6. Проверь:
   - ✅ Status: 200 OK
   - ✅ Response содержит JSON с данными
   - ✅ Нет CORS ошибок

---

## 5. Troubleshooting

### Проблема: "Backend URL not configured"

**Причина:** `NEXT_PUBLIC_BACKEND_URL` не установлен

**Решение:**
1. Проверь что переменная добавлена в Vercel
2. Проверь что имя переменной точно `NEXT_PUBLIC_BACKEND_URL` (с `NEXT_PUBLIC_` префиксом!)
3. Сделай redeploy проекта

---

### Проблема: CORS error в браузере

**Ошибка:**
```
Access to fetch at 'https://backend.com/admin/stats/database' 
from origin 'https://allhalal.info' has been blocked by CORS policy
```

**Причина:** Backend не разрешает запросы с `allhalal.info`

**Решение:**
1. Проверь что CORS middleware добавлен в backend
2. Проверь что `https://allhalal.info` в списке `allow_origins`
3. Проверь что middleware добавлен ПЕРЕД routes
4. Перезапусти backend

**Проверка:**
```bash
curl -I -X OPTIONS https://your-backend.com/admin/stats/database \
  -H "Origin: https://allhalal.info" \
  -H "Access-Control-Request-Method: GET"
```

Должен вернуть `Access-Control-Allow-Origin: https://allhalal.info`

---

### Проблема: "Failed to fetch" или Network Error

**Причина:** Backend недоступен или URL неправильный

**Решение:**
1. Проверь что backend запущен:
   ```bash
   curl https://your-backend-api.com/admin/health/system
   ```
2. Проверь что URL правильный в Vercel (без trailing slash)
3. Проверь что backend доступен из интернета (не только локально)

---

### Проблема: "Unauthorized" (401)

**Причина:** Сессия истекла или не авторизован

**Решение:**
1. Выйди и войди снова в админ-панель
2. Проверь что cookie `admin_session` установлен
3. Проверь что сессия не истекла (24 часа)

---

### Проблема: Данные не отображаются

**Причина:** Формат данных не соответствует ожидаемому

**Решение:**
1. Открой DevTools → Network
2. Найди запрос к `/api/admin/stats`
3. Посмотри Response - какой формат данных возвращает backend
4. Сравни с ожидаемым форматом из документации
5. Исправь backend чтобы возвращал правильный формат

**Пример правильного формата:**
```json
{
  "database": {
    "total_products": 2270000,
    "halal_percentage": 46.6,
    "haram_count": 500000,
    "mushbooh_count": 700000,
    "last_updated": "2025-12-18T17:00:00Z"
  }
}
```

---

### Проблема: Endpoint возвращает 404

**Причина:** Endpoint не существует или путь неправильный

**Решение:**
1. Проверь что endpoint существует в backend коде
2. Проверь что router подключен к main app
3. Проверь что prefix правильный (`/admin/stats/database`)
4. Проверь в браузере напрямую: `https://your-backend.com/admin/stats/database`

---

## ✅ Checklist

Перед тем как считать что все настроено:

- [ ] `NEXT_PUBLIC_BACKEND_URL` добавлен в Vercel
- [ ] Значение правильное (реальный URL backend)
- [ ] Проект пересобран (redeploy)
- [ ] CORS middleware добавлен в backend
- [ ] `https://allhalal.info` в списке `allow_origins`
- [ ] Backend перезапущен после изменений
- [ ] Все 4 endpoints возвращают правильный JSON
- [ ] CORS headers присутствуют в ответах
- [ ] Локально все работает
- [ ] Production все работает
- [ ] Нет ошибок в DevTools Console

---

## 🆘 Нужна помощь?

Если что-то не работает:

1. **Проверь логи:**
   - Vercel: Dashboard → Deployments → Logs
   - Backend: логи сервера где запущен backend

2. **Проверь DevTools:**
   - Console - ошибки JavaScript
   - Network - запросы и ответы

3. **Проверь что backend доступен:**
   ```bash
   curl https://your-backend-api.com/admin/health/system
   ```

4. **Проверь формат данных:**
   ```bash
   curl https://your-backend-api.com/admin/stats/database | jq
   ```

---

**Готово!** После выполнения всех шагов админ-панель должна показывать реальные данные из backend! 🎉
