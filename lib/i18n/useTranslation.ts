"use client";

import { useState, useEffect, useCallback, useMemo, useTransition } from "react";
import { getMessages, getLocale, type Locale } from "./translations";

export function useTranslation() {
  // Start with "en" to prevent hydration mismatch
  const [locale, setLocale] = useState<Locale>("en");
  const [isPending, startTransition] = useTransition();
  
  const messages = useMemo(() => getMessages(locale), [locale]);

  // Load locale immediately after mount
  useEffect(() => {
    const currentLocale = getLocale();
    if (currentLocale !== locale) {
      // Use transition for smooth update
      startTransition(() => {
        setLocale(currentLocale);
      });
    }

    // Listen for language changes
    const handleStorageChange = () => {
      const newLocale = getLocale();
      if (newLocale !== locale) {
        startTransition(() => {
          setLocale(newLocale);
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [locale]);

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
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
  }, [messages]);

  return { t, locale };
}
