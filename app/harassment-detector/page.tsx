"use client"

import { useState } from "react"
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AppNav } from "@/components/app-nav"
import { useTranslation } from "@/lib/i18n/useTranslation"

type AnalysisResult = {
  category: string
  confidence: number
  reason: string
}

export default function HarassmentDetectorPage() {
  const { t } = useTranslation()
  const [text, setText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const response = await fetch("/api/harassment-detector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          category: data.category,
          confidence: data.confidence,
          reason: data.reason,
        })
      } else {
        console.error("Analysis failed:", data.error)
      }
    } catch (error) {
      console.error("Error analyzing message:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "harassment":
        return <XCircle className="h-12 w-12 text-red-500" />
      case "bully":
        return <AlertTriangle className="h-12 w-12 text-orange-500" />
      case "fraud":
        return <AlertTriangle className="h-12 w-12 text-yellow-500" />
      case "safe":
        return <CheckCircle className="h-12 w-12 text-green-500" />
      default:
        return <Shield className="h-12 w-12 text-gray-500" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "harassment":
        return "border-red-500 bg-red-50 dark:bg-red-950/20"
      case "bully":
        return "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
      case "fraud":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      case "safe":
        return "border-green-500 bg-green-50 dark:bg-green-950/20"
      default:
        return "border-gray-500 bg-gray-50 dark:bg-gray-950/20"
    }
  }

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "harassment":
        return t("detector.harassmentDetected")
      case "bully":
        return t("detector.bullyingDetected")
      case "fraud":
        return t("detector.fraudDetected")
      case "safe":
        return t("detector.safeMessage")
      default:
        return category.toUpperCase()
    }
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "harassment":
        return t("detector.harassmentDesc")
      case "bully":
        return t("detector.bullyingDesc")
      case "fraud":
        return t("detector.fraudDesc")
      case "safe":
        return t("detector.safeDesc")
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <AppNav />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] bg-clip-text text-transparent">
              {t("detector.title")}
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            {t("detector.description")}
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("detector.analyzeMessage")}</CardTitle>
            <CardDescription>{t("detector.analyzeDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={t("detector.placeholder")}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!text.trim() || isAnalyzing}
              className="w-full bg-gradient-to-r from-[#4A90E2] via-[#9B59B6] to-[#1ABC9C] hover:opacity-90"
              size="lg"
            >
              {isAnalyzing ? t("detector.analyzing") : t("detector.analyzeButton")}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <Card className={`border-2 ${getCategoryColor(result.category)}`}>
            <CardHeader>
              <div className="flex items-center gap-4">
                {getCategoryIcon(result.category)}
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">
                    {getCategoryTitle(result.category)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t("detector.confidence")}: {(result.confidence * 100).toFixed(0)}%
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                <p className="font-semibold mb-2">{t("detector.analysis")}:</p>
                <p className="text-muted-foreground">{result.reason}</p>
              </div>

              <div className="p-4 rounded-lg bg-white/50 dark:bg-slate-800/50">
                <p className="font-semibold mb-2">{t("detector.whatThisMeans")}:</p>
                <p className="text-muted-foreground">{getCategoryDescription(result.category)}</p>
              </div>

              {result.category !== "safe" && (
                <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
                  <p className="font-semibold mb-2 text-primary">{t("detector.nextSteps")}:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>{t("detector.step1")}</li>
                    <li>{t("detector.step2")}</li>
                    <li>{t("detector.step3")}</li>
                    <li>{t("detector.step4")}</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="mt-6 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">{t("detector.howItWorks")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("detector.category1")}</p>
                <p>{t("detector.category1Desc")}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-orange-600 font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("detector.category2")}</p>
                <p>{t("detector.category2Desc")}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-950 flex items-center justify-center text-yellow-600 font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("detector.category3")}</p>
                <p>{t("detector.category3Desc")}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center text-green-600 font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("detector.category4")}</p>
                <p>{t("detector.category4Desc")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
