# ✅ ПЕРЕСМОТР: Используем Hetzner Redis (без Upstash)

## 🎯 Новая архитектура (оптимизированная)

### Было (устаревший план):
```
Vercel Next.js → Upstash Redis REST API
                 ↑
      Hetzner Cron обновляет
```

### Стало (правильно для ваших ресурсов):
```
Hetzner Server (7.6 GB RAM - достаточно!)
├── Redis (уже работает, 7 MB)
│   └── Кеш новостей
├── Cron (50 MB)
│   └── Обновляет Redis каждые 30 мин
├── FastAPI (123 MB)
│   └── API endpoint для Vercel
└── PostgreSQL (268 MB)

Vercel Next.js (frontend)
└── Читает через API endpoint на Hetzner
```

---

## 💰 Экономия

| Вариант | Стоимость | Латентность | Сложность |
|---------|-----------|-------------|-----------|
| **Upstash** | $0 (но лишний сервис) | 20-50ms (REST API) | Средняя |
| **Hetzner Redis** | $0 (уже есть!) | 1-5ms (локально) | Низкая ✅ |

**Выбираем: Hetzner Redis** ✅

---

## 🔄 Что нужно изменить

### 1. Архитектура данных:

```
┌─────────────────────────────────┐
│ Hetzner Cron (каждые 30 мин)   │
│ └─ Python/Node script          │
│    └─ Парсит RSS               │
│    └─ Сохраняет в Redis        │
│       redis-cli SET news:data  │
└─────────────────────────────────┘
         ↓ Локальное соединение
┌─────────────────────────────────┐
│ Hetzner Redis                   │
│ └─ news:aggregated (cached)    │
└─────────────────────────────────┘
         ↓ Через API
┌─────────────────────────────────┐
│ Hetzner FastAPI                 │
│ └─ GET /api/v1/news/cached     │
│    └─ Читает из Redis          │
│    └─ Возвращает JSON          │
└─────────────────────────────────┘
         ↓ HTTPS
┌─────────────────────────────────┐
│ Vercel Next.js                  │
│ └─ getAggregatedNews()         │
│    └─ fetch() к FastAPI        │
└─────────────────────────────────┘
```

---

## 📝 Новый план реализации

### ШАГ 1: Проверить Redis на Hetzner (1 мин)

**Для Cursor агента:**
```bash
# Проверить что Redis работает
docker ps | grep redis

# Проверить доступ
docker exec -it redis redis-cli ping
# Должен вернуть: PONG

# Проверить текущие ключи
docker exec -it redis redis-cli KEYS '*'
```

---

### ШАГ 2: Создать API endpoint на Hetzner (FastAPI)

**Для Cursor агента:**

Создать файл: `/path/to/api/routes/news_cache.py`

```python
from fastapi import APIRouter, HTTPException
from redis import Redis
import json
from datetime import datetime

router = APIRouter()

# Подключение к Redis (локально)
redis_client = Redis(host='localhost', port=6379, decode_responses=True)

@router.get("/news/cached")
async def get_cached_news(
    safe_only: bool = False,
    limit: int = 20
):
    """
    Получить кешированные новости из Redis
    """
    try:
        # Определяем ключ
        cache_key = f"news:aggregated:safe-{safe_only}"
        
        # Читаем из Redis
        cached_data = redis_client.get(cache_key)
        
        if not cached_data:
            raise HTTPException(
                status_code=404,
                detail="Cache not found. Cron may not have run yet."
            )
        
        # Парсим JSON
        data = json.loads(cached_data)
        
        # Проверяем свежесть (TTL 30 минут)
        timestamp = data.get('timestamp', 0)
        age_minutes = (datetime.now().timestamp() * 1000 - timestamp) / 60000
        
        if age_minutes > 30:
            # Кеш устарел, но все равно возвращаем
            data['cache_stale'] = True
        
        # Обрезаем до лимита
        items = data.get('items', [])[:limit]
        
        return {
            "success": True,
            "items": items,
            "cached_at": data.get('timestamp'),
            "age_minutes": int(age_minutes),
            "source": "hetzner_redis"
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid cache data")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/news/update")
async def trigger_news_update():
    """
    Ручной триггер обновления новостей
    (вызывается из Hetzner cron)
    """
    # Здесь будет логика парсинга RSS
    # Или просто триггерить внешний скрипт
    return {"success": True, "message": "Update triggered"}
```

**Добавить роут в main FastAPI app:**
```python
from routes.news_cache import router as news_router

app.include_router(news_router, prefix="/api/v1")
```

---

### ШАГ 3: Создать скрипт парсинга RSS на Hetzner

**Для Cursor агента:**

Создать файл: `/root/allhalal-news-updater.py`

