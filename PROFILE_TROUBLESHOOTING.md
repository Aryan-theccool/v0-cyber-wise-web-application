# 🔧 Profile Username Troubleshooting Guide

## Issue: Profile shows "Student" instead of database username

---

## 🔍 Step-by-Step Debugging

### **Step 1: Check Browser Console**

1. **Open DevTools:** Press `F12`
2. **Go to Console tab**
3. **Refresh the page**
4. **Look for these logs:**

```
🔍 Fetching user data from /api/auth/me...
📡 API Response status: [STATUS CODE]
📦 API Response data: [DATA]
```

**What to look for:**

#### **Scenario A: User is logged in** ✅
```
📡 API Response status: 200
📦 API Response data: { user: { username: "john123", ... } }
✅ User found: john123
```
**Result:** Profile should show "john123"

#### **Scenario B: User is NOT logged in** ❌
```
📡 API Response status: 401
📦 API Response data: { error: "Not authenticated" }
⚠️ No user in response, using default 'Student'
```
**Result:** Profile shows "Student"
**Fix:** You need to login first!

#### **Scenario C: API Error** ❌
```
❌ Error fetching user: [ERROR MESSAGE]
```
**Result:** Profile shows "Student"
**Fix:** Check API route and database connection

---

## 🔑 Step 2: Check if You're Logged In

### **Test 1: Check Session Cookie**
1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Cookies** → `http://localhost:3000`
4. Look for cookie named: **`session`**

**Expected:**
- ✅ Cookie exists with a long value → You're logged in
- ❌ No cookie or empty → You're NOT logged in

### **Test 2: Check API Manually**
Open browser console and run:
```javascript
fetch('/api/auth/me')
  .then(r => r.json())
  .then(d => console.log('User data:', d))
```

**Expected responses:**

**If logged in:**
```json
{
  "user": {
    "id": "...",
    "username": "your-username",
    "mobile": "...",
    "parentMobile": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**If NOT logged in:**
```json
{
  "error": "Not authenticated"
}
```

---

## ✅ Solution: Login to See Your Username

### **Method 1: Login via Landing Page**

1. **Go to:** `http://localhost:3000`
2. **Click "Sign In" tab**
3. **Enter your credentials:**
   - Username: (your database username)
   - Password: (your password)
4. **Click "Sign In"**
5. **You'll be redirected to:** `/home`
6. **Check top right corner:** Should show your username now!

### **Method 2: Create New Account**

If you don't have an account:

