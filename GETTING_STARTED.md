# 🚀 Getting Started with Structura

## What You Have Right Now

✅ **Complete Full-Stack Foundation**
- Authentication system (JWT + password hashing)
- Vendor portfolio management UI
- Database schema (ready to connect)
- Type-safe codebase
- Comprehensive documentation

---

## 📋 Next Steps (In Order)

### Step 1: Setup Environment (5 min)
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
# - Add database URL
# - Generate random JWT_SECRET (32+ chars)
# - Generate random SESSION_SECRET (32+ chars)
```

### Step 2: Setup Database (10-15 min)

**Option A: PostgreSQL (Recommended)**
```bash
# Install PostgreSQL
# macOS: brew install postgresql@15
# Ubuntu: sudo apt-get install postgresql
# Windows: Download from postgresql.org

# Create database
createdb structura_db

# Create user
psql structura_db
CREATE USER structura_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE structura_db TO structura_user;
\q

# Update DATABASE_URL in .env.local:
# DATABASE_URL="postgresql://structura_user:your_password@localhost:5432/structura_db"

# Run migrations
npx prisma migrate dev --name init

# Verify (optional)
npx prisma studio
```

**Option B: Firebase**
- Create Firebase project at firebase.google.com
- Download service account key
- Add credentials to .env.local

### Step 3: Verify Setup (5 min)
```bash
# Start dev server
npm run dev

# Open http://localhost:3000

# Should see:
# - Home page loads
# - No database errors
# - Portfolio component exists
```

### Step 4: Implement API Endpoints (1-2 hours)

Each endpoint needs database integration. Here's the checklist:

**Auth Endpoints** (`app/api/auth/`)
```
□ GET  /api/auth/me
  - Verify JWT token from cookie
  - Return user from database
  
□ POST /api/auth/register
  - Validate email unique
  - Hash password with bcryptjs
  - Create user & profile in DB
  - Generate JWT token
  - Set HttpOnly cookie
  
□ POST /api/auth/login
  - Find user by email
  - Verify password hash
  - Generate JWT token
  - Set Remember Me cookie (if enabled)
  - Return user
  
□ POST /api/auth/logout
  - Clear cookies
  - Invalidate session
  - Return success
```

**Portfolio Endpoints** (`app/api/portfolio/`)
```
□ GET /api/portfolio
  - Get all projects for current vendor
  - Query: SELECT * FROM portfolio_projects WHERE vendorId = userId
  - Return projects array
  
□ POST /api/portfolio
  - Validate project data
  - Create new project in DB
  - Link to current vendor
  - Return created project
  
□ GET /api/portfolio/[id]
  - Get single project
  - Verify ownership
  - Return project details
  
□ PUT /api/portfolio/[id]
  - Update project in DB
  - Verify vendor ownership
  - Return updated project
  
□ DELETE /api/portfolio/[id]
  - Delete project from DB
  - Verify vendor ownership
  - Return success
```

### Step 5: Test Authentication Flow (15 min)
```bash
# Register vendor
POST /api/auth/register
{
  "email": "vendor@test.com",
  "password": "TestPass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "vendor",
  "trade": "Structural Framing",
  "license": "GC-2024-00881"
}

# Login
POST /api/auth/login
{
  "email": "vendor@test.com",
  "password": "TestPass123!",
  "rememberMe": true
}

# Verify session
GET /api/auth/me
(Should return user object)

# Create portfolio project
POST /api/portfolio
{
  "title": "Modern Office Building",
  "description": "12-story commercial building with renewable energy",
  "category": "commercial",
  "budget": "50L - 1Cr",
  "timeline": "18 months",
  "client": "ABC Corporation",
  "location": "Mumbai, India",
  "tags": ["Structural", "RCC", "Commercial", "Sustainable"]
}
```

### Step 6: Setup Image Upload (30 min)
```bash
# Choose file storage:
# Option 1: AWS S3
npm install aws-sdk

# Option 2: Firebase Storage (built-in with Firebase)

# Option 3: Cloudinary
npm install next-cloudinary

# Add environment variables
# See .env.example for all options