```python
#!/usr/bin/env python3
"""
AllHalal News Updater
Парсит RSS feeds и сохраняет в Redis
"""

import feedparser
import redis
import json
from datetime import datetime
import requests
from typing import List, Dict

# Подключение к Redis
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

# RSS источники (ваш список)
RSS_SOURCES = [
    {
        "name": "Yaqeen Institute",
        "url": "https://yaqeeninstitute.org/feed/",
        "priority": 1,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    # ... (добавить все источники из newsSources.ts)
]

def parse_rss_feed(source: Dict) -> List[Dict]:
    """Парсит один RSS feed"""
    try:
        feed = feedparser.parse(source["url"])
        items = []
        
        for entry in feed.entries[:10]:  # Берем первые 10
            item = {
                "id": entry.get("id", entry.link),
                "title": entry.title,
                "url": entry.link,
                "sourceName": source["name"],
                "sourceId": source["name"].lower().replace(" ", "-"),
                "publishedAt": entry.get("published", ""),
                "excerpt": entry.get("summary", "")[:500],
                "imageUrl": extract_image(entry),
                "categories": source["categories"],
            }
            items.append(item)
        
        return items
    except Exception as e:
        print(f"Error parsing {source['name']}: {e}")
        return []

def extract_image(entry) -> str:
    """Извлекает изображение из entry"""
    # Логика извлечения изображения
    # (можно упростить или взять из вашего newsFeed.ts)
    return None

def update_cache():
    """Обновляет кеш в Redis"""
    print(f"[{datetime.now()}] Starting news update...")
    
    # Парсим все источники
    all_items = []
    for source in RSS_SOURCES:
        items = parse_rss_feed(source)
        all_items.extend(items)
        print(f"  ✓ {source['name']}: {len(items)} items")
    
    # Дедупликация и сортировка
    # (можно добавить логику из вашего newsFeed.ts)
    
    # Фильтруем safe для homepage
    safe_items = [
        item for item in all_items 
        if any(s["name"] == item["sourceName"] and s.get("safe") 
               for s in RSS_SOURCES)
    ]
    
    # Сохраняем в Redis (2 ключа)
    cache_data_all = {
        "items": all_items[:50],
        "timestamp": int(datetime.now().timestamp() * 1000),
        "source": "hetzner_redis"
    }
    
    cache_data_safe = {
        "items": safe_items[:20],
        "timestamp": int(datetime.now().timestamp() * 1000),
        "source": "hetzner_redis"
    }
    
    # Сохраняем с TTL 30 минут (1800 секунд)
    r.setex(
        "news:aggregated:safe-false",
        1800,
        json.dumps(cache_data_all)
    )
    
    r.setex(
        "news:aggregated:safe-true",
        1800,
        json.dumps(cache_data_safe)
    )
    
    print(f"✓ Cached {len(all_items)} items (all), {len(safe_items)} items (safe)")
    print(f"[{datetime.now()}] Update complete!")

if __name__ == "__main__":
    update_cache()
```

**Сделать исполняемым:**
```bash
chmod +x /root/allhalal-news-updater.py

# Установить зависимости
pip3 install feedparser redis requests
```

---

### ШАГ 4: Настроить Hetzner Cron

**Для Cursor агента:**

```bash
# Добавить в crontab
crontab -e

# Добавить строку:
*/30 * * * * /usr/bin/python3 /root/allhalal-news-updater.py >> /var/log/allhalal-news.log 2>&1
```

---

### ШАГ 5: Изменить Next.js код (Vercel)

**Для вас (я сделаю):**

```typescript
// lib/newsFeed.ts
export async function getAggregatedNews({
  category,
  safeOnly = false,
  limit = 20,
}: GetAggregatedNewsOptions = {}) {
  try {
    // Читаем из FastAPI endpoint на Hetzner
    const response = await fetch(
      `https://api.allhalal.info/api/v1/news/cached?safe_only=${safeOnly}&limit=${limit}`,
      { next: { revalidate: 1800 } } // ISR: 30 минут
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch cached news');
    }
    
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching news:', error);
    return []; // Fallback to empty
  }
}
```

---

## ✅ Преимущества нового подхода:

1. ✅ **$0 стоимость** - все на вашем Hetzner
2. ✅ **Низкая латентность** - Redis локально
3. ✅ **Безопасность** - Redis не открыт наружу
4. ✅ **Простота** - один сервер, все рядом
5. ✅ **Достаточно ресурсов** - 6.4 GB свободно

---

## ❓ Что делать дальше?

**Вариант A:** Я сейчас переделаю код под эту архитектуру  
**Вариант B:** Сначала Cursor агент настроит Python скрипт на Hetzner  
**Вариант C:** Обсудим детали (какие источники RSS, etc)

**Что выбираете?**
