## Install the middleware generator

```
cd server;
npm install express-oauth2-jwt-bearer;
```

This allows us to:

- Validate JWTs: Ensure the incoming request contains a valid JWT in the Authorization header.
- Decode Tokens: Extract and decode the payload of the JWT, making it available in the req.auth object for further use.
- Verify Issuers and Audiences: Ensure the token's iss (issuer) and aud (audience) claims match your configuration.
- Handle Token Algorithms: Validate the signature of the token using a specified algorithm (RS256, in this case).

## Create auth middleware

```tsx
//server/authMiddleware.tsx
import 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

// jwtCheck is essentially a function designed to validate JWTs included in incoming requests. When you add jwtCheck to your Express application app.use(jwtCheck), it intercepts requests and checks whether they include a valid JWT.
export const jwtCheck = auth({
  audience: 'https://api.idiomvault.com', // This is the identifier for your API, as set in Auth0. It ensures the token is intended for your application.
  issuerBaseURL: 'https://dev-pn3ht3m1xyzl7nya.us.auth0.com/', // This is your Auth0 domain, which acts as the issuer of the JWT tokens. It's used to validate the token's origin.
  tokenSigningAlg: 'RS256', // Algorithm used to sign the JWT.
});

// Ensures the user has the required role.
export const checkRole =
  (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const roles = (req.auth?.payload?.['https://api.idiomvault.com/roles'] ||
      []) as string[];
    if (!roles.includes(requiredRole)) {
      res.status(403).json({ error: 'Forbidden: Insufficient roles' });
      return;
    }
    next();
  };

// Middleware to ensure the user has the required role to access a route.
export const checkRole =
  (requiredRole: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    // Accesses the roles from the decoded JWT token (which is added by jwtCheck middleware)
    // The roles are stored in the payload, under the custom claim 'https://api.idiomvault.com/roles'.
    const roles = (req.auth?.payload?.['https://api.idiomvault.com/roles'] ||
      []) as string[];
    // Check if the user's roles include the required role
    if (!roles.includes(requiredRole)) {
      res.status(403).json({ error: 'Forbidden: Insufficient roles' });
      return;
    }
    // If the user has the required role, pass control to the next middleware/route handler
    next();
  };
```

## Update server.ts to secure endpoints

Add this to the end of the middleware chain

```js
app.use(jwtCheck); // JWT authentication middleware applied globally
```

And define the routes like this

```js
app.get( '/api/v1/idioms', checkRole('Admin'),
  async (req, res) => {};
);

```

## Create useAuthToken hook for frontend to fetch token

```tsx
// /hooks/useAuthToken.tsx
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

// This is a hook to fetch and manage the Auth0 access token.
const useAuthToken = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!isAuthenticated || isLoading) return;
      try {
        //This function fetches the token without requiring the user to re-login.
        const fetchedToken = await getAccessTokenSilently();
        setToken(fetchedToken || null); // Always set token, even if null
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return token;
};

export default useAuthToken;
```

## Update idiomsContext to use tokens when fetching

Add auth headers to the request when fetching

```tsx
  const fetchData = async () => {
    if (!token) {
      console.error('Access token is missing. Please log in.');
      return;
    }

    try {
      const response = await IdiomFinder.get('/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ...
```

Add this to the context as well:

```tsx
useEffect(() => {
  if (!token) { return;}
  }
  //fetch only when the token is available
  fetchData();
}, [token]);
```

## Update loginButton to fetch token

```tsx
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type LoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LoginButton: React.FC<LoginButtonProps> = ({ className, ...props }) => {
  const {
    loginWithRedirect,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();
  const handleLoginClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    loginWithRedirect();
  };

  // Fetch the token directly when needed, no need to store it in state
  useEffect(() => {
    const fetchToken = async () => {
      if (!isAuthenticated || isLoading) return; // wait until the user is authenticated

      try {
        await getAccessTokenSilently(); // Get the access token silently
        // The token is now available if needed for future API requests
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchToken();
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return (
    <div>
      <button className={className} onClick={handleLoginClick} {...props}>
        Log In
      </button>
    </div>
  );
};

export default LoginButton;
```

# Temp Stuff

### 1. i may need to add this to `tsconfig.node.json`

"include": [
"db/**/*.ts",
"server.ts",
"vite.config.ts",
"../*.d.ts",
"../types/express/types.d.ts",
"../types/express/types.d.ts"
]

```

### 2. and this to `/types/express/types.d.ts`

```

// import express from 'express';
declare global {
namespace Express {
interface Request {
user?: Record<string, any>;
}
}
}

```

```

# Notes

JWTs should have an expiration time to prevent abuse if the token is compromised. Use refresh tokens to allow users to maintain their session without re-authenticating frequently.

## Example (Setting Token in HttpOnly Cookie):

```
// On your backend after authentication
res.cookie('access_token', token, {
  httpOnly: true,  // Prevent access via JavaScript
  secure: process.env.NODE_ENV === 'production',  // Ensure cookie is only sent over HTTPS in production
  sameSite: 'Strict',  // Prevent CSRF attacks
});
```
