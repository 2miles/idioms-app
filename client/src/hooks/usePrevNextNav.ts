import { useEffect, useState } from 'react';

import { publicIdiomFinder } from '@/apis/idiomFinder';
import { buildAdjacentParams, buildBackHref, getListStateFromURL } from '@/utils/listParams';

type UsePrevNextNavResult = {
  prevId?: number;
  nextId?: number;
  currentRow?: number;
  backHref: string;
  loading: boolean;
  error?: unknown;
  refetch: () => void;
};

/**
 * Encapsulates the "adjacent idioms" navigation logic.
 *
 * - Calls the `/adjacent` endpoint to fetch the previous/next idiom IDs
 *   for the current detail page, based on the current list filters/sort/search.
 *
 * - Computes the correct "back" link (with page param) so returning to the list
 *   lands on the page that actually contains the current idiom.
 *
 * - Exposes loading/error state, so the UI can handle pending/failure cases cleanly.
 *
 */

export function usePrevNextNav(
  id: string | undefined,
  searchParams: URLSearchParams,
): UsePrevNextNavResult {
  const [prevId, setPrevId] = useState<number | undefined>();
  const [nextId, setNextId] = useState<number | undefined>();
  const [currentRow, setCurrentRow] = useState<number | undefined>();
  const [backHref, setBackHref] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const fetchAdjacent = async () => {
    if (!id) return;
    setLoading(true);
    setError(undefined);
    try {
      const params = buildAdjacentParams(id, searchParams);
      if (!params) return;

      const res = await publicIdiomFinder.get('/adjacent', { params });
      const { prevId: apiPrevId, nextId: apiNextId, currentRow: apiRow } = res.data?.data ?? {};

      setPrevId(apiPrevId ?? undefined);
      setNextId(apiNextId ?? undefined);
      const numericRow = apiRow != null ? Number(apiRow) : undefined;

      setCurrentRow(numericRow);
    } catch (e) {
      setPrevId(undefined);
      setNextId(undefined);
      setCurrentRow(undefined);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdjacent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, searchParams.toString()]);

  useEffect(() => {
    const { page: urlPage, limit } = getListStateFromURL(searchParams);

    const pageFromRow =
      currentRow && currentRow > 0 ? Math.max(1, Math.ceil(currentRow / limit)) : urlPage;

    // preserves all filters/sorts in the query string
    setBackHref(buildBackHref(searchParams, pageFromRow));
  }, [currentRow, searchParams]);

  return { prevId, nextId, currentRow, backHref, loading, error, refetch: fetchAdjacent };
}
