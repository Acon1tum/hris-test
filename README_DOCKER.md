# Docker Deployment - Quick Reference

## 🚀 Quick Start

1. **Push code to GitHub/GitLab** (with Dockerfile, ecosystem.config.js)

2. **Deploy on Render**:
   - New → Web Service
   - Connect repository
   - **Environment: Docker** ⭐
   - Dockerfile Path: `Dockerfile`
   - Set environment variables (see DEPLOY_DOCKER.md)

3. **Done!** Both API and Frontend run in one container.

## 📁 Files Created

- `Dockerfile` - Multi-stage build for production
- `ecosystem.config.js` - PM2 config to run both services
- `.dockerignore` - Excludes unnecessary files
- `DEPLOY_DOCKER.md` - Full deployment guide

## 🔑 Key Points

- **One service** instead of two (saves free tier!)
- **No credit card** required
- **PM2** manages both processes
- **Next.js rewrites** proxy API calls automatically

See `DEPLOY_DOCKER.md` for complete instructions.

