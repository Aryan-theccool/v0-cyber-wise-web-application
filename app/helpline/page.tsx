import Link from "next/link"
import { Shield, Phone, Calendar, ExternalLink, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HelplinePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CyberWise</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Home
            </Link>
            <Link href="/chatbot" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Chatbot
            </Link>
            <Link href="/report" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Report
            </Link>
            <Link href="/journal" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Journal
            </Link>
            <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/awareness" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Awareness
            </Link>
            <Link href="/helpline" className="text-sm font-medium text-foreground">
              Helpline
            </Link>
          </div>

          <Button size="sm" asChild>
            <Link href="/chatbot">Get Support</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            Emergency Support Available 24/7
          </div>

          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Helpline & Support Resources
          </h1>

          <p className="text-pretty text-lg text-muted-foreground">
            Access emergency helplines, upcoming webinars, and support resources. You're not alone – help is always
            available.
          </p>
        </div>
      </section>

      {/* Emergency Helplines */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold">Emergency Helplines</h2>
          <p className="text-muted-foreground">
            Immediate support when you need it most. All helplines are confidential and available 24/7.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <HelplineCard
            title="National Suicide Prevention"
            number="988"
            description="24/7 crisis support for anyone experiencing suicidal thoughts or emotional distress."
            color="destructive"
          />
          <HelplineCard
            title="Cyber Crime Helpline"
            number="1930"
            description="Report cybercrime, online fraud, financial scams, and digital harassment to authorities."
            color="primary"
          />
          <HelplineCard
            title="Women Harassment Helpline"
            number="181"
            description="Support for women facing harassment, abuse, or violence. Confidential assistance available."
            color="secondary"
          />
          <HelplineCard
            title="Child Helpline"
            number="1098"
            description="Support for children and teens facing any form of abuse, bullying, or distress."
            color="accent"
          />
          <HelplineCard
            title="National Cyber Crime Portal"
            number="155260"
            description="Report online financial fraud, social media crimes, and cyber harassment."
            color="primary"
          />
          <HelplineCard
            title="Mental Health Helpline"
            number="1800-599-0019"
            description="Professional mental health support and counseling services available 24/7."
            color="secondary"
          />
        </div>
      </section>

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
            <Button size="lg" asChild>
              <Link href="/chatbot">Talk to AI Support</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent" asChild>
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
  description: string
  color: "primary" | "secondary" | "accent" | "destructive"
}

function HelplineCard({ title, number, description, color }: HelplineCardProps) {
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
    <a
      href={`tel:${number}`}
      className={`group block rounded-2xl border p-6 transition-all hover:shadow-lg ${colorClasses[color]}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${iconColorClasses[color]}`}
        >
          <Phone className="h-6 w-6" />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <div className="mb-3 text-2xl font-bold">{number}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </a>
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
