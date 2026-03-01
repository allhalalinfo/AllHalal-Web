# 📋 Текущая структура проекта AllHalal Web

**Дата обновления:** 24 февраля 2026

## 🎯 Описание
Лендинг сайт для приложения AllHalal - платформы для сканирования и проверки халяльных продуктов.

## 🌐 Доступные страницы

### 1. Основные страницы (`app/[locale]/`)
- ✅ **Главная** - `/[locale]/` - Лендинг с информацией о приложении
- ✅ **Контакты** - `/[locale]/contact` - Форма обратной связи
- ✅ **Поддержка** - `/[locale]/support` - Страница поддержки
- ✅ **Скоро** - `/[locale]/coming-soon` - Coming Soon страница

### 2. Юридические страницы (`app/[locale]/legal/`)
- ✅ **Юридическая информация** - `/[locale]/legal` - Главная юридическая страница
- ✅ **Политика конфиденциальности** - `/[locale]/legal/privacy-policy`
- ✅ **Условия использования** - `/[locale]/legal/terms-of-service`
- ✅ **Отказ от ответственности** - `/[locale]/legal/disclaimer`

### 3. API Routes (`app/api/`)
- ✅ **Contact API** - `/api/contact` - Обработка форм обратной связи
- ✅ **App-ads.txt** - `/app-ads.txt` - Google AdMob файл

## 🧭 Навигация

### Главное меню (Header):
- Contact
- Support
- Legal

### Footer:
- **Product**: Features, How It Works, Madhhab Support, Download App
- **Company**: About Us, Contact, Support
- **Legal**: Privacy Policy, Terms of Service, Disclaimer

## 🌍 Мультиязычность
Все страницы доступны на 7 языках:
- 🇬🇧 English (en) - по умолчанию
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇪🇸 Español (es)
- 🇮🇹 Italiano (it)
- 🇳🇱 Nederlands (nl)
- 🇷🇺 Русский (ru)

## 📁 Структура директорий

```
/
├── app/
│   ├── [locale]/              # Мультиязычные страницы
│   │   ├── page.tsx          # Главная страница
│   │   ├── contact/          # Контакты
│   │   ├── support/          # Поддержка
│   │   ├── coming-soon/      # Coming Soon
│   │   ├── legal/            # Юридические страницы
│   │   └── layout.tsx        # Layout для локализованных страниц
│   ├── api/                   # API routes
│   │   ├── contact/          # Contact API
│   │   └── app-ads.txt/      # AdMob файл
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Глобальные стили
│
├── components/               # React компоненты
│   ├── layout/              # Layout компоненты
│   │   ├── Header.tsx       # Хедер с навигацией
│   │   └── Footer.tsx       # Футер
│   ├── sections/            # Секции страниц
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── MadhhabSection.tsx
│   │   ├── WhyChooseSection.tsx
│   │   └── CTASection.tsx
│   ├── ui/                  # UI компоненты
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MagneticButton.tsx
│   │   ├── ScrambleText.tsx
│   │   ├── SpotlightCard.tsx
│   │   └── Noise.tsx
│   ├── three/              # Three.js компоненты
│   │   └── ParticleBarcode.tsx
│   └── providers/          # Context providers
│       ├── SmoothScrollProvider.tsx
│       └── SpeedInsightsProvider.tsx
│
├── lib/                     # Утилиты и библиотеки
│   ├── analytics/          # Аналитика
│   ├── content/            # Обработка контента
│   ├── seo/               # SEO утилиты
│   └── utils/             # Общие утилиты
│
├── i18n/                   # Интернационализация
│   ├── config.ts          # Конфигурация локалей
│   └── request.ts         # i18n request handler
│
├── messages/              # Переводы
│   ├── en.json
│   ├── fr.json
│   ├── de.json
│   ├── es.json
│   ├── it.json
│   ├── nl.json
│   └── ru.json
│
├── data/                  # Данные приложения
│   ├── cities.ts
│   ├── countries.ts
│   ├── ingredients.ts
│   ├── e-codes.ts
│   ├── dubai-areas.ts
│   └── developers.ts
│
├── public/               # Статические файлы
├── hooks/               # React hooks
├── config/              # Конфигурация
└── middleware.ts        # Next.js middleware
```

## 🛠️ Технологический стек

### Frontend
- **Next.js 15.5.7** - React фреймворк (App Router)
- **React 19** - UI библиотека
- **TypeScript** - Типизация
- **Tailwind CSS** - Стилизация

### UI/UX
- **Framer Motion** - Анимации
- **Three.js** - 3D графика (particles)
- **GSAP** - Продвинутые анимации
- **Lenis** - Плавная прокрутка
- **Lucide React** - Иконки

### Интернационализация
- **next-intl** - Мультиязычность

### Производительность
- **@vercel/speed-insights** - Мониторинг производительности

## 🚀 Запуск проекта

```bash
# Установка зависимостей
npm install

# Режим разработки
npm run dev

# Сборка для продакшн
npm run build

# Запуск продакшн версии
npm start

# Линтинг
npm run lint
```

## ⚙️ Конфигурация

- **Node.js**: >= 18.17.0
- **Package Manager**: npm
- **Deploy**: Vercel

## 📝 Примечания

### Удалено из проекта:
- ❌ Медиа-раздел (blog, guides, ingredients, real-estate, travel, finance)
- ❌ Админ-панель
- ❌ CEO-панель
- ❌ Search функционал
- ❌ Backend интеграция

### Осталось только:
- ✅ Маркетинговый лендинг
- ✅ Юридические страницы
- ✅ Контакты и поддержка
- ✅ Мультиязычность (7 языков)

## 🔗 Ссылки
- [README.md](./README.md) - Основная документация
- [SECURITY_AUDIT_REPORT.md](./SECURITY_AUDIT_REPORT.md) - Отчет по безопасности
- [WEB3FORMS_SETUP.md](./WEB3FORMS_SETUP.md) - Настройка форм

---
**Статус:** ✅ Проект успешно собирается
**Последняя сборка:** Успешная (61/61 страниц сгенерировано)
