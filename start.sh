#!/bin/bash

set -e

echo "Iniciando Stack Carrinhos..."
echo ""

if ! command -v docker &> /dev/null; then
    echo "Docker nao esta instalado"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose nao esta instalado"
    exit 1
fi

echo "Buildando imagens Docker..."
docker-compose build

echo ""
echo "Iniciando servicos..."
docker-compose up -d

echo ""
echo "Aguardando servicos ficarem prontos..."
sleep 5

backend_ready=false
frontend_ready=false

for i in {1..30}; do
    if curl -s http://localhost:8080/api/professores > /dev/null 2>&1; then
        echo "Backend pronto em http://localhost:8080"
        backend_ready=true
    fi

    if curl -s http://localhost:${FRONTEND_PORT:-3001} > /dev/null 2>&1; then
        echo "Frontend pronto em http://localhost:${FRONTEND_PORT:-3001}"
        frontend_ready=true
    fi

    if [ "$backend_ready" = true ] && [ "$frontend_ready" = true ]; then
        break
    fi

    echo "Aguardando servicos... ($i/30)"
    sleep 2
done

echo ""
echo "Stack iniciada!"
echo ""
echo "Frontend:     http://localhost:${FRONTEND_PORT:-3001}"
echo "Backend:      http://localhost:8080"
echo "Health check: http://localhost:8080/actuator/health"
echo ""
echo "Para parar: docker-compose down"
