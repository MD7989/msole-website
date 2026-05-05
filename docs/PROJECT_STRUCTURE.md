# Project Structure

This project contains a Vite + React frontend and a Node.js + Express backend backed by Supabase Auth and Supabase Postgres.

## Root

```text
msole-website/
  backend/                 # Express API application
  docs/                    # Project, backend, and restructure documentation
  public/                  # Static files served by Vite
  src/                     # React frontend source
  supabase/                # Database schema and Supabase setup SQL
  README.md                # Primary setup and run guide
  package.json             # Frontend scripts plus backend helper scripts
  vite.config.js           # Vite config and /api development proxy
```

## Frontend

```text
src/
  app/                     # App shell, providers, and route composition
    App.jsx
    AppRoutes.jsx
    pages.config.js
  api/                     # Browser API client setup
  assets/                  # Images, fonts, icons, and logos
  components/
    auth/                  # Authentication-specific UI
    home/                  # Home page sections
    layout/                # Navbar, footer, and layout wrapper
    shared/                # Reusable project components
    ui/                    # shadcn/ui primitives
  config/                  # Frontend app configuration
  constants/               # Shared constants
  contexts/                # React context providers
  hooks/                   # Custom React hooks
  lib/                     # General helpers used by UI primitives
  middleware/              # Frontend middleware placeholders
  pages/                   # Route-level page components
  services/                # API-facing business services
  types/                   # Shared type definitions
  utils/                   # Utility exports
```

## Backend

```text
backend/
  src/
    config/                # Environment, database, and Supabase config
    controllers/           # Express route handlers
    middleware/            # Auth, validation, and error middleware
    models/                # Supabase table constants and row mappers
    routes/                # Express routers
    schemas/               # Zod request validation schemas
    services/              # Email, user, and external service logic
    utils/                 # Shared backend helpers
    app.js                 # Express app setup
    server.js              # Startup entrypoint
  .env.example             # Backend environment template
  package.json             # Backend dependencies and scripts
  README.md                # Backend-specific setup notes
```

## Import Aliases

The frontend uses `@/*` for imports from `src/`.

```js
import { apiClient } from '@/api/client';
import { AppRoutes } from '@/app/AppRoutes';
import { contactService } from '@/services';
import { useAuth } from '@/contexts';
```

## Documentation

Project docs live in `docs/`.

- `docs/BACKEND_DOCUMENTATION.md`
- `docs/FOLDER_GUIDELINES.md`
- `docs/IMPLEMENTATION_CHECKLIST.md`
- `docs/RESTRUCTURE_SUMMARY.md`

## Main Commands

```powershell
npm run dev
npm run dev:backend
npm run install:backend
npm run build
```
