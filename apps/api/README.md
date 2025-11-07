# HRIS API - Backend Documentation

Express.js REST API for the Quanby HRIS with TypeScript, featuring dynamic RBAC and modular architecture.

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- PostgreSQL database (via Docker or local installation)
- Redis (optional, for caching)

### Installation

```bash
# From root directory
pnpm install

# Ensure .env file is configured at root
cp .env.example .env
```

### Running the API

```bash
# From root - run API only
pnpm dev:api

# Or from this directory
cd apps/api
pnpm dev
```

The API will start on `http://localhost:3001` (or PORT from .env)

## 📁 Project Structure

```
apps/api/
├── src/
│   ├── index.ts              # Entry point
│   ├── app.ts                # Express app configuration
│   ├── config/               # Configuration files
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── permission.middleware.ts
│   │   ├── module-access.middleware.ts
│   │   └── error.middleware.ts
│   ├── modules/              # Feature modules
│   │   ├── auth/             # Authentication
│   │   ├── rbac/             # Role-Based Access Control
│   │   ├── e-payroll/
│   │   ├── leave-management/
│   │   └── ... (other modules)
│   ├── routes/               # Route aggregator
│   ├── utils/                # Utility functions
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   └── response.ts
│   └── types/                # TypeScript types
└── package.json
```

## 🔌 API Endpoints

### Authentication

```
POST   /api/v1/auth/login     # Login
POST   /api/v1/auth/register  # Register new user
GET    /api/v1/auth/me         # Get current user (requires auth)
```

### RBAC (Role-Based Access Control)

```
# Roles
POST   /api/v1/rbac/roles                      # Create role
GET    /api/v1/rbac/roles                      # List roles
GET    /api/v1/rbac/roles/:id                  # Get role by ID
DELETE /api/v1/rbac/roles/:id                 # Delete role

# Permissions
POST   /api/v1/rbac/permissions                # Create permission
GET    /api/v1/rbac/permissions                # List permissions

# Role-Permission Assignment
POST   /api/v1/rbac/roles/:roleId/permissions  # Assign permissions to role
POST   /api/v1/rbac/roles/:roleId/modules      # Assign modules to role

# User-Role Assignment
POST   /api/v1/rbac/users/:userId/roles        # Assign roles to user
GET    /api/v1/rbac/users/:userId/permissions # Get user permissions
```

### Health Check

```
GET    /health                 # Health check endpoint
```

## 🔐 Authentication

### JWT Tokens

The API uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Short-lived (default: 2 hours), used for API requests
- **Refresh Token**: Long-lived (default: 7 days), used to refresh access tokens

### Using Authentication

Include the token in the Authorization header:

```bash
Authorization: Bearer <access_token>
```

### Example Request

```bash
curl -X GET http://localhost:3001/api/v1/auth/me \
  -H "Authorization: Bearer <your_token>"
```

## 🔒 Authorization

### Permission-Based Access

Routes are protected using permission middleware:

```typescript
router.post('/employees', 
  authenticate, 
  requirePermission('employee:create'),
  controller.create
);
```

### Module Access Control

Modules can be enabled/disabled per role:

```typescript
router.use('/e-payroll',
  authenticate,
  requireModuleAccess('e-payroll'),
  payrollRoutes
);
```

### Permission Format

Permissions follow the pattern: `resource:action`

- **Resources**: `employee`, `payroll`, `leave`, `attendance`, etc.
- **Actions**: `create`, `read`, `update`, `delete`, `approve`, `export`

## 📝 Request/Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Paginated Response

```json
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "pageSize": 10,
    "totalPages": 10,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "errors": {
    "field": ["Error details"]
  }
}
```

## 🛠️ Development

### Adding a New Module

1. Create module directory: `src/modules/your-module/`
2. Create files:
   - `your-module.controller.ts`
   - `your-module.service.ts`
   - `your-module.routes.ts`
   - `dto/` - Data Transfer Objects
3. Add routes to `src/routes/index.ts`

### Example Module Structure

```typescript
// your-module.controller.ts
export class YourModuleController {
  private service = new YourModuleService();

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getAll();
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
}

// your-module.routes.ts
const router: IRouter = Router();
const controller = new YourModuleController();

router.use(authenticate);
router.use(requireModuleAccess('your-module'));
router.get('/', controller.getAll);

export default router;
```

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 📊 Logging

The API uses Winston for logging:

- **Development**: Logs to console with colors
- **Production**: Logs to files (`error.log`, `combined.log`)

Log levels: `error`, `warn`, `info`, `debug`

## 🔧 Configuration

### Environment Variables

Required environment variables (in root `.env`):

```env
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/hris_db

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=2h
JWT_REFRESH_EXPIRES_IN=7d

# Redis (optional)
REDIS_URL=redis://localhost:6379
```

## 🚨 Error Handling

The API uses a centralized error handling middleware:

```typescript
// Custom errors
throw new ApiError(404, 'Resource not found');
throw new BadRequestError('Invalid input');
throw new UnauthorizedError('Authentication required');
throw new ForbiddenError('Insufficient permissions');
```

## 📦 Dependencies

### Core
- `express` - Web framework
- `typescript` - Type safety
- `prisma` - Database ORM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `zod` - Schema validation

### Development
- `nodemon` - Auto-reload
- `ts-node` - TypeScript execution
- `winston` - Logging
- `eslint` - Linting

## 🔗 Related

- [Frontend Documentation](../web/README.md)
- [Database Schema](../../packages/database/prisma/schema.prisma)
- [Shared Types](../../packages/shared-types/README.md)

