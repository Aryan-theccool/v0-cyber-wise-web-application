# Database Setup Guide

Your CyberWise app now uses **PostgreSQL + Prisma** for authentication storage.

## Quick Start (Choose One Option)

### Option 1: Vercel Postgres (Recommended - Free Tier)

**Best for:** Production deployment on Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Storage** tab
3. Click **Create Database** → **Postgres**
4. Copy the `DATABASE_URL` from the **`.env.local`** tab
5. Create a `.env` file in your project root:
   ```bash
   DATABASE_URL="your-vercel-postgres-url-here"
   ```
6. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### Option 2: Supabase (Free Tier with Extra Features)

**Best for:** Free PostgreSQL + built-in auth + storage

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings** → **Database** → **Connection string** → **URI**
4. Copy the connection string
5. Create `.env` file:
   ```bash
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   ```
6. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### Option 3: Local PostgreSQL

**Best for:** Local development without internet

1. Install PostgreSQL:
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **Mac**: `brew install postgresql@15`
   - **Linux**: `sudo apt install postgresql`

2. Start PostgreSQL service:
   - **Windows**: Starts automatically
   - **Mac**: `brew services start postgresql@15`
   - **Linux**: `sudo systemctl start postgresql`

3. Create database:
   ```bash
   createdb cyberwise
   ```

4. Create `.env` file:
   ```bash
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/cyberwise"
   ```

5. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### Option 4: Neon (Serverless Postgres - Free Tier)

**Best for:** Serverless, auto-scaling database

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Create `.env` file:
   ```bash
   DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/[dbname]?sslmode=require"
   ```
5. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

## After Setup

### 1. Verify your database connection

```bash
npx prisma db push
```

### 2. View your database in Prisma Studio

```bash
npx prisma studio
```

This opens a visual database browser at http://localhost:5555

### 3. Test the auth flow

1. Start dev server: `npm run dev`
2. Go to http://localhost:3000
3. Sign up with a test account
4. Check Prisma Studio to see the user created

## Common Issues

### "Can't reach database server"
- Check your `DATABASE_URL` is correct
- Ensure database service is running (for local PostgreSQL)
- Check firewall settings

### "Migration failed"
- Delete `prisma/migrations` folder
- Run `npx prisma migrate dev --name init` again

### "Prisma Client not generated"
```bash
npx prisma generate
```

## Database Schema

```prisma
model User {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  mobile       String
  parentMobile String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Useful Commands

```bash
# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Format schema file
npx prisma format
```

## Next Steps

- Add session management (JWT or next-auth)
- Add password reset functionality
- Add email verification
- Extend User model with profile fields
