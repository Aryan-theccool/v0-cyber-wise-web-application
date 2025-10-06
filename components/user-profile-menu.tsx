"use client";

import { useState, useEffect } from "react";
import { User, LogOut, Settings, ChevronDown, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function UserProfileMenu() {
  const { t } = useTranslation();
  const [user, setUser] = useState<{ username: string }>({ username: "Student" });
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true);
    // Load username from localStorage after mount
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUser({ username: savedUsername });
    }
  }, []);

  useEffect(() => {
    // Try to fetch real user data from API
    console.log("🔍 Fetching user data from /api/auth/me...");
    
    fetch("/api/auth/me")
      .then((res) => {
        console.log("📡 API Response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("📦 API Response data:", data);
        
        if (data.user) {
          console.log("✅ User found:", data.user.username);
          setUser(data.user);
          setIsAuthenticated(true);
          // Save username to localStorage for persistence
          localStorage.setItem('username', data.user.username);
        } else {
          console.log("⚠️ No user in response, using default 'Student'");
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching user:", error);
        // Keep current user if API fails
      });
  }, []);

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout API error:", error);
    }
    
    // Clear all local storage
    localStorage.removeItem('username');
    localStorage.clear();
    
    // Clear session cookie manually (backup)
    document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Redirect to home page
    window.location.href = "/";
  };

  // Get first letter of username for avatar
  const avatarLetter = user.username.charAt(0).toUpperCase();

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition-all hover:bg-accent"
        aria-label="User menu"
      >
        {/* Avatar with gradient background */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white shadow-md">
          <span className="text-sm font-bold">{avatarLetter}</span>
        </div>
        
        {/* Username - visible on desktop */}
        <div className="hidden flex-col items-start md:flex">
          <span className="text-sm font-semibold leading-tight">{user.username}</span>
          <span className="text-xs text-muted-foreground">Student</span>
        </div>
        
        {/* Dropdown icon */}
        <ChevronDown 
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-background shadow-xl">
            {/* User Info Header */}
            <div className="border-b border-border bg-gradient-to-r from-[#4A90E2]/10 via-[#9B59B6]/10 to-[#1ABC9C]/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] text-white shadow-md">
                  <span className="text-lg font-bold">{avatarLetter}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{user.username}</p>
                  <p className="text-xs text-muted-foreground">Student Account</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>{t("profile.title")}</span>
              </Link>
              
              <Link
                href="/student-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                onClick={() => setIsOpen(false)}
              >
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <span>{t("nav.myProgress")}</span>
              </Link>

              <div className="my-2 h-px bg-border" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                <span>{t("nav.signOut")}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
