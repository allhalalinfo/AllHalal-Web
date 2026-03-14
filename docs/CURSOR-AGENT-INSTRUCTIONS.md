# Инструкции для Cursor агента (Hetzner Backend)

## 🎯 КОНТЕКСТ ДЛЯ АГЕНТА

Вы работаете с проектом AllHalal.info на сервере Hetzner.

### Текущее состояние:
- ✅ Redis уже работает в Docker
- ✅ FastAPI backend уже работает
- ✅ PostgreSQL работает
- ✅ Есть 6.4 GB свободной памяти
- ❌ НЕТ парсинга RSS новостей
- ❌ НЕТ cron job для обновления

### Цель:
Настроить автоматическое обновление новостей:
- RSS парсинг → сохранение в Redis
- FastAPI endpoint для чтения из Redis
- Cron job каждые 30 минут
- **ВСЕ БЕСПЛАТНО** (используем только то что есть)

---

## 📁 ГДЕ НАХОДЯТСЯ ФАЙЛЫ (для агента)

**ВАЖНО:** Cursor агент, сначала выполни эти команды чтобы понять структуру:

```bash
# 1. Найти где лежит FastAPI проект
find /root /home /opt -name "main.py" -o -name "app.py" 2>/dev/null | head -5

# 2. Проверить Docker контейнеры
docker ps --format "{{.Names}}: {{.Image}}"

# 3. Узнать порт Redis
docker port $(docker ps -qf "name=redis") 2>/dev/null

# 4. Найти FastAPI конфиг
find / -name "docker-compose.yml" 2>/dev/null | head -3
```

**После этих команд ты узнаешь:**
- Путь к FastAPI проекту: `/path/to/api/` (найдешь выше)
- Redis доступен на: `localhost:6379` (или через Docker network)
- Структуру проекта

---

## 🎯 ЗАДАЧИ ДЛЯ CURSOR АГЕНТА

### ЗАДАЧА 1: Создать RSS parser скрипт

**Где создать:** `/root/allhalal_news_updater.py`

**Требования:**
- Python 3
- Бесплатные библиотеки: `feedparser`, `redis`, `requests`
- Парсит 5-10 RSS источников (начнем с малого)
- Сохраняет в Redis с TTL 1800 секунд (30 минут)
- Логирует результаты

**Код:**

