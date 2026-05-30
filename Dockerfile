# Этап 1: Установка всех зависимостей и сборка фронтенда
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Устанавливаем инструменты для компиляции native-модулей (лучше всего для better-sqlite3)
RUN apk add --no-cache python3 make g++ && \
    npm ci
COPY . .
RUN npm run build

# Этап 2: Установка только production-зависимостей
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache python3 make g++ && \
    npm ci --omit=dev

# Этап 3: Финальный минималистичный образ для запуска
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Копируем только то, что нужно для работы приложения
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/db.ts ./
COPY --from=builder /app/data ./data
COPY --from=builder /app/types.ts ./
COPY --from=builder /app/package.json ./

# Создаем папку для загрузок
RUN mkdir -p uploads

# Открываем порт приложения
EXPOSE 3000

# Запуск с использованием встроенной в Node 22 поддержки TypeScript (без лишних сборщиков)
CMD ["node", "--experimental-strip-types", "server.ts"]
