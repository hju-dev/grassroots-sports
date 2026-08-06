-- Grass Roots Sports — Neon/Postgres schema
-- Run this in the Neon SQL editor after creating the database

-- Registrations (captured from the register interest flow)
CREATE TABLE IF NOT EXISTS registrations (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  phone       TEXT        NOT NULL,
  program     TEXT        NOT NULL CHECK (program IN ('youth', 'teen', 'adult', 'private')),
  paid        BOOLEAN     NOT NULL DEFAULT FALSE,
  locale      TEXT        NOT NULL DEFAULT 'en',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for quick lookup by email (e.g. Clerk user lookup)
CREATE INDEX IF NOT EXISTS registrations_email_idx ON registrations (email);
CREATE INDEX IF NOT EXISTS registrations_program_idx ON registrations (program);
CREATE INDEX IF NOT EXISTS registrations_created_idx ON registrations (created_at DESC);
