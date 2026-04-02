# AGENTS

## Purpose

This repository is a full-stack idioms application with:

- `client/`: React + TypeScript + Vite SPA
- `server/`: Express + TypeScript API
- `PostgreSQL`: primary persistence layer
- `Auth0`: authentication and role-based authorization

Read this file first for repository shape and data flow. For structural cautions and known risks, also read `KNOWN_RISKS.md`.

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
  - `staging_scrapes`

## Key Data Flow

### Idiom List Flow

1. `client/src/components/IdiomTableView/IdiomTableView.tsx` derives list state from URL query params.
2. The client calls `GET /api/v1/idioms` with page, limit, search, sort, and letter filters.
3. `server/src/controllers/idiomsController.ts#getAllIdioms` validates params and builds SQL fragments.
4. `server/src/queries/idioms.ts` builds the paginated idiom query and the total count query.
5. PostgreSQL returns idiom rows and count.
6. The frontend renders the table and pagination state.

### Idiom Detail Flow

1. `client/src/routes/DetailPage.tsx` loads a single idiom from `GET /api/v1/idioms/:id`.
2. `server/src/controllers/idiomsController.ts#getSingleIdiomWithExamples` reads:
   - the idiom row with derived position
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

## Working Conventions For Agents

- Read `README.md` for setup and run details if you need to boot the project.
- Prefer `rg` for code search.
- Treat the repository as potentially dirty; do not revert unrelated user changes.
- Preserve route contracts unless coordinating both client and server.
- Prefer small, contained changes over opportunistic refactors.
- When touching list, detail, or mutation flows, check whether the same data is also represented in context or URL state.
- Read `KNOWN_RISKS.md` before making structural changes.

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
