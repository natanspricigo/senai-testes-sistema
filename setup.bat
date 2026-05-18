@echo off
REM Script de setup inicial para configuração do projeto (Windows)

setlocal enabledelayedexpansion

echo 🚀 Setup Inicial do Projeto - Carrinhos API
echo ===========================================
echo.

REM Verificações
echo 🔍 Verificando pré-requisitos...

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Git não está instalado
    exit /b 1
)
echo ✅ Git instalado

where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Docker não está instalado
    echo    Instale em: https://www.docker.com
) else (
    echo ✅ Docker instalado
)

where java >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Java não está instalado (necessário para development)
    echo    Instale Java 17+ de: https://adoptopenjdk.net
) else (
    echo ✅ Java instalado
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Node.js não está instalado (necessário para development)
    echo    Instale em: https://nodejs.org
) else (
    echo ✅ Node.js instalado
)

echo.
echo 📦 Verificando estrutura do projeto...

if not exist "backend-api\pom.xml" (
    echo ❌ backend-api\pom.xml não encontrado
    exit /b 1
)
echo ✅ Backend pronto

if not exist "frontend-web\package.json" (
    echo ❌ frontend-web\package.json não encontrado
    exit /b 1
)
echo ✅ Frontend pronto

echo.
echo 📝 Criando arquivo .env.local...
if not exist ".env.local" (
    copy .env.example .env.local >nul 2>&1
    echo ✅ .env.local criado (edite conforme necessário)
) else (
    echo ✅ .env.local já existe
)

echo.
echo ✨ Setup concluído!
echo.
echo Próximos passos:
echo.
echo 1. Desenvolvimento Local:
echo    start.bat            # Iniciar com Docker
echo.
echo 2. Ou sem Docker:
echo    cd backend-api ^&^& mvn spring-boot:run
echo    cd frontend-web ^&^& npm install ^&^& npm run dev
echo.
echo 3. Para fazer Deploy:
echo    Leia: QUICK_DEPLOY.md
echo.
echo 4. Documentação completa:
echo    Leia: DEPLOYMENT_VERCEL.md
echo.

pause
