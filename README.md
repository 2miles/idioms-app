# IdiomVault

A full-stack web app for exploring, searching, and managing a curated collection of idioms.

## Quick Start

```bash
git clone https://github.com/2miles/idioms-app.git
cd idioms-app

cp server/.env.example server/.env
cp server/.env.test.example server/.env.test
cp client/.env.example client/.env
cp client/.env.test.example client/.env.test

npm install
npm install --prefix client
npm install --prefix server

npm start
```

App URLs:

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`

## Features

- Authenticated user profiles with role-based permissions
- Searchable, sortable, paginated idiom table
- Idiom detail pages with definitions and examples
- Admin CRUD for idioms
- Mobile-friendly responsive UI

## Tech Stack

- Frontend: React, TypeScript, Vite, Styled Components
- Backend: Express, TypeScript, PostgreSQL
- Auth: Auth0
- Testing: Vitest, Testing Library, Playwright
- Tooling: Docker Compose, ESLint

## Prerequisites

- Node.js 18+
- npm 9+
- Auth0 tenant (or compatible OIDC provider)
- PostgreSQL database
- Docker + Docker Compose (optional)

## Environment Setup

Copy env templates:

```bash
cp server/.env.example server/.env
cp server/.env.test.example server/.env.test
cp client/.env.example client/.env
cp client/.env.test.example client/.env.test
```

Update values with your credentials:

| Variable                                 | File(s)                           | Purpose                               |
| ---------------------------------------- | --------------------------------- | ------------------------------------- |
| `DATABASE_URL_DEV`                       | `server/.env`                     | Dev database connection               |
| `DATABASE_URL_TEST` (or test equivalent) | `server/.env.test`                | Test database connection              |
| `AUTH0_AUDIENCE`                         | `server/.env`, `server/.env.test` | API audience validation               |
| `AUTH0_ISSUER_BASE_URL`                  | `server/.env`, `server/.env.test` | JWT issuer validation                 |
| `VITE_API_BASE_URL`                      | `client/.env`, `client/.env.test` | Frontend API target                   |
| `VITE_APP_ENV`                           | `client/.env`, `client/.env.test` | UI environment banner (`dev`, `test`) |

Recommended local values:

- `client/.env`: `VITE_API_BASE_URL=http://localhost:3001`
- `client/.env.test`: `VITE_API_BASE_URL=http://localhost:3010`

## Local Postgres (Optional)

If you prefer local PostgreSQL instead of a hosted database, add a `db` service to your existing `docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:15
    ports:
      - '5433:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: idioms_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Then point your dev backend connection to that local instance in `server/.env`:

```conf
DATABASE_URL_DEV=postgresql://postgres:postgres@localhost:5433/idioms_db
```

To start only the database service:

```bash
docker compose up db -d
```

## Running the App

### Option A (Recommended): Local Dev

Install dependencies:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Start frontend + backend together:

```bash
npm start
```

### Option B: Docker Compose

```bash
docker-compose build
docker-compose up
```

Stop containers:

```bash
docker-compose down
```

## Testing

### Unit and Integration (Client)

```bash
npm run test --prefix client
```

Other test scripts:

- `npm run test:watch --prefix client`
- `npm run test:coverage --prefix client`
- `npm run test:ui --prefix client`
- `npm run test:verbose --prefix client`

### End-to-End (Playwright)

Test mode uses isolated ports and env files:

- Backend: `http://localhost:3010`
- Frontend: `http://localhost:5174`

Start only test-mode servers:

```bash
npm run test:stack
```

Run full E2E suite:

```bash
npm run test:e2e --prefix client
```

Run E2E in UI mode:

```bash
npm run test:e2e:ui --prefix client
```

### Test DB Reset

```bash
npm run test:reset --prefix server
```

This recreates and reseeds the test database.

### Auth State for E2E

Set test credentials in `client/e2e/.env`:

```conf
TEST_ADMIN_EMAIL=admintest@example.com
TEST_ADMIN_PASSWORD=supersecret
TEST_USER_EMAIL=usertest@example.com
TEST_USER_PASSWORD=supersecret
```

Generate auth state files:

```bash
npx tsx client/e2e/global.setup.ts
```

Expected files:

- `client/e2e/.auth/admin.json`
- `client/e2e/.auth/user.json`

## Database and Migrations

IdiomVault uses SQL-based migrations.

Principles:

- Dev and prod use forward-only migrations
- Test/CI databases are rebuilt from scratch
- Never edit already-applied migrations
- Always create a new migration for schema changes

Run migrations (dev):

```bash
set -a && source server/.env && set +a
MIGRATION_ENV=dev ./server/scripts/migrate.sh
```

Run migrations (prod):

```bash
MIGRATION_ENV=prod DATABASE_URL="postgresql://..." ./server/scripts/migrate.sh
```

## Deployment

- Backend: deploy to any Node-compatible host (Railway, Render, Fly.io, etc.)
- Frontend: deploy to static hosting (Vercel, Netlify, etc.)
- Configure environment variables based on the provided `.env.production.example` files

## Scripts Reference

Root:

- `npm start` - run frontend and backend concurrently
- `npm run test:stack` - run frontend/backend in test mode

Client:

- `npm run dev --prefix client`
- `npm run build --prefix client`
- `npm run test --prefix client`
- `npm run test:e2e --prefix client`

Server:

- `npm run dev --prefix server`
- `npm run build --prefix server`
- `npm run test:reset --prefix server`

## Troubleshooting

- Auth0 errors (`401`, invalid issuer/audience): verify `AUTH0_AUDIENCE` and `AUTH0_ISSUER_BASE_URL` in server env files.
- Frontend cannot reach API: confirm `VITE_API_BASE_URL` matches active backend port.
- E2E login failures: regenerate auth state via `npx tsx client/e2e/global.setup.ts`.
- Port already in use: free ports `5173`, `5174`, `3001`, or `3010`, or change config.

## Contributing

1. Create a feature branch.
2. Run relevant tests locally.
3. Open a PR with clear notes/screenshots for UI changes.

- CI runs unit and E2E tests automatically on PRs to `main`.
- E2E requires configured repository secrets in GitHub Actions.

## License

ISC
