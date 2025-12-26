# Vercel Deployment Guide for Boozmandu

## Issue Identified
Your application was failing on Vercel due to:
1. Incorrect DATABASE_URL format for Supabase pooler with Prisma
2. Missing connection parameters for pgbouncer
3. Environment variables not properly configured

## Fixes Applied

### 1. Updated DATABASE_URL Format
The DATABASE_URL now includes the required parameters for Supabase pooler:
```
?pgbouncer=true&connection_limit=1
```

### 2. Created vercel.json
Added proper build configuration to ensure Prisma Client is generated during deployment.

## Deployment Steps

### Step 1: Update Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Update or add these variables:

#### DATABASE_URL
```
postgresql://postgres.unbqclgutfxsfbmfbvzw:Boozmandu12@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
```

**IMPORTANT:** Make sure to add `?pgbouncer=true&connection_limit=1` to the end of your Supabase connection string!

#### JWT_SECRET
```
9K7x2nP4mQ8wE3tY6uR5zL1aB0cD9fG2hJ4kM7pS8vW3xZ6
```

### Step 2: Push Changes to GitHub

```bash
git add .
git commit -m "fix: Update DATABASE_URL format and add vercel.json for proper deployment"
git push origin main
```

### Step 3: Redeploy on Vercel

Vercel will automatically redeploy when you push to GitHub. Or you can manually trigger a redeploy:

1. Go to your Vercel dashboard
2. Click on **Deployments**
3. Click **Redeploy** on the latest deployment

### Step 4: Verify Deployment

After deployment completes:

1. Check the build logs for any errors
2. Test registration with a NEW email address
3. Test login functionality
4. Verify JWT token is being generated and stored

## Common Issues & Solutions

### Issue: "PrismaClient is unable to run in this browser environment"
**Solution:** This means Prisma Client wasn't generated. Make sure:
- The `vercel.json` file is committed
- Your build command includes `prisma generate`

### Issue: "Can't reach database server"
**Solution:** Check your DATABASE_URL:
- Must include `?pgbouncer=true&connection_limit=1`
- Password should not contain special characters that need encoding
- Use Session pooler (port 5432), NOT Transaction pooler (port 6543)

### Issue: "Invalid token" or authentication not working
**Solution:** Ensure JWT_SECRET environment variable is set in Vercel and matches exactly.

### Issue: "Email already exists" but you're using a new email
**Solution:** The database is working. The issue might be with the frontend not receiving the response properly. Check:
- Browser console for errors
- Network tab in DevTools for API response
- Vercel function logs for errors

## Checking Logs

To view detailed logs:

1. Go to Vercel dashboard
2. Click on your deployment
3. Navigate to **Functions** tab
4. Click on any failed function to see detailed logs

## Testing Locally

Before deploying, test locally with the updated .env:

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## Database Schema Verification

Ensure your Supabase database has all tables:

```bash
npx prisma db push
```

Or check in Supabase Dashboard > Database > Tables

Expected tables:
- users
- admins
- products
- product_variants
- orders
- order_items

## Seeding the Database

### Admin Credentials
After seeding, the admin credentials will be:
- **Email:** `admin@boozmandu.com`
- **Password:** `Boozmandu@Admin2024`

**⚠️ IMPORTANT:** Change this password after first login!

### How to Seed Production Database

**Option 1: Seed from Local (Recommended)**
1. Backup your current `.env` file
2. Update `.env` with production DATABASE_URL (from Vercel)
3. Run the seed command:
   ```bash
   npm run prisma:seed
   ```
4. Restore your local `.env`

**Option 2: Connect to Production and Seed**
```bash
DATABASE_URL="your-production-url" npm run prisma:seed
```

This will create:
- Admin user
- Sample users for testing
- All products from catalog
- Sample orders

## Need Help?

If issues persist:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Open browser DevTools and check Console + Network tabs
4. Verify environment variables are set correctly in Vercel dashboard
