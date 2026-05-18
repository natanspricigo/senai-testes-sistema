# Backend API Carrinhos

API REST em Node.js para controle de reserva de carrinhos de notebooks. Ela usa dados em memoria para facilitar uso educacional, testes com Postman e deploy gratuito.

## Tecnologias

- Node.js 20+
- HTTP nativo do Node
- Banco em memoria
- Sem dependencias externas obrigatorias

## Como executar

```bash
cd backend-api
npm install
npm start
```

A API sobe em:

```text
http://localhost:8080
```

Para desenvolvimento com recarregamento automatico:

```bash
npm run dev
```

## Endpoints

Professores:

- `POST /api/professores`
- `GET /api/professores`
- `GET /api/professores/{id}`
- `PUT /api/professores/{id}`
- `PATCH /api/professores/{id}/inativar`
- `PATCH /api/professores/{id}/ativar`

Carrinhos:

- `POST /api/carrinhos`
- `GET /api/carrinhos`
- `GET /api/carrinhos/{id}`
- `PUT /api/carrinhos/{id}`
- `PATCH /api/carrinhos/{id}/inativar`
- `PATCH /api/carrinhos/{id}/ativar`

Reservas:

- `POST /api/reservas`
- `GET /api/reservas`
- `GET /api/reservas/{id}`
- `GET /api/reservas?dataUso=YYYY-MM-DD`
- `GET /api/reservas?professorId=1`
- `GET /api/reservas?carrinhoId=1`
- `PATCH /api/reservas/{id}/cancelar`
- `PATCH /api/reservas/{id}/finalizar`

Saude:

- `GET /actuator/health`

## Dados iniciais

A API inicia sempre com:

- 3 professores.
- 4 carrinhos.
- 4 reservas agendadas.

Como os dados ficam em memoria, qualquer alteracao e perdida quando a API reinicia.

## Regras de negocio

- Email de professor nao pode repetir.
- Numero de carrinho nao pode repetir.
- Professor inativo nao pode criar reserva.
- Carrinho inativo nao pode ser reservado.
- Hora final deve ser maior que hora inicial.
- Nao pode haver conflito de horario para o mesmo carrinho na mesma data.
- Reservas so podem ser canceladas/finalizadas quando estao `AGENDADA`.

## Formato de erro

```json
{
  "mensagem": "Descricao do erro"
}
```

## Exemplos

Criar professor:

```bash
curl -X POST http://localhost:8080/api/professores \
  -H "Content-Type: application/json" \
  -d '{"nome":"Prof. Novo","email":"prof.novo@senai.br"}'
```

Criar carrinho:

```bash
curl -X POST http://localhost:8080/api/carrinhos \
  -H "Content-Type: application/json" \
  -d '{"numero":5,"descricao":"Carrinho novo","quantidadeNotebooks":20,"localizacao":"Sala 200"}'
```

Criar reserva:

```bash
curl -X POST http://localhost:8080/api/reservas \
  -H "Content-Type: application/json" \
  -d '{"professorId":1,"carrinhoId":1,"dataUso":"2026-06-01","horaInicio":"08:00","horaFim":"10:00","turma":"ADS 5A","observacao":"Aula de testes"}'
```
