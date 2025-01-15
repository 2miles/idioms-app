## Ideas

- [ ] Add iPhone notes and texts idioms to to_add.md
- [ ] Saving user preferences for column visibility.
- [ ] Fix If changing the sorting direction of one of the table columns. Go back to pagination page 1.

## Learning

- [ ] Figure out why and how to use Postman. debugging with postman?
- [ ] Finish the pern tutorial.
- [ ] Refresh on why and where I'm using the Context API and how it works. Is it needed in this case.

# Known issues

- [x] Bug: Mobile runtime error when tapping on search bar.
  - This was fixed by migrating from Create React App to Vite.

## New

- [ ] Create loading spinner for detail page.
- [ ] Create loading spinner for main page?
- [ ] Add vocabulary table in db.
- [ ] Add vocab_definition table in db too.
- [ ] Add vocabulary table page
- [ ] Create User authentication and user profiles
- [x] Add ability to add and remove example sentences

- [x] Fix bug: When there is no data to display, and the screen is small, the table headers are all messed up.

  - The order column is very squished, causing overflow and overlaping.
  - The idiom and order columns are not fulling up the width of the table.

- [x] Convert Add Idiom and Edit Idiom to pop-up windows.
  - [x] Move the edit button to the top of the detail page.
  - [x] Research a good design, or good design examples
  - [x] Decide whether or not to blur the background

I think I'm going to scrap any plans of using dealing with the origins of idioms in the app for now. Its just too much to deal with the legality / copy write issues that it could cause down the road.

Instead Im going to focus on these new features instead:

- User Interface imporvments: new form design
- User Authentication and profiles
- Tagging system
- Vocabulary section
  - Going to need a vocab_words table, and a vocab_definitions table

If you exclude the database, document how users should set it up (e.g., installing PostgreSQL locally or using a cloud-hosted service like Supabase).

Provide a schema.sql file for initializing the database.

## Tagging Idioms

### SQL for fetching tags for a given idiom

```sql
SELECT t.name
FROM tags t
JOIN idiom_tags it ON t.id = it.tag_id
WHERE it.idiom_id = 123;
```

### SQL for finding idioms by tag

```sql
SELECT i.*
FROM idioms i
JOIN idiom_tags it ON i.id = it.idiom_id
JOIN tags t ON it.tag_id = t.id
WHERE t.name = 'funny';
```

### Adding Tags Algorithm:

- Check if the tag exists in the tags table.
- If not, insert it.
- Insert a record in the idiom_tags table linking the idiom and the tag.

### Proposed table schema

Stores unique tags:

```sql
CREATE TABLE idiom_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
```

Associates tags with idioms (many-to-many relationship)

```sql
CREATE TABLE idiom_tags (
    id SERIAL PRIMARY KEY,
    idiom_id INTEGER REFERENCES idioms(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(idiom_id, tag_id) -- Prevent duplicate associations
);
```

### Ideas

- Allow selecting tags from a predefined list (if you want control over the tags).
