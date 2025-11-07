# Quick Start: Deploy to Render

## 🚀 Quick Deployment Steps

### 1. Prepare Your Neon Database
- Go to [Neon Console](https://console.neon.tech)
- Copy your connection string (use the **pooler** version)
- Make sure it includes `?sslmode=require`

### 2. Deploy to Render

**⚠️ Blueprint requires a credit card!** Use manual setup for free deployment.

**Option 1: Docker (No Credit Card) ⭐ BEST - Uses 1 Service**
- See `DEPLOY_DOCKER.md` for detailed instructions
- Deploy both API and Frontend in one Docker container
- Uses only **1 free service** instead of 2
- No credit card required

**Option 2: Separate Services (No Credit Card)**
- See `DEPLOY_FREE.md` for detailed instructions
- Deploy backend and frontend as separate services
- Uses **2 free services**
- No credit card required

**Option 2: Using Blueprint (Requires Credit Card)**
1. Push your code to GitHub/GitLab
2. Go to Render Dashboard → **New** → **Blueprint**
3. Connect your repository
4. Render will auto-detect `render.yaml`
5. **Credit card required** (even for free tier)
6. Click **Apply**

### 3. Set Environment Variables

In Render Dashboard, for **each service**, add:

#### For `hris-api`:
```
DATABASE_URL=<your-neon-connection-string>
JWT_SECRET=<generate-random-32-chars>
JWT_REFRESH_SECRET=<generate-random-32-chars>
```

#### For `hris-web`:
```
DATABASE_URL=<your-neon-connection-string>
NEXT_PUBLIC_API_URL=https://hris-api.onrender.com/api/v1
```

### 4. Run Database Migration

After first deployment:
1. Go to `hris-api` service → **Shell** tab
2. Run: `pnpm --filter @hris/database db:push`
3. (Optional) Run: `pnpm --filter @hris/database db:seed`

### 5. Update API URL

After deployment, update `NEXT_PUBLIC_API_URL` in `hris-web` service:
- Replace `hris-api.onrender.com` with your actual API URL

### 6. Verify

- ✅ API: `https://hris-api.onrender.com/health`
- ✅ Frontend: `https://hris-web.onrender.com`
- ✅ Test login

## 📝 Important Notes

- **First build takes 5-10 minutes** (installing dependencies)
- **Free tier services sleep after 15 min** of inactivity
- **Starter plan ($7/month)** keeps services always on
- **Update `NEXT_PUBLIC_API_URL`** after you know your API URL

## 🔧 Troubleshooting

**Build fails?**
- Check build logs in Render Dashboard
- Verify `DATABASE_URL` is set during build
- Make sure pnpm is enabled (should be automatic)

**Database connection fails?**
- Verify `DATABASE_URL` includes `?sslmode=require`
- Check Neon DB is accessible (not paused)

**CORS errors?**
- Update `FRONTEND_URL` in API service
- Verify `NEXT_PUBLIC_API_URL` in frontend service

## 📚 Full Documentation

See `DEPLOYMENT.md` for detailed instructions.

