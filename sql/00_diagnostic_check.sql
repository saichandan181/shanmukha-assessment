-- Diagnostic Check for User Management System Database Setup
-- Run this to see what's missing

-- Check 1: Do the enum types exist?
SELECT 
    'user_role enum' as check_item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') 
        THEN '✓ EXISTS' 
        ELSE '✗ MISSING' 
    END as status;

SELECT 
    'user_status enum' as check_item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') 
        THEN '✓ EXISTS' 
        ELSE '✗ MISSING' 
    END as status;

-- Check 2: Does the trigger function exist?
SELECT 
    'handle_new_user function' as check_item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user') 
        THEN '✓ EXISTS' 
        ELSE '✗ MISSING' 
    END as status;

-- Check 3: Does the trigger exist?
SELECT 
    'on_auth_user_created trigger' as check_item,
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') 
        THEN '✓ EXISTS' 
        ELSE '✗ MISSING' 
    END as status;

-- Check 4: Are RLS policies in place?
SELECT 
    COUNT(*) as policy_count,
    CASE 
        WHEN COUNT(*) >= 5 THEN '✓ All policies exist'
        ELSE '✗ Missing policies (expected 5, found ' || COUNT(*) || ')'
    END as status
FROM pg_policies 
WHERE tablename = 'users';

-- Check 5: List all policies
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users';
