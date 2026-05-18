# Docker Setup Guide

Guia para usar Docker localmente.

## 📦 Requisitos

- Docker: https://www.docker.com/products/docker-desktop
- Docker Compose: incluído no Docker Desktop

## 🚀 Início Rápido

### Build e Start

```bash
docker-compose build
docker-compose up -d
```

### URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- Swagger: http://localhost:8080/swagger-ui.html
- H2 Console: http://localhost:8080/h2-console

### Stop

```bash
docker-compose down
```

## 🔨 Scripts Úteis

### Linux/Mac

```bash
# Iniciar
./start.sh

# Parar
./stop.sh

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

### Windows

```bash
# Iniciar
start.bat

# Parar
stop.bat

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Ver Logs

```bash
# Todos os logs
docker-compose logs -f

# Backend apenas
docker-compose logs -f backend

# Frontend apenas
docker-compose logs -f frontend
```

## 🧹 Limpar

```bash
# Parar e remover containers
docker-compose down

# Remover volumes (dados do banco)
docker-compose down -v

# Limpar tudo (sistema inteiro)
docker system prune -a
```

## 🆘 Troubleshooting

### Port already in use

```bash
# Ver que está usando a porta
# Linux/Mac
lsof -i :8080
lsof -i :3000

# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Kill o processo
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### Build falha

```bash
# Limpar cache
docker system prune -a

# Rebuild
docker-compose build --no-cache
```

### Container exits immediately

```bash
# Ver logs
docker-compose logs backend
docker-compose logs frontend

# Debugar
docker-compose run backend /bin/sh
docker-compose run frontend /bin/sh
```

## 📝 Dockerfile Explicado

### Backend

- Usa multi-stage build
- Build com Maven
- Runtime com Java 17 JRE (menor)
- Health check ativado

### Frontend

- Usa multi-stage build
- Build com Node 18
- Serve com `serve` package
- Health check ativado

## 🚀 Deploy com Docker

### Em Render.com

1. Conecte GitHub
2. Selecione Web Service
3. Build: `docker build -t myapp .`
4. Port: `8080` (backend) ou `3000` (frontend)

### Em Railway

1. Conecte GitHub
2. Railway detecta automaticamente o Dockerfile
3. Configura build e deploy

### Em Heroku (com CLI)

```bash
# Login
heroku login

# Create app
heroku create seu-app-name

# Deploy
git push heroku main

# Logs
heroku logs --tail
```
