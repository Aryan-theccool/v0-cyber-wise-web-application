# Gemini AI Integration Setup Guide

## 🎯 Overview

Your CyberWise chatbot is now integrated with **Google Gemini AI** for intelligent, empathetic responses to students seeking help with cyberbullying, harassment, and online safety issues.

---

## 🔧 Setup Instructions

### Step 1: Create `.env.local` File

1. **Create a new file** in the root directory: `.env.local`
2. **Add your Gemini API key**:

```env
# Copy your database URL from .env.example if needed
DATABASE_URL="postgresql://user:password@localhost:5432/cyberwise"

# Add your Gemini API Key
GEMINI_API_KEY=AIzaSyCD-NmbnwHQcMggfIB9wXxtFylBYGqErvw
```

### Step 2: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 3: Test the Chatbot

1. Open `http://localhost:3000`
2. Navigate to the **Chatbot** page
3. Send a message
4. You should get an AI-powered response!

---

## ✨ Features

### 1. **Intelligent AI Responses**
- Powered by Google Gemini Pro
- Context-aware conversations
- Empathetic and supportive tone
- Responds in English or Hindi automatically

### 2. **Conversation Memory**
- Remembers last 6 messages (3 exchanges)
- Maintains conversation context
- Provides relevant follow-up responses

### 3. **Safety-Focused**
- Trained to recognize crisis situations
- Encourages seeking professional help when needed
- Provides appropriate resources
- Never judges or minimizes experiences

### 4. **Fallback System**
- If API fails, uses predefined responses
- Ensures chatbot always works
- Graceful error handling

---

## 🤖 How It Works

### Architecture:

```
User Message
    ↓
Chatbot Page (Frontend)
    ↓
API Route (/api/chat)
    ↓
Gemini AI API
    ↓
AI Response
    ↓
Display to User
```

### Files Created/Modified:

1. **`app/api/chat/route.ts`** (NEW)
   - Secure API endpoint
   - Handles Gemini API calls
   - Keeps API key on server (secure)

2. **`app/chatbot/page.tsx`** (MODIFIED)
   - Updated to call API route
   - Added error handling
   - Maintains fallback responses

3. **`.env.example`** (MODIFIED)
   - Added GEMINI_API_KEY example

---

## 🎨 Chatbot Personality

The AI is configured to be:

✅ **Compassionate** - Shows genuine care and empathy
✅ **Supportive** - Validates feelings and experiences
✅ **Professional** - Maintains appropriate boundaries
✅ **Practical** - Offers actionable advice
✅ **Age-appropriate** - Uses language suitable for teenagers
✅ **Multilingual** - Responds in user's language (EN/HI)

### System Prompt:

The AI is instructed to:
- Provide immediate emotional support
- Listen actively and respond with empathy
- Offer practical advice for cyber threats
- Encourage seeking additional help
- Never judge or minimize experiences
- Keep responses concise (2-4 sentences)

---

## 🔒 Security Features

### 1. **API Key Protection**
- ✅ API key stored in `.env.local` (not in git)
- ✅ Server-side only (never exposed to browser)
- ✅ API route handles all Gemini calls

### 2. **Content Safety**
- ✅ Gemini safety settings configured
- ✅ Blocks inappropriate content
- ✅ Allows discussion of sensitive topics (bullying, harassment)

### 3. **Error Handling**
- ✅ Graceful fallbacks if API fails
- ✅ User-friendly error messages
- ✅ Logs errors for debugging

---

## 📊 API Configuration

### Gemini Settings:

```typescript
{
  temperature: 0.7,        // Balanced creativity/consistency
  topK: 40,                // Diversity in responses
  topP: 0.95,              // Nucleus sampling
  maxOutputTokens: 1024,   // Response length limit
}
```

### Safety Settings:

