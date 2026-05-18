@echo off
setlocal enabledelayedexpansion

echo Setup Inicial do Projeto - Carrinhos
echo ====================================
echo.

echo Verificando pre-requisitos...

where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git nao esta instalado
    exit /b 1
)
echo Git instalado

where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker nao esta instalado. Instale em: https://www.docker.com
) else (
    echo Docker instalado
)

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js nao esta instalado. Instale em: https://nodejs.org
) else (
    echo Node.js instalado
)

echo.
echo Verificando estrutura do projeto...

if not exist "backend-api\package.json" (
    echo backend-api\package.json nao encontrado
    exit /b 1
)
echo Backend pronto

if not exist "frontend-web\package.json" (
    echo frontend-web\package.json nao encontrado
    exit /b 1
)
echo Frontend pronto

echo.
echo Criando arquivo .env.local...
if not exist ".env.local" (
    copy .env.example .env.local >nul 2>&1
    echo .env.local criado
) else (
    echo .env.local ja existe
)

echo.
echo Setup concluido!
echo.
echo Proximos passos:
echo.
echo 1. Com Docker:
echo    start.bat
echo.
echo 2. Sem Docker:
echo    cd backend-api ^&^& npm install ^&^& npm start
echo    cd frontend-web ^&^& npm install ^&^& npm run dev
echo.
echo 3. Deploy:
echo    Leia: QUICK_DEPLOY.md
echo.
echo 4. Documentacao completa:
echo    Leia: DEPLOYMENT_RENDER.md
echo.

pause
