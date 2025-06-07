# Things to E2E test

## Public (Unauthenticated) User Flows

### publicFlows.spec.ts

- [x] Can visit the homepage
- [x] Can view idiom detail pages (including examples)
- [x] Can click idiom to view detail page
- [ ] Can browse paginated idioms
- [ ] Can search and filter idioms
- [ ] Cannot see "Add Idiom" on homepage or "“Edit” buttons on detail pages
- [ ] Cannot access Add or Edit endpoints directly (expect 401)

## Logged-in Non-Admin User Flows

### nonAdminFlows.spec.ts

- [ ] Can log in successfully
- [ ] Can view idioms list and details
- [ ] Cannot access or see “Edit”, “Add”, or “Delete” buttons
- [ ] Cannot visit /add, /edit, or similar protected routes directly
- [ ] Cannot perform POST/PUT/DELETE actions on idioms or examples

## Admin User Flows

### adminFlows.spec.ts

- [x] Can log in successfully
- [x] Can add a new idiom via the “Add Idiom” modal
- [x] Can submit Add Idiom form
- [x] Added idiom appears in idioms table
- [x] Can navigate to detail page for added idiom
- [x] Can delete idiom
- [x] Can delete an idiom with confirmation
- [x] Deleted idiom disappears from list
- [ ] Can edit an idiom and update its timestamp
- [ ] Can add an example to an idiom
- [ ] Can update multiple examples
- [ ] Can delete individual examples
- [ ] Gets feedback via toast alerts (success, error)
- [ ] Can open Edit Idiom modal and update fields
- [ ] Can open Edit Examples modal:
- [ ] Update existing examples
- [ ] Delete examples
- [ ] Add new example

## Navigation and State Preservation

### navigationState.spec.ts

- [ ] Can paginate and maintain state when navigating to an idiom and clicking “Back”
- [ ] Can sort and filter, click into an idiom, and still see filters preserved on return (if expected)
- [ ] Can open modals and close them without side effects

## Auth0-related Flows

### authFlows.spec.ts

- [ ] Redirects to login when accessing a protected page
- [ ] Logged-in users see correct navbar state (login/logout, user avatar)
- [ ] Logout returns user to public state

## Visual/Functional Smoke Tests

### uiSmoke.spec.ts

- [ ] Modals open and close correctly
- [ ] Responsive layout on mobile (if you want to cover it)
- [ ] Dropdowns work as expected (column selector, items per page, etc.)
- [ ] Sorting works across columns
- [ ] Pagination remembers current page on back navigation
- [ ] Date picker input works across devices/browsers
- [ ] Validation errors are shown when submitting incomplete forms
- [ ] Slow network conditions don’t break UI