```python
#!/usr/bin/env python3
"""
AllHalal News Updater
Парсит RSS feeds и кеширует в Redis (бесплатно)
"""

import feedparser
import redis
import json
from datetime import datetime
import sys

# Подключение к Redis (локально, бесплатно!)
try:
    r = redis.Redis(
        host='localhost',  # или 'redis' если через Docker network
        port=6379,
        decode_responses=True,
        socket_timeout=5
    )
    r.ping()
    print("✓ Redis connected")
except Exception as e:
    print(f"✗ Redis connection failed: {e}")
    sys.exit(1)

# RSS источники (бесплатные, публичные feeds)
RSS_SOURCES = [
    {
        "name": "Yaqeen Institute",
        "url": "https://yaqeeninstitute.org/feed/",
        "priority": 1,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    {
        "name": "Productive Muslim",
        "url": "https://productivemuslim.com/feed/",
        "priority": 1,
        "safe": True,
        "categories": ["Family & Education"]
    },
    {
        "name": "MuslimMatters",
        "url": "https://muslimmatters.org/feed/",
        "priority": 2,
        "safe": False,  # может быть heavy topics
        "categories": ["Faith & Practice", "Ummah & World"]
    },
    {
        "name": "About Islam",
        "url": "https://aboutislam.net/feed/",
        "priority": 2,
        "safe": True,
        "categories": ["Faith & Practice"]
    },
    {
        "name": "SeekersGuidance",
        "url": "https://seekersguidance.org/feed/",
        "priority": 1,
        "safe": True,
        "categories": ["Faith & Practice"]
    }
]

def parse_feed(source):
    """Парсит один RSS feed (бесплатно через feedparser)"""
    try:
        print(f"  Parsing {source['name']}...", end=' ')
        feed = feedparser.parse(source['url'])
        
        items = []
        for entry in feed.entries[:10]:  # Первые 10 статей
            # Простое извлечение изображения
            image_url = None
            if hasattr(entry, 'media_content'):
                image_url = entry.media_content[0]['url'] if entry.media_content else None
            elif hasattr(entry, 'enclosures') and entry.enclosures:
                image_url = entry.enclosures[0].get('href')
            
            item = {
                "id": entry.get('id', entry.link),
                "title": entry.title,
                "url": entry.link,
                "sourceName": source['name'],
                "sourceId": source['name'].lower().replace(' ', '-'),
                "publishedAt": entry.get('published', ''),
                "excerpt": entry.get('summary', '')[:500],
                "imageUrl": image_url,
                "categories": source['categories']
            }
            items.append(item)
        
        print(f"✓ {len(items)} items")
        return items
    
    except Exception as e:
        print(f"✗ Error: {e}")
        return []

def update_cache():
    """Обновляет кеш в Redis"""
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting update...")
    
    # Парсим все источники (параллельно можно, но пока последовательно)
    all_items = []
    safe_items = []
    
    for source in RSS_SOURCES:
        items = parse_feed(source)
        all_items.extend(items)
        
        if source.get('safe'):
            safe_items.extend(items)
    
    print(f"\nTotal: {len(all_items)} items ({len(safe_items)} safe)")
    
    # Данные для кеша
    cache_all = {
        "items": all_items[:50],  # Лимит 50
        "timestamp": int(datetime.now().timestamp() * 1000),
        "source": "hetzner_redis",
        "count": len(all_items)
    }
    
    cache_safe = {
        "items": safe_items[:20],  # Лимит 20 для homepage
        "timestamp": int(datetime.now().timestamp() * 1000),
        "source": "hetzner_redis",
        "count": len(safe_items)
    }
    
    # Сохраняем в Redis с TTL 1800 сек (30 мин)
    try:
        r.setex(
            "news:aggregated:safe-false",
            1800,
            json.dumps(cache_all, ensure_ascii=False)
        )
        
        r.setex(
            "news:aggregated:safe-true",
            1800,
            json.dumps(cache_safe, ensure_ascii=False)
        )
        
        print(f"✓ Cached to Redis (TTL: 30 min)")
        print(f"  Keys: news:aggregated:safe-false, news:aggregated:safe-true")
        
    except Exception as e:
        print(f"✗ Redis write error: {e}")
        sys.exit(1)
    
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Update complete!\n")

if __name__ == "__main__":
    update_cache()
```

**Установить зависимости:**
```bash
pip3 install feedparser redis requests
```

**Тест:**
```bash
python3 /root/allhalal_news_updater.py
```

Ожидаемый вывод:
```
✓ Redis connected
  Parsing Yaqeen Institute... ✓ 10 items
  Parsing Productive Muslim... ✓ 10 items
  ...
Total: 50 items (30 safe)
✓ Cached to Redis (TTL: 30 min)
```

---

### ЗАДАЧА 2: Добавить FastAPI endpoint

**Где добавить:** В существующий FastAPI проект

**Шаги:**

1. **Найти главный файл FastAPI:**
```bash
# Cursor агент, выполни:
find /root /home /opt -name "main.py" -o -name "app.py" | xargs grep -l "FastAPI"
```

2. **Создать новый роут файл:** `/путь/к/api/routes/news_cache.py`

```python
from fastapi import APIRouter, HTTPException
from redis import Redis
import json
from datetime import datetime

router = APIRouter(prefix="/news", tags=["news"])

# Redis connection (локальный, бесплатный)
redis_client = Redis(
    host='localhost',  # или 'redis' если Docker network
    port=6379,
    decode_responses=True
)

@router.get("/cached")
async def get_cached_news(
    safe_only: bool = False,
    limit: int = 20
):
    """
    Получить кешированные новости из Redis
    Бесплатно, быстро (1-5ms latency)
    """
    try:
        # Ключ в Redis
        cache_key = f"news:aggregated:safe-{safe_only}"
        
        # Читаем (быстро, локально)
        cached_data = redis_client.get(cache_key)
        
        if not cached_data:
            raise HTTPException(
                status_code=404,
                detail="Cache empty. Run: python3 /root/allhalal_news_updater.py"
            )
        
        # Парсим
        data = json.loads(cached_data)
        items = data.get('items', [])[:limit]
        
        # Возраст кеша
        timestamp = data.get('timestamp', 0)
        age_minutes = (datetime.now().timestamp() * 1000 - timestamp) / 60000
        
        return {
            "success": True,
            "items": items,
            "count": len(items),
            "cached_at": timestamp,
            "age_minutes": int(age_minutes),
            "source": "hetzner_redis",
            "cache_fresh": age_minutes < 30
        }
        
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid cache format")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def news_cache_health():
    """Health check для кеша"""
    try:
        # Проверяем оба ключа
        has_all = redis_client.exists("news:aggregated:safe-false")
        has_safe = redis_client.exists("news:aggregated:safe-true")
        
        return {
            "redis_connected": True,
            "cache_all_exists": bool(has_all),
            "cache_safe_exists": bool(has_safe),
            "status": "healthy" if (has_all and has_safe) else "cache_missing"
        }
    except:
        return {
            "redis_connected": False,
            "status": "unhealthy"
        }
```

