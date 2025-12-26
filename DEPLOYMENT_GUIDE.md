# Boozmandu Deployment Guide

Complete guide for deploying Boozmandu to Vercel with Supabase PostgreSQL database.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Production Deployment to Vercel](#production-deployment-to-vercel)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Troubleshooting](#troubleshooting)
7. [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- Git installed and configured
- GitHub account
- Vercel account (free tier is sufficient)
- Supabase account with a project created
- PostgreSQL installed locally (for local development)

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bishnuthames101/boozmandu.git
cd boozmandu
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Local PostgreSQL Database

Make sure PostgreSQL is running on your machine, then create the database:

```bash
# Using psql
psql -U postgres
CREATE DATABASE boozmandu;
CREATE USER bishnu WITH PASSWORD 'bishnu12';
GRANT ALL PRIVILEGES ON DATABASE boozmandu TO bishnu;
\q
```

### 4. Configure Environment Variables

The repository includes two environment files:

- `.env.local` - For local development with local PostgreSQL
- `.env.production` - For production with Supabase (template)

For local development, rename or copy `.env.local`:

```bash
# Option 1: Use .env.local directly (Next.js will auto-load it)
# No action needed - Next.js prioritizes .env.local

# Option 2: Copy to .env
cp .env.local .env
```

### 5. Run Database Migrations

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run db:push

# Seed the database with initial data
npm run prisma:seed
```

### 6. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your application running locally.

### 7. Admin Access

Default admin credentials (change after first login):
- Email: `admin@boozmandu.com`
- Password: `Boozmandu@Admin2024`

---

## Production Deployment to Vercel

### Step 1: Prepare Supabase Database

1. Log in to [Supabase](https://supabase.com)
2. Go to your project dashboard
3. Navigate to **Settings** → **Database**
4. Copy the **Connection Pooler** URL (Session mode)
5. Your URL should look like:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
   ```
6. Add the required parameters to the end:
   ```
   ?pgbouncer=true&connection_limit=1
   ```
7. Final URL format:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
   ```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository: `bishnuthames101/boozmandu`
4. Configure your project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (or leave empty)
   - **Build Command:** `prisma generate && next build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

5. Add Environment Variables (click **"Environment Variables"**):

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | Your Supabase pooler URL with `?pgbouncer=true&connection_limit=1` |
   | `JWT_SECRET` | `9K7x2nP4mQ8wE3tY6uR5zL1aB0cD9fG2hJ4kM7pS8vW3xZ6` |
   | `NODE_ENV` | `production` |
   | `ADMIN_EMAIL` | `admin@boozmandu.com` |
   | `ADMIN_PASSWORD_HASH` | (Generate using bcrypt - see below) |

6. Click **"Deploy"**

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? boozmandu
# - In which directory is your code located? ./
# - Want to override the settings? N

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add NODE_ENV
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD_HASH

# Deploy to production
vercel --prod
```

### Step 3: Run Database Migrations on Production

After deployment, you need to set up the production database:

```bash
# Set DATABASE_URL to your Supabase URL temporarily
export DATABASE_URL="your-supabase-url-here"

# Push schema to Supabase
npm run db:push

# Seed production database
npm run prisma:seed
```

Alternatively, use Prisma Studio to manually create admin user:

```bash
# Open Prisma Studio connected to Supabase
DATABASE_URL="your-supabase-url" npx prisma studio
```

---

## Environment Variables

### Required Environment Variables

#### `DATABASE_URL`
**Production (Supabase):**
```
postgresql://postgres.unbqclgutfxsfbmfbvzw:Boozmandu12@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
```

**Local Development:**
```
postgresql://bishnu:bishnu12@localhost:5432/boozmandu?schema=public
```

**Important Notes:**
- Always use **Session Pooler** URL for Supabase (not Transaction or Direct)
- Must include `?pgbouncer=true&connection_limit=1` for serverless environments
- Prisma requires session mode pooling, not transaction mode

#### `JWT_SECRET`
Secret key for signing JWT tokens. Use a strong random string.

```bash
# Generate a secure secret
openssl rand -base64 32
```

Default: `9K7x2nP4mQ8wE3tY6uR5zL1aB0cD9fG2hJ4kM7pS8vW3xZ6`

#### `NODE_ENV`
- `development` for local
- `production` for Vercel

#### `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH`
Admin login credentials. Generate password hash:

```bash
# Using Node.js
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('Boozmandu@Admin2024', 10).then(console.log)"

# Or using npx
npx tsx -e "const bcrypt = require('bcrypt'); bcrypt.hash('Boozmandu@Admin2024', 10).then(console.log)"
```

---

## Database Setup

### Understanding Prisma with Supabase

Supabase provides three connection modes:

1. **Direct Connection** - Full database access (not suitable for serverless)
2. **Transaction Pooler** - Transaction mode (NOT compatible with Prisma)
3. **Session Pooler** - Session mode (**USE THIS for Prisma**)

### Why `?pgbouncer=true&connection_limit=1`?

- **`pgbouncer=true`**: Tells Prisma to use PgBouncer-compatible mode
- **`connection_limit=1`**: Limits connections per serverless function (prevents exhausting connection pool)

### Database Schema

The application uses 6 main models:

1. **User** - Customer accounts
2. **Admin** - Administrator accounts
3. **Product** - Product catalog (16 beverage categories)
4. **ProductVariant** - Product variations (sizes/volumes)
5. **Order** - Customer orders
6. **OrderItem** - Individual items in orders

### Running Migrations

```bash
# Development
npm run prisma:migrate

# Production (using Prisma Cloud or direct connection)
DATABASE_URL="your-supabase-url" npm run db:push
```

### Seeding Data

The seed script (`prisma/seed.ts`) creates:
- Admin user with default credentials
- Sample products across all categories
- Product variants

```bash
npm run prisma:seed
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Fails: "Prisma Client Not Generated"

**Error:**
```
Error: @prisma/client did not initialize yet
```

**Solution:**
Ensure `prisma generate` runs before build:

```json
// package.json
"scripts": {
  "build": "prisma generate && next build",
  "postinstall": "prisma generate"
}
```

#### 2. Database Connection Error

**Error:**
```
P1001: Can't reach database server
```

**Solutions:**
- Verify DATABASE_URL is correct
- Check if `?pgbouncer=true&connection_limit=1` is included
- Ensure Supabase project is active (not paused)
- Verify IP whitelist in Supabase (set to allow all: `0.0.0.0/0`)

#### 3. Vercel Deployment Timeout

**Error:**
```
Error: Function execution timed out
```

**Solutions:**
- Use connection pooling (Session mode with PgBouncer)
- Add `connection_limit=1` to DATABASE_URL
- Check if database migrations are complete
- Verify Supabase region is close to Vercel deployment region

#### 4. JWT Token Invalid

**Error:**
```
JsonWebTokenError: invalid signature
```

**Solutions:**
- Ensure `JWT_SECRET` is the same across all environments
- Don't change JWT_SECRET after users have logged in (tokens will be invalid)
- Check that JWT_SECRET environment variable is set in Vercel

#### 5. Admin Login Not Working

**Solutions:**
- Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` are set in Vercel
- Check that admin user exists in database (run seed script)
- Generate correct bcrypt hash for password (10 salt rounds)

#### 6. CSS Not Loading / Styling Issues

**Solutions:**
- Check Tailwind CSS configuration
- Verify `globals.css` is imported in `layout.tsx`
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`

#### 7. Images Not Displaying

**Solution:**
Add image domains to `next.config.js`:

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}
```

#### 8. CORS Errors in Production

**Solution:**
Add security headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
      ],
    },
  ]
}
```

---

## Post-Deployment Checklist

After successful deployment, verify the following:

### Functionality Checks

- [ ] Homepage loads correctly
- [ ] Products page displays all items
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Product modal opens and displays details
- [ ] Add to cart functionality works
- [ ] Cart persists after page refresh
- [ ] Guest checkout works
- [ ] User registration works
- [ ] User login works
- [ ] Authenticated checkout works
- [ ] Order creation succeeds
- [ ] Order appears in profile/admin dashboard
- [ ] Admin login works
- [ ] Admin can view all orders
- [ ] Admin can update order status

### Security Checks

- [ ] `.env` files are NOT committed to Git
- [ ] Environment variables are set in Vercel dashboard
- [ ] Admin password is changed from default
- [ ] JWT_SECRET is secure and unique
- [ ] Database credentials are secure
- [ ] HTTPS is enabled (Vercel does this automatically)
- [ ] Security headers are configured

### Performance Checks

- [ ] Build completes successfully
- [ ] No console errors in production
- [ ] Images load properly
- [ ] Page load time is acceptable (<3 seconds)
- [ ] API routes respond quickly
- [ ] Database queries are optimized

### Database Checks

- [ ] Database connection works
- [ ] Migrations are applied
- [ ] Seed data is loaded (or real products added)
- [ ] Admin user exists and can log in
- [ ] Orders are being created correctly

---

## Useful Commands

### Development
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Create and run migration
npm run db:push          # Push schema without migration
npm run prisma:seed      # Seed database
npm run prisma:studio    # Open Prisma Studio GUI
```

### Deployment
```bash
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
vercel logs              # View deployment logs
vercel env ls            # List environment variables
```

---

## Support and Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Repository
- GitHub: https://github.com/bishnuthames101/boozmandu
- Issues: https://github.com/bishnuthames101/boozmandu/issues

### Quick Links
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://app.supabase.com
- Prisma Studio: `npx prisma studio`

---

## Security Best Practices

1. **Never commit sensitive data**
   - Keep `.env` files in `.gitignore`
   - Use Vercel environment variables for production

2. **Rotate secrets regularly**
   - Change JWT_SECRET periodically
   - Update database passwords
   - Change admin password after first login

3. **Use strong passwords**
   - Admin password should be complex
   - Database passwords should be unique

4. **Monitor your application**
   - Check Vercel logs regularly
   - Monitor Supabase usage
   - Set up error tracking (e.g., Sentry)

5. **Keep dependencies updated**
   ```bash
   npm outdated
   npm update
   ```

---

## License

This project is private and proprietary.

---

Made with ❤️ for Boozmandu - Nepal's Fastest Online Liquor Delivery