# Create upload endpoint:
# POST /api/upload
# - Accept multipart/form-data
# - Upload to S3/Firebase/Cloudinary
# - Return image URL
```

### Step 7: Test Portfolio Operations (15 min)
```bash
# After login, test in browser:
1. Click "Portfolio" in sidebar
2. Click "+ Add Project"
3. Fill form and submit
4. Verify project appears in gallery
5. Click Edit - modify and save
6. Click Delete - confirm removal
```

---

## 🗂️ Key Files to Modify

| File | Task | Time |
|------|------|------|
| `app/api/auth/register/route.ts` | DB integration | 30 min |
| `app/api/auth/login/route.ts` | DB integration | 30 min |
| `app/api/portfolio/route.ts` | DB integration | 30 min |
| `app/api/upload/route.ts` | Image upload | 30 min |
| `app/api/profile/update/route.ts` | Profile updates | 20 min |

---

## 💡 Implementation Tips

### Use Prisma for Database Queries
```typescript
// Example: Create portfolio project
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId } = await verifyAuth(request);
  const data = await request.json();
  
  const project = await prisma.portfolioProject.create({
    data: {
      vendorId: userId,
      ...data
    }
  });
  
  return NextResponse.json({ project });
}

// Example: Get vendor projects
const projects = await prisma.portfolioProject.findMany({
  where: { vendorId: userId }
});
```

### Error Handling
```typescript
try {
  // Database operation
  const data = await fetch(...);
  
  if (!data.ok) {
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    );
  }
} catch (error) {
  console.error('Error:', error);
  return NextResponse.json(
    { error: 'Server error' },
    { status: 500 }
  );
}
```

### Verify Authentication
```typescript
import { verifyToken } from '@/lib/auth-utils';

export async function GET(request: Request) {
  const token = request.cookies.get('authToken')?.value;
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
  
  const userId = payload.userId;
  // Use userId in query
}
```

---

## 📚 Documentation References

- **Setup**: See `SETUP_GUIDE.md`
- **Database**: See `DATABASE_SCHEMA.md`
- **Development**: See `DEVELOPMENT_GUIDE.md`
- **Summary**: See `STRUCTURA_COMPLETE_SUMMARY.md`
- **Auth Utils**: See `lib/auth-utils.ts`
- **Types**: See `lib/types.ts`

---

## ✅ Verification Checklist

After each step, verify:

- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables set (`.env.local`)
- [ ] Database connection working
- [ ] Prisma migrations run
- [ ] Dev server starts (`npm run dev`)
- [ ] No TypeScript errors
- [ ] Can register new user
- [ ] Can login
- [ ] Can create portfolio project
- [ ] Can edit portfolio project
- [ ] Can delete portfolio project

---

## 🐛 Troubleshooting

### "Database connection failed"
```bash
# Check DATABASE_URL in .env.local
# Test connection:
psql $DATABASE_URL

# If error, verify:
# - PostgreSQL running (brew services start postgresql@15)
# - Database exists (createdb structura_db)
# - User permissions correct
```

### "Module not found" errors
```bash
# Reinstall dependencies
rm -rf node_modules
npm install

# Restart dev server
npm run dev
```

### "JWT token invalid"
```bash
# Check JWT_SECRET in .env.local
# Verify token generation in auth-utils.ts
# Restart dev server
```

### "Portfolio not showing"
```bash
# Check portfolio imports in page.tsx
# Verify sidebar link works
# Check console for errors
# Verify authentication works first
```

---

## 🎯 Priority Roadmap

### Phase 1: Core (Current - Next 2 weeks)
- ✅ Authentication (done)
- ⚠️ Database integration (API endpoints)
- ⚠️ Portfolio CRUD operations
- ⚠️ Image upload system

### Phase 2: Complete (Next 2-4 weeks)
- Customer dashboard
- Vendor requests system
- Quote management
- Real-time notifications

### Phase 3: Advanced (Next 4-8 weeks)
- Payment integration
- Reviews & ratings
- Analytics dashboard
- Mobile app

---

## 📞 Quick Reference

```bash
# Development
npm run dev              # Start dev server
npm run build           # Create production build
npm start               # Run production

# Database
npx prisma migrate dev  # Run migrations
npx prisma studio      # View database UI
npx prisma generate    # Generate client

# Testing
npm test                # Run tests
npm run lint            # Check code quality

# Deployment
npm run build           # Build for production
vercel deploy          # Deploy to Vercel
```

---

## 🎓 Learning Resources

- **Prisma Tutorial**: https://www.prisma.io/docs
- **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
- **JWT Guide**: https://jwt.io/introduction
- **Bcryptjs**: https://github.com/dcodeIO/bcrypt.js
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 🚀 Ready?

**Start with Step 1**: Setup environment variables

Then proceed through each step in order. Each step should take 5-30 minutes.

**Total estimated time**: 2-3 hours to get fully working

**Questions?** Check the documentation files or the code comments.

---

**Status**: ✅ Ready to implement
**Next Action**: Setup .env.local
**Estimated Time**: 2-3 hours
**Difficulty**: Intermediate

Good luck! You've got a solid foundation to build on. 🚀
