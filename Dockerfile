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

# Create public directory if it doesn't exist (Next.js requirement)
RUN mkdir -p /app/apps/web/public

# Generate Prisma client
RUN pnpm --filter @hris/database db:generate

# Build database package explicitly first
RUN pnpm --filter @hris/database build

# Build all packages and apps
# This will build remaining packages and apps
RUN pnpm build

# Verify database package was built
RUN ls -la /app/packages/database/ && test -f /app/packages/database/dist/index.js || (echo "Database package dist/index.js not found!" && exit 1)

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
# Copy packages - need to copy both source (for some packages) and dist (for compiled packages)
COPY --from=base /app/packages ./packages

# Copy Prisma schema (needed for generation)
COPY --from=base /app/packages/database/prisma ./packages/database/prisma

# Generate Prisma client in production stage
# Install prisma as a regular dependency (not dev) to avoid pnpm conflict
# Then generate and remove it
RUN cd packages/database && \
    pnpm add prisma@^5.7.0 && \
    pnpm prisma generate && \
    pnpm remove prisma && \
    cd ../..
# Ensure database package dist is available (it should be built during pnpm build)
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/apps/api/package.json ./apps/api/package.json
COPY --from=base /app/apps/web/.next ./apps/web/.next
# Copy public directory (will be empty if no files exist, but directory will exist)
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

