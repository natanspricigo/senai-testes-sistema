# Deploy no Render

Este projeto usa um unico Web Service Docker no Render para publicar frontend e backend juntos.

## Estrutura publicada

- Backend: `backend-api`, Node.js.
- Frontend: `frontend-web`, React/Vite.
- Deploy: `Dockerfile` da raiz, servindo frontend e API no mesmo dominio.

## Como publicar

1. Envie o repositorio para o GitHub.
2. Entre em https://render.com.
3. Clique em New > Blueprint.
4. Selecione o repositorio.
5. Confirme o arquivo `render.yaml`.
6. Aplique o Blueprint.

Tambem funciona criando manualmente um Web Service Docker apontando para a raiz do repositorio.

## Servico criado

```text
senai-testes-sistema
```

URL esperada:

```text
https://senai-testes-sistema.onrender.com
```

Endpoints uteis:

```text
https://senai-testes-sistema.onrender.com/api/carrinhos
https://senai-testes-sistema.onrender.com/actuator/health
```

## Variaveis

O `render.yaml` configura:

```text
APP_CORS_ALLOWED_ORIGIN_PATTERNS=http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001,https://*.onrender.com
```

No deploy Docker da raiz, o frontend chama a API por `/api`, no mesmo dominio. Nao precisa configurar `VITE_API_URL`.

## Plano gratuito

No plano gratuito, o servico pode dormir quando fica sem trafego. A primeira chamada depois disso pode demorar um pouco, o que e normal para esse tipo de ambiente educacional.
