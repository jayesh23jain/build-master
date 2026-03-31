# 🏗️ Structura - Construction Management Platform
## Full-Stack Setup Guide

### 🎯 Project Overview

Structura is a complete construction management platform connecting customers and vendors with distinct dashboards, real-time updates, portfolio management, and secure authentication.

---

## ⚙️ **Step 1: Prerequisites & Installation**

### Required Node Version
```bash
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
```

### Install Dependencies
```bash
npm install

# Install authentication dependencies (already done)
npm install jsonwebtoken bcryptjs

# Install database ORM (choose one)
npm install @prisma/client prisma  # PostgreSQL recommended
# OR
npm install firebase firebase-admin  # Firebase option
```

---

## 🗄️ **Step 2: Database Setup**

### OPTION A: PostgreSQL (Recommended for Production)

**1. Install PostgreSQL**
```bash
# macOS
brew install postgresql@15

# Windows - Download from https://www.postgresql.org/download
# Ubuntu
sudo apt-get install postgresql postgresql-contrib
```

**2. Create Database**
```bash
# Connect to PostgreSQL
psql

# Inside psql
CREATE DATABASE structura_db;
CREATE USER structura_user WITH PASSWORD 'your_secure_password';
ALTER ROLE structura_user SET client_encoding TO 'utf8';
ALTER ROLE structura_user SET default_transaction_isolation TO 'read committed';
GRANT ALL PRIVILEGES ON DATABASE structura_db TO structura_user;
\q
```

**3. Setup Prisma**
```bash
npx prisma init

# Copy the schema from prisma/schema.prisma
# OR initialize migrations
npx prisma migrate dev --name init
```

### OPTION B: Firebase (Quick Start)

**1. Create Firebase Project**
- Go to [firebase.google.com](https://console.firebase.google.com)
- Create new project
- Enable Firestore Database
- Download service account key

**2. Setup Firestore Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /vendors/{docId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.userId;
    }
    match /portfolios/{docId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.vendorId;
    }
  }
}
```

---

## 🔐 **Step 3: Environment Variables**

Create `.env.local`:

```env
# ============ DATABASE ============
DATABASE_URL="postgresql://structura_user:your_secure_password@localhost:5432/structura_db"

# Or Firebase
NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
FIREBASE_ADMIN_SDK_KEY="path/to/serviceAccountKey.json"

# ============ AUTHENTICATION ============
JWT_SECRET="your_minimum_32_character_secret_key_change_this_in_production_12345"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# ============ SESSIONS ============
SESSION_SECRET="another_minimum_32_character_session_secret_key_change_this_12345"
REMEMBER_ME_DURATION_DAYS="30"

# ============ NODE ENV ============
NODE_ENV="development"
```

---

## 🔌 **Step 4: Run Database Migrations**

```bash
# Install Prisma
npm install -D @prisma/cli

# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# (Optional) View database UI
npx prisma studio
```

---

## 🚀 **Step 5: Start Development Server**

```bash
npm run dev

