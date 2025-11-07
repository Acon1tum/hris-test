# Deploy with Docker (Single Service - No Credit Card)

This guide shows you how to deploy your HRIS monorepo to Render using **Docker** with both API and Frontend running in **one container**. This is perfect for free tier since you only use **one service** instead of two!

## 🎯 Benefits of Docker Deployment

- ✅ **One service instead of two** (saves free tier limits)
- ✅ **No credit card required**
- ✅ **Full control** over the environment
- ✅ **Both services run together** in one container
- ✅ **Easier to manage** - single deployment

## ⚠️ Free Tier Limitations

- **Service sleeps after 15 minutes** of inactivity
- **Cold start time**: ~30-60 seconds after sleep
- **Limited resources**: 512MB RAM, 0.5 CPU
- **Build time**: May take 10-15 minutes first time

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Neon Database

1. Go to [Neon Console](https://console.neon.tech)
2. Copy your **pooler** connection string
3. Make sure it includes `?sslmode=require`

### Step 2: Push Code to GitHub/GitLab

Make sure these files are in your repository:
- `Dockerfile`
- `ecosystem.config.js`
- `.dockerignore`
- All your source code

### Step 3: Deploy to Render

1. **Go to Render Dashboard** → Click **"New +"** → Select **"Web Service"**

2. **Connect Repository**:
   - Connect your GitHub/GitLab repository
   - Select the repository containing your monorepo

3. **Configure Service**:
   - **Name**: `hris-app` (or any name you prefer)
   - **Region**: `Oregon` (or closest to you)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty
   - **Environment**: Select **"Docker"** ⭐ (Important!)
   - **Dockerfile Path**: `Dockerfile` (or leave empty if in root)
   - **Docker Context**: Leave empty (or `.` if needed)

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
   PORT=3000
   API_PORT=3001
   FRONTEND_URL=https://hris-app.onrender.com
   NEXT_PUBLIC_API_URL=https://hris-app.onrender.com/api/v1
   ```

5. **Click "Create Web Service"**
   - Wait for Docker build to complete (10-15 minutes first time)
   - Render will build the Docker image and start both services

### Step 4: Configure Ports (Important!)

Since both services run in one container, you need to configure Render to route traffic:

1. **Go to your service** → **Settings** tab
2. **Under "Port"**: Set to `3000` (Frontend port)
3. **Add Health Check Path**: `/health` (API health endpoint)

**Note**: Render will route all traffic to port 3000 (frontend). The API will be accessible at `/api/v1/*` through the frontend's proxy, OR you can set up a reverse proxy in your Next.js app.

### Step 5: Update Next.js Config for API Proxy (Optional but Recommended)

To make API calls work seamlessly, update `apps/web/next.config.js` to proxy API requests:

```javascript
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@hris/shared-types', '@hris/constants', '@hris/utils'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Proxy API requests to backend
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL 
          ? `${process.env.NEXT_PUBLIC_API_URL}/:path*`
          : 'http://localhost:3001/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
```

**Alternative**: If you prefer, you can keep the API on a separate subdomain by using Render's service discovery, but that requires two services.

### Step 6: Run Database Migration

1. **Go to your service** → **Shell** tab
2. **Run migration**:
   ```bash
   pnpm --filter @hris/database db:push
   ```
3. **(Optional) Seed database**:
   ```bash
   pnpm --filter @hris/database db:seed
   ```

### Step 7: Verify Deployment

1. **Check Frontend**: Visit `https://hris-app.onrender.com`
   - Should load your login page

2. **Check API Health**: Visit `https://hris-app.onrender.com/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

3. **Check API via Frontend**: The frontend should proxy API requests automatically

4. **Test Login**: Use test credentials from seed data

## 🔧 Troubleshooting

### Docker Build Fails

- **Check build logs**: Go to service → "Logs" tab
- **Verify Dockerfile**: Make sure it's in the root directory
- **Check .dockerignore**: Make sure it's not excluding necessary files
- **Memory issues**: Free tier has 512MB limit - check if build exceeds this

### Services Won't Start

- **Check PM2 logs**: 
  ```bash
  pm2 logs
  ```
  (In Render Shell)
- **Verify environment variables**: Make sure all required vars are set
- **Check ports**: Make sure ports 3000 and 3001 are not conflicting

### API Not Accessible

- **Option 1**: Use Next.js rewrites (recommended) - see Step 5
- **Option 2**: Access API directly at `https://hris-app.onrender.com:3001` (may not work on Render)
- **Option 3**: Deploy API as separate service (defeats the purpose of Docker)

### Database Connection Fails

- **Verify DATABASE_URL**: Must include `?sslmode=require`
- **Check Neon DB**: Make sure database is not paused
- **Test connection**: Run `pnpm --filter @hris/database db:push` in Shell

### Out of Memory

- **Free tier limit**: 512MB RAM
- **Solution**: 
  - Optimize Docker image (multi-stage build already does this)
  - Consider upgrading to Starter plan ($7/month)
  - Reduce PM2 instances (already set to 1)

## 💡 Tips for Free Tier

1. **Keep Service Active**: 
   - Use a free cron service (cron-job.org) to ping your app every 10 minutes
   - Ping: `https://hris-app.onrender.com/health`

2. **Monitor Usage**:
   - Check Render dashboard for resource usage
   - Free tier has limits on build time and runtime

3. **Optimize Build**:
   - `.dockerignore` already excludes unnecessary files
   - Multi-stage build reduces final image size

## 📝 Environment Variables Checklist

- [ ] `DATABASE_URL` - Neon DB connection string
- [ ] `JWT_SECRET` - Random 32+ character string
- [ ] `JWT_REFRESH_SECRET` - Random 32+ character string
- [ ] `FRONTEND_URL` - Your app URL (https://hris-app.onrender.com)
- [ ] `NEXT_PUBLIC_API_URL` - API URL (https://hris-app.onrender.com/api/v1)
- [ ] `PORT` - Set to 3000 (frontend)
- [ ] `API_PORT` - Set to 3001 (backend, used by PM2)

## 🎉 You're Done!

Your HRIS application is now deployed in a single Docker container on Render!

**Remember**: 
- Only **one service** is used (saves free tier limits!)
- Services will sleep after 15 minutes of inactivity
- First request after sleep will be slow (cold start)
- Both API and Frontend run in the same container

## Alternative: Separate Services (If Docker Doesn't Work)

If you encounter issues with Docker, you can still deploy separately:
- See `DEPLOY_FREE.md` for manual setup
- Uses 2 free services instead of 1

## Next Steps

- Set up auto-deploy from Git
- Configure custom domains (requires paid plan)
- Set up monitoring
- Configure backups for Neon DB

