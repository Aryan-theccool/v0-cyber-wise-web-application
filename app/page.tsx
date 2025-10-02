import type React from "react"
import Link from "next/link"
import { Shield, MessageCircle, FileText, BookOpen, BarChart3, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CyberWiseLogo } from "@/components/cyberwise-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">
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
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Home
            </Link>
            <Link
              href="/chatbot"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Chatbot
            </Link>
            <Link
              href="/report"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Report
            </Link>
            <Link
              href="/journal"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Journal
            </Link>
            <Link
              href="/student-dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              My Progress
            </Link>
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Dashboard
            </Link>
            <Link
              href="/awareness"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Awareness
            </Link>
            <Link
              href="/helpline"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-3 py-2 rounded-md whitespace-nowrap"
            >
              Helpline
            </Link>
          </div>

          <Button size="sm">Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            Your Safe Space Online
          </div>

          <div className="mb-6">
            <CyberWiseLogo size="lg" />
          </div>

          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Your safe space for cyber awareness, support, and protection. We're here to help students navigate
            cyberbullying, scams, and harassment with empathy and expertise.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto hover:bg-[#1ABC9C] transition-colors" asChild>
              <Link href="/chatbot">Get Support</Link>
            </Button>
            <Link
              href="/awareness"
              className="text-sm text-muted-foreground transition-colors hover:text-white hover:bg-[#1ABC9C] px-4 py-2 rounded-md border border-border"
            >
              Learn Awareness
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<MessageCircle className="h-6 w-6" />}
            title="AI Support Chatbot"
            description="Get immediate, empathetic support 24/7. Our AI chatbot is trained to help you through difficult situations."
            href="/chatbot"
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Anonymous Reporting"
            description="Report incidents safely and anonymously. Your identity is protected while we help you get the support you need."
            href="/report"
          />
          <FeatureCard
            icon={<PenTool className="h-6 w-6" />}
            title="Digital Journal"
            description="Express your feelings in a safe, private space. Track your mood and reflect on your experiences."
            href="/journal"
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title="Counselor Dashboard"
            description="For educators and counselors: Monitor trends, track incidents, and provide better support to students."
            href="/dashboard"
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title="Awareness Hub"
            description="Learn about cybersecurity, recognize scams, and understand your rights online through interactive content."
            href="/awareness"
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Privacy First"
            description="Your safety and privacy are our top priorities. All data is encrypted and your identity is always protected."
            href="/about"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-secondary">100%</div>
            <div className="text-sm text-muted-foreground">Anonymous & Private</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-accent">Safe</div>
            <div className="text-sm text-muted-foreground">Trusted Platform</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CyberWise. Built with care for student safety and wellbeing.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

function FeatureCard({ icon, title, description, href }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
