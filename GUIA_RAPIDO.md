# Guia Rapido

## Rodar backend

```bash
cd backend-api
npm install
npm start
```

Acesse:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/actuator/health
```

## Rodar frontend

Em outro terminal:

```bash
cd frontend-web
npm install
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Rodar tudo com Docker

```bash
docker compose up --build
```

Acesse:

```text
http://localhost:3001
```

## Endpoints principais

```text
GET    /api/professores
POST   /api/professores
PUT    /api/professores/{id}
PATCH  /api/professores/{id}/ativar
PATCH  /api/professores/{id}/inativar

GET    /api/carrinhos
POST   /api/carrinhos
PUT    /api/carrinhos/{id}
PATCH  /api/carrinhos/{id}/ativar
PATCH  /api/carrinhos/{id}/inativar

GET    /api/reservas
POST   /api/reservas
GET    /api/reservas?dataUso=2026-05-20
GET    /api/reservas?professorId=1
GET    /api/reservas?carrinhoId=1
PATCH  /api/reservas/{id}/cancelar
PATCH  /api/reservas/{id}/finalizar
```

## Deploy no Render

Use o arquivo:

```text
render.yaml
```

Passos:

1. Suba o projeto para o GitHub.
2. No Render, clique em New > Blueprint.
3. Selecione o repositorio.
4. Confirme os servicos.
5. Clique em Apply.

## Observacoes

- O backend usa dados em memoria.
- Os dados voltam ao estado inicial quando a API reinicia.
- No plano gratuito do Render, a primeira chamada pode demorar quando o backend estiver dormindo.
