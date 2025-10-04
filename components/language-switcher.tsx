"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("preferredLanguage") || "en";
      setCurrentLang(stored);
    }
  }, []);

  const changeLanguage = (locale: string) => {
    // Store language preference in localStorage
    localStorage.setItem("preferredLanguage", locale);
    setCurrentLang(locale);
    
    // Reload the page to apply the language change
    window.location.reload();
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLang) || languages[0];

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4" />
        <span className="sr-only">Change language</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  changeLanguage(language.code);
                  setIsOpen(false);
                }}
                className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${
                  currentLang === language.code ? "bg-accent" : ""
                }`}
              >
                <span className="mr-2">{language.flag}</span>
                {language.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
