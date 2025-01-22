import 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

export const jwtCheck = auth({
  audience: 'https://api.idiomvault.com',
  issuerBaseURL: 'https://dev-pn3ht3m1xyzl7nya.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

export const checkRole =
  (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    //const roles = req.user?.['https://api.idiomvault.com/roles'] || [];
    const roles = (req.auth?.payload?.['https://api.idiomvault.com/roles'] ||
      []) as string[];
    if (!roles.includes(requiredRole)) {
      res.status(403).json({ error: 'Forbidden: Insufficient roles' });
      return;
    }
    next();
  };
