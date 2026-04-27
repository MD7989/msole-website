# Backend Documentation

This project uses a Vite + React frontend with a custom Node.js/Express API. Authentication and data storage now run on Supabase:

```text
React/Vite frontend
  -> /api requests
  -> Vite dev proxy
  -> Express API on localhost:5000
  -> Supabase Auth + Supabase Postgres
```

The Express API keeps Supabase service-role credentials on the server. The browser only receives short-lived access tokens and refresh tokens returned by the backend auth endpoints.

## Folder Structure

```text
backend/
  src/
    config/
      db.js
      env.js
      supabase.js
    controllers/
      authController.js
      contactController.js
      settingsController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
      validateRequest.js
    models/
      ContactMessage.js
      SiteSettings.js
      User.js
    routes/
      authRoutes.js
      contactRoutes.js
      settingsRoutes.js
    schemas/
      authSchemas.js
      contactSchemas.js
      settingsSchemas.js
    services/
      emailService.js
      userService.js
    utils/
      ApiError.js
      asyncHandler.js
    app.js
    server.js
supabase/
  schema.sql
```

## Environment Variables

Frontend `.env.local`:

```env
VITE_API_BASE_URL=/api
VITE_API_PROXY_TARGET=http://localhost:5000
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DEBUG_MODE=false
```

Backend `backend/.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

EMAIL_PROVIDER=resend
RESEND_API_KEY=
RESEND_FROM="MSole Website <onboarding@resend.dev>"
CONTACT_TO_EMAIL=daniyal.amjad7989@gmail.com

SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
MAIL_FROM="MSole Website <no-reply@msole.local>"
```

Set `EMAIL_PROVIDER=resend` to send contact notifications through the Resend API. Set `EMAIL_PROVIDER=smtp` to use SMTP instead. If the selected provider is not configured, contact messages are still saved in Supabase Postgres, but email notification delivery is skipped.

## Supabase Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy `backend/.env.example` to `backend/.env`.
5. Fill in `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.

Important: never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code or Vite env files.

## Running Locally

Install frontend dependencies:

```powershell
npm install
```

Install backend dependencies:

```powershell
npm run install:backend
```

Run the backend:

```powershell
npm run dev:backend
```

In another terminal, run the frontend:

```powershell
npm run dev
```

Open:

```text
http://localhost:5173/
```

Health check:

```text
http://localhost:5000/api/health
```

## API Endpoints

### Health

```http
GET /api/health
```

### Public Settings

```http
GET /api/settings/public
```

Returns public site settings from the `site_settings` table.

### Auth

```http
POST /api/auth/register
```

Creates a Supabase Auth user and a row in `profiles`. The first profile created by this backend becomes `admin`.

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123"
}
```

```http
POST /api/auth/login
```

Returns the user, Supabase access token, refresh token, and expiry.

```http
POST /api/auth/refresh
```

Refreshes an expired Supabase access token.

```json
{
  "refreshToken": "<refresh-token>"
}
```

```http
GET /api/auth/me
Authorization: Bearer <access-token>
```

Returns the authenticated user profile.

```http
POST /api/auth/logout
Authorization: Bearer <access-token>
```

Frontend clears stored tokens after logout.

### Contact

```http
POST /api/contact
```

Stores a contact message in the `contact_messages` table and attempts email notification through the configured provider if available.

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Example Inc",
  "service": "AI Agents",
  "message": "I want to discuss a project."
}
```

```http
GET /api/contact
Authorization: Bearer <admin-access-token>
```

Lists recent contact messages. Admin only.

### Admin Settings

```http
PATCH /api/settings
Authorization: Bearer <admin-access-token>
```

Updates the singleton `site_settings` row. Admin only.

## Database Tables

### Supabase Auth

Supabase manages login identities in its internal `auth.users` table.

### profiles

Stores app-specific user fields:

- `id`, references `auth.users.id`
- `name`
- `email`
- `role`: `user` or `admin`
- `is_active`
- timestamps

### contact_messages

Stores contact form submissions:

- `name`
- `email`
- `company`
- `service`
- `message`
- `status`: `new`, `read`, `replied`, or `archived`
- `ip_address`
- `user_agent`
- email delivery fields
- timestamps

### site_settings

Stores public site configuration:

- `site_name`
- `auth_required`
- `contact_email`
- `calendly_url`
- `social_links`
- `maintenance_mode`

## Security Notes

- Supabase Auth handles password storage and token issuing.
- API authentication validates Supabase access tokens server-side.
- Admin routes require a `profiles.role` value of `admin`.
- Supabase Row Level Security is enabled in `supabase/schema.sql`.
- Request bodies are validated with Zod.
- Express uses Helmet, CORS, JSON body limits, and rate limiting.
- Resend/SMTP credentials and the Supabase service-role key stay on the backend.
