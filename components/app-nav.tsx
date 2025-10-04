"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { MobileNav } from "@/components/mobile-nav";
import { UserProfileMenu } from "@/components/user-profile-menu";

export function AppNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/home" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">
            <span className="bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] bg-clip-text text-transparent">
              CyberWise
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/home">Home</NavLink>
          <NavLink href="/chatbot">Chatbot</NavLink>
          <NavLink href="/report">Report</NavLink>
          <NavLink href="/journal">Journal</NavLink>
          <NavLink href="/student-dashboard">My Progress</NavLink>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/awareness">Awareness</NavLink>
          <NavLink href="/helpline">Helpline</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <UserProfileMenu />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
