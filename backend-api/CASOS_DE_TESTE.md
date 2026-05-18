# Casos de Teste - Carrinhos API

Documento com exemplos didáticos de casos de teste para a API de reserva de carrinhos. Esses exemplos podem ser executados no Postman ou com curl.

## Exemplo 1: Criar Reserva Válida

**Cenário:** Criar uma reserva válida com dados corretos

**Passos:**
1. Verificar que existe professor ativo (ID 1)
2. Verificar que existe carrinho ativo (ID 1)
3. Enviar POST para `/api/reservas` com dados válidos

**Dados de Entrada:**
```json
{
  "professorId": 1,
  "carrinhoId": 1,
  "dataUso": "2026-06-10",
  "horaInicio": "14:00",
  "horaFim": "16:00",
  "turma": "ADS 1A",
  "observacao": "Aula prática de testes"
}
```

**Resultado Esperado:**
- Status HTTP: **201 Created**
- Resposta contém a reserva criada
- Campo `status` é **AGENDADA**
- Campos `id`, `professor`, `carrinho` preenchidos

**Teste Postman:**
```javascript
pm.test('Status code é 201', function () {
    pm.response.to.have.status(201);
});
pm.test('Status é AGENDADA', function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql('AGENDADA');
});
```

---

## Exemplo 2: Impedir Conflito de Horário

**Cenário:** Tentar criar duas reservas para o mesmo carrinho com horários sobrepostos

**Dados Existentes:**
- Reserva 1: Carrinho 1, 20/05/2026, 08:00-10:00

**Passos:**
1. Criar primeira reserva (08:00-10:00) - deve funcionar
2. Tentar criar segunda reserva (09:00-11:00) - deve falhar com erro de conflito

**Dados de Entrada (Primeira Reserva):**
```json
{
  "professorId": 1,
  "carrinhoId": 1,
  "dataUso": "2026-06-15",
  "horaInicio": "08:00",
  "horaFim": "10:00",
  "turma": "ADS 1B",
  "observacao": "Primeira reserva"
}
```

**Dados de Entrada (Segunda Reserva - Conflitante):**
```json
{
  "professorId": 2,
  "carrinhoId": 1,
  "dataUso": "2026-06-15",
  "horaInicio": "09:00",
  "horaFim": "11:00",
  "turma": "ADS 2A",
  "observacao": "Conflita com primeira"
}
```

**Resultado Esperado:**
- Primeira reserva: Status **201**
- Segunda reserva: Status **400 Bad Request**
- Mensagem: "Existe conflito de horário com outra reserva"

**Teste Postman:**
```javascript
pm.test('Impede conflito de horário', function () {
    pm.response.to.have.status(400);
});
pm.test('Mensagem menciona conflito', function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.mensagem).to.include('conflito');
});
```

---

## Exemplo 3: Validar Campos Obrigatórios

**Cenário:** Enviar cadastro de professor sem dados obrigatórios

**Passos:**
1. Enviar POST sem nome
2. Enviar POST sem email
3. Enviar POST com email inválido

