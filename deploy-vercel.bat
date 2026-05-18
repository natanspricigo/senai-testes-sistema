@echo off
REM Script para fazer deploy do frontend em Vercel (Windows)

setlocal enabledelayedexpansion

echo 🚀 Configurando Vercel...

REM Verificar se Vercel CLI está instalado
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 📥 Instalando Vercel CLI...
    npm install -g vercel
)

echo 📦 Fazendo deploy do frontend...

cd frontend-web
vercel deploy --prod

echo ✅ Deploy concluído!
echo.
echo 🌐 Acesse seu projeto em Vercel Dashboard:
echo    https://vercel.com/dashboard

pause
