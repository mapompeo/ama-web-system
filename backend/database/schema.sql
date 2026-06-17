-- ============================================================
-- AMA Web System — Schema e dados iniciais
-- ============================================================

CREATE DATABASE IF NOT EXISTS ama_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ama_db;

-- ------------------------------------------------------------
-- Usuários do sistema (admin / voluntário)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'volunteer') NOT NULL DEFAULT 'volunteer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Voluntários
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS volunteers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20),
  cpf VARCHAR(14),
  address VARCHAR(255),
  join_date DATE,
  status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Atendidos (beneficiários)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS beneficiaries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  cpf VARCHAR(14),
  birth_date DATE,
  phone VARCHAR(20),
  address VARCHAR(255),
  responsible_name VARCHAR(100),
  status ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Atividades
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  activity_date DATE NOT NULL,
  location VARCHAR(200),
  status ENUM('agendada', 'realizada', 'cancelada') NOT NULL DEFAULT 'agendada',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Dados iniciais — usuário admin de demonstração
-- Senha: admin123  (hash bcrypt rounds=10)
-- ------------------------------------------------------------
INSERT INTO users (name, email, password, role) VALUES
('Administrador', 'admin@amaong.org', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Voluntários de exemplo
INSERT INTO volunteers (name, email, phone, join_date, status) VALUES
('Maria Silva', 'maria@email.com', '(47) 99000-0001', '2024-01-10', 'ativo'),
('João Santos', 'joao@email.com', '(47) 99000-0002', '2024-02-15', 'ativo'),
('Ana Oliveira', 'ana@email.com', '(47) 99000-0003', '2024-03-20', 'ativo');

-- Atendidos de exemplo
INSERT INTO beneficiaries (name, phone, address, responsible_name, status) VALUES
('Carlos Pereira', '(47) 98000-0001', 'Rua das Flores, 10', 'Rosa Pereira', 'ativo'),
('Lucia Mendes', '(47) 98000-0002', 'Av. Central, 55', 'Pedro Mendes', 'ativo');

-- Atividades de exemplo
INSERT INTO activities (title, description, activity_date, location, status) VALUES
('Distribuição de Cestas', 'Entrega mensal de cestas básicas', '2025-06-20', 'Sede da AMA', 'agendada'),
('Oficina de Artesanato', 'Oficina para geração de renda', '2025-06-25', 'Salão Comunitário', 'agendada');
