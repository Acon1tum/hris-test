# Multi-stage build for HRIS Monorepo
FROM node:18-alpine AS base

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@8.12.0 --activate

# Install PM2 globally for process management
RUN npm install -g pm2

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/database/package.json ./packages/database/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/constants/package.json ./packages/constants/
COPY packages/utils/package.json ./packages/utils/
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY packages ./packages
COPY apps ./apps

# Generate Prisma client
RUN pnpm --filter @hris/database db:generate

# Build all packages and apps
RUN pnpm build

# Production stage
FROM node:18-alpine AS production

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@8.12.0 --activate

# Install PM2 globally
RUN npm install -g pm2

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/database/package.json ./packages/database/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/constants/package.json ./packages/constants/
COPY packages/utils/package.json ./packages/utils/
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# Copy built files from base stage
COPY --from=base /app/packages ./packages
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/apps/api/package.json ./apps/api/package.json
COPY --from=base /app/apps/web/.next ./apps/web/.next
COPY --from=base /app/apps/web/public ./apps/web/public
COPY --from=base /app/apps/web/package.json ./apps/web/package.json
COPY --from=base /app/apps/web/next.config.js ./apps/web/next.config.js
COPY --from=base /app/apps/web/tsconfig.json ./apps/web/tsconfig.json

# Copy PM2 ecosystem file
COPY ecosystem.config.js ./

# Expose ports
# API on 3001, Frontend on 3000
EXPOSE 3000 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start both services with PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

