### Database notes

- Im going to use TIMESTAMP instead of DATE to store the date and time. This way even with insertions and deletions, the idioms will always order as long as they are ORDER BY timestamp.
- The idioms csv used for the original idioms_db is `~/Dev/python/idioms/idioms_nonum.csv`
- All the dates were manually added by going through my text messages with each contributing person and noting the date the idiom was suggested and the contributer, since many of the idioms were sent through text message.

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

### Database tables:

#### `idioms`

This will be the name of the main idioms table.

#### `idioms_backup`

This is a backup of the idioms.

#### `idioms_test`

This is the table to practice and test all the crud operations and api endpoints.

### Commands used when creating the database

```sql
CREATE TABLE idioms(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    title_general VARCHAR(255),
    definition TEXT,
    contributor VARCHAR(50)
    timestamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Create table from CSV, ignoring the first line of data

```sql
COPY your_table_name(title_old, title_new, definition)
FROM '~/Dev/python/idioms/idioms_nonum.csv'
DELIMITER ','
CSV HEADER;
```

Make a copy of a table (does not copy properties like PRIMARY KEY)

```sql
CREATE TABLE new_table AS
SELECT * FROM original_table;
```

Create a copy of the table structure (makes a new empty table with same cols and properties as original)

```sql
CREATE TABLE new_table_name (LIKE original_table_name INCLUDING ALL);
```

-- Copy the data from the original table to the new table

```sql
INSERT INTO new_table_name SELECT * FROM original_table_name;
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

## Add a timestamp column to your table:

```sql
ALTER TABLE your_table ADD COLUMN insertion_timestamp TIMESTAMP;
```

Update the newly added column with the corresponding timestamps from the existing date field:

```sql
UPDATE idioms SET insertion_timestamp = day::timestamp;
```

## Deep copying a table

To copy a table and all its properties first create the table using the CREATE TABLE query.
Then insert all the data.

```sql
CREATE TABLE idioms(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    title_general VARCHAR(255),
    definition TEXT,
    contributor VARCHAR(50)
    timestamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

```sql
INSERT INTO idioms_new (id, title, title_general, definition, contributor, timestamps)
SELECT id, title, title_general, definition, contributor, timestamps
FROM idioms;
```
