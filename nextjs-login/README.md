# Next.js Login/Signup Example (MongoDB)

This repository is a minimal Next.js app demonstrating a simple signup/login flow using MongoDB (Mongoose), JWT stored in an httpOnly cookie, and server-side API routes.

Setup

1. Install dependencies

```bash
cd "$(pwd)"/"/Users/hardik/Library/Mobile Documents/com~apple~CloudDocs/Projects/local projects/nextjs-login"
npm install
```

2. Create `.env.local` from the example and set values:

```
MONGO_URI=your_mongo_uri
JWT_SECRET=some_long_secret
JWT_EXPIRES_IN=7d
```

3. Run development server

```bash
npm run dev
```

Endpoints

- `POST /api/auth/signup` - body: `{ email, password }` — creates user and sets cookie
- `POST /api/auth/login` - body: `{ email, password }` — authenticates and sets cookie
- `GET /api/auth/me` - requires cookie — returns current user

- `POST /api/auth/logout` - clears the auth cookie (call from client to log out)

Notes

- This is intentionally minimal. For production you should:
  - Use HTTPS and a strong `JWT_SECRET`.
  - Consider refresh tokens or rotating tokens.
  - Add input validation and rate limiting.
  - Add logout route to clear the cookie.
