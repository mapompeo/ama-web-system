-- ============================================================
-- AMA Web System — Seed completo com dados realistas
-- PostgreSQL (Supabase / Neon)
-- Execute APÓS o schema.sql
-- ============================================================

-- Limpa dados anteriores (mantém as tabelas)
DELETE FROM animal_records;
DELETE FROM activities;
DELETE FROM beneficiaries;
DELETE FROM volunteers;
DELETE FROM users WHERE email != 'admin@amaong.org';

-- Reset das sequences
ALTER SEQUENCE users_id_seq RESTART WITH 2;
ALTER SEQUENCE volunteers_id_seq RESTART WITH 1;
ALTER SEQUENCE beneficiaries_id_seq RESTART WITH 1;
ALTER SEQUENCE animal_records_id_seq RESTART WITH 1;
ALTER SEQUENCE activities_id_seq RESTART WITH 1;

-- ============================================================
-- USUÁRIOS (além do admin)
-- ============================================================
INSERT INTO users (name, email, password, role) VALUES
('Maria Silva',          'maria.silva@amaong.org',     '$2a$10$iSUU0BoCfwGA.1ENO2cmI.zShzuHKt1AWhHtY5lcmD6BE/1dwzskK', 'volunteer'),
('João Santos',          'joao.santos@amaong.org',     '$2a$10$iSUU0BoCfwGA.1ENO2cmI.zShzuHKt1AWhHtY5lcmD6BE/1dwzskK', 'volunteer'),
('Ana Oliveira',         'ana.oliveira@amaong.org',    '$2a$10$iSUU0BoCfwGA.1ENO2cmI.zShzuHKt1AWhHtY5lcmD6BE/1dwzskK', 'volunteer'),
('Carlos Pereira',       'carlos.pereira@amaong.org',  '$2a$10$iSUU0BoCfwGA.1ENO2cmI.zShzuHKt1AWhHtY5lcmD6BE/1dwzskK', 'volunteer'),
('Fernanda Costa',       'fernanda.costa@amaong.org',  '$2a$10$iSUU0BoCfwGA.1ENO2cmI.zShzuHKt1AWhHtY5lcmD6BE/1dwzskK', 'volunteer'),
('Ricardo Almeida',      'ricardo.almeida@amaong.org', '$2a$10$iSUU0BoCfwGA.1ENO2cmI.zShzuHKt1AWhHtY5lcmD6BE/1dwzskK', 'volunteer')
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- VOLUNTÁRIOS (50 registros)
-- ============================================================
INSERT INTO volunteers (name, email, phone, cpf, address, join_date, status) VALUES
('Maria Silva',          'maria.silva@email.com',       '(47) 99101-0001', '123.456.789-01', 'Rua das Flores, 10, Blumenau',           '2022-01-15', 'ativo'),
('João Santos',          'joao.santos@email.com',       '(47) 99101-0002', '123.456.789-02', 'Av. Brasil, 200, Blumenau',              '2022-02-10', 'ativo'),
('Ana Oliveira',         'ana.oliveira@email.com',      '(47) 99101-0003', '123.456.789-03', 'Rua 7 de Setembro, 45, Blumenau',        '2022-03-05', 'ativo'),
('Carlos Pereira',       'carlos.pereira@email.com',    '(47) 99101-0004', '123.456.789-04', 'Rua XV de Novembro, 88, Blumenau',       '2022-04-20', 'ativo'),
('Fernanda Costa',       'fernanda.costa@email.com',    '(47) 99101-0005', '123.456.789-05', 'Rua Hercílio Luz, 33, Blumenau',         '2022-05-11', 'ativo'),
('Ricardo Almeida',      'ricardo.almeida@email.com',   '(47) 99101-0006', '123.456.789-06', 'Av. Beira Rio, 120, Blumenau',           '2022-06-08', 'ativo'),
('Juliana Martins',      'juliana.martins@email.com',   '(47) 99101-0007', '123.456.789-07', 'Rua Dom Pedro II, 67, Blumenau',         '2022-07-19', 'ativo'),
('Paulo Rodrigues',      'paulo.rodrigues@email.com',   '(47) 99101-0008', '123.456.789-08', 'Rua Nereu Ramos, 15, Blumenau',          '2022-08-03', 'ativo'),
('Camila Ferreira',      'camila.ferreira@email.com',   '(47) 99101-0009', '123.456.789-09', 'Rua Almirante Barroso, 22, Blumenau',    '2022-09-14', 'ativo'),
('Lucas Gomes',          'lucas.gomes@email.com',       '(47) 99101-0010', '123.456.789-10', 'Av. Presidente Vargas, 300, Blumenau',   '2022-10-01', 'ativo'),
('Beatriz Lima',         'beatriz.lima@email.com',      '(47) 99101-0011', '123.456.789-11', 'Rua Floriano Peixoto, 55, Blumenau',    '2022-11-22', 'ativo'),
('Diego Souza',          'diego.souza@email.com',       '(47) 99101-0012', '123.456.789-12', 'Rua Santos Dumont, 77, Blumenau',       '2022-12-10', 'ativo'),
('Larissa Barbosa',      'larissa.barbosa@email.com',   '(47) 99101-0013', '123.456.789-13', 'Rua Joinville, 90, Blumenau',           '2023-01-07', 'ativo'),
('Marcos Carvalho',      'marcos.carvalho@email.com',   '(47) 99101-0014', '123.456.789-14', 'Av. Getúlio Vargas, 140, Blumenau',     '2023-02-18', 'ativo'),
('Patrícia Mendes',      'patricia.mendes@email.com',   '(47) 99101-0015', '123.456.789-15', 'Rua Itajaí, 28, Blumenau',              '2023-03-25', 'ativo'),
('Felipe Nascimento',    'felipe.nascimento@email.com', '(47) 99101-0016', '123.456.789-16', 'Rua Gaspar, 11, Blumenau',              '2023-04-12', 'ativo'),
('Vanessa Teixeira',     'vanessa.teixeira@email.com',  '(47) 99101-0017', '123.456.789-17', 'Rua Pomerode, 63, Blumenau',            '2023-05-30', 'ativo'),
('Rodrigo Araújo',       'rodrigo.araujo@email.com',    '(47) 99101-0018', '123.456.789-18', 'Av. Castelo Branco, 210, Blumenau',     '2023-06-09', 'ativo'),
('Amanda Cardoso',       'amanda.cardoso@email.com',    '(47) 99101-0019', '123.456.789-19', 'Rua Brusque, 50, Blumenau',             '2023-07-21', 'ativo'),
('Thiago Ribeiro',       'thiago.ribeiro@email.com',    '(47) 99101-0020', '123.456.789-20', 'Rua Indaial, 38, Blumenau',             '2023-08-14', 'ativo'),
('Isabela Cunha',        'isabela.cunha@email.com',     '(47) 99101-0021', '123.456.789-21', 'Rua Timbó, 74, Blumenau',              '2023-09-03', 'ativo'),
('Gabriel Monteiro',     'gabriel.monteiro@email.com',  '(47) 99101-0022', '123.456.789-22', 'Rua Apiúna, 19, Blumenau',              '2023-10-17', 'inativo'),
('Natália Freitas',      'natalia.freitas@email.com',   '(47) 99101-0023', '123.456.789-23', 'Rua Ascurra, 82, Blumenau',             '2023-11-06', 'ativo'),
('Leonardo Pinto',       'leonardo.pinto@email.com',    '(47) 99101-0024', '123.456.789-24', 'Rua Rodeio, 47, Blumenau',              '2023-12-20', 'ativo'),
('Priscila Castro',      'priscila.castro@email.com',   '(47) 99101-0025', '123.456.789-25', 'Rua Guabiruba, 93, Blumenau',           '2024-01-11', 'ativo'),
('Eduardo Moreira',      'eduardo.moreira@email.com',   '(47) 99101-0026', '123.456.789-26', 'Av. Sete de Setembro, 160, Blumenau',   '2024-02-28', 'ativo'),
('Aline Batista',        'aline.batista@email.com',     '(47) 99101-0027', '123.456.789-27', 'Rua Luís Delfino, 35, Blumenau',        '2024-03-15', 'ativo'),
('Renato Dias',          'renato.dias@email.com',       '(47) 99101-0028', '123.456.789-28', 'Rua Victor Konder, 58, Blumenau',       '2024-04-07', 'inativo'),
('Simone Nunes',         'simone.nunes@email.com',      '(47) 99101-0029', '123.456.789-29', 'Rua Gustavo Rau, 41, Blumenau',         '2024-05-19', 'ativo'),
('Vinícius Lopes',       'vinicius.lopes@email.com',    '(47) 99101-0030', '123.456.789-30', 'Rua Fritz Muller, 26, Blumenau',        '2024-06-02', 'ativo'),
('Tatiana Barbosa',      'tatiana.barbosa@email.com',   '(47) 99101-0031', '123.456.789-31', 'Rua São Paulo, 112, Blumenau',          '2024-07-14', 'ativo'),
('André Luiz Campos',    'andre.campos@email.com',      '(47) 99101-0032', '123.456.789-32', 'Rua Bahia, 54, Blumenau',               '2024-08-21', 'ativo'),
('Carolina Dias',        'carolina.dias@email.com',     '(47) 99101-0033', '123.456.789-33', 'Rua Paraíba, 77, Blumenau',             '2024-09-09', 'ativo'),
('Bruno Oliveira',       'bruno.oliveira@email.com',    '(47) 99101-0034', '123.456.789-34', 'Rua Ceará, 33, Blumenau',               '2024-10-18', 'ativo'),
('Letícia Rocha',        'leticia.rocha@email.com',     '(47) 99101-0035', '123.456.789-35', 'Rua Maranhão, 21, Blumenau',            '2024-11-05', 'inativo'),
('Rafael Martins',       'rafael.martins@email.com',    '(47) 99101-0036', '123.456.789-36', 'Av. Rio Branco, 180, Blumenau',         '2025-01-10', 'ativo'),
('Jéssica Correia',      'jessica.correia@email.com',   '(47) 99101-0037', '123.456.789-37', 'Rua Paraná, 66, Blumenau',             '2025-01-22', 'ativo'),
('Gustavo Henrique',     'gustavo.h@email.com',         '(47) 99101-0038', '123.456.789-38', 'Rua Santa Catarina, 44, Blumenau',      '2025-02-03', 'ativo'),
('Luciana Torres',       'luciana.torres@email.com',    '(47) 99101-0039', '123.456.789-39', 'Rua Minas Gerais, 88, Blumenau',        '2025-02-19', 'ativo'),
('Fábio Azevedo',        'fabio.azevedo@email.com',     '(47) 99101-0040', '123.456.789-40', 'Rua Rio de Janeiro, 55, Blumenau',      '2025-03-07', 'ativo'),
('Mariana Santana',      'mariana.santana@email.com',   '(47) 99101-0041', '123.456.789-41', 'Rua Espírito Santo, 29, Blumenau',      '2025-03-20', 'ativo'),
('Roberto Carlos',       'roberto.carlos@email.com',    '(47) 99101-0042', '123.456.789-42', 'Rua Amazonas, 150, Blumenau',           '2025-04-01', 'ativo'),
('Daniela Rangel',       'daniela.rangel@email.com',    '(47) 99101-0043', '123.456.789-43', 'Rua Goiás, 72, Blumenau',               '2025-04-15', 'inativo'),
('Pedro Augusto',        'pedro.augusto@email.com',     '(47) 99101-0044', '123.456.789-44', 'Rua Rio Grande, 38, Blumenau',          '2025-05-02', 'ativo'),
('Cristiane Barbosa',    'cristiane.b@email.com',       '(47) 99101-0045', '123.456.789-45', 'Rua Alagoas, 91, Blumenau',             '2025-05-18', 'ativo'),
('Alexandre Pires',      'alexandre.pires@email.com',   '(47) 99101-0046', '123.456.789-46', 'Av. Central, 250, Blumenau',            '2025-06-01', 'ativo'),
('Jaqueline Freitas',    'jaqueline.f@email.com',       '(47) 99101-0047', '123.456.789-47', 'Rua Piauí, 17, Blumenau',               '2025-06-10', 'ativo'),
('Maurício Duarte',      'mauricio.duarte@email.com',   '(47) 99101-0048', '123.456.789-48', 'Rua Sergipe, 63, Blumenau',             '2025-06-22', 'ativo'),
('Sandra Vieira',        'sandra.vieira@email.com',     '(47) 99101-0049', '123.456.789-49', 'Rua Rondônia, 42, Blumenau',            '2025-07-05', 'ativo'),
('Otávio Nunes',         'otavio.nunes@email.com',      '(47) 99101-0050', '123.456.789-50', 'Rua Tocantins, 85, Blumenau',           '2025-07-15', 'ativo');

