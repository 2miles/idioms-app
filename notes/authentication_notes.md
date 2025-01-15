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
