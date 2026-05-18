# Bugs para os alunos encontrarem

Base da API:

```text
https://senai-testes-sistema.onrender.com/api
```

Antes de cada rodada de testes, restaure os dados:

```text
POST https://senai-testes-sistema.onrender.com/api/reset
```

## Lista de investigacao

| # | Metodo | URL | Cenario para testar | Bug/comportamento suspeito |
|---|---|---|---|---|
| 1 | POST | `/professores` | Criar professor com email em maiusculas: `JOAO.SILVA@senai.br` | A API pode aceitar email duplicado se mudar maiusculas/minusculas. |
| 2 | POST | `/professores` | Criar professor com espacos no email: `" joao.silva@senai.br "` | A API nao normaliza espacos antes de comparar duplicidade. |
| 3 | POST | `/professores` | Criar professor com nome muito curto: `"A"` | Nao ha validacao de tamanho minimo do nome. |
| 4 | PUT | `/professores/999` | Atualizar professor inexistente | Deve retornar 404 com mensagem clara. Verificar se o erro ajuda o usuario. |
| 5 | POST | `/carrinhos` | Criar carrinho com numero decimal: `1.5` | A API aceita numero decimal, mas carrinho deveria ser numero inteiro. |
| 6 | POST | `/carrinhos` | Criar carrinho com descricao muito curta: `"x"` | Nao ha validacao de tamanho minimo da descricao. |
| 7 | POST | `/carrinhos` | Criar carrinho com localizacao vazia ou so espacos | Deve bloquear. Verificar mensagem e status HTTP. |
| 8 | POST | `/reservas` | Criar reserva com data invalida: `"dataUso": "abc"` | A API aceita qualquer texto como data. |
| 9 | POST | `/reservas` | Criar reserva com hora invalida: `"horaInicio": "25:99"` | A API aceita horario fora do formato real. |
| 10 | POST | `/reservas` | Criar reserva com hora sem zero: `"horaInicio": "9:00"` e `"horaFim": "10:00"` | Comparacao de horarios por texto pode gerar resultado incorreto. |
| 11 | POST | `/reservas` | Criar reserva com `professorId` em texto: `"1"` | A API aceita string numerica. Decidir se isso deveria ser permitido. |
| 12 | POST | `/reservas` | Criar reserva com carrinho inativo: `"carrinhoId": 3` | Deve retornar erro de regra de negocio. |
| 13 | POST | `/reservas` | Criar reserva com professor inativo: `"professorId": 3` | Deve retornar erro de regra de negocio. |
| 14 | POST | `/reservas` | Criar reserva conflitante no carrinho 1 em `2026-05-20`, das `09:00` as `10:30` | Deve detectar conflito com reserva existente. |
| 15 | PATCH | `/reservas/1/cancelar` | Cancelar a mesma reserva duas vezes | Segunda tentativa deve retornar erro. |
| 16 | PATCH | `/reservas/2/finalizar` | Finalizar a mesma reserva duas vezes | Segunda tentativa deve retornar erro. |
| 17 | GET | `/reservas?dataUso=abc` | Buscar por data invalida | A API retorna lista vazia em vez de avisar formato invalido. |
| 18 | GET | `/reservas?professorId=abc` | Buscar por professor invalido | A API retorna lista vazia em vez de avisar ID invalido. |
| 19 | GET | `/qualquer-coisa` | Acessar endpoint inexistente | Deve retornar 404 com mensagem clara. |
| 20 | POST | `/reset` | Resetar dados depois de criar/cancelar registros | Verificar se professores, carrinhos e reservas voltam ao estado inicial. |

## Payloads uteis

### Professor com email duplicado em maiusculas

```json
{
  "nome": "Prof. Duplicado",
  "email": "JOAO.SILVA@senai.br"
}
```

### Carrinho com numero decimal

```json
{
  "numero": 1.5,
  "descricao": "Carrinho decimal",
  "quantidadeNotebooks": 10,
  "localizacao": "Sala 999"
}
```

### Reserva com data e horario invalidos

```json
{
  "professorId": 1,
  "carrinhoId": 1,
  "dataUso": "abc",
  "horaInicio": "25:99",
  "horaFim": "26:99",
  "turma": "ADS BUG",
  "observacao": "Teste de formato invalido"
}
```

### Reserva com conflito de horario

```json
{
  "professorId": 1,
  "carrinhoId": 1,
  "dataUso": "2026-05-20",
  "horaInicio": "09:00",
  "horaFim": "10:30",
  "turma": "ADS CONFLITO",
  "observacao": "Deve conflitar com reserva existente"
}
```

## Dica para a aula

Peca para os alunos registrarem para cada bug:

- URL testada.
- Metodo HTTP.
- Body enviado.
- Status retornado.
- Resposta da API.
- Resultado esperado.
- Severidade: baixa, media ou alta.