-- ============================================================
-- ANIMAIS (50 registros)
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
('Zeus',      'Cachorro', 'Dogue Alemão',     'Macho',            'Gigante', '2020-06-14', 'adotado',       'Thiago Ribeiro',  '(47) 99201-0018', 'Adotado em dezembro de 2024 por família com sítio'),
('Amora',     'Cachorro', 'Golden Retriever', 'Fêmea',            'Médio',   '2021-08-22', 'disponivel',    NULL,              NULL,              'Resgatada de canil clandestino. Muito dócil'),
('Chico',     'Cachorro', 'Vira-lata',        'Macho',            'Médio',   '2023-11-14', 'em_tratamento', 'Dona Rosa',       '(47) 99201-0019', 'Atropelado. Fratura na pata direita. Em recuperação'),
('Lila',      'Gato',     'Siamês',           'Fêmea',            'Pequeno', '2023-12-01', 'disponivel',    NULL,              NULL,              'Filhote de ninhada resgatada. Vacinada e castrada'),
('Bruce',     'Cachorro', 'Staffordshire',    'Macho',            'Grande',  '2019-04-10', 'disponivel',    NULL,              NULL,              'Resgatado de abandono. Ama brincar de bolinha'),
('Pituca',    'Gato',     'Vira-lata',        'Fêmea',            'Pequeno', '2024-05-20', 'disponivel',    NULL,              NULL,              'Mamãe gatinha resgatada com 4 filhotes. Todos saudáveis'),
('Toddy',     'Cachorro', 'Vira-lata',        'Macho',            'Médio',   '2022-08-12', 'adotado',       'Carla Dias',      '(47) 99201-0020', 'Adotado em maio de 2025 como cão de terapia'),
('Jade',      'Gato',     'Persa',            'Fêmea',            'Pequeno', '2021-05-08', 'disponivel',    NULL,              NULL,              'Idosa. 5 anos. Precisa de lar tranquilo sem crianças'),
('Fumaça',    'Cachorro', 'Vira-lata',        'Macho',            'Pequeno', '2024-01-15', 'disponivel',    NULL,              NULL,              'Filhote encontrado dentro de um saco. Supera ativo'),
('Costelinha','Cachorro', 'Caramelo',         'Macho',            'Médio',   '2020-12-03', 'disponivel',    NULL,              NULL,              'Vira-lata caramelo clássico. Companheiro fiel'),
('Paçoca',    'Gato',     'Vira-lata',        'Macho',            'Pequeno', '2024-03-10', 'disponivel',    NULL,              NULL,              'Gatinho laranja resgatado filhote. Brincalhão'),
('Bela',      'Cachorro', 'SRD',              'Fêmea',            'Grande',  '2023-06-18', 'em_tratamento', 'Associação Zoonose','(47) 99201-0021','Erliquiose. Fazendo tratamento com antibióticos'),
('Teca',      'Cachorro', 'Beagle',           'Fêmea',            'Médio',   '2022-02-28', 'disponivel',    'Marina Farias',   '(47) 99201-0022', 'Entregue por tutora idosa que foi para o asilo'),
('Dante',     'Cachorro', 'Labrador',         'Macho',            'Grande',  '2021-11-09', 'disponivel',    NULL,              NULL,              'Mansinho e educado. Sabe comandos básicos'),
('Safira',    'Gato',     'Angorá',           'Fêmea',            'Pequeno', '2022-04-03', 'adotado',       'Luciana Rocha',   '(47) 99201-0023', 'Adotada em fevereiro de 2025'),
('Bento',     'Cachorro', 'Basset Hound',     'Macho',            'Médio',   '2021-09-17', 'disponivel',    NULL,              NULL,              'Resgatado de canil. Muito amigável e preguiçoso'),
('Kiara',     'Cachorro', 'Pastor Belga',     'Fêmea',            'Grande',  '2020-07-25', 'obito',         'Clínica VetPlus', '(47) 99201-0024', 'Faleceu durante cirurgia de emergência em abril/2025'),
('Puff',      'Gato',     'Maine Coon',       'Macho',            'Grande',  '2022-10-05', 'disponivel',    NULL,              NULL,              'Enorme e peludo. Muito carinhoso. 8kg'),
('Melissa',   'Cachorro', 'Shih Tzu',         'Fêmea',            'Pequeno', '2023-09-12', 'adotado',       'Sofia Martins',   '(47) 99201-0025', 'Adotada em junho de 2025 por família de idosos'),
('Jack',      'Cachorro', 'Border Collie',    'Macho',            'Médio',   '2019-03-01', 'disponivel',    NULL,              NULL,              'Muito inteligente. Precisa de espaço e estímulos'),
('Pretinha',  'Gato',     'Vira-lata',        'Fêmea',            'Pequeno', '2024-07-30', 'disponivel',    NULL,              NULL,              'Pretinha filhote resgatada do telhado da sede');

