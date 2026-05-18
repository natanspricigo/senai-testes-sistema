# Sistema de Reserva de Carrinhos de Notebooks

Sistema didático para um curso de Testes de Software. Consiste de um backend API REST em Java/Spring Boot e um frontend em React/Vite.

## 📁 Projetos

### [Backend API](backend-api/)
- **Linguagem**: Java 17
- **Framework**: Spring Boot 3.3
- **Banco**: H2 (em memória)
- **ORM**: JPA/Hibernate
- **Porta**: 8080
- **Documentação**: [README.md](backend-api/README.md)

### [Frontend Web](frontend-web/)
- **Linguagem**: JavaScript/JSX
- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Router**: React Router 6.20
- **Porta**: 3000
- **Documentação**: [README.md](frontend-web/README.md)

## 🚀 Início Rápido

### Backend

```bash
cd backend-api
mvn clean install
mvn spring-boot:run
```

Acesse: `http://localhost:8080`

### Frontend

```bash
cd frontend-web
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## 📚 Documentação

- [Guia Rápido de Desenvolvimento](GUIA_RAPIDO.md)
- [Backend README](backend-api/README.md)
- [Frontend README](frontend-web/README.md)
- [Casos de Teste](backend-api/CASOS_DE_TESTE.md)
- [Collection Postman](backend-api/postman/notebook-reservas.postman_collection.json)

## 🎯 Objetivo

Criar um sistema simples e didático para praticar:
- ✅ Testes de API com Postman
- ✅ Desenvolvimento de API REST
- ✅ Desenvolvimento Frontend
- ✅ Integração Frontend-Backend
- ✅ Validações e tratamento de erros
- ✅ Regras de negócio

## 📊 Funcionalidades

### Gerenciamento de Professores
- Cadastro, edição, listagem
- Ativar/inativar professores
- Validação de email

### Gerenciamento de Carrinhos
- Cadastro, edição, listagem
- Ativar/inativar carrinhos
- Rastreamento de notebooks

### Gerenciamento de Reservas
- Criar, cancelar, finalizar reservas
- Buscar por data, professor ou carrinho
- Detectar conflitos de horário
- Validações complexas

## 🔧 Stack Tecnológico

### Backend
- Java 17
- Spring Boot 3.3.0
- Spring Web
- Spring Data JPA
- H2 Database
- Lombok
- Swagger/OpenAPI

### Frontend
- React 18.2.0
- Vite 5.0.0
- React Router 6.20.0
- Axios 1.6.0
- CSS Vanilla

## 📋 Requisitos Funciona

### Validações
- Campos obrigatórios
- Formato de email
- Números positivos
- Horários válidos

### Regras de Negócio
- Não permitir carrinho inativo
- Não permitir professor inativo
- Detectar conflitos de horário
- Não deletar (apenas inativar)
- Status de reserva

### Tratamento de Erros
- Erros de validação (400)
- Recurso não encontrado (404)
- Erros de negócio (400)
- Erro interno (500)

## 📦 Estrutura do Projeto

```
testes de software/
├── backend-api/
│   ├── src/main/java/...
│   ├── src/main/resources/
│   ├── pom.xml
│   ├── README.md
│   ├── CASOS_DE_TESTE.md
│   ├── postman/
│   ├── .gitignore
│   └── GUIA_RAPIDO.md
├── frontend-web/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── README.md
│   ├── .gitignore
│   └── GUIA_RAPIDO.md
├── README.md (este arquivo)
└── GUIA_RAPIDO.md
```

## 🧪 Testando

### Opção 1: Postman
```
1. Importe: backend-api/postman/notebook-reservas.postman_collection.json
2. Execute os testes
```

### Opção 2: Frontend
```
1. Acesse http://localhost:3000
2. Navegue pelas páginas
3. Teste as funcionalidades
```

### Opção 3: Swagger
```
Acesse: http://localhost:8080/swagger-ui.html
```

## 📖 Dados Iniciais

O backend carrega automaticamente:
- 3 professores (2 ativos, 1 inativo)
- 4 carrinhos (3 ativos, 1 inativo)
- 4 reservas agendadas

Perfeito para começar os testes imediatamente!

## 🔌 Endpoints da API

### Professores
- `POST /api/professores` - Criar
- `GET /api/professores` - Listar
- `GET /api/professores/{id}` - Obter
- `PUT /api/professores/{id}` - Atualizar
- `PATCH /api/professores/{id}/ativar` - Ativar
- `PATCH /api/professores/{id}/inativar` - Inativar

### Carrinhos
- `POST /api/carrinhos` - Criar
- `GET /api/carrinhos` - Listar
- `GET /api/carrinhos/{id}` - Obter
- `PUT /api/carrinhos/{id}` - Atualizar
- `PATCH /api/carrinhos/{id}/ativar` - Ativar
- `PATCH /api/carrinhos/{id}/inativar` - Inativar

### Reservas
- `POST /api/reservas` - Criar
- `GET /api/reservas` - Listar
- `GET /api/reservas/{id}` - Obter
- `GET /api/reservas?dataUso=2026-05-20` - Por data
- `GET /api/reservas?professorId=1` - Por professor
- `GET /api/reservas?carrinhoId=1` - Por carrinho
- `PATCH /api/reservas/{id}/cancelar` - Cancelar
- `PATCH /api/reservas/{id}/finalizar` - Finalizar

## 🎓 Casos de Teste

Consulte [CASOS_DE_TESTE.md](backend-api/CASOS_DE_TESTE.md) para 17 casos de teste didáticos com exemplos de requisições e resultados esperados.

## 🐳 Docker & Deployment

### Rodar Localmente com Docker

```bash
# Linux/Mac
./start.sh

# Windows
start.bat
```

### Deploy em Vercel (Produção)

Guia completo: [DEPLOYMENT_VERCEL.md](DEPLOYMENT_VERCEL.md)

Resumo rápido: [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

**Recomendado:**
- **Backend**: Railway.app (gratuito, suporta Java)
- **Frontend**: Vercel (gratuito, otimizado para React/Vite)

### Mais Informações

- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Visão geral Docker
- [DOCKER_GUIDE.md](DOCKER_GUIDE.md) - Guia detalhado Docker
- GitHub Actions CI/CD configurado em `.github/workflows/`

## ⚙️ Configuração

### Backend
- Edite `backend-api/src/main/resources/application.yml` para alterar porta
- Edite `backend-api/src/main/resources/data.sql` para alterar dados iniciais
- Use `application-prod.yml` para produção

### Frontend
- Edite `frontend-web/src/services/api.js` para alterar URL da API (ou use variável de ambiente)
- Edite `frontend-web/vite.config.js` para alterar porta
- Use `VITE_API_URL` como variável de ambiente em produção

## 📝 Notas

- Sistema didático, não para produção
- Sem autenticação implementada
- H2 em memória (dados perdidos ao reiniciar)
- Banco de dados recreado a cada inicialização
- Pronto para aprender e evoluir!

## 🤝 Contribuindo

Este é um projeto didático. Sugestões de melhorias:
- Adicionar mais validações
- Implementar autenticação
- Adicionar testes unitários
- Melhorar UI/UX
- Adicionar cache
- Implementar paginação

## 📞 Suporte

Para dúvidas:
1. Consulte os README.md de cada projeto
2. Verifique CASOS_DE_TESTE.md
3. Estude o código-fonte
4. Teste no Postman

---

**Criado para fins educacionais - Curso de Testes de Software**
