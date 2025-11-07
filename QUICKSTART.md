# Quick Start Guide

## Prerequisites

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- Docker and Docker Compose

## Step-by-Step Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Docker Services

```bash
pnpm docker:up
```

This starts PostgreSQL and Redis containers.

### 3. Configure Environment Variables

Copy the root environment file:

```bash
cp .env.example .env
```

**Important:** All environment variables are stored in a single `.env` file at the root directory. This file is automatically loaded by:
- Backend API (reads from root `.env`)
- Frontend Next.js (reads from root `.env`)
- Database/Prisma (reads from root `.env`)
- Seed scripts (reads from root `.env`)

Update the values in `.env` with your configuration. No need for separate `.env` files in `apps/api` or `apps/web`.

### 4. Setup Database

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed
```

### 5. Start Development Servers

```bash
pnpm dev
```

This will start:
- **Backend API**: http://localhost:3001
- **Frontend Web**: http://localhost:3000

## Test Credentials

After seeding, you can login with:

**Super Admin:**
- Email: `admin@hris.com`
- Password: `password123`

**HR Manager:**
- Email: `hr@hris.com`
- Password: `password123`

**Employee:**
- Email: `employee@hris.com`
- Password: `password123`

## Available Scripts

- `pnpm dev` - Start all development servers
- `pnpm build` - Build all packages and apps
- `pnpm lint` - Lint all packages
- `pnpm test` - Run tests
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with initial data
- `pnpm db:studio` - Open Prisma Studio (database GUI)
- `pnpm docker:up` - Start Docker services
- `pnpm docker:down` - Stop Docker services

## Project Structure

```
hris-monorepo/
├── apps/
│   ├── web/          # Next.js Frontend
│   └── api/          # Express.js Backend
├── packages/
│   ├── database/     # Prisma Database Package
│   ├── shared-types/ # Shared TypeScript Types
│   ├── utils/        # Shared Utilities
│   ├── constants/   # Shared Constants
│   └── eslint-config-custom/ # ESLint Config
└── docker-compose.yml # Docker services
```

## Next Steps

1. Explore the modules in the sidebar after logging in
2. Check the System Administration module for RBAC management
3. Customize modules based on your needs
4. Add new modules following the existing structure

## Troubleshooting

### Database Connection Issues

If you see database connection errors:
1. Ensure Docker is running: `docker ps`
2. Check if containers are up: `pnpm docker:up`
3. Verify DATABASE_URL in `.env` files

### Port Already in Use

If ports 3000 or 3001 are already in use:
- Change PORT in `apps/api/.env`
- Change port in `apps/web/package.json` dev script

### Prisma Client Issues

If Prisma client is not generated:
```bash
cd packages/database
pnpm db:generate
```