-- ============================================================
-- HISTÓRICO / REGISTROS POR ANIMAL (60+ registros)
-- ============================================================
INSERT INTO animal_records (animal_id, title, description, record_date) VALUES
-- Rex (1)
(1,  'Vacinação V10',              'Primeira dose da vacina V10 aplicada',                                     '2022-04-10'),
(1,  'Castração',                  'Cirurgia de castração realizada com sucesso',                              '2022-05-20'),
(1,  'Vermifugação',               'Vermífugo oral administrado',                                             '2023-01-15'),
(1,  'Check-up geral',             'Exame clínico geral. Tudo normal.',                                       '2024-06-01'),
(1,  'Vacinação antirrábica',       'Dose anual de vacina antirrábica aplicada',                              '2024-06-01'),
(1,  'Avaliação comportamento',     'Avaliado como dócil e sociável. Pronto para adoção.',                   '2025-02-10'),

-- Mel (2)
(2,  'Vacinação V8',               'Vacina V8 aplicada na data',                                              '2021-08-20'),
(2,  'Castração',                  'Castração realizada',                                                     '2022-01-10'),
(2,  'Registro de adoção',          'Adotada pela família Lima. Ótimo lar.',                                  '2024-03-15'),

-- Bolinha (3)
(3,  'Resgate',                    'Encontrado abandonado na Rua das Flores',                                 '2023-01-06'),
(3,  'Tratamento dermatológico',    'Sarna detectada. Tratamento com medicamento tópico.',                     '2023-01-20'),
(3,  'Vacinação V4',               'Vacina V4 aplicada',                                                      '2023-03-01'),
(3,  'Castração',                  'Castrado em mutirão de castração',                                        '2023-04-15'),
(3,  'Alta dermatológica',          'Pele completamente recuperada. Sem sinais de sarna.',                     '2023-05-01'),

