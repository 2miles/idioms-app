/**
 * Build WHERE clause and values for idioms queries.
 *
 * @param search user search string
 * @param searchColumn which column to search ('title' | 'definition' | 'contributor' | 'general')
 * @param letter optional letter filter ('A'..'Z' or 'num')
 * @param startIndex SQL param index to start at (3 for list, 1 for count/adjacent)
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
            return `(title ILIKE $${n} OR definition ILIKE $${n})`;
          })
          .join(' AND '),
      );
    } else {
      clauses.push(
        searchWords
          .map((_, i) => `${searchColumn} ILIKE $${startIndex + values.length + i}`)
          .join(' AND '),
      );
    }
    values.push(...searchWords.map((w) => `%${w}%`));
  }

  // Letter filter
  if (letter === 'num') {
    clauses.push(`title ~ '^[0-9]'`);
  } else if (letter && /^[A-Z]$/.test(letter)) {
    clauses.push(`title ILIKE $${startIndex + values.length}`);
    values.push(`${letter}%`);
  }

  return {
    whereClause: clauses.length ? clauses.join(' AND ') : '',
    whereValues: values,
  };
}
