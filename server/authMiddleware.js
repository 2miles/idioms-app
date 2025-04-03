import * as jwt from 'jsonwebtoken';
import { auth } from 'express-oauth2-jwt-bearer';

// ✅ Auth0 Middleware Setup (Still Required for Compatibility)
export const jwtCheck = auth({
  audience: 'https://api.idiomvault.com',
  issuerBaseURL: 'https://dev-pn3ht3m1xyzl7nya.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

// ✅ Check Authentication (JWT Verification)
export async function checkAuth(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return false;
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.AUTH0_PUBLIC_KEY;

    // ✅ Ensure secret exists before verifying JWT
    if (!secret) {
      res
        .status(500)
        .json({ error: 'Server misconfiguration: Missing AUTH0_PUBLIC_KEY' });
      return false;
    }

    // ✅ Verify JWT with Auth0's public key
    const decoded = jwt.verify(token, secret, {
      algorithms: ['RS256'],
    });
    return decoded;
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
    return false;
  }
}

// ✅ Check User Role (Authorization)
export async function checkRole(req, res, requiredRole) {
  const decoded = await checkAuth(req, res);
  if (!decoded) return false; // 🔹 Ensures checkAuth() succeeded before continuing

  const roles = decoded['https://api.idiomvault.com/roles'] || [];
  if (!roles.includes(requiredRole)) {
    res.status(403).json({ error: 'Forbidden: Insufficient roles' });
    return false;
  }

  return true;
}
