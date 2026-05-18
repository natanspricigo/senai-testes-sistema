#!/bin/bash

# Script para parar a stack

set -e

echo "🛑 Parando Stack Carrinhos..."
docker-compose down

echo ""
echo "✅ Stack parada com sucesso!"
echo ""
