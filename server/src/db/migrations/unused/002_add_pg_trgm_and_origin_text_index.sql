-- Enable trigram extension (required for fast ILIKE searches)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Trigram index for origin text search
CREATE INDEX IF NOT EXISTS idiom_origins_ai_origin_text_trgm
ON idiom_origins_ai
USING gin (origin_text gin_trgm_ops);