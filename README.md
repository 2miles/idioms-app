# Notes to myself

- Im going to use the serial primary key to hold the sequential nature of the list.
- There will also be a date field for each idiom. So all idioms with the same date will be distinguished temporally by the primary key id.
- All the dates were manually added by going through my text messages with each contributing person and noting the date the idiom was suggested and the contributer, since many of the idioms were sent through text message.

- The idioms csv being used is ~/Dev/python/idioms/idioms_nonum.csv

## Environment

PERN Stack

Database

- pgadmin
- psql cli

### idiom_db tables:

#### idioms

This is the main idioms table.

#### idioms_backup

This is a backup of the main idioms table.

#### idioms_test

This is the table to practice and test all the crud operations and api endpoints.

### Node Server Packages

- cors
- dotenv
- express
- morgan
- nodemon
- pg

Server

- postman

Frontend

- React
- Context API

## Routes

List page, add new idiom, filter idioms,

```
localhost:3000/
```

Detail page

```
localhost:3000/idioms/{id}
```

Update page

```
localhost:3000/idioms/{id}/update
```

## Commands used when creating the database

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

Eve

2023-07-14,

- That cuts the mustard
- No such thing as free lunch

2023-07-14

- Takes the cake
- Mountain out of a molehill
- The cheese stands alone
- 3s a crowd
- Watch a pot it never boils
- speak of the devil and he shall appear

2023-07-16

- comparison is the theif of joy

## TODO:

- [ ] Add iPhone notes idioms to this readme right above this todo.
- [ ] Finish making the sorting buttons for the idiom list frontend.
- [ ] Clean up the database tables.
- [ ] Figure out exactly what the idiom scraper does and how to use it. maybe use it again to finish the definitions?
- [ ] Reorganise the layout of the page.
  - [ ] in list view make the rows clickable and remove the edit and delete buttons from list view.
  - [ ] make the idiom list click to the detail view.
  - [ ] make the detail view contain the edit and delete buttons.
- [ ] make a backup of the idioms_wide database and rename it.
- [ ] go through and clean up the READMEs.

- [ ] Update the update function to use new wide data.
- [ ] Update the add function to use new wide data.
- [ ] Test all the api routes with new wide data.
- [ ] Finish the pern tutorial.
- [x] Update database tables.
- [ ] The update routes need to be tested.
- [ ] Get a copy of the original idioms_nonum.csv file to put in the repo

## Log

3-21-24:

- [x] Deleted `idioms_old`. This table was where the id started at 363 instead of 0.
- [x] Deleted `idioms_test`. This table was were I initially tested the crud operations.
- [x] Deleted `idioms`. This table was the original complete table. Only id, title_old, and title_new
- [x] Deleted `idioms_wide`. This table was the original complete table with dates and names.
- [x] Created `idioms`, `idioms_test`, `idioms_backup`. These tables are all copies of `idioms_wide`.
