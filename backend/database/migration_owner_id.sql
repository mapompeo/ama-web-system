-- Migration: adiciona owner_id em animals e activities
-- Executar UMA VEZ no SQL Editor do Supabase

ALTER TABLE animals
  ADD COLUMN IF NOT EXISTS owner_id INT REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS owner_id INT REFERENCES users(id) ON DELETE CASCADE;

-- Atribui os dados existentes ao admin da ONG
UPDATE animals  SET owner_id = (SELECT id FROM users WHERE email = 'associacaoama25@gmail.com') WHERE owner_id IS NULL;
UPDATE activities SET owner_id = (SELECT id FROM users WHERE email = 'associacaoama25@gmail.com') WHERE owner_id IS NULL;
