My old middleware was designed for Express.js, but Vercel serverless functions work differently. Below is a full breakdown of what we changed and why.

## What changed

| Feature      | Old Express Middleware                          | New Vercel Serverless Middleware                      | Why?                                     |
| ------------ | ----------------------------------------------- | ----------------------------------------------------- | ---------------------------------------- |
| Routing      | Middleware applies to all routes `(app.use())`. | Each API function calls `checkAuth()` manually.       | Vercel doesnt support global middleware. |
| Auth Flow    | jwtCheck middleware modifies `req.auth`.        | `checkAuth()` manually verifies the JWT from headers. | `req.auth` doesnt exist in serverless.   |
| Auth Failure | Calls `next()` on success, or sends 401.        | Returns false on failure, or sends 401.               | `next()` is not available in serverless. |
| Role Check   | Reads `req.auth.payload['roles']`.              | Extracts roles from manually verified JWT.            | `req.auth` doesnt exist in serverless.   |

## What I did

### Removed Express Middleware (next())

Why? Vercel doesn’t support global middleware like app.use(jwtCheck). Each API function must call checkAuth() manually.

### Replaced req.auth with Manual JWT Verification

Old Code (Express):

```ts
const roles = req.auth?.payload?.['https://api.idiomvault.com/roles'] || [];
```

- req.auth was added by the Express middleware (jwtCheck).
- Vercel doesn’t modify req—so req.auth doesn’t exist.

New Code (Vercel):

```ts
const token = authHeader.split(' ')[1];
const decoded = jwt.verify(token, secret, {
  algorithms: ['RS256'],
}) as CustomJwtPayload;
const roles = decoded['https://api.idiomvault.com/roles'] || [];
```

- Manually extracts the JWT from Authorization: Bearer <token>.
- Manually verifies it using jsonwebtoken.verify().
- Extracts roles from the decoded payload.

### Fixed AUTH0_PUBLIC_KEY Handling

- Old Code: Used express-oauth2-jwt-bearer, which automatically handled Auth0’s signing key.
- New Code: We had to manually verify the JWT, so we needed AUTH0_PUBLIC_KEY.
- Why? Vercel doesn’t provide a built-in Auth0 integration like Express does.

What We Did:

- Ensured AUTH0_PUBLIC_KEY is always a string
- If missing, return 500 Server Misconfiguration instead of crashing
- Verified JWT using RS256 public key

### Changed Role Checking (checkRole())

Old Code (Express)

```ts
const checkRole = (requiredRole) => (req, res, next) => {
  const roles = req.auth?.payload?.['https://api.idiomvault.com/roles'] || [];
  if (!roles.includes(requiredRole)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};
```

- Used next() to pass control to the next Express route handler.
- Not possible in Vercel serverless functions.

New Code (Vercel)

```ts
export async function checkRole(req, res, requiredRole) {
  const decoded = await checkAuth(req, res);
  if (!decoded) return false;

  const roles = decoded['https://api.idiomvault.com/roles'] || [];
  if (!roles.includes(requiredRole)) {
    res.status(403).json({ error: 'Forbidden: Insufficient roles' });
    return false;
  }

  return true;
}
```

- Now calls checkAuth() inside each function.
- Returns false instead of calling next().
- If unauthorized, sends a 403 Forbidden response immediately.

## Final Summary

- Express middleware (next()) doesn’t work in Vercel, so we switched to explicit function calls (checkAuth()).
- Manually extract and verify JWTs, because req.auth doesn’t exist in serverless.
- Ensure AUTH0_PUBLIC_KEY is correctly formatted before using it.
- Modified checkRole() to return false instead of using next().

## How this affects api cals

Old Express API calls:

```ts
app.post('/api/idioms', jwtCheck, checkRole('Admin'), async (req, res) => {
  // API logic
});
```

New Vercel API calls:

```ts
import { checkAuth, checkRole } from '../server/authMiddleware';

export default async function handler(req, res) {
  const decoded = await checkAuth(req, res);
  if (!decoded) return;

  if (!(await checkRole(req, res, 'Admin'))) return;

  // API logic
}
```
