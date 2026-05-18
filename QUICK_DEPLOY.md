# Quick Deploy Guide

Guia rápido para fazer deploy em 5 minutos!

## 🚀 Opção 1: Vercel + Railway (Recomendado)

### 1. Frontend em Vercel

```bash
# Se tiver Vercel CLI instalado:
npm install -g vercel
cd frontend-web
vercel
```

Ou manualmente:
1. Acesse https://vercel.com
2. Clique "Import Project"
3. Cole a URL do seu repositório GitHub
4. Root Directory: `frontend-web`
5. Adicione env var: `VITE_API_URL=https://seu-backend-url/api`

### 2. Backend em Railway

1. Acesse https://railway.app
2. Clique "New Project"
3. Selecione seu repositório
4. Root Directory: `backend-api`
5. Deploy automático!

Copie a URL gerada. Use no VITE_API_URL do Vercel.

---

## 📱 Compartilhar com Alunos

Apenas a URL do Vercel:
```
https://seu-app.vercel.app
```

## 🐳 Rodar Localmente

```bash
docker-compose up -d
```

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## ✅ Pronto!

Seus alunos agora têm acesso à aplicação!