-- Luna (4)
(4,  'Cirurgia castração',          'Castração cirúrgica realizada. Em recuperação.',                          '2025-05-10'),
(4,  'Pós-operatório',             'Acompanhamento pós-cirúrgico. Cicatrização normal.',                      '2025-05-17'),

-- Thor (5)
(5,  'Resgate',                    'Resgatado de situação de maus-tratos. Magro e assustado.',                '2021-06-01'),
(5,  'Reabilitação comportamental', 'Início do processo de reabilitação com adestrador voluntário.',          '2021-07-01'),
(5,  'Vacinação completa',          'Esquema vacinal completo aplicado',                                     '2021-08-15'),
(5,  'Castração',                  'Castrado',                                                                '2021-09-10'),
(5,  'Avaliação temperamento',      'Dócil e brincalhão. Evolução excelente.',                               '2022-01-15'),

-- Mia (6)
(6,  'Resgate',                    'Resgatada filhote na rua',                                                '2022-10-01'),
(6,  'Vacinação',                  'Vacinas aplicadas',                                                       '2022-11-10'),
(6,  'Castração',                  'Castrada',                                                                '2023-02-20'),
(6,  'Adoção',                     'Adotada pela família Costa',                                              '2024-06-01'),

-- Pipoca (7)
(7,  'Entrega',                    'Entregue pela tutora que mudou de cidade',                                '2023-04-23'),
(7,  'Vacinação',                  'Vacinas atualizadas',                                                     '2023-05-01'),
(7,  'Tosa',                       'Tosa higiênica realizada na sede',                                       '2024-12-01'),

