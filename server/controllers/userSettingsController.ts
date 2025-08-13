import { Request, Response } from 'express';
import pool from '../db/index.js';

type Theme = 'light' | 'dark' | 'system';

function getAuthSub(req: Request): string | undefined {
  // Auth0 puts the subject on req.auth.payload.sub (from express-oauth2-jwt-bearer)
  return (req as any)?.auth?.payload?.sub as string | undefined;
}

// GET /api/v1/me/settings
export async function getUserSettings(req: Request, res: Response): Promise<void> {
  const sub = getAuthSub(req);
  if (!sub) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  try {
    const { rows } = await pool.query('SELECT theme FROM user_settings WHERE user_id = $1', [sub]);

    res.status(200).json({
      status: 'success',
      data: { theme: (rows[0]?.theme as Theme | undefined) ?? null },
    });
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// PUT /api/v1/me/settings  body: { theme: 'light'|'dark'|'system' }
export async function upsertUserSettings(req: Request, res: Response): Promise<void> {
  const sub = getAuthSub(req);
  if (!sub) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  const theme = req.body?.theme as string | undefined;
  if (!theme || !['light', 'dark', 'system'].includes(theme)) {
    res.status(400).json({ error: 'Invalid theme' });
    return;
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO user_settings (user_id, theme)
       VALUES ($1, $2)
       ON CONFLICT (user_id) DO UPDATE
         SET theme = EXCLUDED.theme
       RETURNING theme`,
      [sub, theme],
    );

    res.status(200).json({
      status: 'success',
      data: { theme: rows[0].theme as Theme },
    });
  } catch (error) {
    console.error('Error upserting user settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
