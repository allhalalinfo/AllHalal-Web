# Промпт для Server AI: Deploy Phase 1 Optimization

---

## ЗАДАЧА

Deploy последнего коммита для Next.js проекта **AllHalal-Web** на Vercel.

Это **Phase 1** оптимизации Fast Origin Transfer - снижение нагрузки на origin server через уменьшение API calls и увеличение cache revalidate интервалов.

---

## ЧТО СДЕЛАНО

**Commit:** `cd5bced` (main branch)  
**Название:** "perf(origin-transfer): Phase 1 optimization - reduce API calls and revalidate frequency"

**Изменённые файлы:**
1. `components/articles/RelatedArticles.tsx` - снижен limit с 100 до 35 items
2. `app/(main)/news/page.tsx` - снижен limit с 120 до 30, revalidate 5 мин → 10 мин
3. `app/(main)/page.tsx` - revalidate 2 мин → 5 мин
4. `components/portal/TodayForYouServer.tsx` - revalidate 30 мин → 1 час
5. `app/sitemap.ts` - исправлен on-demand (revalidate=0) на ISR 24 часа

**Ожидаемый эффект:**
- Снижение Fast Origin Transfer на **25-35%**
- Снижение Serverless Function Invocations на **20-25%**
- Рост Cache Hit Rate с ~30% до ~45-50%

**Риски:** МИНИМАЛЬНЫЕ (только численные параметры, без изменений логики)

---

## ЧТО НУЖНО СДЕЛАТЬ

### 1. Проверить статус Vercel deployment

```bash
# Vercel автоматически деплоит при push в main
# Проверить статус последнего деплоя
```

**Ожидаемый результат:** Vercel должен был автоматически начать деплой после `git push`

---

### 2. Дождаться завершения деплоя

**Где проверить:**
- Vercel Dashboard → AllHalal-Web project → Deployments
- Найти deployment с коммитом `cd5bced`
- Статус должен быть "Ready" (зелёная галочка)

**Время деплоя:** ~3-5 минут (стандартный Next.js build)

---

### 3. Проверить работоспособность после деплоя

#### ✅ Критические проверки

**A. Homepage загружается:**
```bash
curl -I https://allhalal.info/
# Expected: HTTP/2 200
```

**B. News page загружается:**
```bash
curl -I https://allhalal.info/news
# Expected: HTTP/2 200
```

**C. Article page загружается:**
```bash
curl -I https://allhalal.info/read/what-is-halal-certification
# Expected: HTTP/2 200
```

**D. Sitemap доступен:**
```bash
curl -I https://allhalal.info/sitemap.xml
# Expected: HTTP/2 200
# Expected: Content-Type: application/xml
```

**E. Related articles отображаются:**
```bash
# Открыть любую статью в браузере
# Проверить, что внизу есть секция "Keep learning" с 4 статьями
```

---

#### ✅ Проверки производительности (опционально, через 1-2 часа после деплоя)

**Vercel Dashboard → Analytics → Functions:**
- Fast Origin Transfer (GB) - отслеживать динамику
- Serverless Function Invocations - должно начать снижаться

**Vercel Dashboard → Edge Network:**
- Cache Hit Rate - должен начать расти к ~45-50%

---

### 4. Возможные проблемы и решения

#### Проблема 1: Build failed в Vercel

**Симптомы:**
- Deployment статус "Failed" (красный крестик)
- Ошибки в Build Logs

**Решение:**
```bash
# Проверить build локально
cd /home/allhalal/AllHalal-Web
git pull origin main
npm run build

# Если есть ошибки - сообщить пользователю
```

**Rollback (если build failed):**
```bash
# Откатить коммит
git revert cd5bced
git push
```

---

#### Проблема 2: Страницы не загружаются (500/502 ошибки)

**Симптомы:**
- `curl -I https://allhalal.info/` возвращает 500 или 502
- Pages показывают Internal Server Error

