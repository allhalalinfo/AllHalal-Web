#!/bin/bash

# AllHalal Web - Deployment Script
# Скрипт для управления Docker контейнерами на Hetzner

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Проверка, что скрипт запущен из корня проекта
if [ ! -f "docker-compose.yml" ]; then
    log_error "docker-compose.yml not found. Please run this script from the project root."
    exit 1
fi

# Функция для запуска контейнеров
start() {
    log_info "Starting AllHalal containers..."
    docker-compose up -d
    log_success "Containers started!"
    status
}

# Функция для остановки контейнеров
stop() {
    log_info "Stopping AllHalal containers..."
    docker-compose down
    log_success "Containers stopped!"
}

# Функция для перезапуска контейнеров
restart() {
    log_info "Restarting AllHalal containers..."
    docker-compose restart
    log_success "Containers restarted!"
    status
}

# Функция для просмотра логов
logs() {
    log_info "Showing logs (Ctrl+C to exit)..."
    docker-compose logs -f
}

# Функция для просмотра статуса
status() {
    log_info "Container status:"
    docker-compose ps
    echo ""
    
    # Проверяем health check
    log_info "Checking health..."
    if curl -f -s http://localhost:3000/api/health > /dev/null 2>&1; then
        log_success "Application is healthy!"
    else
        log_error "Application health check failed!"
    fi
}

# Функция для обновления приложения
update() {
    log_info "Updating AllHalal Web..."
    
    # Сохраняем текущий коммит для возможного rollback
    CURRENT_COMMIT=$(git rev-parse HEAD)
    log_info "Current commit: $CURRENT_COMMIT"
    
    # Обновляем код
    log_info "Pulling latest changes..."
    git pull origin main
    
    # Пересобираем образы
    log_info "Building images..."
    docker-compose build --no-cache
    
    # Перезапускаем контейнеры
    log_info "Restarting containers..."
    docker-compose down
    docker-compose up -d
    
    # Ждем запуска
    log_info "Waiting for services to start..."
    sleep 10
    
    # Проверяем health check
    if curl -f -s http://localhost:3000/api/health > /dev/null 2>&1; then
        log_success "Update successful!"
        
        # Очищаем старые образы
        log_info "Cleaning up old images..."
        docker image prune -f
    else
        log_error "Health check failed after update!"
        log_warning "Rolling back to commit $CURRENT_COMMIT..."
        git reset --hard $CURRENT_COMMIT
        docker-compose down
        docker-compose build
        docker-compose up -d
        log_error "Rollback completed. Please check the logs."
        exit 1
    fi
}

# Функция для создания бэкапа
backup() {
    log_info "Creating backup..."
    
    BACKUP_DIR="backups"
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="$BACKUP_DIR/allhalal_backup_$TIMESTAMP.tar.gz"
    
    mkdir -p $BACKUP_DIR
    
    # Бэкапим Redis данные
    log_info "Backing up Redis data..."
    docker-compose exec -T redis redis-cli BGSAVE
    sleep 2
    
    # Создаем архив
    log_info "Creating archive..."
    tar -czf $BACKUP_FILE \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='logs' \
        --exclude='backups' \
        .
    
    log_success "Backup created: $BACKUP_FILE"
    
    # Удаляем старые бэкапы (оставляем последние 7)
    log_info "Cleaning up old backups..."
    ls -t $BACKUP_DIR/allhalal_backup_*.tar.gz | tail -n +8 | xargs -r rm
    log_success "Old backups cleaned!"
}

# Функция для просмотра использования ресурсов
stats() {
    log_info "Resource usage:"
    docker stats --no-stream
}

# Функция для очистки
clean() {
    log_warning "This will remove all stopped containers, unused networks, and dangling images."
    read -p "Are you sure? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cleaning up Docker resources..."
        docker-compose down -v
        docker system prune -f
        log_success "Cleanup completed!"
    else
        log_info "Cleanup cancelled."
    fi
}

# Функция для вывода справки
help() {
    cat << EOF
AllHalal Web - Deployment Management Script

Usage: ./manage.sh [command]

Commands:
  start     - Start all containers
  stop      - Stop all containers
  restart   - Restart all containers
  logs      - Show container logs (follow mode)
  status    - Show container status and health
  update    - Update application and rebuild containers
  backup    - Create backup of application and data
  stats     - Show resource usage statistics
  clean     - Clean up Docker resources (requires confirmation)
  help      - Show this help message

Examples:
  ./manage.sh start
  ./manage.sh logs
  ./manage.sh update
  ./manage.sh backup

EOF
}

# Главная логика
case "${1:-help}" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    logs)
        logs
        ;;
    status)
        status
        ;;
    update)
        update
        ;;
    backup)
        backup
        ;;
    stats)
        stats
        ;;
    clean)
        clean
        ;;
    help|*)
        help
        ;;
esac
