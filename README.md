# CyberWise web application

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/anvesh-trivedis-projects/v0-cyber-wise-web-application)


## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

The project is live at:

**[https://vercel.com/anvesh-trivedis-projects/v0-cyber-wise-web-application](https://vercel.com/anvesh-trivedis-projects/v0-cyber-wise-web-application)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Local Development

This project uses Next.js 14 (App Router) with PostgreSQL + Prisma. To run locally:

### 1. Install dependencies (Node 18+ recommended):

```bash
npm install
```

### 2. Set up your database

**Option A: Use Vercel Postgres (Recommended for deployment)**
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the `DATABASE_URL` from the `.env.local` tab
4. Create a `.env` file in your project root and paste the URL

**Option B: Use local PostgreSQL**
1. Install PostgreSQL locally
2. Create a database: `createdb cyberwise`
3. Copy `.env.example` to `.env`
4. Update `DATABASE_URL` in `.env` with your local credentials

**Option C: Use Supabase (Free tier)**
1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database → Connection string → URI
4. Copy to `.env` as `DATABASE_URL`

### 3. Run database migrations

```bash
npx prisma migrate dev --name init
```

This creates the User table in your database.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the dev server

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Useful Prisma commands

```bash
# View your database in Prisma Studio
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Create a new migration after schema changes
npx prisma migrate dev --name your_migration_name
```

## Authentication Feature

Full authentication system with PostgreSQL database storage.

- Pages:
  - `app/auth/sign-up/page.tsx` – Sign up with username, password, mobile, and parent's mobile
  - `app/auth/sign-in/page.tsx` – Sign in with username and password

- API routes (local server validation):
  - `POST /api/auth/signup`
    - Body: `{ username, password, mobile, parentMobile }`
    - Username: 3-30 chars, letters/numbers/underscores only
    - Password: 8-64 chars, must include uppercase, lowercase, number, and special character
    - Mobile numbers: 10-15 digits, optional +
    - Validates with zod; hashes password with `bcryptjs`; stores in PostgreSQL.
  - `POST /api/auth/signin`
    - Body: `{ username, password }`
    - Validates with zod; verifies password via `bcryptjs`.

**Database Schema:**
- User model with fields: `id`, `username` (unique), `passwordHash`, `mobile`, `parentMobile`, `createdAt`, `updatedAt`
- Passwords hashed with bcryptjs (10 rounds)
- Usernames stored in lowercase for case-insensitive matching

## Quick API Testing

With the dev server running:

```bash
# Sign up
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username":"alice_123",
    "password":"SecurePass@123",
    "mobile":"+911234567890",
    "parentMobile":"+911234567891"
  }'

# Sign in
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username":"alice_123",
    "password":"SecurePass@123"
  }'
```

