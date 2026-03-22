# Web AI: курирование RSS и стоп-слова (январь 2026)

**Контекст:** на бэкенде сузили пул RSS-источников до согласованного списка (~52 фида), ввели **тематические слаги** в данных и обновили **стоп-слова** в заголовках. API уже приводит «главную» метку категории к **старым человекочитаемым названиям**, чтобы не ломать UI.

---

## 1. Что изменилось на Backend (важно для фронта)

| Поле | Что теперь |
|------|------------|
| **`category`** | **Отображаемая** категория в **legacy-формате**: `Faith & Practice`, `Family & Education`, `Islamic Finance`, `Halal Living` и т.д. (маппинг из тематических слагов в `api/routers/briefs.py`). |
| **`categories`** | Массив как в кеше Redis: чаще всего **слаги** из набора `islam`, `family`, `finance`, `halal`, `zakat`, `spirituality` (иногда смесь со старыми строками, если в кеше остались старые записи). |

**Правило балансировки** (как у updater): при **двух** категориях для ранжирования/«второй оси» используется **второй** элемент — это же правило заложено в `category_from_rss_item()` → в API в **`category`** попадает уже **смапленное** отображаемое имя для этого второго (или единственного) слага.

---

## 1b. Реализация на Web (зафиксировано командой)

**Репозиторий Web · ветка `main` · коммит `065be58`**

| Что сделано | Детали |
|-------------|--------|
| **`types/brief.ts`** | Опционально **`categories?: string[]`** — сырой массив из API/Redis. |
| **`lib/briefs.ts`** | **`THEMATIC_SLUG_TO_BRIEF_CATEGORY`** — маппинг слагов в legacy-имена (должен совпадать с бэкендом `THEMATIC_SLUG_TO_DISPLAY_CATEGORY` в `briefs.py`; на фронте можно расширить, напр. **`ummah` / `world` → Ummah & World** для старых записей в Redis, хотя текущий `RSS_SOURCES` отдаёт только слаги из `ALLOWED_CATEGORIES`). |
| | **`normalizeBriefDisplayCategory()`** — если `category` уже из `BRIEF_CATEGORIES`, оставить; если пришёл одиночный слаг — маппинг; иначе разбор **`categories[]`**: приоритет любой **legacy**-строке; если только слаги и элементов **≥ 2**, сначала проверяется **второй** слаг (как `category_from_rss_item` на API), затем остальные. |
| | **`sanitizeBrief()`** всегда прогоняет **`category`** через нормализацию — карточки, чипы, сток-плейсхолдеры на стабильных подписях. |
| | Удалён **`getFallbackBriefCategory`**; **`mapNewsItemToBrief`** и счётчики в **`getBriefCategories`** опираются на **`normalizeBriefDisplayCategory`**. |
| **`NewsHubClient.tsx`** | Вместо **`categories[0]`** — **`normalizeBriefDisplayCategory`** (если компонент снова в проде). |
| **Документ в Web** | Этот файл — памятка команды. |

**Маршрут `/news?category=…`:** фильтры строятся на **slug от legacy-`category`** (`slugifyBriefCategory`), т.е. после нормализации совпадают с отображаемой категорией. Отдельный query по «сырому» слагу из `categories[]` **бэкенд сейчас не обещает** — если понадобится, это отдельная договорённость по API.

**Синхронизация маппингов:** при добавлении нового слага в `news_curation_config.ALLOWED_CATEGORIES` и в `RSS_SOURCES` обновить **оба** места: `api/routers/briefs.py` → `THEMATIC_SLUG_TO_DISPLAY_CATEGORY` и Web → `THEMATIC_SLUG_TO_BRIEF_CATEGORY`.

---

## 2. Что делать на Web (при необходимости)

### Фильтры / табы / чипы по теме

- Ориентируйтесь на **`category`** (стабильные подписи для UI), **если** нужны те же бакеты, что раньше.
- Если делаете фильтр по **`categories[]`**, учитывайте **оба** формата до полного протухания старого кеша:
  - слаги: `islam`, `family`, …
  - legacy: `Faith & Practice`, …

### Стили / иконки по категории