3. **Подключить роут в main app:**

Найди файл где создается `app = FastAPI()` и добавь:

```python
from routes.news_cache import router as news_router

app.include_router(news_router, prefix="/api/v1")
```

4. **Перезапустить FastAPI:**
```bash
# Если в Docker:
docker restart api

# Если systemd:
systemctl restart fastapi

# Или найти процесс и перезапустить
```

5. **Тест endpoint:**
```bash
curl http://localhost:8000/api/v1/news/health
# Должен вернуть: {"redis_connected": true, ...}

curl http://localhost:8000/api/v1/news/cached?safe_only=false&limit=10
# Должен вернуть: {"success": true, "items": [...]}
```

---

### ЗАДАЧА 3: Настроить Cron Job

```bash
# 1. Сделать скрипт исполняемым
chmod +x /root/allhalal_news_updater.py

# 2. Тест (должен работать)
/root/allhalal_news_updater.py

# 3. Добавить в crontab
crontab -e

# Добавить строку (запуск каждые 30 минут):
*/30 * * * * /usr/bin/python3 /root/allhalal_news_updater.py >> /var/log/allhalal-news.log 2>&1

# 4. Настроить ротацию логов
cat > /etc/logrotate.d/allhalal-news <<'EOF'
/var/log/allhalal-news.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
}
EOF

# 5. Проверить что cron добавлен
crontab -l | grep allhalal
```

---

## ✅ ЧЕКЛИСТ ДЛЯ CURSOR АГЕНТА

После выполнения всех задач, проверь:

```bash
# 1. Python скрипт работает
python3 /root/allhalal_news_updater.py
# Ожидаем: ✓ Redis connected, ✓ Cached

# 2. Данные в Redis
docker exec -it redis redis-cli KEYS 'news:*'
# Ожидаем: news:aggregated:safe-false, news:aggregated:safe-true

# 3. FastAPI endpoint работает
curl http://localhost:8000/api/v1/news/health
# Ожидаем: {"status": "healthy"}

# 4. Cron настроен
crontab -l | grep allhalal
# Ожидаем: */30 * * * * /usr/bin/python3 ...

# 5. Логи пишутся
tail -20 /var/log/allhalal-news.log
# Ожидаем: успешные запуски скрипта
```

---

## 💰 ВАЖНО: ВСЕ БЕСПЛАТНО!

- ✅ Redis - уже есть на сервере
- ✅ Python - уже установлен
- ✅ feedparser, redis - бесплатные библиотеки
- ✅ RSS feeds - публичные, бесплатные
- ✅ Cron - встроен в Linux
- ✅ FastAPI - уже работает

**НЕ УСТАНАВЛИВАЙ:**
- ❌ Платные сервисы
- ❌ Внешние API с лимитами
- ❌ Коммерческие библиотеки

---

## 📝 ОТЧЕТ ДЛЯ ПОЛЬЗОВАТЕЛЯ

После завершения, напиши:

```
✅ Задача 1: RSS parser создан и протестирован
   Путь: /root/allhalal_news_updater.py
   Статус: Работает
   
✅ Задача 2: FastAPI endpoint добавлен
   URL: http://localhost:8000/api/v1/news/cached
   Статус: Работает
   
✅ Задача 3: Cron настроен
   Расписание: */30 * * * * (каждые 30 минут)
   Лог: /var/log/allhalal-news.log
   Статус: Активен

Тестовые команды:
- curl http://localhost:8000/api/v1/news/health
- tail -f /var/log/allhalal-news.log
```

---

**НАЧИНАЙ С ЗАДАЧИ 1!**
