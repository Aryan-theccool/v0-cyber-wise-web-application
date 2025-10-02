import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CyberWise - Stay Safe. Stay Aware.",
  description:
    "Your safe space for cyber awareness, support, and protection against cyberbullying, scams, and harassment.",
  keywords: ["cybersecurity", "cyberbullying", "student safety", "online protection", "cyber awareness"],
  authors: [{ name: "CyberWise Team" }],
  creator: "CyberWise",
  publisher: "CyberWise",
  robots: "index, follow",
  openGraph: {
    title: "CyberWise - Stay Safe. Stay Aware.",
    description: "Your safe space for cyber awareness, support, and protection.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CyberWise - Stay Safe. Stay Aware.",
    description: "Your safe space for cyber awareness, support, and protection.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  )
}
