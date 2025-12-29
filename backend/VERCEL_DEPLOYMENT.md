# 🚀 Deploying Backend to Vercel via CLI

Complete guide for deploying the User Management System backend to Vercel using the CLI.

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at https://vercel.com
2. **Vercel CLI** - Install globally
3. **Supabase Project** - Your database is already set up
4. **Backend Code** - Ready to deploy (already configured)

---

## 🔧 Step 1: Install Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Verify installation
vercel --version
```

---

## 🔑 Step 2: Login to Vercel

```bash
# Login to your Vercel account
vercel login

# Follow the prompts to authenticate
```

---

## 📁 Step 3: Navigate to Backend Directory

```bash
cd C:\Users\SandaRed\Downloads\practice\backend
```

---

## 🚀 Step 4: Deploy to Vercel

### First Deployment (Interactive Setup)

```bash
# Run deployment command
vercel

# You'll be asked:
# ? Set up and deploy "backend"? [Y/n] → Press Y
# ? Which scope do you want to deploy to? → Select your account
# ? Link to existing project? [y/N] → Press N
# ? What's your project's name? → user-management-backend (or any name)
# ? In which directory is your code located? → ./ (just press Enter)
# ? Want to override the settings? [y/N] → Press N
```

This creates a **preview deployment** (for testing).

### Production Deployment

```bash
# Deploy to production
vercel --prod
```

---

## 🔐 Step 5: Set Environment Variables

After deployment, you need to configure environment variables in Vercel:

### Option A: Using Vercel CLI

```bash
# Set environment variables one by one
vercel env add SUPABASE_URL
# Paste: https://jfhfaiuptnqohahjyfvz.supabase.co

vercel env add SUPABASE_ANON_KEY
# Paste: sb_publishable_IsiuKfMmFTMEzxfU4HRulw_5GE8JRRv

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaGZhaXVwdG5xb2hhaGp5ZnZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njk5NjY4NSwiZXhwIjoyMDgyNTcyNjg1fQ.x4euQexgJiInaWyhYOo9lrX_xDBtxBzwgV7OiIS9N6c

vercel env add JWT_SECRET
# Paste: user_mgmt_super_secret_jwt_key_2024_production_ready

vercel env add NODE_ENV
# Type: production

vercel env add FRONTEND_URL
# Type: https://your-frontend-url.vercel.app (update this after deploying frontend)
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project: `user-management-backend`
3. Click **Settings** → **Environment Variables**
4. Add each variable:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `SUPABASE_URL` | `https://jfhfaiuptnqohahjyfvz.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | `sb_publishable_IsiuKfMmFTMEzxfU4HRulw_5GE8JRRv` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (full key) | Production, Preview, Development |
| `JWT_SECRET` | `user_mgmt_super_secret_jwt_key_2024_production_ready` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |
| `FRONTEND_URL` | `https://your-frontend.vercel.app` | Production |

---

## 🔄 Step 6: Redeploy After Adding Environment Variables

```bash
# Redeploy to apply environment variables
vercel --prod
```

---

## ✅ Step 7: Verify Deployment

### Test Your API

```bash
# Get your deployment URL from Vercel output, e.g.:
# https://user-management-backend.vercel.app

# Test health endpoint
curl https://your-backend-url.vercel.app/health

# Test API docs
# Open in browser: https://your-backend-url.vercel.app/api-docs
```

### Expected Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-12-29T10:00:00.000Z"
}
```

---

## 🌐 Step 8: Update Frontend Configuration

After backend is deployed, update your frontend:

```bash
# In frontend/.env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

Then deploy frontend:
```bash
cd ../frontend
vercel --prod
```

---

## 🔧 Useful Vercel CLI Commands

```bash
# View deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# View project details
vercel inspect

# Pull environment variables locally
vercel env pull

# Link local project to Vercel project
vercel link
```

---

## 🐛 Troubleshooting

### Issue 1: "Module not found" errors
```bash
# Make sure all dependencies are in package.json
npm install
vercel --prod
```

### Issue 2: "Database connection failed"
- Check environment variables are set correctly
- Verify Supabase keys are valid
- Check CORS settings in app.js

### Issue 3: "Function timeout"
- Vercel serverless functions have 10s timeout on hobby plan
- Optimize database queries
- Upgrade to Pro plan if needed

### Issue 4: API routes not working
- Ensure vercel.json is properly configured
- Check that src/server.js exports the app
- Verify routes are mounted correctly in app.js

---

## 📊 Vercel Configuration Files

### vercel.json (Already Created)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### .vercelignore (Already Created)
Excludes unnecessary files from deployment:
- `node_modules` (Vercel installs fresh)
- `.env` files (use Vercel env vars)
- Test files
- Coverage reports

---

## 🔒 Security Best Practices

1. **Never commit .env files** - Use Vercel environment variables
2. **Use different secrets** - Don't reuse local JWT_SECRET in production
3. **Enable CORS properly** - Set FRONTEND_URL to your actual frontend domain
4. **Rotate keys regularly** - Update Supabase and JWT secrets periodically
5. **Use HTTPS only** - Vercel provides SSL by default

---

## 📈 Post-Deployment Checklist

- [ ] Backend deployed to Vercel
- [ ] All environment variables configured
- [ ] Health endpoint returns 200
- [ ] API documentation accessible at `/api-docs`
- [ ] Test signup endpoint
- [ ] Test login endpoint
- [ ] Test admin endpoints with admin token
- [ ] Frontend deployed and connected
- [ ] CORS configured correctly
- [ ] Update README with live URLs

---

## 🎯 Quick Deployment Commands

```bash
# One-line deployment
cd backend && vercel --prod

# Deploy with specific name
vercel --prod --name user-management-api

# Deploy to specific team
vercel --prod --scope your-team-name
```

---

## 🔗 Important URLs After Deployment

| Service | URL |
|---------|-----|
| **Backend API** | `https://your-backend.vercel.app` |
| **API Docs** | `https://your-backend.vercel.app/api-docs` |
| **Health Check** | `https://your-backend.vercel.app/health` |
| **Vercel Dashboard** | `https://vercel.com/dashboard` |
| **Supabase Dashboard** | `https://jfhfaiuptnqohahjyfvz.supabase.co` |

---

## 🚀 Next Steps

1. Deploy backend to Vercel ✅
2. Get backend URL
3. Deploy frontend to Vercel with backend URL
4. Test complete flow (signup → login → dashboard → admin)
5. Update README.md with live URLs
6. Record demo video
7. Submit project

---

## 💡 Pro Tips

- Use `vercel --prod` for production deployments
- Use `vercel` (without --prod) for preview deployments
- Preview deployments get unique URLs for testing
- Production deployment gets the main domain
- Each git push can auto-deploy if you connect GitHub
- Enable GitHub integration for automatic deployments

---

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel CLI Docs**: https://vercel.com/docs/cli
- **Vercel Support**: https://vercel.com/support
- **Supabase Docs**: https://supabase.com/docs

---

**Last Updated**: December 29, 2025  
**Status**: Ready for deployment ✅
