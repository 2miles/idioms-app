import { Request, Response } from 'express';

import pool from '../db/index.js';

// Create a new request
export async function createRequest(req: Request, res: Response): Promise<void> {
  try {
    const { title, contributor } = req.body;

    if (!title || title.trim() === '') {
      res.status(400).json({ error: 'Title is required' });
      return;
    }

    const result = await pool.query(
      `INSERT INTO requests (title, contributor) VALUES ($1, $2) RETURNING *`,
      [title.trim(), contributor?.trim() || null],
    );

    res.status(201).json({
      status: 'success',
      data: {
        request: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Get all requests (optionally filter by added = false)
export async function getAllRequests(req: Request, res: Response): Promise<void> {
  try {
    const onlyUnadded = req.query.onlyUnadded === 'true';
    const query = onlyUnadded
      ? 'SELECT * FROM requests WHERE added = false ORDER BY submitted_at DESC'
      : 'SELECT * FROM requests ORDER BY submitted_at DESC';

    const result = await pool.query(query);

    res.status(200).json({
      status: 'success',
      data: {
        requests: result.rows,
      },
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Mark a request as added
export async function markRequestAsAdded(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const result = await pool.query(`UPDATE requests SET added = true WHERE id = $1 RETURNING *`, [
      id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        request: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error marking request as added:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Delete a request
export async function deleteRequest(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const result = await pool.query(`DELETE FROM requests WHERE id = $1 RETURNING *`, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Request deleted successfully',
      data: {
        request: result.rows[0],
      },
    });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
