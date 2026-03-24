# 🚀 BACKEND AI: ИТОГОВЫЙ ПРОМПТ

**Date:** March 18, 2026  
**From:** Frontend Team  
**To:** Backend AI  
**Priority:** P0 CRITICAL

**Картинки в карточках (брифы / news, `image_url` / `imageUrl`, OG, валидация):** полный текст промпта для backend — **[`docs/BACKEND_PROMPT_IMAGES_FULL_RU.md`](./BACKEND_PROMPT_IMAGES_FULL_RU.md)** (тот же каталог `docs/`, что и этот файл).

**ИИ-агенты (редакция, backend, обложки):** копируемые промпты и схема потока — **[`docs/AI_AGENTS_PLAYBOOK_RU.md`](./AI_AGENTS_PLAYBOOK_RU.md)**.

---

## Контракт фронт ↔ бэкенд (март 2026)

**Нужно ли что-то менять на бэкенде «обязательно»?**  
Чтобы **текущий** прод работал как задумано — **нет**: достаточно существующих `GET /api/v1/briefs/home` и `GET /api/v1/briefs/feed` (и `categories`).  
**Да**, если хотите **редакционные статьи на главной** — тогда нужен новый модуль по **`docs/CUSTOM_ARTICLES_BACKEND_SPEC.md`** (`/api/v1/custom/articles`, …).

### Как сейчас устроен AllHalal-Web

| Где | Запросы | Смысл |
|-----|---------|--------|
| **Главная** `/en` | Сначала `GET …/custom/articles?page=1&limit=24`. Если список **не пустой** — сетка = **только кастомные статьи** (ссылки на `/en/read/{id}`). | «Дом = ваши материалы», когда API живой. |
| **Главная** `/en` | Если **custom пустой или API нет** — `GET …/briefs/home?limit=20` и сетка как раньше (курируемый home). | Запасной режим без кастомного контента. |
| **News** `/en/news` | Параллельно **`/briefs/home`** + **`/briefs/feed`** (с `category` при фильтре). Фронт **склеивает**: порядок home → затем уникальные из feed (дедуп по URL первого источника или `id`), максимум **50** карточек. | «Все новости» и тот же домашний микс, без дублей. |

Итого продуктово: **всё «ленточное» смотреть в News**; **главная** при появлении кастомного API — **под статьи редакции**; до этого — курируемый home с API.

### Что полезно знать бэкенду (не блокер)

- Усилить **`/feed`**: больше записей, стабильные **`image_url`**, нормальные лимиты/пагинация — богаче news desk.
- Опционально: явно развести источники (home vs wire) в Redis — меньше смыслового дубля; фронт уже дедупит при merge.
- Старые цели вроде «overlap home/news» в этом файле стоит **пересмотреть** под новую схему (merge на news + custom на home).

---

## 📋 ЧТО ОТПРАВИТЬ

**ОДИН ФАЙЛ:** `docs/BACKEND_FIX_OVERLAP.md`

Этот файл содержит ВСЕ необходимое:
- ✅ Описание двух критичных проблем
- ✅ Готовый Python код
- ✅ Список RSS источников с URL
- ✅ Deployment checklist
- ✅ Команды для тестирования
- ✅ Success criteria

---

## 🎯 SUMMARY ДЛЯ BACKEND AI

### Две критичные проблемы:

**1. Content Overlap: 64%**
- HOME и NEWS показывают 7 одинаковых статей из 11
- Цель: <30% overlap

**2. Too Few Articles: 11 вместо 30+**
- NEWS показывает только 11 статей
- Цель: 30+ статей

### Корневые причины:

1. ❌ Нет source separation (Home и News берут из одних источников)
2. ❌ News не исключает статьи из Home (нет `home_ids` exclusion)
3. ❌ Не добавлены новые RSS sources (только 5 активных из 12 протестированных)
4. ❌ Низкие fetch limits (10 per source вместо 50)
5. ❌ Нет source balancing (один источник может взять все 30 слотов)

### Что нужно сделать:

**Step 0: Добавить 7 новых RSS в конфиг**
```python
# Эти источники ПРОТЕСТИРОВАНЫ в вашем audit и РАБОТАЮТ!
"Al Jazeera"         # 25 items
"5Pillars UK"        # 50 items (very active!)
"CNA"                # 12 items, 100% real images
"Premium Times"      # 15 items, 100% real images
"The Star Malaysia"  # 10 items
"Malaysiakini"       # 30 items
"Anadolu Agency"     # 30 items
```

**Step 1: HOME endpoint**
- Использовать ТОЛЬКО lifestyle sources (MuslimMatters, SeekersGuidance, Sound Vision, etc.)
- ИСКЛЮЧИТЬ news sources (Dawn, Hindu, Al Jazeera, etc.)

**Step 2: NEWS endpoint**
- Fetch Home IDs first: `home_ids = get_home_article_ids()`
- Exclude Home articles: `news_items = [item for item in all_items if item.id not in home_ids]`
- Увеличить limits: `limit_per_source=50, total_limit=300`
- Добавить balancing: `balance_sources(items, max_per_source=3)`

### Success Criteria:

```bash
ПОСЛЕ ДЕПЛОЯ:
- HOME: 12 articles, 5-7 sources ✅
- NEWS: 30+ articles, 10+ sources ✅
- OVERLAP: 3-4 articles (25-30%) ✅ <30%
```

### Команды для проверки:

```bash
# Test overlap
curl -s https://api.allhalal.info/api/v1/briefs/home | \
  jq -r '[.hero.id, (.featured[].id), (.compact[].id)] | .[]' | sort > /tmp/home.txt
  
curl -s https://api.allhalal.info/api/v1/briefs/feed?limit=30 | \
  jq -r '.items[].id' | sort > /tmp/news.txt

OVERLAP=$(comm -12 /tmp/home.txt /tmp/news.txt | wc -l)
echo "OVERLAP: $OVERLAP articles (должно быть <4)"

# Test article count
curl -s https://api.allhalal.info/api/v1/briefs/feed?limit=50 | \
  jq '.items | length'
# Должно быть 30+
```

---

## 📄 ПОЛНЫЙ ФАЙЛ

**Открой и прочитай:** `docs/BACKEND_FIX_OVERLAP.md`

Там есть:
- ✅ Детальное объяснение проблем
- ✅ Полный Python код для обоих endpoints
- ✅ Точные URL для RSS sources
- ✅ Helper функции (`balance_sources`)
- ✅ Deployment checklist (пошаговый)
- ✅ Команды для тестирования

---

## 🚨 PRIORITY

**P0 - CRITICAL!**

Проблемы влияют на UX:
- Duplicate content → плохо для пользователей
- Empty news page → страница выглядит незаконченной

**Action:** Implement ASAP! All code is ready in the file!

---

**Контакт:** Frontend Team  
**Файл:** `docs/BACKEND_FIX_OVERLAP.md` (16KB)  
**Дата:** March 18, 2026

---

## Картинки в ленте новостей (превью)

Отдельный готовый промпт для Backend AI: **`docs/BACKEND_PROMPT_NEWS_IMAGES.md`**  
(og:image, меньше дублей Pexels, кэш скрейпа, критерии готовности).
