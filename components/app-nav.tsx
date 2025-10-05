"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { MobileNav } from "@/components/mobile-nav";
import { UserProfileMenu } from "@/components/user-profile-menu";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function AppNav() {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/home" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">
            <span 
              className="bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] bg-clip-text text-transparent"
              suppressHydrationWarning
            >
              CyberWise
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/home">{t("nav.home")}</NavLink>
          <NavLink href="/chatbot">{t("nav.chatbot")}</NavLink>
          <NavLink href="/harassment-detector">{t("nav.detector")}</NavLink>
          <NavLink href="/report">{t("nav.report")}</NavLink>
          <NavLink href="/journal">{t("nav.journal")}</NavLink>
          <NavLink href="/student-dashboard">{t("nav.myProgress")}</NavLink>
          <NavLink href="/dashboard">{t("nav.dashboard")}</NavLink>
          <NavLink href="/awareness">{t("nav.awareness")}</NavLink>
          <NavLink href="/helpline">{t("nav.helpline")}</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <UserProfileMenu />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
