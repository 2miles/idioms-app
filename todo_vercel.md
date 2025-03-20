### Stage 1: Prepare the Codebase for Serverless

1. Move your Express backend files into Vercel’s expected format.

- Vercel expects each API route to be its own function inside an /api folder.

2. Remove app.listen(), since Vercel doesn’t need a running server.
3. Convert each API route into a separate serverless function.

### Stage 2: Test Locally Using Vercel Dev

1. Run your serverless backend locally using vercel dev.
2. Ensure the frontend can communicate with the local backend.

### Stage 3: Deploy a Private Preview on Vercel

1. Deploy backend functions to Vercel (but not live).
2. Secure API access using Auth0 authentication.

### Stage 4: Deploy to Production

1. Deploy both frontend and backend to Vercel.
2. Point your frontend API calls to the deployed backend.
