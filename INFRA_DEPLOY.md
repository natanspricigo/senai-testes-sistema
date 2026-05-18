# Infra: Docker e Render

Este projeto esta preparado para dois cenarios:

- Docker local: sobe backend Node.js e frontend React com Nginx.
- Render: publica frontend e backend juntos em um Web Service Docker.

## Rodar tudo com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Por padrao, o frontend do Docker fica na porta `3001` para nao conflitar com o Vite local.

Se quiser trocar a porta:

```bash
FRONTEND_PORT=3002 docker compose up --build
```

No PowerShell:

```powershell
$env:FRONTEND_PORT='3002'
docker compose up --build
```

Acessos locais:

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/actuator/health`

## Deploy no Render

Use o Blueprint da raiz:

```text
render.yaml
```

No Render:

1. New > Blueprint.
2. Selecione o repositorio.
3. Confirme os servicos.
4. Clique em Apply.

Servico criado:

- `senai-testes-sistema`: frontend React + backend Node.js usando o `Dockerfile` da raiz.

O `VITE_API_URL` do frontend referencia automaticamente a URL publica do backend.

## Variaveis principais

Backend:

```text
APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001,https://*.onrender.com
```

No Render, o frontend chama a API por `/api`, no mesmo dominio. Nao precisa configurar `VITE_API_URL`.
