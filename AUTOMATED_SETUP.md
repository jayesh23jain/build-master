# 🚀 Automated Setup - Quick Start

## Prerequisites

**Windows Only** - These scripts are for Windows PowerShell

You need:
- Windows PowerShell (built-in)
- Administrator access
- PostgreSQL 15 (or later)

---

## Step 1: Install PostgreSQL (If Not Already Installed)

1. Download PostgreSQL 15 from: https://www.postgresql.org/download/windows/
2. Run the installer
3. **Remember the password you set for the 'postgres' user** (you'll need it!)
4. Keep default settings for port (5432)

---

## Step 2: Run Setup Script

### Open PowerShell as Administrator
```
1. Search for "PowerShell" in Windows
2. Right-click "Windows PowerShell"
3. Click "Run as Administrator"
```

### Navigate to Project
```powershell
cd "D:\React\try\build-master"
```

### Run Setup Script
```powershell
.\setup-postgres.ps1
```

---

## Step 3: When Prompted

The script will ask:
```
Enter password for 'postgres' user: [paste the password you set during PostgreSQL installation]
```

**IMPORTANT**: Don't type, paste the password:
- Right-click in PowerShell → Paste
- Or use Ctrl+Shift+V

---

## Step 4: Wait for Completion

The script will:
✅ Create database `structura_db`
✅ Create user `structura_user`
✅ Setup `.env.local` with connection details
✅ Run Prisma migrations
✅ Create all database tables

**Time**: 1-2 minutes

---

## Step 5: Verify Setup (Optional)

```powershell
.\verify-setup.ps1
```

Should show all ✓ checks passing

---

## Step 6: Start Your App

```powershell
npm run dev
```

Opens at: http://localhost:3000

---

## Step 7: Test Registration

1. Go to `/auth/register`
2. Register as vendor:
   - Email: vendor@test.com
   - Password: TestPass123!
   - First Name: John
   - Last Name: Doe
   - Role: Vendor
   - Trade: Structural Framing
   - License: GC-2024-00881

3. Should see: ✅ "Registration successful! Please login."

---

## Step 8: Test Login

1. Go to `/auth/login`
2. Login with:
   - Email: vendor@test.com
   - Password: TestPass123!

3. Should redirect to vendor dashboard ✅

---

## Test Duplicate Email Prevention

1. Try registering same email again
2. Should get: ❌ "Email already registered. Please login or use a different email."

✅ Working correctly!

---

## If Something Goes Wrong

### Error: "PostgreSQL not found"
- Install PostgreSQL 15 from https://www.postgresql.org/download/windows/
- Run script again

### Error: "Password incorrect"
- Make sure you're pasting the correct password you set during PostgreSQL installation
- Try again

### Error: "Database creation failed"
- PostgreSQL might not be running
- Open Services (services.msc) and make sure "PostgreSQL" service is running
- Try running the script again

### Error: "Prisma migration failed"
- Run manually:
  ```powershell
  npx prisma generate
  npx prisma migrate dev --name init
  ```

---

## Useful Commands After Setup

```powershell
# View database in UI
npm run prisma:studio

# Reset database (deletes all data)
npm run db:reset

# View migrations
npx prisma migrate status
```

---

## Database Connection Details

After setup:
- **Database**: structura_db
- **User**: structura_user
- **Password**: Structura@2024!secure
- **Host**: localhost
- **Port**: 5432

---

## Troubleshooting Checklist

- [ ] PostgreSQL 15 installed
- [ ] PostgreSQL service running (Services.msc)
- [ ] Running PowerShell as Administrator
- [ ] Correct directory: `d:\React\try\build-master`
- [ ] Setup script completed without errors
- [ ] .env.local created automatically
- [ ] Can start app: `npm run dev`

---

## Next Steps

✅ Setup complete
✅ Database running
✅ Auth system working
▶️ Test registration & login
▶️ Build customer dashboard
▶️ Add portfolio functionality

---

**Need help?** Contact support with error messages shown in PowerShell

**Ready to start?** Run the setup script now! 🚀
