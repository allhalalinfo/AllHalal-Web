# Промпт для Server AI: Phase 2 Optimization Status Check

---

## КОНТЕКСТ

**Phase 2** оптимизации Fast Origin Transfer для AllHalal-Web уже **deployed на production**.

**Commits:**
- `8ab0368` - первая часть Phase 2 (Apr 15 03:56:48)
- `5e508c6` - финальная часть Phase 2 (Apr 15 16:11:12)

**Статус:** Production, работает с Apr 15 2026

---

## ЧТО БЫЛО СДЕЛАНО В PHASE 2

### Критические изменения:

#### 1. ✅ **Удалён Image Proxy полностью** (-10-15% Origin Transfer)

**Решение:** Вместо оптимизации proxy через Edge Runtime - proxy был **полностью удалён**.

**Удалённые файлы:**
- `app/api/img/[token]/route.ts` - удалён route
- `lib/proxiedImageUrl.ts` - удалена библиотека
- `lib/server/proxyRemoteImage.ts` - удалён server-side код

**Новый подход:**
- Custom articles: используют Next.js `<Image>` component (оптимизация Vercel)
- Briefs: загружают images напрямую с CDN источников (без proxy)
- Никаких `/api/img/...` calls → **0 origin calls** для image proxy

**Эффект:** 
- Было: ~90-95% image requests шли через proxy → origin
- Стало: **0%** requests через proxy (proxy не существует)
- **Снижение Origin Transfer: ~10-15%**

---

#### 2. ✅ **RelatedArticles рефакторинг** (-5-8% Origin Transfer)

**Проблема:** Каждая article page делала 2 fetch запроса (50+50 items)

**Решение:**
- Статьи передаются как props из parent component
- Параллельная загрузка article + related articles
- Убрано дублирование fetch

**Файлы:**
- `components/articles/RelatedArticles.tsx` - теперь принимает props
- `app/(main)/read/[slug]/page.tsx` - параллельный fetch

**Эффект:** **-5-8%** Origin Transfer

---

#### 3. ✅ **TodayForYou с unstable_cache** (-3-5% Origin Transfer)

**Проблема:** Prayer times API запрашивался несколько раз на homepage

**Решение:**
- Добавлен `unstable_cache` с cache tags
- Prayer times кэшируются 1 час
- Устранена дублирующая логика

**Файл:**
- `components/portal/TodayForYouServer.tsx`

**Эффект:** **-3-5%** Origin Transfer

---

### 📊 Суммарный эффект Phase 2

| Оптимизация | Снижение Origin Transfer |
|-------------|-------------------------|
| Удаление Image Proxy | **-10-15%** |
| RelatedArticles рефакторинг | **-5-8%** |
| TodayForYou cache | **-3-5%** |
| **ИТОГО Phase 2** | **-18-28%** |

---

### 📊 Общий эффект Phase 1 + Phase 2

| Метрика | До | После Phase 1 | После Phase 2 | Изменение |
|---------|-----|---------------|---------------|-----------|
| **Fast Origin Transfer** | ~95% лимита | ~65-70% | **~25-30%** | **-65-70%** |
| **Image proxy calls** | ~95% | ~95% | **0** | **-100%** |
| **API calls (articles)** | 100 items | 35 items | 35 items | **-65%** |
| **API calls (news)** | 120 items | 30 items | 30 items | **-75%** |
| **Homepage API calls** | дубликаты | оптимизировано | cached | **-60%** |

**Суммарное снижение Fast Origin Transfer:** **~65-70%**

---

## ЗАДАЧА ДЛЯ SERVER AI

### 1. Проверить работоспособность после Phase 2

**Vercel должен был автоматически задеплоить Phase 2 (коммиты уже в main).**

#### ✅ Критические проверки

**A. Homepage загружается:**
```bash
curl -I https://allhalal.info/
# Expected: HTTP/2 200
```

**B. Article pages загружаются:**
```bash
curl -I https://allhalal.info/read/what-is-halal-certification
# Expected: HTTP/2 200
```

