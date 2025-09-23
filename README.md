# Idioms App

## Overview

**IdiomVault** is a web app for exploring and managing a curated list of idioms.

## Features

- User profiles with authentication and role-based permissions
- Searchable, sortable, paginated idiom table
- Detail pages for each idiom with definitions and examples
- Admins can add, edit, and delete idioms
- Mobile-friendly design

## Tech Stack

### Frontend

- **React 18** with **TypeScript**
- **Vite** for fast dev builds and HMR
- **Styled Components** for scoped styling
- **Auth0** via `@auth0/auth0-react` for authentication
- **React Router DOM** for SPA routing
- **Axios**, `jwt-decode`, `moment`, `react-datetime`, `sweetalert2`, etc. for supporting features
- **Vitest**, **Testing Library**, and **Playwright** for unit, integration, and E2E testing

### Backend

- **Express.js** (TypeScript)
- **PostgreSQL** (via Supabase or local Docker)
- **Auth0 JWT Middleware** for protected routes (`express-oauth2-jwt-bearer`)
- **CORS**, **dotenv**, **morgan**, **pg** for core server functionality
- Scripts and config for local `.env`, test env (`env-cmd`), and database resets

### Tooling

- **Monorepo** with shared root scripts
- **Docker Compose** for local Postgres (optional)
- **Concurrently** for parallel dev server launch
- **ESLint** with React + TypeScript configs

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) + Docker Compose (optional, for local DB)
- A remote PostgreSQL database (e.g. Supabase, Railway, Render)
- An Auth0 tenant (or another OpenID-compliant identity provider)

## Setup Instructions

### 1. Clone the Repository:

```bash
git clone https://github.com/2miles/idioms-app.git
cd idioms-app
```

### 2. Setup environment variables

Copy example .env files for both the server and client:

```bash
cp server/.env.example server/.env
cp server/.env.test.example server/.env.test

cp client/.env.example client/.env
cp client/.env.test.example client/.env.test

```

Then update the values using your own credentials:

- **Remote Database**:
  - Get your connection string from your hosting provider (e.g. Supabase, Railway, Render)
- **Auth0**:
  - Use your tenant’s API settings to fill in `AUTH0_AUDIENCE` and `AUTH0_ISSUER_BASE_URL`
- **VITE_API_BASE_URL** (in both `client/.env` and `client/.env.test`):
  - For local dev: http://localhost:3001
  - For test runs: http://localhost:3010

VITE_APP_ENV controls the banner in the UI (e.g. dev or test).

## Running the program

### Option A: Run with Docker

To run both the frontend and backend in development containers (with hot reload):

```bash
docker-compose build
docker-compose up
```

To stop the containers:

```bash
docker-compose down
```

### 🧠 Bonus suggestions (optional):

If you want to run Postgres locally (instead of using a remote database), you could add:

```yaml
  db:
    image: postgres:15
    ports:
      - "5433:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: idioms_db
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

And update your .env with:

```conf
DATABASE_URL_DEV=postgresql://postgres:postgres@localhost:5433/idioms_db
```

## Option B: Running the program manually

### Install Dependencies

In root `/`, `client/`, and `server/` run:

```bash
npm install
```

### Start the development server

From the root folder

```bash
npm start
```

This runs both the frontend (Vite) and backend (Express) concurrently.

- Frontend: http://localhost:5173
- API: http://localhost:3001

## Running Tests

### Unit & Integration Tests

The client uses [Vitest](https://vitest.dev/) for unit and integration testing.

To run the test suite:

```bash
npm run test --prefix client

# or
cd client
npm run test
```

Other available scripts:

- `test:watch`
- `test:coverage`
- `test:ui`
- `test:verbose`

### e2e tests (Playwright)

The app is run in **test mode** on different ports for end-to-end (E2E) testing.

- Backend [http://localhost:3010](http://localhost:3010)
- Frontend [http://localhost:5174](http://localhost:5174)

These use `.env.test` files to isolate test settings.

```bash
# Start the test servers only:
npm run test:stack

# Start test-mode servers and run Playwright tests:
npm run test:e2e

# Run Playwright in interactive UI mode:
npm run test:e2e:ui
```

The test environment is functionally identical to dev mode, but uses:

- Isolated ports (3010, 5174)
- Dedicated .env.test files
- A separate test database
- A visible “TEST” banner in the UI (VITE_APP_ENV=test)

This setup prevents accidental interactions with dev or production data.

## Test Environment Setup

Before running E2E tests, make sure you've set up your .env.test files:

```bash
cp server/.env.test.example server/.env.test
cp client/.env.test.example client/.env.test
```

### Resetting the Test Database

The backend connects to a dedicated test PostgreSQL database as defined in server/.env.test.

To ensure the test database is populated before testing, run:

```bash
npm run test:reset --prefix server
```

This script:

- Drops and recreates test tables (if necessary)
- Seeds the database with test data.

You can run this script manually at any time to restore a clean testing state.

### Auth State for E2E Tests

Playwright E2E tests rely on pre-populated storage state files for test accounts:

- `client/e2e/.auth/admin.json`
- `client/e2e/.auth/user.json`

These files contain login cookies + tokens for your test admin and test user accounts in Auth0.

To generate them, add your test account credentials to `client/e2e/.env`:

```conf
TEST_ADMIN_EMAIL=admintest@example.com
TEST_ADMIN_PASSWORD=supersecret
TEST_USER_EMAIL=usertest@example.com
TEST_USER_PASSWORD=supersecret
```

Then run:

```bash
# one-time setup to populate .auth files
npx tsx client/e2e/global.setup.ts
```

## Deployment

You can deploy the backend to any Node-compatible cloud host (e.g. Railway, Render, Fly.io) and the frontend to Vercel, Netlify, or another static host.

Environment variables should be set based on `.env.production.example` files.
