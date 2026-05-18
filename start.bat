@echo off
setlocal enabledelayedexpansion

if "%FRONTEND_PORT%"=="" set FRONTEND_PORT=3001

echo Iniciando Stack Carrinhos...
echo.

where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker nao esta instalado
    exit /b 1
)

where docker-compose >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker Compose nao esta instalado
    exit /b 1
)

echo Buildando imagens Docker...
docker-compose build

echo.
echo Iniciando servicos...
docker-compose up -d

echo.
echo Aguardando servicos ficarem prontos...
timeout /t 5 /nobreak

echo.
echo Verificando health checks...

for /l %%i in (1,1,30) do (
    powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:8080/api/professores' -UseBasicParsing -ErrorAction Stop | Out-Null; Write-Host 'Backend pronto em http://localhost:8080' } catch { }" 2>nul
    powershell -Command "try { Invoke-WebRequest -Uri 'http://localhost:%FRONTEND_PORT%' -UseBasicParsing -ErrorAction Stop | Out-Null; Write-Host 'Frontend pronto em http://localhost:%FRONTEND_PORT%' } catch { }" 2>nul
    timeout /t 2 /nobreak
)

echo.
echo Stack iniciada!
echo.
echo Frontend:     http://localhost:%FRONTEND_PORT%
echo Backend:      http://localhost:8080
echo Health check: http://localhost:8080/actuator/health
echo.
echo Para parar: docker-compose down
echo.

pause