-- Estrela (9)
(9,  'Resgate',                    'Resgatada na BR-470, assustada e suja',                                  '2022-07-01'),
(9,  'Vacinação V10',              'Vacina V10 aplicada',                                                    '2022-08-01'),
(9,  'Castração',                  'Castrada',                                                                '2022-09-10'),

-- Bob (10)
(10, 'Diagnóstico leishmaniose',    'Teste rápido positivo para leishmaniose',                                '2024-03-01'),
(10, 'Início tratamento',           'Protocolo de tratamento com Milteforan iniciado',                        '2024-03-10'),
(10, 'Exame de controle',           'Carga parasitária reduzida. Boa resposta ao tratamento.',                 '2024-06-01'),
(10, 'Acompanhamento',             'Continuando tratamento. Sem sintomas clínicos.',                          '2025-01-10'),

-- Hulk (12)
(12, 'Resgate',                    'Resgatado de rinha de cães. Ferimentos múltiplos.',                       '2021-09-15'),
(12, 'Tratamento ferimentos',       'Curativos e medicação para os ferimentos',                               '2021-09-16'),
(12, 'Reabilitação',               'Iniciou processo de socialização com outros cães',                        '2022-01-10'),
(12, 'Avaliação comportamento',     'Totalmente reabilitado. Sociável com humanos e outros animais.',          '2023-06-01'),

-- Capitão (23)
(23, 'Diagnóstico displasia',       'Diagnosticado com displasia coxofemoral bilateral',                      '2024-01-15'),
(23, 'Fisioterapia',               'Sessões de fisioterapia aquática iniciadas',                              '2024-02-01'),
(23, 'Cirurgia ortopédica',        'Cirurgia de correção programada',                                        '2026-07-15'),

-- Belinha (17)
(17, 'Diagnóstico dermatite',       'Dermatite alérgica diagnosticada',                                       '2024-01-20'),
(17, 'Início tratamento',           'Medicação e shampoo terapêutico prescritos',                             '2024-01-25'),
(17, 'Retorno',                    'Melhora parcial. Ajuste na medicação.',                                  '2024-03-01'),

-- Nemo (26)
(26, 'Resgate',                    'Encontrado no centro. Chip identificado.',                               '2023-06-10'),
(26, 'Consulta veterinária',        'Check-up geral. Saudável.',                                              '2023-06-15'),
(26, 'Vacinação',                  'Vacinas aplicadas',                                                       '2023-07-01'),

-- Biscoito (29)
(29, 'Resgate',                    'Resgatada filhote com infecção respiratória',                             '2024-02-05'),
(29, 'Tratamento respiratório',     'Antibióticos e nebulização. Evoluindo bem.',                             '2024-02-06'),
(29, 'Alta médica',                'Completamente recuperada. Brincalhona e saudável.',                      '2024-03-01'),

-- Amora (31)
(31, 'Resgate',                    'Resgatada de canil clandestino com outros 12 cães',                       '2022-09-01'),
(31, 'Vacinação',                  'Esquema vacinal completo',                                                '2022-10-01'),
(31, 'Castração',                  'Castrada',                                                                '2022-11-15'),
(31, 'Avaliação temperamento',      'Muito dócil. Ótima com crianças.',                                       '2023-03-01'),

-- Chico (32)
(32, 'Acidente',                   'Atropelado. Fratura exposta na pata traseira direita',                    '2025-06-10'),
(32, 'Cirurgia emergencial',        'Cirurgia de estabilização da fratura. Pinagem.',                          '2025-06-10'),
(32, 'Pós-operatório',             'Recuperação cirúrgica progredindo bem. Repouso absoluto.',                 '2025-06-17'),

-- Fumaça (38)
(38, 'Resgate',                    'Encontrado dentro de um saco plástico no parque',                        '2024-01-16'),
(38, 'Vacinação filhote',           'Primeira dose V8',                                                       '2024-02-20'),
(38, 'Vermifugação',               'Vermífugo administrado',                                                 '2024-01-20'),

-- Lola (27)
(27, 'Óbito',                      'Faleceu por insuficiência cardíaca congestiva',                          '2025-03-20'),

-- Kiara (45)
(45, 'Cirurgia emergencial',        'Cirurgia de emergência para torção gástrica',                            '2025-04-10'),
(45, 'Óbito',                      'Faleceu durante o procedimento cirúrgico',                               '2025-04-10'),

-- Bela (41)
(41, 'Diagnóstico erliquiose',      'Teste positivo para Erliquiose canina',                                 '2025-05-20'),
(41, 'Tratamento',                 'Doxiciclina por 28 dias. Acompanhamento.',                                '2025-05-22'),
(41, 'Exame controle',             'Melhora significativa. Mantendo tratamento.',                            '2025-06-15'),

-- Toby (28)
(28, 'Resgate',                    'Resgatado pelo CRMV. Achado na rua.',                                    '2023-11-01'),
(28, 'Vacinação',                  'Vacinas atualizadas',                                                    '2023-12-01'),
(28, 'Castração',                  'Castrado',                                                                '2024-01-15'),

-- Princesa (20)
(20, 'Entrega',                    'Entregue pela família após nascimento de bebê',                           '2024-06-01'),
(20, 'Vacinação',                  'Vacinas em dia',                                                          '2024-06-15'),

