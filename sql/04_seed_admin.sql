-- Seed script for creating an initial admin user
-- NOTE: You should run this after creating your first user through Supabase Auth Dashboard
-- Replace the UUID below with the actual UUID of your admin user from auth.users table

-- Example: Update a user to be an admin
-- First, create a user through Supabase Auth Dashboard or signup endpoint
-- Then, run this query with the actual user ID

-- UPDATE public.users 
-- SET role = 'admin' 
-- WHERE email = 'admin@example.com';

-- OR if you know the UUID:
-- UPDATE public.users 
-- SET role = 'admin' 
-- WHERE id = 'YOUR-USER-UUID-HERE';

-- For development/testing, you can create a sample admin directly:
-- Make sure to replace with actual values from auth.users after signup

/*
EXAMPLE WORKFLOW:
1. Sign up a user via the app (e.g., admin@example.com)
2. Get the user ID from auth.users table
3. Run: UPDATE public.users SET role = 'admin' WHERE email = 'admin@example.com';
*/
