# 🎯 ПОЛНЫЙ ПРОМПТ ДЛЯ BACKEND CURSOR АГЕНТА (Hetzner)

## Контекст

Ты работаешь на сервере Hetzner для проекта AllHalal.info. Задача: расширить систему автоматического обновления новостей для мусульман.

**Что уже есть:**
- ✅ Redis работает в Docker
- ✅ FastAPI backend работает
- ✅ PostgreSQL работает
- ✅ Базовый RSS parser (5 источников)
- ✅ Gemini проверяет золото/серебро 2 раза в день

**Что нужно добавить:**
- 🔄 Расширить до 22+ RSS источников (максимум контента)
- 🔄 Улучшить парсинг картинок (высокое качество)
- 🔄 Добавить Currency Exchange endpoint (для Finance раздела)
- 🔄 Логирование и мониторинг

---

## 📋 ЗАДАЧА 1: Обновить RSS Parser (расширенная версия)

### 1.1 Обновить файл `/root/allhalal_news_updater.py`

Если файл уже существует - **замени его полностью** этим кодом:

```python
#!/usr/bin/env python3
"""
AllHalal News Updater - Extended Version
Парсит 22+ RSS источников для мусульманских новостей
Приоритет на качественные картинки и полный контент
"""

import feedparser
import redis
import json
from datetime import datetime
import sys
import re
from html.parser import HTMLParser

# Подключение к Redis
try:
    r = redis.Redis(
        host='localhost',
        port=6379,
        decode_responses=True,
        socket_timeout=5
    )
    r.ping()
    print("✓ Redis connected")
except Exception as e:
    print(f"✗ Redis connection failed: {e}")
    sys.exit(1)

# === РАСШИРЕННЫЙ СПИСОК RSS ИСТОЧНИКОВ (22 источника) ===
RSS_SOURCES = [
    # Faith & Practice (Priority 1)
    {
        "name": "Yaqeen Institute",
        "url": "https://yaqeeninstitute.org/rss.xml",
        "priority": 1,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    {
        "name": "SeekersGuidance",
        "url": "https://seekersguidance.org/feed/",
        "priority": 1,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    {
        "name": "About Islam",
        "url": "https://aboutislam.net/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    {
        "name": "IslamiCity",
        "url": "https://www.islamicity.org/feed/",
        "priority": 3,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    {
        "name": "MuslimMatters",
        "url": "https://muslimmatters.org/feed/",
        "priority": 2,
        "safe": False,
        "categories": ["Faith & Practice", "Ummah & World"]
    },
    {
        "name": "Islam21c",
        "url": "https://www.islam21c.com/feed/",
        "priority": 3,
        "safe": False,
        "categories": ["Faith & Practice"]
    },
    
    # Family & Education
    {
        "name": "Productive Muslim",
        "url": "https://productivemuslim.com/feed/",
        "priority": 1,
        "safe": True,
        "categories": ["Family & Education", "Health & Wellness"]
    },
    {
        "name": "Muslim Heritage",
        "url": "https://muslimheritage.com/feed/",
        "priority": 3,
        "safe": True,
        "categories": ["Family & Education"]
    },
    {
        "name": "Virtual Mosque",
        "url": "https://www.virtualmosque.com/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Family & Education"]
    },
    {
        "name": "Lost Islamic History",
        "url": "https://lostislamichistory.com/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Family & Education"]
    },
    {
        "name": "Muslim Youth Musings",
        "url": "https://muslimyouthmusings.com/feed/",
        "priority": 3,
        "safe": True,
        "categories": ["Family & Education"]
    },
    
    # Halal Living
    {
        "name": "HalalZilla",
        "url": "https://www.halalzilla.com/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Halal Living"]
    },
    {
        "name": "HalalTrip",
        "url": "https://www.halaltrip.com/blog/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Halal Living"]
    },
    {
        "name": "Salaam Gateway",
        "url": "https://salaamgateway.com/rss",
        "priority": 2,
        "safe": True,
        "categories": ["Halal Living", "Islamic Finance"]
    },
    
    # Islamic Finance (РАСШИРЕНО!)
    {
        "name": "IFG",
        "url": "https://www.islamicfinanceguru.com/rss.xml",
        "priority": 1,
        "safe": True,
        "categories": ["Islamic Finance"]
    },
    {
        "name": "Islamic Finance News",
        "url": "https://www.islamicfinancenews.com/rss",
        "priority": 1,
        "safe": True,
        "categories": ["Islamic Finance"]
    },
    {
        "name": "Gulf News Islamic Economy",
        "url": "https://gulfnews.com/business/markets/islamic-economy/rss",
        "priority": 2,
        "safe": True,
        "categories": ["Islamic Finance"]
    },
    {
        "name": "MIFC",
        "url": "https://www.mifc.com/rss",
        "priority": 3,
        "safe": True,
        "categories": ["Islamic Finance"]
    },
    
    # Health & Wellness
    {
        "name": "Muslim Girl",
        "url": "https://muslimgirl.com/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Health & Wellness", "Family & Education"]
    },
    
    # Ummah & World
    {
        "name": "Islamic Relief",
        "url": "https://islamic-relief.org/feed/",
        "priority": 3,
        "safe": False,
        "categories": ["Ummah & World"]
    },
    {
        "name": "Al Jazeera",
        "url": "https://www.aljazeera.com/xml/rss/all.xml",
        "priority": 4,
        "safe": False,
        "categories": ["Ummah & World"]
    },
    {
        "name": "Middle East Eye",
        "url": "https://www.middleeasteye.net/rss",
        "priority": 3,
        "safe": False,
        "categories": ["Ummah & World"]
    },
    
    # Technology
    {
        "name": "Muslim Pro Blog",
        "url": "https://blog.muslimpro.com/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Family & Education"]
    }
]

# === УЛУЧШЕННЫЙ ПАРСИНГ КАРТИНОК ===
def extract_best_image(entry):
    """
    Продвинутое извлечение картинок с приоритетом на качество
    """
    images = []
    
    # 1. Media content (обычно лучшее качество)
    if hasattr(entry, 'media_content') and entry.media_content:
        for media in entry.media_content:
            if 'url' in media:
                width = int(media.get('width', 0))
                height = int(media.get('height', 0))
                score = width * height if width and height else 1000000
                images.append({
                    'url': media['url'],
                    'score': score,
                    'source': 'media_content'
                })
    
    # 2. Media thumbnail (backup)
    if hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
        for thumb in entry.media_thumbnail:
            if 'url' in thumb:
                images.append({
                    'url': thumb['url'],
                    'score': 500000,
                    'source': 'media_thumbnail'
                })
    
    # 3. Enclosures
    if hasattr(entry, 'enclosures') and entry.enclosures:
        for enc in entry.enclosures:
            if 'href' in enc and any(ext in enc.get('type', '') for ext in ['image', 'jpeg', 'jpg', 'png']):
                images.append({
                    'url': enc['href'],
                    'score': 800000,
                    'source': 'enclosure'
                })
    
    # 4. Парсинг HTML content для поиска <img> тегов
    content = entry.get('summary', '') or entry.get('content', [{}])[0].get('value', '') if hasattr(entry, 'content') else ''
    
    # Поиск всех img src
    img_pattern = r'<img[^>]+src=["\'](https?://[^"\']+)["\']'
    for match in re.finditer(img_pattern, content):
        url = match.group(1)
        
        # Исключаем плохие картинки
        if any(bad in url.lower() for bad in ['emoji', 'avatar', 'icon', 'logo', 'gravatar', '150x150']):
            continue
        
        # Бонус за ключевые слова качества
        score = 600000
        if any(good in url.lower() for good in ['large', 'full', 'original', '1200', '1600', '2000', 'featured']):
            score += 300000
        
        images.append({
            'url': url,
            'score': score,
            'source': 'html_content'
        })
    
    # 5. OpenGraph image (часто хорошее качество)
    og_pattern = r'<meta[^>]+property=["\'

]og:image["\'][^>]+content=["\'](https?://[^"\']+)["\']'
    for match in re.finditer(og_pattern, content):
        images.append({
            'url': match.group(1),
            'score': 900000,
            'source': 'opengraph'
        })
    
    # Сортируем по score и возвращаем лучшую
    if images:
        best = sorted(images, key=lambda x: x['score'], reverse=True)[0]
        return best['url']
    
    return None

def clean_excerpt(text, max_length=200):
    """Очистка и форматирование excerpt"""
    if not text:
        return ""
    
    # Удаляем HTML теги
    text = re.sub(r'<[^>]+>', '', text)
    
    # Декодируем HTML entities
    text = text.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&quot;', '"')
    text = text.replace('&#8217;', "'").replace('&#8220;', '"').replace('&#8221;', '"')
    
    # Удаляем лишние пробелы
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Обрезаем до max_length
    if len(text) > max_length:
        text = text[:max_length].rsplit(' ', 1)[0] + '...'
    
    return text

def parse_feed(source):
    """Парсинг одного RSS feed с улучшенным извлечением данных"""
    try:
        print(f"  Parsing {source['name']}...", end=' ', flush=True)
        feed = feedparser.parse(source['url'])
        
        if not feed.entries:
            print(f"✗ No entries")
            return []
        
        items = []
        for entry in feed.entries[:15]:  # Берем больше статей (15 вместо 10)
            # Извлекаем лучшую картинку
            image_url = extract_best_image(entry)
            
            # Получаем excerpt
            summary = entry.get('summary', '')
            if not summary and hasattr(entry, 'content'):
                summary = entry.content[0].get('value', '') if entry.content else ''
            
            excerpt = clean_excerpt(summary, max_length=250)
            
            item = {
                "id": entry.get('id', entry.link),
                "title": entry.get('title', 'Untitled'),
                "url": entry.link,
                "sourceName": source['name'],
                "sourceId": source['name'].lower().replace(' ', '-'),
                "publishedAt": entry.get('published', entry.get('updated', '')),
                "excerpt": excerpt,
                "imageUrl": image_url,
                "categories": source['categories']
            }
            
            # Пропускаем если заголовок слишком короткий или нет excerpt
            if len(item['title']) < 20 or len(excerpt) < 40:
                continue
            
            items.append(item)
        
        print(f"✓ {len(items)} items")
        return items
    
    except Exception as e:
        print(f"✗ Error: {e}")
        return []

def update_cache():
    """Обновление кеша в Redis"""
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting news update (22 sources)...")
    print("=" * 70)
    
    all_items = []
    safe_items = []
    stats = {'total': 0, 'safe': 0, 'with_images': 0}
    
    # Парсим все источники
    for source in RSS_SOURCES:
        items = parse_feed(source)
        all_items.extend(items)
        
        if source.get('safe'):
            safe_items.extend(items)
        
        # Статистика
        stats['total'] += len(items)
        if source.get('safe'):
            stats['safe'] += len(items)
        stats['with_images'] += sum(1 for item in items if item.get('imageUrl'))
    
    print("=" * 70)
    print(f"\n📊 Statistics:")
    print(f"  Total articles: {stats['total']}")
    print(f"  Safe articles: {stats['safe']}")
    print(f"  Articles with images: {stats['with_images']} ({stats['with_images']*100//stats['total'] if stats['total'] else 0}%)")
    
    # Данные для кеша
    cache_all = {
        "items": all_items[:80],  # Увеличено до 80 (было 50)
        "timestamp": int(datetime.now().timestamp() * 1000),
        "source": "hetzner_redis",
        "count": len(all_items)
    }
    
    cache_safe = {
        "items": safe_items[:30],  # Увеличено до 30 (было 20)
        "timestamp": int(datetime.now().timestamp() * 1000),
        "source": "hetzner_redis",
        "count": len(safe_items)
    }
    
    # Сохраняем в Redis
    try:
        r.setex("news:aggregated:safe-false", 1800, json.dumps(cache_all, ensure_ascii=False))
        r.setex("news:aggregated:safe-true", 1800, json.dumps(cache_safe, ensure_ascii=False))
        
        print(f"\n✅ Cached to Redis (TTL: 30 min)")
        print(f"  Key 1: news:aggregated:safe-false ({len(cache_all['items'])} items)")
        print(f"  Key 2: news:aggregated:safe-true ({len(cache_safe['items'])} items)")
        
    except Exception as e:
        print(f"\n✗ Redis write error: {e}")
        sys.exit(1)
    
    print(f"\n[{datetime.now().strftime('%H:%M:%S')}] ✅ Update complete!\n")

if __name__ == "__main__":
    update_cache()
```

