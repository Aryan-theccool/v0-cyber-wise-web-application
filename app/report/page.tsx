"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, Upload, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ReportPage() {
  const [incidentType, setIncidentType] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setIncidentType("")
      setDescription("")
      setFile(null)
    }, 1500)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">Anonymous Reporting</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-2xl px-4 py-12">
        {/* Privacy Notice */}
        <div className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex gap-3">
            <Shield className="h-5 w-5 shrink-0 text-primary" />
            <div>
              <h3 className="mb-1 font-semibold text-primary">Your Identity is Protected</h3>
              <p className="text-sm text-muted-foreground">
                This form is completely anonymous. We do not collect any identifying information. Your report will be
                reviewed by trained counselors who can provide appropriate support and intervention.
              </p>
            </div>
          </div>
        </div>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-2xl font-bold">Report an Incident</h2>

            {/* Incident Type */}
            <div className="mb-6">
              <Label htmlFor="incident-type" className="mb-2 block text-sm font-medium">
                Incident Type <span className="text-destructive">*</span>
              </Label>
              <Select value={incidentType} onValueChange={setIncidentType} required>
                <SelectTrigger id="incident-type" className="w-full">
                  <SelectValue placeholder="Select incident type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cyberbullying">Cyberbullying</SelectItem>
                  <SelectItem value="harassment">Harassment</SelectItem>
                  <SelectItem value="scam">Scam / Phishing</SelectItem>
                  <SelectItem value="impersonation">Impersonation</SelectItem>
                  <SelectItem value="threats">Threats or Violence</SelectItem>
                  <SelectItem value="inappropriate-content">Inappropriate Content</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="mb-2 block text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please describe what happened. Include as much detail as you're comfortable sharing, such as when it occurred, who was involved (if known), and how it affected you."
                className="min-h-[200px] resize-none"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                The more details you provide, the better we can help. But only share what you're comfortable with.
              </p>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <Label htmlFor="file-upload" className="mb-2 block text-sm font-medium">
                Evidence (Optional)
              </Label>
              <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-6 text-center transition-colors hover:border-primary/50">
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="mb-1 text-sm font-medium">
                    {file ? file.name : "Click to upload screenshots or documents"}
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
                </label>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2 font-medium text-foreground">Important Information:</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Reports are reviewed within 24 hours</li>
                    <li>Urgent situations may require immediate action</li>
                    <li>You can submit multiple reports if needed</li>
                    <li>Consider also talking to a trusted adult or counselor</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !incidentType || !description}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>

        {/* Additional Resources */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold">Need Immediate Help?</h3>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              If you're in immediate danger or experiencing a crisis, please reach out to these resources:
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <span>Crisis Text Line</span>
                <span className="font-mono text-primary">Text HOME to 741741</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <span>National Suicide Prevention</span>
                <span className="font-mono text-primary">988</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <span>Cyberbullying Hotline</span>
                <span className="font-mono text-primary">1-800-273-8255</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <DialogTitle className="text-center text-2xl">Report Submitted Successfully</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for your courage in reporting this incident. Your report has been received and will be reviewed
              by our team within 24 hours. Remember, you're not alone, and help is available.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setShowSuccess(false)} className="w-full">
              Submit Another Report
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/chatbot">Talk to Support Chat</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
