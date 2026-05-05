# Folder Organization Guidelines

Use this guide when adding or moving files.

## Quick Reference

| Folder | Use for | Examples |
| --- | --- | --- |
| `src/app/` | App composition, providers, routing | `App.jsx`, `AppRoutes.jsx` |
| `src/api/` | API client setup | `client.js` |
| `src/assets/` | Static source assets | Images, fonts, logos |
| `src/components/auth/` | Auth-specific UI | `UserNotRegisteredError.jsx` |
| `src/components/home/` | Home page sections | `HeroSection.jsx` |
| `src/components/layout/` | App frame | `Navbar.jsx`, `Footer.jsx`, `Layout.jsx` |
| `src/components/shared/` | Reusable project components | `SectionHeading.jsx` |
| `src/components/ui/` | shadcn/ui primitives | `button.jsx`, `input.jsx` |
| `src/config/` | App-wide configuration | `query-client.js` |
| `src/constants/` | Shared static values | Routes, endpoint constants |
| `src/contexts/` | React Context providers | `AuthContext.jsx` |
| `src/hooks/` | Custom React hooks | `use-mobile.jsx` |
| `src/lib/` | Low-level helpers | `utils.js` |
| `src/pages/` | Route-level pages | `Home.jsx`, `Contact.jsx` |
| `src/services/` | Business logic and API calls | `authService.js` |
| `backend/src/` | Express backend source | Routes, controllers, services |
| `supabase/` | Database setup | `schema.sql` |
| `docs/` | Project documentation | Structure and backend docs |

## Adding A New Frontend Feature

1. Add route-level screens to `src/pages/`.
2. Add page-specific sections to `src/components/<feature>/`.
3. Add reusable UI to `src/components/shared/`.
4. Add API calls to `src/services/`.
5. Add route wiring in `src/app/AppRoutes.jsx`.

## Import Style

Use `@/` aliases for cross-folder imports inside `src`.

```js
import { contactService } from '@/services';
import SectionHeading from '@/components/shared/SectionHeading';
```

Use relative imports for files in the same local feature folder.

```js
import StatCard from './StatCard';
```

## Quality Checks

```powershell
npm run lint
npm run typecheck
npm run build
```
