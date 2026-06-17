-- ============================================================
-- AMA Web System — Seed com dados de demonstração
-- Execute APÓS o schema.sql
-- ============================================================
USE ama_db;

-- Limpa dados anteriores (mantém o admin)
DELETE FROM activities;
DELETE FROM beneficiaries;
DELETE FROM volunteers WHERE id > 0;
ALTER TABLE activities AUTO_INCREMENT = 1;
ALTER TABLE beneficiaries AUTO_INCREMENT = 1;
ALTER TABLE volunteers AUTO_INCREMENT = 1;

-- ============================================================
-- VOLUNTÁRIOS (30 registros)
-- ============================================================
INSERT INTO volunteers (name, email, phone, cpf, address, join_date, status) VALUES
('Maria Silva',          'maria.silva@email.com',      '(47) 99101-0001', '123.456.789-01', 'Rua das Flores, 10, Blumenau',           '2022-01-15', 'ativo'),
('João Santos',          'joao.santos@email.com',      '(47) 99101-0002', '123.456.789-02', 'Av. Brasil, 200, Blumenau',              '2022-02-10', 'ativo'),
('Ana Oliveira',         'ana.oliveira@email.com',     '(47) 99101-0003', '123.456.789-03', 'Rua 7 de Setembro, 45, Blumenau',        '2022-03-05', 'ativo'),
('Carlos Pereira',       'carlos.pereira@email.com',   '(47) 99101-0004', '123.456.789-04', 'Rua XV de Novembro, 88, Blumenau',       '2022-04-20', 'ativo'),
('Fernanda Costa',       'fernanda.costa@email.com',   '(47) 99101-0005', '123.456.789-05', 'Rua Hercílio Luz, 33, Blumenau',         '2022-05-11', 'ativo'),
('Ricardo Almeida',      'ricardo.almeida@email.com',  '(47) 99101-0006', '123.456.789-06', 'Av. Beira Rio, 120, Blumenau',           '2022-06-08', 'ativo'),
('Juliana Martins',      'juliana.martins@email.com',  '(47) 99101-0007', '123.456.789-07', 'Rua Dom Pedro II, 67, Blumenau',         '2022-07-19', 'ativo'),
('Paulo Rodrigues',      'paulo.rodrigues@email.com',  '(47) 99101-0008', '123.456.789-08', 'Rua Nereu Ramos, 15, Blumenau',          '2022-08-03', 'ativo'),
('Camila Ferreira',      'camila.ferreira@email.com',  '(47) 99101-0009', '123.456.789-09', 'Rua Almirante Barroso, 22, Blumenau',    '2022-09-14', 'ativo'),
('Lucas Gomes',          'lucas.gomes@email.com',      '(47) 99101-0010', '123.456.789-10', 'Av. Presidente Vargas, 300, Blumenau',   '2022-10-01', 'ativo'),
('Beatriz Lima',         'beatriz.lima@email.com',     '(47) 99101-0011', '123.456.789-11', 'Rua Floriano Peixoto, 55, Blumenau',     '2022-11-22', 'ativo'),
('Diego Souza',          'diego.souza@email.com',      '(47) 99101-0012', '123.456.789-12', 'Rua Santos Dumont, 77, Blumenau',        '2022-12-10', 'ativo'),
('Larissa Barbosa',      'larissa.barbosa@email.com',  '(47) 99101-0013', '123.456.789-13', 'Rua Joinville, 90, Blumenau',            '2023-01-07', 'ativo'),
('Marcos Carvalho',      'marcos.carvalho@email.com',  '(47) 99101-0014', '123.456.789-14', 'Av. Getúlio Vargas, 140, Blumenau',      '2023-02-18', 'ativo'),
('Patrícia Mendes',      'patricia.mendes@email.com',  '(47) 99101-0015', '123.456.789-15', 'Rua Itajaí, 28, Blumenau',               '2023-03-25', 'ativo'),
('Felipe Nascimento',    'felipe.nascimento@email.com','(47) 99101-0016', '123.456.789-16', 'Rua Gaspar, 11, Blumenau',               '2023-04-12', 'ativo'),
('Vanessa Teixeira',     'vanessa.teixeira@email.com', '(47) 99101-0017', '123.456.789-17', 'Rua Pomerode, 63, Blumenau',             '2023-05-30', 'ativo'),
('Rodrigo Araújo',       'rodrigo.araujo@email.com',   '(47) 99101-0018', '123.456.789-18', 'Av. Castelo Branco, 210, Blumenau',      '2023-06-09', 'ativo'),
('Amanda Cardoso',       'amanda.cardoso@email.com',   '(47) 99101-0019', '123.456.789-19', 'Rua Brusque, 50, Blumenau',              '2023-07-21', 'ativo'),
('Thiago Ribeiro',       'thiago.ribeiro@email.com',   '(47) 99101-0020', '123.456.789-20', 'Rua Indaial, 38, Blumenau',              '2023-08-14', 'ativo'),
('Isabela Cunha',        'isabela.cunha@email.com',     '(47) 99101-0021', '123.456.789-21', 'Rua Timbó, 74, Blumenau',               '2023-09-03', 'ativo'),
('Gabriel Monteiro',     'gabriel.monteiro@email.com', '(47) 99101-0022', '123.456.789-22', 'Rua Apiúna, 19, Blumenau',               '2023-10-17', 'inativo'),
('Natália Freitas',      'natalia.freitas@email.com',  '(47) 99101-0023', '123.456.789-23', 'Rua Ascurra, 82, Blumenau',              '2023-11-06', 'ativo'),
('Leonardo Pinto',       'leonardo.pinto@email.com',   '(47) 99101-0024', '123.456.789-24', 'Rua Rodeio, 47, Blumenau',               '2023-12-20', 'ativo'),
('Priscila Castro',      'priscila.castro@email.com',  '(47) 99101-0025', '123.456.789-25', 'Rua Guabiruba, 93, Blumenau',            '2024-01-11', 'ativo'),
('Eduardo Moreira',      'eduardo.moreira@email.com',  '(47) 99101-0026', '123.456.789-26', 'Av. Sete de Setembro, 160, Blumenau',    '2024-02-28', 'ativo'),
('Aline Batista',        'aline.batista@email.com',    '(47) 99101-0027', '123.456.789-27', 'Rua Luís Delfino, 35, Blumenau',         '2024-03-15', 'ativo'),
('Renato Dias',          'renato.dias@email.com',      '(47) 99101-0028', '123.456.789-28', 'Rua Victor Konder, 58, Blumenau',        '2024-04-07', 'inativo'),
('Simone Nunes',         'simone.nunes@email.com',     '(47) 99101-0029', '123.456.789-29', 'Rua Gustavo Rau, 41, Blumenau',          '2024-05-19', 'ativo'),
('Vinícius Lopes',       'vinicius.lopes@email.com',   '(47) 99101-0030', '123.456.789-30', 'Rua Fritz Muller, 26, Blumenau',         '2024-06-02', 'ativo');

