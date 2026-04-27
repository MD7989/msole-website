# MSole Website

Vite + React frontend with a custom Node.js/Express backend using Supabase Auth and Supabase Postgres.

## Prerequisites

- Node.js
- npm
- Supabase project

## Frontend Setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Frontend runs at:

```text
http://localhost:5173/
```

## Backend Setup

```powershell
npm run install:backend
Copy-Item backend\.env.example backend\.env
npm run dev:backend
```

Before starting the backend, run `supabase/schema.sql` in the Supabase SQL Editor and fill in the Supabase values in `backend/.env`.

Backend runs at:

```text
http://localhost:5000/api
```

Health check:

```text
http://localhost:5000/api/health
```

## Environment

Frontend env file:

```text
.env.local
```

Backend env file:

```text
backend/.env
```

## Documentation

See [BACKEND_DOCUMENTATION.md](./BACKEND_DOCUMENTATION.md) for the backend architecture, endpoints, database models, and local setup.