**Установить зависимости (если еще не установлены):**
```bash
pip3 install feedparser redis requests
```

**Тест скрипта:**
```bash
docker exec -i allhalal-api-1 python /app/allhalal_news_updater.py
```

Ожидаемый вывод:
```
✓ Redis connected
  Parsing Yaqeen Institute... ✓ 12 items
  Parsing SeekersGuidance... ✓ 14 items
  ...
📊 Statistics:
  Total articles: 250+
  Safe articles: 150+
  Articles with images: 200+ (80%)
✅ Cached to Redis
```

---

## 📋 ЗАДАЧА 2: Добавить Currency Exchange Endpoint

### 2.1 Создать новый файл: `api/routers/finance.py`

```python
from fastapi import APIRouter, HTTPException
from redis import Redis
import requests
import json
from datetime import datetime

router = APIRouter(prefix="/finance", tags=["finance"])

# Redis connection
redis_client = Redis(
    host='localhost',
    port=6379,
    decode_responses=True
)

# API Key для Exchange Rates
EXCHANGE_RATE_API_KEY = "6f61b49fac2f43afcb58c3fd"

@router.get("/rates")
async def get_exchange_rates(
    base: str = "USD",
    symbols: str = "EUR,GBP,SAR,AED,TRY,MYR,IDR,PKR"
):
    """
    Получить курсы валют
    Кеш: 6 часов
    """
    try:
        # Проверяем кеш
        cache_key = f"finance:rates:{base}"
        cached = redis_client.get(cache_key)
        
        if cached:
            data = json.loads(cached)
            age_hours = (datetime.now().timestamp() - data['timestamp']) / 3600
            
            if age_hours < 6:
                return {
                    "success": True,
                    "base": base,
                    "rates": data['rates'],
                    "timestamp": data['timestamp'],
                    "cached": True,
                    "age_hours": round(age_hours, 2)
                }
        
        # Запрос к API
        url = f"https://v6.exchangerate-api.com/v6/{EXCHANGE_RATE_API_KEY}/latest/{base}"
        response = requests.get(url, timeout=10)
        
        if response.status_code != 200:
            raise HTTPException(status_code=502, detail="Exchange rate API error")
        
        api_data = response.json()
        
        if api_data.get('result') != 'success':
            raise HTTPException(status_code=502, detail="Invalid API response")
        
        # Фильтруем нужные валюты
        requested_symbols = symbols.split(',')
        filtered_rates = {
            symbol: api_data['conversion_rates'].get(symbol)
            for symbol in requested_symbols
            if symbol in api_data['conversion_rates']
        }
        
        # Сохраняем в кеш (6 часов = 21600 сек)
        cache_data = {
            "rates": filtered_rates,
            "timestamp": datetime.now().timestamp()
        }
        redis_client.setex(cache_key, 21600, json.dumps(cache_data))
        
        return {
            "success": True,
            "base": base,
            "rates": filtered_rates,
            "timestamp": cache_data['timestamp'],
            "cached": False,
            "age_hours": 0
        }
        
    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=502, detail=f"API request failed: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/rates/health")
async def finance_health():
    """Health check для finance endpoints"""
    try:
        # Проверяем есть ли закешированные данные
        has_rates = redis_client.exists("finance:rates:USD")
        
        return {
            "redis_connected": True,
            "rates_cached": bool(has_rates),
            "status": "healthy"
        }
    except:
        return {
            "redis_connected": False,
            "status": "unhealthy"
        }
```

