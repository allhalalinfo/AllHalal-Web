# AllHalal Web App 🥗

Платформа для поиска и открытия аутентичных халяльных ресторанов по всему миру.

## 🚀 Технологии

- **Next.js 14** - App Router
- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vercel** - Deployment

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

## 🔒 Лицензия

Private - AllHalal Info © 2024

---

**Организация:** [allhalalinfo](https://github.com/allhalalinfo)
