# Comece Aqui

Este projeto tem backend Node.js e frontend React/Vite para fins educacionais.

## Rodar localmente

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

Acessos:

- Frontend sem Docker: `http://localhost:3000`
- Frontend com Docker: `http://localhost:3001`
- Backend: `http://localhost:8080`
- Health check: `http://localhost:8080/actuator/health`

## Deploy no Render

Use o Blueprint:

```text
render.yaml
```

Passos:

1. Suba o repositorio para o GitHub.
2. No Render, clique em New > Blueprint.
3. Selecione o repositorio.
4. Confirme o servico `senai-testes-sistema`.
5. Clique em Apply.

Guia completo: [DEPLOYMENT_RENDER.md](DEPLOYMENT_RENDER.md)

## Compartilhar com alunos

Depois do deploy, compartilhe a URL do frontend:

```text
https://senai-testes-sistema.onrender.com
```

No plano gratuito, o backend pode demorar alguns segundos na primeira chamada depois de ficar sem uso.
