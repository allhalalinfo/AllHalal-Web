# 🔍 Как узнать URL Backend API?

## 📋 Варианты определения URL

### 1️⃣ Спросить у Backend разработчика

Если у тебя есть backend разработчик или команда:

**Вопросы которые нужно задать:**
- "Какой URL у нашего Backend API?"
- "Где развернут FastAPI backend?"
- "Какой домен/URL используется для API endpoints?"
- "Есть ли документация по API endpoints?"

**Что они должны дать:**
- URL типа: `https://api.allhalal.info` или `https://backend.allhalal.info`
- Или URL от хостинга: `https://allhalal-backend.herokuapp.com`, `https://allhalal-api.railway.app`, и т.д.

---

### 2️⃣ Проверить где развернут Backend

#### Если Backend на Heroku:
1. Зайди на [heroku.com](https://heroku.com)
2. Выбери приложение с backend
3. Нажми **Settings**
4. Найди **Domains** или **App URL**
5. URL будет типа: `https://your-app-name.herokuapp.com`

#### Если Backend на Railway:
1. Зайди на [railway.app](https://railway.app)
2. Выбери проект с backend
3. Найди **Settings** → **Networking**
4. URL будет в разделе **Public Domain**

#### Если Backend на Render:
1. Зайди на [render.com](https://render.com)
2. Выбери сервис с backend
3. URL будет в разделе **Settings** → **Public URL**

#### Если Backend на DigitalOcean/AWS/GCP:
- Проверь в панели управления хостинга
- Обычно это IP адрес или домен который ты настроил

#### Если Backend на собственном сервере:
- URL будет домен который ты настроил для backend
- Например: `https://api.allhalal.info` или `https://backend.allhalal.info`

---

### 3️⃣ Проверить в документации Backend проекта

Если у тебя есть доступ к репозиторию backend:

**Ищи файлы:**
- `README.md` - обычно там указан URL для production
- `.env.example` или `.env.production` - там может быть `API_URL` или `BASE_URL`
- `docker-compose.yml` - там могут быть настройки доменов
- `vercel.json` или `railway.json` - конфигурация деплоя

**Примеры что искать:**
```bash
# В README.md
API_URL=https://api.allhalal.info

# В .env.example
BASE_URL=https://backend.allhalal.info

# В docker-compose.yml
environment:
  - API_URL=https://api.allhalal.info
```

---

### 4️⃣ Проверить в Vercel (если Backend там)

Если backend тоже на Vercel:

1. Зайди на [vercel.com](https://vercel.com)
2. Найди проект с backend (может называться `AllHalal-Backend` или похоже)
3. Открой проект
4. URL будет в разделе **Deployments** → последний deployment → **Domains**
5. Или в **Settings** → **Domains**

---

### 5️⃣ Проверить через DNS/Домен

Если у тебя есть домен `allhalal.info`:

**Возможные варианты:**
- `https://api.allhalal.info` (поддомен api)
- `https://backend.allhalal.info` (поддомен backend)
- `https://allhalal.info/api` (путь на основном домене)

**Как проверить:**
```bash
# Проверь поддомены
curl https://api.allhalal.info/health
curl https://backend.allhalal.info/health

# Проверь основной домен с путем
curl https://allhalal.info/api/health
```

---

### 6️⃣ Если Backend еще не развернут

Если backend еще не развернут, нужно сначала его развернуть:

**Варианты развертывания:**

1. **Vercel** (простой вариант):
   - Подключи репозиторий backend к Vercel
   - Vercel автоматически даст URL типа `https://your-app.vercel.app`

2. **Railway** (рекомендуется для FastAPI):
   - Подключи GitHub репозиторий
   - Railway автоматически развернет и даст URL

3. **Render**:
   - Подключи репозиторий
   - Выбери "Web Service"
   - Получишь URL типа `https://your-app.onrender.com`

4. **Heroku**:
   - Подключи репозиторий
   - Heroku даст URL типа `https://your-app.herokuapp.com`

**После развертывания:**
- Скопируй URL который дал хостинг
- Это и будет твой `NEXT_PUBLIC_BACKEND_URL`

---

## 🧪 Как проверить что URL правильный?

После того как узнал URL, проверь что он работает:

### Шаг 1: Проверь что Backend доступен

```bash
# Замени на твой URL
curl https://your-backend-url.com/health

# Или просто открой в браузере:
https://your-backend-url.com/health
```

**Должен вернуться JSON** типа:
```json
{
  "status": "ok"
}
```

### Шаг 2: Проверь Admin endpoints

```bash
# Проверь что endpoints существуют
curl https://your-backend-url.com/admin/stats/database
curl https://your-backend-url.com/admin/health/system
```

**Если получаешь 404** - endpoints еще не созданы (см. инструкцию по созданию endpoints)

**Если получаешь CORS error** - нужно настроить CORS (см. инструкцию по CORS)

---

## 📝 Чеклист: Что нужно узнать

- [ ] URL где развернут Backend (например: `https://api.allhalal.info`)
- [ ] Backend доступен и отвечает на запросы
- [ ] Endpoints `/admin/stats/*` существуют
- [ ] CORS настроен правильно

---

## 🆘 Что делать если не знаешь URL?

### Вариант 1: Спросить у команды
- Напиши backend разработчику
- Или в общий чат команды
- Или создай issue в репозитории backend

### Вариант 2: Проверить самому
- Зайди на хостинг где развернут backend (Heroku, Railway, Render, Vercel)
- Найди URL в настройках проекта

### Вариант 3: Временно использовать localhost
Для локальной разработки можно использовать:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Но для production нужен реальный URL!

---

## ✅ После того как узнал URL

1. **Добавь в Vercel:**
   ```
   Settings → Environment Variables → Add New
   Name: NEXT_PUBLIC_BACKEND_URL
   Value: https://твой-backend-url.com
   ```

2. **Redeploy проект**

3. **Проверь что работает:**
   - Открой `https://allhalal.info/admin`
   - Войди с паролем
   - Проверь что статистика загружается

---

## 💡 Примеры реальных URL

Вот как могут выглядеть реальные URL:

```
✅ Правильно:
https://api.allhalal.info
https://backend.allhalal.info
https://allhalal-api.railway.app
https://allhalal-backend.herokuapp.com
https://allhalal-backend.onrender.com

❌ Неправильно (localhost только для разработки):
http://localhost:8000  (только локально!)
```

---

**Главное:** URL должен быть доступен из интернета (не только локально), и должен работать HTTPS (для production).

---

**Нужна помощь?** Если не можешь найти URL, напиши мне и я помогу разобраться! 🚀
