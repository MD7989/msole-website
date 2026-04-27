# MSole Backend

Custom Node.js and Express API for the MSole website.

The backend uses:

- Supabase Auth for users and sessions
- Supabase Postgres for app data
- Resend API or SMTP for optional contact email notifications

## Setup

```powershell
npm install
Copy-Item .env.example .env
```

Create a Supabase project, run `../supabase/schema.sql` in the Supabase SQL Editor, then fill in these values in `backend/.env`:

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
EMAIL_PROVIDER=resend
RESEND_API_KEY=
RESEND_FROM="MSole Website <onboarding@resend.dev>"
CONTACT_TO_EMAIL=daniyal.amjad7989@gmail.com
```

Start the API:

```powershell
npm run dev
```

The API runs on:

```text
http://localhost:5000/api
```

## Main Endpoints

- `GET /api/health`
- `GET /api/settings/public`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/auth/me`
- `POST /api/contact`
- `GET /api/contact` admin only
- `PATCH /api/settings` admin only
