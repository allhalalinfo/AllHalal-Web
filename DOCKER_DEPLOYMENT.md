# 🐳 AllHalal Web - Docker Deployment

Быстрый старт для развертывания на собственном сервере.

## 🚀 Быстрый старт

### Минимальные требования

- Docker 20.10+
- Docker Compose 2.0+
- 4 GB RAM
- 10 GB свободного места на диске

### 1. Клонирование и настройка

```bash
# Клонируйте репозиторий
git clone https://github.com/your-username/Allhalal-Web.git
cd Allhalal-Web

# Создайте .env файл
cp .env.example .env
nano .env  # Настройте переменные окружения
```

### 2. SSL сертификаты

```bash
# Создайте директорию для SSL
mkdir -p nginx/ssl

# Получите сертификаты Let's Encrypt
certbot certonly --standalone \
  -d allhalal.info \
  -d www.allhalal.info \
  --email your-email@example.com \
  --agree-tos

# Копируйте сертификаты
cp /etc/letsencrypt/live/allhalal.info/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/allhalal.info/privkey.pem nginx/ssl/
cp /etc/letsencrypt/live/allhalal.info/chain.pem nginx/ssl/
```

### 3. Запуск

```bash
# Соберите и запустите контейнеры
docker compose up -d

# Проверьте статус
docker compose ps

# Проверьте логи
docker compose logs -f
```

### 4. Проверка

```bash
# Проверьте health endpoint
curl http://localhost:3000/api/health

# Проверьте через браузер
open https://allhalal.info
```

## 🛠️ Управление

### Использование скрипта управления

```bash
# Все команды через удобный скрипт
./scripts/manage.sh status    # Статус контейнеров
./scripts/manage.sh logs      # Просмотр логов
./scripts/manage.sh restart   # Перезапуск
./scripts/manage.sh update    # Обновление с GitHub
./scripts/manage.sh backup    # Создание бэкапа
./scripts/manage.sh stats     # Использование ресурсов
./scripts/manage.sh help      # Справка
```

### Ручное управление Docker

```bash
# Запуск
docker compose up -d

# Остановка
docker compose down

# Перезапуск
docker compose restart

# Логи
docker compose logs -f [service_name]

# Статус
docker compose ps

# Пересборка
docker compose build --no-cache
docker compose up -d
```

## 📁 Структура проекта

```
Allhalal-Web/
├── docker-compose.yml      # Конфигурация Docker Compose
├── Dockerfile             # Dockerfile для Next.js
├── .dockerignore          # Игнорируемые файлы для Docker
├── nginx/
│   ├── nginx.conf         # Основной конфиг NGINX
│   ├── conf.d/
│   │   └── allhalal.conf  # Конфиг сайта
│   ├── ssl/               # SSL сертификаты
│   └── logs/              # Логи NGINX
├── scripts/
│   └── manage.sh          # Скрипт управления
├── logs/                  # Логи приложений
│   ├── nextjs/
│   └── redis/
└── docs/
    └── HETZNER_MIGRATION.md  # Полная документация
```

## 🔧 Конфигурация

### Переменные окружения (.env)

```bash
# API Backend
NEXT_PUBLIC_API_URL=https://api.allhalal.info

# AdSense (опционально)
NEXT_PUBLIC_ENABLE_ADSENSE_SLOTS=false
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-your-id

# IndexNow (опционально)
INDEXNOW_KEY=your-uuid-key
INDEXNOW_API_SECRET=your-secret

# ISR Revalidation
REVALIDATE_SECRET=your-secret-token
```

### Порты

- **80** - HTTP (редирект на HTTPS)
- **443** - HTTPS (основной)
- **3000** - Next.js (внутренний, только localhost)
- **6379** - Redis (внутренний, только localhost)

## 📊 Мониторинг

### Health Check

```bash
# Проверка здоровья приложения
curl http://localhost:3000/api/health

# Ответ:
# {
#   "status": "healthy",
#   "timestamp": "2026-04-27T00:00:00.000Z",
#   "uptime": 12345
# }
```

### Логи

```bash
# Все логи
docker compose logs -f

# Только Next.js
docker compose logs -f nextjs

# Только NGINX
tail -f nginx/logs/allhalal-access.log
tail -f nginx/logs/allhalal-error.log

# Только Redis
docker compose logs -f redis
```

### Статистика ресурсов

```bash
# Docker статистика
docker stats

# Или через скрипт
./scripts/manage.sh stats
```

## 🔄 Обновление

### Автоматическое (через GitHub Actions)

```bash
# Просто push в main ветку
git push origin main

# GitHub Actions автоматически задеплоит
```

### Ручное

```bash
# Через скрипт (рекомендуется)
./scripts/manage.sh update

# Или вручную
git pull origin main
docker compose build --no-cache
docker compose down
docker compose up -d
```

## 💾 Бэкапы

### Создание бэкапа

```bash
# Через скрипт
./scripts/manage.sh backup

# Бэкапы сохраняются в backups/
# Формат: allhalal_backup_YYYYMMDD_HHMMSS.tar.gz
```

### Восстановление из бэкапа

```bash
# Остановите контейнеры
docker compose down

# Распакуйте бэкап
tar -xzf backups/allhalal_backup_YYYYMMDD_HHMMSS.tar.gz

# Запустите контейнеры
docker compose up -d
```

## 🔒 Безопасность

### Firewall

```bash
# Настройте UFW
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw enable
```

### Fail2Ban

```bash
# Установите fail2ban
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban
```

### SSL сертификаты

```bash
# Автообновление через cron
echo "0 0,12 * * * root certbot renew --quiet && cp /etc/letsencrypt/live/allhalal.info/*.pem /var/www/Allhalal-Web/nginx/ssl/ && docker compose -f /var/www/Allhalal-Web/docker-compose.yml restart nginx" | tee -a /etc/crontab
```

## 🚨 Troubleshooting

### Контейнер не запускается

```bash
# Проверьте логи
docker compose logs [service_name]

# Проверьте статус
docker compose ps

# Пересоберите образ
docker compose build --no-cache [service_name]
docker compose up -d
```

### SSL ошибки

```bash
# Проверьте сертификаты
ls -la nginx/ssl/

# Проверьте права
chmod 644 nginx/ssl/*.pem

# Перезапустите NGINX
docker compose restart nginx
```

### Нет соединения с Redis

```bash
# Проверьте Redis
docker compose exec redis redis-cli ping
# Должен вернуть: PONG

# Проверьте логи
docker compose logs redis
```

### Высокое использование памяти

```bash
# Проверьте использование
docker stats

# Ограничьте память в docker-compose.yml
services:
  nextjs:
    deploy:
      resources:
        limits:
          memory: 2G
```

## 📚 Документация

- [Полная документация по миграции](docs/HETZNER_MIGRATION.md)
- [Интеграция iOS WebView](docs/IOS_WEBVIEW_INTEGRATION.md)
- [Security Audit](SECURITY_AUDIT_REPORT.md)

## 🆘 Поддержка

- **Issues**: [GitHub Issues](https://github.com/your-username/Allhalal-Web/issues)
- **Email**: support@allhalal.info
- **Документация**: `/docs`

## 📝 Лицензия

Proprietary - All rights reserved
