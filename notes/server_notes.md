### Database tables:

#### `idioms_test`

#### `idioms_examples_test`

#### `idioms_origin_test`

# Burn all tables in idioms_db and restart from csv files.

## Create tables and copy data from csv files.

```sql

DROP TABLE idioms_examples_test;
DROP TABLE idioms_origin_test;
DROP TABLE idioms_test;

CREATE TABLE idioms_test (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    title_general VARCHAR(255),
    definition TEXT,
    contributor VARCHAR(50),
    timestamps TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE idioms_examples_test (
    example_id SERIAL PRIMARY KEY,
    idiom_id INT NOT NULL,
    example TEXT,
FOREIGN KEY (idiom_id) REFERENCES idioms_test (id)
);

CREATE TABLE idioms_origin_test (
    origin_id SERIAL PRIMARY KEY,
    idiom_id INT NOT NULL UNIQUE,
    example TEXT,
    FOREIGN KEY (idiom_id) REFERENCES idioms_test (id)
);

COPY idioms_examples_test (example_id, idiom_id, example)
FROM '/Users/miles/Code/Github/idioms-app/data/examples.csv'
DELIMITER ','
CSV HEADER
QUOTE '"'
ESCAPE '"';

COPY idioms_test (id, title, title_general, definition, contributor, timestamps)
FROM '/Users/miles/Code/Github/idioms-app/data/idioms.csv'
DELIMITER ','
CSV HEADER
QUOTE '"'
ESCAPE '"';
```

# Burn all tables in the Supabase IdiomVault and restart from sql file.

Using GUI delete all tables.

Then run the following shell command to import the database. It will prompt you for your password

```shell
psql -h aws-0-us-west-1.pooler.supabase.com -p 6543 -d postgres -U postgres.erqaqeyusbfwzvftrqjw -f /Users/miles/Code/Github/idioms-app/data/idioms_db_backup.sql
```

# Old PGAdmin notes

## To create a backup of the idiom table in PGAdmin

```sql
CREATE TABLE idioms_test_backup AS TABLE idioms_test WITH NO DATA;
```

Go into the sequences in PgAdmin and create a new sequence named `idioms_test_backup_id_seq`

Go into the properties of the `idiom_test_backup` table and under the columns tab change the default of id column to `nextval('idioms_test_backup_id_seq'::regclass)`. Make sure the `Not NULL?` and the `Primary Key?` are checked.

```sql
INSERT INTO idioms_test_backup SELECT * FROM idioms_test;
```

Go into the properties of `idioms_test_backup_id_seq` and change the next val to `1081` or what ever the number of idioms you have plus 1

## To burn the idiom_test table and restore from backup (PGAdmin)

- Create backup of `idiom_test` as `idiom_test_backup`
- Rename `idiom_test` to `idiom_test_delete`
- Rename `idiom_test_backup` to `idiom_test`
- Update the `idiom_test` id column default to `idioms_test_id_seq::regclass`
- Update the sequence `idiom_test_id_seq` next value to correct number: (1 + number of idioms)
- Delete `idiom_test_delete`
