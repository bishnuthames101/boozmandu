# Boozmandu - Quick Start Guide

Fast setup instructions for getting Boozmandu running locally and deploying to production.

## Local Development (5 minutes)

### 1. Prerequisites Check
```bash
node --version  # Should be 18+
npm --version
psql --version  # PostgreSQL should be installed
```

### 2. Clone and Install
```bash
git clone https://github.com/bishnuthames101/boozmandu.git
cd boozmandu
npm install
```

### 3. Set Up Local Database
```bash
# Start PostgreSQL service (if not running)
# Windows: Check services or use: net start postgresql-x64-14
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE boozmandu;
CREATE USER bishnu WITH PASSWORD 'bishnu12';
GRANT ALL PRIVILEGES ON DATABASE boozmandu TO bishnu;
\q
```

### 4. Environment Setup
The `.env.local` file is already configured for local development. If you need to modify:

```bash
# Use .env.local directly (Next.js auto-loads it)
# Or copy to .env
cp .env.local .env
```

### 5. Database Migration and Seed
```bash
npm run db:push
npm run prisma:seed
```

### 6. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

**Admin Login:**
- Email: `admin@boozmandu.com`
- Password: `Boozmandu@Admin2024`

---

## Production Deployment to Vercel (10 minutes)

### 1. Get Your Supabase URL

1. Go to [Supabase](https://supabase.com) → Your Project
2. Settings → Database → Connection Pooling
3. Copy **Session Mode** URL
4. Add `?pgbouncer=true&connection_limit=1` to the end

**Example:**
```
postgresql://postgres.abc123:password@aws-1-ap-south-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/new)
2. Import GitHub repository: `bishnuthames101/boozmandu`
3. Add these environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase URL from step 1 |
| `JWT_SECRET` | `9K7x2nP4mQ8wE3tY6uR5zL1aB0cD9fG2hJ4kM7pS8vW3xZ6` |
| `NODE_ENV` | `production` |

4. Click "Deploy"

### 3. Set Up Production Database

After deployment completes:

```bash
# Use your Supabase URL
DATABASE_URL="your-supabase-url-here" npm run db:push
DATABASE_URL="your-supabase-url-here" npm run prisma:seed
```

### 4. Verify Deployment

Visit your Vercel deployment URL and test:
- Homepage loads
- Products display
- Can add to cart
- Admin login works at `/admin/login`

---

## Switching Between Local and Production

### Use Local Database
```bash
# Option 1: Next.js automatically uses .env.local
npm run dev

# Option 2: Temporarily rename
mv .env .env.backup
mv .env.local .env
npm run dev
```

### Use Production Database (Supabase)
```bash
# Use .env with Supabase URL
mv .env.local .env.local.backup
mv .env.backup .env
npm run dev
```

---

## Common Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Test production build
npm run lint                   # Check code quality

# Database
npm run db:push                # Update database schema
npm run prisma:seed            # Add sample data
npm run prisma:studio          # Open database GUI

# Deployment
vercel                         # Deploy preview
vercel --prod                  # Deploy production
vercel logs                    # View logs
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Database Connection Error
- Check DATABASE_URL format
- Verify Supabase project is active
- Ensure `?pgbouncer=true&connection_limit=1` is included
- Check database exists: `psql -U postgres -l`

### Admin Can't Login
```bash
# Re-seed database
npm run prisma:seed

# Or manually create admin
npx prisma studio
# Add admin user with email: admin@boozmandu.com
```

---

## Project Structure

```
boozmandu/
├── src/
│   ├── app/              # Next.js pages and API routes
│   ├── components/       # Reusable React components
│   ├── context/          # React Context (Auth, Cart)
│   └── lib/              # Utilities (Prisma, auth, etc.)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Database seeding
├── .env.local            # Local development config
├── .env.production       # Production config (template)
└── vercel.json           # Vercel deployment config
```

---

## Need More Help?

- **Full Documentation:** See `DEPLOYMENT_GUIDE.md`
- **Issues:** https://github.com/bishnuthames101/boozmandu/issues
- **Prisma Docs:** https://www.prisma.io/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

---

Happy Coding! 🚀
