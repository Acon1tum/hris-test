# Deploy to Render FREE (No Credit Card Required)

This guide shows you how to deploy your HRIS monorepo to Render's **free tier** without requiring a credit card.

## 🎯 Deployment Options

You have **two options** for free deployment:

1. **Docker (Recommended)** - One service running both API and Frontend
   - ✅ Uses only **1 free service**
   - ✅ See `DEPLOY_DOCKER.md` for instructions
   
2. **Separate Services** - Two services (API + Frontend)
   - ⚠️ Uses **2 free services**
   - ✅ More flexible, easier to debug
   - See instructions below

## ⚠️ Free Tier Limitations

- **Services sleep after 15 minutes** of inactivity
- **Cold start time**: First request after sleep takes ~30-60 seconds
- **Limited resources**: 512MB RAM, 0.5 CPU
- **Build time**: May be slower than paid plans
- **No custom domains** on free tier (you get `.onrender.com` subdomain)

## 🚀 Step-by-Step Deployment (No Credit Card)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub/GitLab (no credit card needed)
3. Verify your email

### Step 2: Deploy Backend API

1. **Go to Render Dashboard** → Click **"New +"** → Select **"Web Service"**

2. **Connect Repository**:
   - Connect your GitHub/GitLab repository
   - Select the repository containing your monorepo

3. **Configure Backend Service**:
   - **Name**: `hris-api` (or any name you prefer)
   - **Region**: `Oregon` (or closest to you)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (root of repo)
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     corepack enable && corepack prepare pnpm@8.12.0 --activate && pnpm install && pnpm --filter @hris/database db:generate && pnpm --filter @hris/api build
     ```
   - **Start Command**: 
     ```bash
     pnpm --filter @hris/api start
     ```

4. **Set Environment Variables** (click "Advanced" → "Add Environment Variable"):
   ```
   NODE_ENV=production
   DATABASE_URL=<your-neon-connection-string>
   JWT_SECRET=<generate-random-32-chars>
   JWT_REFRESH_SECRET=<generate-random-32-chars>
   JWT_EXPIRES_IN=2h
   JWT_REFRESH_EXPIRES_IN=7d
   SESSION_TIMEOUT_SECONDS=1800
   RATE_LIMIT_WINDOW_MINUTES=15
   RATE_LIMIT_MAX_REQUESTS=100
   PORT=3001
   FRONTEND_URL=https://hris-web.onrender.com
   ```
   **Note**: You'll update `FRONTEND_URL` after deploying the frontend.

5. **Click "Create Web Service"**
   - Wait for build to complete (5-10 minutes first time)
   - **Copy your API URL** (e.g., `https://hris-api.onrender.com`)

### Step 3: Deploy Frontend

1. **Go to Render Dashboard** → Click **"New +"** → Select **"Web Service"**

2. **Connect Repository**:
   - Select the same repository

3. **Configure Frontend Service**:
   - **Name**: `hris-web` (or any name you prefer)
   - **Region**: `Oregon` (same as backend)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty
   - **Runtime**: `Node`
   - **Build Command**: 
     ```bash
     corepack enable && corepack prepare pnpm@8.12.0 --activate && pnpm install && pnpm --filter @hris/database db:generate && pnpm --filter @hris/web build
     ```
   - **Start Command**: 
     ```bash
     pnpm --filter @hris/web start
     ```

4. **Set Environment Variables**:
   ```
   NODE_ENV=production
   DATABASE_URL=<your-neon-connection-string>
   NEXT_PUBLIC_API_URL=https://hris-api.onrender.com/api/v1
   PORT=3000
   ```
   **Note**: Replace `hris-api.onrender.com` with your actual API service URL from Step 2.

5. **Click "Create Web Service"**
   - Wait for build to complete

### Step 4: Update Environment Variables

After both services are deployed:

1. **Update Backend `FRONTEND_URL`**:
   - Go to `hris-api` service → **Environment** tab
   - Update `FRONTEND_URL` to: `https://hris-web.onrender.com`
   - (Replace with your actual frontend URL)

2. **Update Frontend `NEXT_PUBLIC_API_URL`**:
   - Go to `hris-web` service → **Environment** tab
   - Update `NEXT_PUBLIC_API_URL` to: `https://hris-api.onrender.com/api/v1`
   - (Replace with your actual API URL)

3. **Redeploy both services** (click "Manual Deploy" → "Deploy latest commit")

### Step 5: Run Database Migration

1. **Go to `hris-api` service** → Click **"Shell"** tab
2. **Run migration**:
   ```bash
   pnpm --filter @hris/database db:push
   ```
3. **(Optional) Seed database**:
   ```bash
   pnpm --filter @hris/database db:seed
   ```

### Step 6: Verify Deployment

1. **Check API**: Visit `https://hris-api.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Check Frontend**: Visit `https://hris-web.onrender.com`
   - Should load your login page

3. **Test Login**: Use test credentials from seed data

## 🔧 Troubleshooting

### Service Won't Start

- **Check build logs**: Go to service → "Logs" tab
- **Verify environment variables**: Make sure all required vars are set
- **Check DATABASE_URL**: Must include `?sslmode=require`

### Slow First Request

- **Normal for free tier**: Services sleep after 15 min
- **First request after sleep**: Takes 30-60 seconds to wake up
- **Solution**: Keep services active by pinging them periodically (use a cron service like cron-job.org)

### Build Fails

- **pnpm not found**: Build command should handle this, but verify
- **Prisma generation fails**: Make sure `DATABASE_URL` is set during build
- **Out of memory**: Free tier has 512MB limit - check build logs

### CORS Errors

- **Update `FRONTEND_URL`**: Must match your frontend URL exactly
- **Check API response headers**: Should include CORS headers

## 💡 Tips for Free Tier

1. **Keep Services Active**: 
   - Use a free cron service (cron-job.org) to ping your API every 10 minutes
   - This prevents services from sleeping

2. **Monitor Usage**:
   - Free tier has limits - check Render dashboard for usage

3. **Optimize Builds**:
   - Use `.dockerignore` to exclude unnecessary files
   - Cache dependencies when possible

4. **Database Connection**:
   - Use Neon's **pooler** connection string for better performance
   - Free tier services work well with Neon's free tier

## 📝 Environment Variables Checklist

### Backend (hris-api)
- [ ] `DATABASE_URL` - Neon DB connection string
- [ ] `JWT_SECRET` - Random 32+ character string
- [ ] `JWT_REFRESH_SECRET` - Random 32+ character string
- [ ] `FRONTEND_URL` - Your frontend URL

### Frontend (hris-web)
- [ ] `DATABASE_URL` - Neon DB connection string (for Prisma)
- [ ] `NEXT_PUBLIC_API_URL` - Your backend API URL

## 🎉 You're Done!

Your HRIS application is now deployed on Render's free tier!

**Remember**: 
- Services will sleep after 15 minutes of inactivity
- First request after sleep will be slow (cold start)
- Consider upgrading to Starter plan ($7/month) for always-on services

## Next Steps

- Set up auto-deploy from Git
- Configure custom domains (requires paid plan)
- Set up monitoring
- Configure backups for Neon DB

