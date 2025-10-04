# Multilanguage Support Guide

## Overview

CyberWise now supports **English** and **Hindi** languages. Users can switch between languages using the language switcher in the navigation bar.

## Features

- ✅ **Language Switcher**: Globe icon in the navigation bar allows users to change language
- ✅ **Persistent Selection**: Language preference is saved in localStorage
- ✅ **Comprehensive Translations**: All UI text is translated including:
  - Navigation menu
  - Authentication forms (Sign Up/Sign In)
  - All page content
  - Error messages
  - Button labels

## How to Use

### For Users

1. **Change Language**: Click the globe icon (🌐) in the top navigation bar
2. **Select Language**: Choose between:
   - 🇬🇧 English
   - 🇮🇳 हिन्दी (Hindi)
3. **Automatic Save**: Your language preference is automatically saved

### For Developers

#### Adding Translations to a Component

1. **Import the translation hook**:
```typescript
import { useTranslation } from "@/lib/i18n/useTranslation";
```

2. **Use the hook in your component**:
```typescript
export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("common.appName")}</h1>
      <p>{t("home.heroDescription")}</p>
    </div>
  );
}
```

3. **With dynamic values**:
```typescript
const score = 5;
const total = 10;

<p>{t("awareness.yourScore", { score, total })}</p>
// Output: "You scored 5 out of 10"
```

#### Adding New Translation Keys

1. **Edit English translations** (`messages/en.json`):
```json
{
  "mySection": {
    "title": "My Title",
    "description": "My Description"
  }
}
```

2. **Edit Hindi translations** (`messages/hi.json`):
```json
{
  "mySection": {
    "title": "मेरा शीर्षक",
    "description": "मेरा विवरण"
  }
}
```

3. **Use in component**:
```typescript
<h1>{t("mySection.title")}</h1>
<p>{t("mySection.description")}</p>
```

## Translation Structure

### Available Translation Sections

- **common**: App name, common buttons (save, cancel, close, etc.)
- **nav**: Navigation menu items
- **auth**: Authentication (sign up, sign in, passwords, errors)
- **home**: Home page content
- **chatbot**: AI chatbot interface
- **report**: Incident reporting form
- **journal**: Digital journal
- **dashboard**: Counselor dashboard
- **awareness**: Cyber awareness hub
- **landing**: Landing page

### Example Translation Keys

```typescript
// Common
t("common.appName")        // "CyberWise" / "साइबरवाइज"
t("common.submit")         // "Submit" / "जमा करें"
t("common.cancel")         // "Cancel" / "रद्द करें"

// Navigation
t("nav.home")              // "Home" / "होम"
t("nav.chatbot")           // "Chatbot" / "चैटबॉट"
t("nav.dashboard")         // "Dashboard" / "डैशबोर्ड"

// Authentication
t("auth.signUp")           // "Sign Up" / "साइन अप"
t("auth.username")         // "Username" / "उपयोगकर्ता नाम"
t("auth.password")         // "Password" / "पासवर्ड"

// Dynamic replacements
t("awareness.questionOf", { current: 1, total: 5 })
// "Question 1 of 5" / "प्रश्न 1 का 5"
```

## File Structure

```
├── messages/
│   ├── en.json                    # English translations
│   └── hi.json                    # Hindi translations
├── lib/
│   └── i18n/
│       ├── translations.ts        # Translation utilities
│       └── useTranslation.ts      # React hook for translations
├── components/
│   └── language-switcher.tsx      # Language switcher component
└── i18n.ts                        # i18n configuration
```

## Components Using Translations

### Already Translated

- ✅ `components/app-nav.tsx` - Navigation bar
- ✅ `app/page.tsx` - Landing page (Sign Up/Sign In)
- ✅ Language switcher component

### To Be Translated (Examples for other pages)

For other pages like `home`, `chatbot`, `report`, `journal`, etc., follow this pattern:

```typescript
"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";

export default function MyPage() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("myPage.title")}</h1>
      <p>{t("myPage.description")}</p>
      <button>{t("common.submit")}</button>
    </div>
  );
}
```

## Adding a New Language

1. **Create translation file**: `messages/[locale].json`
2. **Update locale type** in `lib/i18n/translations.ts`:
```typescript
export type Locale = "en" | "hi" | "es"; // Add new locale
```

3. **Add to language switcher** in `components/language-switcher.tsx`:
```typescript
const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" }, // New language
];
```

4. **Import messages** in `lib/i18n/translations.ts`:
```typescript
import esMessages from "@/messages/es.json";

const messages = {
  en: enMessages,
  hi: hiMessages,
  es: esMessages, // Add new language
};
```

## Best Practices

1. **Keep keys organized**: Group related translations together
2. **Use descriptive keys**: `auth.signIn` is better than `signin`
3. **Avoid hardcoded text**: Always use translation keys
4. **Test both languages**: Verify translations work correctly
5. **Handle plurals**: Use dynamic replacements for numbers
6. **Keep translations consistent**: Use the same terms across the app

## Troubleshooting

### Language not changing?
- Clear browser localStorage
- Hard refresh the page (Ctrl+Shift+R)
- Check browser console for errors

### Missing translation?
- Check if the key exists in both `en.json` and `hi.json`
- Verify the key path is correct (e.g., `"auth.signIn"` not `"signIn"`)

### Translation not updating?
- Restart the development server
- Clear Next.js cache: `rm -rf .next`

## Future Enhancements

- [ ] Add more languages (Spanish, French, etc.)
- [ ] Server-side language detection
- [ ] URL-based language routing (`/en/home`, `/hi/home`)
- [ ] RTL (Right-to-Left) support for Arabic/Hebrew
- [ ] Translation management system
- [ ] Automatic translation validation

## Support

For questions or issues with multilanguage support, please refer to:
- Translation files: `messages/en.json` and `messages/hi.json`
- Translation hook: `lib/i18n/useTranslation.ts`
- Language switcher: `components/language-switcher.tsx`
