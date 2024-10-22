export type Idiom = {
  id: number;
  title: string;
  timestamps: string;
  title_general: string | null;
  definition: string | null;
  contributor: string | null;
  position: number | null;
};

export type Example = {
  example_id: number;
  example: string;
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

export const Columns: Column[] = [
  { accessor: 'position', label: 'Order' },
  { accessor: 'title', label: 'Idiom' },
  { accessor: 'definition', label: 'Definition' },
  { accessor: 'timestamps', label: 'Day' },
  { accessor: 'contributor', label: 'Owner' },
];
