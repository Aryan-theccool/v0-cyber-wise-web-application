# Complete Pages Translation Guide

## ✅ Pages Already Translated

### 1. Landing Page (`app/page.tsx`)
- Sign Up / Sign In forms
- All labels, buttons, and error messages
- **Status**: ✅ Complete

### 2. Home Page (`app/home/page.tsx`)  
- Hero section
- Feature cards
- Stats section
- Footer
- **Status**: ✅ Complete

### 3. Navigation (`components/app-nav.tsx`)
- All menu items
- **Status**: ✅ Complete

## 📝 Pattern for Translating Other Pages

### Step 1: Add "use client" directive
```typescript
"use client"
```

### Step 2: Import useTranslation hook
```typescript
import { useTranslation } from "@/lib/i18n/useTranslation";
```

### Step 3: Use the hook in component
```typescript
export default function MyPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("myPage.title")}</h1>
    </div>
  );
}
```

## 🔄 Quick Translation Examples for Each Page

### Chatbot Page (`app/chatbot/page.tsx`)

**Current hardcoded text:**
```typescript
<span className="font-semibold">AI Support Chat</span>
<span className="text-sm text-muted-foreground">Online</span>
```

**Replace with:**
```typescript
<span className="font-semibold">{t("chatbot.title")}</span>
<span className="text-sm text-muted-foreground">{t("common.online")}</span>
```

**Greeting message:**
```typescript
// Current
content: "Hi there! I'm here to support you..."

// Replace with
content: t("chatbot.greeting")
```

**Quick replies:**
```typescript
// Current
{ id: 1, text: "I feel bullied", emoji: "😔" }

// Replace with
{ id: 1, text: t("chatbot.quickReply1"), emoji: "😔" }
```

### Report Page (`app/report/page.tsx`)

**Headers:**
```typescript
// Current
<span className="font-semibold">Anonymous Reporting</span>

// Replace with
<span className="font-semibold">{t("report.title")}</span>
```

**Form labels:**
```typescript
// Current
<Label>Incident Type *</Label>

// Replace with
<Label>{t("report.incidentType")} {t("report.required")}</Label>
```

**Dropdown options:**
```typescript
// Current
<SelectItem value="cyberbullying">Cyberbullying</SelectItem>

// Replace with
<SelectItem value="cyberbullying">{t("report.cyberbullying")}</SelectItem>
```

### Journal Page (`app/journal/page.tsx`)

**Title:**
```typescript
// Current
<span className="font-semibold">Digital Journal</span>

// Replace with
<span className="font-semibold">{t("journal.title")}</span>
```

**Mood buttons:**
```typescript
// Current
<span className="text-sm font-medium">Happy</span>

// Replace with
<span className="text-sm font-medium">{t("journal.happy")}</span>
```

**Empty state:**
```typescript
// Current
<h3>No entries yet</h3>
<p>Start journaling to track your thoughts and feelings</p>

// Replace with
<h3>{t("journal.noEntries")}</h3>
<p>{t("journal.noEntriesDesc")}</p>
```

### Dashboard Page (`app/dashboard/page.tsx`)

**Title:**
```typescript
// Current
<span className="font-semibold">Counselor Dashboard</span>

// Replace with
<span className="font-semibold">{t("dashboard.title")}</span>
```

**Time range selector:**
```typescript
// Current
<SelectItem value="7days">Last 7 days</SelectItem>

// Replace with
<SelectItem value="7days">{t("dashboard.last7days")}</SelectItem>
```

**Stats cards:**
```typescript
// Current
<CardTitle>Total Reports</CardTitle>

// Replace with
<CardTitle>{t("dashboard.totalReports")}</CardTitle>
```

### Awareness Page (`app/awareness/page.tsx`)

**Hero:**
```typescript
// Current
<h1>Learn to Stay Safe Online</h1>

// Replace with
<h1>{t("awareness.heroTitle")}</h1>
```

**Section titles:**
```typescript
// Current
<h2>Real-World Case Studies</h2>

// Replace with
<h2>{t("awareness.caseStudiesTitle")}</h2>
```

**Buttons:**
```typescript
// Current
<Button>Start Quiz</Button>

// Replace with
<Button>{t("awareness.startQuiz")}</Button>
```

## 🎯 Complete Example: Chatbot Page

Here's a complete example of how to update the chatbot page:

```typescript
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Send, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AppNav } from "@/components/app-nav"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function ChatbotPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([])
  
  const quickReplies = [
    { id: 1, text: t("chatbot.quickReply1"), emoji: "😔" },
    { id: 2, text: t("chatbot.quickReply2"), emoji: "⚠️" },
    { id: 3, text: t("chatbot.quickReply3"), emoji: "🆘" },
    { id: 4, text: t("chatbot.quickReply4"), emoji: "😰" },
  ]

  useEffect(() => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: t("chatbot.greeting"),
        timestamp: new Date(),
      },
    ])
  }, [t])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">{t("chatbot.title")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">{t("common.online")}</span>
          </div>
        </div>
      </header>

      {/* Rest of the component... */}
      
      <div className="border-t border-border bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <Textarea
            placeholder={t("chatbot.placeholder")}
            // ...
          />
          <p className="mt-2 text-xs text-muted-foreground">
            {t("chatbot.confidentialNote")}
          </p>
        </div>
      </div>
    </div>
  )
}
```

## 📋 Translation Checklist

For each page, translate:

- [ ] **Page title** (in header/nav)
- [ ] **Hero/main heading**
- [ ] **Subheadings and descriptions**
- [ ] **All button labels**
- [ ] **Form labels and placeholders**
- [ ] **Dropdown options**
- [ ] **Error messages**
- [ ] **Success messages**
- [ ] **Empty states**
- [ ] **Loading states**
- [ ] **Tooltips and help text**
- [ ] **Footer text**

## 🚀 Quick Start Commands

1. **Find all hardcoded text in a file:**
   ```bash
   # Search for common patterns
   grep -n "className.*>" app/chatbot/page.tsx | grep -v "t("
   ```

2. **Test translations:**
   - Switch to Hindi using language switcher
   - Navigate through all pages
   - Check that all text is translated

## 💡 Tips

1. **Keep translation keys organized** by page/section
2. **Reuse common translations** (buttons, labels)
3. **Test both languages** after each update
4. **Use descriptive keys** (`chatbot.greeting` not `greeting1`)
5. **Handle dynamic content** with replacement variables

## 📚 All Translation Keys Available

Check `messages/en.json` and `messages/hi.json` for all available keys:

- `common.*` - Common UI elements
- `nav.*` - Navigation items
- `auth.*` - Authentication
- `home.*` - Home page
- `chatbot.*` - Chatbot page
- `report.*` - Report page
- `journal.*` - Journal page
- `dashboard.*` - Dashboard page
- `awareness.*` - Awareness page

## ✨ Result

After applying translations to all pages:
- ✅ Users can switch between English and Hindi
- ✅ All content translates instantly
- ✅ Consistent user experience
- ✅ Easy to add more languages in future
