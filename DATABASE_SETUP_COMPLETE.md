# 🗄️ Database Setup - Complete Guide

## Issue: Profile/Login not working - Database not configured

---

## 🎯 Problem

Your `.env.local` has placeholder database credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/cyberwise"
```

This needs to be replaced with **real database credentials**.

---

## ✅ Solution: Setup Database

### **Option 1: Use Neon (Free Cloud Database) - RECOMMENDED**

#### **Step 1: Create Neon Account**
1. Go to: https://neon.tech
2. Sign up for free account
3. Create a new project named "cyberwise"

#### **Step 2: Get Connection String**
1. In Neon dashboard, click your project
2. Click "Connection Details"
3. Copy the connection string (looks like):
   ```
   postgresql://username:password@ep-xxx.neon.tech/cyberwise?sslmode=require
   ```

#### **Step 3: Update .env.local**
Replace the DATABASE_URL in `.env.local`:
```env
DATABASE_URL="postgresql://your-neon-connection-string-here"
```

#### **Step 4: Run Prisma Commands**
```bash
# Generate Prisma Client
npx prisma generate

# Create database tables
npx prisma db push

# Open Prisma Studio to view database
npx prisma studio
```

---

### **Option 2: Use Local PostgreSQL**

#### **Step 1: Install PostgreSQL**
- **Windows:** Download from https://www.postgresql.org/download/windows/
- **Mac:** `brew install postgresql`
- **Linux:** `sudo apt-get install postgresql`

#### **Step 2: Create Database**
```bash
# Start PostgreSQL service
# Windows: Services → PostgreSQL → Start
# Mac/Linux: brew services start postgresql

# Create database
psql -U postgres
CREATE DATABASE cyberwise;
\q
```

#### **Step 3: Update .env.local**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/cyberwise"
```
Replace `YOUR_PASSWORD` with your PostgreSQL password.

#### **Step 4: Run Prisma Commands**
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

### **Option 3: Use SQLite (Quick Test - No Install)**

#### **Step 1: Update schema.prisma**
Change datasource:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

#### **Step 2: Update .env.local**
```env
DATABASE_URL="file:./dev.db"
```

#### **Step 3: Run Prisma Commands**
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

---

## 🚀 After Database Setup

### **Step 1: Restart Server**
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### **Step 2: Create First User**
1. Go to: `http://localhost:3000`
2. Click "Sign Up"
3. Fill the form:
   - Username: `testuser`
   - Password: `Test@123`
   - Mobile: `1234567890`
   - Parent Mobile: `0987654321`
4. Click "Create Account"

### **Step 3: Sign In**
1. Click "Sign In" tab
2. Enter credentials
3. Click "Sign In"
4. You'll be redirected to `/home`

### **Step 4: Verify Profile**
1. Check top right corner
2. Should show "testuser" (not "Student")
3. Click profile → Should show dropdown
4. Click "Sign Out" → Should logout

---

## 🧪 Test Everything Works

### **Test 1: Sign Up**
```
1. Go to http://localhost:3000
2. Sign up with new username
3. Should see success message
4. Should be able to sign in
```

### **Test 2: Sign In**
```
1. Sign in with credentials
2. Should redirect to /home
3. Profile should show username
4. Console should show "✅ User found: [username]"
```

### **Test 3: Profile**
```
1. Click profile in top right
2. Should show dropdown menu
3. Should show your username
4. Should have Profile Settings option
5. Should have Sign Out option
```

### **Test 4: Logout**
```
1. Click profile → Sign Out
2. Should redirect to landing page
3. Profile should reset to "Student"
4. Should be able to sign in again
```

---

## 🔍 Verify Database Connection

### **Check 1: Prisma Studio**
```bash
npx prisma studio
```
- Opens at `http://localhost:5555`
- Should show User table
- Should show your created users

### **Check 2: Console Test**
Run in browser console:
```javascript
fetch('/api/auth/me')
  .then(r => r.json())
  .then(d => console.log('API Response:', d))
```

**Expected after login:**
```json
{
  "user": {
    "id": "...",
    "username": "testuser",
    "mobile": "...",
    "parentMobile": "..."
  }
}
```

---

## 📋 Complete Setup Checklist

- [ ] Database created (Neon/PostgreSQL/SQLite)
- [ ] DATABASE_URL updated in .env.local
- [ ] `npx prisma generate` run successfully
- [ ] `npx prisma db push` run successfully
- [ ] Server restarted
- [ ] Can access Prisma Studio
- [ ] User table exists in database
- [ ] Sign up works
- [ ] Sign in works
- [ ] Profile shows username
- [ ] Logout works

---

## 🐛 Troubleshooting

### **Error: "Can't reach database server"**
**Fix:** Check DATABASE_URL is correct and database is running

### **Error: "Table does not exist"**
**Fix:** Run `npx prisma db push`

### **Error: "Prisma Client not generated"**
**Fix:** Run `npx prisma generate`

### **Profile still shows "Student"**
**Fix:** 
1. Check database has users
2. Sign in through landing page
3. Check console for errors

### **Logout doesn't work**
**Fix:**
1. Check `/api/auth/logout` route exists
2. Check console for errors
3. Hard refresh (Ctrl+Shift+R)

---

## 💡 Quick Commands Reference

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open database viewer
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset

# View database in browser
npx prisma studio
```

---

## ✅ Success Criteria

Everything is working when:

1. ✅ `npx prisma studio` opens and shows User table
2. ✅ Can create account via Sign Up
3. ✅ Can sign in with credentials
4. ✅ Profile shows actual username
5. ✅ Profile dropdown opens
6. ✅ Can navigate to Profile Settings
7. ✅ Logout redirects to landing page
8. ✅ Can sign in again after logout

---

## 🎯 Recommended: Use Neon

**Why Neon?**
- ✅ Free tier available
- ✅ No local installation needed
- ✅ Cloud-based (accessible anywhere)
- ✅ Automatic backups
- ✅ Easy to use
- ✅ Production-ready

**Setup time:** 5 minutes

---

**Last Updated:** 2025-02-10 05:43 IST
**Status:** Awaiting database setup
**Next Step:** Choose Option 1, 2, or 3 above
