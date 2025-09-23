import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export function requestLimiter(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'test' || process.env.VITE_APP_ENV === 'test') {
    return next(); // skip limiter in test mode
  }
  return limiter(req, res, next); // otherwise enforce limiter
}
