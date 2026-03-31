// Database Schema for Structura - Construction Management Platform

// ============================================================================
// DATABASE SETUP INSTRUCTIONS
// ============================================================================

/*
OPTION 1: POSTGRESQL (RECOMMENDED FOR PRODUCTION)
================================================

1. Install dependencies:
   npm install @prisma/client
   npm install -D prisma

2. Create .env.local file:
   DATABASE_URL="postgresql://username:password@localhost:5432/structura_db"
   JWT_SECRET="your_32_char_minimum_secret_key_here"
   NEXT_PUBLIC_API_URL="http://localhost:3000"

3. Initialize Prisma:
   npx prisma init

4. Copy the schema below into prisma/schema.prisma

5. Run migrations:
   npx prisma migrate dev --name init

6. Generate Prisma Client:
   npx prisma generate

7. View database:
   npx prisma studio


OPTION 2: FIREBASE/FIRESTORE (QUICK START)
===========================================

1. Install Firebase packages:
   npm install firebase firebase-admin

2. Create .env.local with Firebase config:
   NEXT_PUBLIC_FIREBASE_API_KEY="your_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   FIREBASE_ADMIN_SDK_KEY="your_admin_key_json"

3. Use Firebase for user management and Firestore for data


OPTION 3: SQLITE (DEVELOPMENT ONLY)
===================================

1. Install dependencies:
   npm install @prisma/client
   npm install -D prisma

2. Create .env.local:
   DATABASE_URL="file:./dev.db"

3. Initialize and migrate as above
*/

// ============================================================================
// PRISMA SCHEMA (prisma/schema.prisma)
// ============================================================================

/*
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============== USERS ==============

model User {
  id            String     @id @default(cuid())
  email         String     @unique
  passwordHash  String
  firstName     String
  lastName      String
  profileImage  String?
  role          String     // "customer" or "vendor"
  
  // Remember Me
  rememberMeToken String?
  rememberMeExpiry DateTime?
  
  // Timestamps
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  customerProfile   CustomerProfile?
  vendorProfile     VendorProfile?
  
  @@map("users")
}

// ============== CUSTOMER PROFILE ==============

model CustomerProfile {
  id            String     @id @default(cuid())
  userId        String     @unique
  phone         String?
  location      String?
  company       String?
  address       String?
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  projects      CustomerProject[]
  
  @@map("customer_profiles")
}

// ============== VENDOR PROFILE ==============

model VendorProfile {
  id            String     @id @default(cuid())
  userId        String     @unique
  trade         String     // "Structural Framing", "MEP", etc.
  license       String     @unique
  phone         String?
  location      String?
  bio           String?
  experience    String?    // e.g., "15 years"
  
  // Ratings
  rating        Float      @default(0)
  reviews       Int        @default(0)
  
  // Portfolio
  portfolioProjects  PortfolioProject[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  quotes        Quote[]
  
  @@map("vendor_profiles")
}

// ============== PORTFOLIO PROJECTS ==============

model PortfolioProject {
  id            String     @id @default(cuid())
  vendorId      String
  title         String
  description   String
  images        String[]   // Array of image URLs/paths
  category      String     // "residential", "commercial", etc.
  budget        String     // e.g., "50L - 1Cr"
  timeline      String     // e.g., "6 months"
  status        String     // "completed", "in-progress", "planned"
  
  // Details
  client        String?
  location      String?
  tags          String[]   // Skills/technologies
  
  // Dates
  startDate     DateTime?
  endDate       DateTime?
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  vendor        VendorProfile @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  @@map("portfolio_projects")
}

// ============== CUSTOMER PROJECTS ==============

model CustomerProject {
  id            String     @id @default(cuid())
  customerId    String
  title         String
  description   String?
  address       String?
  
  // Project Details
  phase         String     // "Planning", "Foundation", etc.
  budget        String?
  timeline      String?
  status        String     // "planning", "active", "completed"
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  customer      CustomerProfile @relation(fields: [customerId], references: [id], onDelete: Cascade)
  requests      VendorRequest[]
  
  @@map("customer_projects")
}

// ============== VENDOR REQUESTS ==============

model VendorRequest {
  id            String     @id @default(cuid())
  projectId     String
  phase         String     // Project phase
  title         String
  description   String?
  budget        String?    // Budget range
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  project       CustomerProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
  quotes        Quote[]
  
  @@map("vendor_requests")
}

// ============== QUOTES ==============

model Quote {
  id            String     @id @default(cuid())
  requestId     String
  vendorId      String
  
  amount        String
  description   String?
  timeline      String?
  status        String     // "pending", "accepted", "rejected"
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  // Relations
  request       VendorRequest @relation(fields: [requestId], references: [id], onDelete: Cascade)
  vendor        VendorProfile @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  @@unique([requestId, vendorId])
  @@map("quotes")
}
*/

export default "See comments above for database schema and setup instructions";
