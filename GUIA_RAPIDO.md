# Guia Rápido de Desenvolvimento

Este documento fornece instruções rápidas para começar a trabalhar com os projetos.

## Iniciar Backend

```bash
cd backend-api
mvn clean install
mvn spring-boot:run
```

Acesse: `http://localhost:8080`

### Verificar Swagger

`http://localhost:8080/swagger-ui.html`

### Acessar H2 Console

`http://localhost:8080/h2-console`

## Iniciar Frontend

```bash
cd frontend-web
npm install
npm run dev
```

Acesse: `http://localhost:3000`

## Testar com Postman

1. Importe: `backend-api/postman/notebook-reservas.postman_collection.json`
2. Execute os testes

## Estrutura de Diretórios

```
testes de software/
├── backend-api/
│   ├── src/
│   ├── pom.xml
│   ├── README.md
│   ├── CASOS_DE_TESTE.md
│   ├── postman/
│   └── .gitignore
├── frontend-web/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── README.md
│   └── .gitignore
└── README.md (este arquivo)
```

## Endpoints Principais

### API Base
`http://localhost:8080/api`

### Recursos
- `/api/professores` - CRUD de professores
- `/api/carrinhos` - CRUD de carrinhos
- `/api/reservas` - CRUD de reservas

## Fluxo de Trabalho

1. Executar backend
2. Executar frontend
3. Testar no Postman ou no navegador
4. Verificar logs do backend
5. Debugar se necessário

## Problemas Comuns

### Backend não inicia
- Verifique se Java 17+ está instalado: `java -version`
- Verifique porta 8080 livre
- Limpe cache: `mvn clean`

### Frontend não conecta à API
- Verifique se backend está rodando
- Verifique URL em `src/services/api.js`
- Abra console do navegador (F12)

### Dados não aparecem
- Verifique console do navegador
- Verifique logs do backend
- Verifique H2 Console se dados existem

## Próximos Passos

- [ ] Entender estrutura Java/Maven
- [ ] Entender estrutura React/Vite
- [ ] Testar todos endpoints
- [ ] Adicionar mais validações
- [ ] Implementar autenticação (opcional)
- [ ] Deploy em produção (opcional)

## Recursos

- Backend: [README.md](backend-api/README.md)
- Frontend: [README.md](frontend-web/README.md)
- Casos de Teste: [CASOS_DE_TESTE.md](backend-api/CASOS_DE_TESTE.md)
