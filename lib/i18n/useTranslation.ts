"use client";

import { useState, useEffect } from "react";
import { getMessages, getLocale, type Locale } from "./translations";

export function useTranslation() {
  // Initialize with the current locale from localStorage immediately
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("preferredLanguage");
      if (stored === "en" || stored === "hi") {
        return stored;
      }
    }
    return "en";
  });
  
  const [messages, setMessages] = useState(() => getMessages(locale));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentLocale = getLocale();
    setLocale(currentLocale);
    setMessages(getMessages(currentLocale));

    // Listen for language changes
    const handleStorageChange = () => {
      const newLocale = getLocale();
      setLocale(newLocale);
      setMessages(getMessages(newLocale));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const t = (key: string, replacements?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let value: any = messages;

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key;
      }
    }

    let result = typeof value === "string" ? value : key;

    // Handle replacements like {current} and {total}
    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        result = result.replace(`{${placeholder}}`, String(replacement));
      });
    }

    return result;
  };

  return { t, locale };
}
