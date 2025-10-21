# Database Setup Guide - Fix Login Network Error

## Problem
You're seeing a "Network error" when trying to log in because the database is not configured.

## Quick Fix (Choose One Option)

### Option 1: Use Vercel Postgres (Recommended - Free & Easy)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in

2. **Create Database**
   - Go to your project dashboard
   - Click "Storage" → "Create Database" → "Postgres"
   - Choose a name (e.g., "cyberwise-db")
   - Select region closest to you
   - Click "Create"

3. **Get Connection String**
   - In the database dashboard, go to ".env.local" tab
   - Copy the `DATABASE_URL` value

4. **Create .env File**
   - In the project root (`v0-cyber-wise-web-application`), create a file named `.env`
   - Add this line (replace with your actual URL):
   ```
   DATABASE_URL="your-vercel-postgres-url-here"
   GEMINI_API_KEY="AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw"
   ```

5. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Restart Server**
   ```bash
   npm run dev
   ```

---

### Option 2: Use Supabase (Free & Easy)

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up or log in

2. **Create Project**
   - Click "New Project"
   - Choose organization
   - Enter project name: "cyberwise"
   - Create a strong database password (save it!)
   - Select region
   - Click "Create new project"

3. **Get Connection String**
   - Go to Settings → Database
   - Scroll to "Connection string" → "URI"
   - Copy the connection string
   - Replace `[YOUR-PASSWORD]` with your database password

4. **Create .env File**
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
   GEMINI_API_KEY="AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw"
   ```

5. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Restart Server**
   ```bash
   npm run dev
   ```

---

### Option 3: Use Local PostgreSQL

1. **Install PostgreSQL**
   - Windows: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - During installation, remember your password

2. **Create Database**
   ```bash
   # Open Command Prompt or PowerShell
   psql -U postgres
   # Enter your password
   CREATE DATABASE cyberwise;
   \q
   ```

3. **Create .env File**
   ```
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/cyberwise"
   GEMINI_API_KEY="AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw"
   ```

4. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Restart Server**
   ```bash
   npm run dev
   ```

---

### Option 4: Use Neon (Free Serverless Postgres)

1. **Create Neon Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up with GitHub or email

2. **Create Project**
   - Click "Create Project"
   - Name: "cyberwise"
   - Select region
   - Click "Create Project"

3. **Get Connection String**
   - Copy the connection string shown
   - It looks like: `postgresql://[user]:[password]@[hostname]/[dbname]?sslmode=require`

4. **Create .env File**
   ```
   DATABASE_URL="your-neon-connection-string-here"
   GEMINI_API_KEY="AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw"
   ```

5. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

6. **Restart Server**
   ```bash
   npm run dev
   ```

---

## After Setup - Create Your First User

1. **Sign Up**
   - Go to `http://localhost:3000`
   - Click "Sign Up" tab
   - Fill in:
     - Username: `testuser`
     - Password: `Test@123`
     - Mobile: `1234567890`
     - Parent Mobile: `0987654321`
   - Click "Sign Up"

2. **Sign In**
   - Switch to "Sign In" tab
   - Enter username: `testuser`
   - Enter password: `Test@123`
   - Click "Sign In"

3. **Success!**
   - You should be redirected to `/home`
   - All features should now work

---

## Troubleshooting

### Error: "Database connection failed"
- **Check**: Is your `.env` file in the correct location? (`v0-cyber-wise-web-application/.env`)
- **Check**: Did you copy the DATABASE_URL correctly (no extra spaces)?
- **Check**: For cloud databases, is your internet connection working?
- **Check**: For local PostgreSQL, is the service running?

### Error: "Table does not exist"
- **Solution**: Run migrations
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```

### Error: "Invalid credentials"
- **Solution**: Make sure you've created a user first via Sign Up
- **Check**: Username and password are correct

### Server won't start
- **Solution**: Delete `node_modules` and reinstall
  ```bash
  rm -rf node_modules
  npm install
  ```

### Still having issues?
1. Check the terminal/console for error messages
2. Make sure you restarted the dev server after creating `.env`
3. Verify your DATABASE_URL format matches your chosen provider

---

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate

# View database in browser
npx prisma studio

# Start development server
npm run dev

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

---

## What's in the Database?

The database stores:
- **Users** - Username, hashed password, mobile numbers
- **Sessions** - Login sessions for authentication
- All data is encrypted and secure

---

## Need Help?

1. Check the error message in the browser console (F12)
2. Check the terminal where `npm run dev` is running
3. Verify your `.env` file exists and has the correct format
4. Make sure you ran `npx prisma migrate dev` after creating `.env`

---

**Once you complete any of the options above, the login network error will be fixed!**
