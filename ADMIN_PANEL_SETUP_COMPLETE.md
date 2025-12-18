# ✅ Admin Panel Setup - Готово к подключению!

## 🎯 Что нужно сделать СЕЙЧАС

### 1️⃣ Добавить Environment Variable в Vercel

**Шаги:**
1. Зайди на [vercel.com](https://vercel.com)
2. Выбери проект **AllHalal-Web**
3. **Settings** → **Environment Variables**
4. Нажми **Add New**
5. Заполни:
   - **Name:** `NEXT_PUBLIC_BACKEND_URL`
   - **Value:** `https://api.allhalal.info`
   - ✅ **Production**
   - ✅ **Preview**
   - ✅ **Development**
6. **Save**
7. **Redeploy** проект (или сделай любой commit)

---

### 2️⃣ Проверить что Backend CORS настроен

Backend должен разрешать запросы с `https://allhalal.info`.

**Проверь в FastAPI коде:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://allhalal.info",        # ✅ Должен быть
        "https://www.allhalal.info",    # ✅ Должен быть
        "https://*.vercel.app",         # ✅ Для preview
        "http://localhost:3000",        # ✅ Для локальной разработки
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

**Если CORS не настроен** - добавь этот код в `main.py` перед routes и перезапусти FastAPI.

---

### 3️⃣ Проверить что endpoints работают

**Быстрый тест:**
```bash
# Проверь что backend доступен
curl https://api.allhalal.info/admin/stats/database

# Должен вернуться JSON с данными
```

**Если получаешь JSON** - всё готово! ✅

**Если получаешь ошибку** - проверь что:
- Backend запущен
- Caddy правильно проксирует запросы
- Endpoints существуют в коде

---

## 🎉 После настройки

### Frontend Admin Panel будет доступен по:
- **Production:** `https://allhalal.info/admin`
- **Local:** `http://localhost:3000/admin`

### Что будет работать:
- ✅ Автоматическая загрузка статистики из backend
- ✅ Табы: Overview, Database, ETL, API, Health
- ✅ Автообновление каждые 30 секунд
- ✅ Обработка ошибок с кнопкой Retry
- ✅ Форматирование данных (2.27M, 15.2K, и т.д.)

---

## 📊 Два Admin Panel

У тебя теперь **два** admin panel:

### 1. Backend Admin Panel (уже работает)
- **URL:** `https://api.allhalal.info/admin/`
- **Особенности:** Полный функционал, scripts, TODO, графики
- **Использование:** Для полного управления системой

### 2. Frontend Admin Panel (после настройки)
- **URL:** `https://allhalal.info/admin`
- **Особенности:** Интегрирован с сайтом, password-protected, автообновление
- **Использование:** Для быстрого просмотра статистики

**Оба могут работать одновременно!** 🎯

---

## ✅ Checklist

- [ ] `NEXT_PUBLIC_BACKEND_URL=https://api.allhalal.info` добавлен в Vercel
- [ ] Проект пересобран (redeploy)
- [ ] CORS настроен в FastAPI (проверь `allow_origins`)
- [ ] Backend endpoints доступны (проверь через curl)
- [ ] Frontend admin panel открывается (`https://allhalal.info/admin`)
- [ ] Статистика загружается без ошибок

---

## 🐛 Если что-то не работает

### Проблема: "Backend URL not configured"
**Решение:** Добавь `NEXT_PUBLIC_BACKEND_URL` в Vercel и сделай redeploy

### Проблема: CORS error в браузере
**Решение:** Добавь `https://allhalal.info` в `allow_origins` в FastAPI и перезапусти

### Проблема: "Failed to fetch"
**Решение:** Проверь что backend доступен: `curl https://api.allhalal.info/admin/stats/database`

### Проблема: Данные не показываются
**Решение:** Открой DevTools → Network → проверь что запросы возвращают JSON

---

## 📚 Документация

- **Подробная инструкция:** `ADMIN_BACKEND_SETUP_GUIDE.md`
- **Быстрая справка:** `ADMIN_SETUP_QUICK_REFERENCE.md`
- **Backend конфигурация:** `BACKEND_CONFIGURATION.md`

---

**Готово!** После выполнения этих шагов frontend admin panel будет работать! 🚀