# App available at: http://localhost:3000
```

---

## 📁 **Project Structure**

```
Structura/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts       ← Login endpoint
│   │   │   ├── register/route.ts    ← Registration
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   └── portfolio/
│   │       ├── route.ts             ← Portfolio CRUD
│   │       └── [id]/route.ts
│   ├── auth/
│   │   ├── login/page.tsx           ← Login UI
│   │   └── register/page.tsx        ← Register UI
│   ├── vendor-dashboard/
│   │   ├── page.tsx                 ← Main dashboard
│   │   └── profile/page.tsx         ← Profile page
│   ├── customer-dashboard/
│   │   └── page.tsx                 ← Customer dashboard
│   └── layout.tsx                   ← Root layout (AuthProvider)
│
├── components/
│   ├── vendor/
│   │   ├── VendorPortfolio.tsx      ← Portfolio component
│   │   ├── VendorSidebar.tsx        ← Sidebar (with portfolio link)
│   │   └── pages/
│   │       ├── VendorProfile.tsx
│   │       └── [other pages]
│   └── [other components]
│
├── context/
│   └── AuthContext.tsx              ← Auth state management
│
├── lib/
│   ├── auth-utils.ts                ← Auth utilities
│   ├── types.ts                     ← TypeScript types
│   └── [other utilities]
│
├── prisma/
│   ├── schema.prisma                ← Database schema
│   └── migrations/                  ← Database migrations
│
├── .env.local                       ← Environment variables
├── DATABASE_SCHEMA.md               ← Database info
└── [other files]
```

---

## 🛣️ **Platform Routes**

### Public Routes
- `/` - Home page
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Vendor Routes (Protected)
- `/vendor-dashboard` - Main dashboard with navigation
  - Overview
  - Open Requests
  - My Quotes
  - Active Projects
  - **Portfolio** ← Portfolio management
  - Profile
- `/vendor-dashboard/profile` - Edit profile

### Customer Routes (Protected)
- `/customer-dashboard` - Main dashboard
- `/customer-dashboard/profile` - Edit profile

---

## 🔑 **Authentication Flow**

### Registration
```
1. User fills registration form
2. Password validation
3. Password hashing (bcryptjs)
4. User created in database
5. Redirect to login
```

### Login
```
1. User enters email/password
2. Password verification
3. JWT token generated (24h)
4. HttpOnly cookie set
5. Remember Me token (optional, 30 days)
6. Redirect to dashboard
7. Session verified with /api/auth/me
```

### Session Persistence
```
- JWT stored in HttpOnly cookie
- Remember Me token (separate cookie)
- Auto-logout on token expiration
- Session verification on app load
```

---

## 📊 **Database Schema**

### Users Table
```sql
- id (UUID)
- email (UNIQUE)
- passwordHash
- firstName, lastName
- profileImage
- role (customer/vendor)
- rememberMeToken, rememberMeExpiry
- createdAt, updatedAt
```

### Vendor Profiles Table
```sql
- userId (FK to Users)
- trade, license
- phone, location, bio
- experience, rating, reviews
- portfolioProjects (relation)
```

### Portfolio Projects Table
```sql
- vendorId (FK)
- title, description, images
- category, budget, timeline
- status (completed/in-progress/planned)
- client, location, tags
- startDate, endDate
```

### Customer Projects, Vendor Requests, Quotes
- See DATABASE_SCHEMA.md for all tables

---

## 🔐 **Security Checklist**

- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT tokens with expiration (24h)
- ✅ HttpOnly cookies (XSS protection)
- ✅ CORS configured
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Rate limiting (recommended to implement)
- ✅ CSRF protection (SameSite=Strict)
- ✅ Remember Me tokens (30-day expiry)
- ⚠️ TODO: Email verification
- ⚠️ TODO: Two-factor authentication

---

## 🧪 **Testing Credentials**

After running migrations, create test users:

```bash
# Using POST /api/auth/register

# Vendor
{
  "email": "vendor@example.com",
  "password": "TestPass123!",
  "confirmPassword": "TestPass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "vendor",
  "trade": "Structural Framing",
  "license": "GC-2024-00881"
}

# Customer
{
  "email": "customer@example.com",
  "password": "TestPass123!",
  "confirmPassword": "TestPass123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "role": "customer"
}
```

---

## 🐛 **Common Issues & Solutions**

### Issue: "JWT_SECRET not defined"
✓ Solution: Add JWT_SECRET to .env.local (min 32 chars)

### Issue: "Module not found: 'jsonwebtoken'"
✓ Solution: Already installed, restart dev server

### Issue: "Database connection failed"
✓ Solution: Check DATABASE_URL in .env.local

### Issue: "Prisma schema not found"
✓ Solution: Run `npx prisma init`

### Issue: "Tables not found"
✓ Solution: Run `npx prisma migrate dev --name init`

---

## 📚 **Next Steps**

1. **Setup Complete** - Database and auth ready
2. **Create API Routes** - Implement endpoints
3. **Build UIs** - Login, Register, Profile pages
4. **Add Features** - Portfolio, quotes, projects
5. **Deployment** - Vercel, AWS, DigitalOcean

---

## 🚀 **Deployment Checklist**

- [ ] Update JWT_SECRET (random 32+ chars)
- [ ] Enable HTTPS
- [ ] Setup PostgreSQL on hosting
- [ ] Configure environment variables
- [ ] Run `npm run build`
- [ ] Setup CI/CD pipeline
- [ ] Enable monitoring/logging
- [ ] Setup backups
- [ ] Test all features

---

## 📞 **Support**

See DATABASE_SCHEMA.md for detailed schema
Check INTEGRATION_EXAMPLES.md for code samples
Review lib/auth-utils.ts for utility functions

---

**Status**: ✅ Ready for Development
**Version**: 1.0.0
**Last Updated**: April 1, 2026
