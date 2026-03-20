# 📋 ТРЕБОВАНИЯ К ИСТОЧНИКАМ И РЕКОМЕНДАЦИИ

**Date:** March 20, 2026  
**Current Sources:** 13 (NEWS) + 7 (HOME) = 20 total  
**Question:** Добавлять ли до 50 источников?

---

## 📊 ТЕКУЩЕЕ СОСТОЯНИЕ

### **Активные источники (20 total):**

**NEWS (13):**
- CNA (Singapore) - daily updates ✅
- Dawn (Pakistan) - daily updates ✅
- MEMO (Middle East Monitor) - daily updates ✅
- Middle East Eye - daily updates ✅
- NY Times World - daily updates ✅
- Premium Times (Nigeria) - daily updates ✅
- The Guardian World - daily updates ✅
- The Hindu (India) - daily updates ✅
- MuslimMatters - weekly updates
- Qalam Institute - weekly updates
- SeekersGuidance - weekly updates
- Sound Vision - weekly updates
- OnePath Network - sporadic

**HOME (7):**
- About Islam - weekly
- Halal Focus - sporadic ✅ (Halal Living!)
- Islam Channel - sporadic
- MuslimMatters - weekly
- OnePath Network - sporadic
- Qalam Institute - weekly
- Sound Vision - weekly

---

## ✅ ТЕКУЩИЕ ТРЕБОВАНИЯ К ИСТОЧНИКАМ

### **1. Технические требования:**
- ✅ **RSS feed работает** (200 OK, не 403/404/timeout)
- ✅ **Имеет content** (минимум 5+ items в feed)
- ✅ **Регулярно обновляется** (хотя бы раз в 60 дней)
- ✅ **Валидный XML/JSON** (парсится без ошибок)
- ✅ **Имеет title, description, link** (минимальные поля)

### **2. Контент требования:**

**NEWS sources:**
- ✅ **Региональные новости** (Middle East, Asia, Africa, Europe)
- ✅ **Muslim perspective** или covering Muslim regions
- ✅ **Авторитетный источник** (не блог одного человека)
- ✅ **Английский язык** (или имеет English RSS)
- ✅ **Halal content** (нет haram контента)

