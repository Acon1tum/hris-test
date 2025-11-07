# HRIS Web - Frontend Documentation

Next.js 14 frontend application for the Quanby HRIS with TypeScript, Tailwind CSS, and dynamic RBAC integration.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Backend API running (see [API README](../api/README.md))

### Installation

```bash
# From root directory
pnpm install

# Ensure .env file is configured at root
cp .env.example .env
```

### Running the Frontend

```bash
# From root - run frontend only
pnpm dev:web

# Or from this directory
cd apps/web
pnpm dev
```

The frontend will start on `http://localhost:3000`

## 📁 Project Structure

```
apps/web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth routes group
│   │   │   └── login/
│   │   ├── (dashboard)/        # Protected dashboard routes
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   ├── page.tsx        # Dashboard home
│   │   │   ├── e-payroll/      # Module pages
│   │   │   ├── leave-management/
│   │   │   └── ... (other modules)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # Shadcn UI components
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── rbac/               # RBAC components
│   │   │   └── PermissionGate.tsx
│   │   └── modules/            # Module-specific components
│   ├── lib/                    # Utilities
│   │   ├── api-client.ts       # API client (Axios)
│   │   └── utils.ts            # Helper functions
│   ├── stores/                 # Zustand stores
│   │   └── auth-store.ts       # Authentication state
│   ├── hooks/                  # Custom React hooks
│   └── types/                  # TypeScript types
├── public/                     # Static assets
└── package.json
```

## 🔌 API Integration

### API Client

The frontend uses a centralized API client located in `src/lib/api-client.ts`:

```typescript
import { apiClient } from '@/lib/api-client';

// GET request
const response = await apiClient.get('/auth/me');

// POST request
const response = await apiClient.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
});
```

### Authentication

The API client automatically:
- Adds JWT token to requests
- Handles 401 errors (redirects to login)
- Manages token refresh

## 🔐 Authentication & Authorization

### Auth Store

Authentication state is managed with Zustand:

```typescript
import { useAuthStore } from '@/stores/auth-store';

const { user, isAuthenticated, hasPermission } = useAuthStore();

// Check permissions
if (hasPermission('employee:create')) {
  // Show create button
}
```

### Permission-Based UI

Use the `PermissionGate` component to conditionally render UI:

```typescript
import { PermissionGate } from '@/components/rbac/PermissionGate';

<PermissionGate permissions={['employee:create']}>
  <button>Create Employee</button>
</PermissionGate>
```

### Module Access

Modules are automatically shown/hidden based on user permissions:

```typescript
const { hasModuleAccess } = useAuthStore();

// Sidebar only shows accessible modules
{accessibleModules.map(module => (
  <Link href={`/${module.slug}`}>{module.name}</Link>
))}
```

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling. Configuration in `tailwind.config.ts`.

### Shadcn UI

Reusable UI components from Shadcn UI. Components located in `src/components/ui/`.

### Custom Styles

Global styles in `src/app/globals.css` with CSS variables for theming.

## 📱 Pages & Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page (if enabled)

### Protected Routes (Dashboard)
- `/dashboard` - Main dashboard
- `/e-payroll` - Payroll module
- `/leave-management` - Leave management
- `/personnel-information-management` - Employee management
- `/system-administration` - System settings
- ... (other modules)

### Route Groups

- `(auth)` - Authentication routes
- `(dashboard)` - Protected dashboard routes with layout

## 🛠️ Development

### Adding a New Page

1. Create page in `src/app/(dashboard)/your-module/page.tsx`:

```typescript
export default function YourModulePage() {
  return (
    <div>
      <h1>Your Module</h1>
    </div>
  );
}
```

### Adding a New Component

1. Create component in `src/components/your-component/YourComponent.tsx`:

```typescript
'use client';

export function YourComponent() {
  return <div>Your Component</div>;
}
```

### Using the API Client

```typescript
'use client';

import { apiClient } from '@/lib/api-client';
import { useEffect, useState } from 'react';

export function YourComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await apiClient.get('/your-endpoint');
      if (response.success) {
        setData(response.data);
      }
    }
    fetchData();
  }, []);

  return <div>{/* Render data */}</div>;
}
```

## 🔧 Configuration

### Environment Variables

Required environment variables (in root `.env`):

```env
# API URL (exposed to browser)
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

**Note**: Only variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety
- `tailwindcss` - CSS framework
- `zustand` - State management
- `axios` - HTTP client

### UI Components
- `@radix-ui/*` - Accessible UI primitives
- `lucide-react` - Icons
- `class-variance-authority` - Component variants
- `clsx` & `tailwind-merge` - Class utilities

### Forms
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `@hookform/resolvers` - Form validation

## 🧪 Testing

```bash
# Run tests (when configured)
pnpm test

# Run linting
pnpm lint
```

## 🚀 Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

The production build will be in `.next` directory.

## 📱 Responsive Design

The application is fully responsive:
- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Touch-friendly interfaces

## 🎯 Best Practices

1. **Use 'use client'** for components with interactivity
2. **Server Components** by default for better performance
3. **Type Safety** - Use TypeScript types from `@hris/shared-types`
4. **Permission Checks** - Always check permissions before rendering sensitive UI
5. **Error Handling** - Use try-catch for API calls
6. **Loading States** - Show loading indicators during API calls

## 🔗 Related

- [API Documentation](../api/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)