**Dados de Entrada (Faltando Nome):**
```json
{
  "email": "professor@senai.br"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem contém: "Nome é obrigatório"

**Dados de Entrada (Email Inválido):**
```json
{
  "nome": "Prof. Teste",
  "email": "emailinvalido"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem contém: "Email deve ser válido"

---

## Exemplo 4: Não Permitir Professor Inativo Fazer Reserva

**Cenário:** Tentar fazer reserva com professor marcado como inativo

**Dados Existentes:**
- Professor 3 está inativo

**Passos:**
1. Enviar POST `/api/reservas` com professorId=3

**Dados de Entrada:**
```json
{
  "professorId": 3,
  "carrinhoId": 1,
  "dataUso": "2026-06-20",
  "horaInicio": "10:00",
  "horaFim": "12:00",
  "turma": "ADS 3A",
  "observacao": "Com professor inativo"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem: "Professor inativo não pode fazer reserva"

---

## Exemplo 5: Não Permitir Reservar Carrinho Inativo

**Cenário:** Tentar fazer reserva com carrinho marcado como inativo

**Dados Existentes:**
- Carrinho 3 está inativo

**Passos:**
1. Enviar POST `/api/reservas` com carrinhoId=3

**Dados de Entrada:**
```json
{
  "professorId": 1,
  "carrinhoId": 3,
  "dataUso": "2026-06-20",
  "horaInicio": "10:00",
  "horaFim": "12:00",
  "turma": "ADS 4A",
  "observacao": "Com carrinho inativo"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem: "Carrinho inativo não pode ser reservado"

---

## Exemplo 6: Validar Horários

**Cenário:** Hora de fim menor ou igual à hora de início

**Passos:**
1. Enviar reserva com horaFim = horaInicio
2. Enviar reserva com horaFim < horaInicio

**Dados de Entrada (Horários Iguais):**
```json
{
  "professorId": 1,
  "carrinhoId": 1,
  "dataUso": "2026-06-25",
  "horaInicio": "10:00",
  "horaFim": "10:00",
  "turma": "ADS 5A",
  "observacao": "Horas iguais"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem: "Hora de fim deve ser maior que hora de início"

---

## Exemplo 7: Cancelar Reserva

**Cenário:** Cancelar uma reserva com status AGENDADA

**Passos:**
1. Criar uma reserva (status AGENDADA)
2. Enviar PATCH `/api/reservas/{id}/cancelar`

**Resultado Esperado:**
- Status: **200 OK**
- Campo `status` muda para **CANCELADA**
- Reserva não pode ser cancelada novamente

**Teste Postman:**
```javascript
pm.test('Status é 200', function () {
    pm.response.to.have.status(200);
});
pm.test('Reserva foi cancelada', function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql('CANCELADA');
});
```

---

## Exemplo 8: Finalizar Reserva

**Cenário:** Finalizar uma reserva com status AGENDADA

**Passos:**
1. Criar uma reserva (status AGENDADA)
2. Enviar PATCH `/api/reservas/{id}/finalizar`

**Resultado Esperado:**
- Status: **200 OK**
- Campo `status` muda para **FINALIZADA**

---

## Exemplo 9: Não Permitir Cancelar Reserva Finalizada

**Cenário:** Tentar cancelar uma reserva que já foi finalizada

**Passos:**
1. Criar reserva
2. Finalizar reserva (status = FINALIZADA)
3. Tentar cancelar a reserva

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem: "Apenas reservas agendadas podem ser canceladas"

---

## Exemplo 10: Buscar Reservas por Data

**Cenário:** Filtrar reservas por data de uso

**Passos:**
1. Enviar GET `/api/reservas?dataUso=2026-05-20`

**Resultado Esperado:**
- Status: **200 OK**
- Retorna array com todas as reservas da data 2026-05-20
- Se nenhuma reserva, retorna array vazio

---

## Exemplo 11: Buscar Reservas por Professor

**Cenário:** Filtrar reservas de um professor específico

**Passos:**
1. Enviar GET `/api/reservas?professorId=1`

**Resultado Esperado:**
- Status: **200 OK**
- Retorna array com todas as reservas do professor ID 1

---

## Exemplo 12: Buscar Reservas por Carrinho

**Cenário:** Filtrar reservas de um carrinho específico

**Passos:**
1. Enviar GET `/api/reservas?carrinhoId=1`

**Resultado Esperado:**
- Status: **200 OK**
- Retorna array com todas as reservas do carrinho ID 1

---

## Exemplo 13: Inativar Professor

**Cenário:** Desativar um professor

**Passos:**
1. Enviar PATCH `/api/professores/1/inativar`

**Resultado Esperado:**
- Status: **200 OK**
- Campo `ativo` é **false**
- Professor não pode mais fazer reservas

---

## Exemplo 14: Ativar Professor

**Cenário:** Reativar um professor

**Passos:**
1. Enviar PATCH `/api/professores/3/ativar`

**Resultado Esperado:**
- Status: **200 OK**
- Campo `ativo` é **true**
- Professor pode novamente fazer reservas

---

## Exemplo 15: Listar Professores

**Cenário:** Obter lista de todos os professores

**Passos:**
1. Enviar GET `/api/professores`

**Resultado Esperado:**
- Status: **200 OK**
- Retorna array com todos os professores
- Inclui professores ativos e inativos

---

## Exemplo 16: Email Duplicado

**Cenário:** Tentar cadastrar professor com email já existente

**Passos:**
1. Professores existentes têm email único
2. Tentar POST `/api/professores` com email duplicado

**Dados de Entrada:**
```json
{
  "nome": "Prof. Repetido",
  "email": "joao.silva@senai.br"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem: "Email já cadastrado"

---

## Exemplo 17: Carrinho com Número Duplicado

**Cenário:** Tentar cadastrar carrinho com número já existente

**Passos:**
1. Carrinho 1 existe
2. Tentar POST `/api/carrinhos` com numero=1

**Dados de Entrada:**
```json
{
  "numero": 1,
  "descricao": "Carrinho repetido",
  "quantidadeNotebooks": 20,
  "localizacao": "Sala 200"
}
```

**Resultado Esperado:**
- Status: **400 Bad Request**
- Mensagem: "Carrinho com este número já existe"

---

## Checklist de Testes

Use este checklist ao testar a API:

### Professores
- [ ] Criar professor válido (201)
- [ ] Listar professores (200)
- [ ] Obter professor por ID (200)
- [ ] Atualizar professor (200)
- [ ] Inativar professor (200)
- [ ] Ativar professor (200)
- [ ] Tentar criar com email duplicado (400)
- [ ] Tentar criar com email inválido (400)
- [ ] Tentar obter professor inexistente (404)

### Carrinhos
- [ ] Criar carrinho válido (201)
- [ ] Listar carrinhos (200)
- [ ] Obter carrinho por ID (200)
- [ ] Atualizar carrinho (200)
- [ ] Inativar carrinho (200)
- [ ] Ativar carrinho (200)
- [ ] Tentar criar com número duplicado (400)
- [ ] Tentar criar com quantidade inválida (400)

### Reservas
- [ ] Criar reserva válida (201)
- [ ] Listar reservas (200)
- [ ] Obter reserva por ID (200)
- [ ] Cancelar reserva (200)
- [ ] Finalizar reserva (200)
- [ ] Buscar por data (200)
- [ ] Buscar por professor (200)
- [ ] Buscar por carrinho (200)
- [ ] Impedir conflito de horário (400)
- [ ] Impedir com professor inativo (400)
- [ ] Impedir com carrinho inativo (400)
- [ ] Validar horaFim > horaInicio (400)
- [ ] Impedir cancelar reserva não agendada (400)
- [ ] Impedir finalizar reserva não agendada (400)

---

## Dicas para Testes

1. **Use o Postman** para visualizar requisições e respostas
2. **Teste casos de sucesso** e **casos de erro**
3. **Verifique o formato JSON** das respostas
4. **Observe os códigos HTTP** (201, 200, 400, 404, 500)
5. **Leia as mensagens de erro** para entender as regras
6. **Use os dados iniciais** para começar rápido
7. **Inspecione o H2 Console** para ver o estado do banco

---

## Conclusão

Esses casos de teste cobrem as principais funcionalidades da API. Ao testar cada um, você aprende:

- Como funciona uma API REST
- Validação de dados
- Regras de negócio
- Tratamento de erros
- Boas práticas de teste