**HOME/Lifestyle sources:**
- ✅ **Islamic education** (Qur'an, Hadith, Fiqh)
- ✅ **Family & parenting** (Muslim family topics)
- ✅ **Halal living** (halal food, lifestyle, wellness)
- ✅ **Islamic finance** (halal investing, Zakat)
- ✅ **Community content** (не только новости)

### **3. Качество контента:**
- ✅ **Профессиональное написание** (не spam, не clickbait)
- ✅ **Авторитетные авторы** (scholars, experts, journalists)
- ✅ **Оригинальный контент** (не aggregator копирующий других)
- ✅ **Изображения желательны** (но не обязательно)

---

## 🤔 ДОБАВЛЯТЬ ЛИ ДО 50 ИСТОЧНИКОВ?

### **ДА! Просить нужно 50, но реально будет 25-30**

**Реальность Islamic RSS ecosystem:**
- 📊 **~50% sources не работают** (403, 404, timeout, redirect)
- 📊 **~20% неактивные** (не обновлялись >60 дней)
- 📊 **~30% реально работают** (15-20 из 50)

**Поэтому:**
- ✅ Просим 50 sources у Comet/ChatGPT
- ✅ Backend AI тестирует все 50
- ✅ Отсеиваются 25-30 нерабочих
- ✅ Добавляем 20-25 работающих в production

**Это даст:**
- ✅ 25-30 total sources (optimal)
- ✅ NEWS: 15-18 sources
- ✅ HOME: 10-12 sources

1. ✅ **Больше разнообразия**
   - Разные perspectives
   - Разные regions
   - Разные topics

2. ✅ **Резервирование**
   - Если 1-2 источника перестанут работать, будут другие
   - Меньше зависимость от отдельных источников

3. ✅ **Больше свежего контента**
   - Если каждый источник дает 3 статьи
   - 50 sources × 3 = 150 items pool
   - После balancing: 30-50 разнообразных статей

4. ✅ **Source balancing работает лучше**
   - Текущий алгоритм: max 3 per source
   - 50 sources × 3 = можно показывать 150 статей
   - Больше diversity автоматически

### **CONS (недостатки):**

1. ❌ **Islamic content публикуется редко**
   - 80% Islamic сайтов обновляются weekly/monthly
   - Только news sources обновляются daily
   - Из 50 sources активно будут только 15-20

2. ❌ **Maintenance burden**
   - Нужно мониторить 50 feeds
   - Многие будут ломаться (403, timeout, 404)
   - Нужен регулярный audit

3. ❌ **Качество может страдать**
   - Сложнее найти 50 качественных источников
   - Придется добавлять менее авторитетные
   - Риск spam/clickbait контента

4. ❌ **Slow RSS fetching**
   - Backend должен fetch 50 RSS feeds
   - Может занять 30-60 секунд
   - Нужен async fetching + caching

---

## 💡 РЕКОМЕНДАЦИЯ: ПРОСИТЬ 50, ПОЛУЧИТЬ 25-30

### **Запросить: 50 источников**
### **Реально получить: 20-25 работающих**
### **Target в production: 25-30 total**

**Почему просить 50:**
- ✅ ~50% отсеются при тестировании (broken RSS, 403, timeout)
- ✅ ~20% неактивные (не обновлялись месяцами)
- ✅ ~30% реально работают = 15-20 качественных sources
- ✅ Лучше иметь больший pool для отбора

**Почему не оставлять все 50 если работают:**
- ❌ Islamic контент слишком редко обновляется
- ❌ Maintenance burden (мониторить, обновлять)
- ❌ Fetch time (50 RSS feeds = 30-60 секунд)
- ✅ 25-30 optimal для quality + diversity

### **Целевое распределение после фильтрации:**

**NEWS sources: 15-18** (запросим 30, получим 15-18)
```
Регионы:
- Middle East: 5 sources (Al Jazeera, MEE, MEMO, TRT World, Al Arabiya)
- South Asia: 3 sources (Dawn, Hindu, BDNews24)
- Africa: 2 sources (Premium Times, Anadolu Africa)
- Southeast Asia: 2 sources (CNA, The Star Malaysia)
- Europe: 2 sources (5Pillars UK, The Guardian)
- Global: 3 sources (NY Times, BBC, Reuters)
```

**HOME/Lifestyle sources: 10-12** (запросим 20, получим 10-12)
```
Категории:
- Faith & Practice: 4 (MuslimMatters, SeekersGuidance, Qalam, Yaqeen)
- Family & Education: 3 (Muslim Girl, Sound Vision, Ummah Wide)
- Halal Living: 3 (Halal Focus, Muslim Vibe, Honest Food Guide)
- Islamic Finance: 2 (IFG, Ethis/Wahed Blog)
```

---

## 📋 КРИТЕРИИ ОТБОРА НОВЫХ ИСТОЧНИКОВ

### **Tier 1 - MUST HAVE (добавлять в первую очередь):**

1. ✅ **RSS работает** (200 OK)
2. ✅ **Обновляется регулярно** (хотя бы раз в месяц)
3. ✅ **Авторитетный источник** (известный бренд)
4. ✅ **Профессиональный контент**
5. ✅ **Нет технических проблем** (valid XML, изображения есть)

**Примеры:**
- Al Jazeera ✅
- TRT World ✅
- 5Pillars UK ✅
- Yaqeen Institute (если RSS работает) ✅

### **Tier 2 - NICE TO HAVE (добавлять если есть место):**

1. ✅ Tier 1 критерии
2. ⚠️ Обновляется реже (раз в 2-3 месяца)
3. ⚠️ Меньше известный бренд
4. ⚠️ Может иметь технические проблемы (но не critical)

**Примеры:**
- Muslim Heritage
- Virtual Mosque
- About Islam (уже добавлен)

### **Tier 3 - SKIP (не добавлять):**

1. ❌ RSS не работает (403, 404, timeout)
2. ❌ Не обновляется (последняя статья >6 months ago)
3. ❌ Плохое качество (spam, clickbait, grammar errors)
4. ❌ Не Islamic focus (general news без Muslim perspective)
5. ❌ Haram контент (даже если есть halal статьи)

---

## 🎯 ACTION PLAN

### **Шаг 1: Попроси Comet/ChatGPT составить список 50 источников**

**Промпт для них:**
```
Create a comprehensive list of 50 high-quality Islamic/Muslim content sources with RSS feeds.

IMPORTANT: We expect ~50% will not work (broken RSS, 403, timeout), so we need 50 to get 25 working sources.

Requirements:
1. Must have RSS feed URL (provide exact URL)
2. English language content
3. Should be active (at least attempted updates in last 6 months)
4. Professional quality sources (no spam/clickbait)
5. Diverse categories: news, faith, family, halal living, finance

Split into:
- NEWS sources (30): Regional Muslim news from Middle East, Asia, Africa, Europe, Global
- LIFESTYLE sources (20): Faith, family, halal living, Islamic finance, wellness

For each source provide:
| Name | RSS URL | Category | Region/Focus | Description |

Examples:
- Al Jazeera | https://www.aljazeera.com/xml/rss/all.xml | News | Middle East | Major news
- MuslimMatters | https://muslimmatters.org/feed/ | Faith | Global | Islamic education

Include both well-known (Al Jazeera, Dawn, NY Times) and niche sources (Islamic Finance blogs, Halal Living sites).

Priority: Cast a wide net - we will test and filter the working ones.
```

### **Шаг 2: Backend AI протестирует все 50**

Backend AI должен:
1. ✅ Проверить каждый RSS URL (HTTP status, item count)
2. ✅ Отфильтровать нерабочие (403, 404, timeout, redirect)
3. ✅ Проверить freshness (последняя статья не старше 90 дней)
4. ✅ Проверить качество (валидный XML, есть title/description)
5. ✅ Ранжировать по качеству (update frequency, content quality)

**Expected pipeline:**
- 50 sources предложено
- ~25 sources broken/timeout (отсеиваются)
- ~5 sources неактивные (отсеиваются)
- **20-25 sources реально работают** ✅
- Топ 20-25 добавляются в production

### **Шаг 3: Мониторинг и maintenance**

После добавления:
1. ✅ Quarterly audit (раз в 3 месяца)
2. ✅ Удалить неактивные sources (не обновлялись 90+ дней)
3. ✅ Добавить новые взамен удаленных (keep 25-30 active)
4. ✅ Мониторить RSS health (auto-detect broken feeds)

---

## 📊 ОЖИДАЕМЫЙ РЕЗУЛЬТАТ

### **С 25-30 источниками:**

**NEWS:**
```json
{
  "total": 30,
  "sources": 15-18,
  "distribution": "max 3 per source",
  "regions": "6+ regions covered",
  "updates": "daily fresh content"
}
```

**HOME:**
```json
{
  "total": 12,
  "sources": 10-12,
  "distribution": "max 2 per source",
  "categories": {
    "Faith & Practice": 40%,
    "Family & Education": 25%,
    "Halal Living": 20%,
    "Islamic Finance": 15%
  }
}
```

---

## ✅ ИТОГОВАЯ РЕКОМЕНДАЦИЯ

### **ДА, попроси составить список!**

**НО:**
- ❌ Не 50 источников (слишком много)
- ✅ 30-40 предложений (для отбора лучших)
- ✅ Backend AI протестирует и выберет 20-25 работающих
- ✅ В production добавим 15-18 (топ quality)

**Это даст:**
- ✅ Больше разнообразия (15-18 sources вместо 13)
- ✅ Лучший source balancing
- ✅ Больше категорий (Halal Living, Islamic Finance)
- ✅ Больше регионов (6+ covered)
- ✅ Меньше зависимость от отдельных sources

**Maintenance:**
- ⚠️ Нужен quarterly audit (раз в 3 месяца)
- ⚠️ Удалять неактивные sources
- ⚠️ Добавлять новые взамен удаленных

---

## 📝 PROMPT ДЛЯ COMET/CHATGPT (50 SOURCES)

```
Create a comprehensive list of 50 high-quality Islamic/Muslim content sources with RSS feeds.

CONTEXT: We expect ~50% will have broken/non-working RSS feeds. We need 50 suggestions to get 20-25 working sources after testing.

REQUIREMENTS:
✅ RSS feed URL (provide exact URL - critical!)
✅ English language content
✅ Should be active (attempted updates in last 6 months)
✅ Professional quality (no spam/clickbait)
✅ Halal content only
✅ Diverse sources (well-known + niche)

CATEGORIES NEEDED:
1. Regional News (30 sources):
   - Middle East: 10 (Al Jazeera, MEE, MEMO, TRT World, Al Arabiya, Times of Israel, Haaretz, etc.)
   - South Asia: 6 (Dawn, Hindu, BDNews24, Pakistan Today, Indian Express, etc.)
   - Africa: 4 (Premium Times, Daily Nation, African news outlets, etc.)
   - Southeast Asia: 4 (CNA, Star Malaysia, Straits Times, Jakarta Post, etc.)
   - Europe: 3 (5Pillars UK, The Guardian World, etc.)
   - Global: 3 (NY Times World, BBC World, Reuters, etc.)

2. Islamic Lifestyle (20 sources):
   - Faith & Practice: 6 (Yaqeen Institute, MuslimMatters, SeekersGuidance, Qalam Institute, Bayyinah, etc.)
   - Family & Education: 5 (Muslim Girl, Sound Vision, Ummah Wide, Muslim Youth, etc.)
   - Halal Living: 5 (Halal Focus, Muslim Vibe, Honest Food Guide, Haute Hijab blog, etc.)
   - Islamic Finance: 4 (Islamic Finance Guru, Wahed blog, Ethis blog, Salaam Gateway, etc.)

FORMAT (table):
| Name | RSS URL | Category | Region/Focus | Description |

EXAMPLES:
| Al Jazeera | https://www.aljazeera.com/xml/rss/all.xml | News | Middle East | Major news outlet |
| Dawn | https://www.dawn.com/feeds/home | News | Pakistan | Leading Pakistani newspaper |
| MuslimMatters | https://muslimmatters.org/feed/ | Faith | Global | Islamic education and community |
| Islamic Finance Guru | https://islamicfinanceguru.com/feed/ | Finance | Global | Halal investing education |

IMPORTANT:
- Include RSS URL for EVERY source (critical for testing)
- Mix of well-known (Al Jazeera, Dawn) and niche sources
- Cast a wide net - we will test all and keep working ones
- Prioritize sources you've heard of or can verify exist
- Include alternatives if main source might not work (e.g., multiple Islamic Finance blogs)

GOAL: 50 suggestions → Backend tests all → Keep 20-25 working sources
```

---

**Created:** March 20, 2026  
**Updated:** March 20, 2026 - Changed to 50 sources (was 35)  
**Reason:** ~50% of RSS feeds don't work, need 50 to get 20-25 working  
**Status:** Ready for source expansion  
**Next Step:** Get list of 50 from Comet/ChatGPT → Backend AI tests all 50 → Add best 20-25

---

## ✅ SUMMARY

**ASK FOR:** 50 sources  
**EXPECT TO GET:** 20-25 working sources  
**TARGET:** 25-30 total in production  

**Pipeline:** 50 → test → ~25 broken → ~5 inactive → **20-25 working** ✅
