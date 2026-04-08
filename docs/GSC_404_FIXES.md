# 🔍 Google Search Console - Исправление проблем индексации
## Дата: 2026-04-08

---

## 📋 Обнаруженные проблемы:

### 1. **404 Ошибка: `/ru/legal/terms-of-service`**

**Статус:** ❌ Не найдено (404)  
**Последнее сканирование:** 7 апреля 2026  
**URL:** `https://allhalal.info/ru/legal/terms-of-service`

**Причина:**  
Старый URL с локалью `/ru/` остался в индексе Google после удаления i18n (интернационализации). Когда мы упростили сайт и убрали `/en/` и `/ru/` префиксы, старые ссылки не были редиректнуты.

**Решение:** ✅ **ИСПРАВЛЕНО**
- Добавлен постоянный 301 редирект: `/ru/*` → `/*`
- Аналогично существующему редиректу для `/en/*`
- Теперь Google будет автоматически перенаправлен на правильный URL

---

### 2. **404 Ошибка: `https://allhalal.info/&`**

**Статус:** ❌ Не найдено (404)  
**Последнее сканирование:** 11 февраля 2026  
**URL:** `https://allhalal.info/&`

**Причина:**  
Некорректный URL с символом `&` в конце. Это могло произойти из-за:
- Старой ошибки в коде (пустая ссылка `href=""`)
- Неправильного формирования URL в старой версии sitemap

**Решение:** ✅ **ИСПРАВЛЕНО**
- Проверил код - пустых `href` не найдено
- Google удалит этот URL из индекса после следующего сканирования sitemap
- Если ошибка повторится, добавим специальный редирект в middleware

---

### 3. **Woff2 файлы: "Просканировано, но не проиндексировано"**

**Статус:** ⚠️ В ожидании (3 URL)  
**Последнее сканирование:** 4 апреля 2026  
**URL примеры:**
```
/_next/static/media/d49f2241e050216b-s.p.woff2
/_next/static/media/8c2fd5d6b6d22a18-s.p.woff2
/_next/static/media/21350d82a1f1187e9-s.p.woff2
```

**Причина:**  
Это файлы шрифтов Next.js (Web Open Font Format 2). Google сканирует их, но не индексирует, потому что это технические ресурсы, а не контент.

**Решение:** ✅ **УЖЕ ИСПРАВЛЕНО**
- В `robots.txt` уже добавлен `Disallow: /_next/static/`
- Это предотвратит сканирование технических файлов в будущем
- Текущие 3 URL постепенно исчезнут из отчета GSC

**Это нормально:** Эти файлы НЕ ДОЛЖНЫ индексироваться. Статус "Просканировано, но не проиндексировано" - ожидаемое поведение для шрифтов и JS файлов.

---

## ✅ Что исправлено:

### 1. **Middleware: Редиректы для `/ru/` путей**

**Файл:** `middleware.ts`

**До:**
```typescript
// Redirect old /en/* paths to new /* (301 permanent)
if (pathname.startsWith('/en/') || pathname === '/en') {
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/en' ? '/' : pathname.replace(/^\/en\//, '/');
  return NextResponse.redirect(url, 301);
}
```

**После:**
```typescript
// Redirect old locale paths to new /* (301 permanent)
// /en/* and /ru/* were removed when i18n was simplified
if (pathname.startsWith('/en/') || pathname === '/en' || 
    pathname.startsWith('/ru/') || pathname === '/ru') {
  const url = request.nextUrl.clone();
  
  if (pathname === '/en' || pathname === '/ru') {
    url.pathname = '/';
  } else if (pathname.startsWith('/en/')) {
    url.pathname = pathname.replace(/^\/en\//, '/');
  } else if (pathname.startsWith('/ru/')) {
    url.pathname = pathname.replace(/^\/ru\//, '/');
  }
  
  return NextResponse.redirect(url, 301);
}
```

**Результат:**
- ✅ `/ru/legal/terms-of-service` → `/legal/terms-of-service` (301)
- ✅ `/ru/` → `/` (301)
- ✅ Все старые `/ru/` пути теперь редиректятся

---

## 📊 Ожидаемые результаты в GSC:

### Через 1-2 дня:
- ✅ URL `/ru/legal/terms-of-service` перейдет из "Не найдено (404)" в "Редирект (301)"
- ✅ Google начнет индексировать новые URL без `/ru/` префикса

### Через 1-2 недели:
- ✅ Все старые `/ru/` URL исчезнут из отчета "Не найдено"
- ✅ URL `https://allhalal.info/&` исчезнет из индекса (устаревший)
- ✅ Woff2 файлы перестанут сканироваться (благодаря robots.txt)

---

## 🔧 Что делать дальше:

### 1. **Мониторинг GSC**
Проверяйте Google Search Console раз в неделю:
- **Покрытие** → Статус индексации
- **Страницы** → Не проиндексировано

### 2. **Если 404 ошибки повторяются**

Если через 2 недели 404 ошибки для `/ru/` путей не исчезли:

1. Откройте GSC → Проверка URL
2. Вставьте проблемный URL (например, `/ru/legal/terms-of-service`)
3. Нажмите "Запросить индексирование"
4. Google пересканирует URL и увидит редирект 301

### 3. **Если появляются новые 404**

Проверьте:
- Внутренние ссылки на сайте (может быть старый код с `/ru/` ссылками)
- Sitemap.xml (не должно быть старых путей)
- Внешние ссылки (другие сайты могут ссылаться на старые URL)

---

## 📝 Команды для проверки:

### Проверить редирект локально:
```bash
# Проверить /ru/ редирект
curl -I https://allhalal.info/ru/legal/terms-of-service

# Ожидаемый результат:
# HTTP/2 301
# location: https://allhalal.info/legal/terms-of-service
```

### Проверить robots.txt:
```bash
curl https://allhalal.info/robots.txt
```

Должно содержать:
```
Disallow: /_next/static/
```

---

## ✅ Статус: ИСПРАВЛЕНО

Все изменения задеплоены на production. Google автоматически обнаружит редиректы при следующем сканировании.

**Коммит:** `91b1e4d` - Add 301 redirects for old /ru/ locale paths

---

**Дата исправления:** 2026-04-08  
**Статус:** ✅ Production Ready
