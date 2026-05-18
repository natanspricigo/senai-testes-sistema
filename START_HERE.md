```
██████████████████████████████████████████████████████████████████
█                                                                  █
█    🚀 CARRINHOS API - PRONTO PARA PRODUÇÃO EM VERCEL 🚀       █
█                                                                  █
██████████████████████████████████████████████████████████████████
```

# 🎯 Mapa Rápido - Onde Começar?

## 👶 Primeira Vez?

1. **Setup Inicial**
   ```bash
   # Linux/Mac
   bash setup.sh
   
   # Windows
   setup.bat
   ```

2. **Rodar Localmente**
   ```bash
   # Linux/Mac
   ./start.sh
   
   # Windows
   start.bat
   ```

3. **Testar**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8080
   - Swagger: http://localhost:8080/swagger-ui.html

## 🚀 Pronto para Vercel?

**Leia em 5 minutos**: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

**Guia completo**: [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md)

---

## 📚 Documentação

### 🔥 Essencial
| Arquivo | Para Quem? | Tempo |
|---------|-----------|-------|
| [QUICK_DEPLOY.md](QUICK_DEPLOY.md) | Deploy rápido | 5 min |
| [DOCKER_SETUP.md](DOCKER_SETUP.md) | Entender Docker | 10 min |
| [README.md](README.md) | Visão geral | 10 min |

### 📖 Completo
| Arquivo | Para Quem? | Tempo |
|---------|-----------|-------|
| [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md) | Deploy profissional | 30 min |
| [DOCKER_GUIDE.md](DOCKER_GUIDE.md) | Docker avançado | 20 min |
| [backend-api/CASOS_DE_TESTE.md](backend-api/CASOS_DE_TESTE.md) | Testar API | 30 min |
| [backend-api/README.md](backend-api/README.md) | Backend detalhes | 15 min |
| [frontend-web/README.md](frontend-web/README.md) | Frontend detalhes | 15 min |

---

## 🎮 Comandos Úteis

### Docker Local

```bash
# Iniciar tudo
./start.sh                  # Linux/Mac
start.bat                   # Windows

# Parar tudo
./stop.sh                   # Linux/Mac
stop.bat                    # Windows

# Ver logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

### Sem Docker

```bash
# Backend
cd backend-api
mvn spring-boot:run

# Frontend (novo terminal)
cd frontend-web
npm install
npm run dev
```

### Deploy

```bash
# Setup inicial
./setup.sh              # Linux/Mac
setup.bat              # Windows

# Deploy frontend em Vercel
./deploy-vercel.sh     # Linux/Mac
deploy-vercel.bat      # Windows

# Backend: Siga QUICK_DEPLOY.md
```

---

## 🌐 URLs

### Local
```
Frontend:  http://localhost:3000
Backend:   http://localhost:8080
Swagger:   http://localhost:8080/swagger-ui.html
H2:        http://localhost:8080/h2-console
```

### Produção (depois de deploy)
```
Frontend:  https://seu-app.vercel.app
Backend:   https://seu-backend.railway.app
Swagger:   https://seu-backend.railway.app/swagger-ui.html
```

---

## 📋 Checklist Rápido

### Local
- [ ] Docker instalado
- [ ] `./start.sh` ou `start.bat` executa sem erro
- [ ] Navegadores abrem em localhost
- [ ] APIs respondendo corretamente

### Deployment  
- [ ] Repositório no GitHub criado
- [ ] Railway account criada
- [ ] Vercel account criada
- [ ] Backend deployado em Railway
- [ ] Frontend deployado em Vercel
- [ ] `VITE_API_URL` configurado no Vercel
- [ ] URL compartilhada com alunos

---

## 🆘 SOS - Problemas Comuns

### Docker não inicia
```bash
docker system prune -a
docker-compose build --no-cache
./start.sh
```

### Port 8080/3000 em uso
```bash
# Linux/Mac
lsof -i :8080
kill -9 <PID>

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Frontend não conecta Backend
```bash
# Verifique em Vercel:
VITE_API_URL=https://seu-backend.railway.app/api
```

### Railway deploy falha
- Verifique logs no Railway Dashboard
- Certifique-se que Java 17+ é usado
- Confira application-prod.yml

---

## 📊 Estrutura Pronta

```
✅ Dockerfiles otimizados
✅ docker-compose funcionando
✅ Scripts de início automáticos
✅ GitHub Actions CI/CD
✅ Guias de deployment
✅ Variáveis de ambiente
✅ Configurações de produção
✅ Health checks
```

---

## 🎓 Compartilhar com Alunos

```markdown
# 🎮 Sistema de Reserva de Carrinhos

Clique aqui: https://seu-app.vercel.app

## Testar API
- Collection Postman: [link]
- Documentação: https://seu-backend.railway.app/swagger-ui.html

## Funcionalidades
- ✅ Gerenciar professores
- ✅ Gerenciar carrinhos
- ✅ Criar reservas
- ✅ Validar regras de negócio
```

---

## 🚀 Próximo Passo

```bash
# 1. Setup inicial
bash setup.sh          # ou setup.bat

# 2. Rodar localmente
./start.sh            # ou start.bat

# 3. Quando pronto, ler:
cat QUICK_DEPLOY.md
```

---

## 🎉 Parabéns!

Você tem tudo o que precisa para:
- ✅ Rodar localmente em Docker
- ✅ Testar a aplicação
- ✅ Fazer deploy em Vercel
- ✅ Compartilhar com alunos
- ✅ Gerenciar a infraestrutura

**Próxima ação**: Escolha um caminho acima!

---

**Status**: 🟢 Pronto para Produção  
**Última atualização**: 18 de maio de 2026