-- ============================================================
-- ANIMAIS (30 registros)
-- ============================================================
INSERT INTO beneficiaries (name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes) VALUES
('Rex',       'Cachorro', 'Vira-lata',        'Macho',            'Médio',   '2022-03-10', 'disponivel',    'Carlos Souza',    '(47) 99201-0001', 'Vacinado e castrado. Encontrado no bairro Garcia'),
('Mel',       'Cachorro', 'Golden Retriever', 'Fêmea',            'Grande',  '2021-07-15', 'adotado',       'Ana Lima',        '(47) 99201-0002', 'Adotada em março de 2024 pela família Lima'),
('Bolinha',   'Gato',     'Persa',            'Macho',            'Pequeno', '2023-01-05', 'disponivel',    NULL,              NULL,              'Encontrado abandonado na Rua das Flores'),
('Luna',      'Cachorro', 'Pinscher',         'Fêmea',            'Pequeno', '2022-11-20', 'em_tratamento', 'Pedro Alves',     '(47) 99201-0003', 'Em recuperação pós-cirurgia de castração'),
('Thor',      'Cachorro', 'Rottweiler',       'Macho',            'Grande',  '2020-05-08', 'disponivel',    NULL,              NULL,              'Resgatado de maus-tratos. Dócil após reabilitação'),
('Mia',       'Gato',     'Siamês',           'Fêmea',            'Pequeno', '2022-09-14', 'adotado',       'Fernanda Costa',  '(47) 99201-0004', 'Adotada em junho de 2024'),
('Pipoca',    'Cachorro', 'Poodle',           'Fêmea',            'Pequeno', '2023-04-22', 'disponivel',    'Josiane Ramos',   '(47) 99201-0005', 'Entregue pela tutora que não pôde mais cuidar'),
('Max',       'Cachorro', 'Labrador',         'Macho',            'Grande',  '2021-02-18', 'adotado',       'Ricardo Mello',   '(47) 99201-0006', 'Adotado em janeiro de 2025'),
('Estrela',   'Cachorro', 'Vira-lata',        'Fêmea',            'Médio',   '2022-06-30', 'disponivel',    NULL,              NULL,              'Resgatada na BR-470. Vacinada'),
('Bob',       'Cachorro', 'Beagle',           'Macho',            'Médio',   '2021-12-03', 'em_tratamento', 'Gustavo Nunes',   '(47) 99201-0007', 'Tratamento de leishmaniose. Boa evolução'),
('Mimi',      'Gato',     'Angorá',           'Fêmea',            'Pequeno', '2023-07-11', 'disponivel',    NULL,              NULL,              'Encontrada em caixa na frente da sede'),
('Hulk',      'Cachorro', 'Pit Bull',         'Macho',            'Grande',  '2020-08-25', 'disponivel',    NULL,              NULL,              'Resgatado de rinha. Reabilitado e sociável'),
('Floquinho', 'Cachorro', 'Lhasa Apso',       'Macho',            'Pequeno', '2022-04-07', 'adotado',       'Beatriz Lemos',   '(47) 99201-0008', 'Adotado em setembro de 2024'),
('Nina',      'Cachorro', 'Cocker Spaniel',   'Fêmea',            'Médio',   '2021-10-19', 'disponivel',    'Vanessa Teixeira','(47) 99201-0009', 'Entregue pela família que mudou para apartamento'),
('Mingau',    'Gato',     'Vira-lata',        'Macho',            'Pequeno', '2023-02-14', 'adotado',       'Larissa Gomes',   '(47) 99201-0010', 'Adotado em julho de 2024'),
('Lobo',      'Cachorro', 'Husky Siberiano',  'Macho',            'Grande',  '2021-01-29', 'disponivel',    NULL,              NULL,              'Entregue pelo tutor. Precisa de espaço grande'),
('Belinha',   'Cachorro', 'Maltês',           'Fêmea',            'Pequeno', '2023-08-05', 'em_tratamento', 'Marcos Freitas',  '(47) 99201-0011', 'Tratamento dermatológico em andamento'),
('Simba',     'Gato',     'Maine Coon',       'Macho',            'Médio',   '2022-12-20', 'disponivel',    NULL,              NULL,              'Abandonado com bilhete. Castrado e vacinado'),
('Duque',     'Cachorro', 'Dachshund',        'Macho',            'Pequeno', '2022-07-16', 'adotado',       'Paulo Cardoso',   '(47) 99201-0012', 'Adotado em outubro de 2024'),
('Princesa',  'Cachorro', 'Shih Tzu',         'Fêmea',            'Pequeno', '2023-05-01', 'disponivel',    'Camila Borges',   '(47) 99201-0013', 'Entregue após nascimento de bebê na família'),
('Fred',      'Cachorro', 'Border Collie',    'Macho',            'Médio',   '2020-11-12', 'disponivel',    NULL,              NULL,              'Resgatado da rua. Muito inteligente e ativo'),
('Gatinha',   'Gato',     'Vira-lata',        'Fêmea',            'Pequeno', '2023-10-08', 'disponivel',    NULL,              NULL,              'Filhote resgatada com a mãe. Vacinada'),
('Capitão',   'Cachorro', 'Pastor Alemão',    'Macho',            'Grande',  '2019-09-03', 'em_tratamento', 'Sônia Pires',     '(47) 99201-0014', 'Cirurgia ortopédica programada para julho/2026'),
('Pingo',     'Cachorro', 'Vira-lata',        'Macho',            'Pequeno', '2023-03-27', 'adotado',       'Diego Souza',     '(47) 99201-0015', 'Adotado em novembro de 2024'),
('Cacau',     'Cachorro', 'Cocker Spaniel',   'Fêmea',            'Médio',   '2022-01-17', 'disponivel',    'Renata Batista',  '(47) 99201-0016', 'Entregue pela tutora. Vacinada em dia'),
('Nemo',      'Gato',     'Bengal',           'Macho',            'Médio',   '2023-06-09', 'disponivel',    NULL,              NULL,              'Encontrado no centro. Chip implantado'),
('Lola',      'Cachorro', 'Dálmata',          'Fêmea',            'Grande',  '2018-04-20', 'obito',         'Eduardo Dias',    '(47) 99201-0017', 'Faleceu em março de 2025. Insuficiência cardíaca'),
('Toby',      'Cachorro', 'Jack Russell',     'Macho',            'Pequeno', '2022-10-31', 'disponivel',    NULL,              NULL,              'Resgatado pelo CRMV. Muito brincalhão'),
('Biscoito',  'Gato',     'Vira-lata',        'Fêmea',            'Pequeno', '2024-02-03', 'em_tratamento', NULL,              NULL,              'Filhote resgatada com infecção respiratória'),
('Zeus',      'Cachorro', 'Dogue Alemão',     'Macho',            'Gigante', '2020-06-14', 'adotado',       'Thiago Ribeiro',  '(47) 99201-0018', 'Adotado em dezembro de 2024 por família com sítio');

