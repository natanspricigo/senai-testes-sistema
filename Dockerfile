FROM node:20-alpine AS frontend-builder

WORKDIR /frontend

COPY frontend-web/package*.json ./
RUN npm ci

COPY frontend-web ./
ENV VITE_API_URL=/api
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY backend-api/package*.json ./
RUN npm ci --omit=dev

COPY backend-api ./
COPY --from=frontend-builder /frontend/dist ./public

ENV NODE_ENV=production
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT:-8080}/actuator/health || exit 1

CMD ["npm", "start"]
