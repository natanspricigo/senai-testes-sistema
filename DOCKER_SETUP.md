# 🐳 Docker & Vercel Setup - Tudo Pronto!

Estrutura completa para rodar a aplicação em Docker e fazer deploy em Vercel.

## 📦 O Que Foi Adicionado

### Docker
- ✅ `Dockerfile` para backend (Java)
- ✅ `Dockerfile` para frontend (React)
- ✅ `docker-compose.yml` para desenvolvimento
- ✅ `docker-compose.prod.yml` para produção
- ✅ `.dockerignore` files
- ✅ `start.sh` e `start.bat` para iniciar fácil
- ✅ `stop.sh` e `stop.bat` para parar fácil

### Deployment
- ✅ `DEPLOYMENT_VERCEL.md` - Guia completo passo-a-passo
- ✅ `QUICK_DEPLOY.md` - Resumo rápido
- ✅ `DOCKER_GUIDE.md` - Guia Docker detalhado
- ✅ GitHub Actions CI/CD workflows
- ✅ `.env.example` com variáveis necessárias

### Configuração
- ✅ `application-prod.yml` para backend em produção
- ✅ `vercel.json` e `.vercelrc` para frontend em Vercel
- ✅ `nginx.conf` para routing
- ✅ Deploy scripts automatizados

---

## 🚀 3 Formas de Rodar

### 1️⃣ Localmente com Docker (Rápido)

```bash
# Linux/Mac
./start.sh

# Windows
start.bat
```

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

```bash
# Parar
./stop.sh  # Linux/Mac
stop.bat   # Windows
```

### 2️⃣ Rodar sem Docker (Desenvolvimento)

Backend:
```bash
cd backend-api
mvn spring-boot:run
```

Frontend:
```bash
cd frontend-web
npm install
npm run dev
```

### 3️⃣ Deploy em Vercel (Produção)

Siga: [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md)

---

## 📋 Quick Start Guide

### Para Alunos

1. Vá para: `https://seu-app.vercel.app`
2. Teste no navegador
3. Use Postman com a mesma URL

### Para Você (Professor)

Fazer deploy:
```bash
# Deploy backend em Railway
# Deploy frontend em Vercel
```

Detalhes em: [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md)

---

## 📁 Estrutura de Arquivos

```
.
├── backend-api/
│   ├── Dockerfile                    ← Build backend
│   ├── .dockerignore
│   └── src/main/resources/
│       ├── application.yml           ← Dev
│       └── application-prod.yml      ← Produção
├── frontend-web/
│   ├── Dockerfile                    ← Build frontend
│   ├── .dockerignore
│   ├── vercel.json                   ← Config Vercel
│   ├── .vercelrc                     ← Config Vercel
│   ├── nginx.conf                    ← Nginx config
│   └── src/services/api.js           ← API client atualizado
├── docker-compose.yml                ← Dev
├── docker-compose.prod.yml           ← Prod
├── start.sh / start.bat              ← Iniciar stack
├── stop.sh / stop.bat                ← Parar stack
├── deploy-vercel.sh / .bat           ← Deploy scripts
├── .github/workflows/
│   ├── docker-build.yml              ← CI/CD
│   ├── deploy-vercel.yml
│   └── deploy-railway.yml
├── .env.example                      ← Template vars
├── DEPLOYMENT_VERCEL.md              ← Guia deploy ⭐
├── QUICK_DEPLOY.md                   ← Resumo rápido ⭐
└── DOCKER_GUIDE.md                   ← Guia Docker

```

---

## 🎯 Checklist de Setup

### Local
- [ ] Docker instalado
- [ ] `docker-compose` funcionando
- [ ] `./start.sh` ou `start.bat` funciona
- [ ] http://localhost:3000 abre
- [ ] http://localhost:8080 abre

### Deployment
- [ ] GitHub repo criado
- [ ] Railway conta criada (backend)
- [ ] Vercel conta criada (frontend)
- [ ] Backend deployado com sucesso
- [ ] Frontend deployado com sucesso
- [ ] URL compartilhada com alunos

---

## 🌐 URLs Finais

Após deployment, você terá:

| Componente | URL |
|-----------|-----|
| **Frontend** | `https://seu-app.vercel.app` |
| **Backend** | `https://seu-backend.railway.app` |
| **Swagger** | `https://seu-backend.railway.app/swagger-ui.html` |
| **H2 Console** | `https://seu-backend.railway.app/h2-console` |

Compartilhe com alunos: `https://seu-app.vercel.app`

---

## 🔧 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Port 8080 em uso | `lsof -i :8080` (Linux) / `netstat -ano \| findstr :8080` (Windows) |
| Docker não inicia | `docker system prune -a` e tentar novamente |
| Frontend não conecta API | Verificar `VITE_API_URL` no Vercel |
| Railway deployment falha | Ver logs no Railway Dashboard |

---

## 📚 Documentação Completa

- [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md) - Guia passo-a-passo completo
- [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Resumo dos passos principais
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Detalhes sobre Docker
- [backend-api/README.md](backend-api/README.md) - Backend
- [frontend-web/README.md](frontend-web/README.md) - Frontend

---

## 💡 Próximos Passos

1. **Testary localmente**: `./start.sh` ou `start.bat`
2. **Fazer commit**: `git add . && git commit -m "Add Docker and Vercel support"`
3. **Push para GitHub**: `git push origin main`
4. **Seguir [QUICK_DEPLOY.md](QUICK_DEPLOY.md)**
5. **Compartilhar URL com alunos**

---

## ✅ Status

Tudo pronto para deploy! 🎉

- ✅ Dockerfiles otimizados
- ✅ docker-compose configurado
- ✅ Scripts de inicialização
- ✅ CI/CD workflows
- ✅ Guias de deployment
- ✅ Variáveis de ambiente
- ✅ Configurações de produção

**Próxima ação**: Leia [QUICK_DEPLOY.md](QUICK_DEPLOY.md) para começar!

---

**Criado**: 18 de maio de 2026  
**Versão**: 1.0
