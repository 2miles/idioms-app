## Columns, types, defaults, nullability

- what columns exist
- what types they are
- which are nullable
- what defaults exist (nextval(...), now(), etc.)

```sql
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'idiom_origins_ai'
ORDER BY ordinal_position;
```

## Constraints (this is where bugs hide)

### contype meanings:

- p → primary key
- u → unique
- f → foreign key
- c → check constraint

### This will immediately tell you:

- whether UNIQUE (idiom_id) exists
- whether your FK is correct
- whether anything was dropped accidentally

```sql
SELECT
  conname,
  contype,
  pg_get_constraintdef(c.oid) AS definition
FROM pg_constraint c
WHERE conrelid = 'public.idiom_origins_ai'::regclass;
```

## Indexes (performance + uniqueness)

This tells you:

- if a UNIQUE index exists (even without a constraint)
- if your trigram index exists
- exactly how Postgres enforces things

Important distinction:

- UNIQUE constraint = semantic rule
- UNIQUE index = enforcement mechanism

Postgres sometimes has one without the other.

```sql
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename = 'idiom_origins_ai';
```

## Foreign keys (relationships)

Outgoing FKs

```sql
SELECT
  conname,
  pg_get_constraintdef(c.oid) AS definition
FROM pg_constraint c
WHERE contype = 'f'
  AND conrelid = 'public.idiom_origins_ai'::regclass;
```

Incoming FKs (what depends on this table)

This helps you see:

- cascading deletes
- hidden dependencies
- what breaks if you change something

```sql
SELECT
  conname,
  conrelid::regclass AS referencing_table,
  pg_get_constraintdef(c.oid) AS definition
FROM pg_constraint c
WHERE contype = 'f'
  AND confrelid = 'public.idioms'::regclass;
```

## Sequences (IDs & ownership)

This confirms:

- which sequence feeds which column
- whether defaults are wired correctly

```sql
SELECT
  seq.relname AS sequence_name,
  col.attname AS column_name
FROM pg_class seq
JOIN pg_depend dep ON dep.objid = seq.oid
JOIN pg_class tbl ON dep.refobjid = tbl.oid
JOIN pg_attribute col ON col.attrelid = tbl.oid AND col.attnum = dep.refobjsubid
WHERE tbl.relname = 'idiom_origins_ai';
```

## Extensions (global DB features)

This is where you confirm:

- pg_trgm
- pgcrypto (for gen_random_uuid)
- anything else Supabase enabled

```sql
SELECT extname, extversion
FROM pg_extension;
```

## Table size & index size (sanity check)

Useful for:

- confirming indexes actually exist
- seeing when text/index growth starts to matter

```sql
SELECT
  relname,
  pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
  pg_size_pretty(pg_relation_size(relid)) AS table_size,
  pg_size_pretty(pg_total_relation_size(relid) - pg_relation_size(relid)) AS index_size
FROM pg_catalog.pg_statio_user_tables
WHERE relname = 'idiom_origins_ai';
```

## My recommended workflow (to stay sane)

When you’re unsure about a table:

```sql
SELECT * FROM information_schema.columns ...
```

```sql
SELECT * FROM pg_constraint ...
```

```sql
SELECT * FROM pg_indexes ...
```
