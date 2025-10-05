"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Send, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AppNav } from "@/components/app-nav"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  const quickReplies = [
    { id: 1, text: t("chatbot.quickReply1"), emoji: "😔" },
    { id: 2, text: t("chatbot.quickReply2"), emoji: "⚠️" },
    { id: 3, text: t("chatbot.quickReply3"), emoji: "🆘" },
    { id: 4, text: t("chatbot.quickReply4"), emoji: "😰" },
  ]

  useEffect(() => {
    setMounted(true)
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: t("chatbot.greeting"),
        timestamp: new Date(),
      },
    ])
  }, [t])

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Call Gemini AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.slice(-6), // Send last 6 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback to predefined responses if API fails
      const quickReply1 = t("chatbot.quickReply1");
      const quickReply2 = t("chatbot.quickReply2");
      const quickReply3 = t("chatbot.quickReply3");
      const quickReply4 = t("chatbot.quickReply4");
      
      const responses: Record<string, string> = {
        [quickReply1]: t("chatbot.response1"),
        [quickReply2]: t("chatbot.response2"),
        [quickReply3]: t("chatbot.response3"),
        [quickReply4]: t("chatbot.response4"),
      }

      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[textToSend] || t("chatbot.defaultResponse"),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (text: string) => {
    handleSend(text)
  }

  return (
    <div className="flex min-h-screen flex-col">
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
              <span className="font-semibold">{t("chatbot.title")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">{t("common.online")}</span>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-3xl px-4 py-8">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border bg-card"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {mounted && (
                    <p
                      className={`mt-1 text-xs ${
                        message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl border border-border bg-card px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">{t("chatbot.typing")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="border-t border-border bg-card/50">
          <div className="container mx-auto max-w-3xl px-4 py-4">
            <p className="mb-3 text-sm text-muted-foreground">{t("chatbot.quickRepliesLabel")}</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply) => (
                <Button
                  key={reply.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply.text)}
                  disabled={isLoading}
                  className="bg-background"
                >
                  <span className="mr-2">{reply.emoji}</span>
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder={t("chatbot.placeholder")}
              className="min-h-[60px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-[60px] w-[60px] shrink-0"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {t("chatbot.confidentialNote")}
          </p>
        </div>
      </div>
    </div>
  )
}
