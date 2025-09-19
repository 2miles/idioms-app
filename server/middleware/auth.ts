import 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

export const checkRole =
  (requiredRoles: string | string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const userRoles = (req.auth?.payload?.['https://api.idiomvault.com/roles'] || []) as string[];
    const required = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    const hasRole = required.some((role) => userRoles.includes(role));
    if (!hasRole) {
      res.status(403).json({ error: 'Forbidden: Insufficient roles' });
      return;
    }
    next();
  };
