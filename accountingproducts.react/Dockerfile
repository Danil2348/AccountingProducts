# === Этап 1: Сборка ===
FROM node:20-alpine AS build
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Переменная для URL бэкенда
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Собираем
RUN npm run build

# === Этап 2: Запуск через Nginx ===
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=build /app/dist /usr/share/nginx/html

# Настройка Nginx для SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]