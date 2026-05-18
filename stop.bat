@echo off
REM Script para parar a stack (Windows)

echo 🛑 Parando Stack Carrinhos...
docker-compose down

echo.
echo ✅ Stack parada com sucesso!
echo.

pause
