# 🚀 Quick Setup - Gemini AI Integration

## ⚡ 3-Step Setup

### Step 1: Create `.env.local` File

**Copy and paste this into a new file named `.env.local` in the root directory:**

```env
# Database (copy from .env.example if you have one configured)
DATABASE_URL="postgresql://user:password@localhost:5432/cyberwise"

# Gemini AI API Key
GEMINI_API_KEY=AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw
```

### Step 2: Restart Server

```bash
# Press Ctrl+C to stop current server
# Then run:
npm run dev
```

### Step 3: Test It!

1. Open `http://localhost:3000`
2. Go to **Chatbot** page
3. Send a message: "I need help with cyberbullying"
4. Get AI-powered response! 🎉

---

## ✅ What You Get

### Before (Static Responses):
```
User: "I'm scared"
Bot: [Predefined generic response]
```

### After (AI-Powered):
```
User: "I'm scared someone is threatening me online"
Bot: "I'm really sorry you're going through this. Online threats 
     can be frightening, but you're taking the right step by 
     reaching out. Please save any threatening messages as 
     evidence and consider reporting this to local authorities 
     or your school counselor. You're not alone in this."
```

---

## 🎯 Key Features

✅ **Contextual Understanding** - AI understands the full situation
✅ **Empathetic Responses** - Trained to be supportive and caring
✅ **Multilingual** - Automatically responds in Hindi or English
✅ **Conversation Memory** - Remembers previous messages
✅ **Crisis Detection** - Recognizes urgent situations
✅ **Practical Advice** - Offers actionable steps

---

## 🔒 Security

- ✅ API key stored securely on server
- ✅ Never exposed to browser
- ✅ `.env.local` is gitignored (won't be committed)
- ✅ All API calls go through secure server route

---

## 📝 File Locations

```
your-project/
├── .env.local                    ← CREATE THIS FILE
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          ← NEW: API endpoint
│   └── chatbot/
│       └── page.tsx              ← UPDATED: Uses AI
└── GEMINI_AI_SETUP_GUIDE.md     ← Full documentation
```

---

## 🧪 Quick Test Commands

### Test in English:
```
"I'm being cyberbullied"
"Someone is harassing me online"
"I received a threatening message"
```

### Test in Hindi:
```
"मुझे मदद चाहिए"
"कोई मुझे परेशान कर रहा है"
"मुझे धमकाया जा रहा है"
```

---

## ❓ Troubleshooting

### "AI service is not configured"
→ Make sure `.env.local` file exists with `GEMINI_API_KEY`

### Chatbot not responding
→ Check browser console (F12) for errors
→ Verify server is running (`npm run dev`)

### Still using old responses
→ Hard refresh browser (Ctrl+Shift+R)
→ Clear browser cache

---

## 📊 What Changed

### New Files:
1. `app/api/chat/route.ts` - Gemini AI integration
2. `GEMINI_AI_SETUP_GUIDE.md` - Full documentation
3. `QUICK_SETUP.md` - This file

### Modified Files:
1. `app/chatbot/page.tsx` - Now calls AI API
2. `.env.example` - Added GEMINI_API_KEY example

---

## 🎉 You're Done!

After creating `.env.local` and restarting the server, your chatbot will:

✨ Provide intelligent, context-aware responses
✨ Understand complex situations
✨ Offer personalized advice
✨ Support students in their language
✨ Detect and respond to crisis situations

**Your CyberWise chatbot is now AI-powered!** 🚀

---

**Need Help?** Check `GEMINI_AI_SETUP_GUIDE.md` for detailed documentation.
