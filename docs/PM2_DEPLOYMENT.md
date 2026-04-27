# 🚀 PM2 Deployment Guide

Руководство по деплою AllHalal Web на Hetzner с использованием PM2.

## ✅ Что уже настроено

- ✅ Node.js v20.20.2
- ✅ npm v10.8.2
- ✅ PM2 v6.0.14
- ✅ Git v2.43.0
- ✅ GitHub Actions secrets
- ✅ Директория `/home/allhalal/Allhalal-Web`

## 🔑 Настройка SSH доступа к GitHub

Перед первым деплоем нужно настроить SSH ключ на сервере для доступа к репозиторию.

### 1. Создание SSH ключа на сервере

Подключитесь к серверу и выполните:

```bash
# Подключаемся к серверу
ssh allhalal@49.12.186.18

# Создаем SSH ключ
ssh-keygen -t ed25519 -C "allhalal@hetzner-server" -f ~/.ssh/github_allhalal

# Показываем публичный ключ (нужно скопировать)
cat ~/.ssh/github_allhalal.pub
```

**Скопируйте весь вывод** (начинается с `ssh-ed25519`).

### 2. Добавление SSH ключа в GitHub

#### Вариант A: Добавить как Deploy Key (рекомендуется)

1. Откройте https://github.com/allhalalinfo/AllHalal-Web/settings/keys
2. Нажмите **Add deploy key**
3. Title: `Hetzner Production Server`
4. Key: вставьте скопированный публичный ключ
5. ✅ Отметьте **Allow write access** (если нужен push)
6. Нажмите **Add key**

#### Вариант B: Добавить в личные SSH ключи

1. Откройте https://github.com/settings/keys
2. Нажмите **New SSH key**
3. Title: `Hetzner Server`
4. Key: вставьте скопированный публичный ключ
5. Нажмите **Add SSH key**

### 3. Настройка SSH конфигурации на сервере

```bash
# На сервере создаем/редактируем SSH config
nano ~/.ssh/config
```

Добавьте:

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/github_allhalal
  IdentitiesOnly yes
```

Сохраните (Ctrl+O, Enter, Ctrl+X).

```bash
# Устанавливаем правильные права
chmod 600 ~/.ssh/config
chmod 600 ~/.ssh/github_allhalal

# Тестируем соединение
ssh -T git@github.com
```

Должно вывести: `Hi allhalalinfo! You've successfully authenticated...`

---

## 🎯 Первый деплой (ручной)

Выполните на сервере:

```bash
# Переходим в директорию
cd /home/allhalal/Allhalal-Web

# Клонируем репозиторий
git clone git@github.com:allhalalinfo/AllHalal-Web.git .

# Создаем .env файл
cp .env.example .env

# Редактируем переменные окружения
nano .env
```

Минимальные настройки в `.env`:

```bash
NEXT_PUBLIC_API_URL=https://api.allhalal.info
NODE_ENV=production
PORT=3000
```

Продолжаем деплой:

```bash
# Устанавливаем зависимости
npm ci --only=production

# Собираем приложение
npm run build

# Запускаем через PM2
pm2 start ecosystem.config.js

# Сохраняем конфигурацию PM2
pm2 save

# Проверяем статус
pm2 status

# Проверяем логи
pm2 logs allhalal-web

# Проверяем health check
curl http://localhost:3000/api/health
```

Если все работает, вы увидите:

```json
{
  "status": "healthy",
  "timestamp": "2026-04-28T00:00:00.000Z",
  "uptime": 123
}
```

---

## 🔄 Автоматический деплой через GitHub Actions

После настройки SSH ключа, автоматический деплой работает так:

1. **Вы делаете изменения локально**:
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **GitHub Actions автоматически**:
   - Подключается к серверу по SSH
   - Обновляет код (`git pull`)
   - Устанавливает зависимости (`npm ci`)
   - Собирает приложение (`npm run build`)
   - Перезапускает PM2 (`pm2 reload allhalal-web`)
   - Проверяет health check
   - При ошибке делает rollback

3. **Вы видите результат в GitHub Actions**:
   - https://github.com/allhalalinfo/AllHalal-Web/actions

---

## 🛠️ Управление PM2

### Основные команды

```bash
# Статус всех приложений
pm2 status

# Логи в реальном времени
pm2 logs allhalal-web

# Только ошибки
pm2 logs allhalal-web --err

# Последние 100 строк логов
pm2 logs allhalal-web --lines 100

# Перезапуск
pm2 reload allhalal-web

# Остановка
pm2 stop allhalal-web

# Запуск
pm2 start allhalal-web

# Удаление из PM2
pm2 delete allhalal-web

# Мониторинг ресурсов
pm2 monit

# Детальная информация
pm2 show allhalal-web
```

