# Setting Up and Integrating Auth0 with Idioms App

## Overview

Auth0 simplifies authentication and authorization for applications by providing a secure and flexible identity management platform. It enables developers to manage users, roles, and permissions seamlessly while integrating with APIs and front-end/back-end applications.

This document covers the key components of the Auth0 setup for the Idioms App, including configuration, authentication flow, and implementation details.

---

## Key Concepts

### Auth0

1. **Account**:

   - Your Auth0 account is the central hub for managing applications, APIs, users, roles, and permissions.

2. **Applications**:

   - Example: Idioms App uses a SPA for the front-end.

3. **APIs**:

   - **Identifier (Audience)**: A unique URL (e.g., `https://api.idiomvault.com`) to identify your API.
   - Define granular permissions, such as `create:idiom`, `delete:idiom`, etc.

4. **Users**:

   - Auth0 stores user data securely, including profile information, metadata, and roles.

5. **Roles**:

   - Assign predefined sets of permissions to users.
   - Example:
     - **Admin**: Full access (`create:idiom`, `delete:idiom`, etc.).
     - **Reader**: Read-only access.

6. **Permissions**:
   - Permissions define actions users can perform.
   - Example:
     - `create:idiom`: Permission to add idioms.
     - `delete:idiom`: Permission to remove idioms.

### Auth0 Domain and Client ID

#### Domain

- The unique URL for your Auth0 tenant. It identifies your Auth0 account and serves as the base URL for all authentication-related operations, such as login and token requests.

- When a user logs in, the Auth0-hosted login page is accessed via the domain.

#### Client ID

- A unique identifier for a specific application registered in your Auth0 tenant.
- When a token is requested, the Client ID is sent to indicate which app the token is for.

---

### Example Usage in Auth0 Integration

When setting up the `Auth0Provider` in your React app:

```tsx
<Auth0Provider
  domain={'dev-pn3ht3m1xyzl7nya.us.auth0.com'}
  clientId={'1CqdWEkyUXWDasuGa7fEYbrEkqeI1ayo'}
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: 'https://api.idiomvault.com',
  }}
>
  <App />
</Auth0Provider>
```

### Auth0 Actions and Triggers

- **Auth0 Server-side Post-Login Trigger**:
  - Automatically adds roles to the token during the login process.
  - Run after login
    ```javascript
    api.accessToken.setCustomClaim('https://api.idiomvault.com/roles', [
      'Admin',
    ]);
    ```

---

### JWT Tokens

- JSON Web Tokens (JWTs) are compact, URL-safe tokens containing user data and claims.
- Issued by Auth0 upon successful login.
- Encoded payload includes roles, permissions, and other metadata.
- Back-end uses `jwtCheck` middleware to validate tokens.

---

## Authentication Flow

### Front-End

1. **Login**:
   - A login button calls Auth0's `loginWithRedirect` or `loginWithPopup`.
   - Users are redirected to the Auth0-hosted login page.
2. **Fetch Token**:
   - The `useAuthToken` hook retrieves the token using `getAccessTokenSilently` from Auth0's React SDK.
   - Example token payload:
     ```json
     {
       "https://api.idiomvault.com/roles": ["Admin"],
       "permissions": ["create:idiom", "delete:idiom"]
     }
     ```
3. **Authorization Header**:
   - The token is passed as a `Bearer` token in the `Authorization` header for API requests.
     ```javascript
     headers: {
       Authorization: `Bearer ${token}`,
     }
     ```

### Back-End

1. **JWT Validation**:
   - `jwtCheck` middleware verifies the token’s validity and decodes it.
   - Decoded token:
     ```json
     {
       "sub": "auth0|678737128505f3f311caa533",
       "https://api.idiomvault.com/roles": ["Admin"],
       "permissions": ["create:idiom", "delete:idiom"]
     }
     ```
2. **Role-Based Access Control (RBAC)**:
   - `checkRole` middleware checks the user’s roles and ensures they match the required role for the endpoint.
     ```javascript
     checkRole('Admin');
     ```

---

## Code Structure

### Front-End Components