- **Harassment**: BLOCK_NONE (allows discussion of bullying)
- **Hate Speech**: BLOCK_NONE (allows reporting hate speech)
- **Sexually Explicit**: BLOCK_MEDIUM_AND_ABOVE
- **Dangerous Content**: BLOCK_NONE (allows safety discussions)

---

## 🧪 Testing Scenarios

### Test 1: Basic Conversation
```
User: "I'm being bullied online"
Expected: Empathetic response + practical advice
```

### Test 2: Hindi Language
```
User: "मुझे मदद चाहिए"
Expected: Response in Hindi
```

### Test 3: Crisis Situation
```
User: "I want to hurt myself"
Expected: Immediate crisis resources + encouragement to seek help
```

### Test 4: Follow-up Questions
```
User: "Someone is threatening me"
AI: [Response]
User: "What should I do?"
Expected: Context-aware follow-up advice
```

---

## 🐛 Troubleshooting

### Issue 1: "AI service is not configured"
**Solution**: Check that `GEMINI_API_KEY` is in `.env.local`

### Issue 2: API Key Invalid
**Solution**: Verify your API key at https://makersuite.google.com/app/apikey

### Issue 3: Slow Responses
**Cause**: Gemini API latency (normal)
**Note**: Typically 1-3 seconds response time

### Issue 4: Chatbot Uses Fallback Responses
**Cause**: API error or network issue
**Check**: Browser console for error messages

---

## 📈 Monitoring

### Check API Usage:
1. Visit [Google AI Studio](https://makersuite.google.com/)
2. Go to API Keys section
3. View usage statistics

### Free Tier Limits:
- **60 requests per minute**
- **1,500 requests per day**
- Sufficient for development and small-scale use

---

## 🚀 Deployment

### For Production (Vercel):

1. **Add Environment Variable**:
   - Go to Vercel Dashboard
   - Select your project
   - Settings → Environment Variables
   - Add: `GEMINI_API_KEY` = `your-api-key`

2. **Redeploy**:
   ```bash
   git push
   ```

3. **Verify**:
   - Test chatbot on production URL
   - Check Vercel logs for any errors

---

## 💡 Tips for Best Results

### 1. **User Guidance**
- Encourage specific questions
- Suggest using quick reply buttons
- Remind users chatbot is AI (not human counselor)

### 2. **Content Moderation**
- Monitor conversations (if logging implemented)
- Update system prompt based on feedback
- Adjust safety settings if needed

### 3. **Performance**
- API calls are async (non-blocking)
- Conversation history limited to 6 messages (keeps context relevant)
- Responses cached in chat UI

---

## 📚 Additional Resources

### Google Gemini Documentation:
- [Gemini API Docs](https://ai.google.dev/docs)
- [API Reference](https://ai.google.dev/api/rest)
- [Safety Settings](https://ai.google.dev/docs/safety_setting_gemini)

### CyberWise Documentation:
- `MULTILANGUAGE_GUIDE.md` - Translation system
- `COMPLETE_HINDI_TRANSLATION_REPORT.md` - Translation coverage
- `CRITICAL_FIXES_APPLIED.md` - Bug fixes

---

## ✅ Verification Checklist

Before going live:

- [ ] `.env.local` file created with API key
- [ ] Development server restarted
- [ ] Chatbot responds to messages
- [ ] Responses are contextual and helpful
- [ ] Hindi language works
- [ ] Error handling works (test by using invalid API key)
- [ ] Quick reply buttons work
- [ ] Conversation history maintained
- [ ] No API key exposed in browser (check Network tab)

---

## 🎉 Success!

Your CyberWise chatbot is now powered by advanced AI, providing:

✨ **Intelligent, empathetic support**
✨ **Context-aware conversations**
✨ **Multilingual capabilities**
✨ **24/7 availability**
✨ **Safe and secure interactions**

Students can now get immediate, personalized help with their cyber safety concerns!

---

**Last Updated**: 2025-02-10 03:06 IST
**Status**: ✅ READY FOR TESTING
**Next Steps**: Create `.env.local` file and test!
