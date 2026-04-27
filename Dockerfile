# Dockerfile для AllHalal Next.js приложения
# Многоступенчатая сборка для минимизации размера образа

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps

# Установка libc для совместимости
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Копируем только файлы зависимостей для кеширования слоя
COPY package.json package-lock.json* ./

# Устанавливаем зависимости
RUN npm ci --only=production --ignore-scripts && \
    npm cache clean --force

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем node_modules из предыдущего stage
COPY --from=deps /app/node_modules ./node_modules

# Копируем весь исходный код
COPY . .

# Переменные окружения для сборки
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Собираем приложение
RUN npm run build

# ============================================
# Stage 3: Runner
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Создаем директорию для логов
RUN mkdir -p /app/logs && chown -R nextjs:nodejs /app/logs

# Переключаемся на непривилегированного пользователя
USER nextjs

# Expose порт
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Запуск приложения
CMD ["node", "server.js"]
