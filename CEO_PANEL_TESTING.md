# 🧪 CEO Панель - Проверка Backend Endpoints

## 📋 Список CEO Endpoints

Все endpoints должны быть доступны по адресу: `https://api.allhalal.info`

1. ✅ `/ceo/overview` - главная страница
2. ✅ `/ceo/tables` - все таблицы БД
3. ✅ `/ceo/missing-barcodes` - продукты для добавления
4. ✅ `/ceo/ingredients/unknown` - неизвестные ингредиенты
5. ✅ `/ceo/products/recent` - недавние продукты
6. ✅ `/ceo/stats/growth` - графики роста
7. ✅ `/ceo/brands/top` - топ брендов
8. ✅ `/ceo/quality/issues` - проблемы качества

---

## 🔍 Проверка Endpoints

### Способ 1: Через curl (терминал)

```bash
# Замените на ваш backend URL
BACKEND_URL="https://api.allhalal.info"

# Проверка каждого endpoint
echo "=== Testing /ceo/overview ==="
curl -v "${BACKEND_URL}/ceo/overview"

echo "\n=== Testing /ceo/tables ==="
curl -v "${BACKEND_URL}/ceo/tables"

echo "\n=== Testing /ceo/missing-barcodes ==="
curl -v "${BACKEND_URL}/ceo/missing-barcodes"

echo "\n=== Testing /ceo/ingredients/unknown ==="
curl -v "${BACKEND_URL}/ceo/ingredients/unknown"

echo "\n=== Testing /ceo/products/recent ==="
curl -v "${BACKEND_URL}/ceo/products/recent"

echo "\n=== Testing /ceo/stats/growth ==="
curl -v "${BACKEND_URL}/ceo/stats/growth"

echo "\n=== Testing /ceo/brands/top ==="
curl -v "${BACKEND_URL}/ceo/brands/top"

echo "\n=== Testing /ceo/quality/issues ==="
curl -v "${BACKEND_URL}/ceo/quality/issues"
```

### Способ 2: Через браузер (DevTools)

1. Открой CEO панель: `https://allhalal.info/ceo`
2. Войди с паролем админа
3. Открой DevTools (F12) → вкладка **Network**
4. Переходи по разделам CEO панели
5. Смотри запросы к `/api/ceo?type=...`
6. Проверь:
   - ✅ Status: 200 OK
   - ✅ Response содержит JSON данные
   - ❌ Status: 404/500 - endpoint не существует или ошибка

### Способ 3: Прямая проверка через браузер

Если endpoints не требуют авторизации (или используешь cookies):

```
https://api.allhalal.info/ceo/overview
https://api.allhalal.info/ceo/tables
https://api.allhalal.info/ceo/missing-barcodes
...
```

---

## 📊 Ожидаемые форматы данных

### `/ceo/overview`
```json
{
  "total_products": 2282779,
  "food_products": 2200000,
  "cosmetics_products": 80000,
  "total_scans": 10,
  "scans_last_30d": 10,
  "missing_barcodes_count": 15,
  "unknown_ingredients_count": 0,
  "quality_issues_count": 170000
}
```

### `/ceo/tables`
```json
[
  {
    "name": "products",
    "row_count": 2282779,
    "size_mb": 1250.5,
    "description": "Основная таблица продуктов"
  },
  ...
]
```

### `/ceo/missing-barcodes`
```json
[
  {
    "barcode": "1234567890123",
    "scan_count": 5,
    "last_scan": "2025-12-18T10:00:00Z",
    "product_name": "Product Name"
  },
  ...
]
```

### `/ceo/ingredients/unknown`
```json
[
  {
    "ingredient": "E123",
    "product_count": 150,
    "first_seen": "2025-12-01T00:00:00Z",
    "last_seen": "2025-12-18T00:00:00Z"
  },
  ...
]
```

### `/ceo/products/recent`
```json
[
  {
    "barcode": "1234567890123",
    "product_name": "Product Name",
    "halal_status": "halal",
    "added_date": "2025-12-18T10:00:00Z",
    "category": "food"
  },
  ...
]
```

### `/ceo/stats/growth`
```json
[
  {
    "date": "2025-12-01",
    "products_count": 2200000,
    "scans_count": 5
  },
  ...
]
```

### `/ceo/brands/top`
```json
[
  {
    "brand_name": "Brand Name",
    "product_count": 50000,
    "halal_count": 30000,
    "haram_count": 5000,
    "mushbooh_count": 15000,
    "percentage_halal": 60.0
  },
  ...
]
```

### `/ceo/quality/issues`
```json
[
  {
    "barcode": "1234567890123",
    "product_name": "Product Name",
    "issue_type": "short_ingredients",
    "issue_description": "Слишком короткий список ингредиентов",
    "ingredients_length": 5,
    "created_at": "2025-12-18T10:00:00Z"
  },
  ...
]
```

---

## ⚠️ Возможные проблемы

### 1. Endpoint возвращает 404
**Причина:** Endpoint не реализован на backend  
**Решение:** Нужно создать endpoint на backend

### 2. Endpoint возвращает 500
**Причина:** Ошибка на backend при обработке запроса  
**Решение:** Проверить логи backend, исправить ошибку

### 3. Endpoint возвращает пустой массив `[]`
**Причина:** Endpoint работает, но данных нет  
**Решение:** Это нормально, данные появятся когда будут

### 4. Endpoint возвращает пустой объект `{}`
**Причина:** Endpoint работает, но формат данных не соответствует ожидаемому  
**Решение:** Проверить формат данных на backend

### 5. CORS ошибка
**Причина:** Backend не разрешает запросы с frontend домена  
**Решение:** Добавить `https://allhalal.info` в CORS allow_origins

---

## ✅ Чеклист проверки

- [ ] Все 8 endpoints доступны на backend
- [ ] Endpoints возвращают данные (не 404/500)
- [ ] Формат данных соответствует ожидаемому
- [ ] CORS настроен правильно
- [ ] Frontend CEO панель загружает данные без ошибок
- [ ] Кнопки "Обновить" работают
- [ ] Автообновление работает (раз в час)

---

## 🐛 Отладка

Если данные не загружаются:

1. **Проверь Network tab в DevTools:**
   - Открой `/ceo/overview`
   - Смотри запрос к `/api/ceo?type=overview`
   - Проверь Response и Status

2. **Проверь Console:**
   - Могут быть ошибки JavaScript
   - Проверь логи frontend

3. **Проверь Backend логи:**
   - Смотри логи FastAPI
   - Проверь есть ли ошибки при запросах

4. **Проверь переменные окружения:**
   - `NEXT_PUBLIC_BACKEND_URL` должен быть установлен
   - Должен указывать на правильный backend URL
