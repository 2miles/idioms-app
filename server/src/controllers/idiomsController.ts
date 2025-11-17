import { Request, Response } from 'express';

import { ALLOWED_UI_COLUMNS, UiColumn } from '../constants/idiomParams.js';
import pool from '../db/index.js';
import {
  buildAdjacentIdsQuery,
  buildIdiomsQuery,
  buildTotalCountQuery,
  createIdiomExampleQuery,
  createIdiomQuery,
  deleteExampleQuery,
  deleteIdiomQuery,
  deleteOriginByIdiomIdQuery,
  examplesForIdiomQuery,
  idiomWithPositionQuery,
  originForIdiomQuery,
  updateIdiomExampleQuery,
  updateIdiomQuery,
  upsertOriginQuery,
} from '../queries/idioms.js';
import { handleError } from '../utils/errorHandler.js';
import { buildFilterClauses } from '../utils/filterUtils.js';
import { normalizeLetterParam } from '../utils/letterUtils.js';
import { validateSortParams } from '../utils/queryParamUtils.js';

// ─────────────────────────────────────────────────────────────
// GET /api/v1/idioms — Paginated list of idioms
// ─────────────────────────────────────────────────────────────
export async function getAllIdioms(req: Request, res: Response): Promise<void> {
  try {
    // --- Extract and validate query params ---
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const offset = (page - 1) * limit;

    const rawSearchColumn = (req.query.searchColumn as string) || 'title';

    // Validate column
    if (!ALLOWED_UI_COLUMNS.includes(rawSearchColumn as UiColumn)) {
      res.status(400).json({ error: 'Invalid search column' });
      return;
    }

    const searchColumn = rawSearchColumn as UiColumn;

    const search = (req.query.search as string) || '';
    const rawLetter = req.query.letter as string | undefined;
    const letter = normalizeLetterParam(rawLetter);

    // --- Validate and normalize sorting ---
    const { sortField, sortOrder } = validateSortParams(req);

    // Build WHERE fragments
    const { whereClause, whereValues } = buildFilterClauses(search, searchColumn, letter, 3);
    const { whereClause: totalWhereClause, whereValues: totalValues } = buildFilterClauses(
      search,
      searchColumn,
      letter,
      1,
    );

    // --- Build and execute queries ---
    const idiomsQuery = buildIdiomsQuery(whereClause, sortField, sortOrder);
    const totalCountQuery = buildTotalCountQuery(totalWhereClause);

    const idiomsResult = await pool.query(idiomsQuery, [limit, offset, ...whereValues]);
    const countResult = await pool.query(totalCountQuery, totalValues);
    const totalCount = parseInt(countResult.rows[0].total, 10);

    // --- Respond ---
    res.status(200).json({
      status: 'success',
      data: {
        idioms: idiomsResult.rows,
        totalCount,
      },
    });
  } catch (error) {
    handleError(res, 'Error executing paginated idioms query', error);
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/v1/idioms/adjacent — Get prev/next idioms for detail view
// ─────────────────────────────────────────────────────────────
export async function getAdjacentIdioms(req: Request, res: Response): Promise<void> {
  try {
    // --- Validate required inputs ---
    const id = Number(req.query.id);
    if (!id || Number.isNaN(id)) {
      res.status(400).json({ error: 'Missing or invalid id' });
      return;
    }

    // --- Extract and validate query params ---
    const rawUiColumn = ((req.query.searchColumn as string) || '').trim() || 'title';
    if (!ALLOWED_UI_COLUMNS.includes(rawUiColumn as any)) {
      res.status(400).json({ error: 'Invalid search column' });
      return;
    }
    const search = ((req.query.search as string) || '').trim();
    const rawLetter = req.query.letter as string | undefined;
    const letter = normalizeLetterParam(rawLetter);

    // --- Validate and normalize sorting ---
    const { sortField, sortOrder } = validateSortParams(req, { forAdjacent: true });

    // --- Build query fragments ---
    const { whereClause, whereValues } = buildFilterClauses(search, rawUiColumn, letter, 1);
    const idParamIndex = whereValues.length + 1;

    const sql = buildAdjacentIdsQuery(whereClause, sortField, sortOrder, idParamIndex);

    // --- Execute query ---
    const result = await pool.query(sql, [...whereValues, id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Current idiom not in filtered set' });
      return;
    }

    // --- Respond ---
    const row = result.rows[0];
    res.status(200).json({
      status: 'success',
      data: {
        prevId: row?.prev_id ?? null,
        nextId: row?.next_id ?? null,
        currentRow: row?.current_row ?? null,
      },
    });
  } catch (error) {
    handleError(res, 'Error computing adjacent idioms', error);
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/v1/idioms/:id — Single idiom with examples
// ─────────────────────────────────────────────────────────────
export async function getSingleIdiomWithExamples(req: Request, res: Response) {
  try {
    const idiomResult = await pool.query(idiomWithPositionQuery(), [req.params.id]);
    const examplesResult = await pool.query(examplesForIdiomQuery(), [req.params.id]);
    const originResult = await pool.query(originForIdiomQuery(), [req.params.id]);

    res.status(200).json({
      status: 'success',
      data: {
        idiom: idiomResult.rows[0],
        examples: examplesResult.rows,
        origin: originResult.rows[0] || null,
      },
    });
  } catch (error) {
    handleError(res, 'Error fetching single idiom with examples', error);
  }
}

// ─────────────────────-───────────────────────────────────────
// POST /api/v1/idioms — Create idiom
// ─────────────────────────────────────────────────────────────
export async function createIdiom(req: Request, res: Response) {
  try {
    const result = await pool.query(createIdiomQuery(), [
      req.body.title,
      req.body.title_general,
      req.body.definition,
      req.body.timestamps,
      req.body.contributor,
    ]);

    res.status(200).json({ status: 'success', data: { idiom: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error executing create idiom query', error);
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/v1/idioms/:id — Update idiom
// ─────────────────────────────────────────────────────────────k
export async function updateIdiom(req: Request, res: Response) {
  try {
    const result = await pool.query(updateIdiomQuery(), [
      req.body.title,
      req.body.title_general,
      req.body.definition,
      req.body.timestamps,
      req.body.contributor,
      req.params.id,
    ]);

    res.status(200).json({ status: 'success', data: { idiom: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error executing update idiom query', error);
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/v1/idioms/:id — Delete idiom
// ─────────────────────────────────────────────────────────────
export async function deleteIdiom(req: Request, res: Response) {
  try {
    const result = await pool.query(deleteIdiomQuery(), [req.params.id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Idiom not found' });
      return;
    }
    res.status(200).json({ status: 'success', data: { idiom: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error executing delete idiom query', error);
  }
}

// ─────────────────────────────────────────────────────────────
// POST /api/v1/idioms/:id/examples — Add example
// ─────────────────────────────────────────────────────────────
export async function createExample(req: Request, res: Response) {
  try {
    const result = await pool.query(createIdiomExampleQuery(), [req.params.id, req.body.example]);

    res.status(200).json({ status: 'success', data: { example: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error adding examples', error);
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/v1/idioms/:id/examples — Update examples
// ─────────────────────────────────────────────────────────────
export async function updateExamples(req: Request, res: Response) {
  try {
    for (const { example_id, example } of req.body.examples) {
      await pool.query(updateIdiomExampleQuery(), [example, example_id, req.params.id]);
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    handleError(res, 'Error updating examples', error);
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/v1/examples/:id — Delete example
// ─────────────────────────────────────────────────────────────
export async function deleteExample(req: Request, res: Response) {
  try {
    const result = await pool.query(deleteExampleQuery(), [req.params.id]);

    res.status(200).json({ status: 'success', data: { example: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error deleting example', error);
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/v1/idioms/:id/origin — Update or insert origin
// ─────────────────────────────────────────────────────────────
export async function upsertOrigin(req: Request, res: Response) {
  try {
    const { origin_text } = req.body;
    const idiomId = req.params.id;

    const result = await pool.query(upsertOriginQuery(), [idiomId, origin_text || null]);

    res.status(200).json({
      status: 'success',
      data: {
        origin: result.rows[0],
      },
    });
  } catch (error) {
    handleError(res, 'Error upserting origin', error);
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/v1/:id/origin — Delete origin
// ─────────────────────────────────────────────────────────────
export async function deleteOrigin(req: Request, res: Response) {
  try {
    const result = await pool.query(deleteOriginByIdiomIdQuery(), [req.params.id]);

    res.status(200).json({
      status: 'success',
      data: { deleted: result.rows[0] || null },
    });
  } catch (error) {
    handleError(res, 'Error deleting origin', error);
  }
}