-- Bruce (34)
(34, 'Resgate',                    'Resgatado abandonado em terreno baldio',                                 '2020-05-01'),
(34, 'Vacinação',                  'Vacinas aplicadas',                                                       '2020-06-01'),
(34, 'Castração',                  'Castrado',                                                                '2020-07-01'),
(34, 'Avaliação',                  'Cão exemplar. Comportamento equilibrado.',                               '2021-01-15'),

-- Bento (44)
(44, 'Resgate',                    'Resgatado de canil particular com 8 outros cães.',                        '2023-01-10'),
(44, 'Vacinação',                  'Vacinas atualizadas',                                                     '2023-02-01'),
(44, 'Castração',                  'Castrado',                                                                '2023-03-10'),

-- Jade (37)
(37, 'Resgate',                    'Entregue por tutora que faleceu',                                        '2024-12-01'),
(37, 'Avaliação idoso',            'Exame geriátrico. Saudável para a idade.',                                '2024-12-15'),

-- Jack (48)
(48, 'Resgate',                    'Entregue por tutor que se mudou para o exterior',                         '2024-03-01'),
(48, 'Vacinação',                  'Vacinas em dia',                                                          '2024-03-15'),
(48, 'Avaliação comportamento',     'Altamente inteligente. Precisa de adestramento e atividades.',           '2024-04-01'),

-- Fred (21)
(21, 'Resgate',                    'Resgatado da rua. Machucado e assustado',                                '2021-05-01'),
(21, 'Vacinação',                  'Vacinas aplicadas',                                                       '2021-06-01'),
(21, 'Castração',                  'Castrado',                                                                '2021-07-01'),
(21, 'Adestramento',               'Treinamento de obediência básica concluído',                              '2022-01-10');

-- ============================================================
-- ATIVIDADES (80 registros — ONG de animais)
-- ============================================================
INSERT INTO activities (title, description, activity_date, location, status) VALUES
-- 2024 (retrospectiva)
('Feira de Adoção Especial de Natal',   'Evento natalino de adoção com decoração temática',                 '2024-12-14', 'Shopping Neumarkt',       'realizada'),
('Campanha de Vacinação de Dezembro',   'Vacinação V10 e antirrábica para animais cadastrados',              '2024-12-21', 'Sede da AMA',             'realizada'),
('Bazar Beneficente de Natal',          'Bazar com itens doados para arrecadar fundos',                      '2024-12-22', 'Sede da AMA',             'realizada'),

-- Janeiro 2025
('Feira de Adoção — Janeiro',          'Evento de adoção com cães e gatos disponíveis para novos lares',    '2025-01-11', 'Praça Victor Konder',     'realizada'),
('Campanha de Vacinação Gratuita',     'Vacinação V8/V10 e antirrábica para animais da comunidade',          '2025-01-18', 'Sede da AMA',             'realizada'),
('Reunião de Planejamento Anual 2025', 'Definição de metas, cronograma e captação de recursos para 2025',   '2025-01-25', 'Sede da AMA',             'realizada'),

-- Fevereiro 2025
('Banho e Tosa Solidário',             'Serviço gratuito de banho e tosa para animais de tutores carentes', '2025-02-08', 'Sede da AMA',             'realizada'),
('Palestra: Guarda Responsável',       'Conscientização sobre cuidados e responsabilidade com pets',        '2025-02-15', 'Escola Municipal Garcia', 'realizada'),
('Campanha de Castração — Fev/2025',   'Cirurgias de castração gratuitas em parceria com clínica veterinária','2025-02-22','Clínica VetCare',         'realizada'),

-- Março 2025
('Feira de Adoção — Março',            'Evento de adoção com animais resgatados em situação de rua',        '2025-03-08', 'Shopping Neumarkt',       'realizada'),
('Arrecadação de Ração e Petiscos',    'Coleta de ração seca e úmida para o estoque do abrigo',             '2025-03-15', 'Pontos de coleta cidade', 'realizada'),
('Mutirão de Limpeza do Abrigo',       'Limpeza geral e desinfecção do espaço do abrigo',                   '2025-03-22', 'Sede da AMA',             'realizada'),

-- Abril 2025
('Campanha Antirrábica Municipal',     'Vacinação antirrábica em parceria com a Vigilância Sanitária',       '2025-04-05', 'Postos descentralizados', 'realizada'),
('Bazaar Beneficente — Animais em Ação','Venda de peças artesanais e objetos doados para custeio do abrigo','2025-04-12', 'Sede da AMA',             'realizada'),
('Palestra em Condomínios',            'Conscientização sobre abandono e maus-tratos em condomínios',        '2025-04-26', 'Condomínio Residencial',  'realizada'),

-- Maio 2025
('Feira de Adoção — Maio',             'Evento de adoção com foco em animais há mais de 6 meses no abrigo','2025-05-10', 'Praça Victor Konder',     'realizada'),
('Dia das Mães — Adote um Amigo',      'Campanha especial: adoção com kit boas-vindas para novos tutores',  '2025-05-17', 'Sede da AMA',             'realizada'),
('Treinamento de Voluntários',         'Capacitação em manejo seguro, primeiros socorros e bem-estar animal','2025-05-24', 'Sede da AMA',             'realizada'),

