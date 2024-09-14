## IdiomVault story

### Ordering

I really wanted to preserve the ordering of the idioms. Since every one of them was thought up by me and my friends, family, It is really cool to see when an idiom was added to the list. I am using a TIMESTAMP for each idiom to keep track of when they where added to the list.

## Initial data

All the dates and contributor names were manually added by going through my text messages with each person who sent me an idiom. The first `n` seconds of a given day are assigned to the first `n` idioms that were sent to me that day. This is how the idioms are sorted. So if I ever need to go back and add an idiom on a given day there will be plenty of 'room' for it.

The list had grown to over 1000 idioms before I decided to add to add any extra related data besides the idiom itself.

The timestamp was the first thing I added as I needed a way to preserve the sorting. As I was getting the timestamp for each one, I figured I might as well add the contributor of the idiom too. Since that's also kind of fun to know.

### Idiom Definitions

At this point I actually have 'data' and not just a list of phrases.

Im storing list in a CSV file. I soon start to think of what else I could add to the table. Naturally, I decide to add a definition column. After adding a few by hand I quickly realize that this is going to be an insane grind of a task so I create a web-scraper to do at least most of the job for me. I bet grabbed definitions for 80 percent of them, so thats cool.

### Front-end, back-end

Around this point created a PostgreSQL database and stored all of this in a table. I also created a front-end using React to spin up on my computers localhost to view, and eventually edit, the data.

### Idiom examples

After that I decided to add a list of example sentences for each idiom. I decided to store these in a separate table and linking them by id, since I could have many examples per idiom. For this I definitely need the help of a web-scraper. I took me a couple iterations, and some searching for the right host sites, to get one going that would grab enough info to be worth it. In the end I got about 75% of the example sentences with the scraper.

### Cleaning the data

At this point, after trying to export some tables to CSV as a backup, I realize that the formatting of my data is all messed up an very inconsistent, especially since so much of my data was taken from various places online. For example, many of the example sentences have nested quotation marks. Some were double, some were single, some were backticks, some were unicode, etc. Also other punctuation symbols like apostrophes were sometimes unicode, sometimes single quotes, etc. Fixing this was kind of a nightmare. I ended up using a lot of VIM macros and a lot of SED commands.

### My goal

Eventually my goal is to have a website that anyone I know can use to see the idiom list, and add / edit the idioms. To do this, Ive decided Im going to use cloud provider Supabase to host the database, and Vercel to host the front end for the website.

Im gong to implement a authentication system using Auth0 so that anyone can sign up so view the idioms, but edit permissions will be invite only. I will use a validation code to control who can have edit permissions.

### Cloud database

After getting the 'website' working with a local database and a react front-end. I decided to migrate the database to Supabase.

### Idiom origins

Next I want to create a table to store the origin of each idiom. Ive decided to store this data in the database as text marked up using Markdown. Then when I render it on the front-end I can build it back up with headers, sub-headers, block-quotes, etc. Im definitely going to want to make another scraper for this too.

I think Im going to want a way to edit the table as JSON data so that I can have it formatted as nice as possible as I edit it. I think I may have to write a script to convert from JSON to CSV and vis versa.

### Sorting

The idioms in in the database can be sorted chronologically using the timestamp field. The timestamp represents when the idiom was added to the list. For the first 1080 idioms the id field also perfectly corresponds to the chronological ordering.

### Backups

The backup of the data is located in /idioms-app/data. This contains the .csv files for each table and also a .sql file which is a complete backup of the database.

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
    timestamps TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
