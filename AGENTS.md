# AGENTS.md

## Purpose

This repository is a full-stack idioms application with:

- `client/`: React + TypeScript + Vite SPA
- `server/`: Express + TypeScript API
- `PostgreSQL`: primary persistence layer
- `Auth0`: authentication and role-based authorization

Use this file as the default orientation document before making changes.

## High-Level Architecture

### Frontend

- Entry point: `client/src/main.tsx`
- Top-level app shell and routes: `client/src/App.tsx`
- Main routes:
  - `/`: idiom list and search UI
  - `/idioms/:id`: idiom detail view
  - `/requests`: admin request-review UI
  - `/about`: informational page
- Providers mounted globally:
  - `AuthProvider`: Auth0 integration
  - `UserProvider`: auth-derived role state and theme state
  - `IdiomsContextProvider`: authenticated idiom mutation helpers and partial idiom state

### Backend

- Server entry: `server/src/server.ts`
- Route groups:
  - `/api/v1/idioms`
  - `/api/v1/requests`
  - `/api/v1/me/settings`
- Middleware:
  - CORS
  - JSON body parsing
  - Morgan request logging
  - JWT auth via `express-oauth2-jwt-bearer`
  - role checks
  - request rate limiting for request submissions

### Database

- Connection pool: `server/src/db/index.ts`
- Baseline schema: `server/src/db/migrations/001_baseline.sql`
- Primary tables:
  - `idioms`
  - `idiom_examples`
  - `idiom_origins_ai`
  - `requests`
  - `user_settings`
  - `staging_scrapes` (present in schema but not central to the current app flow)

## Key Data Flow

### Idiom List Flow

1. `client/src/components/IdiomTableView/IdiomTableView.tsx` derives list state from URL query params.
2. The client calls `GET /api/v1/idioms` with page, limit, search, sort, and letter filters.
3. `server/src/controllers/idiomsController.ts#getAllIdioms` validates params and builds SQL fragments.
4. `server/src/queries/idioms.ts` builds:
   - paginated idiom query
   - total count query
5. PostgreSQL returns idiom rows and count.
6. The frontend renders the table and pagination state.

### Idiom Detail Flow

1. `client/src/routes/DetailPage.tsx` loads a single idiom from `GET /api/v1/idioms/:id`.
2. `server/src/controllers/idiomsController.ts#getSingleIdiomWithExamples` performs three DB reads:
   - idiom row with derived position
   - related examples
   - optional origin row
3. The client composes those into one local detail object for rendering.

### Authenticated Mutation Flow

1. The frontend gets a bearer token through Auth0 hooks.
2. Authorized Axios clients are created in:
   - `client/src/apis/useAuthorizedIdiomFinder.ts`
   - `client/src/apis/useAuthorizedRequestFinder.ts`
3. Protected API routes enforce:
   - `jwtCheck`
   - `checkRole(...)`
4. Controllers execute SQL directly through the shared PG pool.

### User Theme Flow

1. `client/src/hooks/useTheme.ts` reads local theme state first.
2. After login, it fetches `GET /api/v1/me/settings`.
3. The backend reads from `user_settings` keyed by Auth0 `sub`.
4. Theme updates call `PUT /api/v1/me/settings` and upsert the row.

## Important Implementation Notes

- The frontend uses URL query params as the source of truth for list state on the home page.
- The idiom list page fetches data directly rather than through a centralized data layer.
- The detail page also fetches independently.
- `IdiomsContext` exists, but its initial fetch is currently disabled and it mainly provides authenticated mutation helpers.
- Backend controllers are thin and generally call query-builder functions plus `pool.query(...)`.
- SQL is hand-written; there is no ORM.

## Working Conventions For Agents

- Read `README.md` first for run/test basics.
- Prefer `rg` for code search.
- Treat the repository as potentially dirty; do not revert unrelated user changes.
- Do not introduce broad architectural changes unless the task clearly calls for them.
- When touching list, detail, or mutation flows, verify whether the same data is also represented in context or URL state.
- Preserve route contracts unless coordinating both client and server.
- Prefer small, contained changes over opportunistic refactors.

## Repo-Specific Run And Test Commands

### Initial Setup

From the repo root:

```bash
cp server/.env.example server/.env
cp server/.env.test.example server/.env.test
cp client/.env.example client/.env
cp client/.env.test.example client/.env.test

npm install
npm install --prefix client
npm install --prefix server
```

### Start The App

Run frontend and backend together from the repo root:

```bash
npm start
```

Expected local URLs:

- frontend: `http://localhost:5173`
- API: `http://localhost:3001`

Run only one side if needed:

```bash
npm run start:client
npm run start:server
```

### Test-Mode Local Stack

Start the test frontend and backend together:

```bash
npm run test:stack
```

Expected test URLs:

- frontend: `http://localhost:5174`
- API: `http://localhost:3010`

### Lint

From the repo root:

```bash
npm run lint
```

### Client Unit And Integration Tests

```bash
npm run test --prefix client
```

Other useful client test commands:

```bash
npm run test:watch --prefix client
npm run test:coverage --prefix client
npm run test:ui --prefix client
npm run test:verbose --prefix client
```

### End-To-End Tests

Run the full Playwright suite:

```bash
npm run test:e2e --prefix client
```

Run Playwright in UI mode:

```bash
npm run test:e2e:ui --prefix client
```

### Reset Test Database

```bash
npm run test:reset --prefix server
```

### Backend-Only Dev Commands

```bash
npm run dev --prefix server
npm run dev:test --prefix server
```

### Frontend-Only Dev Commands

```bash
npm run dev --prefix client
npm run build --prefix client
npm run preview --prefix client
```

## Environment Notes

- The client expects `VITE_API_BASE_URL` to point at the backend.
- The server expects database connection variables in `server/.env` and `server/.env.test`.
- Auth0-backed flows need valid tenant/app configuration and test credentials for E2E.
- Test auth state generation uses:

```bash
npx tsx client/e2e/global.setup.ts
```

## Useful Starting Points

- Frontend boot: `client/src/main.tsx`
- Frontend routes: `client/src/App.tsx`
- Idiom list UI: `client/src/components/IdiomTableView/IdiomTableView.tsx`
- Detail page: `client/src/routes/DetailPage.tsx`
- Requests admin page: `client/src/routes/RequestsPage.tsx`
- Idiom state helpers: `client/src/context/idiomsContext.tsx`
- User/theme state: `client/src/context/userContext.tsx`
- Server entry: `server/src/server.ts`
- Idiom routes/controller/query layer:
  - `server/src/routes/idioms.ts`
  - `server/src/controllers/idiomsController.ts`
  - `server/src/queries/idioms.ts`
- Request routes/controller/query layer:
  - `server/src/routes/requests.ts`
  - `server/src/controllers/requestsController.ts`
  - `server/src/queries/requests.ts`
- User settings:
  - `server/src/routes/userSettings.ts`
  - `server/src/controllers/userSettingsController.ts`
- Auth middleware: `server/src/middleware/auth.ts`
- Schema: `server/src/db/migrations/001_baseline.sql`

## Known Issues / Technical Debt

For current architectural issues and technical debt, see:

- `docs/known-issues.md`

Agents should review this file before making non-trivial changes, especially when working in areas related to known risks.

## If You Need To Extend The System

- New frontend data flow:
  - prefer one clear source of truth
  - keep URL-backed list behavior intact unless intentionally redesigning it
- New backend endpoints:
  - add validation early
  - keep auth and role checks explicit
  - use consistent response envelopes
- New DB-backed features:
  - check whether they belong with existing idiom tables or should stand alone
  - consider indexes and transaction boundaries up front
