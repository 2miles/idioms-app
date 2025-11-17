export type Idiom = {
  id: number;
  title: string;
  timestamps: string;
  title_general: string | null;
  definition: string | null;
  contributor: string | null;
  position: number | null;
  examples?: Example[];
  origin?: Origin | null;
};

export type NewIdiomInput = {
  title: string | null;
  title_general: string | null;
  definition: string | null;
  timestamps: string | null;
  contributor: string | null;
};

export type UpdateIdiomInput = {
  title?: string | null;
  title_general?: string | null;
  definition?: string | null;
  contributor?: string | null;
  timestamps?: string | null;
};

export type Example = {
  example_id: number;
  idiom_id: number;
  example: string;
};

export type Origin = {
  id: number;
  idiom_id: number;
  origin_text: string | null;
  model: string | null;
  updated_at: string; // ISO date string
};

export type ColumnAccessors = 'position' | 'title' | 'definition' | 'timestamps' | 'contributor';
export type ColumnLabels = 'Order' | 'Idiom' | 'Title' | 'Definition' | 'Day' | 'Owner';

export type Column = {
  label: ColumnLabels;
  accessor: ColumnAccessors;
};

export type ColumnVisibility = {
  position: boolean;
  title: boolean;
  definition: boolean;
  timestamps: boolean;
  contributor: boolean;
};

export type SearchColumnAccessors = 'title' | 'general' | 'contributor';
export type SearchColumnLabels = 'Idiom' | 'General' | 'Contributor';

export type SearchColumn = {
  label: SearchColumnLabels;
  accessor: SearchColumnAccessors;
};

export const SearchColumns: SearchColumn[] = [
  { accessor: 'title', label: 'Idiom' },
  { accessor: 'general', label: 'General' },
  { accessor: 'contributor', label: 'Contributor' },
];

export const Columns: Column[] = [
  { accessor: 'position', label: 'Order' },
  { accessor: 'title', label: 'Idiom' },
  { accessor: 'definition', label: 'Definition' },
  { accessor: 'timestamps', label: 'Day' },
  { accessor: 'contributor', label: 'Owner' },
];

export type ListParams = {
  page: number;
  limit: number;
  sortField: ColumnAccessors;
  sortOrder: 'asc' | 'desc';
  search: string;
  searchColumn: SearchColumnAccessors;
  letter: string | null;
};
