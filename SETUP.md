# 🚀 Quick Setup Guide

This guide will help you get the User Management System running locally in under 10 minutes.

## ✅ Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js 16+ installed ([Download](https://nodejs.org/))
- [ ] npm (comes with Node.js)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)
- [ ] Supabase account ([Sign up free](https://supabase.com))

## 📋 Step-by-Step Setup

### Step 1: Create Supabase Project (3 minutes)

1. **Create Account & Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign in with GitHub
   - Click "New Project"
   - Fill in:
     - Name: `user-management`
     - Database Password: (generate strong password)
     - Region: (choose closest to you)
   - Click "Create new project"
   - Wait 2-3 minutes for setup

2. **Get API Credentials**
   - Go to Settings (⚙️) → API
   - Copy and save:
     - **Project URL**: `https://xxxxx.supabase.co`
     - **anon public key**: `eyJhbGc...` (long string)
     - **service_role key**: `eyJhbGc...` (long string)

3. **Set Up Database**
   - Go to SQL Editor (left sidebar)
   - Click "New query"
   - Copy content from `sql/01_create_users_table.sql`
   - Paste and click "Run"
   - Repeat for:
     - `sql/02_enable_rls.sql`
     - `sql/03_create_trigger_function.sql`
   - ✅ Database ready!

### Step 2: Set Up Backend (2 minutes)

1. **Open Terminal**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Copy template
   cp .env.example .env
   
   # Open .env in your editor
   ```

4. **Edit .env File**
   ```env
   PORT=5000
   NODE_ENV=development
   
   # Paste your Supabase credentials
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   
   # Generate a random secret (or use this)
   JWT_SECRET=your-super-secret-jwt-key-min-32-chars
   
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start Backend**
   ```bash
   npm run dev
   ```
   
   ✅ You should see:
   ```
   ╔═══════════════════════════════════════╗
   ║   User Management System - Backend   ║
   ║  Server running on port 5000         ║
   ╚═══════════════════════════════════════╝
   ```

### Step 3: Set Up Frontend (2 minutes)

1. **Open New Terminal**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   # Copy template
   cp .env.example .env
   ```

4. **Edit .env File**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start Frontend**
   ```bash
   npm run dev
   ```
   
   ✅ Browser should open at `http://localhost:5173`

### Step 4: Create Admin User (2 minutes)

1. **Sign Up a User**
   - Go to `http://localhost:5173`
   - Click "Sign up"
   - Fill in:
     - Email: `admin@example.com`
     - Password: `Admin@123`
     - Full Name: `Admin User`
   - Click "Sign Up"

2. **Promote to Admin**
   - Go to Supabase → SQL Editor
   - Run this query:
   ```sql
   UPDATE public.users 
   SET role = 'admin' 
   WHERE email = 'admin@example.com';
   ```
   - ✅ Admin user created!

3. **Test Admin Access**
   - Logout from the app
   - Login with admin credentials
   - You should see "Admin Panel" button
   - Click it to access admin dashboard

### Step 5: Verify Everything Works (1 minute)

**Test User Flow:**
- [ ] Sign up a new user
- [ ] Login works
- [ ] Dashboard shows user info
- [ ] Can update profile
- [ ] Can change password

**Test Admin Flow:**
- [ ] Login as admin
- [ ] Can access admin panel
- [ ] Can see all users
- [ ] Can activate/deactivate users
- [ ] Pagination works

## 🎉 You're Done!

Your User Management System is now running!

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/health

## 🚀 Next Steps

### 1. Run Tests
```bash
cd backend
npm test
```

### 2. Explore the API
- Import `postman_collection.json` into Postman
- Test all endpoints
- Check responses

### 3. Deploy to Production
Follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide to deploy:
- Backend to Render/Railway
- Frontend to Vercel/Netlify

### 4. Create Demo Video
Follow the [VIDEO_SCRIPT.md](VIDEO_SCRIPT.md) to create your walkthrough video

## 🐛 Troubleshooting

### Backend won't start

**Error: "Missing Supabase environment variables"**
- Solution: Check your `.env` file has all variables
- Make sure you copied from Supabase correctly

**Error: "Port 5000 already in use"**
- Solution: Change PORT in `.env` to 5001 or stop other apps

### Frontend can't connect to backend

**Error: Network error / CORS**
- Solution: Make sure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Restart frontend: `npm run dev`

### Database errors

**Error: "relation 'users' does not exist"**
- Solution: Run the SQL scripts in Supabase SQL Editor
- Make sure to run them in order (01, 02, 03)

**Error: "Could not connect to database"**
- Solution: Check SUPABASE_URL and keys are correct
- Make sure your Supabase project is active

### Login/Signup not working

**Error: "Invalid email or password"**
- Solution: Check you're using the correct credentials
- Password must be at least 6 characters

**Error: "Email already registered"**
- Solution: Use a different email or login instead

### Admin features not showing

**Issue: Don't see "Admin Panel" button**
- Solution: Make sure you ran the UPDATE query to set role='admin'
- Logout and login again
- Check Supabase → Table Editor → users table

## 📚 Learn More

- [Backend README](backend/README.md) - Full backend documentation
- [Frontend README](frontend/README.md) - Full frontend documentation
- [API Documentation](backend/README.md#-api-documentation) - All endpoints
- [Database Schema](sql/README.md) - Database structure

## 💡 Tips

1. **Keep terminals open** - You need backend and frontend running
2. **Check browser console** - Helpful for debugging frontend issues
3. **Check terminal logs** - See backend errors and requests
4. **Use Postman** - Test APIs directly
5. **Ask for help** - Open a GitHub issue if stuck

## 📞 Need Help?

- Check existing [GitHub Issues](https://github.com/yourusername/repo/issues)
- Create a new issue with:
  - What you're trying to do
  - What error you're getting
  - Screenshots if applicable

Happy coding! 🎉
