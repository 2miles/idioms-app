## Gather info on all DBs

### Dev

```bash
/opt/homebrew/opt/postgresql@15/bin/pg_dump \
--schema-only \
--schema=public \
--no-owner \
--no-privileges \
--format=plain \
--file schema_audit/dev_schema.sql \
"<connectionString>"
```

### Prod

```bash
/opt/homebrew/opt/postgresql@15/bin/pg_dump \
--schema-only \
--schema=public \
--no-owner \
--no-privileges \
--format=plain \
--file schema_audit/prod_schema.sql \
"<connectionString>"
```

### Test

```bash
/opt/homebrew/opt/postgresql@16/bin/pg_dump \
--schema-only \
--schema=public \
--no-owner \
--no-privileges \
--format=plain \
--file schema_audit/test_schema.sql \
"<connectionString>"
```

## Find any differences