1. **AuthProvider**:

   - Wraps your app to provide Auth0 context and enable authentication.
     ```tsx
     <Auth0Provider
       domain="YOUR_DOMAIN"
       clientId="YOUR_CLIENT_ID"
       audience="https://api.idiomvault.com"
       redirectUri={window.location.origin}
     >
       <App />
     </Auth0Provider>
     ```

2. **useAuthToken Hook**:

   - Fetches and stores the access token for authenticated users.
     ```typescript
     const token = useAuthToken();
     ```

3. **Login Button**:

   - Handles login and token retrieval.
     ```tsx
     const LoginButton = () => {
       const { loginWithRedirect } = useAuth0();
       return <button onClick={() => loginWithRedirect()}>Log In</button>;
     };
     ```

4. **IdiomsContext**:
   - Provides idiom data and handles API interactions.
   - Passes the token in the headers for secure API requests.
     ```javascript
     const fetchIdioms = async () => {
       const response = await axios.get('/api/v1/idioms', {
         headers: { Authorization: `Bearer ${token}` },
       });
       setIdioms(response.data);
     };
     ```

---

### Back-End Components

1. **jwtCheck Middleware**:

   - Validates JWT and adds decoded payload to `req.auth`.
     ```javascript
     app.use(jwtCheck);
     ```

2. **checkRole Middleware**:
3. **API Routes**:
   - Protected endpoints using middleware.
     ```javascript
     //server.ts
     app.get('/api/v1/idioms', checkRole('Admin'), async (req, res) => {
       const idioms = await pool.query('SELECT * FROM idioms');
       res.json(idioms.rows);
     });
     ```

---

## Key Points

1. **Auth0 Configuration**:
   - Create an Auth0 application (SPA) and API.
   - Define roles, permissions, and post-login actions.
2. **Authentication**:
   - Front-end handles user login and token retrieval using `useAuthToken`.
3. **Authorization**:
   - Back-end validates tokens with `jwtCheck` and applies role-based checks with `checkRole`.
4. **Secure API Requests**:
   - Tokens are sent via the `Authorization` header.
5. **Seamless Integration**:
   - Auth0 simplifies user management, while roles and permissions enforce granular control.

---

```

```

- Use Auth0 for front end user authentication and authorization to certain features.
- Use Auth0 to secure the API

# Secure API Endpoints

Require Authentication
Use middleware (e.g., JWT verification) to ensure that only authenticated users can access your API.

## 1: Use express-jwt middleware to verify JSON Web Tokens (JWT) in incoming HTTP requests.

## 2: Creating checkJwt Middleware

## 3 Protecting an API endpoint

```ts
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});
```

## Backend code with Auth0 Roles.

