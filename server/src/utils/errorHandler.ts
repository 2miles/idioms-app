import { Response } from 'express';

export function handleError(res: Response, logMessage: string, error: unknown, status = 500) {
  // Log details for debugging / observability
  console.error(`${logMessage}:`, error);

  // Generic API-safe message (never leak internal details)
  res.status(status).json({ error: 'Internal Server Error' });
}
