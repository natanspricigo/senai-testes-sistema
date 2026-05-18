#!/bin/bash

# Script para rodar toda a stack localmente com Docker

set -e

echo "🚀 Iniciando Stack Carrinhos..."
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado"
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado"
    exit 1
fi

# Build
echo "📦 Buildando imagens Docker..."
docker-compose build

echo ""
echo "✅ Imagens buildadas com sucesso!"
echo ""

# Start
echo "🏃 Iniciando serviços..."
docker-compose up -d

echo ""
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 5

# Health checks
echo ""
echo "🔍 Verificando health checks..."

backend_ready=false
frontend_ready=false

for i in {1..30}; do
    if curl -s http://localhost:8080/api/professores > /dev/null 2>&1; then
        echo "✅ Backend pronto em http://localhost:8080"
        backend_ready=true
    fi
    
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend pronto em http://localhost:3000"
        frontend_ready=true
    fi
    
    if [ "$backend_ready" = true ] && [ "$frontend_ready" = true ]; then
        break
    fi
    
    echo "⏳ Aguardando serviços... ($i/30)"
    sleep 2
done

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✨ Stack iniciada com sucesso!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "📱 Frontend:  http://localhost:3000"
echo "🔌 Backend:   http://localhost:8080"
echo "📊 Swagger:   http://localhost:8080/swagger-ui.html"
echo "💾 H2 Console: http://localhost:8080/h2-console"
echo ""
echo "Para parar: docker-compose down"
echo ""
