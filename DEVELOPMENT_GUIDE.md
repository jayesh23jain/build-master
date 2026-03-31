# 📖 Structura Development & Usage Guide

## ✨ What You Have

A **full-stack construction management platform** with:
- ✅ Secure authentication (JWT + Remember Me)
- ✅ Database schema (PostgreSQL/Firebase ready)
- ✅ Vendor portfolio system
- ✅ Role-based dashboards
- ✅ Profile management
- ✅ Real-time context management

---

## 🎯 Vendor Portfolio System

### Where It Lives
- **Component**: `components/vendor/VendorPortfolio.tsx`
- **Page**: Integrated into `/vendor-dashboard` with sidebar link
- **Navigation**: Click "Portfolio" in the vendor dashboard sidebar

### What Vendors Can Do

**View Portfolio**
- See all their projects in a grid
- View project images, budget, timeline
- See project status and details

**Add Project**
- Click "+ Add Project"
- Fill form with:
  - Title, Description, Category
  - Budget range, Timeline, Client, Location
  - Skills/Tags
- Submit to save

**Edit Project**
- Click "Edit" on any project card
- Modify any details
- Click "Update" to save

**Delete Project**
- Click "Delete" on project card
- Confirm deletion
- Project removed permanently

---

## 🔐 Authentication System

### User Registration
```
/auth/register → Fill form → Create account → See portfolio page
```

**Fields Required**:
- Email, Password, Confirm Password
- First Name, Last Name
- Role (Customer/Vendor)
- For vendors: Trade + License

### User Login
```
/auth/login → Enter credentials → Stay logged in (optional) → Dashboard
```

**Features**:
- Remember Me (30 days)
- Secure password hashing
- Session validation
- Auto-logout on expiration

### Profile Management
Each user has editable profile:
- **Basic**: Name, Email, Phone, Location
- **Vendor**: Trade, License, Bio, Experience, Rating

---

## 📊 Database Schema Overview

### Users (Core)
```
id | email | passwordHash | firstName | lastName | role | rememberMeToken
```

### Vendor Profile
```
userId | trade | license | phone | location | bio | experience | rating | reviews
```

### Portfolio Projects
```
vendorId | title | description | category | images[] | budget | timeline | status
client | location | tags[] | startDate | endDate | createdAt | updatedAt
```

### Customer Profile
```
userId | phone | location | company | address
```

### Customer Projects
```
customerId | title | address | phase | budget | timeline | status
```

### Vendor Requests
```
projectId | phase | title | budget | description | createdAt
```

### Quotes
```
requestId | vendorId | amount | description | timeline | status
```

---

## 🛠️ Working with the Code

### Authentication Hook
```typescript
import { useAuth } from '@/context/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, logout, error } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.firstName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### API Calls
```typescript
// Fetch portfolio projects
const res = await fetch('/api/portfolio', {
  credentials: 'include'
});

// Create portfolio project
const res = await fetch('/api/portfolio', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(projectData),
  credentials: 'include'
});

