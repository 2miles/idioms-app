/**
 * Build WHERE for a page query (adjacent or list) starting at a specific $ index.
 * Example: startIndex=3 for list (because $1/$2 are LIMIT/OFFSET), startIndex=1 for adjacent.
 */
export function getSearchClauses(
  search: string,
  searchColumn: string, // 'title' | 'contributor' | 'general' | 'definition' (if you support it)
  startIndex = 1,
) {
  const searchWords = (search || '')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);

  if (searchWords.length === 0) {
    return { searchWords, whereClause: '', whereValues: [] };
  }

  // Build placeholders starting at `startIndex`
  const whereValues = searchWords.map((word) => `%${word}%`);

  let whereClause = '';
  if (searchColumn === 'general') {
    // Search across title OR definition for each word; AND across words
    whereClause = searchWords
      .map((_, i) => {
        const n = startIndex + i;
        return `(title ILIKE $${n} OR definition ILIKE $${n})`;
      })
      .join(' AND ');
  } else {
    whereClause = searchWords
      .map((_, i) => `${searchColumn} ILIKE $${startIndex + i}`)
      .join(' AND ');
  }

  return { searchWords, whereClause, whereValues };
}

/**
 * Build WHERE for the *total count* query, which usually starts at $1.
 * Keeps your old behavior but parameterized.
 */
export function getTotalWhereClause(search: string, searchColumn: string, startIndex = 1) {
  const searchWords = (search || '')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter(Boolean);

  if (searchWords.length === 0) return '';

  if (searchColumn === 'general') {
    return searchWords
      .map((_, i) => `(title ILIKE $${startIndex + i} OR definition ILIKE $${startIndex + i})`)
      .join(' AND ');
  }
  return searchWords.map((_, i) => `${searchColumn} ILIKE $${startIndex + i}`).join(' AND ');
}
