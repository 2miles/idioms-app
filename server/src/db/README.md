The DATABASE_URLs are found in server/.env

## Making backups

### Full DB Backup

```bash
pg_dump "$PROD_DATABASE_URL" \
  --format=custom \
  --no-owner \
  --file "prod_$(date +%F).dump"
```

### COPY statements for all your app tables (data-only seed)

```bash
pg_dump "$DATABASE_URL_PROD" \
  --data-only \
  --schema=public \
  --no-owner \
  --no-privileges \
  --format=plain \
  --file "seeds/prod_public_data.sql"
```

## Restoring

### Restore full dump into empty DB

```bash
pg_restore \
  --no-owner \
  --clean --if-exists \
  -d "$DATABASE_URL_TARGET" \
  "prod_YYYY-MM-DD.dump"
```

### Nuke and rebuild db

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

### Loading the database

On a brand new DB:

- 1. run your migrations (schema)
- 2. load the seed file

```bash
psql "$DATABASE_URL_TARGET" -v ON_ERROR_STOP=1 -f server/src/db/migrations/001_baseline.sql
psql "$DATABASE_URL_TARGET" -v ON_ERROR_STOP=1 -f server/src/db/migrations/002_add_e2e_lock.sql
# ...etc
psql "$DATABASE_URL_TARGET" -v ON_ERROR_STOP=1 -f seeds/prod_seed.sql
```

## One important extra: reset identity sequences after COPY

Because you’re using IDENTITY, after loading explicit IDs you should bump sequences so inserts don’t collide.

Append this to the end of your seed file (or run it afterward):

```sql
SELECT setval(pg_get_serial_sequence('public.idioms','id'),
             COALESCE((SELECT MAX(id) FROM public.idioms), 1));

SELECT setval(pg_get_serial_sequence('public.idiom_examples','example_id'),
             COALESCE((SELECT MAX(example_id) FROM public.idiom_examples), 1));

SELECT setval(pg_get_serial_sequence('public.idiom_origins_ai','id'),
             COALESCE((SELECT MAX(id) FROM public.idiom_origins_ai), 1));

SELECT setval(pg_get_serial_sequence('public.staging_scrapes','id'),
             COALESCE((SELECT MAX(id) FROM public.staging_scrapes), 1));
```

## workflow for prod

### final backup (again, always)

```
pg_dump ... --format=custom --file prod_final_backup.dump
```

### rebuild prod

```
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

psql "$DATABASE_URL_PROD" -f server/db/migrations/001_baseline.sql
psql "$DATABASE_URL_PROD" -f server/db/migrations/002_add_e2e_lock.sql
psql "$DATABASE_URL_PROD" -f server/db/migrations/003_add_pg_trgm_and_origin_text_index.sql
psql "$DATABASE_URL_PROD" -f server/data/data_only/seed.sql
```

# workflow

The flow you want

1. While developing (dev DB):

   - You change schema by creating a new migration file (e.g. 004_add_requests_index.sql).
   - You run migrate.sh against dev to apply it.
   - You run your app/tests and confirm everything works.

2. Merge to main:

   - Commit the migration file(s) with the code change.

3. Deploy + prod:

   - Run migrate.sh against prod to apply only the new, not-yet-applied migrations.

## Two important rules

- Never “edit” old migrations once they’ve been applied anywhere (especially prod).
- If you need a fix, add a new migration.
  - Prod runs forward-only.
  - No DROP SCHEMA, no rebuilding. Just apply new migrations.

## Practical habit that prevents pain

When you’re ready to push:

- Run migrate.sh on a fresh dev rebuild (or a scratch DB) to ensure the full chain still builds cleanly from baseline.
- Then merge + run on prod.

That’s basically the same workflow real teams use, just lighter-weight.

# Run migrations on Dev

```bash
set -a && source server/.env && set +a && MIGRATION_ENV=dev ./server/scripts/migrate.sh
```

# Run migrations on Prod

```bash
MIGRATION_ENV=prod DATABASE_URL="postgresql://..." ./server/scripts/migrate.sh
```
