export function getShowingText(
  currentPage: number,
  itemsPerPage: number,
  totalCount: number,
): string {
  if (totalCount === 0) return '';
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalCount);
  return `${start}\u2013${end} of ${totalCount} idioms`;
}
