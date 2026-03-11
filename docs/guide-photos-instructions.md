# Фотографии для Halal Guides

## Где скачать качественные фото

Все фото рекомендуется брать с **Unsplash** - бесплатные профессиональные фотографии высокого качества.

---

## 1. Для главной страницы гайдов (`/is-it-halal`)

### Hero-изображение для первой статьи (сертификация)

**Что искать:** Halal certification stamps/logos, food quality control, food inspection

**Рекомендованные запросы на Unsplash:**
- `food certification`
- `quality control food`
- `halal food`
- `food inspection`
- `food safety audit`

**Куда сохранить:** `/public/images/guides/certification-hero.jpg`

**Рекомендованные фото:**
1. https://unsplash.com/s/photos/food-certification
2. https://unsplash.com/s/photos/halal-food
3. Альтернатива: фото мечети с современной архитектурой + еда для передачи "islamic context"

---

## 2. Для статьи "Halal Certification Standards"

### Hero-изображение (уже в коде, закомментировано)

**Что искать:** Multiple halal logos/stamps, certification documents, food quality stamps

**Рекомендованный поиск:**
- `certification stamps`
- `food quality seal`
- `official stamps documents`
- `quality assurance food`

**Куда сохранить:** `/public/images/guides/certification-logos-hero.jpg`

**Требования к фото:**
- Высокое разрешение (минимум 1920x1080)
- Горизонтальная ориентация
- Соотношение сторон примерно 16:9
- Желательно: тёплые тона (бежевый, коричневый, зелёный) для соответствия дизайну

### Дополнительные фото для статьи (опционально)

Если хотите добавить больше визуального контента:

**Фото 2:** JAKIM facility / Malaysian halal production
- Поиск: `malaysia food production` `halal meat` `food factory`
- Сохранить как: `/public/images/guides/jakim-facility.jpg`

**Фото 3:** Meat slaughter / butcher (для секции про stunning)
- Поиск: `halal butcher` `meat preparation` `butcher shop`
- Сохранить как: `/public/images/guides/meat-slaughter.jpg`

**Фото 4:** Grocery shopping / Muslim checking labels
- Поиск: `reading food label` `grocery shopping muslim` `checking ingredients`
- Сохранить как: `/public/images/guides/checking-labels.jpg`

---

## Как скачать фото с Unsplash

1. Перейти на https://unsplash.com
2. Ввести поисковый запрос (например, `food certification`)
3. Выбрать подходящее фото
4. Нажать **Download free** (зелёная кнопка справа вверху)
5. Сохранить в `/public/images/guides/` с указанным именем файла

---

## После добавления фото

Раскомментируйте блоки с `<Image>` в коде:

### В `/app/[locale]/is-it-halal/page.tsx`

Найти строку:
```tsx
{/* Placeholder - will add real photos */}
<div className="md:col-span-2 bg-gradient-to-br from-accent-green/20 to-accent-green/5 min-h-[280px] md:min-h-[400px] relative overflow-hidden">
  <div className="absolute inset-0 flex items-center justify-center text-text-tertiary/30 text-sm">
    Photo: Certification standards
  </div>
</div>
```

Заменить на:
```tsx
<div className="md:col-span-2 relative overflow-hidden">
  <Image
    src="/images/guides/certification-hero.jpg"
    alt="Halal certification standards and logos"
    fill
    className="object-cover"
    priority
  />
</div>
```

### В `/app/[locale]/is-it-halal/halal-certification-standards/page.tsx`

Найти комментарий `{/* TODO: Скачать фото с Unsplash: */}` и раскомментировать блок `<Image>` под ним.

---

## Альтернатива: AI-generated images

Если не хотите искать на Unsplash, можно сгенерировать через:
- **Midjourney** (платно, но очень качественно)
- **DALL-E 3** (через ChatGPT Plus)
- **Stable Diffusion** (бесплатно, но требует настройки)

**Промпт для генерации:**
```
High-quality editorial photograph of halal food certification documents and stamps on a clean desk, warm lighting, professional photography, shallow depth of field, beige and green color palette, magazine style
```

---

## Рекомендации по стилю фото

Для соответствия editorial дизайну:

✓ **Хорошо:**
- Естественное освещение
- Тёплые тона (бежевый, коричневый, зелёный, золотистый)
- Профессиональная композиция
- Минималистичный фон
- Высокое разрешение

✗ **Избегать:**
- Яркие, кричащие цвета
- Клипарт / векторные иллюстрации
- Низкое качество / пикселизация
- Слишком постановочные "стоковые" фото с фальшивыми улыбками
- Watermarks (выбирайте бесплатные фото без водяных знаков)
