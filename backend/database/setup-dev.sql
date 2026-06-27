-- ============================================================
-- AMA Web System - Setup do ambiente de desenvolvimento
-- Cria schema "dev", role "ama_dev" e replica as tabelas
-- Execute via: node scripts/setup-dev.js
-- ============================================================

-- 1. Schema dev
CREATE SCHEMA IF NOT EXISTS dev;

-- 2. Role ama_dev (idempotente)
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'ama_dev') THEN
    CREATE ROLE ama_dev WITH LOGIN PASSWORD 'AmaDevLocal2026';
  END IF;
END $$;

-- 3. Permissões: apenas schema dev
REVOKE ALL ON SCHEMA public FROM ama_dev;
GRANT USAGE  ON SCHEMA dev TO ama_dev;
GRANT ALL PRIVILEGES ON ALL TABLES    IN SCHEMA dev TO ama_dev;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA dev TO ama_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA dev GRANT ALL ON TABLES    TO ama_dev;
ALTER DEFAULT PRIVILEGES IN SCHEMA dev GRANT ALL ON SEQUENCES TO ama_dev;

-- 4. search_path padrão do role → sempre usa schema dev
ALTER ROLE ama_dev SET search_path TO dev;

-- 5. Tabelas no schema dev (mesma estrutura do public)
CREATE TABLE IF NOT EXISTS dev.users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dev.animals (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(100) NOT NULL,
  species           VARCHAR(10)  NOT NULL DEFAULT 'Cachorro' CHECK (species IN ('Cachorro','Gato','Outro')),
  breed             VARCHAR(100),
  sex               VARCHAR(20)  NOT NULL DEFAULT 'Não identificado' CHECK (sex IN ('Macho','Fêmea','Não identificado')),
  size              VARCHAR(10)  CHECK (size IN ('Pequeno','Médio','Grande','Gigante')),
  birth_date        DATE,
  status            VARCHAR(20)  NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel','adotado','em_tratamento','obito')),
  responsible_name  VARCHAR(100),
  responsible_phone VARCHAR(20),
  notes             TEXT,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dev.animal_records (
  id          SERIAL PRIMARY KEY,
  animal_id   INT  NOT NULL,
  title       VARCHAR(150) NOT NULL,
  description TEXT,
  record_date DATE NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES dev.animals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dev.adoption_contracts (
  id            SERIAL PRIMARY KEY,
  animal_id     INT  NOT NULL,
  filename      VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  uploaded_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES dev.animals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dev.activities (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(150) NOT NULL,
  description   TEXT,
  activity_date DATE NOT NULL,
  location      VARCHAR(200),
  status        VARCHAR(10) NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada','realizada','cancelada')),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Seed de dev (usuário dev + dados fictícios)
INSERT INTO dev.users (name, email, password) VALUES
('Dev User', 'dev@ama.local', '$2a$10$viCt0dgD4AzuQBqfFRg78e6UaW61FdguEviwF6l7HC1SxZaamogvi')
ON CONFLICT (email) DO NOTHING;
-- senha: teste123

INSERT INTO dev.animals (name, species, breed, sex, size, birth_date, status, responsible_name, notes) VALUES
('Dev-Rex',  'Cachorro', 'Vira-lata',       'Macho',  'Médio',  '2022-03-10', 'disponivel',    'Carlos Dev',  'Animal de teste'),
('Dev-Mel',  'Cachorro', 'Golden Retriever', 'Fêmea',  'Grande', '2021-07-15', 'adotado',       'Ana Dev',     'Adotada no dev'),
('Dev-Luna', 'Gato',     'SRD',             'Fêmea',  'Pequeno','2023-01-05', 'em_tratamento', 'Maria Dev',   'Em observação')
ON CONFLICT DO NOTHING;

INSERT INTO dev.activities (title, description, activity_date, location, status) VALUES
('Evento Dev 1', 'Atividade fictícia para testes', '2026-07-01', 'Sede Dev', 'agendada'),
('Evento Dev 2', 'Atividade fictícia cancelada',   '2026-06-15', 'Online',   'cancelada')
ON CONFLICT DO NOTHING;
