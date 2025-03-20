## 1. Environment Variables & Secrets

- [ ] Ensure all sensitive information (Auth0 credentials, database connection strings, JWT secrets, etc.) are stored as environment variables in Vercel.
- [ ] Set up your Supabase URL and API key in Vercel’s environment settings.

## 2. Database Security & Supabase Policies

- [x] Row-level security (RLS): Ensure proper policies in Supabase to restrict read/write access.
  - `Im not going to do ths right now.`
- [ ] Rate limiting: Prevent abuse by limiting API requests.
- [ ] Backups: Supabase provides automated backups, but ensure you have a plan to restore data if needed.

## 3. API & Authentication

- [ ] CORS: Ensure your API routes handle Cross-Origin Resource Sharing properly.
- [ ] Roles & Permissions: Define user roles (read-only vs. editors) in Auth0 and enforce them in API endpoints.
- [ ] JWT expiration & refresh: Ensure tokens are refreshed before expiry to avoid session issues.

## 4. Performance & Optimization

- [ ] Serverless Functions Optimization: Avoid unnecessary database queries or redundant computations.
- [ ] Image Optimization: If using images, utilize Vercel’s Image Optimization API.
- [ ] Lazy Loading & Code Splitting: Optimize your React app with dynamic imports.

## 5. Deployment & Testing

- [ ] Local Testing: Run a full test with vercel dev before deploying.
- [ ] Staging Environment: Consider having a staging deployment before pushing changes to production.
- [ ] Monitoring & Logging: Use Vercel’s logs and Supabase logs for debugging.

## 6. Domain & SEO

- [ ] Custom Domain: Set up your Porkbun domain in Vercel.
- [ ] SEO & Open Graph Tags: Ensure meta tags are set for better discoverability.
- [ ] Sitemap & robots.txt: Include these for search engine indexing.

## 7. Error Handling & User Experience

- [ ] Global Error Handling: Ensure clear error messages for failed API requests.
- [ ] Fallback UI: Display proper fallback UI when API calls fail.
- [ ] Session Expiry Handling: Log users out gracefully when their token expires.