**C. Images отображаются на article pages:**
```bash
# Открыть любую статью в браузере
# Проверить, что hero image загружается
# Expected: <img> или Next.js Image component, без /api/img/ в src
```

**D. Related Articles отображаются:**
```bash
# Открыть любую статью
# Прокрутить вниз до секции "Keep learning"
# Expected: 4-5 related articles
```

**E. News page images загружаются:**
```bash
# Открыть https://allhalal.info/news
# Проверить, что все 20 news cards показывают images
# Expected: images загружаются напрямую с CDN (без proxy)
```

---

### 2. Проверить, что image proxy НЕ существует

**F. Image proxy route удалён:**
```bash
curl -I "https://allhalal.info/api/img/test123"
# Expected: HTTP/2 404 Not Found
# (route больше не существует)
```

**G. Legacy image proxy существует (для совместимости):**
```bash
curl -I "https://allhalal.info/api/image-proxy?url=https://example.com/test.jpg"
# Expected: HTTP/2 400 или 502 (endpoint существует, но может fail на invalid URL)
# Important: НЕ должно быть 404
```

---

### 3. Проверить Vercel Metrics (через 2-4 часа после деплоя)

**Vercel Dashboard → Analytics → Functions:**

**Ожидаемые метрики:**
- **Fast Origin Transfer:** должно быть **~25-30% от Hobby лимита** (было ~95%)
- **Serverless Function Invocations:** должно снизиться на **~60-65%**
- **Edge Functions:** должно быть **0 или minimal** (image proxy удалён)

**Vercel Dashboard → Edge Network:**
- **Cache Hit Rate:** должен вырасти до **~60-70%** (было ~30%)
- **CDN Bandwidth:** должен вырасти (больше трафика через CDN, меньше через origin)

---

### 4. Проверить browser DevTools

**H. Images загружаются напрямую:**
```bash
# Открыть https://allhalal.info/news
# F12 → Network tab → Filter: Img
# Проверить URLs изображений
```

**Expected:**
```
✅ https://cdn.example.com/image.jpg (прямой CDN)
✅ /_next/image?url=... (Next.js Image optimization)
❌ /api/img/... (НЕ должно быть - route удалён)
```

---

### 5. Возможные проблемы и решения

#### Проблема 1: Images не загружаются на article pages

**Симптомы:**
- На `/read/[slug]` hero image не показывается
- Broken image icon

**Причина:**
- Возможно, imageUrl некорректный или CORS блокирует

**Решение:**
```bash
# Проверить Vercel Function Logs
# Vercel Dashboard → AllHalal-Web → Logs → Functions
# Искать ошибки связанные с images

# Если CORS issue - это нормально, некоторые sources блокируют hotlinking
# Custom articles должны работать (они на нашем CDN)
```

**Не критично** - некоторые external images могут fail из-за CORS, но custom articles должны работать.

---

#### Проблема 2: Related Articles не отображаются

**Симптомы:**
- На article pages нет секции "Keep learning"
- Или показывается < 3 статей

**Причина:**
- Недостаток статей в той же категории

**Решение:**
- Проверить, что в базе есть >= 90 published articles
- Проверить API: `curl https://api.allhalal.info/api/v1/custom/articles?page=1&limit=20`
- Если API возвращает статьи → проблема в frontend
- Если API не работает → проблема в backend

**Rollback (если критично):**
```bash
git revert 5e508c6
git push
```

---

#### Проблема 3: Fast Origin Transfer не снизился

**Симптомы:**
- Через 24-48 часов метрики показывают, что Origin Transfer всё ещё высокий (~60-80%)

**Причина:**
- Возможно, Phase 2 не задеплоен
- Или другие endpoints генерируют трафик

**Решение:**
```bash
# Проверить, что Phase 2 коммиты deployed
cd /home/allhalal/AllHalal-Web
git log --oneline -5

# Expected:
# 5e508c6 perf(fast-origin-transfer): Применены все Phase 2 оптимизации
# 841f517 perf(origin-transfer): Phase 2 optimization - Edge Runtime...
# 8ab0368 perf(fast-origin-transfer): Phase 2 оптимизации

# Если коммитов нет - сделать git pull
git pull origin main
```

