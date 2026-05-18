# Infra: Docker e Vercel

Este projeto esta preparado para dois cenarios:

- Docker local ou em servidor: sobe backend Spring Boot e frontend React com Nginx.
- Vercel: publica o frontend. O backend Java deve ficar em um host que rode Docker/Java, por exemplo Render, Railway, Fly.io, VPS ou servidor da escola.

## Rodar tudo com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Se a porta `3000` ja estiver ocupada:

```bash
FRONTEND_PORT=3001 docker compose up --build
```

No PowerShell:

```powershell
$env:FRONTEND_PORT='3001'
docker compose up --build
```

Acessos:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui.html`
- Health check: `http://localhost:8080/actuator/health`

O frontend em Docker chama a API por `/api`, e o Nginx repassa internamente para `http://backend:8080/api`.

## Deploy do backend em Docker

Build da imagem:

```bash
docker build -t carrinhos-api ./backend-api
```

Execucao:

```bash
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e APP_CORS_ALLOWED_ORIGIN_PATTERNS=https://seu-projeto.vercel.app,https://*.vercel.app \
  carrinhos-api
```

Depois de publicar, guarde a URL publica da API, por exemplo:

```text
https://carrinhos-api.onrender.com/api
```

## Deploy do frontend na Vercel

Voce pode importar o repositorio pela Vercel usando a raiz do projeto. O arquivo `vercel.json` da raiz ja aponta para `frontend-web`.

Configure a variavel de ambiente na Vercel:

```text
VITE_API_URL=https://sua-api-publica.com/api
```

Build esperado:

- Install command: `cd frontend-web && npm install`
- Build command: `cd frontend-web && npm run build`
- Output directory: `frontend-web/dist`

Tambem funciona fazendo deploy de dentro da pasta `frontend-web`, pois ela tem seu proprio `vercel.json`.

## Observacao importante

A Vercel nao executa `docker-compose.yml` para este tipo de projeto. Por isso, o frontend fica na Vercel e o backend Spring Boot fica em um servico que aceite Docker/Java. O CORS do backend ja esta liberado para localhost e dominios `*.vercel.app`.
