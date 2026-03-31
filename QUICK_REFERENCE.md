# 🏗️ Structura Quick Reference Card

## What's Implemented ✅

```
Frontend UI              ✅ Complete
Authentication System   ✅ Complete (JWT + Bcryptjs)
Database Schema         ✅ Complete (Prisma)
Portfolio Component     ✅ Complete (Full CRUD)
Sidebar Integration     ✅ Complete
Context Setup           ✅ Complete
Type Definitions        ✅ Complete
Documentation           ✅ Complete
```

## What Needs Work ⚠️

```
API Endpoints           ⚠️ Need DB integration
Image Upload           ⚠️ Need S3/Firebase setup
Profile Management     ⚠️ Need backend update
Customer Dashboard     ⚠️ Needs build
Real-Time Features     ⚠️ Optional enhancement
```

---

## 📁 File Locations

| What | Where |
|------|-------|
| Auth Context | `context/AuthContext.tsx` |
| Auth Utils | `lib/auth-utils.ts` |
| Types | `lib/types.ts` |
| Portfolio UI | `components/vendor/VendorPortfolio.tsx` |
| Sidebar | `components/vendor/VendorSidebar.tsx` |
| Vendor Dashboard | `app/vendor-dashboard/page.tsx` |
| Auth Routes | `app/api/auth/` |
| Portfolio Routes | `app/api/portfolio/` |
| DB Schema | `prisma/schema.prisma` |
| Root Layout | `app/layout.tsx` |

---

## 🔑 Key Features

### Authentication
- ✅ JWT token generation
- ✅ Password hashing (bcryptjs)
- ✅ Remember Me functionality
- ✅ Session management
- ✅ HttpOnly cookies
- ✅ Auto-logout

### Vendor Portfolio
- ✅ Create projects
- ✅ Edit projects
- ✅ Delete projects
- ✅ Image support
- ✅ Categorization
- ✅ Tagging system
- ✅ Status tracking

### Database
- ✅ PostgreSQL schema
- ✅ Firebase support
- ✅ Relationship management
- ✅ Cascade deletes
- ✅ Migrations ready

---

## 🚀 Quick Setup

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Update DATABASE_URL and secrets in .env.local

# 3. Start dev server
npm run dev

# 4. Create database (PostgreSQL)
createdb structura_db
# Grant permissions in psql

# 5. Run migrations
npx prisma migrate dev --name init

# 6. View database
npx prisma studio
```

---

## 💻 Code Snippets

### Use Authentication Hook
```typescript
import { useAuth } from '@/context/AuthContext';

const { user, isAuthenticated, login, logout } = useAuth();
```

### Type Safety
```typescript
import type { User, PortfolioProject, VendorProfile } from '@/lib/types';

const project: PortfolioProject = { ... };
```

### API Call with Auth
```typescript
const res = await fetch('/api/portfolio', {
  credentials: 'include',  // Important for cookies!
  headers: { 'Content-Type': 'application/json' }
});
```

### Prisma Query
```typescript
import { prisma } from '@/lib/prisma';

const projects = await prisma.portfolioProject.findMany({
  where: { vendorId: userId }
});
```

---

## 🔐 Security Quick Tips

```
✅ Always validate input
✅ Hash passwords with bcryptjs
✅ Sign JWT with secret key
✅ Use HttpOnly cookies
✅ Verify ownership on updates
✅ Never return passwords in responses
✅ Set CORS properly
✅ Use HTTPS in production
```

---

## 📊 Database Quick Reference

### Main Tables
- `users` - Core authentication
- `vendor_profiles` - Vendor information
- `customer_profiles` - Customer information
- `portfolio_projects` - Vendor portfolio
- `customer_projects` - Customer projects
- `vendor_requests` - Job requests
- `quotes` - Vendor bids

### Key Relations
- User → VendorProfile (1:1)
- User → CustomerProfile (1:1)
- VendorProfile → PortfolioProjects (1:many)
- CustomerProfile → CustomerProjects (1:many)

---

## 🎨 Theme Colors

```
Background:   #0d0f14
Cards:        #111520
Text:         #e2eef5
Secondary:    #7a9aaa
Accent:       #a855f7 (purple)
Success:      #34d399 (green)
Error:        #f87171 (red)
Warning:      #f59e4a (amber)
```

---

## 📝 Environment Variables

### Required
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/structura_db"
JWT_SECRET="minimum_32_character_secret"
SESSION_SECRET="minimum_32_character_secret"
```

### Optional
```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
REMEMBER_ME_DURATION_DAYS="30"
```

---

## 🧪 Test Data

### Create Vendor User
```javascript
{
  "email": "vendor@test.com",
  "password": "TestPass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "vendor",
  "trade": "Structural Framing",
  "license": "GC-2024-00881"
}
```

### Create Portfolio Project
```javascript
{
  "title": "Modern Office Complex",
  "description": "12-story commercial building",
  "category": "commercial",
  "budget": "50L - 1Cr",
  "timeline": "18 months",
  "client": "ABC Corporation",
  "location": "Mumbai, India",
  "tags": ["Structural", "RCC", "Commercial"]
}
```

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Run production

# Database
npx prisma migrate dev  # Run migrations
npx prisma studio      # View database
npx prisma generate    # Generate client

# Code Quality
npm run lint            # Check code
npm run type-check      # TypeScript check
npm test                # Run tests

# Deployment
vercel deploy          # Deploy to Vercel
```

---

## 🔗 API Endpoints

### Auth
```
POST   /api/auth/register     - Create account
POST   /api/auth/login        - Login
POST   /api/auth/logout       - Logout
GET    /api/auth/me           - Verify session
```

### Portfolio
```
GET    /api/portfolio         - List projects
POST   /api/portfolio         - Create project
GET    /api/portfolio/[id]    - Get project
PUT    /api/portfolio/[id]    - Update project
DELETE /api/portfolio/[id]    - Delete project
```

---

## 📖 Documentation

| Doc | Purpose |
|-----|---------|
| `SETUP_GUIDE.md` | Environment & database setup |
| `DATABASE_SCHEMA.md` | Database design reference |
| `DEVELOPMENT_GUIDE.md` | Development instructions |
| `GETTING_STARTED.md` | Next steps & checklist |
| `STRUCTURA_COMPLETE_SUMMARY.md` | Full implementation summary |
| `.env.example` | Environment template |

---

## ⚠️ Important Notes

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Change secrets in production** - Use 32+ random characters
3. **Always validate input** - On server and client
4. **Verify ownership** - Before update/delete operations
5. **Use HTTPS in production** - Required for secure cookies
6. **Test auth flows** - Thoroughly before deployment

---

## ✨ Tips & Tricks

### Generate Random Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Test API Endpoint
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b "authToken=YOUR_JWT_TOKEN"
```

### View Database
```bash
npx prisma studio
# Opens UI at http://localhost:5555
```

### Check Types
```bash
npx tsc --noEmit
```

---

## 🎯 Progress Checklist

- [ ] Environment setup (`.env.local`)
- [ ] Database created
- [ ] Migrations run
- [ ] Dev server works
- [ ] Can register user
- [ ] Can login
- [ ] JWT token set
- [ ] Can create portfolio
- [ ] Can edit portfolio
- [ ] Can delete portfolio
- [ ] Image upload works
- [ ] Remember Me works
- [ ] Auto-logout works
- [ ] Ready for deployment

---

**Version**: 1.0.0
**Last Updated**: April 1, 2026
**Status**: ✅ Foundation Ready
