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

### **PROS (преимущества):**

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

## 💡 РЕКОМЕНДАЦИЯ: УМЕРЕННОЕ РАСШИРЕНИЕ

### **Рекомендуемое количество: 25-30 источников**

**Почему не 50:**
- Islamic контент слишком редко обновляется
- Сложно найти 50 качественных sources
- Maintenance burden слишком высокий

**Почему не 20 (текущее):**
- Можно добавить еще хорошие sources
- Больше diversity всегда лучше
- Source balancing работает лучше с большим pool

### **Целевое распределение:**

**NEWS sources: 15-18** (currently 13)
```
Регионы:
- Middle East: 5 sources (Al Jazeera, MEE, MEMO, TRT World, Al Arabiya)
- South Asia: 3 sources (Dawn, Hindu, BDNews24)
- Africa: 2 sources (Premium Times, Anadolu Africa)
- Southeast Asia: 2 sources (CNA, The Star Malaysia)
- Europe: 1-2 sources (5Pillars UK, The Guardian)
- Global: 2-3 sources (NY Times, BBC, Reuters)
```

**HOME/Lifestyle sources: 10-12** (currently 7)
```
Категории:
- Faith & Practice: 3-4 (MuslimMatters, SeekersGuidance, Qalam, Yaqeen)
- Family & Education: 2-3 (Muslim Girl, Sound Vision, Ummah Wide)
- Halal Living: 2-3 (Halal Focus, Muslim Vibe, Honest Food Guide)
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

### **Шаг 1: Попроси Comet/ChatGPT составить список**

**Промпт для них:**
```
Create a list of 30-40 high-quality Islamic/Muslim content sources with RSS feeds.

Requirements:
1. Must have working RSS feed (URL included)
2. English language content
3. Regular updates (at least monthly)
4. Professional quality (no spam/clickbait)
5. Diverse categories: news, faith, family, halal living, finance

Split into:
- NEWS sources (regional Muslim news: Middle East, Asia, Africa, Europe)
- LIFESTYLE sources (faith, family, halal living, Islamic finance)

For each source provide:
- Name
- RSS URL
- Category (News/Faith/Family/Halal/Finance)
- Region (if news)
- Update frequency (daily/weekly/monthly)
- Brief description

Prioritize established, authoritative sources.
```

### **Шаг 2: Backend AI протестирует список**

Backend AI должен:
1. Проверить каждый RSS URL (HTTP status, item count)
2. Отфильтровать нерабочие (403, 404, timeout)
3. Проверить freshness (последняя статья не старше 60 дней)
4. Проверить качество (валидный XML, есть title/description)

**Expected result:**
- 30-40 sources предложено
- 20-25 sources реально работают
- 15-18 sources добавлены в production

### **Шаг 3: Мониторинг и cleanup**

После добавления:
1. Мониторить активность каждого source
2. Удалить неактивные через 2-3 месяца
3. Добавить новые взамен удаленных

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

## 📝 PROMPT ДЛЯ COMET/CHATGPT

```
Create a comprehensive list of 35 high-quality Islamic/Muslim content sources.

REQUIREMENTS:
✅ Working RSS feed (provide exact URL)
✅ English language content
✅ Monthly+ updates (active sources)
✅ Professional quality (authoritative, no spam)
✅ Halal content only

CATEGORIES NEEDED:
1. Regional News (15-18 sources):
   - Middle East: 5 sources (Al Jazeera, TRT World, Al Arabiya, etc.)
   - South Asia: 3 sources (Dawn, Hindu, BDNews24, etc.)
   - Africa: 2 sources (Premium Times, African news, etc.)
   - Southeast Asia: 2 sources (CNA, Star Malaysia, etc.)
   - Europe: 2 sources (5Pillars UK, etc.)
   - Global: 3 sources (NY Times World, BBC, Reuters)

2. Islamic Lifestyle (12-15 sources):
   - Faith & Practice: 4 (Yaqeen, MuslimMatters, SeekersGuidance, etc.)
   - Family & Education: 3 (Muslim Girl, Sound Vision, etc.)
   - Halal Living: 3 (Halal Focus, Muslim Vibe, etc.)
   - Islamic Finance: 2 (IFG, Wahed/Ethis blogs, etc.)

FORMAT:
| Name | RSS URL | Category | Region | Frequency | Description |

PRIORITY: Established, authoritative sources with proven track record.
```

---

**Created:** March 20, 2026  
**Status:** Ready for source expansion  
**Next Step:** Get list from Comet/ChatGPT → Backend AI tests → Add best 15-18
