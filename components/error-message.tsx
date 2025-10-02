"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We encountered an error. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {message}
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-3 gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
