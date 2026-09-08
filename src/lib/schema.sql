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

-- Rate limiting for /api/register and /api/contact (see src/lib/rateLimit.ts).
-- This table already exists in production — rateLimit.ts used to also run
-- these two statements on every request "just in case," which cost two
-- extra HTTP round-trips to Neon (a fetch-based driver, not a pooled
-- connection — every statement is its own round-trip) on every single
-- form submission for a table that only ever needed creating once. Removed
-- from the hot path; this file stays the source of truth for provisioning
-- a fresh environment.
CREATE TABLE IF NOT EXISTS rate_limit_hits (
  id         SERIAL PRIMARY KEY,
  bucket     TEXT        NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS rate_limit_hits_bucket_created_idx ON rate_limit_hits (bucket, created_at);
