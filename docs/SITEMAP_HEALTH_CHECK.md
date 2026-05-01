# Sitemap Health Check Script

Проверяет все URL из sitemap.xml на доступность (HTTP 200) и выявляет проблемные редиректы.

## Быстрая проверка (top 30 URLs):

```bash
curl -s https://allhalal.info/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>//;s/<\/loc>//' | head -30 | while read url; do 
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  if [ "$status" != "200" ]; then
    echo "⚠️  $status - $url"
  else
    echo "✅ $status - $url"
  fi
done
```

## Полная проверка всех URL (может занять 2-3 минуты):

```bash
curl -s https://allhalal.info/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>//;s/<\/loc>//' | while read url; do 
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  if [ "$status" != "200" ]; then
    echo "⚠️  $status - $url"
  fi
done
```

Если вывод пустой - все URL возвращают 200 ✅

## Проверка на редиректы (301/302):

```bash
curl -s https://allhalal.info/sitemap.xml | grep -o '<loc>[^<]*</loc>' | sed 's/<loc>//;s/<\/loc>//' | while read url; do 
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  if [ "$status" = "301" ] || [ "$status" = "302" ] || [ "$status" = "307" ] || [ "$status" = "308" ]; then
    echo "🔁 $status - $url"
  fi
done
```

## Проверка заблокированных путей:

```bash
# Проверить что в sitemap НЕТ /en/, /ar/, /nl/ и других заблокированных в robots.txt
curl -s https://allhalal.info/sitemap.xml | grep -o '<loc>[^<]*</loc>' | grep -E '/(en|ar|nl|de|fr|es|it|ru|blog)/' 
```

Если вывод пустой - конфликтов нет ✅

## Текущий статус (проверено 1 мая 2026):

- ✅ Все основные URL возвращают 200
- ✅ Нет заблокированных путей (/en/, /ar/, etc.)
- ✅ Битый URL `/&` возвращает 404 (корректно)
- ✅ Sitemap структура чистая

## Ожидаемое количество URL:

- Static pages: ~36
- Briefs (/read/): ~22
- Custom articles (/read/): ~96
- **Total: ~154 URLs**

## Как использовать после изменений:

1. После деплоя изменений на Hetzner
2. Запустить быструю проверку (30 URLs)
3. Если всё ОК - запустить полную проверку
4. GSC → Sitemaps → Resubmit
5. Ждать 24-48 часов для переиндексации
