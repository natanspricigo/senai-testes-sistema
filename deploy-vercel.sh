#!/bin/bash

# Script para fazer deploy do frontend em Vercel

set -e

echo "🚀 Configurando Vercel..."

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📥 Instalando Vercel CLI..."
    npm install -g vercel
fi

echo "📦 Fazendo deploy do frontend..."

# Deploy frontend
cd frontend-web
vercel deploy --prod

echo "✅ Deploy concluído!"
echo ""
echo "🌐 Acesse seu projeto em Vercel Dashboard:"
echo "   https://vercel.com/dashboard"
