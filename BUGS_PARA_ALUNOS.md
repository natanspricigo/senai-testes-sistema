# Atividade - Encontrar e documentar bugs

## Contexto

Voce recebeu um sistema simples de reserva de carrinhos de notebooks.

O sistema possui:

- Cadastro de professores.
- Cadastro de carrinhos.
- Cadastro e consulta de reservas.
- Acoes para ativar/inativar professores e carrinhos.
- Acoes para cancelar/finalizar reservas.

Seu objetivo e testar o sistema, encontrar bugs e documentar os resultados.

## Preparacao

Base da API local:

```text
http://localhost:8080/api
```

Base da API publicada:

```text
https://senai-testes-sistema.onrender.com/api
```

Antes de cada rodada de testes, restaure os dados:

```text
POST /api/reset
```

## Parte 1 - Plano de teste

Crie um plano de teste contendo:

| Campo | O que preencher |
|---|---|
| Objetivo | O que voce quer validar no sistema. |
| Escopo | Quais telas, endpoints ou funcionalidades serao testados. |
| Ambiente | Navegador, API local/publicada, Postman, sistema operacional etc. |
| Criterio de aprovacao | Quando o teste deve ser considerado aprovado. |
| Criterio de reprovacao | Quando o teste deve ser considerado reprovado. |

Exemplo:

| Campo | Exemplo |
|---|---|
| Objetivo | Validar se reservas respeitam disponibilidade de carrinho. |
| Escopo | Tela Reservas e endpoint `POST /reservas`. |
| Ambiente | Chrome, API local, Postman. |
| Criterio de aprovacao | O sistema bloqueia reservas conflitantes. |
| Criterio de reprovacao | O sistema permite duas reservas para o mesmo carrinho no mesmo horario. |

## Parte 2 - Casos de teste

Crie no minimo 8 casos de teste.

Cada caso deve possuir:

| Campo | O que preencher |
|---|---|
| ID | Codigo unico do caso, como CT01, CT02, CT03. |
| Objetivo | O que esta sendo validado. |
| Pre-condicao | Situacao necessaria antes de executar o teste. |
| Dados de entrada | Dados digitados na tela ou enviados no corpo da requisicao. |
| Procedimento | Passo a passo executado. |
| Resultado esperado | Comportamento correto esperado do sistema. |

Modelo:

| ID | Objetivo | Pre-condicao | Dados de entrada | Procedimento | Resultado esperado |
|---|---|---|---|---|---|
| CT01 | Verificar conflito de reserva | Dados restaurados | Carrinho 1, data 2026-05-20, 09:00 as 10:30 | Criar uma nova reserva | Sistema deve bloquear a reserva por conflito de horario |

## Parte 3 - Registro de execucao

Depois de executar os casos de teste, registre o que realmente aconteceu.

Cada execucao deve possuir:

| Campo | O que preencher |
|---|---|
| Caso executado | ID do caso testado. |
| Resultado esperado | Mesmo resultado esperado definido no caso de teste. |
| Resultado obtido | O que o sistema realmente fez. |
| Evidencia | Print, resposta da API, status HTTP ou descricao objetiva. |
| Status | Aprovado ou Reprovado. |

Modelo:

| Caso | Resultado esperado | Resultado obtido | Evidencia | Status |
|---|---|---|---|---|
| CT01 | Bloquear reserva conflitante | Sistema criou a reserva | HTTP 201 com nova reserva | Reprovado |

## Parte 4 - Relatorio de bug

Para cada caso reprovado, crie um relatorio de bug.

Cada bug deve possuir:

| Campo | O que preencher |
|---|---|
| ID do bug | Codigo como BUG01, BUG02, BUG03. |
| Titulo | Resumo curto do problema. |
| Funcionalidade | Tela ou endpoint onde ocorreu. |
| Passos para reproduzir | Passo a passo para encontrar o problema novamente. |
| Resultado esperado | Comportamento correto. |
| Resultado obtido | Comportamento incorreto observado. |
| Evidencia | Print, payload, resposta da API ou status HTTP. |
| Severidade | Baixa, media ou alta. |
| Prioridade | Baixa, media ou alta. |

Modelo:

| Campo | Exemplo |
|---|---|
| ID do bug | BUG01 |
| Titulo | Sistema permite reserva conflitante |
| Funcionalidade | Reservas |
| Passos para reproduzir | Resetar dados; criar reserva para carrinho 1 em 2026-05-20 das 09:00 as 10:30 |
| Resultado esperado | API deve retornar erro informando conflito de horario |
| Resultado obtido | API retorna 201 e cria a reserva |
| Evidencia | Payload enviado e resposta da API |
| Severidade | Alta |
| Prioridade | Alta |

## Cenarios sugeridos para investigacao

Use estes cenarios como ponto de partida. Alguns podem passar e outros podem revelar bugs.

| # | Area | Cenario para testar |
|---|---|---|
| 1 | Professores | Inativar um professor ativo pela tela. |
| 2 | Professores | Tentar criar professor com email ja cadastrado. |
| 3 | Professores | Criar professor com email em maiusculas parecido com um ja existente. |
| 4 | Carrinhos | Inativar um carrinho ativo pela tela ou pela API. |
| 5 | Carrinhos | Criar carrinho com quantidade de notebooks igual a zero. |
| 6 | Carrinhos | Criar carrinho com numero repetido. |
| 7 | Reservas | Criar reserva com professor inativo. |
| 8 | Reservas | Criar reserva com carrinho inativo. |
| 9 | Reservas | Criar reserva em horario conflitante para o mesmo carrinho. |
| 10 | Reservas | Filtrar reservas por professor. |
| 11 | Reservas | Filtrar reservas por carrinho. |
| 12 | Reservas | Criar reserva com hora final menor que hora inicial. |
| 13 | Reservas | Cancelar a mesma reserva duas vezes. |
| 14 | Reservas | Finalizar a mesma reserva duas vezes. |

## Entrega esperada

O aluno deve entregar:

- Plano de teste.
- No minimo 8 casos de teste.
- Registro de execucao preenchido.
- No minimo 4 bugs documentados.
- Evidencias dos bugs encontrados.

## Criterios de avaliacao

| Criterio | O que sera avaliado |
|---|---|
| Organizacao | Documentacao clara e facil de ler. |
| Qualidade dos casos | Casos com objetivo, entrada, procedimento e resultado esperado. |
| Execucao | Registro fiel do que aconteceu no sistema. |
| Analise | Diferenca clara entre resultado esperado e resultado obtido. |
| Evidencias | Prints, payloads ou respostas suficientes para reproduzir o bug. |
| Severidade | Classificacao coerente com o impacto do problema. |