-- Junho 2025
('Campanha de Vacinação V10/V4',       'Vacinação polivalente gratuita para cães e gatos cadastrados',      '2025-06-07', 'Sede da AMA',             'realizada'),
('Festa Junina Beneficente',           'Arraiá com renda revertida para custeio de cirurgias no abrigo',    '2025-06-14', 'Sede da AMA',             'realizada'),
('Resgate e Triagem — Operação Rua',   'Operação de resgate de animais em situação de rua na região central','2025-06-21','Centro de Blumenau',       'realizada'),
('Dia do Voluntário',                  'Homenagem aos voluntários com café da manhã e dinâmica de grupo',   '2025-06-28', 'Sede da AMA',             'realizada'),

-- Julho 2025
('Feira de Adoção — Julho',            'Evento especial de adoção no recesso escolar',                      '2025-07-12', 'Parque Ramiro Ruediger',  'realizada'),
('Campanha de Castração — Jul/2025',   'Cirurgias de castração gratuitas — segunda rodada do ano',          '2025-07-19', 'Clínica VetCare',         'realizada'),
('Oficina de Enriquecimento Ambiental', 'Workshop sobre brinquedos e atividades para cães e gatos',         '2025-07-26', 'Sede da AMA',             'realizada'),

-- Agosto 2025
('Feira de Adoção — Agosto',           'Evento com descontos nas taxas de adoção',                          '2025-08-09', 'Praça Victor Konder',     'realizada'),
('Campanha de Vacinação',              'Atualização vacinal geral dos animais do abrigo',                    '2025-08-16', 'Sede da AMA',             'realizada'),
('Arrecadação de Agasalhos para Animais','Coleta de cobertores e roupinhas para o inverno',                 '2025-08-23', 'Pontos de coleta',        'realizada'),

-- Setembro 2025
('Feira de Adoção — Setembro',         'Evento de adoção com apoio da Prefeitura de Blumenau',              '2025-09-06', 'Praça Victor Konder',     'realizada'),
('Vacinação e Microchipagem',          'Identificação de animais com microchip e atualização vacinal',      '2025-09-13', 'Sede da AMA',             'realizada'),
('Palestra: Lei de Proteção Animal',   'Informativo sobre a Lei 9.605/98 e direitos dos animais',           '2025-09-20', 'Centro Comunitário',      'realizada'),

-- Outubro 2025
('Feirinha Halloween — Adoção',        'Feira de adoção temática com fantasias para os animais',            '2025-10-25', 'Shopping Neumarkt',       'realizada'),
('Campanha de Castração — Out/2025',   'Terceira rodada de cirurgias de castração gratuitas em 2025',      '2025-10-11', 'Clínica VetCare',         'realizada'),
('Bazaar de Outono',                   'Venda de artigos doados e artesanato para o fundo do abrigo',      '2025-10-18', 'Sede da AMA',             'realizada'),

-- Novembro 2025
('Feira de Adoção — Novembro',         'Evento de adoção com parceria de pet shops e veterinárias locais','2025-11-08', 'Praça Victor Konder',     'realizada'),
('Blitz de Conscientização',           'Abordagem nas ruas sobre abandono de animais em fim de ano',        '2025-11-15', 'Centro de Blumenau',      'realizada'),
('Mutirão de Reforma do Canil',        'Reforma dos canis do abrigo com voluntários',                      '2025-11-22', 'Sede da AMA',             'realizada'),

-- Dezembro 2025
('Natal Solidário — Adote e Presenteie','Campanha de adoção: ganhe um kit de boas-vindas ao adotar',       '2025-12-06', 'Shopping Neumarkt',       'realizada'),
('Confraternização de Voluntários',    'Festa de encerramento do ano com reconhecimento dos voluntários',   '2025-12-13', 'Salão Comunitário',       'realizada'),
('Vacinação e Vermifugação de Fim de Ano','Atualização vacinal e vermifugação de todos os animais do abrigo','2025-12-20','Sede da AMA',            'realizada'),

-- Janeiro 2026
('Feira de Adoção — Janeiro 2026',     'Primeiro evento de adoção do ano, com animais resgatados recentes','2026-01-10', 'Praça Victor Konder',     'realizada'),
('Reunião de Planejamento Anual 2026', 'Definição de metas, parcerias e cronograma para 2026',             '2026-01-24', 'Sede da AMA',             'realizada'),
('Campanha de Vacinação — Jan/2026',   'Vacinação de rotina dos animais recém-chegados',                   '2026-01-31', 'Sede da AMA',             'realizada'),

-- Fevereiro 2026
('Banho e Tosa Solidário — Fev/2026',  'Serviço gratuito para animais de tutores de baixa renda',         '2026-02-07', 'Sede da AMA',             'realizada'),
('Campanha de Castração — Fev/2026',   'Cirurgias gratuitas em convênio com médico-veterinário parceiro',  '2026-02-21', 'Clínica VetCare',         'realizada'),
('Carnaval dos Animais',               'Evento de adoção com fantasia de carnaval para os pets',           '2026-02-28', 'Praça Victor Konder',     'realizada'),

-- Março 2026
('Feira de Adoção — Março 2026',       'Evento de adoção com enfoque em animais idosos e especiais',       '2026-03-14', 'Parque Ramiro Ruediger',  'realizada'),
('Arrecadação de Ração — Mar/2026',    'Coleta de ração em supermercados parceiros durante o mês',         '2026-03-28', 'Supermercados parceiros', 'realizada'),

