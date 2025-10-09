import { Request } from 'express';

import {
  ALLOWED_SORT_FIELDS,
  ALLOWED_SORT_ORDER,
  SortField,
  SortOrder,
} from '../constants/idiomParams.js';

/**
 * Validates and normalizes sorting parameters from the request query.
 *
 * - Ensures `sortField` and `sortOrder` are within allowed sets.
 * - Maps the virtual field "position" → "timestamps" when used for adjacency lookups.
 *
 * @param req Express request object
 * @param forAdjacent Whether to normalize "position" to "timestamps" for adjacent idiom queries
 * @returns Normalized { sortField, sortOrder }
 * @throws Error if the sort field or order are invalid
 */
export function validateSortParams(req: Request, { forAdjacent = false } = {}) {
  const sortField = (req.query.sortField as SortField) || 'timestamps';
  const sortOrder = (req.query.sortOrder as SortOrder) || 'desc';
  if (!ALLOWED_SORT_FIELDS.includes(sortField)) throw new Error('Invalid sort field');
  if (!ALLOWED_SORT_ORDER.includes(sortOrder)) throw new Error('Invalid sort order');
  return {
    sortField: forAdjacent && sortField === 'position' ? 'timestamps' : sortField,
    sortOrder,
  };
}
