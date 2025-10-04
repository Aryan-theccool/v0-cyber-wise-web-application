"use client"

import type React from "react"
import Link from "next/link"
import { Shield, MessageCircle, FileText, BookOpen, BarChart3, PenTool } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CyberWiseLogo } from "@/components/cyberwise-logo"
import { AppNav } from "@/components/app-nav"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <AppNav />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            {t("home.safeSpaceOnline")}
          </div>

          <div className="mb-6">
            <CyberWiseLogo size="lg" />
          </div>

          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            {t("home.heroDescription")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto hover:bg-[#1ABC9C]" asChild>
              <Link href="/chatbot">{t("home.getSupport")}</Link>
            </Button>
            <Link
              href="/awareness"
              className="text-sm text-muted-foreground hover:text-white hover:bg-[#1ABC9C] px-4 py-2 rounded-md border border-border"
            >
              {t("home.learnAwareness")}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<MessageCircle className="h-6 w-6" />}
            title={t("home.aiSupportTitle")}
            description={t("home.aiSupportDesc")}
            href="/chatbot"
          />
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title={t("home.reportingTitle")}
            description={t("home.reportingDesc")}
            href="/report"
          />
          <FeatureCard
            icon={<PenTool className="h-6 w-6" />}
            title={t("home.journalTitle")}
            description={t("home.journalDesc")}
            href="/journal"
          />
          <FeatureCard
            icon={<BarChart3 className="h-6 w-6" />}
            title={t("home.dashboardTitle")}
            description={t("home.dashboardDesc")}
            href="/dashboard"
          />
          <FeatureCard
            icon={<BookOpen className="h-6 w-6" />}
            title={t("home.awarenessTitle")}
            description={t("home.awarenessDesc")}
            href="/awareness"
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title={t("home.privacyTitle")}
            description={t("home.privacyDesc")}
            href="/helpline"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-primary">{t("home.support24x7")}</div>
            <div className="text-sm text-muted-foreground">{t("home.supportAvailable")}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-secondary">{t("home.anonymous")}</div>
            <div className="text-sm text-muted-foreground">{t("home.anonymousPrivate")}</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold text-accent">{t("home.safePlatform")}</div>
            <div className="text-sm text-muted-foreground">{t("home.trustedPlatform")}</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>{t("home.footerText")}</p>
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
      className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-lg"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}
