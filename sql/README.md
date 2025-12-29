# Supabase SQL Setup Scripts

This folder contains SQL migration scripts to set up the database for the User Management System.

## 📋 Execution Order

Run these scripts in the Supabase SQL Editor in the following order:

### 1. Create Users Table
```sql
-- File: 01_create_users_table.sql
```
Creates the `users` table with proper structure, indexes, and triggers.

### 2. Enable Row Level Security
```sql
-- File: 02_enable_rls.sql
```
Enables RLS and creates security policies for user and admin access.

### 3. Create Trigger Function
```sql
-- File: 03_create_trigger_function.sql
```
Creates a trigger to automatically create user profiles when a new user signs up through Supabase Auth.

### 4. Seed Admin User (Optional)
```sql
-- File: 04_seed_admin.sql
```
Instructions for promoting a user to admin role.

## 🚀 Quick Setup

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste each file's content in order (01 → 02 → 03)
4. Click **Run** for each script

## 👨‍💼 Creating an Admin User

After running the migration scripts:

1. Sign up a user through your app (e.g., `admin@example.com`)
2. Go to Supabase SQL Editor
3. Run:
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@example.com';
```

## 🔒 Security Features

- **Row Level Security (RLS)** enabled
- Users can only view/update their own profile
- Only admins can view all users
- Only admins can activate/deactivate users
- Automatic profile creation on signup

## 📊 Database Schema

### users table
- `id` (UUID) - Primary key, references auth.users
- `email` (TEXT) - Unique email
- `full_name` (TEXT) - User's full name
- `role` (ENUM) - 'admin' or 'user'
- `status` (ENUM) - 'active' or 'inactive'
- `last_login` (TIMESTAMP) - Last login time
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## ⚠️ Important Notes

- These scripts are idempotent (safe to run multiple times)
- Always test in a development environment first
- Keep your Supabase credentials secure
- Never commit `.env` files with real credentials
