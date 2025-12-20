#!/bin/bash

# Скрипт для проверки CEO endpoints на backend
# Использование: ./scripts/test-ceo-endpoints.sh [BACKEND_URL]

BACKEND_URL="${1:-https://api.allhalal.info}"

echo "🔍 Проверка CEO Endpoints на ${BACKEND_URL}"
echo "=========================================="
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для проверки endpoint
check_endpoint() {
    local endpoint=$1
    local name=$2
    local url="${BACKEND_URL}${endpoint}"
    
    echo -n "Проверка ${name} (${endpoint})... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "${url}")
    
    if [ "$response" = "200" ]; then
        echo -e "${GREEN}✅ OK (200)${NC}"
        # Попробуем получить данные
        data=$(curl -s "${url}" | head -c 200)
        echo "   Данные: ${data}..."
    elif [ "$response" = "404" ]; then
        echo -e "${RED}❌ NOT FOUND (404)${NC}"
        echo "   ⚠️  Endpoint не реализован на backend"
    elif [ "$response" = "500" ]; then
        echo -e "${RED}❌ SERVER ERROR (500)${NC}"
        echo "   ⚠️  Ошибка на backend при обработке запроса"
    elif [ "$response" = "401" ]; then
        echo -e "${YELLOW}⚠️  UNAUTHORIZED (401)${NC}"
        echo "   ℹ️  Требуется авторизация"
    else
        echo -e "${YELLOW}⚠️  Status: ${response}${NC}"
    fi
    echo ""
}

# Проверяем все endpoints
check_endpoint "/ceo/overview" "Overview"
check_endpoint "/ceo/tables" "Tables"
check_endpoint "/ceo/missing-barcodes" "Missing Barcodes"
check_endpoint "/ceo/ingredients/unknown" "Unknown Ingredients"
check_endpoint "/ceo/products/recent" "Recent Products"
check_endpoint "/ceo/stats/growth" "Growth Stats"
check_endpoint "/ceo/brands/top" "Top Brands"
check_endpoint "/ceo/quality/issues" "Quality Issues"

echo "=========================================="
echo "✅ Проверка завершена!"
echo ""
echo "💡 Совет: Если endpoint возвращает 404, его нужно создать на backend"
echo "💡 Если 500 - проверь логи backend для деталей ошибки"
