-- COMPLETE FIX: Run this entire script in Supabase SQL Editor
-- This will set up everything needed for the User Management System

-- ============================================
-- STEP 1: Create ENUM types (if not exists)
-- ============================================

-- Create user_role enum
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create user_status enum
DO $$ BEGIN
    CREATE TYPE user_status AS ENUM ('active', 'inactive');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================
-- STEP 2: Ensure users table has correct structure
-- ============================================

-- Add columns if they don't exist (safe to run multiple times)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'last_login') THEN
        ALTER TABLE public.users ADD COLUMN last_login TIMESTAMPTZ;
    END IF;
END $$;

-- ============================================
-- STEP 3: Enable RLS and create policies
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update all users" ON public.users;
DROP POLICY IF EXISTS "Allow user creation on signup" ON public.users;

-- Policy 1: Users can view their own profile
CREATE POLICY "Users can view their own profile"
    ON public.users
    FOR SELECT
    USING (auth.uid() = id);

-- Policy 2: Users can update their own profile (except role and status)
CREATE POLICY "Users can update their own profile"
    ON public.users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id AND 
        role = (SELECT role FROM public.users WHERE id = auth.uid()) AND
        status = (SELECT status FROM public.users WHERE id = auth.uid())
    );

-- Policy 3: Admins can view all users
CREATE POLICY "Admins can view all users"
    ON public.users
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy 4: Admins can update all users
CREATE POLICY "Admins can update all users"
    ON public.users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policy 5: Allow insert during signup (CRITICAL - this allows the trigger to work)
CREATE POLICY "Allow user creation on signup"
    ON public.users
    FOR INSERT
    WITH CHECK (true);

-- ============================================
-- STEP 4: Create trigger function with SECURITY DEFINER
-- ============================================

-- This function runs with elevated privileges to bypass RLS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, role, status)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        'user'::user_role,  -- Explicitly cast to enum
        'active'::user_status  -- Explicitly cast to enum
    );
    RETURN NEW;
EXCEPTION
    WHEN others THEN
        RAISE LOG 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$;

-- ============================================
-- STEP 5: Create trigger on auth.users
-- ============================================

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- VERIFICATION
-- ============================================

-- Show all enum types
SELECT 'Enum Types:' as info;
SELECT typname FROM pg_type WHERE typname IN ('user_role', 'user_status');

-- Show trigger function
SELECT 'Trigger Function:' as info;
SELECT proname, prosecdef FROM pg_proc WHERE proname = 'handle_new_user';

-- Show trigger
SELECT 'Trigger:' as info;
SELECT tgname FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Show policies
SELECT 'RLS Policies:' as info;
SELECT policyname FROM pg_policies WHERE tablename = 'users';

-- Success message
SELECT '✓ Setup Complete! You can now test signup.' as status;
