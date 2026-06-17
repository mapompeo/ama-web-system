-- ============================================================
-- AMA Web System — Schema PostgreSQL (Supabase / Render)
-- Execute todo o script no SQL Editor do Supabase
-- ============================================================

-- ------------------------------------------------------------
-- Usuários do sistema (admin / voluntário)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'volunteer' CHECK (role IN ('admin', 'volunteer')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Voluntários
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS volunteers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  cpf VARCHAR(14),
  address VARCHAR(255),
  join_date DATE,
  status VARCHAR(10) NOT NULL DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Animais (atendidos pela ONG)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS beneficiaries (
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
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Histórico / registros por animal
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS animal_records (
  id SERIAL PRIMARY KEY,
  animal_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  record_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (animal_id) REFERENCES beneficiaries(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Atividades
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  activity_date DATE NOT NULL,
  location VARCHAR(200),
  status VARCHAR(10) NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- DADOS INICIAIS
-- ============================================================

-- Admin (senha: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@amaong.org', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Voluntários de exemplo
INSERT INTO volunteers (name, email, phone, join_date, status) VALUES
('Maria Silva', 'maria@email.com', '(47) 99000-0001', '2024-01-10', 'ativo'),
('João Santos', 'joao@email.com', '(47) 99000-0002', '2024-02-15', 'ativo'),
('Ana Oliveira', 'ana@email.com', '(47) 99000-0003', '2024-03-20', 'ativo');

-- Animais de exemplo
INSERT INTO beneficiaries (name, species, breed, sex, size, birth_date, status, responsible_name, responsible_phone, notes) VALUES
('Rex', 'Cachorro', 'Vira-lata', 'Macho', 'Médio', '2022-03-10', 'disponivel', 'Carlos Souza', '(47) 99000-0010', 'Vacinado e castrado'),
('Mel', 'Cachorro', 'Golden Retriever', 'Fêmea', 'Grande', '2021-07-15', 'adotado', 'Ana Lima', '(47) 99000-0011', 'Adotada em março de 2024');

-- Atividades de exemplo
INSERT INTO activities (title, description, activity_date, location, status) VALUES
('Distribuição de Cestas', 'Entrega mensal de cestas básicas', '2025-06-20', 'Sede da AMA', 'agendada'),
('Oficina de Artesanato', 'Oficina para geração de renda', '2025-06-25', 'Salão Comunitário', 'agendada');
