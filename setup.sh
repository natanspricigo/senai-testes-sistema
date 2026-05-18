#!/bin/bash

set -e

echo "Setup Inicial do Projeto - Carrinhos"
echo "===================================="
echo ""

echo "Verificando pre-requisitos..."

if ! command -v git &> /dev/null; then
    echo "Git nao esta instalado"
    exit 1
fi
echo "Git instalado"

if ! command -v docker &> /dev/null; then
    echo "Docker nao esta instalado. Instale em: https://www.docker.com"
fi

if ! command -v node &> /dev/null; then
    echo "Node.js nao esta instalado. Instale em: https://nodejs.org"
fi

echo ""
echo "Verificando estrutura do projeto..."

if [ ! -f "backend-api/package.json" ]; then
    echo "backend-api/package.json nao encontrado"
    exit 1
fi
echo "Backend pronto"

if [ ! -f "frontend-web/package.json" ]; then
    echo "frontend-web/package.json nao encontrado"
    exit 1
fi
echo "Frontend pronto"

echo ""
echo "Criando arquivo .env.local..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local 2>/dev/null || true
    echo ".env.local criado"
else
    echo ".env.local ja existe"
fi

echo ""
echo "Setup concluido!"
echo ""
echo "Proximos passos:"
echo ""
echo "1. Com Docker:"
echo "   ./start.sh"
echo ""
echo "2. Sem Docker:"
echo "   cd backend-api && npm install && npm start"
echo "   cd frontend-web && npm install && npm run dev"
echo ""
echo "3. Deploy:"
echo "   Leia: QUICK_DEPLOY.md"
echo ""
echo "4. Documentacao completa:"
echo "   Leia: DEPLOYMENT_RENDER.md"