1. **Go to:** `http://localhost:3000`
2. **Stay on "Sign Up" tab**
3. **Fill the form:**
   - Username: (choose a username)
   - Password: (choose a password)
   - Mobile: (your mobile)
   - Parent Mobile: (parent's mobile)
4. **Click "Create Account"**
5. **After success, sign in**
6. **Check profile:** Should show your username!

---

## 🗄️ Step 3: Verify Database

### **Check if user exists in database:**

If you have database access, run:
```sql
SELECT * FROM "User";
```

**Expected:** Should show your user records with usernames

**If empty:** You need to create an account first

---

## 🔄 Step 4: Test the Full Flow

### **Complete Test:**

1. **Clear everything:**
   ```javascript
   // In browser console:
   localStorage.clear()
   document.cookie.split(";").forEach(c => {
     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
   });
   location.reload()
   ```

2. **Go to landing page:** `http://localhost:3000`

3. **Sign up or sign in**

4. **After redirect to /home:**
   - Check console logs
   - Check profile in top right
   - Should show your username

5. **Refresh page:**
   - Username should persist
   - No flash of "Student"

---

## 🐛 Common Issues & Fixes

### **Issue 1: "Not authenticated" error**
**Cause:** No session cookie
**Fix:** Login again

### **Issue 2: API returns 500 error**
**Cause:** Database connection issue
**Fix:** 
```bash
# Check if database is running
# Check .env.local has correct DATABASE_URL
```

### **Issue 3: Username shows briefly then changes to "Student"**
**Cause:** API call fails after initial load
**Fix:** Check console for errors

### **Issue 4: Different username shows**
**Cause:** Old localStorage value
**Fix:**
```javascript
localStorage.removeItem('username')
location.reload()
// Then login again
```

---

## 💻 Manual Testing Commands

### **Test 1: Check localStorage**
```javascript
console.log('Stored username:', localStorage.getItem('username'))
```

### **Test 2: Check session**
```javascript
fetch('/api/auth/me')
  .then(r => r.json())
  .then(d => console.log('Session:', d))
```

### **Test 3: Force set username (temporary)**
```javascript
localStorage.setItem('username', 'TestUser')
location.reload()
// Profile will show "TestUser" until next API call
```

### **Test 4: Complete diagnostic**
```javascript
console.log('=== PROFILE DEBUG ===')
console.log('1. localStorage:', localStorage.getItem('username'))
console.log('2. Cookies:', document.cookie)
console.log('3. Checking API...')
fetch('/api/auth/me')
  .then(r => r.json())
  .then(d => {
    console.log('4. API Response:', d)
    if (d.user) {
      console.log('✅ LOGGED IN as:', d.user.username)
    } else {
      console.log('❌ NOT LOGGED IN')
      console.log('👉 Go to http://localhost:3000 and sign in')
    }
  })
```

---

## 📋 Troubleshooting Checklist

Check each item:

- [ ] Browser console shows logs (F12)
- [ ] API call to /api/auth/me is made
- [ ] API returns 200 status (not 401 or 500)
- [ ] API response has `user` object
- [ ] User object has `username` field
- [ ] Session cookie exists
- [ ] You have logged in at least once
- [ ] Database has user records
- [ ] No errors in console
- [ ] Hard refresh done (Ctrl+Shift+R)

---

## 🎯 Expected Behavior

### **Before Login:**
```
1. Page loads
2. Profile shows "Student" (default)
3. Console: "⚠️ No user in response"
4. API returns 401 Unauthorized
```

### **After Login:**
```
1. Login successful
2. Redirect to /home
3. Profile shows YOUR username
4. Console: "✅ User found: your-username"
5. API returns 200 with user data
6. localStorage has your username
```

### **After Page Refresh:**
```
1. Profile shows YOUR username (from localStorage)
2. API call updates with fresh data
3. No flash of "Student"
4. Username persists
```

---

## 🚨 If Still Not Working

### **Last Resort Fixes:**

**1. Clear everything and start fresh:**
```javascript
// Browser console:
localStorage.clear()
sessionStorage.clear()
// Clear all cookies
// Close browser completely
// Reopen and try again
```

**2. Check server is running:**
```bash
# Should see server running on port 3000
npm run dev
```

**3. Check database connection:**
```bash
# Verify DATABASE_URL in .env.local
# Test database connection
```

**4. Check API route exists:**
- File should exist: `app/api/auth/me/route.ts`
- Should export GET function
- Should use getSession() and prisma

**5. Create test user:**
```bash
# Use Prisma Studio to create user
npx prisma studio
# Or create via signup form
```

---

## 📞 Support Information

If profile still shows "Student" after:
- ✅ Logging in
- ✅ Seeing "✅ User found" in console
- ✅ API returning user data
- ✅ Hard refresh

Then there may be a code issue. Check:
1. Console for any errors
2. Network tab for failed requests
3. React DevTools for component state

---

## ✅ Success Criteria

Profile is working correctly when:

1. ✅ After login, shows your username
2. ✅ Avatar shows first letter of your username
3. ✅ Username persists on page refresh
4. ✅ Console shows "✅ User found: [your-username]"
5. ✅ API returns 200 with user data
6. ✅ localStorage has your username
7. ✅ Dropdown menu shows your username
8. ✅ No errors in console

---

**Quick Fix Summary:**
1. Open `http://localhost:3000`
2. Sign in with your credentials
3. Check top right corner
4. Should show your username!

**Last Updated:** 2025-02-10 05:36 IST
**Status:** Awaiting login test
