# Пошаговая инструкция для новичка

## 📍 Где вы сейчас

У вас есть:
- ✅ Код в репозитории (GitHub)
- ✅ Сайт на Vercel (allhalal.info)
- ✅ Hetzner сервер (где-то есть)
- ❌ Еще НЕТ: Upstash Redis, env vars, cron

**Текущий статус:** Новости работают медленно (8-15 секунд), нужно ускорить.

---

## 🎯 Что мы будем делать (общая картина)

```
Шаг 1: Upstash     → Создать бесплатную Redis базу (5 мин)
Шаг 2: Vercel      → Добавить 3 переменные (3 мин)  
Шаг 3: Hetzner     → Настроить автоматическое обновление (5 мин)
Шаг 4: Тест        → Проверить что работает (2 мин)
```

**Общее время: ~15 минут**

---

# ШАГ 1: Создать Upstash Redis (5 минут)

## Что такое Upstash?
Это сервис который хранит данные (кэш новостей) в облаке. Бесплатно.

## 1.1 Регистрация

### Откройте браузер:
```
https://console.upstash.com
```

### Вы увидите экран "Sign Up":
- Нажмите **"Continue with GitHub"** (самый простой способ)
- Или **"Continue with Google"** (если нет GitHub)

### После входа вы попадете в Dashboard:
```
┌─────────────────────────────────────┐
│ Upstash Console                     │
│                                     │
│ [Create Database]  [Create Kafka]  │
│                                     │
│ You don't have any databases yet    │
└─────────────────────────────────────┘
```

---

## 1.2 Создание базы данных

### Нажмите кнопку **"Create Database"**

Вы увидите форму. Заполните:

```
Name:          allhalal-news-cache
              ^^^^^^^^^^^^^^^^^^^
              (любое имя, латиницей)

Type:          ● Redis  ○ Kafka
              ^^^^^^^^^^^
              (Redis должен быть выбран)

Region:        [выпадающий список]
              
              Выберите ближайший к вашему Vercel региону:
              
              Если Vercel в USA → выберите "us-east-1" (Virginia)
              Если Vercel в Europe → выберите "eu-west-1" (Ireland)
              Если не знаете → выберите "us-east-1"

Plan:          ● Free  ○ Pay as you go
              ^^^^^^^
              (Free должен быть выбран)

TLS:           ☑ Enabled (галочка должна стоять!)
```

### Нажмите **"Create"** внизу

---

## 1.3 Получение credentials (токенов)

После создания вы увидите **страницу с деталями базы**:

```
┌─────────────────────────────────────────────┐
│ allhalal-news-cache                         │
│                                             │
│ Endpoint                                    │
│ ┌─────────────────────────────────────────┐│
│ │ upstash-redis-xxxxx.upstash.io          ││
│ │ Port: 6379                               ││
│ └─────────────────────────────────────────┘│
│                                             │
│ REST API                                    │
│ ┌─────────────────────────────────────────┐│
│ │ UPSTASH_REDIS_REST_URL                  ││
│ │ https://usw1-xxxxx-xxxx.upstash.io      ││ ← СКОПИРУЙТЕ ЭТО
│ │                                          ││
│ │ UPSTASH_REDIS_REST_TOKEN                ││
│ │ AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx        ││ ← И ЭТО
│ └─────────────────────────────────────────┘│
│                                             │
│ [Copy]  [Show Token]                        │
└─────────────────────────────────────────────┘
```

### ⚠️ ВАЖНО: Нужны **REST API** credentials (не обычные!)

### Скопируйте в блокнот (Notepad):
```
UPSTASH_REDIS_REST_URL=https://usw1-xxxxx-xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Сохраните этот файл!** Он понадобится в следующем шаге.

---

# ШАГ 2: Добавить переменные в Vercel (3 минуты)

## Что такое Vercel?
Это где живет ваш сайт allhalal.info. Нужно дать ему доступ к Upstash.

## 2.1 Сгенерировать CRON_SECRET

### Откройте терминал на вашем компьютере:

**Mac:**
- Нажмите `Cmd + Space`
- Напишите "Terminal"
- Нажмите Enter

**Windows (если есть Git Bash):**
- Найдите "Git Bash" в меню Пуск
- Откройте

### В терминале напишите:
```bash
openssl rand -hex 32
```

### Вы получите что-то вроде:
```
7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
```

### Скопируйте эту строку в блокнот, добавьте:
```
CRON_SECRET=7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
```

**Теперь у вас в блокноте 3 строки:**
```
CRON_SECRET=7a8f9b2c...
UPSTASH_REDIS_REST_URL=https://usw1-...
UPSTASH_REDIS_REST_TOKEN=AYxxxxx...
```

---

## 2.2 Добавить в Vercel

### Откройте браузер:
```
https://vercel.com
```

### Войдите в аккаунт (тот же что использовали для allhalal.info)

### Найдите ваш проект:
```
Dashboard → Projects → AllHalal-Web (или как называется)
```

### Откройте Settings:
```
┌─────────────────────────────────────┐
│ AllHalal-Web                        │
│                                     │
│ [Overview] [Deployments] [Settings] │ ← Нажмите Settings
└─────────────────────────────────────┘
```

### В левом меню найдите:
```
Settings
├─ General
├─ Domains
├─ Environment Variables  ← Нажмите сюда
├─ Git
└─ ...
```

### Вы увидите страницу с кнопкой "Add New"

---

## 2.3 Добавить 3 переменные

### Переменная 1: CRON_SECRET

Нажмите **"Add New"** → выберите **"Plaintext"**

```
Key (название):
┌─────────────────────────────────┐
│ CRON_SECRET                     │
└─────────────────────────────────┘

