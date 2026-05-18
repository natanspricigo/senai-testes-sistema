# Sistema de Reserva de Carrinhos de Notebooks

Sistema didatico para um curso de Testes de Software. O projeto tem:

- Backend API REST em Node.js com dados em memoria.
- Frontend web em React/Vite.
- Deploy gratuito no Render via `render.yaml`.

## Projetos

### Backend API

Pasta: `backend-api`

- Node.js 20+
- HTTP nativo do Node
- Dados em memoria
- Porta local: `8080`

### Frontend Web

Pasta: `frontend-web`

- React 18
- Vite 5
- React Router
- Axios
- Porta local em desenvolvimento: `3000`
- Porta local com Docker: `3001`

## Inicio Rapido

Backend:

```bash
cd backend-api
npm install
npm start
```

Frontend:

```bash
cd frontend-web
npm install
npm run dev
```

Acessos locais:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/actuator/health`

## Deploy no Render

O deploy esta centralizado no arquivo:

```text
render.yaml
```

No Render:

1. Clique em New > Blueprint.
2. Selecione este repositorio.
3. Confirme os servicos.
4. Clique em Apply.

Servicos criados:

- `senai-testes-api`: backend Node.js.
- `senai-testes-web`: frontend React/Vite.

URLs esperadas:

- Frontend: `https://senai-testes-web.onrender.com`
- Backend: `https://senai-testes-api.onrender.com`
- Health check: `https://senai-testes-api.onrender.com/actuator/health`

Guia completo: [DEPLOYMENT_RENDER.md](DEPLOYMENT_RENDER.md)

## Docker Local

Na raiz do projeto:

```bash
docker compose up --build
```

Acessos:

- Frontend: `http://localhost:3001`
- Backend: `http://localhost:8080`

## Funcionalidades

- Cadastro, edicao, listagem e ativacao/inativacao de professores.
- Cadastro, edicao, listagem e ativacao/inativacao de carrinhos.
- Criacao, cancelamento e finalizacao de reservas.
- Busca de reservas por data, professor ou carrinho.
- Validacoes de regras de negocio e conflito de horario.

## Endpoints Principais

Professores:

- `GET /api/professores`
- `POST /api/professores`
- `PUT /api/professores/{id}`
- `PATCH /api/professores/{id}/ativar`
- `PATCH /api/professores/{id}/inativar`

Carrinhos:

- `GET /api/carrinhos`
- `POST /api/carrinhos`
- `PUT /api/carrinhos/{id}`
- `PATCH /api/carrinhos/{id}/ativar`
- `PATCH /api/carrinhos/{id}/inativar`

Reservas:

- `GET /api/reservas`
- `POST /api/reservas`
- `GET /api/reservas?dataUso=2026-05-20`
- `GET /api/reservas?professorId=1`
- `GET /api/reservas?carrinhoId=1`
- `PATCH /api/reservas/{id}/cancelar`
- `PATCH /api/reservas/{id}/finalizar`

## Documentacao

- [Comece aqui](START_HERE.md)
- [Deploy no Render](DEPLOYMENT_RENDER.md)
- [Guia rapido de deploy](QUICK_DEPLOY.md)
- [Infra Docker e Render](INFRA_DEPLOY.md)
- [Backend README](backend-api/README.md)
- [Frontend README](frontend-web/README.md)
- [Casos de teste](backend-api/CASOS_DE_TESTE.md)

## Notas

- Projeto para fins educacionais.
- Sem autenticacao.
- Dados em memoria: tudo reinicia junto com a API.
- No plano gratuito do Render, o backend pode dormir apos ficar sem trafego.
