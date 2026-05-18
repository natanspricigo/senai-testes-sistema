# Deploy Backend em Railway

Esse guia mostra como fazer deploy do backend na Railway (gratuito e suporta Java)

## 1. Criar conta na Railway

- Acesse: https://railway.app
- Clique em "Start a new project"
- Conecte sua conta GitHub

## 2. Conectar Repositório

- Selecione o repositório GitHub
- Railway detectará automaticamente que é um projeto Java/Maven

## 3. Configurar Variáveis de Ambiente

No dashboard da Railway, defina:
```
SERVER_PORT=8080
SPRING_PROFILES_ACTIVE=prod
```

## 4. Deploy

Railway fará deploy automaticamente a cada push para main.

## 5. Obter URL da API

Após deploy, você terá uma URL como: `https://carrinhos-api.railway.app`

Use essa URL no frontend!

---

# Deploy Frontend em Vercel

## 1. Criar conta na Vercel

- Acesse: https://vercel.com
- Faça login com GitHub

## 2. Importar Projeto

- Clique em "New Project"
- Selecione o repositório
- Escolha o diretório raiz: `frontend-web`
- Framework: Other (Vite)

## 3. Configurar Build

Vercel detectará automaticamente:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 4. Environment Variables

Adicione:
```
VITE_API_URL=https://carrinhos-api.railway.app/api
```

## 5. Deploy

Clique em "Deploy" e pronto!

---

# Alternativa: Deploy com Docker em Render

Se preferir usar Docker, use Render.com:

## Backend no Render

1. Conecte repositório GitHub
2. Selecione "Web Service"
3. Dockerfile: `backend-api/Dockerfile`
4. Port: `8080`
5. Deploy

## Frontend no Render

1. Mesmo processo
2. Dockerfile: `frontend-web/Dockerfile`
3. Port: `3000`
4. Deploy

---

# Resumo de URLs

Após deploy, você terá:

- **Backend**: https://carrinhos-api.railway.app (ou seu serviço)
- **Frontend**: https://carrinhos-web.vercel.app (ou seu domínio)

Compartilhe a URL do frontend com seus alunos!
