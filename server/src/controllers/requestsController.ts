import { Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

import pool from '../db/index.js';
import {
  createRequestQuery,
  deleteRequestQuery,
  getAllRequestsQuery,
  markRequestAsAddedQuery,
} from '../queries/requests.js';
import { handleError } from '../utils/errorHandler.js';

const requestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  contributor: z.string().max(50).optional(),
});

// ─────────────────────────────────────────────────────────────
// POST /api/v1/requests — Create a new idiom request
// ─────────────────────────────────────────────────────────────
export async function createRequest(req: Request, res: Response): Promise<void> {
  try {
    const parsed = requestSchema.safeParse(req.body);

    if (!parsed.success) {
      const message = parsed.error.issues.map((e) => e.message).join(', ');
      res.status(400).json({ error: `Validation error: ${message}` });
      return;
    }

    const sanitizedTitle = sanitizeHtml(parsed.data.title.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });

    const sanitizedContributor = parsed.data.contributor
      ? sanitizeHtml(parsed.data.contributor.trim(), {
          allowedTags: [],
          allowedAttributes: {},
        })
      : null;

    const result = await pool.query(createRequestQuery(), [sanitizedTitle, sanitizedContributor]);

    res.status(201).json({ status: 'success', data: { request: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error creating request', error);
  }
}

// ─────────────────────────────────────────────────────────────
// GET /api/v1/requests — Fetch all requests (optionally unadded only)
// ─────────────────────────────────────────────────────────────
export async function getAllRequests(req: Request, res: Response): Promise<void> {
  try {
    const onlyUnadded = req.query.onlyUnadded === 'true';

    const result = await pool.query(getAllRequestsQuery(onlyUnadded));

    res.status(200).json({ status: 'success', data: { requests: result.rows } });
  } catch (error) {
    handleError(res, 'Error fetching requests', error);
  }
}

// ─────────────────────────────────────────────────────────────
// PUT /api/v1/requests/:id/add — Mark request as added
// ─────────────────────────────────────────────────────────────
export async function markRequestAsAdded(req: Request, res: Response): Promise<void> {
  try {
    const result = await pool.query(markRequestAsAddedQuery(), [req.params.id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: { request: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error marking request as added', error);
  }
}

// ─────────────────────────────────────────────────────────────
// DELETE /api/v1/requests/:id — Delete request
// ─────────────────────────────────────────────────────────────
export async function deleteRequest(req: Request, res: Response): Promise<void> {
  try {
    const result = await pool.query(deleteRequestQuery(), [req.params.id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Request not found' });
      return;
    }

    res.status(200).json({ status: 'success', data: { request: result.rows[0] } });
  } catch (error) {
    handleError(res, 'Error deleting request', error);
  }
}
