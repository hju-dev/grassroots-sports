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

-- ============================================================
-- Gallery photos (editable from /dashboard/gallery)
-- New uploads start as drafts (published = false) and only appear on the
-- public Gallery page once published. Empty *_th text means "show the English".
-- If this table can't be read, the public page falls back to the Payload
-- media library, so it never breaks.
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_photos (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  url         TEXT        NOT NULL,
  width       INTEGER     NOT NULL,
  height      INTEGER     NOT NULL,
  alt_en      TEXT        NOT NULL DEFAULT '',
  alt_th      TEXT        NOT NULL DEFAULT '',
  caption_en  TEXT        NOT NULL DEFAULT '',
  caption_th  TEXT        NOT NULL DEFAULT '',
  category    TEXT        NOT NULL DEFAULT 'events' CHECK (category IN ('youth', 'teen', 'adult', 'events')),
  published   BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS gallery_photos_order_idx ON gallery_photos (published, sort_order);

-- No public/client access: every read and write goes through server code.
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- Carry over the 8 photos currently on the public Gallery (only if the table is
-- empty). They point at the same Blob files the media library already uses.
INSERT INTO gallery_photos (url, width, height, alt_en, caption_en, category, published, sort_order)
SELECT v.url, v.width, v.height, v.alt_en, v.caption_en, v.category, TRUE, v.sort_order
FROM (VALUES
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/team-huddle.webp', 1275, 1234, 'Grassroots Sports team huddle', 'Team huddle', 'events', 1),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/game-action.webp', 1518, 1016, 'Grassroots Sports game action', 'Game action', 'adult', 2),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/coach-huddle.webp', 1528, 1008, 'Coach and players in huddle', 'Coaching session', 'youth', 3),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/team-timeout.webp', 1522, 1014, 'Team timeout during a game', 'Game time', 'adult', 4),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/youth-scrimmage.webp', 1526, 1000, 'Youth scrimmage session', 'Youth scrimmage', 'youth', 5),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/team-champions.webp', 1448, 1086, 'Girls team celebrating championship win', 'Champions', 'youth', 6),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/community-group.webp', 1440, 1394, 'Grassroots Sports community group photo', 'Community', 'events', 7),
  ('https://uoqwszddze2o4hsz.public.blob.vercel-storage.com/team-dinner.webp', 1600, 2133, 'Team community dinner', 'Team dinner', 'events', 8)
) AS v(url, width, height, alt_en, caption_en, category, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM gallery_photos);
