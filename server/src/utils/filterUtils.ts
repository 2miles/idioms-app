/**
 * Dynamically builds a SQL `WHERE` clause and value array
 * based on search text and/or an optional A–Z or "num" filter.
 *
 * Supports:
 * - Multi-word searches (`word1 word2` → `...AND...`)
 * - Searching by specific column (e.g. "title" or "definition")
 * - Combined "general" search across both `title` and `definition`
 * - Optional letter filters (`A`–`Z` or `num`)
 *
 * @param search         Raw user search string (e.g. "piece together")
 * @param searchColumn   Column to search ('title' | 'definition' | 'contributor' | 'general')
 * @param letter         Optional letter filter ('A'..'Z' or 'num')
 * @param startIndex     Starting $-parameter index (3 for list, 1 for count/adjacent)
 * @returns              { whereClause, whereValues }
 *
 * @example
 * buildFilterClauses("piece together", "title", "P", 3)
 * // → whereClause:
 * //   "title ILIKE $3 AND title ILIKE $4 AND title ILIKE $5"
 * // → whereValues:
 * //   ["%piece%", "%together%", "P%"]
 *
 * @example
 * buildFilterClauses("truth", "general", null, 1)
 * // → whereClause:
 * //   "(title ILIKE $1 OR definition ILIKE $1)"
 * // → whereValues:
 * //   ["%truth%"]
 */
export function buildFilterClauses(
  search: string,
  searchColumn: string,
  letter: string | null,
  startIndex = 1,
): { whereClause: string; whereValues: any[] } {
  const clauses: string[] = [];
  const values: any[] = [];

  // Search filter
  const searchWords = (search || '')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);

  if (searchWords.length > 0) {
    if (searchColumn === 'general') {
      // AND across words, OR across fields
      clauses.push(
        searchWords
          .map((_, i) => {
            const n = startIndex + values.length + i;
            return `
          (
            i.title ILIKE $${n}
            OR i.definition ILIKE $${n}
            OR EXISTS (
              SELECT 1
              FROM idiom_origins_ai o
              WHERE o.idiom_id = i.id
                AND o.origin_text ILIKE $${n}
            )
          )
        `;
          })
          .join(' AND '),
      );
    } else {
      clauses.push(
        searchWords
          .map((_, i) => `i.${searchColumn} ILIKE $${startIndex + values.length + i}`)
          .join(' AND '),
      );
    }
    values.push(...searchWords.map((w) => `%${w}%`));
  }

  // Letter filter
  if (letter === 'num') {
    clauses.push(`i.title ~ '^[0-9]'`);
  } else if (letter && /^[A-Z]$/.test(letter)) {
    clauses.push(`i.title ILIKE $${startIndex + values.length}`);
    values.push(`${letter}%`);
  }

  return {
    whereClause: clauses.length ? clauses.join(' AND ') : '',
    whereValues: values,
  };
}
