# Signup Error Troubleshooting Guide

## Common Signup Errors & Solutions

### Error: "Database connection failed"

**Cause:** No database configured or database is not accessible

**Solution:**
1. Create `.env` file in the project root with:
   ```env
   DATABASE_URL="your-database-url-here"
   GEMINI_API_KEY="AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw"
   ```

2. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

3. Restart server:
   ```bash
   npm run dev
   ```

**Quick Fix:** Run `.\setup-database.ps1` for automated setup

---

### Error: "Username already exists"

**Cause:** The username you're trying to use is already taken

**Solution:**
- Try a different username
- Or reset the database:
  ```bash
  npx prisma migrate reset
  ```

---

### Error: "Validation failed"

**Cause:** Input doesn't meet requirements

**Requirements:**
- ✅ Username: At least 3 characters
- ✅ Password: At least 6 characters
- ✅ Mobile: At least 10 digits
- ✅ Parent Mobile: At least 10 digits

**Solution:**
- Check all fields meet the requirements
- Remove any spaces from mobile numbers
- Make sure password is strong enough

---

### Error: "Table does not exist"

**Cause:** Database migrations haven't been run

**Solution:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### Error: "Failed to create user"

**Cause:** Database error or constraint violation

**Solution:**
1. Check database is running
2. Verify `.env` file has correct DATABASE_URL
3. Run migrations:
   ```bash
   npx prisma migrate reset
   npx prisma migrate dev --name init
   ```

---

### Error: Network error / Request timeout

**Cause:** Database is sleeping (common with free tier databases) or connection issue

**Solution:**
1. Wait a few seconds and try again
2. For Vercel/Neon databases: First request may take 10-15 seconds
3. Check your internet connection
4. Verify DATABASE_URL in `.env` is correct

---

## Step-by-Step Signup Process

### 1. Ensure Database is Set Up

**Check if `.env` exists:**
```powershell
Get-Content .env
```

**Should show:**
```
DATABASE_URL="postgresql://..."
GEMINI_API_KEY="..."
```

**If not, create it:**
```powershell
.\setup-database.ps1
```

### 2. Run Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Start Server

```bash
npm run dev
```

### 4. Create Account

Go to http://localhost:3000 and fill in:
- **Username:** testuser (3+ characters)
- **Password:** Test@123 (6+ characters)
- **Mobile:** 1234567890 (10+ digits)
- **Parent Mobile:** 0987654321 (10+ digits)

### 5. Success!

You should see: "Account created successfully! You can now sign in."

---

## Debugging Steps

### 1. Check Browser Console

Press F12 → Console tab → Look for error messages

### 2. Check Server Terminal

Look at the terminal where `npm run dev` is running for error logs

### 3. Test Database Connection

```bash
npx prisma db pull
```

Should connect without errors

### 4. View Database

```bash
npx prisma studio
```

Opens browser to view database tables

### 5. Check Prisma Client

```bash
npx prisma generate
```

Should generate without errors

---

## Common Issues

### Issue: "Cannot find module '@prisma/client'"

**Solution:**
```bash
npm install
npx prisma generate
```

### Issue: "Environment variable not found: DATABASE_URL"

**Solution:**
1. Create `.env` file in project root
2. Add DATABASE_URL
3. Restart server

### Issue: "SSL connection error"

**Solution:**
Add `?sslmode=require` to your DATABASE_URL:
```
DATABASE_URL="postgresql://...?sslmode=require"
```

### Issue: "Connection timeout"

**Solution:**
- For cloud databases: Wait 10-15 seconds for cold start
- Check internet connection
- Verify database is not paused/sleeping

---

## Database Provider Specific Issues

### Vercel Postgres

**Issue:** "Database not found"
- **Solution:** Make sure you created the database in Vercel dashboard
- Copy the exact DATABASE_URL from .env.local tab

### Supabase

**Issue:** "Password authentication failed"
- **Solution:** Replace `[YOUR-PASSWORD]` in connection string with actual password
- Make sure password has no special characters that need escaping

### Neon

**Issue:** "SSL required"
- **Solution:** Ensure `?sslmode=require` is at the end of DATABASE_URL

### Local PostgreSQL

**Issue:** "Connection refused"
- **Solution:** 
  1. Check PostgreSQL service is running
  2. Verify port 5432 is not blocked
  3. Check username/password are correct

---

## Testing Signup

### Test Case 1: Valid Signup
```
Username: testuser1
Password: Test@123
Mobile: 1234567890
Parent Mobile: 0987654321
Expected: Success message
```

### Test Case 2: Duplicate Username
```
Username: testuser1 (same as above)
Password: Test@456
Mobile: 9876543210
Parent Mobile: 1234567890
Expected: "Username already exists"
```

### Test Case 3: Short Username
```
Username: ab (too short)
Password: Test@123
Mobile: 1234567890
Parent Mobile: 0987654321
Expected: "Username must be at least 3 characters"
```

### Test Case 4: Short Password
```
Username: testuser2
Password: 12345 (too short)
Mobile: 1234567890
Parent Mobile: 0987654321
Expected: "Password must be at least 6 characters"
```

---

## Quick Fixes

### Reset Everything
```bash
# Delete database and start fresh
npx prisma migrate reset

# Regenerate client
npx prisma generate

# Restart server
npm run dev
```

### Check Database Status
```bash
# Test connection
npx prisma db pull

# View in browser
npx prisma studio
```

### Reinstall Dependencies
```bash
# If modules are corrupted
rm -rf node_modules
npm install
npx prisma generate
```

---

## Still Having Issues?

1. **Check the exact error message** in browser console (F12)
2. **Check server logs** in the terminal
3. **Verify `.env` file** exists and has correct DATABASE_URL
4. **Run migrations** again: `npx prisma migrate dev`
5. **Try a different database provider** (Vercel Postgres is easiest)

---

## Need Help?

See these files:
- `DATABASE_SETUP_GUIDE.md` - Database setup instructions
- `LOGIN_FIX_README.md` - Login troubleshooting
- `setup-database.ps1` - Automated setup script

---

**Most Common Solution:** 
Run the setup script and follow the prompts:
```powershell
.\setup-database.ps1
```
