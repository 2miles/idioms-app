/**
 * Insert a new user-submitted idiom request.
 *
 * @returns Newly inserted request row.
 */
export function createRequestQuery(): string {
  return `
    INSERT INTO requests (title, contributor)
    VALUES ($1, $2)
    RETURNING *
  `;
}

/**
 * Fetch all idiom requests, optionally filtering out those already added.
 *
 * @param onlyUnadded - If true, returns only requests where added = false.
 * @returns SQL query string to fetch requests.
 */
export function getAllRequestsQuery(onlyUnadded: boolean): string {
  return onlyUnadded
    ? `SELECT * FROM requests WHERE added = false ORDER BY submitted_at DESC`
    : `SELECT * FROM requests ORDER BY submitted_at DESC`;
}

/**
 * Mark a request as added by ID.
 *
 * @returns Updated request row.
 */
export function markRequestAsAddedQuery(): string {
  return `
    UPDATE requests
    SET added = true
    WHERE id = $1
    RETURNING *
  `;
}

/**
 * Delete a request by ID.
 *
 * @returns Deleted request row.
 */
export function deleteRequestQuery(): string {
  return `
    DELETE FROM requests
    WHERE id = $1
    RETURNING *
  `;
}
