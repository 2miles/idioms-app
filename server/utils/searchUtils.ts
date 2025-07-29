// getSearchClauses, parseSearch, etc.

export function getSearchClauses(search: string, searchColumn: string) {
  const searchWords = search
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  const whereValues = searchWords.map((word) => `%${word}%`);

  let whereClause = '';
  let totalWhereClause = '';

  if (searchColumn === 'general') {
    whereClause = searchWords
      .map((_, i) => `(title ILIKE $${i + 3} OR definition ILIKE $${i + 3})`)
      .join(' AND ');

    totalWhereClause = searchWords
      .map((_, i) => `(title ILIKE $${i + 1} OR definition ILIKE $${i + 1})`)
      .join(' AND ');
  } else {
    whereClause = searchWords.map((_, i) => `${searchColumn} ILIKE $${i + 3}`).join(' AND ');

    totalWhereClause = searchWords.map((_, i) => `${searchColumn} ILIKE $${i + 1}`).join(' AND ');
  }

  return { searchWords, whereClause, totalWhereClause, whereValues };
}
