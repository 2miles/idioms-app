#!/usr/bin/env bash

# ------------------------------------------------------------------------------
# Database Migration Runner
#
# Applies SQL migrations in filename order to the target database.
#
# How it works:
#   - Uses DATABASE_URL to connect to the database
#   - Tracks applied migrations in the public.schema_migrations table
#   - Runs each migration exactly once (forward-only)
#   - Wraps each migration in a transaction
#
# Intended usage:
#   - Dev & Prod: run forward-only migrations (no schema resets)
#   - Test DB: schema is rebuilt separately; this script is NOT used there
#
# Assumptions:
#   - Migrations are additive and non-idempotent
#   - Filenames are ordered (e.g. 001_baseline.sql, 002_add_feature.sql)
#   - Database already exists
#
# Safety:
#   - Does NOT drop schemas or data
#   - Safe to re-run (already-applied migrations are skipped)
# ------------------------------------------------------------------------------


# Usage:

# - Dev
#   set -a && source server/.env && set +a && MIGRATION_ENV=dev  ./migrate.sh

# - Prod
#   MIGRATION_ENV=prod DATABASE_URL="..." ./migrate.sh
#
# Notes:
# - dev/test load from ../server/.env or ../server/.env.test
# - prod expects DATABASE_URL to be injected by the environment (Railway, etc.)

set -euo pipefail

MIGRATION_ENV="${MIGRATION_ENV:-dev}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SERVER_ENV="$ROOT_DIR/server/.env"
SERVER_ENV_TEST="$ROOT_DIR/server/.env.test"
MIGRATIONS_DIR="$ROOT_DIR/server/src/db/migrations"

load_env_file() {
  local file="$1"
  if [[ -f "$file" ]]; then
    set -a
    source "$file"
    set +a
  fi
}

# Resolve DATABASE_URL based on environment
case "$MIGRATION_ENV" in
  dev)
    load_env_file "$SERVER_ENV"
    : "${DATABASE_URL_DEV:?DATABASE_URL_DEV is required in server/.env}"
    DATABASE_URL="$DATABASE_URL_DEV"
    ;;
  test)
    load_env_file "$SERVER_ENV_TEST"
    : "${DATABASE_URL_TEST:?DATABASE_URL_TEST is required in server/.env.test}"
    DATABASE_URL="$DATABASE_URL_TEST"
    ;;
  prod)
    # Don't source local files for prod. Require it from the environment.
    : "${DATABASE_URL:?DATABASE_URL must be set for MIGRATION_ENV=prod}"
    ;;
  *)
    echo "Unknown MIGRATION_ENV: $MIGRATION_ENV (use dev|test|prod)"
    exit 1
    ;;
esac

echo "→ MIGRATION_ENV=$MIGRATION_ENV"
echo "→ Applying migrations from: $MIGRATIONS_DIR"

# extra safety: refuse obvious footguns
if [[ "$MIGRATION_ENV" == "dev" && "$DATABASE_URL" == *"prod"* ]]; then
  echo "Refusing to run dev migrations against a URL that looks like prod."
  exit 1
fi

if [[ "$MIGRATION_ENV" == "test" && "$DATABASE_URL" == *"supabase"* ]]; then
  echo "Refusing to run test migrations against Supabase."
  exit 1
fi

# Your existing prod warning (uses ${DATABASE_URL:-} to avoid set -u issues)
if [[ "$MIGRATION_ENV" == "prod" && "${DATABASE_URL:-}" != *"supabase"* ]]; then
  echo "⚠️  WARNING: MIGRATION_ENV=prod but DATABASE_URL does not look like Supabase"
  echo "Refusing to run."
  exit 1
fi

if [[ "$MIGRATION_ENV" == "prod" ]]; then
  read -p "⚠️  Run migrations on PROD? Type 'yes' to continue: " confirm
  [[ "$confirm" == "yes" ]] || exit 1
fi

# Ensure migration registry exists
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
CREATE TABLE IF NOT EXISTS public.schema_migrations (
  filename   text PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);
SQL

# Apply new migrations in deterministic filename order
find "$MIGRATIONS_DIR" -maxdepth 1 -type f -name '*.sql' | sort | while IFS= read -r file; do
  fname="$(basename "$file")"

  applied="$(psql "$DATABASE_URL" -tA -v ON_ERROR_STOP=1 \
    -c "SELECT 1 FROM public.schema_migrations WHERE filename = '$fname' LIMIT 1;")"

  if [[ "$applied" == "1" ]]; then
    echo "✓ Skipping $fname"
    continue
  fi

  echo "→ Applying $fname"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 <<SQL
BEGIN;
\i '$file'
INSERT INTO public.schema_migrations (filename) VALUES ('$fname');
COMMIT;
SQL
done

echo "✅ Migrations up to date."