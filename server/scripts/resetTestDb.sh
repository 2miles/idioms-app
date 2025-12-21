#!/bin/bash
set -euo pipefail

source ../server/.env.test

MIGRATIONS_DIR=../server/src/db/migrations
SEED_FILE=../server/src/db/seeds/test_seed.sql

if [ -z "${DATABASE_URL_TEST:-}" ]; then
  echo "DATABASE_URL_TEST is not set!"
  exit 1
fi

# Extra safety: refuse prod/supabase
if [[ "$DATABASE_URL_TEST" == *"supabase"* || "$DATABASE_URL_TEST" == *"prod"* ]]; then
  echo "Refusing to run reset on production or supabase DB!"
  exit 1
fi

echo "Wiping test DB schema..."
psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "Running base migrations..."
shopt -s nullglob
for f in "$MIGRATIONS_DIR"/*.sql; do
  echo "→ $f"
  psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$f"
done

echo "Running test-only migrations..."
for f in "$MIGRATIONS_DIR/test_only"/*.sql; do
  echo "→ $f"
  psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$f"
done
shopt -u nullglob

echo "Seeding test DB data..."
psql "$DATABASE_URL_TEST" -v ON_ERROR_STOP=1 -f "$SEED_FILE"

echo "Railway test DB reset complete."