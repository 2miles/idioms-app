#!/bin/bash

set -e

SEED_FILE=./server/data/testDbSeed.sql

if [ -z "$DATABASE_URL_TEST" ]; then
  echo "DATABASE_URL_TEST is not set!"
  exit 1
fi

if [[ "$DATABASE_URL_TEST" == *"supabase"* || "$DATABASE_URL_TEST" == *"prod"* ]]; then
  echo "Refusing to run reset on production or supabase DB!"
  exit 1
fi

echo "Wiping test DB schema..."
psql "$DATABASE_URL_TEST" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

echo "Seeding test DB..."
psql "$DATABASE_URL_TEST" -f "$SEED_FILE"

echo "Railway test DB reset complete."