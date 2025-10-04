# Translation Test Guide

## How to Test Hindi Translations

### Step 1: Start the Development Server
```bash
npm run dev
```

### Step 2: Open the Application
Navigate to `http://localhost:3000`

### Step 3: Test Language Switching

1. **Check Default Language**: The page should load in English by default
2. **Click Language Switcher**: Click the globe icon (🌐) in the top-right corner
3. **Select Hindi**: Click on "🇮🇳 हिन्दी"
4. **Verify Page Reload**: The page should reload automatically

### Step 4: Verify Hindi Translations

After selecting Hindi, verify these elements are translated:

#### Landing Page (Login/Signup)
- ✅ App Name: "साइबरवाइज"
- ✅ Description: "साइबर जागरूकता और सुरक्षा के लिए आपकी सुरक्षित जगह"
- ✅ Tab Labels: "साइन अप" and "साइन इन"

#### Sign Up Form
- ✅ Title: "अपना खाता बनाएं"
- ✅ Username: "उपयोगकर्ता नाम"
- ✅ Password: "पासवर्ड"
- ✅ Mobile: "आपका मोबाइल नंबर"
- ✅ Parent Mobile: "माता-पिता का मोबाइल नंबर"
- ✅ Button: "साइन अप" / "खाता बनाया जा रहा है..."

#### Sign In Form
- ✅ Title: "वापसी पर स्वागत है"
- ✅ Username: "उपयोगकर्ता नाम"
- ✅ Password: "पासवर्ड"
- ✅ Forgot Password: "पासवर्ड भूल गए?"
- ✅ Button: "साइन इन" / "साइन इन हो रहा है..."

#### Navigation (After Login)
- ✅ Home: "होम"
- ✅ Chatbot: "चैटबॉट"
- ✅ Report: "रिपोर्ट"
- ✅ Journal: "जर्नल"
- ✅ Dashboard: "डैशबोर्ड"
- ✅ Awareness: "जागरूकता"

### Step 5: Test Language Persistence

1. **Refresh the page**: Press F5 or Ctrl+R
2. **Verify language remains**: The page should still be in Hindi
3. **Open in new tab**: Open `http://localhost:3000` in a new tab
4. **Verify language persists**: New tab should also show Hindi

### Step 6: Switch Back to English

1. **Click Language Switcher**: Click the globe icon (🌐)
2. **Select English**: Click on "🇬🇧 English"
3. **Verify Page Reload**: Page reloads in English

## Troubleshooting

### Issue: Language not changing
**Solution**: 
- Clear browser cache and localStorage
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check browser console for errors

### Issue: Some text still in English
**Solution**:
- That component may not be updated yet
- Refer to MULTILANGUAGE_GUIDE.md for how to add translations

### Issue: Page shows translation keys (e.g., "auth.signIn")
**Solution**:
- Translation key doesn't exist in messages/hi.json
- Check spelling of the key
- Verify the JSON file is valid

## Browser Console Test

Open browser console (F12) and run:
```javascript
// Check current language
localStorage.getItem('preferredLanguage')

// Manually set to Hindi
localStorage.setItem('preferredLanguage', 'hi')
location.reload()

// Manually set to English
localStorage.setItem('preferredLanguage', 'en')
location.reload()
```

## Expected Behavior

✅ **Language switcher visible** in navigation bar  
✅ **Click switches language** and reloads page  
✅ **Language persists** across page refreshes  
✅ **All UI text translates** (forms, buttons, labels)  
✅ **Error messages translate** (validation, network errors)  
✅ **No flash of wrong language** on page load  

## Known Limitations

- Some pages may not be fully translated yet (work in progress)
- Dynamic content from API may not be translated
- Validation error messages use the language at form creation time

## Next Steps

If translations are working correctly:
1. Test on other pages (home, chatbot, report, etc.)
2. Add more translation keys as needed
3. Consider adding more languages
4. Test on different browsers

If translations are NOT working:
1. Check browser console for errors
2. Verify messages/en.json and messages/hi.json exist
3. Verify lib/i18n/useTranslation.ts is imported correctly
4. Check that components use {t("key")} syntax
