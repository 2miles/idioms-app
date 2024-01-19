# Notes to myself

- Im just going to use the serial primary key to hold the sequential nature of the list.

  - Now I think om going to use a date column to keep the order.
  - This means that im going to have to create a csv file with fake dates running down the column in increasing order. Starting with the date the idiom list started. This also means that i am going to eventually need to fill in the dates for each idiom. This will be easiest if i just input the dates into the csv then import the csv to a posgres table.

- The idioms csv being used is ~/Dev/python/idioms/idioms_nonum.csv

## Environment

PERN Stack

Database

- pgadmin
- psql cli

- idiom_db tables: idioms_test, idioms

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

```sql
COPY your_table_name(title_old, title_new, definition)
FROM '~/Dev/python/idioms/idioms_nonum.csv'
DELIMITER ','
CSV HEADER;
```

```sql
COPY idioms_wide(title_old, title_new, definition, day, owner)
FROM '~/Dev/python/idioms/idioms_nonum_new_data.csv'
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

## Todo

- [ ] Update database:
  - [ ] Rename `idioms_test` table to `idioms_test_bad`
  - [ ] Copy `idioms` to `idioms_test`
  - [ ] Delete `idioms_test_bad`
- [ ] Finish the PERN tutorial
- [ ] Test all the api routes

## Old Todo

- [ ] The update routes need to be tested.
- [ ] Make a copy of idioms_test postgres table just incase
- [ ] Get a copy of the original idioms_nonum.csv file to put in the repo

##

To create a new table and link it up to the code here: https://www.youtube.com/watch?v=J01rYl9T3BU&t=14130s
The time is 4:40

2023-07-14, eve
That cuts the mustard
No such thing as free lunch

2023-07-14, eve
Takes the cake
Mountain out of a molehill
The cheese stands alone
3s a crowd
Watch a pot it never boils
speak of the devil and he shall appear

2023-07-16, eve
comparison is the theif of joy
