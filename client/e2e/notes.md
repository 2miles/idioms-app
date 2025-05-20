## Public (Unauthenticated) User Flows

### publicFlows.spec.ts

- [x] Can visit the homepage
- [ ] Can browse paginated idioms
- [ ] Can search and filter idioms
- [ ] Can view idiom detail pages (including examples)
- [ ] Cannot see “Edit” buttons on detail pages

## Logged-in Non-Admin User Flows

### nonAdminFlows.spec.ts

- [ ] Can log in successfully
- [ ] Can view idioms list and details
- [ ] Cannot access or see “Edit”, “Add”, or “Delete” buttons
- [ ] Cannot visit /add, /edit, or similar protected routes directly

## Admin User Flows

### adminFlows.spec.ts

- [ ] Can log in successfully
- [ ] Can add a new idiom via the “Add Idiom” modal
- [ ] Can edit an idiom and update its timestamp
- [ ] Can delete an idiom with confirmation
- [ ] Can add an example to an idiom
- [ ] Can update multiple examples
- [ ] Can delete individual examples
- [ ] Gets feedback via toast alerts (success, error)

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