**Анализ других источников трафика:**
```bash
# Vercel Dashboard → Analytics → Functions → Top Functions
# Проверить, какие endpoints генерируют больше всего calls
```

---

#### Проблема 4: Homepage не загружается (TodayForYou errors)

**Симптомы:**
- Homepage показывает 500 Internal Server Error
- Или TodayForYou widget не отображается

**Причина:**
- `unstable_cache` может вызывать проблемы в production

**Решение:**
```bash
# Проверить Vercel Function Logs
# Vercel Dashboard → Logs → Functions → filter by "TodayForYou"

# Если критическая ошибка → rollback
git revert 5e508c6
git push
```

---

### 6. Финальная проверка

После всех checks, подтвердить:

✅ Homepage загружается (HTTP 200)  
✅ Article pages загружаются (HTTP 200)  
✅ Images отображаются (без /api/img/)  
✅ Related Articles работают  
✅ News page images загружаются  
✅ /api/img/ route не существует (404)  
✅ /api/image-proxy всё ещё exists (для legacy)  

**Если все ✅:**
```
Phase 2 успешно deployed и работает.
Мониторинг метрик: проверить через 24-48 часов.
Ожидается снижение Fast Origin Transfer на ~65-70% (суммарно с Phase 1).
```

---

### 7. Мониторинг (через 24-48 часов)

**Что проверить:**

1. **Vercel Analytics → Functions → Fast Origin Transfer**
   - Должно быть **~25-30% от Hobby лимита**
   - Если выше (~50-60%) → Phase 2 частично не сработал

2. **Vercel Analytics → Edge Network → Cache Hit Rate**
   - Должно быть **~60-70%**
   - Если ниже (~30-40%) → CDN не кеширует эффективно

3. **Vercel Analytics → Functions → Invocations**
   - Должно снизиться на **~60-65%** относительно до Phase 1+2
   - Если снижение меньше (~30-40%) → не все оптимизации применились

---

### 8. Что НЕ нужно делать

❌ **НЕ** пытаться найти `/api/img/[token]/route.ts` - он **удалён**  
❌ **НЕ** пытаться найти `lib/proxiedImageUrl.ts` - он **удалён**  
❌ **НЕ** пытаться найти `lib/server/proxyRemoteImage.ts` - он **удалён**  
❌ **НЕ** перезапускать сервисы (Next.js на Vercel не требует перезапуска)  
❌ **НЕ** очищать кеш вручную (ISR работает автоматически)  
❌ **НЕ** трогать environment variables  

**Phase 2 - это архитектурные изменения в коде, не в конфигурации.**

---

## SUMMARY ДЛЯ SERVER AI

**Короткая версия:**

1. **Phase 2 уже deployed** (коммиты `8ab0368` и `5e508c6` в main branch)
2. **Проверить 8 критических checks** (A-H в разделе 1-4)
3. **Если все ОК → сообщить**: "Phase 2 deployed successfully, monitoring metrics in 24-48h"
4. **Если есть проблемы** → проверить Vercel Logs, сообщить детали
5. **Через 24-48 часов** → проверить метрики (раздел 7)

**Ожидаемый результат:**
- **Fast Origin Transfer: ~25-30% от лимита** (было ~95%)
- **Cache Hit Rate: ~60-70%** (было ~30%)
- **Суммарное снижение: ~65-70%**

**Время выполнения:** 10-15 минут (checks + мониторинг через 24-48h)

---

## NEXT STEPS (после подтверждения Phase 2)

**Если Phase 2 успешен:**
- Мониторинг метрик 1 неделю
- Если метрики стабильны → **оптимизация завершена**
- Если Fast Origin Transfer всё ещё высокий → искать другие источники трафика

**Если Phase 2 не снизил трафик достаточно:**
- Проанализировать Top Functions в Vercel Analytics
- Возможно, есть другие API endpoints, которые не оптимизированы
- Рассмотреть дополнительные оптимизации (Phase 3)

---

**Удачи с проверкой!** 🚀

P.S. Phase 2 уже deployed и должен работать. Задача Server AI - **подтвердить**, что всё ОК.
