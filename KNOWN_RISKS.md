# KNOWN RISKS

Read this file before making structural or cross-cutting changes.

## Summary

The application is structurally sound, but the main recurring risks are:

- frontend state duplication and inconsistent ownership
- uneven backend validation on write paths
- missing transactional guarantees for some multi-step updates
- inconsistent error behavior across endpoints
- search/query performance degradation as data volume grows
- hardcoded client auth configuration

These are good candidates for incremental refactoring rather than one large rewrite.

## 1. Split Frontend Data Ownership

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
- avoid adding another ownership pattern

## 2. Uneven Backend Validation

`requestsController` uses Zod validation and sanitization, but idiom create/update/example/origin routes largely trust request bodies.

Implications:

- inconsistent API behavior
- weaker data integrity
- more room for malformed writes
- potential security issues

Agent guidance:

- if touching idiom write endpoints, prefer adding explicit schemas instead of extending implicit request-body assumptions

## 3. Non-Transactional Multi-Row Updates

`updateExamples` updates examples in a loop without a transaction.

Implications:

- partial writes are possible if one update fails mid-request
- database inconsistency

Agent guidance:

- use transactions for multi-step write paths

## 4. Inconsistent Error Handling

Most controllers use the shared `handleError(...)`, but `upsertOrigin` currently returns raw error details.

Implications:

- inconsistent API shape
- possible leakage of internal details

Agent guidance:

- preserve or improve the shared error-handling pattern
- do not add new endpoints that expose raw DB errors unless explicitly required

## 5. Search And Query Scalability

The idiom list path computes ranking/count metadata with CTE-heavy SQL. The baseline schema does not include the main search indexes, and an index migration exists under `unused/`.

Implications:

- performance may degrade as idiom volume grows
- `ILIKE` and origin-text search may become expensive

Agent guidance:

- be careful when expanding list queries
- consider indexes before broadening search behavior
- avoid adding extra per-row queries on the list path

## 6. Hardcoded Auth Configuration In Client

Auth0 domain, client ID, and audience are currently embedded in frontend code.

Implications:

- environment separation is weaker than it should be
- production/dev/test config drift is easier to introduce

Agent guidance:

- prefer env-driven config for any new auth-related settings