### 2.2 Подключить router в `main.py`

Найди файл где `app = FastAPI()` и добавь:

```python
from api.routers.finance import router as finance_router

app.include_router(finance_router, prefix="/api/v1")
```

### 2.3 Перезапустить FastAPI

```bash
docker restart allhalal-api-1
# или
systemctl restart fastapi
```

### 2.4 Тест finance endpoint

```bash
# Health check
curl http://localhost:8000/api/v1/finance/rates/health

# Получить курсы
curl "http://localhost:8000/api/v1/finance/rates?base=USD&symbols=EUR,GBP,SAR,AED"
```

Ожидаемый ответ:
```json
{
  "success": true,
  "base": "USD",
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79,
    "SAR": 3.75,
    "AED": 3.67
  },
  "timestamp": 1710427890.123,
  "cached": false,
  "age_hours": 0
}
```

---

## 📋 ЗАДАЧА 3: Обновить Cron (если нужно)

Проверь текущий cron:
```bash
crontab -l | grep allhalal
```

Если нужно обновить (например, запускать чаще для большего количества источников):

```bash
crontab -e
```

Замени на:
```
# RSS новости каждые 30 минут
*/30 * * * * docker exec -i allhalal-api-1 python /app/allhalal_news_updater.py >> /var/log/allhalal-news.log 2>&1
```

