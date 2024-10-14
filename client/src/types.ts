export type Idiom = {
  id: number;
  title: string;
  timestamps: string;
  title_general: string | null;
  definition: string | null;
  contributor: string | null;
  position: number | null;
};

export const ColumnsObj = [
  { label: '#', accessor: 'position' },
  { label: 'Idiom', accessor: 'title' },
  { label: 'Definition', accessor: 'definition' },
  { label: 'Day', accessor: 'timestamps' },
  { label: 'Owner', accessor: 'contributor' },
];

export type ColumnValues = 'position' | 'title' | 'definition' | 'timestamps' | 'contributor';
export type ColumnLabels = '#' | 'Idiom' | 'Title' | 'Definition' | 'Day' | 'Owner';
// export type ColumnValues = Columns[number]['accessor']; // 'position' | 'title' | 'definition' | 'timestamps' | 'contributor'
// export type ColumnLabels = Columns[number]['label']; // '#' | 'Idiom' | 'Definition' | 'Day' | 'Owner'

export type Columns = {
  label: ColumnLabels;
  accessor: ColumnValues;
}[];

export type ColumnVisibility = {
  position: boolean;
  title: boolean;
  definition: boolean;
  timestamps: boolean;
  contributor: boolean;
};
