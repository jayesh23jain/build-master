# 📋 Scripts Summary - What To Run

## Quick Command Reference

```powershell
# FIRST TIME SETUP
.\setup-postgres.ps1              # Installs database + everything
.\verify-setup.ps1                # Checks if setup worked
npm run dev                        # Start the app

# AFTER SETUP (Regular Use)
npm run dev                        # Start development server
npm run build                      # Build for production
npm run start                      # Run production build
npm run lint                       # Check code quality

# DATABASE MANAGEMENT
npm run prisma:generate            # Generate Prisma client
npm run prisma:migrate             # Run database migrations
npm run prisma:studio              # Open database UI
npm run db:reset                   # Reset database (DELETE DATA!)
```

---

## What Each Script Does

### **Setup Scripts** (Run Once)

#### `.\setup-postgres.ps1` - MAIN SETUP
- ✅ Checks PostgreSQL installation
- ✅ Creates database `structura_db`
- ✅ Creates user `structura_user`
- ✅ Generates `.env.local` file
- ✅ Runs Prisma migrations
- ✅ Creates all database tables

**When to run**: First time only, after installing PostgreSQL

**How long**: 1-2 minutes

**Command**:
```powershell
.\setup-postgres.ps1
```

---

#### `.\verify-setup.ps1` - VERIFY SETUP
- ✅ Checks PostgreSQL installed
- ✅ Checks .env.local exists
- ✅ Checks dependencies installed
- ✅ Checks Prisma ready

**When to run**: After setup to verify everything works

**How long**: 30 seconds

**Command**:
```powershell
.\verify-setup.ps1
```

---

### **Development Scripts** (Regular Use)

#### `npm run dev` - START DEVELOPMENT
- Starts Next.js dev server
- Opens auto-reload
- Available at http://localhost:3000

**Command**:
```powershell
npm run dev
```

---

#### `npm run prisma:generate` - GENERATE PRISMA
- Regenerates Prisma client
- Use if schema changes

**Command**:
```powershell
npm run prisma:generate
```

---

#### `npm run prisma:migrate` - RUN MIGRATIONS
- Applies database changes
- Use for schema updates

**Command**:
```powershell
npm run prisma:migrate
```

---

#### `npm run prisma:studio` - DATABASE UI
- Opens Prisma Studio
- Visual database management
- View/edit data easily

**Command**:
```powershell
npm run prisma:studio
```

---

#### `npm run db:reset` - RESET DATABASE
- ⚠️ DELETES ALL DATA
- Fresh start
- Reruns migrations

**Command**:
```powershell
npm run db:reset
```

⚠️ **WARNING**: Only use if you want to delete everything

---

## Setup Timeline

### **Day 1 - Initial Setup**
```
1. Install PostgreSQL
2. Run: .\setup-postgres.ps1        ← ONCE ONLY
3. Run: .\verify-setup.ps1          ← Check it worked
4. Run: npm run dev                 ← Start app
5. Test registration/login
```

### **Day 2+ - Regular Development**
```
1. Run: npm run dev                 ← Start app
2. Make code changes
3. App auto-reloads
4. Test features
```

---

## Common Tasks

### **First Time Setup**
```powershell
.\setup-postgres.ps1
.\verify-setup.ps1
npm run dev
```

### **Start Working**
```powershell
npm run dev
```

### **View Database**
```powershell
npm run prisma:studio
```

### **Clean Everything & Restart**
```powershell
npm run db:reset
npm run dev
```

### **Update Database Schema**
```powershell
npm run prisma:generate
npm run prisma:migrate
```

---

## Scripts Made Available

After setup, you can use these npm commands:

| Command | What It Does | When To Use |
|---------|------------|-----------|
| `npm run dev` | Start dev server | Always (daily) |
| `npm run build` | Build for production | Before deployment |
| `npm run start` | Run production build | On server |
| `npm run lint` | Check code quality | Before commit |
| `npm run prisma:generate` | Generate Prisma client | Schema changes |
| `npm run prisma:migrate` | Run migrations | After schema changes |
| `npm run prisma:studio` | Open database UI | Debug database |
| `npm run db:reset` | Delete & reset database | Fresh start |

---

## If You Need Help

1. **Can't find PostgreSQL?**
   - Download: https://www.postgresql.org/download/windows/
   - Install and try again

2. **Setup script error?**
   - Open as Administrator (right-click PowerShell)
   - Make sure in correct directory

3. **Database issues?**
   - Run: `npm run prisma:studio`
   - Check data there

4. **Want to restart?**
   - Run: `npm run db:reset`
   - Everything deleted, fresh start

---

## The Easiest Way

```powershell
# Copy & paste these commands one at a time:

# 1. Navigate to project
cd "D:\React\try\build-master"

# 2. Run setup (ONE TIME)
.\setup-postgres.ps1

# 3. Start app
npm run dev

# 4. Go to http://localhost:3000
# 5. Register a new account
# 6. Try to register same email (should fail)
# 7. Login with your account
```

---

## Your Setup is:

✅ Fully automated
✅ One-time only (setup-postgres.ps1)
✅ Takes 2 minutes
✅ Everything ready after

**Ready?** Open PowerShell admin and run the setup script! 🚀
