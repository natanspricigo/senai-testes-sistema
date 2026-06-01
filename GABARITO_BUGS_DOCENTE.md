# Gabarito docente - Bugs intencionais

Este arquivo e para uso do professor. Nao entregue aos alunos antes da atividade.

## Bugs criados no codigo

| ID | Area | Arquivo | Comportamento esperado | Comportamento com bug | Severidade sugerida |
|---|---|---|---|---|---|
| BUG01 | Professores | `frontend-web/src/pages/Professores.jsx` | Ao clicar em Inativar, o professor deve ficar inativo. | O botao chama a rota de ativacao, entao o professor continua ativo. | Media |
| BUG02 | Carrinhos | `backend-api/server.js` | `PATCH /api/carrinhos/:id/inativar` deve marcar o carrinho como inativo. | A API mantem o carrinho como ativo. | Alta |
| BUG03 | Reservas | `backend-api/server.js` | O sistema deve bloquear duas reservas conflitantes para o mesmo carrinho. | A regra compara professor com carrinho e pode permitir conflito real de carrinho. | Alta |
| BUG04 | Reservas | `frontend-web/src/pages/Reservas.jsx` | O filtro por carrinho deve buscar reservas daquele carrinho. | A tela chama o filtro por professor usando o ID do carrinho. | Media |
| BUG05 | Reservas | `frontend-web/src/pages/Reservas.jsx` | Apenas professores ativos devem aparecer no formulario de nova reserva. | Professores inativos tambem aparecem na lista. | Media |

## Como reproduzir

### BUG01 - Inativar professor nao funciona na tela

1. Acesse a tela Professores.
2. Escolha um professor ativo.
3. Clique em Inativar.
4. Observe que o professor continua como Ativo.

Resultado esperado: professor deveria aparecer como Inativo.

### BUG02 - Inativar carrinho nao funciona na API

1. Execute `POST /api/reset`.
2. Execute `PATCH /api/carrinhos/1/inativar`.
3. Execute `GET /api/carrinhos/1`.

Resultado esperado: campo `ativo` deveria ser `false`.

Resultado obtido: campo `ativo` continua `true`.

### BUG03 - Conflito de reserva nao e bloqueado corretamente

1. Execute `POST /api/reset`.
2. Crie uma reserva para o carrinho 1 em `2026-05-20`, das `09:00` as `10:30`, usando `professorId` 2.

Payload:

```json
{
  "professorId": 2,
  "carrinhoId": 1,
  "dataUso": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:30",
  "turma": "ADS BUG",
  "observacao": "Teste de conflito"
}
```

Resultado esperado: API deveria retornar erro de conflito, pois o carrinho 1 ja esta reservado das 08:00 as 10:00.

Resultado obtido: API pode criar a reserva.

### BUG04 - Filtro por carrinho retorna dados incorretos

1. Acesse a tela Reservas.
2. Selecione o filtro Por Carrinho.
3. Escolha Carrinho 1.
4. Clique em Filtrar.

Resultado esperado: listar reservas do carrinho 1.

Resultado obtido: a tela usa o endpoint de professor e pode listar reservas do professor 1.

### BUG05 - Professor inativo aparece em nova reserva

1. Acesse a tela Reservas.
2. Clique em Nova Reserva.
3. Abra a lista de professores.

Resultado esperado: somente professores ativos deveriam aparecer.

Resultado obtido: professores inativos tambem aparecem.

## Observacao para correcao

Depois da atividade, os pontos de correcao principais sao:

- Em `Professores.jsx`, a funcao `inativar` deve chamar `professorService.inativar`.
- Em `server.js`, a inativacao de carrinho deve definir `ativo = false`.
- Em `server.js`, `hasTimeConflict` deve comparar `reserva.carrinhoId` com o carrinho alvo.
- Em `Reservas.jsx`, o filtro por carrinho deve chamar `reservaService.buscarPorCarrinho`.
- Em `Reservas.jsx`, a lista de professores no formulario deve voltar a usar `professores.filter(p => p.ativo)`.