-- Abril 2026
('Campanha Antirrábica 2026',          'Vacinação antirrábica anual em conjunto com a Vigilância Sanitária','2026-04-04','Postos descentralizados', 'realizada'),
('Bazaar Beneficente — Abr/2026',      'Bazar com peças doadas para arrecadar fundos para o abrigo',       '2026-04-18', 'Sede da AMA',             'realizada'),
('Dia da Terra — Plantio de Árvores',   'Voluntários plantam árvores no espaço do abrigo',                 '2026-04-22', 'Sede da AMA',             'realizada'),

-- Maio 2026
('Feira de Adoção — Maio 2026',        'Evento de adoção em comemoração ao Dia do Animal',                  '2026-05-02', 'Shopping Neumarkt',       'realizada'),
('Campanha de Vacinação V10/V4 2026',  'Vacinação polivalente anual para cães e gatos do abrigo',          '2026-05-16', 'Sede da AMA',             'realizada'),
('Dia das Mães — Campanha Especial',   'Desconto nas taxas de adoção para mães',                           '2026-05-10', 'Sede da AMA',             'realizada'),

-- Junho 2026
('Campanha de Castração — Jun/2026',   'Cirurgias de castração gratuitas — inscrições abertas',            '2026-06-06', 'Clínica VetCare',         'realizada'),
('Arrecadação de Ração — Jun/2026',    'Coleta de ração em pet shops parceiros para o mês de julho',       '2026-06-14', 'Pet shops parceiros',     'realizada'),
('Festa Junina Beneficente 2026',      'Arraiá com renda revertida para cirurgias dos animais do abrigo',  '2026-06-20', 'Sede da AMA',             'realizada'),
('Dia do Voluntário 2026',            'Homenagem e café da manhã especial para os voluntários',            '2026-06-27', 'Sede da AMA',             'agendada'),

-- Julho 2026
('Feira de Adoção — Julho 2026',       'Evento de adoção especial nas férias escolares',                   '2026-07-11', 'Parque Ramiro Ruediger',  'agendada'),
('Capacitação de Voluntários 2026',    'Treinamento para novos voluntários: manejo, cuidados e bem-estar', '2026-07-18', 'Sede da AMA',             'agendada'),
('Mutirão de Pintura do Abrigo',       'Reforma e pintura do espaço físico do abrigo com os voluntários',  '2026-07-25', 'Sede da AMA',             'agendada'),

-- Agosto 2026
('Feira de Adoção — Agosto 2026',      'Adoção com avaliação veterinária gratuita para o adotante',         '2026-08-08', 'Praça Victor Konder',     'agendada'),
('Campanha de Castração — Ago/2026',   'Quarta rodada de castração do ano',                                '2026-08-22', 'Clínica VetCare',         'agendada'),
('Palestra: Como Montar uma ONG',      'Palestra aberta à comunidade sobre gestão de ONGs de animais',     '2026-08-29', 'Auditório Municipal',     'agendada'),

-- Setembro 2026
('Feira de Adoção — Setembro 2026',    'Evento em parceria com pet shops da cidade',                       '2026-09-12', 'Shopping Neumarkt',       'agendada'),
('Campanha de Vacinação - Set/2026',   'Atualização vacinal geral dos animais',                             '2026-09-19', 'Sede da AMA',             'agendada'),
('Dia da Árvore — Plantio no Abrigo',  'Plantio de mudas nativas no terreno da sede',                     '2026-09-21', 'Sede da AMA',             'agendada'),
('Cãominhada da Adoção',              'Caminhada com animais do abrigo para divulgação',                   '2026-09-26', 'Parque Ramiro Ruediger',  'agendada'),

-- Outubro 2026
('Feirinha Halloween 2026',            'Feira de adoção com fantasia e concurso de fantasias para pets',   '2026-10-24', 'Shopping Neumarkt',       'agendada'),
('Campanha de Castração — Out/2026',   'Última rodada de castração do ano',                                '2026-10-10', 'Clínica VetCare',         'agendada'),
('Bazar Beneficente de Primavera',     'Bazar com roupas, livros e objetos doados',                        '2026-10-17', 'Sede da AMA',             'agendada'),

-- Novembro 2026
('Feira de Adoção — Novembro 2026',    'Evento de adoção com taxas zero',                                 '2026-11-07', 'Praça Victor Konder',     'agendada'),
('Arrecadação de Cobertores',          'Coleta de cobertores para os animais no inverno',                  '2026-11-14', 'Pontos de coleta',        'agendada'),
('Campanha Dezembro Verde',            'Mobilização contra o abandono de animais no fim do ano',           '2026-11-28', 'Centro de Blumenau',      'agendada'),

-- Dezembro 2026
('Natal Solidário 2026',               'Campanha de adoção com kit natalino para novos tutores',           '2026-12-05', 'Shopping Neumarkt',       'agendada'),
('Confraternização Voluntários 2026',  'Festa de encerramento do ano com entrega de medalhas',             '2026-12-12', 'Salão Comunitário',       'agendada'),
('Vacinação Geral de Fim de Ano',      'Vacinação e vermifugação de todos os animais do abrigo',           '2026-12-19', 'Sede da AMA',             'agendada');
