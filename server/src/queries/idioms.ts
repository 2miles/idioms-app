/**
 * Builds a paginated SQL query for idioms with optional filters and sorting.
 * Each idiom includes its global position across the dataset.
 *
 * CTEs:
 * - global_total: count all idioms
 * - ranked_all: assign row numbers by timestamp
 * - filtered: apply filters and compute positions
 *
 * @param whereClause filter conditions (no leading "WHERE")
 * @param sortField column to order by
 * @param sortOrder "asc" | "desc"
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
 * Builds a query to count total idioms, applying any filters.
 * Used for pagination totals.
 *
 * @param whereClause filter conditions (no leading "WHERE")
 */
export function buildTotalCountQuery(totalWhereClause: string) {
  return totalWhereClause?.trim()
    ? `SELECT COUNT(*) AS total FROM idioms WHERE ${totalWhereClause}`
    : `SELECT COUNT(*) AS total FROM idioms`;
}

/**
 * Fetch a single idiom by ID and its global position
 * within all idioms ordered by timestamp.
 *
 * CTEs:
 * - ranked_idioms: assign row numbers
 * - total_count: count all idioms
 * - positioned_idiom: join target idiom with rank and total count
 */
export function idiomWithPositionQuery(): string {
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
 * Builds a query to find the previous and next idiom IDs
 * relative to a given idiom, using the same filters and sorting.
 *
 * @param whereClause filter conditions
 * @param sortField column to order by
 * @param sortOrder "asc" | "desc"
 * @param idParamIndex parameter index for the idiom ID
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

/**
 * Fetch all example sentences for a given idiom ID.
 *
 * @returns All examples linked to that idiom
 */
export function examplesForIdiomQuery(): string {
  return `
    SELECT *
    FROM idiom_examples
    WHERE idiom_id = $1;
  `;
}

/**
 * Insert a new idiom into the database.
 *
 * @returns Newly inserted idiom row.
 */
export function createIdiomQuery(): string {
  return `
    INSERT INTO idioms (title, title_general, definition, timestamps, contributor) 
    values ($1, $2, $3, $4, $5) 
    returning *
  `;
}

/**
 * Update an existing idiom by its ID.
 *
 * @returns Updated idiom row.
 */
export function updateIdiomQuery(): string {
  return `
    UPDATE idioms 
    SET title = $1, title_general = $2, definition = $3, timestamps = $4, contributor = $5 
    WHERE id = $6 
    returning *
  `;
}

/**
 * Delete an existing idiom by its ID.
 *
 * @returns Deleted idiom row.
 */
export function deleteIdiomQuery(): string {
  return `
    DELETE FROM idioms 
    WHERE id = $1 
    RETURNING *
  `;
}

/**
 * Insert a new example sentence for a given idiom.
 *
 *  @returns Newly created example row
 */
export function createIdiomExampleQuery(): string {
  return `
    INSERT INTO idiom_examples (idiom_id, example)
    VALUES ($1, $2)
    RETURNING example_id, idiom_id, example
  `;
}

/**
 * Update an existing example sentence for a given idiom.
 */
export function updateIdiomExampleQuery(): string {
  return `
    UPDATE idiom_examples 
    SET example = $1 
    WHERE example_id = $2 AND idiom_id = $3
  `;
}

/**
 * Delete an example sentence by its ID.
 *
 * @returns Deleted example row
 */
export function deleteExampleQuery(): string {
  return `
    DELETE FROM idiom_examples 
    WHERE example_id = $1
    RETURNING *
  `;
}
