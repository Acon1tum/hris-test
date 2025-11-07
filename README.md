# HRIS Monorepo

A comprehensive Human Resource Information System built with Turborepo, featuring 13 modular HRIS components with dynamic Role-Based Access Control (RBAC).

## 🏗️ Architecture

- **Monorepo**: Turborepo with PNPM workspaces
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Containerization**: Docker & Docker Compose

## 📦 Modules

1. **E-Payroll** - Payroll processing and salary management
2. **Employee Self Service** - Employee portal for self-management
3. **Health & Wellness** - Health benefits and wellness programs
4. **Job Management** - Job postings and internal positions
5. **Leave Management** - Leave requests and approvals
6. **Online Job Application Portal** - External candidate applications
7. **Payroll Management** - Advanced payroll configuration
8. **Performance Management** - Employee evaluations and goals
9. **Personnel Information Management** - Employee data management
10. **Report Generation** - Analytics and reporting
11. **System Administration** - System settings, roles, and permissions
12. **Timekeeping & Attendance** - Time tracking and attendance
13. **Designations** - Job titles and organizational hierarchy

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Docker and Docker Compose

### Installation

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env
# Edit .env with your configuration

# 3. Start Docker services (PostgreSQL & Redis)
pnpm docker:up

# 4. Generate Prisma client
pnpm db:generate

# 5. Run database migrations
pnpm db:migrate

# 6. Seed database
pnpm db:seed

# 7. Start development servers
pnpm dev
```

**Note:** All environment variables are stored in a single `.env` file at the root. This file is used by:
- Backend API (Express.js)
- Frontend (Next.js)
- Database (Prisma)
- Seed scripts

### Test Credentials

**Super Admin:**
- Email: `admin@hris.com`
- Password: `password123`

**HR Manager:**
- Email: `hr@hris.com`
- Password: `password123`

**Employee:**
- Email: `employee@hris.com`
- Password: `password123`

## 📁 Project Structure

```
hris-monorepo/
├── apps/
│   ├── web/          # Next.js Frontend
│   └── api/          # Express.js Backend
├── packages/
│   ├── database/     # Prisma Database Package
│   ├── shared-types/ # Shared TypeScript Types
│   ├── utils/        # Shared Utilities
│   ├── constants/    # Shared Constants
│   └── eslint-config-custom/ # ESLint Config
└── docker-compose.yml # Docker services
```

## 🛠️ Available Scripts

### Development
- `pnpm dev` - Start all development servers (backend + frontend)
- `pnpm dev:api` or `pnpm dev:backend` - Start only backend API
- `pnpm dev:web` or `pnpm dev:frontend` - Start only frontend

### Database
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database (development)
- `pnpm db:push:reset` - Reset database and push schema (⚠️ deletes all data)
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with initial data
- `pnpm db:studio` - Open Prisma Studio (database GUI)

### Build & Deploy
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm test` - Run tests
- `pnpm format` - Format code with Prettier

### Docker
- `pnpm docker:up` - Start Docker services (PostgreSQL & Redis)
- `pnpm docker:down` - Stop Docker services

## 🔐 RBAC Features

- **Dynamic Permissions**: Create and assign permissions dynamically
- **Multiple Roles**: Users can have multiple roles
- **Module-Level Access**: Enable/disable modules per role
- **Resource & Action Based**: Permissions follow `resource:action` pattern (e.g., `employee:create`)
- **UI Integration**: Frontend automatically shows/hides features based on permissions

## 📝 Key Features

### Backend (API)
- RESTful API with Express.js
- JWT-based authentication
- Dynamic RBAC system
- Module-based architecture
- Type-safe with TypeScript
- Request validation with Zod
- Error handling middleware
- Request logging with Winston

### Frontend (Web)
- Next.js 14 with App Router
- Server-side rendering (SSR)
- Client-side state management with Zustand
- Permission-based UI rendering
- Responsive design with Tailwind CSS
- Type-safe API client

### Database
- PostgreSQL database
- Prisma ORM for type-safe queries
- Comprehensive schema for all HRIS modules
- Audit logging support
- Soft deletes support

## 🔧 Configuration

### Environment Variables

All environment variables are configured in the root `.env` file:

```env
# Database
DATABASE_URL="postgresql://..."

# JWT
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."
JWT_EXPIRES_IN="2h"
JWT_REFRESH_EXPIRES_IN="7d"

# Server
PORT=3001
FRONTEND_URL="http://localhost:3000"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001/api/v1"
```

See `.env.example` for all available variables.

## 📚 Documentation

- [API Documentation](./apps/api/README.md) - Backend API documentation
- [Frontend Documentation](./apps/web/README.md) - Frontend application documentation
- [Quick Start Guide](./QUICKSTART.md) - Detailed setup instructions

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
cd apps/api && pnpm test
```

## 🚢 Deployment

### Prerequisites
- Production database (PostgreSQL)
- Environment variables configured
- Docker (optional, for containerized deployment)

### Steps
1. Build the application: `pnpm build`
2. Set production environment variables
3. Run migrations: `pnpm db:migrate`
4. Start services

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📝 License

Private

## 🔗 Related Documentation

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
