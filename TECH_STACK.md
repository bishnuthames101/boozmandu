# Boozmandu - Technology Stack

## Overview
Boozmandu is a modern e-commerce platform for alcohol delivery built with cutting-edge web technologies, focusing on performance, security, and user experience.

---

## Frontend Technologies

### Core Framework
- **Next.js 14.2.0** - React framework with server-side rendering, API routes, and optimized performance
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **TypeScript 5.5.3** - Type-safe JavaScript for better developer experience and code quality

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework for rapid UI development
- **PostCSS 8.4.35** - CSS processing and optimization
- **Autoprefixer 10.4.18** - Automatic vendor prefixing for cross-browser compatibility
- **Framer Motion 11.0.8** - Production-ready animation library for React
- **Lucide React 0.344.0** - Beautiful, customizable icon library

### State Management
- **React Context API** - Built-in React state management for:
  - Authentication state (AuthContext)
  - Shopping cart state (CartContext)
  - Global app state

---

## Backend Technologies

### Database & ORM
- **PostgreSQL** - Robust, enterprise-grade relational database
- **Supabase** - PostgreSQL hosting with built-in features:
  - Connection pooling (PgBouncer)
  - Real-time capabilities
  - Automated backups
- **Prisma 5.22.0** - Next-generation ORM with:
  - Type-safe database queries
  - Auto-generated TypeScript types
  - Database migrations
  - Prisma Studio for database management

### API Layer
- **Next.js API Routes** - Serverless API endpoints with:
  - `/api/auth/*` - Authentication endpoints
  - `/api/products/*` - Product management
  - `/api/orders/*` - Order processing
  - `/api/admin/*` - Admin operations

---

## Authentication & Security

### Authentication
- **JSON Web Tokens (JWT)** - Stateless authentication with 7-day expiration
- **jsonwebtoken 9.0.3** - JWT generation and verification
- **bcrypt 6.0.0** - Password hashing with salt rounds

### Security Features
- **HTTP Security Headers** - Configured in next.config.js:
  - X-Frame-Options (SAMEORIGIN)
  - X-Content-Type-Options (nosniff)
  - X-XSS-Protection
  - Strict-Transport-Security (HSTS)
  - Content Security Policy
  - Referrer Policy
  - Permissions Policy

### Data Validation
- **Zod 4.2.1** - TypeScript-first schema validation for:
  - User input validation
  - API request/response validation
  - Form data validation

---

## Development Tools

### Build Tools
- **Node.js** - JavaScript runtime environment
- **npm** - Package manager
- **tsx 4.7.0** - TypeScript execution for scripts

### Code Quality
- **ESLint 8.57.0** - Linting for code quality
- **eslint-config-next 14.2.0** - Next.js specific ESLint rules
- **TypeScript** - Static type checking

### Type Definitions
- **@types/node 20.11.0** - Node.js type definitions
- **@types/react 18.3.5** - React type definitions
- **@types/react-dom 18.3.0** - React DOM type definitions
- **@types/bcrypt 6.0.0** - Bcrypt type definitions
- **@types/jsonwebtoken 9.0.10** - JWT type definitions

---

## Deployment & Hosting

### Platform
- **Vercel** - Serverless deployment platform with:
  - Automatic deployments from Git
  - Edge network CDN
  - Serverless functions
  - Environment variable management
  - Preview deployments

### Version Control
- **Git** - Version control system
- **GitHub** - Code repository and collaboration

---

## Database Schema

### Data Models (Prisma)
1. **User** - Customer accounts with authentication
2. **Admin** - Admin user accounts
3. **Product** - Product catalog with categories
4. **ProductVariant** - Product size/volume variations
5. **Order** - Customer orders with status tracking
6. **OrderItem** - Individual items in orders

### Database Features
- UUID primary keys for security
- Timestamps (createdAt, updatedAt)
- Cascade delete for referential integrity
- Enum types for categories and statuses
- Unique constraints on emails

---

## Project Structure

