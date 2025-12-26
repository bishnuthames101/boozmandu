# Boozmandu - Tech Stack Summary

## Quick Overview

**Project:** Boozmandu - Online Alcohol Delivery Platform
**Type:** Full-Stack E-Commerce Web Application
**Version:** 0.1.0

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.0 | React framework with SSR/SSG |
| React | 18.3.1 | UI library |
| TypeScript | 5.5.3 | Type-safe JavaScript |
| Tailwind CSS | 3.4.1 | Utility-first CSS framework |
| Framer Motion | 11.0.8 | Animation library |
| Lucide React | 0.344.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14.2.0 | Serverless API endpoints |
| Prisma | 5.22.0 | Database ORM |
| PostgreSQL | 15+ | Relational database |
| Supabase | - | Database hosting with pooling |

### Authentication & Security
| Technology | Version | Purpose |
|------------|---------|---------|
| JSON Web Tokens | 9.0.3 | Stateless authentication |
| bcrypt | 6.0.0 | Password hashing |
| Zod | 4.2.1 | Schema validation |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| TypeScript | 5.5.3 | Static typing |
| ESLint | 8.57.0 | Code linting |
| PostCSS | 8.4.35 | CSS processing |
| tsx | 4.7.0 | TypeScript execution |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Application hosting & serverless functions |
| Supabase | PostgreSQL database hosting |
| GitHub | Version control & CI/CD |

---

## Architecture

**Pattern:** Monolithic Full-Stack Application
**Rendering:** Server-Side Rendering (SSR) + Static Generation (SSG)
**API:** RESTful API via Next.js API Routes
**Database:** PostgreSQL with Prisma ORM
**Deployment:** Serverless (Vercel)

---

## Key Features

✅ User authentication & authorization
✅ Shopping cart with persistence
✅ Product catalog with categories
✅ Order management system
✅ Admin dashboard
✅ Real-time order status tracking
✅ Responsive design (mobile-first)
✅ SEO optimized
✅ Image optimization
✅ Security headers & HTTPS

---

## Database Models

- **Users** - Customer accounts
- **Admins** - Administrator accounts
- **Products** - Product catalog (16 categories)
- **ProductVariants** - Product size variations
- **Orders** - Customer orders
- **OrderItems** - Order line items

---

## Development Environment

**Required:**
- Node.js 20.x or higher
- npm 10.x or higher
- PostgreSQL 15+

**Optional:**
- Git
- VS Code (recommended IDE)

---

## For Your Report

### Short Description:
*"Boozmandu is a modern full-stack e-commerce platform built with Next.js 14, React 18, and TypeScript. It uses PostgreSQL with Prisma ORM for data management, implements JWT-based authentication, and is deployed on Vercel's serverless infrastructure. The application features a responsive UI built with Tailwind CSS, smooth animations via Framer Motion, and follows modern web security best practices."*

### Technology Highlights:
- **Frontend:** Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes + Prisma ORM
- **Database:** PostgreSQL (hosted on Supabase)
- **Authentication:** JWT + bcrypt
- **Deployment:** Vercel (Serverless)
- **Development:** TypeScript, ESLint, Git/GitHub

---

*Generated: December 2024*
