# README - Backend API Carrinhos

## Descrição

API REST para controle de reserva de carrinhos de notebooks em instituição de ensino. Sistema didático para praticar testes de API com Postman e testes de interface.

## Tecnologias

- Java 17
- Spring Boot 3.3.0
- Spring Web
- Spring Data JPA
- H2 Database (em memória)
- Lombok
- Swagger/OpenAPI
- Maven

## Pré-requisitos

- Java 17 instalado
- Maven 3.6+
- Postman (opcional, para testar a API)

## Como executar

### 1. Clonar/extrair o projeto

```bash
cd backend-api
```

### 2. Compilar e executar

```bash
mvn clean install
mvn spring-boot:run
```

Ou execute o JAR diretamente:

```bash
mvn clean package
java -jar target/carrinhos-api-1.0.0.jar
```

A aplicação será iniciada em: `http://localhost:8080`

## Endpoints da API

### Professores

- `POST /api/professores` - Criar professor
- `GET /api/professores` - Listar professores
- `GET /api/professores/{id}` - Obter professor por ID
- `PUT /api/professores/{id}` - Atualizar professor
- `PATCH /api/professores/{id}/inativar` - Inativar professor
- `PATCH /api/professores/{id}/ativar` - Ativar professor

### Carrinhos

- `POST /api/carrinhos` - Criar carrinho
- `GET /api/carrinhos` - Listar carrinhos
- `GET /api/carrinhos/{id}` - Obter carrinho por ID
- `PUT /api/carrinhos/{id}` - Atualizar carrinho
- `PATCH /api/carrinhos/{id}/inativar` - Inativar carrinho
- `PATCH /api/carrinhos/{id}/ativar` - Ativar carrinho

### Reservas

- `POST /api/reservas` - Criar reserva
- `GET /api/reservas` - Listar reservas
- `GET /api/reservas/{id}` - Obter reserva por ID
- `GET /api/reservas?dataUso=YYYY-MM-DD` - Buscar por data
- `GET /api/reservas?professorId=1` - Buscar por professor
- `GET /api/reservas?carrinhoId=1` - Buscar por carrinho
- `PATCH /api/reservas/{id}/cancelar` - Cancelar reserva
- `PATCH /api/reservas/{id}/finalizar` - Finalizar reserva

## Documentação Swagger

Acesse a documentação interativa da API:

`http://localhost:8080/swagger-ui.html`

## Banco de Dados H2

Console H2:

`http://localhost:8080/h2-console`

- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Usuário**: `sa`
- **Senha**: (deixar em branco)

## Dados Iniciais

A aplicação carrega automaticamente dados de teste ao iniciar:

### Professores
- Prof. João Silva (ativo)
- Prof. Maria Santos (ativo)
- Prof. Carlos Oliveira (inativo)

### Carrinhos
- Carrinho 1: 20 notebooks Dell (ativo)
- Carrinho 2: 15 notebooks Lenovo (ativo)
- Carrinho 3: 25 notebooks HP (inativo)
- Carrinho 4: 18 notebooks Positivo (ativo)

### Reservas
- 4 reservas agendadas para praticar testes

## Testando com Postman

1. Importe a collection: `postman/notebook-reservas.postman_collection.json`
2. Altere a base URL se necessário (padrão: `http://localhost:8080`)
3. Execute os testes

## Regras de Negócio

1. Não permitir reservar carrinho inativo
2. Não permitir professor inativo fazer reserva
3. Não permitir reserva com horaFim menor ou igual a horaInicio
4. Não permitir duas reservas para o mesmo carrinho na mesma data com horários conflitantes
5. Permitir cancelar uma reserva apenas se estiver com status AGENDADA
6. Permitir finalizar uma reserva apenas se estiver com status AGENDADA
7. Não excluir fisicamente professor ou carrinho; apenas marcar como inativo

## Estrutura do Projeto

```
backend-api/
├── src/main/java/br/edu/senai/carrinhos/
│   ├── controller/         # Controllers REST
│   ├── service/            # Lógica de negócio
│   ├── repository/         # Acesso a dados
│   ├── entity/             # Entidades JPA
│   ├── dto/                # DTOs (Data Transfer Objects)
│   ├── exception/          # Tratamento de exceções
│   └── config/             # Configurações
├── src/main/resources/
│   ├── application.yml     # Configuração da aplicação
│   └── data.sql            # Dados iniciais
├── postman/
│   └── notebook-reservas.postman_collection.json
├── pom.xml                 # Dependências Maven
└── README.md
```

## Formato de Erros

Todos os erros seguem o padrão:

```json
{
  "timestamp": "2026-05-18T10:00:00",
  "status": 400,
  "erro": "Bad Request",
  "mensagem": "Descrição do erro",
  "path": "/api/reservas"
}
```

## Exemplos de Requisições

### Criar Professor

```bash
curl -X POST http://localhost:8080/api/professores \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Prof. Novo",
    "email": "prof.novo@senai.br"
  }'
```

### Criar Carrinho

```bash
curl -X POST http://localhost:8080/api/carrinhos \
  -H "Content-Type: application/json" \
  -d '{
    "numero": 5,
    "descricao": "Carrinho novo",
    "quantidadeNotebooks": 20,
    "localizacao": "Sala 200"
  }'
```

### Criar Reserva

```bash
curl -X POST http://localhost:8080/api/reservas \
  -H "Content-Type: application/json" \
  -d '{
    "professorId": 1,
    "carrinhoId": 1,
    "dataUso": "2026-06-01",
    "horaInicio": "08:00",
    "horaFim": "10:00",
    "turma": "ADS 5A",
    "observacao": "Aula de testes"
  }'
```

## Troubleshooting

### Porta 8080 já em uso

Altere a porta em `application.yml`:

```yaml
server:
  port: 8081
```

### Erro de conexão com banco

Verifique se o H2 está corretamente configurado no `pom.xml`.

## Próximos Passos

- Testar todos os endpoints com Postman
- Verificar validações
- Testar cenários de erro
- Explorar a documentação Swagger
- Estudar o código-fonte

## Suporte

Para dúvidas ou problemas, consulte o arquivo `CASOS_DE_TESTE.md` com exemplos didáticos.