Value (значение):
┌─────────────────────────────────┐
│ 7a8f9b2c3d4e5f6a7b8c9d0e1f2a... │ ← Вставьте из блокнота
└─────────────────────────────────┘

Environments:
☑ Production
☑ Preview  
☑ Development
(отметьте все 3 галочки!)
```

Нажмите **"Save"**

---

### Переменная 2: UPSTASH_REDIS_REST_URL

Нажмите **"Add New"** → выберите **"Plaintext"**

```
Key:
┌─────────────────────────────────┐
│ UPSTASH_REDIS_REST_URL          │
└─────────────────────────────────┘

Value:
┌─────────────────────────────────┐
│ https://usw1-xxxxx.upstash.io   │ ← Вставьте из блокнота
└─────────────────────────────────┘

Environments:
☑ Production
☑ Preview
☑ Development
```

Нажмите **"Save"**

---

### Переменная 3: UPSTASH_REDIS_REST_TOKEN

Нажмите **"Add New"** → выберите **"Plaintext"**

```
Key:
┌─────────────────────────────────┐
│ UPSTASH_REDIS_REST_TOKEN        │
└─────────────────────────────────┘

Value:
┌─────────────────────────────────┐
│ AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxx │ ← Вставьте из блокнота
└─────────────────────────────────┘

Environments:
☑ Production
☑ Preview
☑ Development
```

Нажмите **"Save"**

---

## 2.4 Redeploy (перезапуск сайта)

### После добавления переменных, вверху будет баннер:
```
┌────────────────────────────────────────────────┐
│ ⚠️ Environment variables changed               │
│ Redeploy to apply changes                      │
│                                [Redeploy Now]  │ ← Нажмите
└────────────────────────────────────────────────┘
```

### Если баннера нет:
1. Вернитесь на главную проекта
2. Нажмите **"Deployments"** (вверху)
3. Найдите последний deployment
4. Нажмите **"..."** (три точки)
5. Выберите **"Redeploy"**

### Подождите 1-2 минуты пока идет deployment

---

# ШАГ 3: Настроить Hetzner Cron (для Cursor агента)

## Что сейчас делать?

### У вас есть 2 варианта:

---

## ВАРИАНТ A: Дать команды Cursor агенту (РЕКОМЕНДУЮ)

### 3.1 Подготовьте информацию для агента

Откройте ваш блокнот и **скопируйте значение CRON_SECRET**:
```
7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
```

### 3.2 Скажите Cursor агенту:

```
Setup Hetzner cron for AllHalal news updates.

Context:
- Project: AllHalal.info news caching system
- Endpoint: https://allhalal.info/api/cron/update-news
- Auth: Bearer token (I will provide)
- Frequency: Every 30 minutes
- Log: /var/log/allhalal-cron.log

CRON_SECRET (для Authorization header):
7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
^^^ ЗАМЕНИТЕ НА СВОЙ

Steps needed:
1. Install curl and jq (if not installed)
2. Create env file: /root/.allhalal_cron_env with CRON_SECRET
3. Set permissions: chmod 600 /root/.allhalal_cron_env
4. Add cron job: */30 * * * * (load env, curl endpoint, log output)
5. Setup log rotation for /var/log/allhalal-cron.log (keep 7 days)
6. Test the setup by running curl manually
7. Verify cron is scheduled: crontab -l

Use these exact commands:

# 1. Install dependencies
apt update && apt install -y curl jq

# 2. Create env file
cat > /root/.allhalal_cron_env <<'EOF'
CRON_SECRET=7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
EOF

# 3. Set permissions
chmod 600 /root/.allhalal_cron_env

