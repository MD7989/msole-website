# Project Structure

This project contains a Vite + React frontend and a custom Node.js + Express backend using Supabase Auth and Supabase Postgres.

## Root

```text
msole-website/
  backend/                 # Express API
  supabase/                # Supabase SQL schema
  src/                     # React frontend source
  public/                  # Static public assets, if added
  BACKEND_DOCUMENTATION.md # Backend architecture and API docs
  README.md                # Setup and run commands
  package.json             # Frontend scripts plus backend helper scripts
  vite.config.js           # Vite config and /api proxy
```

## Frontend

```text
src/
  api/                     # Browser API client
  assets/                  # Images, fonts, icons, logos
  components/
    home/                  # Home page components
    layout/                # Navbar, footer, layout wrapper
    shared/                # Reusable shared components
    ui/                    # shadcn/ui components
  config/                  # Frontend app config
  constants/               # Shared constants
  contexts/                # React context providers
  hooks/                   # Custom React hooks
  lib/                     # General utilities
  middleware/              # Frontend middleware placeholders
  pages/                   # Route-level page components
  services/                # Feature-specific API service layer
  types/                   # Type definitions
  utils/                   # Utility exports
```

### Important Frontend Files

| File | Purpose |
| --- | --- |
| `src/api/client.js` | Fetch wrapper for the Express API |
| `src/services/authService.js` | Login, register, logout, and current-user API calls |
| `src/services/contactService.js` | Contact form API calls |
| `src/services/settingsService.js` | Public settings API calls |
| `src/contexts/AuthContext.jsx` | Loads public settings and manages auth state |
| `src/pages/Contact.jsx` | Sends contact messages to the custom backend |
| `vite.config.js` | Proxies `/api` to the backend during local development |

## Backend

```text
backend/
  src/
    config/                # Environment and Supabase config
    controllers/           # Route handlers
    middleware/            # Auth, validation, and error middleware
    models/                # Supabase row mappers and table constants
    routes/                # Express routers
    schemas/               # Zod validation schemas
    services/              # Email, user profile, and external-service logic
    utils/                 # Shared backend helpers
    app.js                 # Express app setup
    server.js              # Startup entrypoint
  .env.example             # Backend environment template
  package.json             # Backend dependencies and scripts
  README.md                # Backend-specific setup notes
```

### Important Backend Files

| File | Purpose |
| --- | --- |
| `backend/src/app.js` | Express app, middleware, and route mounting |
| `backend/src/server.js` | Validates Supabase config and starts the API server |
| `backend/src/config/db.js` | Supabase startup config check |
| `backend/src/config/supabase.js` | Supabase server clients |
| `backend/src/models/User.js` | User profile row mapping |
| `backend/src/models/ContactMessage.js` | Contact message row mapping |
| `backend/src/models/SiteSettings.js` | Site settings row mapping |
| `backend/src/controllers/authController.js` | Auth request handling |
| `backend/src/controllers/contactController.js` | Contact message handling |
| `backend/src/controllers/settingsController.js` | Settings handling |

## Import Aliases

The frontend uses `@/*` for imports from `src/`.

```js
import { apiClient } from '@/api/client';
import { contactService } from '@/services';
import { useAuth } from '@/contexts';
```

## Environment Files

Frontend:

```text
.env.local
```

Backend:

```text
backend/.env
```

Do not commit real `.env` files.

## Main Commands

```powershell
npm run dev
npm run dev:backend
npm run install:backend
npm run build
```

See `BACKEND_DOCUMENTATION.md` for endpoint details and backend setup.
