#!/bin/bash
# Build script for Render deployment
# This script ensures pnpm is available and builds the monorepo correctly

set -e  # Exit on error

echo "🔧 Enabling corepack..."
corepack enable

echo "📦 Preparing pnpm..."
corepack prepare pnpm@8.12.0 --activate

echo "📥 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🗄️ Generating Prisma client..."
pnpm --filter @hris/database db:generate

echo "✅ Build script completed successfully"