-- ============================================================
-- ATIVIDADES (51 registros — ONG de animais)
-- ============================================================
INSERT INTO activities (title, description, activity_date, location, status) VALUES
-- Janeiro 2025
('Feira de Adoção — Janeiro',          'Evento de adoção com cães e gatos disponíveis para novos lares',  '2025-01-11', 'Praça Victor Konder',    'realizada'),
('Campanha de Vacinação Gratuita',     'Vacinação V8/V10 e antirrábica para animais da comunidade',       '2025-01-18', 'Sede da AMA',            'realizada'),
('Reunião de Planejamento Anual 2025', 'Definição de metas, cronograma e captação de recursos para 2025', '2025-01-25', 'Sede da AMA',            'realizada'),
-- Fevereiro 2025
('Banho e Tosa Solidário',             'Serviço gratuito de banho e tosa para animais de tutores carentes','2025-02-08', 'Sede da AMA',            'realizada'),
('Palestra: Guarda Responsável',       'Conscientização sobre cuidados e responsabilidade com pets',       '2025-02-15', 'Escola Municipal Garcia', 'realizada'),
('Campanha de Castração — Fev/2025',   'Cirurgias de castração gratuitas em parceria com clínica veterinária','2025-02-22','Clínica VetCare',       'realizada'),
-- Março 2025
('Feira de Adoção — Março',            'Evento de adoção com animais resgatados em situação de rua',       '2025-03-08', 'Shopping Neumarkt',      'realizada'),
('Arrecadação de Ração e Petiscos',    'Coleta de ração seca e úmida para o estoque do abrigo',            '2025-03-15', 'Pontos de coleta cidade', 'realizada'),
('Visita Veterinária Móvel',           'Atendimento clínico preventivo para animais no abrigo',            '2025-03-22', 'Sede da AMA',            'realizada'),
-- Abril 2025
('Campanha Antirrábica Municipal',     'Vacinação antirrábica em parceria com a Vigilância Sanitária',     '2025-04-05', 'Postos descentralizados','realizada'),
('Bazaar Beneficente — Anim. em Ação', 'Venda de peças artesanais e objetos doados para custeio do abrigo','2025-04-12', 'Sede da AMA',            'realizada'),
('Palestra em Condomínios',            'Conscientização sobre abandono e maus-tratos em condomínios',      '2025-04-26', 'Condomínio Residencial',  'realizada'),
-- Maio 2025
('Feira de Adoção — Maio',             'Evento de adoção com foco em animais há mais de 6 meses no abrigo','2025-05-10', 'Praça Victor Konder',    'realizada'),
('Dia das Mães — Adote um Amigo',      'Campanha especial: adoção com kit boas-vindas para novos tutores', '2025-05-17', 'Sede da AMA',            'realizada'),
('Treinamento de Voluntários',         'Capacitação em manejo seguro, primeiros socorros e bem-estar animal','2025-05-24', 'Sede da AMA',            'realizada'),
-- Junho 2025
('Campanha de Vacinação V10/V4',       'Vacinação polivalente gratuita para cães e gatos cadastrados',     '2025-06-07', 'Sede da AMA',            'realizada'),
('Festa Junina Beneficente',           'Arraiá com renda revertida para custeio de cirurgias no abrigo',   '2025-06-14', 'Sede da AMA',            'realizada'),
('Resgate e Triagem — Operação Rua',   'Operação de resgate de animais em situação de rua na região central','2025-06-21','Centro de Blumenau',     'realizada'),
-- Julho 2025
('Feira de Adoção — Julho',            'Evento especial de adoção no recesso escolar',                     '2025-07-12', 'Parque Ramiro Ruediger', 'realizada'),
('Mutirão de Limpeza do Abrigo',       'Limpeza e reforma do espaço físico do abrigo com voluntários',     '2025-07-19', 'Sede da AMA',            'realizada'),
('Capacitação: Bem-Estar Animal',      'Formação sobre etologia, enriquecimento ambiental e comportamento', '2025-07-26', 'Sede da AMA',            'realizada'),
-- Agosto 2025
('Campanha de Castração — Ago/2025',   'Segunda rodada de cirurgias de castração gratuitas em 2025',       '2025-08-09', 'Clínica VetCare',         'realizada'),
('Dia dos Pais — Adote e Presenteie',  'Campanha: presente ideal é um amigo de quatro patas',              '2025-08-16', 'Shopping Neumarkt',       'realizada'),
('Arrecadação de Ração — Ago',         'Ponto de coleta em pet shops parceiros durante todo o mês',         '2025-08-23', 'Pet shops parceiros',     'realizada'),
-- Setembro 2025
('Feira de Adoção — Setembro',         'Evento de adoção com apoio da Prefeitura de Blumenau',             '2025-09-06', 'Praça Victor Konder',     'realizada'),
('Vacinação e Microchipagem',          'Identificação de animais com microchip e atualização vacinal',     '2025-09-13', 'Sede da AMA',             'realizada'),
('Palestra: Lei de Proteção Animal',   'Informativo sobre a Lei 9.605/98 e direitos dos animais',          '2025-09-20', 'Centro Comunitário',      'realizada'),
-- Outubro 2025
('Feirinha Halloween — Adoção',        'Feira de adoção temática com fantasias para os animais',           '2025-10-25', 'Shopping Neumarkt',       'realizada'),
('Campanha de Castração — Out/2025',   'Terceira rodada de cirurgias de castração gratuitas em 2025',      '2025-10-11', 'Clínica VetCare',         'realizada'),
('Bazaar de Outono',                   'Venda de artigos doados e artesanato para o fundo do abrigo',      '2025-10-18', 'Sede da AMA',             'realizada'),
-- Novembro 2025
('Feira de Adoção — Novembro',         'Evento de adoção com parceria de pet shops e veterinárias locais', '2025-11-08', 'Praça Victor Konder',     'realizada'),
('Palestra: Abandono e Maus-Tratos',   'Ação de conscientização contra abandono em período de festas',     '2025-11-15', 'Escola Estadual Centro',  'realizada'),
('Arrecadação de Cobertores p/ Abrigo','Coleta de cobertores para os animais durante o inverno',           '2025-11-22', 'Pontos de coleta cidade', 'realizada'),
-- Dezembro 2025
('Natal Solidário — Adote e Presenteie','Campanha de adoção: ganhe um kit de boas-vindas ao adotar',       '2025-12-06', 'Shopping Neumarkt',       'realizada'),
('Confraternização de Voluntários',    'Festa de encerramento do ano com reconhecimento dos voluntários',  '2025-12-13', 'Salão Comunitário',       'realizada'),
('Vacinação e Vermifugação de Fim de Ano','Atualização vacinal e vermifugação de todos os animais do abrigo','2025-12-20','Sede da AMA',            'realizada'),
-- Janeiro 2026
('Feira de Adoção — Janeiro 2026',     'Primeiro evento de adoção do ano, com animais resgatados recentes','2026-01-10', 'Praça Victor Konder',     'realizada'),
('Reunião de Planejamento Anual 2026', 'Definição de metas, parcerias e cronograma para 2026',             '2026-01-24', 'Sede da AMA',             'realizada'),
-- Fevereiro 2026
('Banho e Tosa Solidário — Fev/2026',  'Serviço gratuito para animais de tutores de baixa renda',         '2026-02-07', 'Sede da AMA',             'realizada'),
('Campanha de Castração — Fev/2026',   'Cirurgias gratuitas em convênio com médico-veterinário parceiro',  '2026-02-21', 'Clínica VetCare',         'realizada'),
-- Março 2026
('Feira de Adoção — Março 2026',       'Evento de adoção com enfoque em animais idosos e especiais',       '2026-03-14', 'Parque Ramiro Ruediger',  'realizada'),
('Arrecadação de Ração — Mar/2026',    'Coleta de ração em supermercados parceiros durante o mês',         '2026-03-28', 'Supermercados parceiros', 'realizada'),
-- Abril 2026
('Campanha Antirrábica 2026',          'Vacinação antirrábica anual em conjunto com a Vigilância Sanitária','2026-04-04','Postos descentralizados', 'realizada'),
('Bazaar Beneficente — Abr/2026',      'Bazar com peças doadas para arrecadar fundos para o abrigo',       '2026-04-18', 'Sede da AMA',             'realizada'),
-- Maio 2026
('Feira de Adoção — Maio 2026',        'Evento de adoção em comemoração ao Dia do Animal (29/04)',          '2026-05-02', 'Shopping Neumarkt',       'realizada'),
('Campanha de Vacinação V10/V4 2026',  'Vacinação polivalente anual para cães e gatos do abrigo',          '2026-05-16', 'Sede da AMA',             'realizada'),
-- Junho 2026
('Campanha de Castração — Jun/2026',   'Cirurgias de castração gratuitas — inscrições abertas',            '2026-06-06', 'Clínica VetCare',         'realizada'),
('Arrecadação de Ração — Jun/2026',    'Coleta de ração em pet shops parceiros para o mês de julho',       '2026-06-14', 'Pet shops parceiros',     'realizada'),
('Festa Junina Beneficente 2026',      'Arraiá com renda revertida para cirurgias dos animais do abrigo',  '2026-06-20', 'Sede da AMA',             'agendada'),
-- Julho 2026
('Feira de Adoção — Julho 2026',       'Evento de adoção especial nas férias escolares',                   '2026-07-11', 'Parque Ramiro Ruediger',  'agendada'),
('Capacitação de Voluntários 2026',    'Treinamento para novos voluntários: manejo, cuidados e bem-estar', '2026-07-18', 'Sede da AMA',             'agendada'),
('Mutirão de Pintura do Abrigo',       'Reforma e pintura do espaço físico do abrigo com os voluntários',  '2026-07-25', 'Sede da AMA',             'agendada');