**Решение:**
```bash
# Проверить Vercel Function Logs
# Vercel Dashboard → AllHalal-Web → Logs → Functions

# Если ошибки связаны с fetch или revalidate - rollback
git revert cd5bced
git push
```

---

#### Проблема 3: Related Articles не отображаются

**Симптомы:**
- На article pages нет секции "Keep learning"
- Или показывается меньше 3 статей

**Решение:**
- Это НЕ критично - может быть из-за недостатка статей в категории
- Если есть >= 3 статьи в базе, секция должна отображаться
- Проверить логи Vercel Functions на ошибки fetch

---

#### Проблема 4: Sitemap не обновляется

**Симптомы:**
- В sitemap.xml отсутствуют новые статьи

**Решение:**
- Это ОЖИДАЕМО - sitemap теперь кешируется на 24 часа
- Новые статьи появятся в sitemap через 24 часа
- Или можно использовать manual revalidation:

```bash
# Manually revalidate sitemap
curl -X POST 'https://allhalal.info/api/revalidate?path=/sitemap.xml&secret=YOUR_REVALIDATE_SECRET'
```

**Это НЕ проблема** - нормальное поведение ISR.

---

### 5. Финальная проверка

После завершения деплоя и всех проверок, подтвердить:

✅ Deployment успешно завершён (статус "Ready")  
✅ Homepage загружается (HTTP 200)  
✅ News page загружается (HTTP 200)  
✅ Article pages загружаются (HTTP 200)  
✅ Sitemap доступен (HTTP 200)  
✅ Related Articles отображаются (визуально)  

**Если все ✅ - сообщить пользователю: "Phase 1 успешно задеплоен, мониторинг метрик через 24-48 часов"**

---

### 6. Что НЕ нужно делать

❌ НЕ перезапускать никакие сервисы (это Next.js на Vercel, не требует перезапуска)  
❌ НЕ очищать кеш вручную (ISR работает автоматически)  
❌ НЕ изменять environment variables  
❌ НЕ трогать Docker/PM2 (это только для FastAPI backend, не для Next.js frontend)  

**Vercel полностью автоматический** - деплой происходит сам после `git push`.

---

### 7. Мониторинг после деплоя

**Через 2-4 часа после деплоя:**
- Проверить Vercel Analytics → Functions → Fast Origin Transfer
- Должно показывать тренд вниз (снижение трафика)

**Через 24 часа после деплоя:**
- Проверить Cache Hit Rate - должен вырасти до ~45-50%
- Проверить Function Invocations - должно снизиться на ~20-25%

**Через 48 часов:**
- Если метрики показывают ожидаемое снижение (~25-35% Origin Transfer) → Phase 1 успешна
- Можно переходить к Phase 2 (Image Proxy optimization)

---

## SUMMARY ДЛЯ SERVER AI

**Короткая версия задачи:**

1. Vercel должен был автоматически задеплоить коммит `cd5bced` после push
2. Дождаться завершения деплоя (3-5 минут)
3. Проверить 5 критических endpoint'ов (см. раздел 3)
4. Если все ОК → сообщить "Phase 1 deployed successfully"
5. Если есть ошибки → проверить Vercel Logs, сообщить детали

**Ожидаемое время выполнения:** 5-10 минут (включая ожидание деплоя)

**Риски:** Минимальные (только численные параметры)

**Rollback plan:** `git revert cd5bced && git push` (если что-то сломалось)

---

## NEXT STEPS (после успешного деплоя Phase 1)

После подтверждения успешного деплоя и проверки всех endpoint'ов:

**Phase 2: Image Proxy Optimization**
- Ожидаемое снижение Origin Transfer: дополнительно -60-70%
- Требует изменения 3 файлов + тестирование
- Более сложная задача, чем Phase 1

**User будет запрашивать Phase 2 после подтверждения успеха Phase 1.**

---

**Удачи с деплоем!** 🚀
