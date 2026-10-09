-- Chronicle schema.
-- Single-tenant on purpose: Chronicle is one DM's personal codex, not a
-- multi-user product, so there is no users table. Add one later if that
-- changes (see "What I would do next" in the README).

-- gen_random_uuid() is built into Postgres 13+. This extension is a no-op
-- on hosts where it's already core, and a safety net on older images.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS settings (
  id                   SMALLINT PRIMARY KEY DEFAULT 1,
  default_display_mode TEXT NOT NULL DEFAULT 'bullet'
                         CHECK (default_display_mode IN ('bullet', 'list', 'paragraph')),
  theme_accent         TEXT NOT NULL DEFAULT 'gold',
  CONSTRAINT settings_singleton CHECK (id = 1)
);

CREATE TABLE IF NOT EXISTS categories (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  icon          TEXT NOT NULL DEFAULT 'book',
  accent_color  TEXT NOT NULL DEFAULT '#9FD8FF',
  order_index   INTEGER NOT NULL DEFAULT 0,
  archived      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS segments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id   UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  display_mode  TEXT NOT NULL DEFAULT 'bullet'
                 CHECK (display_mode IN ('bullet', 'list', 'paragraph')),
  blocks        JSONB NOT NULL DEFAULT '[]'::jsonb,  -- array of strings, one per line/bullet
  tags          JSONB NOT NULL DEFAULT '[]'::jsonb,  -- array of strings
  order_index   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS segments_category_id_idx ON segments(category_id);

INSERT INTO settings (id, default_display_mode, theme_accent)
VALUES (1, 'bullet', 'gold')
ON CONFLICT (id) DO NOTHING;
