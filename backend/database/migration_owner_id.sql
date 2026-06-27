-- Migration: adiciona owner_id em animals e activities
-- Executar UMA VEZ no SQL Editor do Supabase

BEGIN;

ALTER TABLE animals
  ADD COLUMN IF NOT EXISTS owner_id INT REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS owner_id INT REFERENCES users(id) ON DELETE SET NULL;

DO $$
DECLARE
  admin_id INT;
BEGIN
  SELECT id INTO admin_id FROM users WHERE email = 'associacaoama25@gmail.com';
  IF admin_id IS NULL THEN
    RAISE EXCEPTION 'Admin não encontrado. Verifique o e-mail do administrador.';
  END IF;
  UPDATE animals   SET owner_id = admin_id WHERE owner_id IS NULL;
  UPDATE activities SET owner_id = admin_id WHERE owner_id IS NULL;
END $$;

COMMIT;
