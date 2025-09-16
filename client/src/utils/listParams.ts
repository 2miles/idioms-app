import { ColumnAccessors, ListParams, SearchColumnAccessors } from '@/types';

export function getListStateFromURL(params: URLSearchParams): ListParams {
  return {
    page: Number(params.get('page') ?? '1'),
    limit: Number(params.get('limit') ?? '20'),
    sortField: (params.get('sortField') ?? 'timestamps') as ColumnAccessors,
    sortOrder: (params.get('sortOrder') ?? 'desc') as 'asc' | 'desc',
    search: params.get('search') ?? '',
    searchColumn: (params.get('searchColumn') ?? 'title') as SearchColumnAccessors,
  };
}

export function buildAdjacentParams(id: string | undefined, sp: URLSearchParams) {
  if (!id) return null;
  const { sortField, sortOrder, search, searchColumn } = getListStateFromURL(sp);
  return { id: Number(id), sortField, sortOrder, search, searchColumn };
}

export function buildBackHref(sp: URLSearchParams, page: number) {
  const next = new URLSearchParams(sp);
  next.set('page', String(page));
  return `/?${next.toString()}`;
}
