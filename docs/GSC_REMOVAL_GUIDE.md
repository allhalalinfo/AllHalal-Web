# Google Search Console - Request Removal Guide

**Дата:** 1 мая 2026  
**URL для удаления:** `https://allhalal.info/&`

---

## 🎯 Почему нужно удалить этот URL

**Проблема:** Google crawl обнаружил URL `https://allhalal.info/&` через сканирование сайта.

**Текущий статус:**
- URL возвращает **404 Not Found** ✅
- URL является "битой ссылкой" (не должен существовать)
- Источник бага не найден, но URL больше не создаётся

**Почему Request Removal:**
Даже если URL возвращает 404, он может оставаться в индексе Google. Request Removal ускоряет удаление из индекса и предотвращает негативное влияние на SEO.

---

## 📋 ШАГ ЗА ШАГОМ

### 1. Открыть Google Search Console

Перейти: https://search.google.com/search-console

Выбрать property: `allhalal.info`

---

### 2. Найти раздел Removals

**Навигация:**
1. В левом меню → **Removals** (Удаления)
2. Или прямая ссылка: https://search.google.com/search-console/removals

---

### 3. Создать новый запрос

1. Нажать **New Request** (Новый запрос)
2. Появится popup с опциями

---

### 4. Выбрать тип удаления

**Выбрать:** "Temporarily remove URL" (Временно удалить URL)

**Почему не "Remove outdated content":**
- URL уже возвращает 404
- Нет старой cached версии с контентом
- Temporary removal достаточно

---

### 5. Ввести URL

**В поле URL ввести:**
```
https://allhalal.info/&
```

**Важно:**
- Точно как указано выше
- С `https://`
- Без пробелов
- Именно `/&` в конце

---

### 6. Подтвердить

1. Нажать **Next** (Далее)
2. Google проверит статус URL
3. Должен показать: "URL returns 404" ✅
4. Нажать **Submit** (Отправить)

---

### 7. Ожидаемый результат

**Статус запроса:**
- Pending (Ожидает) → несколько часов
- Approved (Одобрено) → в течение 24-48 часов

**После одобрения:**
- URL удалён из индекса Google
- URL не появляется в search results
- Temporary removal действует 6 месяцев

**Через 6 месяцев:**
- Если URL всё ещё возвращает 404 → Google не переиндексирует его
- Если URL начнёт возвращать 200 → Google может заново его индексировать

---

## ⚠️ ВАЖНЫЕ ПРИМЕЧАНИЯ

### 1. Не удалять правильные URL

**НЕ удалять:**
- `/` (главная)
- `/is-it-halal`
- `/news`
- `/finance`
- Любые рабочие страницы

**Удалять ТОЛЬКО:**
- `/&` (битая ссылка)
- Другие 404 страницы, если найдены

---

### 2. Temporary vs Permanent

**Temporary Removal (рекомендуется):**
- Действует 6 месяцев
- Для страниц, которые возвращают 404
- Автоматически истекает

**Permanent Removal:**
- Не рекомендуется для `/&`
- Используется только для контента с legal/privacy issues

---

### 3. Проверка после удаления

**Через 48 часов:**
```bash
# Проверить что URL не в индексе
site:allhalal.info/&
# В Google Search - должно быть 0 результатов
```

**В GSC:**
- Removals → History
- Должен показывать "Approved" для `/&`

---

## 🔍 TROUBLESHOOTING

### Проблема: "URL not eligible for removal"

**Причина:** URL не в индексе Google

**Решение:** Не нужно делать removal. URL уже не индексируется.

---

### Проблема: "Removal request rejected"

**Возможные причины:**
1. URL начал возвращать 200 вместо 404
2. URL не принадлежит вашему property

**Решение:**
1. Проверить статус URL:
   ```bash
   curl -I https://allhalal.info/\&
   # Должен быть 404
   ```
2. Если 200 - найти источник бага
3. Если 404 - попробовать ещё раз через 24 часа

---

### Проблема: "Can't find Removals in GSC"

**Решение:**
- Убедиться что вы owner/admin property
- Viewers не имеют доступа к Removals
- Проверить URL: https://search.google.com/search-console/removals

---

## ✅ CHECKLIST

- [ ] Открыть GSC → Removals
- [ ] Создать New Request
- [ ] Выбрать "Temporarily remove URL"
- [ ] Ввести `https://allhalal.info/&`
- [ ] Submit request
- [ ] Через 48 часов: проверить статус = Approved
- [ ] Через 7 дней: проверить `site:allhalal.info/&` = 0 results

---

## 📊 EXPECTED TIMELINE

| Действие | Когда | Результат |
|----------|-------|-----------|
| Submit request | Сейчас | Status: Pending |
| Request processing | 1-2 hours | Status: Processing |
| Request approval | 24-48 hours | Status: Approved |
| URL removed from index | 48-72 hours | Not in search results |
| Verification | 7 days | `site:` shows 0 results |

---

## 🎯 AFTER COMPLETION

После успешного removal:

1. ✅ URL удалён из индекса
2. ✅ Не влияет на SEO
3. ✅ Не появляется в GSC Coverage errors
4. ✅ Google больше не тратит crawl budget на него

**Мониторинг:**
- Проверять GSC Coverage раз в месяц
- Если `/&` появится снова → искать источник бага в коде

---

**Документ подготовлен:** Frontend Agent  
**Для вопросов:** Проверить статус в GSC → Removals → History
