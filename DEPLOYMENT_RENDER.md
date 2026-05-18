# Deploy no Render

Este projeto usa um Blueprint do Render para publicar backend e frontend juntos.

## Estrutura publicada

- Backend: `backend-api`, Node.js, Web Service Docker.
- Frontend: `frontend-web`, React/Vite, Static Site.

## Como publicar

1. Envie o repositorio para o GitHub.
2. Entre em https://render.com.
3. Clique em New > Blueprint.
4. Selecione o repositorio.
5. Confirme o arquivo `render.yaml`.
6. Aplique o Blueprint.

## Servicos criados

```text
senai-testes-api
senai-testes-web
```

URLs esperadas:

```text
https://senai-testes-api.onrender.com
https://senai-testes-web.onrender.com
```

Endpoints uteis:

```text
https://senai-testes-api.onrender.com/api/carrinhos
https://senai-testes-api.onrender.com/swagger-ui.html
https://senai-testes-api.onrender.com/actuator/health
```

## Variaveis

O `render.yaml` configura:

```text
APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001,https://*.onrender.com
VITE_API_URL=<URL publica do backend>
```

O frontend normaliza `VITE_API_URL`, entao tanto estas duas formas funcionam:

```text
https://senai-testes-api.onrender.com
https://senai-testes-api.onrender.com/api
```

## Plano gratuito

No plano gratuito, o backend pode dormir quando fica sem trafego. A primeira chamada depois disso pode demorar um pouco, o que e normal para esse tipo de ambiente educacional.
