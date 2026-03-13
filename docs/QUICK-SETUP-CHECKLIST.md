# 📋 Краткая шпаргалка для setup

## ✅ ЧТО ВАМ НУЖНО СДЕЛАТЬ СЕЙЧАС

### 1️⃣ Upstash (5 минут)
```
https://console.upstash.com
→ Sign up с GitHub
→ Create Database
   Name: allhalal-news-cache
   Region: us-east-1
   Plan: Free
→ Copy REST API credentials (2 штуки)
```

**Сохраните в блокнот:**
```
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=AY...
```

---

### 2️⃣ Генерация секрета (1 минута)
```bash
# В терминале (Mac) или Git Bash (Windows):
openssl rand -hex 32
```

**Добавьте в блокнот:**
```
CRON_SECRET=7a8f9b2c...
```

---

### 3️⃣ Vercel (3 минуты)
```
https://vercel.com
→ Ваш проект (AllHalal-Web)
→ Settings → Environment Variables
→ Add New (3 раза):
```

**Добавьте все 3 переменные из блокнота**

Галочки: ☑ Production ☑ Preview ☑ Development

**Redeploy** (вверху будет баннер)

---

### 4️⃣ Hetzner Cron (для Cursor агента)

**Скопируйте и отправьте Cursor агенту:**

```
Setup AllHalal cron on Hetzner.

CRON_SECRET: ВСТАВЬТЕ_ВАШЕ_ЗНАЧЕНИЕ_СЮДА

Commands:
1. apt update && apt install -y curl jq
2. echo "CRON_SECRET=ВСТАВЬТЕ_ЗНАЧЕНИЕ" > /root/.allhalal_cron_env
3. chmod 600 /root/.allhalal_cron_env
4. (crontab -l 2>/dev/null; echo '*/30 * * * * . /root/.allhalal_cron_env && curl -s -H "Authorization: Bearer $CRON_SECRET" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1') | crontab -
5. Test: . /root/.allhalal_cron_env && curl -H "Authorization: Bearer $CRON_SECRET" https://allhalal.info/api/cron/update-news

Expected: {"success":true,...}
```

---

## 🔍 Проверка работы

**Через 30-60 минут:**

### На Hetzner:
```bash
tail /var/log/allhalal-cron.log
# Должны быть JSON с "success": true
```

### На сайте:
```
https://allhalal.info/en/news
→ F12 (Developer Tools)
→ Console
→ Reload (Ctrl+R)
→ Смотрим: "✅ Cache hit (upstash)"
```

---

## 📚 Полная инструкция

**См. файл:** `docs/STEP-BY-STEP-SETUP.md`

- Скриншоты каждого шага
- Что делать если ошибки
- Пояснения для новичков

---

## ❓ Нужна помощь?

**Если застряли на каком-то шаге - напишите мне:**
- На каком шаге проблема
- Что видите на экране
- Текст ошибки (если есть)

Я помогу!