Auth0 provides a best practice to include roles in the JWT token by adding a namespace (e.g., https://your-app.com/roles).

```js
const checkAdminRole = (req, res, next) => {
  // Extract roles from the user's token
  const roles = req.user['https://your-app.com/roles'] || [];

  // Check if the user has the 'admin' role
  if (!roles.includes('admin')) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }

  // If the user is an admin, proceed to the next middleware or route handler
  next();
};

// Protect the route with both JWT authentication and role check
app.post('/api/add-idiom', checkJwt, checkAdminRole, (req, res) => {
  // Logic to add idiom
  res.json({ message: 'Idiom added successfully!' });
});
```

- Replace 'https://your-app.com/roles' with the namespace you've defined in your Auth0 tenant's Rule or Action.

- Secure Middleware with Combined Role and Token Checks. Combine checkJwt (authentication) and checkAdminRole (authorization). This is good practice for separating concerns and enhancing clarity.

- Handle cases where roles is undefined or not present in the token, which you’ve done in your checkAdminRole function.

## What callback URL to use for Auth0

1. For Local Development:

- Use http://localhost:<port> where <port> is the port your app runs on.
- HTTPS is generally not needed for local development unless you've set up SSL for localhost (e.g., using a tool like mkcert).

2. For Production:

- Use https because it's a best practice for securing user data, and most modern browsers block authentication flows on http in production.
- Ensure your app is hosted on an HTTPS-enabled domain (e.g., using Vercel or another hosting provider with SSL).

## Auth0, Development keys, Custom Keys

Use Developer Keys for Development:

- Enable the desired social connections in the Auth0 dashboard and test authentication flows with developer keys.

Switch to Custom Keys Before Production:

- Register your app with the social identity provider (e.g., Google).
- Replace the developer keys in the Auth0 dashboard with your custom keys.
- Test the app to ensure everything works with the custom keys.

## TODO

- [x] Add API to Auth0
- [x] Define permissions for API
- [x] Configure RBAC for your API
- [x] Update roles to include permissions
- [ ] Use the API indentifier in your backend
- [ ] Test the api

Given your requirements and the fact that you’re using the free version of Auth0, using roles instead of permissions is simpler and perfectly suitable. Here’s why:

Why Choose Roles Over Permissions? 1. Free Tier Limitation: Permissions are tied to RBAC (Role-Based Access Control), which is available on paid Auth0 plans. Roles, however, can be used for basic role assignments even on the free tier. 2. Simplicity: Your use case (admin, signed-in users, and public users) can be easily managed with roles.
• Admin Role: Full access to CRUD operations (Add, Edit, Delete idioms).
• User Role: Limited to commenting and requesting idioms.
• Public Role: No need for a role—just allow anyone to view.

## Implementing Roles in Your App

### 2. Add Roles to Tokens

To access roles in your backend, you need to add them to the user’s token.
Use an Auth0 Rule:

```js
function (user, context, callback) {
  const namespace = 'https://your-app.com/';
  context.accessToken[namespace + 'roles'] = user.app_metadata.roles || [];
  callback(null, user, context);
}
```

    •	This appends the roles claim to the token under a custom namespace.

### 3. Secure Your Backend API

Example Middleware:

```js
const checkAdminRole = (req, res, next) => {
  const roles = req.user['https://your-app.com/roles'] || [];
  if (!roles.includes('admin')) {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

const checkUserRole = (req, res, next) => {
  const roles = req.user['https://your-app.com/roles'] || [];
  if (!roles.includes('user') && !roles.includes('admin')) {
    return res.status(403).json({ error: 'Forbidden: User access required' });
  }
  next();
};
```

Protecting API endpoint

```js
// Example Routes
app.post('/api/add-idiom', checkJwt, checkAdminRole, (req, res) => {
  res.json({ message: 'Idiom added successfully!' });
});

app.post('/api/comment', checkJwt, checkUserRole, (req, res) => {
  res.json({ message: 'Comment submitted successfully!' });
});
```

### 4. Handle Public Access

Public users (not logged in) can view idioms without authentication. No middleware is required for these routes.

Example:

```js
app.get('/api/idioms', (req, res) => {
  // Fetch idioms from the database
  res.json({ idioms: [] });
});
```

### 5. Secure Your Frontend

On the frontend, use Auth0’s React SDK to manage role-based rendering.

Example:

```js
import { useAuth0 } from '@auth0/auth0-react';

const IdiomPage = () => {
  const { user, isAuthenticated } = useAuth0();

  const isAdmin =
    isAuthenticated && user?.['https://your-app.com/roles']?.includes('admin');
  const isUser =
    isAuthenticated && user?.['https://your-app.com/roles']?.includes('user');

  return (
    <div>
      <h1>Idiom Vault</h1>
      {/* Publicly visible information */}
      <IdiomList />

      {isUser && <button>Request an Idiom</button>}
      {isAdmin && <button>Add Idiom</button>}
    </div>
  );
};
```

Summary

1. Public Access: No need for roles—just expose public routes.
2. Logged-In Users: Use the User role for commenting and idiom requests.
3. Admins: Use the Admin role for full CRUD permissions
4. Backend: Secure routes with role-checking middleware.
5. Frontend: Use the React SDK to display features conditionally based on roles.

This setup is straightforward and works seamlessly within Auth0’s free plan limitations.

## req.user bug for getting roles.

The issue im facing is that the req.user is undefined when trying to access it in the checkRole middleware.
