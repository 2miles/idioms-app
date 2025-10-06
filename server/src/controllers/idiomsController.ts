import { Request, Response } from 'express';

import pool from '../db/index.js';
import {
  buildAdjacentIdsQuery,
  buildIdiomWithPositionQuery,
  buildIdiomsQuery,
  buildTotalCountQuery,
} from '../queries/idioms.js';
import { buildFilterClauses } from '../utils/filterUtils.js';
import { normalizeLetterParam } from '../utils/letterUtils.js';

export async function getAllIdioms(req: Request, res: Response): Promise<void> {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const offset = (page - 1) * limit;
    const allowedColumns = ['title', 'contributor', 'general'] as const;
    const rawCol = (req.query.searchColumn as string) || 'title';
    if (!allowedColumns.includes(rawCol as any)) {
      res.status(400).json({ error: 'Invalid search column' });
      return;
    }

    const searchColumn = rawCol;
    const search = (req.query.search as string) || '';

    const rawLetter = req.query.letter as string | undefined;
    const letter = normalizeLetterParam(rawLetter);

    // Build WHERE fragments
    const { whereClause, whereValues } = buildFilterClauses(search, searchColumn, letter, 3);
    const { whereClause: totalWhereClause, whereValues: totalValues } = buildFilterClauses(
      search,
      searchColumn,
      letter,
      1,
    );

    const allowedSortFields = ['position', 'timestamps', 'title', 'definition', 'contributor'];
    const sortField = (req.query.sortField as string) || 'timestamps';
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
    if (!allowedSortFields.includes(sortField)) {
      res.status(400).json({ error: 'Invalid sort field' });
      return;
    }
    if (!['asc', 'desc'].includes(sortOrder)) {
      res.status(400).json({ error: 'Invalid sort order' });
      return;
    }

    const idiomsQuery = buildIdiomsQuery(whereClause, sortField, sortOrder);
    const totalCountQuery = buildTotalCountQuery(totalWhereClause);

    const idiomsResult = await pool.query(idiomsQuery, [limit, offset, ...whereValues]);
    const countResult = await pool.query(totalCountQuery, totalValues);
    const totalCount = parseInt(countResult.rows[0].total, 10);

    res.status(200).json({
      status: 'success',
      data: {
        idioms: idiomsResult.rows,
        totalCount,
      },
    });
  } catch (error) {
    console.error('Error executing paginated idioms query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getAdjacentIdioms(req: Request, res: Response) {
  try {
    const id = Number(req.query.id);
    if (!id || Number.isNaN(id)) {
      res.status(400).json({ error: 'Missing or invalid id' });
      return;
    }

    const allowedUiColumns = ['title', 'contributor', 'general'] as const;
    const uiColRaw = ((req.query.searchColumn as string) || '').trim() || 'title';
    if (!allowedUiColumns.includes(uiColRaw as any)) {
      res.status(400).json({ error: 'Invalid search column' });
      return;
    }

    const allowedSortFields = ['position', 'timestamps', 'title', 'definition', 'contributor'];
    const sortFieldRaw = (req.query.sortField as string) || 'timestamps';
    const sortOrder = (req.query.sortOrder as 'asc' | 'desc') || 'desc';
    if (!allowedSortFields.includes(sortFieldRaw)) {
      res.status(400).json({ error: 'Invalid sort field' });
      return;
    }
    if (!['asc', 'desc'].includes(sortOrder)) {
      res.status(400).json({ error: 'Invalid sort order' });
      return;
    }
    const sortField = sortFieldRaw === 'position' ? 'timestamps' : sortFieldRaw;

    const search = ((req.query.search as string) || '').trim();

    const rawLetter = req.query.letter as string | undefined;
    const letter = normalizeLetterParam(rawLetter);

    // Build WHERE with placeholders starting at $1 for this endpoint
    const { whereClause, whereValues } = buildFilterClauses(search, uiColRaw, letter, 1);

    const idParamIndex = whereValues.length + 1;

    const sql = buildAdjacentIdsQuery(whereClause, sortField, sortOrder, idParamIndex);

    const result = await pool.query(sql, [...whereValues, id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Current idiom not in filtered set' });
      return;
    }

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
    console.error('Error computing adjacent idioms:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getSingleIdiomWithExamples(req: Request, res: Response): Promise<void> {
  try {
    const idiomResult = await pool.query(buildIdiomWithPositionQuery(), [req.params.id]);
    const examplesResult = await pool.query(`SELECT * FROM idiom_examples WHERE idiom_id = $1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        idiom: idiomResult.rows[0],
        examples: examplesResult.rows,
      },
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Create an idiom
export async function createIdiom(req: Request, res: Response): Promise<void> {
  try {
    const createIdiomQuery = `
        INSERT INTO idioms (title, title_general, definition, timestamps, contributor) 
        values ($1, $2, $3, $4, $5) 
        returning *
      `;
    const result = await pool.query(createIdiomQuery, [
      req.body.title,
      req.body.title_general,
      req.body.definition,
      req.body.timestamps,
      req.body.contributor,
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        idiom: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateIdiom(req: Request, res: Response): Promise<void> {
  try {
    const updateIdiomQuery = `
        UPDATE idioms 
        SET title = $1, title_general = $2, definition = $3, timestamps = $4, contributor = $5 
        WHERE id = $6 
        returning *
      `;
    const result = await pool.query(updateIdiomQuery, [
      req.body.title,
      req.body.title_general,
      req.body.definition,
      req.body.timestamps,
      req.body.contributor,
      req.params.id,
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        idiom: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteIdiom(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const deleteQuery = `
          DELETE FROM idioms 
          WHERE id = $1 
          RETURNING *
        `;

    const result = await pool.query(deleteQuery, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Idiom not found' });
      return;
    }
    res.status(200).json({
      status: 'success',
      data: {
        idiom: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error executing delete query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Add examples to an idiom
export async function createExample(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { example } = req.body;

  try {
    const insertQuery = `
        INSERT INTO idiom_examples (idiom_id, example)
        VALUES ($1, $2)
        RETURNING example_id, idiom_id, example
      `;

    const result = await pool.query(insertQuery, [id, example]);

    res.status(200).json({
      status: 'success',
      data: {
        example: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error adding examples:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function updateExamples(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { examples } = req.body;

  try {
    const updateQuery = `
        UPDATE idiom_examples 
        SET example = $1 
        WHERE example_id = $2 AND idiom_id = $3
      `;

    // Loop through each example and update it
    for (const { example_id, example } of examples) {
      await pool.query(updateQuery, [example, example_id, id]);
    }

    res.status(200).json({
      status: 'success',
      message: 'Examples updated successfully',
    });
  } catch (error) {
    console.error('Error updating examples:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteExample(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const deleteExampleQuery = `
        DELETE FROM idiom_examples 
        WHERE example_id = $1
        RETURNING *
        `;

    const result = await pool.query(deleteExampleQuery, [id]);

    res.status(200).json({
      status: 'success',
      message: 'Example deleted successfully',
      data: {
        example: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error deleting example:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
