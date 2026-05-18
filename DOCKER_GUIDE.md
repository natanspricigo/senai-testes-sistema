# Guia Docker

Este projeto pode rodar localmente com Docker Compose ou ser publicado no Render.

## Rodar localmente

Na raiz do projeto:

```bash
docker compose up --build
```

Acessos:

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/actuator/health`

## Backend

Dockerfile:

```text
backend-api/Dockerfile
```

Build manual:

```bash
docker build -t carrinhos-api ./backend-api
```

Execucao manual:

```bash
docker run -p 8080:8080 carrinhos-api
```

## Frontend

Dockerfile:

```text
frontend-web/Dockerfile
```

Build manual:

```bash
docker build -t carrinhos-web ./frontend-web
```

Execucao manual:

```bash
docker run -p 3001:80 carrinhos-web
```

## Deploy no Render

Para deploy online, use o Blueprint da raiz:

```text
render.yaml
```

Passos:

1. Envie o projeto para o GitHub.
2. No Render, clique em New > Blueprint.
3. Selecione o repositorio.
4. Confirme os servicos.
5. Clique em Apply.

No Render, o `Dockerfile` da raiz builda o frontend e sobe a API Node servindo tudo no mesmo dominio.
