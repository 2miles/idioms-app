# Notes to myself

- Im just going to use the serial primary key to hold the sequential nature of the list.
- The idioms csv being used is ~/Dev/python/idioms/idioms_nonum.csv
- I think all of the requests type routes have been written.
- In general the list number is going to be done dynamically on the fly each time. All that is true is that the serial id keeps them in order, but not necessarily the right numbers.

## Todo

- The update routes need to be tested.
- Make a copy of idioms_test postgres table just incase

## Commands used when creating the database

```sql
CREATE TABLE idioms_test
(
    id SERIAL PRIMARY KEY,
    title_old VARCHAR(255),
    title_new VARCHAR(255),
    definition TEXT
);
```

```sql
COPY your_table_name(title_old, title_new, definition)
FROM '~/Dev/python/idioms/idioms_nonum.csv'
DELIMITER ','
CSV HEADER;
```

```sql
CREATE TABLE new_table AS
SELECT *
FROM original_table;
```

```sql
DROP TABLE your_table_name;
```

```sql
ALTER TABLE old_table
RENAME TO new_table;
```
