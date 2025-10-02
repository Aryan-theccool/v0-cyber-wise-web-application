"use client"

import Link from "next/link"
import { Shield, Phone, Calendar, ExternalLink, AlertCircle, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import { NavLink } from "@/components/nav-link"

// International Helplines data
const internationalHelplines = [
  {
    country: "India",
    helplines: [
      {
        title: "National Suicide Prevention",
        number: "988",
        email: "support@suicideprevention.in",
        description: "24/7 crisis support for anyone experiencing suicidal thoughts or emotional distress.",
        color: "destructive" as const,
      },
      {
        title: "Cyber Crime Helpline",
        number: "1930",
        email: "complaints@cybercrime.gov.in",
        description: "Report cybercrime, online fraud, financial scams, and digital harassment to authorities.",
        color: "primary" as const,
      },
      {
        title: "Women Harassment Helpline",
        number: "181",
        email: "support@womenhelp.in",
        description: "Support for women facing harassment, abuse, or violence. Confidential assistance available.",
        color: "secondary" as const,
      },
      {
        title: "Child Helpline",
        number: "1098",
        email: "childline@childline.in",
        description: "Support for children and teens facing any form of abuse, bullying, or distress.",
        color: "accent" as const,
      },
    ],
  },
  {
    country: "United States",
    helplines: [
      {
        title: "National Suicide Prevention Lifeline",
        number: "988",
        email: "support@988lifeline.org",
        description: "24/7 free and confidential support for people in distress and crisis resources.",
        color: "destructive" as const,
      },
      {
        title: "Cyberbullying Research Center",
        number: "1-800-273-8255",
        email: "help@cyberbullying.org",
        description: "Resources and support for cyberbullying victims and their families.",
        color: "primary" as const,
      },
      {
        title: "Crisis Text Line",
        number: "Text HOME to 741741",
        email: "support@crisistextline.org",
        description: "Free 24/7 support for those in crisis via text message.",
        color: "secondary" as const,
      },
    ],
  },
  {
    country: "United Kingdom",
    helplines: [
      {
        title: "Samaritans",
        number: "116 123",
        email: "jo@samaritans.org",
        description: "24/7 emotional support for anyone struggling to cope or at risk of suicide.",
        color: "destructive" as const,
      },
      {
        title: "Childline",
        number: "0800 1111",
        email: "help@childline.org.uk",
        description: "Free, confidential service for children and young people up to age 19.",
        color: "accent" as const,
      },
      {
        title: "National Bullying Helpline",
        number: "0845 22 55 787",
        email: "info@nationalbullyinghelpline.co.uk",
        description: "Support for anyone affected by bullying, including cyberbullying.",
        color: "primary" as const,
      },
    ],
  },
]

export default function HelplinePage() {
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
            <NavLink href="/">Home</NavLink>
            <NavLink href="/chatbot">Chatbot</NavLink>
            <NavLink href="/report">Report</NavLink>
            <NavLink href="/journal">Journal</NavLink>
            <NavLink href="/student-dashboard">My Progress</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/awareness">Awareness</NavLink>
            <NavLink href="/helpline">Helpline</NavLink>
          </div>

          <Button size="sm" className="hidden hover:bg-[#1ABC9C] transition-colors md:inline-flex" asChild>
            <Link href="/chatbot">Get Support</Link>
          </Button>

          <MobileNav />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 text-sm text-destructive animate-fade-in">
            <AlertCircle className="h-4 w-4" />
            Emergency Support Available 24/7
          </div>

          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-6xl animate-fade-in-up">
            Helpline & Support Resources
          </h1>

          <p className="text-pretty text-lg text-muted-foreground animate-fade-in-up">
            Access emergency helplines, upcoming webinars, and support resources. You're not alone – help is always
            available.
          </p>
        </div>
      </section>

      {/* International Helplines */}
      {internationalHelplines.map((region, index) => (
        <section key={region.country} className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center gap-3">
            <Globe className="h-6 w-6 text-primary" />
            <div>
              <h2 className="text-3xl font-bold">{region.country} Helplines</h2>
              <p className="text-muted-foreground">
                Immediate support when you need it most. All helplines are confidential and available 24/7.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {region.helplines.map((helpline) => (
              <HelplineCard key={helpline.title} {...helpline} />
            ))}
          </div>
        </section>
      ))}

      {/* Upcoming Webinars */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Upcoming Webinars & Seminars</h2>
          <p className="text-muted-foreground">
            Join our educational sessions to learn about cyber safety, digital wellness, and online protection.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <WebinarCard
            title="Recognizing Online Scams & Phishing Attacks"
            date="March 15, 2025"
            time="6:00 PM - 7:30 PM IST"
            speaker="Dr. Priya Sharma, Cybersecurity Expert"
            description="Learn to identify common online scams, phishing emails, and fraudulent websites. Practical tips to protect your personal information."
            registrationLink="#"
          />
          <WebinarCard
            title="Digital Wellness for Students"
            date="March 22, 2025"
            time="5:00 PM - 6:30 PM IST"
            speaker="Rahul Mehta, Clinical Psychologist"
            description="Understanding the impact of social media on mental health. Strategies for healthy digital habits and screen time management."
            registrationLink="#"
          />
          <WebinarCard
            title="Cyberbullying: Prevention & Response"
            date="March 29, 2025"
            time="4:00 PM - 5:30 PM IST"
            speaker="Anjali Verma, School Counselor"
            description="Recognize signs of cyberbullying, support victims, and create safer online communities. For students, parents, and educators."
            registrationLink="#"
          />
          <WebinarCard
            title="Protecting Your Digital Identity"
            date="April 5, 2025"
            time="6:00 PM - 7:30 PM IST"
            speaker="Vikram Singh, Data Privacy Consultant"
            description="Best practices for password security, two-factor authentication, and protecting your personal data online."
            registrationLink="#"
          />
          <WebinarCard
            title="Social Media Safety & Privacy Settings"
            date="April 12, 2025"
            time="5:00 PM - 6:30 PM IST"
            speaker="Neha Kapoor, Digital Safety Advocate"
            description="Master privacy settings across popular platforms. Learn what information you're sharing and how to control it."
            registrationLink="#"
          />
          <WebinarCard
            title="Responding to Online Harassment"
            date="April 19, 2025"
            time="4:00 PM - 5:30 PM IST"
            speaker="Advocate Suresh Kumar, Cyber Law Expert"
            description="Know your legal rights, document evidence, and take action against online harassment and threats."
            registrationLink="#"
          />
        </div>
      </section>

      {/* Additional Resources */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <h2 className="mb-4 text-2xl font-bold">Need Immediate Help?</h2>
          <p className="mb-6 text-muted-foreground">
            If you're in immediate danger or experiencing a crisis, please call emergency services (112) or contact one
            of the helplines above. You can also use our AI chatbot for immediate support and guidance.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="hover:bg-[#1ABC9C] transition-colors" asChild>
              <Link href="/chatbot">Start Chat Support</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-muted transition-colors" asChild>
              <Link href="/report">Submit Anonymous Report</Link>
            </Button>
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

interface HelplineCardProps {
  title: string
  number: string
  email: string
  description: string
  color: "primary" | "secondary" | "accent" | "destructive"
}

function HelplineCard({ title, number, email, description, color }: HelplineCardProps) {
  const colorClasses = {
    primary: "border-primary/50 bg-primary/5 hover:border-primary",
    secondary: "border-secondary/50 bg-secondary/5 hover:border-secondary",
    accent: "border-accent/50 bg-accent/5 hover:border-accent",
    destructive: "border-destructive/50 bg-destructive/5 hover:border-destructive",
  }

  const iconColorClasses = {
    primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
    secondary: "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground",
    accent: "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
    destructive:
      "bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground",
  }

  return (
    <Card className={`group transition-all hover:shadow-lg ${colorClasses[color]}`}>
      <CardHeader>
        <div className="mb-4 flex items-start justify-between">
          <div
            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${iconColorClasses[color]}`}
          >
            <Phone className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="text-2xl font-bold">{number}</div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Button size="sm" className="w-full hover:bg-[#1ABC9C] transition-colors" asChild>
            <a href={`tel:${number.replace(/\s/g, "")}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full bg-transparent hover:bg-muted transition-colors"
            asChild
          >
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface WebinarCardProps {
  title: string
  date: string
  time: string
  speaker: string
  description: string
  registrationLink: string
}

function WebinarCard({ title, date, time, speaker, description, registrationLink }: WebinarCardProps) {
  return (
    <Card className="transition-all hover:border-primary/50 hover:shadow-lg">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {date} • {time}
          </span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm font-medium text-primary">{speaker}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <Button variant="outline" className="w-full bg-transparent" asChild>
          <a href={registrationLink} target="_blank" rel="noopener noreferrer">
            Register Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