```
boozmandu/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   ├── (pages)/          # Page routes
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # UI components
│   ├── context/             # React Context providers
│   ├── lib/                 # Utility functions
│   │   ├── prisma.ts       # Prisma client
│   │   ├── auth.ts         # Auth utilities
│   │   └── validations.ts  # Zod schemas
│   ├── data/               # Static data
│   └── types/              # TypeScript types
├── public/                 # Static assets
└── scripts/               # Utility scripts
```

---

## Key Features Implementation

### 1. E-Commerce Functionality
- Product catalog with categories and search
- Shopping cart with local storage persistence
- Guest checkout and authenticated checkout
- Order tracking and status updates

### 2. Authentication System
- User registration and login
- Admin authentication (separate from users)
- JWT-based session management
- Password hashing with bcrypt
- Protected routes and API endpoints

### 3. Admin Dashboard
- Product management (CRUD operations)
- Order management and status updates
- User management
- Analytics and reporting

### 4. Product Management
- Multiple product categories (16 types)
- Product variants (different sizes/volumes)
- Image optimization with Next.js Image
- Stock management
- Featured products

### 5. Order Processing
- Real-time order creation
- Order status workflow:
  - PENDING → CONFIRMED → PREPARING → OUT_FOR_DELIVERY → DELIVERED
- Order cancellation
- Customer notes and special instructions

---

## Performance Optimizations

### Next.js Features
- **Server-Side Rendering (SSR)** - Fast initial page loads
- **Static Site Generation (SSG)** - Pre-rendered pages
- **Image Optimization** - Automatic image resizing and optimization
- **Code Splitting** - Automatic route-based code splitting
- **Route Prefetching** - Faster navigation

### Database
- **Connection Pooling** - PgBouncer for efficient connections
- **Indexed Queries** - Optimized database indexes
- **Select Optimization** - Only fetch required fields

### Caching
- **Browser Caching** - Static assets caching
- **CDN Caching** - Edge network caching via Vercel

---

## Development Workflow

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:*     # Prisma commands
```

### Database Management
```bash
prisma generate      # Generate Prisma client
prisma migrate       # Run migrations
prisma db push       # Push schema changes
prisma studio        # Open Prisma Studio GUI
prisma db seed       # Seed database
```

---

## Environment Variables

### Required Configuration
- `DATABASE_URL` - PostgreSQL connection string with pooling
- `JWT_SECRET` - Secret key for JWT token signing
- `NODE_ENV` - Environment (development/production)

---

## Third-Party Services

### Infrastructure
- **Supabase** - PostgreSQL database hosting
- **Vercel** - Application hosting and deployment
- **GitHub** - Version control and CI/CD

### Assets
- **Pexels** - Product images (images.pexels.com)

---

## Browser Support

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Progressive Enhancement
- Works without JavaScript (basic functionality)
- Responsive design (mobile-first)
- Touch-friendly interface

---

## Security Measures

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - No password length restrictions (minimum 6 characters)

2. **Authentication**
   - JWT with expiration
   - HTTP-only storage recommended
   - Secure session management

3. **Input Validation**
   - Zod schema validation
   - XSS protection
   - SQL injection prevention (Prisma)

4. **HTTPS**
   - Enforced in production
   - HSTS headers
   - Secure cookie flags

5. **Environment Variables**
   - Sensitive data not in code
   - .gitignore for .env files
   - Vercel secret management

---

## Accessibility

- Semantic HTML5
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatible
- Color contrast compliance

---

## Future Enhancement Possibilities

- Payment gateway integration (Stripe/PayPal)
- Real-time order tracking
- Push notifications
- Mobile app (React Native)
- SMS notifications
- Email confirmations
- Review and rating system
- Advanced analytics
- Multi-language support
- Dark mode

---

## Version Information

**Project Version:** 0.1.0
**Node.js Version:** 20.x or higher
**npm Version:** 10.x or higher
**Database:** PostgreSQL 15+

---

## License & Credits

**Framework:** Next.js by Vercel
**Database:** PostgreSQL & Supabase
**Icons:** Lucide React
**Animations:** Framer Motion

---

*Last Updated: December 2024*
