"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      prefetch={true}
      className={cn(
        "text-sm transition-colors duration-150 px-3 py-2 rounded-md whitespace-nowrap will-change-auto",
        isActive ? "bg-[#1ABC9C] text-white font-medium" : "text-muted-foreground hover:text-white hover:bg-[#1ABC9C]",
        className,
      )}
    >
      {children}
    </Link>
  )
}
