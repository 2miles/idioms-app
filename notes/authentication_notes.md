- Use Auth0 for front end user authentication and authorization to certain features.
- Use Auth0 to secure the API

# Secure API Endpoints

Require Authentication Use middleware (e.g., JWT verification) to ensure that only authenticated users can access your API.

## 1: Use express-jwt middleware to verify JSON Web Tokens (JWT) in incoming HTTP requests.

```ts
const { expressjwt: jwt } = require('express-jwt'); //do this using es6 modules though
```

## 2: Creating checkJwt Middleware

```ts
const checkJwt = jwt({
  secret: process.env.AUTH0_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});
```

Here, the jwt() function is configured to create a middleware function (checkJwt) that checks for a valid JWT in the request.

- secret:

  - This is the secret key or public key used to verify the JWT's signature.
  - In this case, process.env.AUTH0_SECRET retrieves the secret from environment variables, as provided by Auth0.

- audience:

  - Specifies the expected audience (aud claim) in the JWT.
  - This ensures the token was issued for your API and not for some other service.
  - process.env.AUTH0_AUDIENCE is an environment variable set to the identifier of your API in Auth0.

- issuer:

  - Specifies the expected issuer (iss claim) in the JWT.
  - This ensures the token was issued by your Auth0 tenant.
  - The issuer URL is typically https://<your-auth0-domain>/.

- algorithms:
  - Defines the algorithm(s) allowed for token verification.
  - RS256 (RSA with SHA-256) is the most commonly used algorithm in Auth0 for secure and asymmetric token signing.

## 3 Protecting an API endpoint

```ts
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'This is a protected route!' });
});
```

## Backend code with Auth0 Roles.

Auth0 provides a best practice to include roles in the JWT token by adding a namespace (e.g., https://your-app.com/roles). Here's how your code aligns with that:

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

Considerations When Using Auth0:

- Ensure Roles Are Included in the Token
  - By default, roles may not be included in the user's token. You'll need to enable this by configuring an Auth0 Rule or Action.
  - Example Rule to add roles to the token:

```js
    function (user, context, callback) {
      const namespace = 'https://your-app.com/';
      context.accessToken[namespace + 'roles'] = user.app_metadata.roles || [];
      callback(null, user, context);
    }
```

- Use the Correct Namespace

  Replace 'https://your-app.com/roles' with the namespace you've defined in your Auth0 tenant's Rule or Action.

- Secure Middleware with Combined Role and Token Checks

  - You’re already combining checkJwt (authentication) and checkAdminRole (authorization). This is good practice for separating concerns and enhancing clarity.

- Handle Missing Roles Gracefully
  - It’s a good idea to handle cases where roles is undefined or not present in the token, which you’ve done in your checkAdminRole function.

## What callback URL to use for Auth0

1. For Local Development:

- Use http://localhost:<port> where <port> is the port your app runs on (e.g., http://localhost:3000 for React apps).
- HTTPS is generally not needed for local development unless you've set up SSL for localhost (e.g., using a tool like mkcert).

- Example: http://localhost:3000/callback

2. For Production:

- Use https because it's a best practice for securing user data, and most modern browsers block authentication flows on http in production.
- Ensure your app is hosted on an HTTPS-enabled domain (e.g., using Vercel or another hosting provider with SSL).

## What does this mean?

It shows up in the top right corner or the auth0 universal login form

```
One or more of your connections are currently using Auth0 development keys and should not be used in production.
```

## Custom Keys, Auth0

Use Developer Keys for Development:

    Enable the desired social connections in the Auth0 dashboard and test authentication flows with developer keys.

Build and Test Core Features:

    Focus on ensuring your app works as expected, including login, logout, and token handling.

Switch to Custom Keys Before Production:

    Register your app with the social identity provider (e.g., Google).
    Replace the developer keys in the Auth0 dashboard with your custom keys.
    Test the app to ensure everything works with the custom keys.

- [ ] Add API to Auth0
- [ ] Define permissions for API
- [ ] Configure RBAC for your API
- [ ] Use the API indentifier in your backend
- [ ] Test the api

Given your requirements and the fact that you’re using the free version of Auth0, using roles instead of permissions is simpler and perfectly suitable. Here’s why:

Why Choose Roles Over Permissions? 1. Free Tier Limitation: Permissions are tied to RBAC (Role-Based Access Control), which is available on paid Auth0 plans. Roles, however, can be used for basic role assignments even on the free tier. 2. Simplicity: Your use case (admin, signed-in users, and public users) can be easily managed with roles.
• Admin Role: Full access to CRUD operations (Add, Edit, Delete idioms).
• User Role: Limited to commenting and requesting idioms.
• Public Role: No need for a role—just allow anyone to view.

## How to Implement Roles in Your App

### 1. Define the Roles

Create roles for your application:
• Admin
• User

You can assign these roles to users via the Auth0 Management Dashboard: 1. Go to your Auth0 Dashboard. 2. Navigate to User Management > Roles. 3. Create two roles: Admin and User. 4. Assign the Admin role to specific users and User to all others.

### 2. Add Roles to Tokens

To access roles in your backend, you need to add them to the user’s token. Use an Auth0 Rule:

Example Rule:

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

Summary 1. Public Access: No need for roles—just expose public routes. 2. Logged-In Users: Use the User role for commenting and idiom requests. 3. Admins: Use the Admin role for full CRUD permissions. 4. Backend: Secure routes with role-checking middleware. 5. Frontend: Use the React SDK to display features conditionally based on roles.

This setup is straightforward and works seamlessly within Auth0’s free plan limitations.