# 4. Add cron job
(crontab -l 2>/dev/null; echo "*/30 * * * * . /root/.allhalal_cron_env && curl -s -H \"Authorization: Bearer \$CRON_SECRET\" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1") | crontab -

# 5. Setup log rotation
cat > /etc/logrotate.d/allhalal-cron <<'EOF'
/var/log/allhalal-cron.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 0640 root root
}
EOF

# 6. Test manually
. /root/.allhalal_cron_env && curl -H "Authorization: Bearer $CRON_SECRET" https://allhalal.info/api/cron/update-news

# 7. Verify cron
crontab -l

After completing, report:
- Cron job scheduled: yes/no
- Test curl output: success/error
- Log file created: yes/no
```

**Просто скопируйте весь этот блок и отправьте Cursor агенту.**

---

## ВАРИАНТ B: Сделать вручную через SSH (если нет Cursor агента)

### 3.1 Подключитесь к Hetzner

Откройте терминал и введите:
```bash
ssh root@YOUR_HETZNER_IP
```

Замените `YOUR_HETZNER_IP` на IP вашего сервера.

### 3.2 Выполните команды по одной:

```bash
# Установить инструменты
apt update && apt install -y curl jq

# Создать файл с секретом
nano /root/.allhalal_cron_env
```

В nano вставьте:
```
CRON_SECRET=7a8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a
```
(замените на ваш реальный CRON_SECRET)

Сохраните: `Ctrl+X`, потом `Y`, потом `Enter`

```bash
# Защитить файл
chmod 600 /root/.allhalal_cron_env

# Добавить cron job
crontab -e
```

В открывшемся редакторе, в самом конце добавьте:
```
*/30 * * * * . /root/.allhalal_cron_env && curl -s -H "Authorization: Bearer $CRON_SECRET" https://allhalal.info/api/cron/update-news >> /var/log/allhalal-cron.log 2>&1
```

Сохраните: `Ctrl+X`, потом `Y`, потом `Enter`

```bash
# Настроить ротацию логов
nano /etc/logrotate.d/allhalal-cron
```

Вставьте:
```
/var/log/allhalal-cron.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
```

Сохраните: `Ctrl+X`, потом `Y`, потом `Enter`

```bash
# Тест
. /root/.allhalal_cron_env && curl -H "Authorization: Bearer $CRON_SECRET" https://allhalal.info/api/cron/update-news
```

Вы должны увидеть JSON с `"success": true`

---

# ШАГ 4: Проверка (2 минуты)

## 4.1 Проверить что cron работает

### На Hetzner (в терминале):
```bash
# Проверить что cron добавлен
crontab -l

# Должны увидеть:
# */30 * * * * . /root/.allhalal_cron_env && curl ...
```

### Подождать 30 минут, потом проверить лог:
```bash
tail -f /var/log/allhalal-cron.log
```

Должны увидеть JSON responses с `"success": true`

---

## 4.2 Проверить сайт

### Откройте браузер:
```
https://allhalal.info/en/news
```

### Откройте Developer Tools (F12)

### Во вкладке Console смотрите логи

### Перезагрузите страницу (Ctrl+R)

### Должны увидеть:
```
✅ Cache hit (upstash): news:aggregated:safe-false
```

Если видите это - **ВСЕ РАБОТАЕТ!** 🎉

---

# 🎯 ИТОГО: Что вы сделали

```
✅ Шаг 1: Upstash     → Создали Redis базу
✅ Шаг 2: Vercel      → Добавили 3 переменные
✅ Шаг 3: Hetzner     → Настроили cron (вручную или через агента)
✅ Шаг 4: Проверка    → Убедились что работает
```

---

# ❓ Что делать если что-то не работает?

## Проблема: "CRON_SECRET not configured"
**Решение:** Вернитесь к Шагу 2.4, сделайте Redeploy в Vercel

## Проблема: "Unauthorized"
**Решение:** CRON_SECRET в Vercel и на Hetzner должны быть одинаковые. Проверьте:
```bash
cat /root/.allhalal_cron_env
```

## Проблема: Cron не запускается
**Решение:** 
```bash
# Проверить статус cron service
systemctl status cron

# Если stopped:
systemctl start cron
```

## Проблема: Не вижу "Cache hit" на сайте
**Решение:** Подождите 30 минут после первого запуска cron

---

# 📚 Что дальше?

После того как все заработает:
1. ✅ Оставьте работать 24 часа
2. ✅ Проверьте логи
3. ✅ Измерьте реальную скорость сайта
4. ✅ Переходите к Week 1 Day 3: Content Audit

---

**Сохраните этот файл!** Он пригодится если нужно будет настраивать заново.
