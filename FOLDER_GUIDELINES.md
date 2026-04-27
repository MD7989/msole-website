# Folder Organization Guidelines

## 📋 Quick Reference

### When to use each folder:

| Folder | Use Case | Examples |
|--------|----------|----------|
| `api/` | API client setup and configuration | base44Client.js |
| `assets/` | Static files | images/, fonts/, logos/ |
| `components/` | Reusable React UI components | Navbar.jsx, Card.jsx |
| `config/` | App-wide configuration | appParams, queryClient |
| `constants/` | Hardcoded values and constants | API_ENDPOINTS, DEFAULT_VALUES |
| `contexts/` | Global state with React Context | AuthContext, ThemeContext |
| `hooks/` | Custom React hooks | useMobile, useAuth, useFetch |
| `lib/` | Utility functions and helpers | formatDate(), parseJSON() |
| `middleware/` | API interceptors and middleware | requestInterceptor, errorHandler |
| `pages/` | Full page components for routing | Home.jsx, About.jsx |
| `services/` | Business logic and API calls | userService, projectService |
| `types/` | TypeScript interfaces and types | User, Project, AppSettings |
| `utils/` | General utility exports | Common utility aggregators |

## 🚀 Adding New Features - Example Workflow

### Scenario: Add a new "Dashboard" page with authentication

```
1. Create page component:
   src/pages/Dashboard.jsx

2. Create feature-specific components:
   src/components/dashboard/
   ├── StatCard.jsx
   ├── Chart.jsx
   └── Header.jsx

3. Create service for API calls:
   src/services/dashboardService.js
   - Export getDashboardData()
   - Export getStatistics()

4. Add constants if needed:
   src/constants/index.js
   - Export DASHBOARD_ROUTES
   - Export STAT_TYPES

5. Use hooks for auth check:
   import { useAuth } from '@/contexts'
   - Add useAuth() in Dashboard.jsx

6. Add route in App.jsx:
   <Route path="/dashboard" element={<Dashboard />} />
```

## 📦 Import Best Practices

### ✅ DO Use Path Aliases
```javascript
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/contexts';
import { getDashboardData } from '@/services/dashboardService';
import { COLORS } from '@/constants';
```

### ❌ DON'T Use Relative Paths for src/ files
```javascript
// Avoid these:
import { useAuth } from '../../../../contexts/AuthContext';
import { base44 } from '../../../api/base44Client';
```

### ✅ DO Use Relative Paths for Local Components
```javascript
// In src/components/dashboard/StatCard.jsx
import Chart from './Chart'; // Same folder
import SectionHeading from '../shared/SectionHeading'; // Parent folder
```

## 🔍 Checking Your Code Quality

### Run linter:
```bash
npm run lint
```

### Fix linter issues:
```bash
npm run lint:fix
```

### Type check:
```bash
npm run typecheck
```

## 🎯 Structure Principles

1. **Single Responsibility** - Each folder has one purpose
2. **Scalability** - Easy to add new features without restructuring
3. **Maintainability** - Clear naming and organization
4. **Discoverability** - Developers can find files quickly
5. **Separation of Concerns** - Business logic separate from UI

## 📌 Common Questions

**Q: Where do I put a button that's only used in one component?**  
A: Keep it in the same file as the parent component, or in a local `./components` subfolder if it's complex.

**Q: Where do I put shared utility functions?**  
A: In `src/utils/` or create a specific file in `src/lib/` for related utilities.

**Q: Where do I put form validation logic?**  
A: In `src/services/` as a validation service, or in `src/lib/validators.js`.

**Q: Where do I put API constants?**  
A: In `src/constants/` or create `src/api/endpoints.js` for API-specific routes.

**Q: When should I create a new Context?**  
A: When you have global state that needs to be accessed by many components. Examples: Auth, Theme, Notifications.

**Q: When should I create a new service?**  
A: When you have API calls or business logic that's separate from component rendering. Group by feature (auth, projects, users, etc.).
