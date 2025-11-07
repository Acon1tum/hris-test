# Deployment Guide for Render

This guide will help you deploy your HRIS monorepo to Render using Neon DB.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **Neon DB Account**: Sign up at [neon.tech](https://neon.tech) (if not already done)
3. **GitHub/GitLab Repository**: Your code should be in a Git repository

## Step 1: Set Up Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project (or use existing)
3. Copy your connection string from the Neon dashboard
   - Make sure to use the **pooler** connection string for better performance
   - Format: `postgresql://user:password@host/database?sslmode=require`

## Step 2: Deploy to Render

### ⚠️ Important: Blueprint Requires Credit Card

**Render Blueprint requires a credit card**, even for free tier services. If you want to deploy **without a credit card**, use the **manual setup** method below or see `DEPLOY_FREE.md` for detailed free tier instructions.

### Option A: Using render.yaml (Requires Credit Card)

1. **Push your code to GitHub/GitLab** (make sure `render.yaml` is committed)

2. **Connect Repository to Render**:
   - Go to Render Dashboard → New → Blueprint
   - Connect your repository
   - Render will automatically detect `render.yaml`
   - **Note**: You'll be asked for a credit card (even for free tier)

3. **Set Environment Variables** in Render Dashboard:
   
   For **hris-api** service:
   - `DATABASE_URL`: Your Neon DB connection string
   - `JWT_SECRET`: Generate a secure random string (min 32 chars)
   - `JWT_REFRESH_SECRET`: Generate a secure random string (min 32 chars)
   - `REDIS_URL`: (Optional) If using Redis, your Redis connection string

   For **hris-web** service:
   - `DATABASE_URL`: Same Neon DB connection string (needed for Prisma generation)
   - `NEXT_PUBLIC_API_URL`: Will be auto-set, but verify it matches your API URL

4. **Deploy**:
   - Render will automatically deploy both services
   - Wait for build to complete (first build may take 5-10 minutes)

### Option B: Manual Setup (No Credit Card Required) ⭐

**This is the recommended method if you don't want to use a credit card.**

See `DEPLOY_FREE.md` for detailed step-by-step instructions.

Quick steps:

#### Backend API Service

1. Go to Render Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Name**: `hris-api`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && pnpm --filter @hris/database db:generate && pnpm --filter @hris/api build`
   - **Start Command**: `pnpm --filter @hris/api start`
   - **Plan**: Starter (or higher)
   - **Region**: Oregon (or your preferred region)

4. Add Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<your-neon-connection-string>
   JWT_SECRET=<your-secret>
   JWT_REFRESH_SECRET=<your-refresh-secret>
   JWT_EXPIRES_IN=2h
   JWT_REFRESH_EXPIRES_IN=7d
   SESSION_TIMEOUT_SECONDS=1800
   RATE_LIMIT_WINDOW_MINUTES=15
   RATE_LIMIT_MAX_REQUESTS=100
   PORT=3001
   FRONTEND_URL=https://hris-web.onrender.com
   ```

#### Frontend Web Service

1. Go to Render Dashboard → New → Web Service
2. Connect your repository
3. Configure:
   - **Name**: `hris-web`
   - **Environment**: `Node`
   - **Build Command**: `pnpm install && pnpm --filter @hris/database db:generate && pnpm --filter @hris/web build`
   - **Start Command**: `pnpm --filter @hris/web start`
   - **Plan**: Starter (or higher)
   - **Region**: Oregon (or your preferred region)

4. Add Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=<your-neon-connection-string>
   NEXT_PUBLIC_API_URL=https://hris-api.onrender.com/api/v1
   PORT=3000
   ```

## Step 3: Database Migration

After deployment, you need to run database migrations:

1. **Option 1: Using Render Shell** (Recommended)
   - Go to your `hris-api` service in Render
   - Click on "Shell" tab
   - Run: `pnpm --filter @hris/database db:push`
   - (Optional) Run: `pnpm --filter @hris/database db:seed`

2. **Option 2: Using Local Machine**
   - Set `DATABASE_URL` in your local `.env` to your Neon DB connection string
   - Run: `pnpm db:push`
   - (Optional) Run: `pnpm db:seed`

## Step 4: Update API URL

After deployment, update the `NEXT_PUBLIC_API_URL` in your frontend service:

1. Go to `hris-web` service in Render Dashboard
2. Go to Environment tab
3. Update `NEXT_PUBLIC_API_URL` to: `https://hris-api.onrender.com/api/v1`
   (Replace `hris-api.onrender.com` with your actual API service URL)

## Step 5: Verify Deployment

1. Check API health: `https://hris-api.onrender.com/api/v1/health` (if you have a health endpoint)
2. Check frontend: `https://hris-web.onrender.com`
3. Test login functionality
4. Verify database connection

## Troubleshooting

### Build Fails

- **Issue**: Prisma generation fails
  - **Solution**: Make sure `DATABASE_URL` is set in both services during build

- **Issue**: pnpm not found
  - **Solution**: Render should auto-detect pnpm, but you can add `corepack enable && corepack prepare pnpm@8.12.0 --activate` to build command

- **Issue**: Workspace dependencies not found
  - **Solution**: Make sure build command runs `pnpm install` first

### Runtime Errors

- **Issue**: Database connection fails
  - **Solution**: Verify `DATABASE_URL` is correct and uses SSL mode (`?sslmode=require`)

- **Issue**: CORS errors
  - **Solution**: Update `FRONTEND_URL` in API service to match your frontend URL

- **Issue**: API not reachable from frontend
  - **Solution**: Check `NEXT_PUBLIC_API_URL` is set correctly in frontend service

### Performance

- **Issue**: Slow cold starts
  - **Solution**: Consider upgrading to a higher plan or using Render's "Always On" feature

## Environment Variables Reference

### Backend (hris-api)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon DB connection string |
| `JWT_SECRET` | Yes | Secret for JWT tokens (min 32 chars) |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens (min 32 chars) |
| `JWT_EXPIRES_IN` | No | JWT expiration (default: 2h) |
| `JWT_REFRESH_EXPIRES_IN` | No | Refresh token expiration (default: 7d) |
| `PORT` | No | Server port (default: 3001) |
| `FRONTEND_URL` | Yes | Frontend URL for CORS |
| `REDIS_URL` | No | Redis connection string (if using) |

### Frontend (hris-web)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon DB connection string (for Prisma) |
| `NEXT_PUBLIC_API_URL` | Yes | Backend API URL |
| `PORT` | No | Server port (default: 3000) |

## Security Notes

1. **Never commit secrets** to your repository
2. **Use Render's environment variables** for all sensitive data
3. **Generate strong JWT secrets** (use a password generator)
4. **Enable SSL** in your Neon DB connection string
5. **Use HTTPS** (Render provides this automatically)

## Cost Optimization

- **Free Tier**: Both services can run on free tier (with limitations)
- **Starter Plan**: $7/month per service (recommended for production)
- **Database**: Neon has a free tier that should be sufficient for development

## Next Steps

- Set up custom domains
- Configure auto-deploy from Git
- Set up monitoring and alerts
- Configure backups for Neon DB
- Set up CI/CD pipeline

