# README - Frontend Carrinhos

## Descrição

Frontend web em React para o sistema de reserva de carrinhos de notebooks. Interface intuitiva para gerenciar professores, carrinhos e reservas.

## Tecnologias

- React 18.2
- Vite 5.0
- React Router 6.20
- Axios 1.6
- CSS Vanilla

## Pré-requisitos

- Node.js 16+
- npm ou yarn
- Backend API rodando em `http://localhost:8080`

## Como executar

### 1. Instalar dependências

```bash
cd frontend-web
npm install
```

### 2. Executar em desenvolvimento

```bash
npm run dev
```

A aplicação será aberta em: `http://localhost:3000`

### 3. Build para produção

```bash
npm run build
```

Os arquivos serão gerados em `dist/`

## Estrutura do Projeto

```
frontend-web/
├── src/
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.jsx
│   │   ├── Professores.jsx
│   │   ├── Carrinhos.jsx
│   │   ├── Reservas.jsx
│   │   └── DetalhesReserva.jsx
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   └── Card.jsx
│   ├── services/           # Serviços de API
│   │   └── api.js
│   ├── styles/             # Estilos globais
│   │   └── index.css
│   ├── App.jsx             # Componente raiz
│   └── main.jsx            # Ponto de entrada
├── index.html              # HTML principal
├── package.json            # Dependências
├── vite.config.js          # Configuração Vite
└── README.md
```

## Páginas

### Dashboard
- Estatísticas gerais
- Total de carrinhos
- Carrinhos ativos
- Reservas agendadas
- Reservas do dia

### Professores
- Listar professores
- Criar novo professor
- Editar professor
- Ativar/Inativar professor

### Carrinhos
- Listar carrinhos
- Criar novo carrinho
- Editar carrinho
- Ativar/Inativar carrinho

### Reservas
- Listar reservas
- Filtrar por data, professor ou carrinho
- Criar nova reserva
- Cancelar reserva
- Finalizar reserva
- Ver detalhes da reserva

## Integração com API

O serviço `api.js` centraliza todas as chamadas HTTP:

```javascript
import { professorService, carrinhoService, reservaService } from './services/api'

// Exemplos de uso
await professorService.listar()
await carrinhoService.criar(dados)
await reservaService.buscarPorData('2026-05-20')
```

## Validações

O frontend valida:
- Campos obrigatórios
- Formato de email
- Horário final maior que inicial
- Exibe erros da API

## Variáveis de Ambiente

Se precisar alterar a URL da API, edite em `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api'
```

## Troubleshooting

### Erro de CORS
Verifique se o backend está em execução:
```bash
http://localhost:8080
```

### Porta 3000 já em uso
Altere em `vite.config.js`:
```javascript
server: {
  port: 3001
}
```

### Dependências não instaladas
```bash
npm install
# ou
npm ci
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza build localmente

## Próximos Passos

1. Instale as dependências: `npm install`
2. Certifique-se que o backend está rodando
3. Execute: `npm run dev`
4. Acesse: `http://localhost:3000`
5. Teste as funcionalidades

## Suporte

Para dúvidas sobre funcionalidades, consulte o arquivo `CASOS_DE_TESTE.md` no backend.
