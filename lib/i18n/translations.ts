import enMessages from "@/messages/en.json";
import hiMessages from "@/messages/hi.json";

export type Locale = "en" | "hi";

const messages = {
  en: enMessages,
  hi: hiMessages,
};

export function getMessages(locale: Locale) {
  return messages[locale] || messages.en;
}

export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("preferredLanguage");
    if (stored === "en" || stored === "hi") {
      return stored;
    }
  }
  return "en";
}

export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: any = messages[locale];

  for (const k of keys) {
    if (value && typeof value === "object") {
      value = value[k];
    } else {
      return key;
    }
  }

  return typeof value === "string" ? value : key;
}