// Update project
const res = await fetch(`/api/portfolio/${projectId}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedData),
  credentials: 'include'
});

// Delete project
const res = await fetch(`/api/portfolio/${projectId}`, {
  method: 'DELETE',
  credentials: 'include'
});
```

### Type Safety
```typescript
import type { User, PortfolioProject, VendorProfile } from '@/lib/types';

const user: User = { ... };
const project: PortfolioProject = { ... };
```

---

## 🚀 Next Steps to Complete

### 1. **Implement API Endpoints** (HIGH PRIORITY)
Each endpoint needs database integration:

```typescript
// app/api/auth/register/route.ts
- Validate input
- Hash password
- Save user to database
- Create vendor/customer profile
- Return user object

// app/api/portfolio/route.ts
- Get all vendor projects from database
- Create new project in database
- Handle validation
```

**What to Do**:
1. Create database connection utility
2. Use Prisma or Firebase SDK
3. Replace mock logic with real DB queries

### 2. **Create Profile Pages**
- Editable vendor profile (`/vendor-dashboard/profile`)
- Editable customer profile
- Profile image upload
- Save changes to database

### 3. **Customer Dashboard**
- View vendor requests/quotes
- Post requests for work
- View vendor portfolios
- Accept/reject quotes
- Track projects

### 4. **Real-Time Updates** (Optional)
- WebSockets for live notifications
- Real-time project updates
- Quote notifications

### 5. **File Upload System**
- Portfolio images storage
- Profile image upload
- Use: AWS S3, Cloudinary, or Firebase Storage

---

## 📝 File Locations Reference

| Purpose | Location |
|---------|----------|
| Auth context | `context/AuthContext.tsx` |
| Types | `lib/types.ts` |
| Auth utilities | `lib/auth-utils.ts` |
| Vendor portfolio UI | `components/vendor/VendorPortfolio.tsx` |
| Vendor sidebar | `components/vendor/VendorSidebar.tsx` |
| Database schema | `prisma/schema.prisma` |
| Setup instructions | `SETUP_GUIDE.md` |

---

## 🔄 Data Flow Diagram

```
User Action
    ↓
React Component (VendorPortfolio.tsx)
    ↓
useAuth() / State Management
    ↓
API Call to /api/portfolio
    ↓
API Route Handler (route.ts)
    ↓
Database Query (Prisma)
    ↓
Database (PostgreSQL/Firebase)
    ↓
Return Response
    ↓
Update Component State
    ↓
Re-render UI
```

---

## 🎨 Styling Reference

All components use existing theme:
- **Dark Mode**: `#0d0f14` (background)
- **Cards**: `#111520` (slightly lighter)
- **Accent**: `#a855f7` (purple)
- **Text**: `#e2eef5` (light gray)
- **Secondary**: `#7a9aaa` (muted blue)

Fonts:
- **Headings**: Syne (brand font)
- **Labels**: JetBrains Mono (monospace)
- **Body**: DM Sans (readable)

---

## 🧪 Testing Endpoints

### Using curl:

```bash
# Register vendor
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vendor@test.com",
    "password": "TestPass123!",
    "firstName": "John",
    "lastName": "Doe",
    "role": "vendor",
    "trade": "Structural",
    "license": "GC-123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vendor@test.com",
    "password": "TestPass123!",
    "rememberMe": true
  }' \
  -c cookies.txt

# Get projects (with cookies)
curl -X GET http://localhost:3000/api/portfolio \
  -b cookies.txt

# Create project
curl -X POST http://localhost:3000/api/portfolio \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Office Building",
    "description": "Modern office complex",
    "category": "commercial",
    "budget": "50L - 1Cr",
    "timeline": "12 months",
    "client": "ABC Corp",
    "location": "Mumbai",
    "tags": ["Structural", "RCC"]
  }' \
  -b cookies.txt
```

---

## 🔒 Security Reminders

**Always Remember**:
- ✅ Never commit `.env.local` to git
- ✅ Change JWT_SECRET in production
- ✅ Use HTTPS in production
- ✅ Validate all inputs server-side
- ✅ Never log sensitive data
- ✅ Test auth thoroughly
- ✅ Use secure password requirements

---

## 📊 Current Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| Auth UI (Login/Register) | ✅ | Already exists |
| Auth Context | ✅ | Ready to use |
| Auth utilities | ✅ | Bcryptjs + JWT |
| Portfolio Component | ✅ | Full CRUD UI |
| Sidebar Link | ✅ | Integrated |
| API Routes | ⚠️ | Need DB integration |
| Database Schema | ✅ | Prisma schema ready |
| Types | ✅ | TypeScript interfaces |
| Profile Pages | ⚠️ | UI ready, needs BE |
| Customer Dashboard | ⚠️ | Needs implementation |

---

## 🚦 Quick Start Checklist

- [ ] Copy DATABASE_SCHEMA.md info
- [ ] Setup `.env.local` with secrets
- [ ] Install PostgreSQL
- [ ] Create database
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Update API routes to use database
- [ ] Test registration/login flow
- [ ] Verify portfolio CRUD works
- [ ] Setup file upload for images
- [ ] Test Remember Me functionality
- [ ] Deploy to production

---

## 💡 Pro Tips

1. **Type Safety**: Always use types from `lib/types.ts`
2. **Error Handling**: Use AuthContext's error state
3. **Loading States**: Components handle isLoading automatically
4. **Reusable Code**: Extract components and hooks
5. **API Docs**: Document all endpoints clearly
6. **Testing**: Test auth flows thoroughly

---

## 📞 Need Help?

Check these files for reference:
- `SETUP_GUIDE.md` - Environment & database setup
- `DATABASE_SCHEMA.md` - Detailed schema info
- `lib/auth-utils.ts` - Authentication functions
- `context/AuthContext.tsx` - State management

---

**Platform**: Structura - Construction Management
**Version**: 1.0.0
**Status**: ✅ Ready for Development
**Last Updated**: April 1, 2026
