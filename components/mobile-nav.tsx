"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/chatbot", label: "Chatbot" },
  { href: "/harassment-detector", label: "Detector" },
  { href: "/report", label: "Report" },
  { href: "/journal", label: "Journal" },
  { href: "/student-dashboard", label: "My Progress" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/awareness", label: "Awareness" },
  { href: "/helpline", label: "Helpline" },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className="relative z-50"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-[280px] transform border-l border-border bg-background shadow-xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-border p-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">
              <span
                className="bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CyberWise
              </span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "block rounded-md px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[#1ABC9C] text-white"
                          : "text-muted-foreground hover:bg-[#1ABC9C] hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer Button */}
          <div className="border-t border-border p-4">
            <Button className="w-full hover:bg-[#1ABC9C]" onClick={closeMenu}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
