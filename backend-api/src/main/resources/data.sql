-- Professores
INSERT INTO professores (nome, email, ativo) VALUES ('Prof. João Silva', 'joao.silva@senai.br', true);
INSERT INTO professores (nome, email, ativo) VALUES ('Prof. Maria Santos', 'maria.santos@senai.br', true);
INSERT INTO professores (nome, email, ativo) VALUES ('Prof. Carlos Oliveira', 'carlos.oliveira@senai.br', false);

-- Carrinhos
INSERT INTO carrinhos (numero, descricao, quantidade_notebooks, localizacao, ativo) VALUES (1, 'Carrinho com 20 notebooks Dell', 20, 'Sala 101', true);
INSERT INTO carrinhos (numero, descricao, quantidade_notebooks, localizacao, ativo) VALUES (2, 'Carrinho com 15 notebooks Lenovo', 15, 'Sala 102', true);
INSERT INTO carrinhos (numero, descricao, quantidade_notebooks, localizacao, ativo) VALUES (3, 'Carrinho com 25 notebooks HP', 25, 'Sala 103', false);
INSERT INTO carrinhos (numero, descricao, quantidade_notebooks, localizacao, ativo) VALUES (4, 'Carrinho com 18 notebooks Positivo', 18, 'Sala 104', true);

-- Reservas
INSERT INTO reservas (professor_id, carrinho_id, data_uso, hora_inicio, hora_fim, turma, observacao, status)
VALUES (1, 1, '2026-05-20', '08:00', '10:00', 'ADS 1A', 'Aula de Teste de Software', 'AGENDADA');

INSERT INTO reservas (professor_id, carrinho_id, data_uso, hora_inicio, hora_fim, turma, observacao, status)
VALUES (1, 1, '2026-05-20', '14:00', '16:00', 'ADS 2A', 'Prática de testes', 'AGENDADA');

INSERT INTO reservas (professor_id, carrinho_id, data_uso, hora_inicio, hora_fim, turma, observacao, status)
VALUES (2, 2, '2026-05-20', '09:00', '11:00', 'ADS 1B', 'Aula de API REST', 'AGENDADA');

INSERT INTO reservas (professor_id, carrinho_id, data_uso, hora_inicio, hora_fim, turma, observacao, status)
VALUES (2, 2, '2026-05-21', '10:00', '12:00', 'ADS 3A', 'Teste com Postman', 'AGENDADA');
