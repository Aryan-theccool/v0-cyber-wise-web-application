"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Send, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickReplies = [
  { id: 1, text: "I feel bullied", emoji: "😔" },
  { id: 2, text: "I was scammed", emoji: "⚠️" },
  { id: 3, text: "I need help", emoji: "🆘" },
  { id: 4, text: "Someone is harassing me", emoji: "😰" },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm here to support you. You're in a safe space now. How can I help you today? Feel free to share what's on your mind, or use one of the quick replies below.",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "I feel bullied":
          "I'm really sorry you're going through this. Bullying is never okay, and you deserve to feel safe. Can you tell me more about what's been happening? Remember, you're not alone in this.",
        "I was scammed":
          "I'm sorry to hear that happened to you. Scams can be really upsetting. First, know that it's not your fault - scammers are very sophisticated. Can you share what kind of scam it was? This will help me guide you on the next steps.",
        "I need help":
          "I'm here for you. You've taken a brave step by reaching out. Can you tell me what's troubling you? Whether it's cyberbullying, harassment, or something else, we'll work through this together.",
        "Someone is harassing me":
          "I'm so sorry you're experiencing harassment. That must be really difficult. Your safety and wellbeing are the most important things. Can you tell me more about the situation? Have you been able to document any of the harassment?",
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          responses[textToSend] ||
          "Thank you for sharing that with me. I want you to know that what you're feeling is valid, and you're not alone. Can you tell me more about the situation so I can better support you? Remember, everything you share here is confidential.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
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
              <span className="font-semibold">AI Support Chat</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-muted-foreground">Online</span>
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
                  <p
                    className={`mt-1 text-xs ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl border border-border bg-card px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Typing...</span>
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
            <p className="mb-3 text-sm text-muted-foreground">Quick replies:</p>
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
              placeholder="Type your message here... (Press Enter to send)"
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
            Your conversations are private and confidential. We're here to support you.
          </p>
        </div>
      </div>
    </div>
  )
}
