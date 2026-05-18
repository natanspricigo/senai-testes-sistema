#!/bin/bash

# Script de setup inicial para configuração do projeto

set -e

echo "🚀 Setup Inicial do Projeto - Carrinhos API"
echo "==========================================="
echo ""

# Verificações
echo "🔍 Verificando pré-requisitos..."

if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado"
    exit 1
fi
echo "✅ Git instalado"

if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker não está instalado"
    echo "   Instale em: https://www.docker.com"
fi

if ! command -v java &> /dev/null; then
    echo "⚠️  Java não está instalado (necessário para development)"
    echo "   Instale Java 17+ de: https://adoptopenjdk.net"
fi

if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js não está instalado (necessário para development)"
    echo "   Instale em: https://nodejs.org"
fi

echo ""
echo "📦 Verificando estrutura do projeto..."

if [ ! -f "backend-api/pom.xml" ]; then
    echo "❌ backend-api/pom.xml não encontrado"
    exit 1
fi
echo "✅ Backend pronto"

if [ ! -f "frontend-web/package.json" ]; then
    echo "❌ frontend-web/package.json não encontrado"
    exit 1
fi
echo "✅ Frontend pronto"

echo ""
echo "📝 Criando arquivo .env.local..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local 2>/dev/null || true
    echo "✅ .env.local criado (edite conforme necessário)"
else
    echo "✅ .env.local já existe"
fi

echo ""
echo "✨ Setup concluído!"
echo ""
echo "Próximos passos:"
echo ""
echo "1. Desenvolvimento Local:"
echo "   ./start.sh           # Iniciar com Docker"
echo ""
echo "2. Ou sem Docker:"
echo "   cd backend-api && mvn spring-boot:run"
echo "   cd frontend-web && npm install && npm run dev"
echo ""
echo "3. Para fazer Deploy:"
echo "   Leia: QUICK_DEPLOY.md"
echo ""
echo "4. Documentação completa:"
echo "   Leia: DEPLOYMENT_VERCEL.md"
echo ""
