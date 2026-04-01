# 🎯 Setup Instructions - Follow These Steps

## What You Have
✅ Complete auth system (register, login, password hashing)
✅ PostgreSQL integration ready
✅ Automated setup scripts
⚠️ Database NOT YET CREATED (that's what we'll fix now)

---

## Why Login Works Without Registration
Currently:
- ❌ PostgreSQL not running
- ❌ Database doesn't exist
- ❌ Prisma can't verify users in database
- ✅ Frontend still makes API calls (but they fail silently)

**After setup**: Only registered users can login ✅

---

## Complete Setup (5 minutes)

### **IMPORTANT: Prerequisites**

**Do you have PostgreSQL installed?**

Check:
1. Click Windows Start
2. Search "PostgreSQL"
3. Do you see PostgreSQL folder or pgAdmin?

**If NO**: 
- Download from: https://www.postgresql.org/download/windows/
- Install it (remember the 'postgres' password)
- Come back here

**If YES**: 
- Proceed with setup below ↓

---

## Setup (Automated Scripts)

### **Step 1: Open PowerShell as Administrator**

```
Windows Start → Search "PowerShell"
→ Right-click "Windows PowerShell" 
→ "Run as Administrator"
```

### **Step 2: Navigate to Project**

```powershell
cd "D:\React\try\build-master"
```

### **Step 3: Run Setup Script**

```powershell
.\setup-postgres.ps1
```

### **Step 4: Enter Password When Asked**

```
Enter password for 'postgres' user: [paste your PostgreSQL password]
```

**Tip**: Right-click PowerShell → Paste (or Ctrl+Shift+V)

### **Step 5: Wait for Completion**

Script will:
✓ Check PostgreSQL
✓ Create database
✓ Create user
✓ Setup .env.local
✓ Run migrations

**Time**: 2 minutes

### **Step 6: See Green ✓ Success Messages**

Should end with:
```
✓ Setup Complete!

Database Details:
  Database: structura_db
  User: structura_user
```

---

## Verify Setup

```powershell
.\verify-setup.ps1
```

All items should show ✓

---

## Start Your App

```powershell
npm run dev
```

Opens at: http://localhost:3000

---

## Test Everything Works

### **Test 1: Register New User**

1. Open http://localhost:3000/auth/register
2. Fill form:
   ```
   Email: vendor@test.com
   Password: TestPass123!
   Confirm Password: TestPass123!
   First Name: John
   Last Name: Doe
   Role: Vendor
   Trade: Structural Framing
   License: GC-2024-00881
   ```
3. Click Register
4. Should see: ✅ "Registration successful! Please login."

### **Test 2: Try Duplicate Email**

1. Try registering same email again
2. Should get: ❌ "Email already registered. Please login or use a different email."

✅ **Duplicate email prevention working!**

### **Test 3: Login**

1. Click Login
2. Enter:
   ```
   Email: vendor@test.com
   Password: TestPass123!
   ```
3. Click Login
4. Should redirect to vendor dashboard ✅

### **Test 4: Wrong Password**

1. Try same email but wrong password: `WrongPass123!`
2. Should get: ❌ "Incorrect password. Please try again."

✅ **Password verification working!**

### **Test 5: Email Not Registered**

1. Try logging in with: `newuser@test.com`
2. Should get: ❌ "Email not registered. Please register first."

✅ **Registration requirement working!**

---

## If It Doesn't Work

### **Issue: PowerShell won't run script**

Error: "File execution disabled"

**Solution**:
```powershell
# Run this once:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then try setup script again:
.\setup-postgres.ps1
```

### **Issue: PostgreSQL not found**

Error: "PostgreSQL not found!"

**Solution**:
- Download PostgreSQL from https://www.postgresql.org/download/windows/
- Install it
- Run script again

### **Issue: Wrong password error**

**Solution**:
- During installation, PostgreSQL asked for 'postgres' password
- Enter THAT password (not your Windows password)
- If forgotten, reinstall PostgreSQL

### **Issue: Database creation failed**

**Solution**:
1. Open Services (type `services.msc` in Windows Start)
2. Find "PostgreSQL" service
3. Right-click → "Start" (if not running)
4. Run script again

### **Issue: Migration failed**

**Solution**:
```powershell
# Run manually:
npx prisma generate
npx prisma migrate dev --name init
```

---

## After Setup Works

✅ **Database is running**: structura_db
✅ **Username saved**: structura_user's password in database
✅ **Password hashed**: Stored securely, never plain text
✅ **Email verified**: Prevent duplicates automatically
✅ **Auth working**: Register, login, remember me

---

## Your Next Features to Build

After confirming everything works:
1. Build customer dashboard
2. Add vendor request system
3. Add quote functionality
4. Build portfolio (already UI done)
5. Add real-time notifications

---

## Summary

| Step | Command | Time |
|------|---------|------|
| 1 | Open PowerShell as Admin | 30 sec |
| 2 | `cd "D:\React\try\build-master"` | 10 sec |
| 3 | `.\setup-postgres.ps1` | 2 min |
| 4 | Test registration | 2 min |
| 5 | Test login | 1 min |
| **Total** | | **~5-6 minutes** |

---

## ✅ Checklist

- [ ] PowerShell open as Administrator
- [ ] In correct folder: D:\React\try\build-master
- [ ] Run setup script: `.\setup-postgres.ps1`
- [ ] PostgreSQL password entered correctly
- [ ] Script completed with green ✓
- [ ] Can register new vendor
- [ ] Can login with same credentials
- [ ] Duplicate email prevented ✓
- [ ] Wrong password prevented ✓

---

## Ready? Start Now!

```powershell
# 1. Open PowerShell admin
# 2. cd "D:\React\try\build-master"
# 3. .\setup-postgres.ps1
# 4. npm run dev
```

---

**Status**: ✅ Ready to Setup
**Time Needed**: 5-6 minutes
**Difficulty**: Easy (Automated)

Let's go! 🚀
