# Boozmandu - Nepal's Fastest Online Liquor Delivery 🍷

A modern, full-stack e-commerce platform for online alcohol delivery in Nepal, built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-316192?style=for-the-badge&logo=postgresql)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

## Features

### Customer Features
- Browse 16+ categories of alcoholic beverages
- Advanced product search and filtering
- Product variants (different sizes/volumes)
- Shopping cart with localStorage persistence
- Guest checkout and authenticated checkout
- User registration and authentication
- Order tracking with real-time status updates
- Order history and profile management

### Admin Features
- Secure admin authentication
- Admin dashboard for order management
- View and update order statuses
- User management capabilities
- Real-time order notifications

### Technical Features
- Server-side rendering (SSR) with Next.js 14
- Type-safe database queries with Prisma ORM
- JWT-based authentication with bcrypt encryption
- Responsive design with Tailwind CSS
- Optimized images and performance
- SEO-friendly with metadata and Open Graph tags
- Secure HTTP headers
- Connection pooling for serverless deployment

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 + React 18 | UI framework with SSR |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| **Language** | TypeScript 5.5 | Type safety |
| **Database** | PostgreSQL (Supabase) | Relational database |
| **ORM** | Prisma 5.22 | Database toolkit |
| **Authentication** | JWT + bcrypt | Secure auth |
| **Validation** | Zod | Schema validation |
| **Deployment** | Vercel | Serverless hosting |
| **Animation** | Framer Motion | Smooth animations |
| **Icons** | Lucide React | Icon library |

## Quick Start

### Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/bishnuthames101/boozmandu.git
cd boozmandu

# 2. Install dependencies
npm install

# 3. Set up local PostgreSQL database
createdb boozmandu

# 4. Configure environment (use .env.local)
# Already configured for local DB

# 5. Run migrations and seed
npm run db:push
npm run prisma:seed

# 6. Start development server
npm run dev
```

Visit http://localhost:3000

**Admin Login:**
- Email: `admin@boozmandu.com`
- Password: `Boozmandu@Admin2024`

### Production Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

Quick deploy to Vercel:

1. Import repository to Vercel
2. Add environment variables (DATABASE_URL, JWT_SECRET)
3. Deploy
4. Run migrations on production database

## Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Fast setup in 5 minutes
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[Environment Variables](./DEPLOYMENT_GUIDE.md#environment-variables)** - Configuration reference
- **[Troubleshooting](./DEPLOYMENT_GUIDE.md#troubleshooting)** - Common issues and solutions

## Project Structure

```
boozmandu/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── admin/          # Admin endpoints
│   │   │   ├── orders/         # Order management
│   │   │   └── products/       # Product catalog
│   │   ├── admin/              # Admin pages
│   │   ├── login/              # User authentication
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Checkout flow
│   │   ├── profile/            # User profile
│   │   ├── products/           # Product listings
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── layout/             # Header, Footer, Layout
│   │   └── ui/                 # Reusable UI components
│   ├── context/
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── CartContext.tsx     # Shopping cart state
│   ├── lib/
│   │   ├── prisma.ts           # Prisma client
│   │   ├── auth.ts             # JWT utilities
│   │   ├── middleware.ts       # Request middleware
│   │   └── validations.ts      # Zod schemas
│   └── types/                  # TypeScript types
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeding
├── public/                     # Static assets
├── .env.local                  # Local environment config
├── .env.production             # Production config template
├── vercel.json                 # Vercel deployment config
└── package.json                # Dependencies
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run database migration
npm run db:push          # Push schema to database
npm run prisma:seed      # Seed database with initial data
npm run prisma:studio    # Open Prisma Studio GUI

# Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
```

## Database Schema

### Models

- **User** - Customer accounts with authentication
- **Admin** - Administrator accounts
- **Product** - Product catalog with 16 beverage categories
- **ProductVariant** - Product variations (sizes, volumes, prices)
- **Order** - Customer orders with status tracking
- **OrderItem** - Individual items within orders

### Categories

WHISKY, VODKA, BEER, WINE, RUM, GIN, SODAS, ENERGYDRINK, CIDER, LOCALSPIRIT, JUICE, SOJU, SYRUP, VERMOUTH

### Order Statuses

PENDING → CONFIRMED → PREPARING → OUT_FOR_DELIVERY → DELIVERED / CANCELLED

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | Secret key for JWT signing | `random-32-char-string` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `ADMIN_EMAIL` | Admin login email | `admin@boozmandu.com` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hashed admin password | `$2b$10$...` |

See [.env.example](./.env.example) for detailed configuration.

## API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/admin/login` - Admin login

### Products
- `GET /api/products` - List products (with filters)
- `GET /api/products/[id]` - Get product details

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - List user/admin orders
- `GET /api/orders/[id]` - Get order details
- `PATCH /api/orders/[id]` - Update order status (admin)
- `DELETE /api/orders/[id]` - Cancel order

## Security Features

- JWT authentication with 7-day token expiration
- Bcrypt password hashing (10 salt rounds)
- Zod schema validation on all inputs
- SQL injection prevention via Prisma
- Secure HTTP headers (HSTS, XSS protection, etc.)
- Environment variable protection
- Admin-only routes with middleware

## Performance Optimizations

- Server-side rendering for fast initial loads
- Static page generation where possible
- Automatic code splitting by route
- Image optimization with Next.js Image
- Connection pooling for database (PgBouncer)
- Edge caching via Vercel CDN

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a private project. For issues or suggestions, please contact the repository owner.

## License

Private and proprietary. All rights reserved.

## Support

- **Issues:** [GitHub Issues](https://github.com/bishnuthames101/boozmandu/issues)
- **Email:** Contact repository owner
- **Documentation:** See guides in this repository

## Deployment Status

- **Production:** Coming soon
- **Repository:** https://github.com/bishnuthames101/boozmandu
- **Platform:** Vercel + Supabase

## Acknowledgments

Built with modern web technologies and best practices:
- Next.js team for the excellent framework
- Prisma team for the amazing ORM
- Vercel for seamless deployment
- Supabase for managed PostgreSQL

---

Made with ❤️ for Boozmandu - Delivering happiness, one bottle at a time! 🍺
