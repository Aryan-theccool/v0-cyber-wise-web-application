"use client"

interface CyberWiseLogoProps {
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function CyberWiseLogo({ className = "", size = "lg" }: CyberWiseLogoProps) {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-5xl md:text-7xl",
    xl: "text-6xl md:text-8xl",
  }

  return (
    <h1 className={`font-bold leading-tight tracking-tight ${sizeClasses[size]} ${className}`}>
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
    </h1>
  )
}