---

## ✅ ФИНАЛЬНЫЙ ЧЕКЛИСТ

После выполнения всех задач, проверь:

```bash
# 1. Обновленный RSS parser работает
docker exec -i allhalal-api-1 python /app/allhalal_news_updater.py
# Ожидаем: ✓ 250+ статей, 80%+ с картинками

# 2. Больше данных в Redis
docker exec allhalal-redis-1 redis-cli KEYS 'news:*'
docker exec allhalal-redis-1 redis-cli KEYS 'finance:*'

# 3. News endpoint работает
curl "http://localhost:8000/api/v1/news/cached?limit=10" | jq '.count'
# Ожидаем: больше статей с imageUrl

# 4. Finance endpoint работает
curl "http://localhost:8000/api/v1/finance/rates?base=USD" | jq '.rates'
# Ожидаем: курсы валют

# 5. Cron работает
tail -f /var/log/allhalal-news.log
```

---

## 📝 ОТЧЕТ

После завершения напиши:

```
✅ Задача 1: RSS parser обновлен
   - Источников: 22 (было 5)
   - Статей в кеше: ~250 (было 30)
   - С картинками: XX%
   
✅ Задача 2: Finance endpoint добавлен
   - URL: /api/v1/finance/rates
   - Кеш: 6 часов
   - API ключ: используется
   
✅ Задача 3: Cron обновлен/проверен
   - Расписание: */30 * * * *
   - Логи: работают

Тесты:
- curl localhost:8000/api/v1/news/health
- curl localhost:8000/api/v1/finance/rates/health
```

---

**НАЧИНАЙ С ЗАДАЧИ 1! Все коды готовы к копированию.**

**Время выполнения:** ~20-30 минут  
**Стоимость:** $0 (используем бесплатные API лимиты)
