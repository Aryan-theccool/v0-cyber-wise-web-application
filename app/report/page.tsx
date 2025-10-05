"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, Upload, CheckCircle2, AlertCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function ReportPage() {
  const { t } = useTranslation();
  const [incidentType, setIncidentType] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [shareWithCybercrime, setShareWithCybercrime] = useState(false)
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

    // Simulate submission delay (1.5 seconds)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // ========================================
      // 📧 EMAIL AUTOMATION LOGIC (CONDITIONAL)
      // ========================================
      // Only send email to cybercrime branch if user checked the box
      // This gives users control over whether to escalate to authorities
      
      if (shareWithCybercrime) {
        // User opted to share with cybercrime authorities
        console.log("✅ User opted to share with Cyber Crime Branch - Opening email client...")
        
        // Email recipient - Official cybercrime branch (CyberDost)
        const email = "cyberdost@mha.gov.in"
        
        // Email subject - clearly identifies this as an anonymous report
        const subject = encodeURIComponent("Anonymous Cyber Incident Report")
        
        // Email body - includes all incident details
        const body = encodeURIComponent(
          `Dear Cyber Crime Cell,

A new cyber incident has been reported anonymously through the CyberWise platform.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INCIDENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Incident Type: ${incidentType}

Description:
${description}

Evidence File: ${file ? `A file named "${file.name}" was uploaded by the reporter.` : "No evidence file was attached."}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT NOTICE:
The reporter's identity remains completely confidential and anonymous as per platform policy. Please review this incident and take appropriate action.

This report was submitted via CyberWise - Student Cyber Safety Platform

Regards,
CyberWise Reporting System`
        )

        // Construct mailto URL with all parameters
        const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`
        
        // Open default email client with pre-filled details
        // This works on all platforms (Windows, Mac, Linux, Mobile)
        window.location.href = mailtoLink
        
        console.log("📧 Email client opened with pre-filled report details")
      } else {
        // User chose not to share with cybercrime branch
        console.log("ℹ️ User opted NOT to share with Cyber Crime Branch - Report saved locally only")
      }

      // ========================================
      // 🔄 FORM RESET
      // ========================================
      // Clear all form fields after successful submission
      setIncidentType("")
      setDescription("")
      setFile(null)
      setShareWithCybercrime(false) // Reset checkbox too
      
      // Note: The file input element will also be cleared
      // because the file state is reset to null
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
              <span className="font-semibold">{t("report.title")}</span>
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
              <h3 className="mb-1 font-semibold text-primary">{t("report.identityProtected")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("report.anonymousNotice")}
              </p>
            </div>
          </div>
        </div>

        {/* Report Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-6 text-2xl font-bold">{t("report.reportIncident")}</h2>

            {/* Incident Type */}
            <div className="mb-6">
              <Label htmlFor="incident-type" className="mb-2 block text-sm font-medium">
                {t("report.incidentType")} <span className="text-destructive">*</span>
              </Label>
              <Select value={incidentType} onValueChange={setIncidentType} required>
                <SelectTrigger id="incident-type" className="w-full">
                  <SelectValue placeholder={t("report.selectIncidentType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cyberbullying">{t("report.cyberbullying")}</SelectItem>
                  <SelectItem value="harassment">{t("report.harassment")}</SelectItem>
                  <SelectItem value="scam">{t("report.scam")}</SelectItem>
                  <SelectItem value="impersonation">{t("report.impersonation")}</SelectItem>
                  <SelectItem value="threats">{t("report.threats")}</SelectItem>
                  <SelectItem value="inappropriate-content">{t("report.inappropriateContent")}</SelectItem>
                  <SelectItem value="other">{t("report.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="mb-6">
              <Label htmlFor="description" className="mb-2 block text-sm font-medium">
                {t("report.description")} <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t("report.descriptionPlaceholder")}
                className="min-h-[200px] resize-none"
                required
              />
              <p className="mt-2 text-xs text-muted-foreground">
                {t("report.detailsNote")}
              </p>
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <Label htmlFor="file-upload" className="mb-2 block text-sm font-medium">
                {t("report.evidence")}
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
                    {file ? file.name : t("report.uploadPrompt")}
                  </p>
                  <p className="text-xs text-muted-foreground">{t("report.fileTypes")}</p>
                </label>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mb-6 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2 font-medium text-foreground">{t("report.importantInfo")}</p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>{t("report.reviewTime")}</li>
                    <li>{t("report.urgentAction")}</li>
                    <li>{t("report.multipleReports")}</li>
                    <li>{t("report.talkToAdult")}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Share with Cyber Crime Branch Checkbox */}
            <div className="mb-6 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="share-cybercrime"
                  checked={shareWithCybercrime}
                  onCheckedChange={(checked) => setShareWithCybercrime(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor="share-cybercrime"
                    className="flex cursor-pointer items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span>Share with Cyber Crime Branch</span>
                  </label>
                  <p className="mt-2 text-xs text-muted-foreground">
                    By checking this box, your report will be automatically forwarded to{" "}
                    <span className="font-mono text-primary">cyberdost@mha.gov.in</span> (Ministry of Home Affairs - CyberDost) for official investigation.
                    Your identity will remain anonymous.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !incidentType || !description}>
              {isSubmitting ? t("report.submitting") : t("report.submitReport")}
            </Button>
          </div>
        </form>

        {/* Additional Resources */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold">{t("report.needHelp")}</h3>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              {t("report.crisisMessage")}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <span>{t("report.crisisTextLine")}</span>
                <span className="font-mono text-primary">Text HOME to 741741</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <span>{t("report.suicidePrevention")}</span>
                <span className="font-mono text-primary">988</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
                <span>{t("report.cyberbullyingHotline")}</span>
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
            <DialogTitle className="text-center text-2xl">{t("report.successTitle")}</DialogTitle>
            <DialogDescription className="text-center">
              {t("report.successMessage")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Button onClick={() => setShowSuccess(false)} className="w-full">
              {t("report.submitAnother")}
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/chatbot">{t("report.talkToSupport")}</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
