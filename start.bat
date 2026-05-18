@echo off
REM Script para rodar toda a stack localmente com Docker (Windows)

setlocal enabledelayedexpansion

echo 🚀 Iniciando Stack Carrinhos...
echo.

REM Verificar se Docker está instalado
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker não está instalado
    exit /b 1
)

REM Verificar se Docker Compose está instalado
where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker Compose não está instalado
    exit /b 1
)

REM Build
echo 📦 Buildando imagens Docker...
docker-compose build

echo.
echo ✅ Imagens buildadas com sucesso!
echo.

REM Start
echo 🏃 Iniciando serviços...
docker-compose up -d

echo.
echo ⏳ Aguardando serviços ficarem prontos...
timeout /t 5 /nobreak

echo.
echo 🔍 Verificando health checks...

setlocal enabledelayedexpansion

for /l %%i in (1,1,30) do (
    powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:8080/api/professores' -UseBasicParsing -ErrorAction Stop; Write-Host '✅ Backend pronto em http://localhost:8080' } catch { }" 2>nul
    
    powershell -Command "try { $r = Invoke-WebRequest -Uri 'http://localhost:3000' -UseBasicParsing -ErrorAction Stop; Write-Host '✅ Frontend pronto em http://localhost:3000' } catch { }" 2>nul
    
    timeout /t 2 /nobreak
)

echo.
echo ════════════════════════════════════════════════════════════
echo ✨ Stack iniciada com sucesso!
echo ════════════════════════════════════════════════════════════
echo.
echo 📱 Frontend:  http://localhost:3000
echo 🔌 Backend:   http://localhost:8080
echo 📊 Swagger:   http://localhost:8080/swagger-ui.html
echo 💾 H2 Console: http://localhost:8080/h2-console
echo.
echo Para parar: docker-compose down
echo.

pause
