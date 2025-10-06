/**
 * Builds a SQL query to fetch a paginated and optionally filtered list of idioms,
 * ordered by any allowed field (e.g. timestamps DESC). Each idiom is assigned a
 * global position based on its true ranking in the full dataset, even when filters are applied.
 *
 * Query breakdown:
 * 1. `global_total`: counts all idioms (unfiltered).
 * 2. `ranked_all`: assigns a global row number to all idioms ordered by timestamp DESC.
 * 3. `filtered`: optionally filters the ranked idioms and calculates their global position using: (total + 1 - row_num).
 * 4. Final SELECT returns a page of idioms with their correct global positions.
 *
 * This allows users to search/sort idioms and still see the idiom's position in the full unfiltered list.
 */
export function buildIdiomsQuery(whereClause: string, sortField: string, sortOrder: string) {
  return `
      WITH global_total AS (
        SELECT COUNT(*) AS total FROM idioms
      ),
      ranked_all AS (
        SELECT *,
          ROW_NUMBER() OVER (ORDER BY timestamps DESC) AS row_num
        FROM idioms
      ),
      filtered AS (
        SELECT *,
          (SELECT total FROM global_total) + 1 - row_num AS position
        FROM ranked_all
        ${whereClause?.trim() ? `WHERE ${whereClause}` : ''}
      )
      SELECT *
      FROM filtered
      ORDER BY ${sortField} ${sortOrder}
      LIMIT $1 OFFSET $2;
    `;
}

/**
 * Builds a SQL query to count total idioms, optionally filtered by a search condition.
 * Used for pagination calculations.
 */
export function buildTotalCountQuery(totalWhereClause: string) {
  return totalWhereClause?.trim()
    ? `SELECT COUNT(*) AS total FROM idioms WHERE ${totalWhereClause}`
    : `SELECT COUNT(*) AS total FROM idioms`;
}

/**
 * Builds a SQL query to fetch a single idiom by ID, including its global position
 * based on timestamp DESC ordering.
 *
 * Query breakdown:
 * 1. `ranked_idioms`: assigns a row number to each idiom ordered by timestamps DESC.
 * 2. `total_count`: counts all idioms.
 * 3. `positioned_idiom`: joins the target idiom with its rank and the total to compute global position.
 * 4. Final SELECT returns the full idiom row plus its position.
 */
export function buildIdiomWithPositionQuery(): string {
  return `
      WITH ranked_idioms AS (
        SELECT id,
              ROW_NUMBER() OVER (ORDER BY timestamps DESC) AS row_num
        FROM idioms
      ),
      total_count AS (
        SELECT COUNT(*) AS total FROM idioms
      ),
      positioned_idiom AS (
        SELECT i.*, (t.total + 1 - r.row_num) AS position
        FROM idioms i
        JOIN ranked_idioms r ON i.id = r.id
        CROSS JOIN total_count t
        WHERE i.id = $1
      )
      SELECT * FROM positioned_idiom;
    `;
}

/**
 * Builds a SQL query that, given filters and sort, returns the previous
 * and next idiom IDs relative to a specific idiom ID.
 *
 * - Reuses the same search filtering (`whereClause`) you use on the list.
 * - Orders by the same `${sortField} ${sortOrder}` + stable tie-breaker `id DESC`.
 * - Uses window functions to get LAG/LEAD neighbors.
 *
 * @param whereClause the WHERE clause fragment from getSearchClauses (without the "WHERE" keyword)
 * @param sortField validated sort field (e.g., "timestamps")
 * @param sortOrder "asc" | "desc"
 * @param idParamIndex numeric position of the `$` placeholder for the `id`
 */

export function buildAdjacentIdsQuery(
  whereClause: string,
  sortField: string,
  sortOrder: string,
  idParamIndex: number,
): string {
  const dir = sortOrder.toLowerCase() === 'asc' ? 'ASC' : 'DESC';

  return `
    WITH base AS (
      SELECT id, timestamps, title, definition, contributor
      FROM idioms
      ${whereClause?.trim() ? `WHERE ${whereClause}` : ''}
    ),
    ordered AS (
      SELECT
        id,
        ROW_NUMBER() OVER (ORDER BY ${sortField} ${dir}, id DESC) AS row_num,
        LAG(id)  OVER (ORDER BY ${sortField} ${dir}, id DESC) AS prev_id,
        LEAD(id) OVER (ORDER BY ${sortField} ${dir}, id DESC) AS next_id
      FROM base
    )
    SELECT prev_id, next_id, row_num::int AS current_row
    FROM ordered
    WHERE id = $${idParamIndex}::int;
  `;
}
