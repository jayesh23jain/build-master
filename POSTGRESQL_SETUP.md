# PostgreSQL Setup for Structura

## Step 1: Create .env.local

Create a file `.env.local` in the root directory:

```env
# Database URL
DATABASE_URL="postgresql://structura_user:your_secure_password@localhost:5432/structura_db"

# Authentication
JWT_SECRET="change_this_to_a_random_minimum_32_character_secret_key_12345678"
SESSION_SECRET="another_random_minimum_32_character_session_secret_key_abcdefgh"

# App Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"
NODE_ENV="development"
REMEMBER_ME_DURATION_DAYS="30"
```

## Step 2: Create PostgreSQL Database

### On Windows (if using PostgreSQL installed):

```powershell
# Open Command Prompt as Administrator
psql -U postgres

# Inside psql:
CREATE DATABASE structura_db;
CREATE USER structura_user WITH PASSWORD 'your_secure_password';
ALTER ROLE structura_user SET client_encoding TO 'utf8';
ALTER ROLE structura_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE structura_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE structura_db TO structura_user;

# Exit psql
\q
```

### On macOS:

```bash
# Install PostgreSQL if not already installed
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database and user
createdb structura_db

psql structura_db
# Inside psql, run the same SQL commands as above
```

### On Ubuntu/Linux:

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql

# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE structura_db;
CREATE USER structura_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE structura_db TO structura_user;

\q
```

## Step 3: Verify Connection

```bash
# Test connection
psql postgresql://structura_user:your_secure_password@localhost:5432/structura_db

# Should connect without errors
\q
```

## Step 4: Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# This will:
# 1. Create all database tables
# 2. Generate Prisma Client
# 3. Show success message
```

## Step 5: View Database (Optional)

```bash
# Open Prisma Studio UI
npx prisma studio

# Opens at http://localhost:5555
# You can view and manage data here
```

## Step 6: Start Dev Server

```bash
npm run dev

# Open http://localhost:3000
```

## Testing the Auth System

1. Go to `/auth/register`
2. Register as a vendor:
   - Email: vendor@test.com
   - Password: TestPass123!
   - Confirm Password: TestPass123!
   - First Name: John
   - Last Name: Doe
   - Role: Vendor
   - Trade: Structural Framing
   - License: GC-2024-00881

3. You should see: "Registration successful! Please login."

4. Click login
5. Enter same email and password
6. Should be redirected to vendor dashboard

## Troubleshooting

### "Database connection failed"
- Check DATABASE_URL format in .env.local
- Verify PostgreSQL is running
- Verify database and user exist

### "Relation does not exist"
- Run migrations again: `npx prisma migrate dev`
- Check for migration errors

### "Port 5432 already in use"
- PostgreSQL is already running
- Or another service is using that port

### "Role structura_user does not exist"
- Create user in PostgreSQL as shown above
- Make sure password is correct in .env.local

---

Once setup is complete, your auth system will:

✅ Allow users to register (both customer & vendor)
✅ Validate email isn't already registered
✅ Hash passwords before storing in database
✅ Allow users to login with email & password
✅ Show error if password is wrong
✅ Show error if email not registered (tell to register first)
✅ Support Remember Me (30 days)
✅ Store everything in real PostgreSQL database

---

**Next**: After setup, test the authentication flow!