- Привязывайте цвета/иконки к **`category`** (строки из фиксированного списка legacy), а не к сырым слагам — так меньше расхождений.

### Кэш у пользователей

- После деплоя API+updater первые ответы могут ещё содержать **старые** статьи с удалённых фидов, пока Redis не обновят на сервере. Это не баг фронта.

### Ничего срочно менять не нужно, если:

- вы уже используете **`category`** для подписи на карточке и сток-плейсхолдеров;
- не парсите жёстко только `categories[0]` как «только Faith».

---

## 3. Стоп-слова (для понимания продукта)

Заголовки с подстроками из `BLOCKED_KEYWORDS` в `news_curation_config.py` **не попадают** в ленту после прогона updater (спорт, часть развлечений, общая западная политика, крипто-мемы, шум вроде `breaking news` / `exclusive` / `video:`). Если «пропала» новость — сначала проверь заголовок на эти шаблоны.

---

## 4. Где смотреть в репозитории Backend

- Список фидов и `categories` у источников: `allhalal_news_updater.py` → `RSS_SOURCES`.
- Маппинг слагов → отображаемая категория и сток: `api/routers/briefs.py` → `THEMATIC_SLUG_TO_DISPLAY_CATEGORY`, `category_from_rss_item`, `ensure_image_url`.
- Стоп-слова: `news_curation_config.py` → `BLOCKED_KEYWORDS`.

---

## 5. Краткий чеклист после серверного деплоя

- [ ] `/briefs/home` и `/briefs/feed`: поле **`category`** — ожидаемые строки (`Faith & Practice`, …), не «islam».
- [ ] Фильтры по категории работают на **`category`**.
- [ ] При пустой/битой картинке сток подставляется (ключ стока завязан на отображаемую категорию).

---

# Синхронизация категорий RSS: Backend ↔ Web (январь 2026)

Краткая шпаргалка для двух репозиториев после курирования RSS и тематических слагов.

## Контракт API

| Поле | Backend (`briefs.py`) | Web |
|------|------------------------|-----|
| `category` | Legacy-строка после `category_from_rss_item` + `THEMATIC_SLUG_TO_DISPLAY_CATEGORY` | Дублирующая нормализация в `normalizeBriefDisplayCategory()` (устойчивость к старому кешу и edge cases) |
| `categories` | Как в Redis: чаще слаги `islam`, `family`, `finance`, `halal`, `zakat`, `spirituality` | Тип `categories?: string[]`, логика разбора согласована с правилом «второй элемент при двух слагах» |

## Маппинг слагов → legacy (должен совпадать)

**Backend:** `api/routers/briefs.py` → `THEMATIC_SLUG_TO_DISPLAY_CATEGORY`

**Web:** `lib/briefs.ts` → `THEMATIC_SLUG_TO_BRIEF_CATEGORY`

Базовый набор (январь 2026):

- `islam`, `spirituality` → Faith & Practice  
- `family` → Family & Education  
- `finance`, `zakat` → Islamic Finance  
- `halal` → Halal Living  

На Web допустимо расширение (например `ummah`, `world` → Ummah & World) для **старых** объектов в Redis; в актуальном `RSS_SOURCES` бэкенда эти слаги в `categories` источника не используются.

## Где править при новом слаге

1. `news_curation_config.py` — `ALLOWED_CATEGORIES`  
2. `allhalal_news_updater.py` — `RSS_SOURCES` / `THEMATIC_SLUG_TO_STOCK_POOL` при необходимости для стока  
3. `api/routers/briefs.py` — `THEMATIC_SLUG_TO_DISPLAY_CATEGORY`, при необходимости `CATEGORY_STOCK_IMAGES`  
4. Web — `THEMATIC_SLUG_TO_BRIEF_CATEGORY` и список `BRIEF_CATEGORIES` / стили

## Ссылки

- Backend: `PROMPT_FOR_WEB_RSS_CURATION_JAN2026.md`, `PROMPT_FOR_SERVER_RSS_CURATION_JAN2026.md`  
- Web: `docs/WEB_RSS_CURATION_JAN_2026.md`, коммит **065be58** (`main`)

---

*Промпт сгенерирован под изменения RSS + curation январь 2026.*
