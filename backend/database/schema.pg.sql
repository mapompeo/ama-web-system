-- ============================================================
-- AMA Web System - Schema PostgreSQL (Supabase / Render)
-- ============================================================

DROP TABLE IF EXISTS beneficiaries CASCADE;
DROP TABLE IF EXISTS volunteers CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS animals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(10) NOT NULL DEFAULT 'Cachorro' CHECK (species IN ('Cachorro','Gato','Outro')),
  breed VARCHAR(100),
  sex VARCHAR(20) NOT NULL DEFAULT 'Não identificado' CHECK (sex IN ('Macho','Fêmea','Não identificado')),
  size VARCHAR(10) CHECK (size IN ('Pequeno','Médio','Grande','Gigante')),
  birth_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'disponivel' CHECK (status IN ('disponivel','adotado','em_tratamento','obito')),
  responsible_name VARCHAR(100),
  responsible_phone VARCHAR(20),
  notes TEXT,
  owner_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS animal_records (
  id SERIAL PRIMARY KEY,
  animal_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  record_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS adoption_contracts (
  id SERIAL PRIMARY KEY,
  animal_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  activity_date DATE NOT NULL,
  location VARCHAR(200),
  status VARCHAR(10) NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada')),
  owner_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin: senha definida fora do repositório
-- Demo:  Visitante (senha definida fora do repositório)
INSERT INTO users (name, email, password) VALUES
('Administrador', 'associacaoama25@gmail.com', '$2a$10$RLYqBDZvhiDjPKnXON/IM.aGsMeVSvOIvbyeH.mIHuZs85u9Qzr02'),
('Visitante Demo', 'demo@ama.org.br', '$2a$10$bg06B/tAgKnFcvisv9o6Be.CDqTuTEVRC6SnTctBUw0rdXwqd1iLq')
ON CONFLICT (email) DO NOTHING;

INSERT INTO animals (name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes) VALUES
('Rex', 'Cachorro', 'Vira-lata', 'Macho', 'Médio', '2022-03-10', 'disponivel', 'Carlos Souza', '(47) 99000-0010', 'Vacinado e castrado'),
('Mel', 'Cachorro', 'Golden Retriever', 'Fêmea', 'Grande', '2021-07-15', 'adotado', 'Ana Lima', '(47) 99000-0011', 'Adotada em março de 2024');

INSERT INTO activities (title, description, activity_date, location, status) VALUES
('Distribuição de Cestas', 'Entrega mensal de cestas básicas', '2025-06-20', 'Sede da AMA', 'agendada'),
('Oficina de Artesanato', 'Oficina para geração de renda', '2025-06-25', 'Salão Comunitário', 'agendada');
