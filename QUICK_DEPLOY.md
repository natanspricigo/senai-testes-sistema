# Quick Deploy no Render

Guia rapido para publicar o sistema no Render usando um unico Web Service Docker.

## Deploy com Blueprint

1. Suba o projeto para o GitHub.
2. Acesse https://render.com.
3. Clique em New > Blueprint.
4. Selecione este repositorio.
5. Confirme o arquivo `render.yaml`.
6. Clique em Apply.

O Render cria um servico:

- `senai-testes-sistema`: frontend React + backend Node.js no mesmo Docker.

## URLs

Depois do deploy, use:

- Sistema: `https://senai-testes-sistema.onrender.com`
- API: `https://senai-testes-sistema.onrender.com/api/carrinhos`
- Health check: `https://senai-testes-sistema.onrender.com/actuator/health`

O frontend chama a API por `/api`, no mesmo dominio.

## Observacao

No plano gratuito, o servico pode dormir apos um periodo sem uso. A primeira chamada depois disso pode demorar alguns segundos.
