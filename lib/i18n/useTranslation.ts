"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { getMessages, getLocale, type Locale } from "./translations";

export function useTranslation() {
  // Always start with "en" to prevent hydration mismatch
  // Will update to correct locale after mount
  const [locale, setLocale] = useState<Locale>("en");
  const [isMounted, setIsMounted] = useState(false);
  
  const messages = useMemo(() => getMessages(locale), [locale]);

  // Load locale from localStorage after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const currentLocale = getLocale();
    if (currentLocale !== locale) {
      setLocale(currentLocale);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Listen for language changes
    const handleStorageChange = () => {
      const newLocale = getLocale();
      if (newLocale !== locale) {
        setLocale(newLocale);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [locale, isMounted]);

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
