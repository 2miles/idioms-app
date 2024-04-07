### Database

- Im going to use the serial primary key to hold the sequential nature of the list. This means I'm going to have to figure out a way to 'number' the idioms when they are being rendered. Using the serial key will keep them in chronological order but there may be gaps and what not.
- There will also be a date field for each idiom. So all idioms with the same date will be distinguished temporally by the primary key id.
- All the dates were manually added by going through my text messages with each contributing person and noting the date the idiom was suggested and the contributer, since many of the idioms were sent through text message.
- The idioms csv being used is `~/Dev/python/idioms/idioms_nonum.csv`

## Routes

### Main Page

```
localhost:3000/
```

### Detail Page

```
localhost:3000/idioms/{id}
```

### Update page

```
localhost:3000/idioms/{id}/update
```

## Database

- The database is running locally on a Postgres server on port 5433
- Use Pgadmin4 to interact with the database directly with a GUI.

### Database notes

- Im going to use the serial primary key to hold the sequential nature of the list. This means I'm going to have to figure out a way to 'number' the idioms when they are being rendered. Using the serial key will keep them in chronological order but there may be gaps and what not.
- There will also be a date field for each idiom. So all idioms with the same date will be distinguished temporally by the primary key id.
- All the dates were manually added by going through my text messages with each contributing person and noting the date the idiom was suggested and the contributer, since many of the idioms were sent through text message.
- The idioms csv being used is `~/Dev/python/idioms/idioms_nonum.csv`

### Database tables:

#### `idioms`

This is the main idioms table.

#### `idioms_backup`

This is a backup of the main idioms table.

#### `idioms_test`

This is the table to practice and test all the crud operations and api endpoints.

### Commands used when creating the database

```sql
CREATE TABLE idioms_test
(
    id SERIAL PRIMARY KEY,
    title_old VARCHAR(255),
    title_new VARCHAR(255),
    definition TEXT,
    date DATE,
    name VARCHAR(50)
);
```

Create table from CSV, ignoring the first line of data

```sql
COPY your_table_name(title_old, title_new, definition)
FROM '~/Dev/python/idioms/idioms_nonum.csv'
DELIMITER ','
CSV HEADER;
```

Create table from CSV, ignoring the first line of data

```sql
COPY idioms_wide(title_old, title_new, definition, day, owner)
FROM '~/Dev/python/idioms/idioms_nonum_new_data.csv'
DELIMITER ','
CSV HEADER;
```

Make a copy of a table

```sql
CREATE TABLE new_table AS
SELECT * FROM original_table;
```

Delete a table

```sql
DROP TABLE your_table_name;
```

Rename a table

```sql
ALTER TABLE old_table
RENAME TO new_table;
```

To create a new table and link it up to the code here: https://www.youtube.com/watch?v=J01rYl9T3BU&t=14130s
The time is 4:40
