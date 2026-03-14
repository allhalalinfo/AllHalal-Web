# 🎯 Задание для Backend Cursor агента (Hetzner)

## Контекст

Ты работаешь на сервере Hetzner для проекта AllHalal.info. У тебя есть:
- ✅ Redis работает в Docker
- ✅ FastAPI backend работает
- ✅ PostgreSQL работает
- ✅ 6.4 GB свободной памяти

**Цель:** Настроить автоматическое обновление новостей из RSS feeds (полностью бесплатно).

---

## 📋 Твои задачи

Прочитай файл с детальными инструкциями:
```
/Users/adelyanurusheva/Desktop/Allhalal-Web/docs/CURSOR-AGENT-INSTRUCTIONS.md
```

Выполни **3 задачи по порядку:**

### Задача 1: Создать RSS parser скрипт
- Путь: `/root/allhalal_news_updater.py`
- Установи: `pip3 install feedparser redis requests`
- Парсит 5-10 бесплатных RSS источников
- Сохраняет в Redis с TTL 1800 секунд
- Код полностью готов в документации

### Задача 2: Добавить FastAPI endpoint
- Endpoint: `/api/v1/news/cached`
- Читает из Redis (localhost:6379)
- Возвращает JSON с новостями
- Код полностью готов в документации

### Задача 3: Настроить Cron Job
- Расписание: `*/30 * * * *` (каждые 30 минут)
- Лог: `/var/log/allhalal-news.log`
- Настроить ротацию логов

---

## ⚠️ ВАЖНО

**Используй ТОЛЬКО бесплатные решения:**
- ✅ Redis (уже есть на сервере)
- ✅ Python библиотеки (feedparser, redis, requests)
- ✅ RSS feeds (публичные, бесплатные)
- ✅ Cron (встроен в Linux)

**НЕ УСТАНАВЛИВАЙ:**
- ❌ Upstash или другие внешние Redis
- ❌ Платные API сервисы
- ❌ Коммерческие библиотеки

---

## ✅ После завершения

Выполни тесты из документации и напиши отчет:

```bash
# 1. Тест Python скрипта
python3 /root/allhalal_news_updater.py

# 2. Тест данных в Redis
docker exec -it redis redis-cli KEYS 'news:*'

# 3. Тест FastAPI endpoint
curl http://localhost:8000/api/v1/news/health
curl http://localhost:8000/api/v1/news/cached?safe_only=false&limit=10

# 4. Проверка cron
crontab -l | grep allhalal

# 5. Проверка логов
tail -20 /var/log/allhalal-news.log
```

Напиши результаты каждого теста.

---

## 📄 Где найти всё

- **Полные инструкции:** `/docs/CURSOR-AGENT-INSTRUCTIONS.md`
- **Python код:** В инструкциях (готов к копированию)
- **FastAPI код:** В инструкциях (готов к копированию)
- **Команды cron:** В инструкциях

---

## 🚀 Начинай!

Прочитай `/docs/CURSOR-AGENT-INSTRUCTIONS.md` и выполни задачи 1, 2, 3 последовательно.

После завершения напиши отчет с результатами тестов.

**Время выполнения:** ~15-20 минут
**Стоимость:** $0 (используем только существующие ресурсы)
