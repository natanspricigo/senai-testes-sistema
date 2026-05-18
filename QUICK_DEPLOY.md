# Quick Deploy no Render

Guia rapido para publicar o frontend e o backend no Render.

## Deploy com Blueprint

1. Suba o projeto para o GitHub.
2. Acesse https://render.com.
3. Clique em New > Blueprint.
4. Selecione este repositorio.
5. Confirme o arquivo `render.yaml`.
6. Clique em Apply.

O Render cria dois servicos:

- `senai-testes-api`: backend Node.js.
- `senai-testes-web`: frontend React/Vite.

## URLs

Depois do deploy, use:

- Frontend: `https://senai-testes-web.onrender.com`
- Backend: `https://senai-testes-api.onrender.com`
- Health check: `https://senai-testes-api.onrender.com/actuator/health`
- Health check: `https://senai-testes-api.onrender.com/actuator/health`

O `VITE_API_URL` do frontend e preenchido automaticamente pelo `render.yaml`.

## Observacao

No plano gratuito, o backend pode dormir apos um periodo sem uso. A primeira chamada depois disso pode demorar alguns segundos.