### Автозапуск при перезагрузке сервера

Уже настроено! Но на всякий случай:

```bash
# Сохранить текущие процессы
pm2 save

# Настроить автозапуск
pm2 startup

# Выполните команду, которую выдаст pm2 startup
```

---

## 🌐 Настройка Nginx (для домена)

Чтобы сайт был доступен по домену `allhalal.info`, нужен Nginx.

### 1. Установка Nginx

```bash
# Устанавливаем Nginx
sudo apt update
sudo apt install nginx -y

# Проверяем статус
sudo systemctl status nginx
```

### 2. Создание конфигурации

```bash
# Создаем конфиг для сайта
sudo nano /etc/nginx/sites-available/allhalal.info
```

Вставьте:

```nginx
# HTTP → HTTPS редирект
server {
    listen 80;
    listen [::]:80;
    server_name allhalal.info www.allhalal.info;

    # ACME challenge для Let's Encrypt
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }

    # Редирект на HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS сервер
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name allhalal.info www.allhalal.info;

    # SSL сертификаты (настроим позже)
    ssl_certificate /etc/letsencrypt/live/allhalal.info/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/allhalal.info/privkey.pem;

    # SSL настройки
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Редирект www → без www
    if ($host = www.allhalal.info) {
        return 301 https://allhalal.info$request_uri;
    }

    # Проксирование в Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90s;
    }
}
```

### 3. Получение SSL сертификата

```bash
# Устанавливаем Certbot
sudo apt install certbot python3-certbot-nginx -y

# Получаем сертификат
sudo certbot --nginx -d allhalal.info -d www.allhalal.info

# Проверяем автообновление
sudo certbot renew --dry-run
```

### 4. Активация конфигурации

```bash
# Создаем символическую ссылку
sudo ln -s /etc/nginx/sites-available/allhalal.info /etc/nginx/sites-enabled/

# Проверяем конфигурацию
sudo nginx -t

# Перезапускаем Nginx
sudo systemctl reload nginx
```

### 5. Обновление DNS

Убедитесь, что DNS записи указывают на ваш сервер:

```
A    allhalal.info      →  49.12.186.18
A    www.allhalal.info  →  49.12.186.18
```

---

## 📊 Мониторинг

### PM2 Web Dashboard (опционально)

```bash
# Установить PM2 Plus (бесплатно)
pm2 plus

# Следуйте инструкциям для регистрации
# Получите красивый dashboard с метриками
```

### Логи

```bash
# Логи приложения
pm2 logs allhalal-web

# Логи Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Системные логи
journalctl -u nginx -f
```

### Использование ресурсов

```bash
# CPU и память процессов
pm2 monit

# Общее использование
htop

# Диск
df -h
```

---

## 🔧 Troubleshooting

### PM2 приложение не запускается

```bash
# Проверьте логи
pm2 logs allhalal-web --err

# Проверьте переменные окружения
pm2 show allhalal-web

# Попробуйте запустить вручную
cd /home/allhalal/Allhalal-Web
npm start
```

### Ошибка при git pull

```bash
# Проверьте SSH ключ
ssh -T git@github.com

# Если не работает, проверьте конфигурацию
cat ~/.ssh/config

# Проверьте права
ls -la ~/.ssh/
```

### 502 Bad Gateway в Nginx

```bash
# Проверьте, что Next.js запущен
curl http://localhost:3000/api/health

# Проверьте PM2
pm2 status

# Проверьте логи Nginx
sudo tail -f /var/log/nginx/error.log
```

### Высокое использование памяти

```bash
# Ограничьте память в ecosystem.config.js
# max_memory_restart: '512M'

# Перезапустите PM2
pm2 reload allhalal-web
```

---

## 📝 Чеклист деплоя

- [ ] SSH ключ создан на сервере
- [ ] SSH ключ добавлен в GitHub
- [ ] SSH соединение с GitHub работает (`ssh -T git@github.com`)
- [ ] Репозиторий склонирован в `/home/allhalal/Allhalal-Web`
- [ ] `.env` файл создан и настроен
- [ ] Зависимости установлены (`npm ci`)
- [ ] Приложение собрано (`npm run build`)
- [ ] PM2 запущен и работает (`pm2 status`)
- [ ] Health check работает (`curl localhost:3000/api/health`)
- [ ] PM2 сохранен (`pm2 save`)
- [ ] Nginx установлен и настроен (опционально)
- [ ] SSL сертификат получен (опционально)
- [ ] DNS записи обновлены (опционально)
- [ ] Тестовый push в main прошел успешно

---

## 🎉 Готово!

Теперь ваш сайт работает на Hetzner с автоматическим деплоем!

**Следующий раз просто:**
```bash
git push origin main
```

И все обновится автоматически! 🚀
