# Architecture Overview

## System Overview

This is a full-stack web application composed of:

- **Frontend**: React + TypeScript (Vite)
- **Backend**: Node.js + Express
- **Database**: PostgreSQL (Supabase)

The system follows a classic client-server architecture where the frontend communicates with a REST API backend, which interacts with a relational database.

---

## Frontend Architecture

### Entry Point

- `main.tsx` initializes:
  - Auth0 provider
  - User context
  - Idioms context
  - React Router

### Routing

- Defined in `App.tsx`
- Main routes:
  - Home (table view)
  - Detail page
  - Requests page

### State Management

The frontend uses a mix of:

- **URL-driven state** (primary for table view)
  - pagination
  - sorting
  - search/filtering

- **Local component state**
  - detail page data
  - request page data

- **Context (partial usage)**
  - `idiomsContext`
  - `userContext`

⚠️ Note: Data-fetching is currently distributed across components and not fully centralized.

---

## Backend Architecture

### Server Entry

- `server.ts` initializes Express app

### Route Groups

- `/api/v1/idioms`
- `/api/v1/requests`
- `/api/v1/me/settings`

### Structure

- **Routes** → define endpoints
- **Controllers** → handle request logic
- **Query layer** → builds SQL and interacts with DB

Controllers are relatively thin and delegate most logic to query builders.

---

## Database Architecture

### Connection

- Shared PostgreSQL connection pool

### Core Tables

- `idioms`
- `idiom_examples`
- `idiom_origins_ai`
- `requests`
- `user_settings`

### Query Behavior

- Filtering and search logic is constructed dynamically
- Pagination uses:
  - main query (data)
  - separate count query

---

## Data Flow

### 1. Idiom List (Table View)

Frontend:

- `IdiomTableView`
- Reads state from URL params
- Sends request to:
  - `GET /api/v1/idioms`

Backend:

- Controller validates query params
- Builds SQL filters
- Executes:
  - paginated query
  - count query

Database:

- Queries `idioms`
- May join or filter against `idiom_origins_ai`

Response:

```json
{
  "idioms": [...],
  "totalCount": number
}
```

### 2. Idiom Detail

Frontend:

- DetailPage
- Fetches individual idiom

Backend:

- Fetches:
  - `idiom`
  - `examples`
  - `origin`

Database:

- Reads from:
- `idioms`
- `idiom_examples`
- `idiom_origins_ai`

### 3. Authenticated Mutations

Frontend:

- Retrieves Auth0 token
- Sends Authorization: Bearer <token>

Backend:

- JWT validation middleware
- Role-based access control

Controllers:

- Perform inserts/updates directly against DB

### 4. User Settings (Theme)

Frontend:

- Fetch: GET /api/v1/me/settings
- Update: PUT /api/v1/me/settings

Backend:

- Upserts into user_settings
