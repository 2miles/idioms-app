# Database Operations

DATABASE_URL values live in:

- server/.env (dev)
- server/.env.test (test)
- production environment (Railway / Vercel)

## Backups

### Full backup (schema + data)

```bash
pg_dump "$PROD_DATABASE_URL" \
  --format=custom \
  --no-owner \
  --file "prod_$(date +%F).dump"
```

### Data only backup

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

## Migrations

Run these from root

### dev

```bash
set -a && source server/.env && set +a
MIGRATION_ENV=dev ./server/scripts/migrate.sh
```

### prod

```bash
MIGRATION_ENV=prod DATABASE_URL="postgresql://..." ./server/scripts/migrate.sh
```

## Seeds (data only)

```bash
psql "$DATABASE_URL_TARGET" -v ON_ERROR_STOP=1 \
 -f server/data/backups/data_only/backup.sql
```

## Rebuilding a database (destructive)

```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

Then

1. Run migrations
2. load the seed data

## Workflows

### Migration-style DBs (dev + prod)

- Forward-only schema changes
- Never dropped
- Uses `schema_migrations` table
- Managed by `migrate.sh`

### Rebuild-style DB (test / CI)

- Dropped and recreated every run
- No migrations history
- Uses baseline schema + test-only additions + seed

These Workflows must remain seperate.

## Example Workflow

### 1. Develop lacally (dev database)

- Make code changes.
- If the schema needs to change
  - Create a new migration file (e.g. 004_add_requests_index.sql)
  - Run migrations against the dev database
- run the app and tests to verify everything works.

### 2. Prepare for merge

- Commit the migrations file alongside the code change
- Do not modify existing migrations - only add new ones.

### 3. Deploy to production

- Back up the production database
- Run migrations against prod to apply only new, unapplied migrations
