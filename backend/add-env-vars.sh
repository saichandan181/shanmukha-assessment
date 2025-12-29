# Add remaining environment variables to Vercel
# Run each command and paste the values when prompted

# 1. SUPABASE_ANON_KEY (already done ✓ if you did it)
vercel env add SUPABASE_ANON_KEY production
# Paste: sb_publishable_IsiuKfMmFTMEzxfU4HRulw_5GE8JRRv

# 2. SUPABASE_SERVICE_ROLE_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaGZhaXVwdG5xb2hhaGp5ZnZ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njk5NjY4NSwiZXhwIjoyMDgyNTcyNjg1fQ.x4euQexgJiInaWyhYOo9lrX_xDBtxBzwgV7OiIS9N6c

# 3. JWT_SECRET
vercel env add JWT_SECRET production
# Paste: user_mgmt_super_secret_jwt_key_2024_production_ready

# 4. NODE_ENV
vercel env add NODE_ENV production
# Type: production

# 5. FRONTEND_URL
vercel env add FRONTEND_URL production
# Type: https://your-frontend.vercel.app (update after frontend deployment)

# After adding all variables, redeploy:
vercel --prod
