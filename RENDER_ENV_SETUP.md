# Render Environment Variables Setup

After successful deployment, configure these environment variables in your Render service:

## Required Environment Variables

### 1. Database Configuration
```
DATABASE_URL=postgresql://neondb_owner:npg_aoDYABTyWu58@ep-cool-lake-afpuhwf7-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
**Note:** Use your actual Neon DB connection string

### 2. JWT Authentication
```
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production-min-32-chars
JWT_EXPIRES_IN=2h
JWT_REFRESH_EXPIRES_IN=7d
```
**Important:** Generate strong, random secrets for production!

### 3. Application URLs
```
FRONTEND_URL=https://hris-test.onrender.com
NEXT_PUBLIC_API_URL=/api/v1
```
**Note:** 
- Replace `hris-test` with your actual Render service name
- `NEXT_PUBLIC_API_URL` should be `/api/v1` (relative path) to use Next.js rewrites in Docker
- The rewrites will automatically proxy to the backend API running in the same container

### 4. Runtime Configuration
```
NODE_ENV=production
DOCKER_ENV=true
PORT=3001
```

### 5. Optional: Redis (if using)
```
REDIS_URL=redis://your-redis-url:6379
```

### 6. Optional: Session & Rate Limiting
```
SESSION_TIMEOUT_SECONDS=1800
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=100
```

## How to Set Environment Variables in Render

1. Go to your Render dashboard
2. Select your service (`hris-test`)
3. Click on **Environment** tab
4. Click **Add Environment Variable**
5. Add each variable above with its value
6. Click **Save Changes**
7. Render will automatically redeploy with new environment variables

## After Setting Environment Variables

1. **Wait for redeploy** - Render will automatically redeploy
2. **Check logs** - Verify services start without errors
3. **Test the application** - Visit https://hris-test.onrender.com

## Database Setup

After setting environment variables, you need to set up your database:

### Option 1: Run Migrations Locally (Recommended)
```bash
# From your local machine
pnpm db:push
pnpm db:seed
```

### Option 2: Run Migrations via Render Shell
1. Go to Render dashboard → Your service
2. Click **Shell** tab
3. Run:
```bash
cd packages/database
pnpm prisma db push
pnpm prisma db seed
```

## Verify Everything Works

1. **Health Check**: Visit `https://hris-test.onrender.com/api/v1/health`
   - Should return: `{"status":"ok","timestamp":"..."}`

2. **Frontend**: Visit `https://hris-test.onrender.com`
   - Should load the login page

3. **Check Logs**: In Render dashboard, verify:
   - No Prisma connection errors
   - No CORS errors
   - Both services (API and Web) are running

## Troubleshooting

### If API returns CORS errors:
- Verify `FRONTEND_URL` matches your Render frontend URL exactly
- Check that it includes `https://` protocol

### If database connection fails:
- Verify `DATABASE_URL` is correct
- Check Neon DB is accessible (not paused)
- Ensure SSL mode is set correctly

### If frontend can't reach API:
- Verify `NEXT_PUBLIC_API_URL` is set (though Docker rewrites should handle this)
- Check that `DOCKER_ENV=true` is set
- Verify both services are running in PM2

