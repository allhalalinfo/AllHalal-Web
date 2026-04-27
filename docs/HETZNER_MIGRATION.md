# 🚀 Миграция с Vercel на Hetzner

Полное руководство по переносу AllHalal Web с Vercel на собственный сервер Hetzner.

## 📋 Содержание

1. [Подготовка сервера](#подготовка-сервера)
2. [Установка необходимого ПО](#установка-необходимого-по)
3. [Настройка SSL сертификатов](#настройка-ssl-сертификатов)
4. [Деплой приложения](#деплой-приложения)
5. [Настройка DNS](#настройка-dns)
6. [Автоматизация деплоя](#автоматизация-деплоя)
7. [Мониторинг и обслуживание](#мониторинг-и-обслуживание)
8. [Откат на Vercel (если нужно)](#откат-на-vercel)

---

## 🖥️ Подготовка сервера

### Системные требования

- **ОС**: Ubuntu 22.04 LTS или новее
- **RAM**: минимум 4 GB (у вас 8 GB ✅)
- **Диск**: минимум 10 GB свободного места (у вас 45 GB ✅)
- **CPU**: минимум 2 ядра

### Базовая настройка безопасности

```bash
# Подключаемся к серверу
ssh root@your-server-ip

# Обновляем систему
apt update && apt upgrade -y

# Устанавливаем firewall
apt install ufw -y

# Настраиваем firewall
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable

# Устанавливаем fail2ban для защиты от брутфорса
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban

# Создаем пользователя для деплоя (опционально, но рекомендуется)
adduser deploy
usermod -aG sudo deploy
```

---

## 🔧 Установка необходимого ПО

### 1. Установка Docker и Docker Compose

```bash
# Устанавливаем Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Добавляем пользователя в группу docker
usermod -aG docker $USER
usermod -aG docker deploy  # если создали пользователя deploy

# Устанавливаем Docker Compose
apt install docker-compose-plugin -y

# Проверяем установку
docker --version
docker compose version
```

### 2. Установка Git

```bash
apt install git -y
git --version
```

### 3. Клонирование репозитория

```bash
# Создаем директорию для проектов
mkdir -p /var/www
cd /var/www

# Клонируем репозиторий
git clone https://github.com/your-username/Allhalal-Web.git
cd Allhalal-Web

# Устанавливаем права
chown -R deploy:deploy /var/www/Allhalal-Web  # если используете пользователя deploy
```

---

## 🔐 Настройка SSL сертификатов

### Установка Certbot для Let's Encrypt

```bash
# Устанавливаем Certbot
apt install certbot -y

# Получаем SSL сертификат (сначала остановите NGINX, если запущен)
certbot certonly --standalone \
  -d allhalal.info \
  -d www.allhalal.info \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email

# Сертификаты будут сохранены в:
# /etc/letsencrypt/live/allhalal.info/fullchain.pem
# /etc/letsencrypt/live/allhalal.info/privkey.pem
# /etc/letsencrypt/live/allhalal.info/chain.pem

# Копируем сертификаты в директорию проекта
mkdir -p /var/www/Allhalal-Web/nginx/ssl
cp /etc/letsencrypt/live/allhalal.info/fullchain.pem /var/www/Allhalal-Web/nginx/ssl/
cp /etc/letsencrypt/live/allhalal.info/privkey.pem /var/www/Allhalal-Web/nginx/ssl/
cp /etc/letsencrypt/live/allhalal.info/chain.pem /var/www/Allhalal-Web/nginx/ssl/

# Настраиваем автообновление сертификатов
echo "0 0,12 * * * root certbot renew --quiet && cp /etc/letsencrypt/live/allhalal.info/*.pem /var/www/Allhalal-Web/nginx/ssl/ && docker-compose -f /var/www/Allhalal-Web/docker-compose.yml restart nginx" | tee -a /etc/crontab > /dev/null
```

---

## 🚀 Деплой приложения

### 1. Настройка переменных окружения

```bash
cd /var/www/Allhalal-Web

# Создаем .env файл
cp .env.example .env

# Редактируем .env
nano .env
```

Минимальные настройки в `.env`:

```bash
# API URL (ваш Hetzner бэкенд)
NEXT_PUBLIC_API_URL=https://api.allhalal.info

# Остальные переменные из .env.example
```

### 2. Запуск контейнеров

```bash
# Собираем образы
docker compose build

# Запускаем контейнеры
docker compose up -d

# Проверяем статус
docker compose ps

# Проверяем логи
docker compose logs -f

# Проверяем health check
curl http://localhost:3000/api/health
```

### 3. Проверка работы через NGINX

```bash
# Проверяем, что NGINX работает
curl http://localhost

# Проверяем HTTPS (должен работать после настройки DNS)
curl https://allhalal.info/api/health
```

---

## 🌐 Настройка DNS

### Обновление DNS записей

Перейдите к вашему DNS провайдеру и обновите A-записи:

```
A       allhalal.info       ->  YOUR_HETZNER_IP
A       www.allhalal.info   ->  YOUR_HETZNER_IP
```

**Важно**: DNS изменения могут занять от 5 минут до 48 часов.

### Проверка DNS

```bash
# Проверяем DNS
dig allhalal.info +short
dig www.allhalal.info +short

# Должны вернуть IP вашего Hetzner сервера
```

---

## ⚙️ Автоматизация деплоя

### Настройка GitHub Actions

1. **Генерация SSH ключа для деплоя**:

```bash
# На сервере
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy  # Копируем приватный ключ
```

2. **Добавление секретов в GitHub**:

Перейдите в `Settings` → `Secrets and variables` → `Actions` и добавьте:

- `HETZNER_SSH_KEY` - приватный SSH ключ (содержимое `github_deploy`)
- `HETZNER_HOST` - IP адрес вашего сервера
- `HETZNER_USER` - пользователь для SSH (root или deploy)
- `DEPLOY_PATH` - путь к проекту (`/var/www/Allhalal-Web`)

3. **Тестирование деплоя**:

```bash
# Сделайте любое изменение и push в main
git add .
git commit -m "Test auto-deploy"
git push origin main

# GitHub Actions автоматически задеплоит на Hetzner
```

---

## 📊 Мониторинг и обслуживание

### Использование скрипта управления

```bash
# Перейдите в директорию проекта
cd /var/www/Allhalal-Web

# Используйте скрипт управления
./scripts/manage.sh status    # Проверить статус
./scripts/manage.sh logs      # Посмотреть логи
./scripts/manage.sh update    # Обновить приложение
./scripts/manage.sh backup    # Создать бэкап
./scripts/manage.sh restart   # Перезапустить
./scripts/manage.sh stats     # Использование ресурсов
```

### Мониторинг логов

```bash
# Логи Next.js
docker compose logs -f nextjs

# Логи NGINX
tail -f nginx/logs/allhalal-access.log
tail -f nginx/logs/allhalal-error.log

# Логи Redis
docker compose logs -f redis
```

### Автоматические бэкапы

Добавьте в crontab ежедневные бэкапы:

```bash
# Редактируем crontab
crontab -e

# Добавляем строку (ежедневный бэкап в 2:00 ночи)
0 2 * * * cd /var/www/Allhalal-Web && ./scripts/manage.sh backup
```

### Мониторинг использования диска

```bash
# Проверяем использование диска
df -h

# Проверяем размер Docker образов
docker system df

# Очищаем неиспользуемые ресурсы (осторожно!)
docker system prune -a
```

---

## 🔄 Откат на Vercel (если нужно)

Если что-то пойдет не так и нужно вернуться на Vercel:

### 1. Быстрый откат DNS

Измените DNS записи обратно на Vercel:

```
A       allhalal.info       ->  76.76.21.21 (или ваш IP от Vercel)
```

### 2. Vercel все еще работает

Ваш деплой на Vercel останется нетронутым. Просто измените DNS обратно, и сайт снова будет работать через Vercel.

### 3. Удаление конфигурации Hetzner (опционально)

```bash
# Остановка контейнеров
cd /var/www/Allhalal-Web
docker compose down

# Удаление проекта (если нужно)
rm -rf /var/www/Allhalal-Web
```

---

## 📊 Сравнение: Vercel vs Hetzner

| Параметр | Vercel | Hetzner (Docker) |
|----------|--------|------------------|
| **Стоимость** | Free tier ограничен | Фиксированная цена (~€5-20/мес) |
| **Глобальный CDN** | ✅ Да (автоматически) | ❌ Нет (можно добавить Cloudflare) |
| **Масштабирование** | ✅ Автоматическое | ⚠️ Ручное |
| **SSL сертификаты** | ✅ Автоматические | ⚠️ Let's Encrypt (автообновление) |
| **Zero-config deploy** | ✅ Да | ❌ Нужна настройка |
| **Контроль** | ⚠️ Ограниченный | ✅ Полный |
| **Латентность API** | ⚠️ Может быть высокой | ✅ Минимальная (все на одном сервере) |
| **Кастомизация** | ⚠️ Ограниченная | ✅ Полная |

---

## 🎯 Рекомендации

### Для максимальной производительности

1. **Добавьте Cloudflare CDN**:
   - Бесплатный план
   - Глобальный CDN
   - DDoS защита
   - Автоматический SSL

2. **Оптимизация NGINX**:
   - Включите Brotli сжатие (если доступно)
   - Настройте кеширование статики
   - Используйте HTTP/2

3. **Мониторинг**:
   - Настройте Uptime Robot для мониторинга доступности
   - Используйте Grafana + Prometheus для метрик
   - Настройте алерты в Telegram/Email

### Безопасность

1. **Регулярные обновления**:
```bash
# Автоматические обновления безопасности
apt install unattended-upgrades -y
dpkg-reconfigure --priority=low unattended-upgrades
```

2. **Бэкапы**:
   - Ежедневные бэкапы в другое место (Backblaze B2, AWS S3)
   - Тестируйте восстановление из бэкапов

3. **Мониторинг безопасности**:
```bash
# Проверка открытых портов
nmap localhost

# Проверка безопасности SSL
https://www.ssllabs.com/ssltest/
```

---

## ❓ FAQ

### Вопрос: Можно ли использовать оба варианта одновременно?

Да! Вы можете держать Vercel как staging окружение, а Hetzner как production.

### Вопрос: Что делать, если закончится место на диске?

```bash
# Очистка Docker
docker system prune -a -f

# Очистка логов
find /var/log -type f -name "*.log" -exec truncate -s 0 {} \;

# Удаление старых бэкапов
rm -rf /var/www/Allhalal-Web/backups/*
```

### Вопрос: Как добавить больше памяти для Node.js?

В `docker-compose.yml` добавьте:

```yaml
nextjs:
  environment:
    - NODE_OPTIONS=--max-old-space-size=4096  # 4GB
```

---

## 📞 Поддержка

Если возникнут проблемы:

1. Проверьте логи: `./scripts/manage.sh logs`
2. Проверьте статус: `./scripts/manage.sh status`
3. Проверьте health check: `curl http://localhost:3000/api/health`
4. Создайте issue в GitHub репозитории

---

## ✅ Чеклист миграции

- [ ] Сервер настроен и защищен (firewall, fail2ban)
- [ ] Docker и Docker Compose установлены
- [ ] SSL сертификаты получены и настроены
- [ ] Репозиторий склонирован
- [ ] `.env` файл настроен
- [ ] Контейнеры запущены и работают
- [ ] DNS записи обновлены
- [ ] GitHub Actions секреты настроены
- [ ] Автоматический деплой работает
- [ ] Бэкапы настроены
- [ ] Мониторинг настроен
- [ ] Документация прочитана

---

**Удачи с миграцией! 🚀**

Если нужна помощь, обращайтесь в Issues или к администратору сервера.
