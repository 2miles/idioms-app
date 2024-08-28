## TODO

## General

- [ ] Refresh on why and where I'm using the Context API and how it works. Is it needed in this case.
- [ ] Add iPhone notes idioms to this readme right above this todo.
- [ ] Comment out the idiom scraper and document it. Like what it does and how to use it. Add it to the repo.
- [x] go through and clean up the READMEs.
- [ ] Finish the pern tutorial.
- [x] Get a copy of the original idioms_nonum.csv file to put in the repo

### Testing

- [ ] Figure out why and how to use Postman
- [x] Test all the api routes with new wide data.

### Server

### Client

- [x] Add pagenation feature
- [x] fix updateIdiom.jsx !!!

## Log

3-21-24:

- [x] Deleted `idioms_old`. This table was where the id started at 363 instead of 0.
- [x] Deleted `idioms_test`. This table was were I initially tested the crud operations.
- [x] Deleted `idioms`. This table was the original complete table. Only id, title_old, and title_new
- [x] Deleted `idioms_wide`. This table was the original complete table with dates and names.
- [x] Created `idioms`, `idioms_test`, `idioms_backup`. These tables are all copies of `idioms_wide`.
- [x] Update database tables.

4-4-24

- [x] Finish making the sorting buttons for the idiom list frontend.
- [x] in list view make the rows clickable and remove the edit and delete buttons from list view.
- [x] make the idiom list click to the detail view.
- [x] make the detail view contain the edit and delete buttons.
- [x] make a backup of the idioms_wide database and rename it.

5-23-24

- [x] I am able to add an idiom with no title. Why? Fix that.
- [x] The Page does not refresh when an idiom is added.
- [x] Somehow test the error and loading state variables in the addIdiom context.

7-18-24

- [x] Eventually remove the id column from the table
- [ ] fix the delete functionality so that it prompts 'are you sure'
- [ ] Go back to HomePage after deletion, with 5 second 'deletion successful message'
- [x] Make teh Detail page look better. Use a card.
- [x] Change the name of the header labels. title -> idiom, definition -> meaning
- [x] Create edit functionallity.
- [ ] Fix If changing the sorting direction of one of the table columns. Go back to pagination page 1.
- [ ] Fix Column show dropdown is behind selected pagination page link when table is very short .
