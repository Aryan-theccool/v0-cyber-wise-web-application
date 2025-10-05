# 🔍 Username Display Debug Guide

## Issue: Username shows "Student" instead of actual username

### ✅ Quick Fixes to Try:

#### **Fix 1: Login/Signup Again**
The username is saved to localStorage during login/signup. If you haven't logged in since the update:

1. **Go to landing page:** `http://localhost:3000`
2. **Sign in** with your credentials
3. **Check top right corner** - should show your username now

#### **Fix 2: Manually Set Username (For Testing)**
Open browser console (F12) and run:
```javascript
localStorage.setItem('username', 'YourUsername')
// Then refresh page
location.reload()
```

#### **Fix 3: Check What's Stored**
Open browser console (F12) and run:
```javascript
console.log('Stored username:', localStorage.getItem('username'))
```

If it shows `null` or `"Student"`, you need to login again.

---

## 🔍 Debugging Steps

### **Step 1: Check localStorage**
1. Press **F12** to open DevTools
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Click **Local Storage** → `http://localhost:3000`
4. Look for key: `username`
5. **Value should be your username**, not "Student"

### **Step 2: Check Console Logs**
1. Open **Console** tab in DevTools
2. Refresh the page
3. Look for any errors related to UserProfileMenu
4. Check if API call to `/api/auth/me` is successful

### **Step 3: Test Login Flow**
1. **Logout** (if logged in)
2. **Sign in** with username: `testuser`
3. **Check console** - should see username being saved
4. **Check profile** - should show "testuser"

### **Step 4: Verify API Response**
1. Open **Network** tab in DevTools
2. Refresh page
3. Look for request to `/api/auth/me`
4. Check response - should have `user.username`

---

## 💻 How Username Display Works

### **On Page Load:**
```typescript
// 1. Initialize with localStorage value
const [user, setUser] = useState(() => {
  const savedUsername = localStorage.getItem('username')
  return { username: savedUsername || "Student" }
})

// 2. Try to fetch from API
fetch("/api/auth/me")
  .then(data => {
    if (data.user) {
      setUser(data.user)
      localStorage.setItem('username', data.user.username)
    }
  })
```

### **On Login:**
```typescript
// After successful login
localStorage.setItem('username', values.username)
window.location.href = "/home"
```

---

## 🧪 Test Scenarios

### **Test 1: Fresh Login**
```
1. Clear localStorage: localStorage.clear()
2. Go to landing page
3. Sign in with username: "john123"
4. Expected: Profile shows "john123"
5. Check localStorage: Should have username="john123"
```

### **Test 2: Page Refresh**
```
1. After logging in
2. Refresh page (F5)
3. Expected: Username persists (shows "john123")
4. No flash of "Student"
```

### **Test 3: New Browser Tab**
```
1. After logging in
2. Open new tab to same site
3. Expected: Username shows in new tab too
```

---

## 🔧 Manual Fix (If Needed)

### **Option 1: Set Username Manually**
```javascript
// In browser console (F12)
localStorage.setItem('username', 'YourActualUsername')
location.reload()
```

### **Option 2: Clear and Re-login**
```javascript
// In browser console
localStorage.clear()
// Then login again
```

### **Option 3: Check Session**
```javascript
// In browser console
fetch('/api/auth/me')
  .then(r => r.json())
  .then(d => console.log('User data:', d))
```

---

## 📋 Checklist

- [ ] Logged in at least once since update
- [ ] localStorage has 'username' key
- [ ] Username value is not "Student"
- [ ] No errors in console
- [ ] API call to /api/auth/me succeeds
- [ ] Profile menu component is rendered
- [ ] Hard refresh done (Ctrl+Shift+R)

---

## 🎯 Expected Behavior

### **Before Login:**
```
Profile shows: "Student" (default)
localStorage: null or "Student"
```

### **After Login (username: "john123"):**
```
Profile shows: "john123"
localStorage: username="john123"
Avatar: "J"
```

### **After Page Refresh:**
```
Profile shows: "john123" (from localStorage)
Then updates from API if different
```

---

## 🚨 Common Issues

### **Issue 1: Shows "Student" after login**
**Cause:** localStorage not being set during login
**Fix:** Check if login page has this code:
```typescript
localStorage.setItem('username', values.username)
```

### **Issue 2: Username disappears on refresh**
**Cause:** localStorage being cleared
**Fix:** Check if logout is being called accidentally

### **Issue 3: Different username shows**
**Cause:** Old username in localStorage
**Fix:** Clear localStorage and login again

---

## 🔍 Quick Diagnostic

Run this in browser console:
```javascript
// Diagnostic script
console.log('=== USERNAME DEBUG ===')
console.log('1. localStorage username:', localStorage.getItem('username'))
console.log('2. Checking API...')
fetch('/api/auth/me')
  .then(r => r.json())
  .then(d => {
    console.log('3. API response:', d)
    if (d.user) {
      console.log('4. API username:', d.user.username)
      console.log('✅ User is logged in')
    } else {
      console.log('❌ User is NOT logged in')
      console.log('👉 Please login first')
    }
  })
  .catch(e => {
    console.log('❌ API Error:', e)
  })
```

---

## ✅ Solution Summary

**If username shows "Student":**

1. **Login again** - This will save username to localStorage
2. **Hard refresh** - Ctrl+Shift+R
3. **Check console** - Look for errors
4. **Check localStorage** - Should have your username
5. **Contact support** - If still not working

**Quick Test:**
```javascript
// Set test username
localStorage.setItem('username', 'TestUser123')
location.reload()
// Should now show "TestUser123" in profile
```

---

**Last Updated:** 2025-02-10 05:29 IST
**Status:** Awaiting user login/test
