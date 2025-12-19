export const ALLOWED_UI_COLUMNS = ['title', 'keywords'] as const;
export type UiColumn = (typeof ALLOWED_UI_COLUMNS)[number];

export const ALLOWED_SORT_FIELDS = [
  'position',
  'timestamps',
  'title',
  'definition',
  'contributor',
] as const;
export type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

export const ALLOWED_SORT_ORDER = ['asc', 'desc'] as const;
export type SortOrder = (typeof ALLOWED_SORT_ORDER)[number];
