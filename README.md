# AllHalal Web App 🥗

Платформа для поиска и открытия аутентичных халяльных ресторанов по всему миру.

## 🚀 Технологии

- **Next.js 15** - App Router, Server Components
- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **PM2** - Process Manager (Production)
- **Hetzner** - Hosting

## 📦 Установка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для production
npm run build

# Запуск production сервера
npm start
```

## 🏗️ Структура проекта

```
AllHalal-Web/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React компоненты
├── lib/             # Утилиты и хелперы
├── styles/          # Дополнительные стили
├── public/          # Статические файлы
└── assets/          # Legacy assets (будут мигрированы)
```

## 🌐 Окружение

Создайте файл `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

## 📝 Скрипты

- `npm run dev` - Запуск dev сервера
- `npm run build` - Production сборка
- `npm start` - Запуск production сервера
- `npm run lint` - Проверка кода

## 🚀 Деплой

### Production (Hetzner + PM2)

Автоматический деплой через GitHub Actions при push в `main`:

```bash
git push origin main
```

**Быстрый старт:** См. [docs/QUICK_START_PM2.md](./docs/QUICK_START_PM2.md)

**Полная документация:** См. [docs/PM2_DEPLOYMENT.md](./docs/PM2_DEPLOYMENT.md)

### Альтернативный вариант (Docker)

Для деплоя через Docker:

```bash
docker compose up -d
```

См. [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md) для деталей.

## 📚 Документация

- [PM2 Deployment Guide](./docs/PM2_DEPLOYMENT.md) - Деплой с PM2
- [Quick Start PM2](./docs/QUICK_START_PM2.md) - Быстрая настройка
- [Hetzner Migration](./docs/HETZNER_MIGRATION.md) - Миграция с Vercel
- [Docker Deployment](./DOCKER_DEPLOYMENT.md) - Альтернатива с Docker
- [Cloudflare Setup](./docs/CLOUDFLARE_SETUP.md) - CDN настройка
- [iOS WebView Integration](./docs/IOS_WEBVIEW_INTEGRATION.md) - Интеграция iOS

## 🖥️ Сервер

**Производство:**
- Host: Hetzner
- IP: `49.12.186.18`
- PM2: `allhalal-web`
- Порт: `3000`

**Управление на сервере:**
```bash
pm2 status                    # Статус
pm2 logs allhalal-web        # Логи
pm2 reload allhalal-web      # Перезапуск
pm2 monit                    # Мониторинг
```

## 🔒 Лицензия

Private - AllHalal Info © 2024

---

**Организация:** [allhalalinfo](https://github.com/allhalalinfo)
