# 🚀 Guia Completo de Deployment

Este guia mostra como fazer deploy da aplicação na Vercel para seus alunos acessarem.

## 📋 Opções de Deployment

### Opção 1: Vercel (Frontend) + Railway (Backend) ⭐ RECOMENDADO

Melhor custo-benefício, ambos têm tier gratuito.

### Opção 2: Docker em Render

Simples, tudo em um lugar, mas um pouco mais lento.

### Opção 3: GitHub Pages + Heroku

GitHub Pages para frontend, Heroku para backend (custo).

---

## 🎯 Opção 1: Vercel + Railway (RECOMENDADO)

### Parte 1: Deploy Backend na Railway

#### Passo 1: Criar conta na Railway

1. Acesse: https://railway.app
2. Clique em "Start a new project"
3. Escolha "GitHub" para conectar seu repositório

#### Passo 2: Conectar Repositório

```bash
# Clone seu repositório com os projetos
git clone https://github.com/SEU_USER/testes-software.git
cd testes-software
```

#### Passo 3: Fazer primeiro push

```bash
git add .
git commit -m "Add Docker and deployment files"
git push origin main
```

#### Passo 4: Criar projeto no Railway

1. Vá para https://railway.app/dashboard
2. Clique em "+ New Project"
3. Selecione "Deploy from GitHub"
4. Escolha seu repositório `testes-software`

#### Passo 5: Configurar Railway

Na Railway Dashboard:
1. Clique em "+ New Service"
2. Selecione "GitHub Repo"
3. Escolha a branch `main`
4. Em "Root Directory", coloque: `backend-api`

#### Passo 6: Variáveis de Ambiente

No Railway, defina:
```
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080
```

#### Passo 7: Obter URL do Backend

Após deploy, acesse a aba "Deployments" e procure por:
- Railway URL: `https://seu-backend-randomid.railway.app`

Anote esta URL! Você usará no frontend.

---

### Parte 2: Deploy Frontend na Vercel

#### Passo 1: Criar conta na Vercel

1. Acesse: https://vercel.com
2. Clique em "Sign Up"
3. Escolha "Continue with GitHub"
4. Autorize a Vercel

#### Passo 2: Importar Projeto

1. Na Vercel Dashboard, clique em "Add New..."
2. Selecione "Project"
3. Escolha seu repositório `testes-software`

#### Passo 3: Configurar Build

1. **Root Directory**: `frontend-web`
2. **Framework Preset**: Other
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

#### Passo 4: Variáveis de Ambiente

Clique em "Environment Variables" e adicione:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://seu-backend-randomid.railway.app/api` |

Use a URL do Railway que você anotou!

#### Passo 5: Deploy

Clique em "Deploy" e aguarde.

#### Passo 6: Obter URL do Frontend

Após deploy, você terá uma URL como:
- `https://seu-projeto.vercel.app`

Compartilhe esta URL com seus alunos!

---

## 🐳 Opção 2: Render (Docker)

Para usar Docker em um único serviço.

### Backend no Render

1. Acesse: https://render.com
2. Clique em "New +" > "Web Service"
3. Selecione seu repositório GitHub
4. Configure:
   - **Root Directory**: `backend-api`
   - **Build Command**: `docker build -t myapp .`
   - **Start Command**: `docker run -p 8080:8080 myapp`
   - **Port**: `8080`

### Frontend no Render

1. Novo "Web Service"
2. **Root Directory**: `frontend-web`
3. **Build Command**: `npm run build`
4. **Start Command**: `npm install -g serve && serve -s dist -l 3000`
5. **Port**: `3000`

---

## 🐳 Rodar Localmente com Docker

### Pré-requisitos

- Docker instalado: https://www.docker.com
- Docker Compose instalado

### Iniciar Stack

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```bash
start.bat
```

### URLs Locais

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Swagger: `http://localhost:8080/swagger-ui.html`
- H2 Console: `http://localhost:8080/h2-console`

### Parar Stack

**Linux/Mac:**
```bash
./stop.sh
```

**Windows:**
```bash
stop.bat
```

---

## 📝 Checklist de Deployment

### Preparação

- [ ] Projeto no GitHub
- [ ] Backend-api no subdiretório `backend-api/`
- [ ] Frontend-web no subdiretório `frontend-web/`
- [ ] Dockerfiles criados
- [ ] docker-compose.yml criado

### Railway (Backend)

- [ ] Conta criada
- [ ] Repositório conectado
- [ ] Root Directory configurado como `backend-api/`
- [ ] Variáveis de ambiente definidas
- [ ] Deploy realizado com sucesso
- [ ] URL anotada

### Vercel (Frontend)

- [ ] Conta criada
- [ ] Repositório conectado
- [ ] Root Directory configurado como `frontend-web/`
- [ ] `VITE_API_URL` com URL do Railway
- [ ] Deploy realizado com sucesso
- [ ] URL compartilhada com alunos

---

## 🔍 Troubleshooting

### Frontend não conecta ao Backend

**Problema**: Erro de CORS ou "Cannot reach API"

**Solução**:
```bash
# Verifique a URL do backend
# Em frontend-web/src/services/api.js
# const API_BASE_URL = 'https://seu-backend.railway.app/api'

# Ou em Vercel Environment Variables:
# VITE_API_URL=https://seu-backend.railway.app/api
```

### Backend não inicia no Railway

**Verificar logs:**
1. Railway Dashboard > Deployments
2. Clique em "Logs"
3. Procure por erros

**Soluções comuns:**
- Java 17 requerido
- Porta 8080 deve estar livre
- Variáveis de ambiente configuradas

### Docker build falha

```bash
# Limpar cache
docker system prune -a

# Rebuildar
docker-compose build --no-cache
docker-compose up -d
```

### Portas em uso

```bash
# Linux/Mac - Liberar porta 8080
sudo lsof -i :8080
kill -9 <PID>

# Windows - Liberar porta 8080
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## 📚 Referências

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com)
- [Docker Compose Docs](https://docs.docker.com/compose)

---

## 💡 Dicas

1. **Use Railway + Vercel** - Melhor custo-benefício
2. **Teste localmente primeiro** - Use `./start.sh` ou `start.bat`
3. **Monitore os logs** - Facilita debugar problemas
4. **Compartilhe URLs** - Alunos usam apenas a URL do Vercel
5. **Documente mudanças** - Atualize documentação ao fazer mudanças

---

## 🎓 Para seus Alunos

Compartilhe este link com seus alunos:

```
🌐 Sistema de Reserva: https://seu-projeto.vercel.app

📖 Documentação: https://github.com/seu-user/testes-software

📋 Casos de Teste: https://github.com/seu-user/testes-software/blob/main/backend-api/CASOS_DE_TESTE.md

📌 Collection Postman: https://github.com/seu-user/testes-software/tree/main/backend-api/postman
```

---

**Última atualização**: 18 de maio de 2026
