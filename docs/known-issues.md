# Known Issues / Technical Debt

## 1. Frontend State Duplication

### Problem

Idiom data is fetched in multiple places:

- `IdiomTableView`
- `DetailPage`
- `idiomsContext` (partially unused)

### Risk

- Inconsistent UI state
- Duplicate logic
- Harder to maintain and reason about

---

## 2. Inconsistent Backend Validation

### Problem

- Requests endpoints validate input
- Idiom create/update endpoints accept raw input

### Risk

- Invalid or malformed data
- Potential security issues

---

## 3. Non-Transactional Updates

### Problem

- `updateExamples` performs multiple writes without a transaction

### Risk

- Partial updates if a failure occurs mid-operation
- Database inconsistency

---

## 4. Inconsistent Error Handling

### Problem

- Most controllers use a shared error handler
- Some endpoints return raw error messages

### Risk

- Leaking internal errors
- Inconsistent API responses

---

## 5. Search Scalability

### Problem

- Search queries rely on full-table scans and ranking
- No active search indexes
- `pg_trgm` migration exists but is unused

### Risk

- Performance degradation as data grows

---

## 6. Hardcoded Client Configuration

### Problem

- Auth0 config values are embedded in frontend code

### Risk

- Difficult environment management
- Harder to rotate or secure configuration

---

## Summary

The application is structurally sound but has:

- some frontend state inconsistencies
- gaps in backend validation
- missing transactional guarantees
- future performance risks in search

These issues are good candidates for incremental refactoring.

## Structural Risks And Cautions

### 1. Split Frontend Data Ownership

The idiom list, idiom detail page, and `IdiomsContext` each manage overlapping idiom data differently.

Implications:

- higher risk of stale UI after mutations
- duplicated fetch logic
- harder-to-reason-about state flow

Agent guidance:

- before introducing more idiom state, decide whether the change belongs in:
  - page-local state
  - context
  - a future centralized data-fetching layer
- avoid adding a fourth state ownership pattern

### 2. Uneven Backend Validation

`requestsController` uses Zod validation and sanitization, but idiom create/update/example/origin routes largely trust request bodies.

Implications:

- inconsistent API behavior
- weaker data integrity
- more room for malformed writes

Agent guidance:

- if touching idiom write endpoints, prefer adding explicit schemas instead of extending implicit request-body assumptions

### 3. Non-Transactional Multi-Row Updates

`updateExamples` updates examples in a loop without a transaction.

Implications:

- partial writes are possible if one update fails mid-request

Agent guidance:

- use transactions for multi-step write paths

### 4. Inconsistent Error Handling

Most controllers use the shared `handleError(...)`, but `upsertOrigin` currently returns raw error details.

Implications:

- inconsistent API shape
- possible leakage of internal details

Agent guidance:

- preserve or improve the shared error-handling pattern
- do not add new endpoints that expose raw DB errors unless explicitly required

### 5. Search And Query Scalability

The idiom list path computes ranking/count metadata with CTE-heavy SQL. The baseline schema does not include the main search indexes, and an index migration exists under `unused/`.

Implications:

- performance may degrade as idiom volume grows
- `ILIKE` and origin-text search may become expensive

Agent guidance:

- be careful when expanding list queries
- consider indexes before broadening search behavior
- avoid adding extra per-row queries on the list path

### 6. Hardcoded Auth Configuration In Client

Auth0 domain, client ID, and audience are currently embedded in frontend code.

Implications:

- environment separation is weaker than it should be
- production/dev/test config drift is easier to introduce

Agent guidance:

- prefer env-driven config for any new auth-related settings
