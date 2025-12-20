#!/bin/bash
set -euo pipefail

MIGRATIONS_DIR=./server/src/db/migrations
SEED_FILE=./server/src/db/seeds/test_seed.sql

if [ -z "${DATABASE_URL_TEST:-}" ]; then
  echo "DATABASE_URL_TEST is not set!"
  exit 1
fi

if [[ "$DATABASE_URL_TEST" == *"supabase"* || "$DATABASE_URL_TEST" == *"prod"* ]]; then
  echo "Refusing to run reset on production or supabase DB!"
  exit 1
fi

echo "Wiping test DB schema..."
psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "Running migrations..."
psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$MIGRATIONS_DIR/common/001_baseline.sql"
psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$MIGRATIONS_DIR/test/001_add_e2e_lock.sql"
# Optional:
# psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$MIGRATIONS_DIR/003_add_pg_trgm_and_origin_text_index.sql"

echo "Seeding test DB data..."
psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$SEED_FILE"

echo "Railway test DB reset complete."