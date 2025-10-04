"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, Plus, Smile, Meh, Frown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface JournalEntry {
  id: string
  content: string
  mood: "happy" | "neutral" | "sad"
  date: Date
}

const demoEntries: JournalEntry[] = [
  {
    id: "1",
    content:
      "Today was a good day. I talked to my counselor about the issues I've been having, and they were really supportive. I feel like I'm making progress.",
    mood: "happy",
    date: new Date("2025-02-10"),
  },
  {
    id: "2",
    content:
      "Feeling a bit overwhelmed with everything going on. But I'm trying to stay positive and take things one day at a time.",
    mood: "neutral",
    date: new Date("2025-02-08"),
  },
  {
    id: "3",
    content:
      "Had a tough day today. The bullying situation is still bothering me, but I'm glad I have this space to write about it.",
    mood: "sad",
    date: new Date("2025-02-05"),
  },
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad">("neutral")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setEntries(demoEntries)
  }, [])

  const handleSaveEntry = () => {
    if (!newEntry.trim()) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      content: newEntry,
      mood: selectedMood,
      date: new Date(),
    }

    setEntries([entry, ...entries])
    setNewEntry("")
    setSelectedMood("neutral")
    setIsDialogOpen(false)
  }

  const getMoodIcon = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return <Smile className="h-5 w-5 text-green-500" />
      case "neutral":
        return <Meh className="h-5 w-5 text-yellow-500" />
      case "sad":
        return <Frown className="h-5 w-5 text-red-500" />
    }
  }

  const getMoodColor = (mood: "happy" | "neutral" | "sad") => {
    switch (mood) {
      case "happy":
        return "border-green-500/20 bg-green-500/5"
      case "neutral":
        return "border-yellow-500/20 bg-yellow-500/5"
      case "sad":
        return "border-red-500/20 bg-red-500/5"
    }
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
              <span className="font-semibold">Digital Journal</span>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Journal Entry</DialogTitle>
                <DialogDescription>
                  Express your feelings in this safe, private space. Your entries are only visible to you.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label className="mb-2 block text-sm font-medium">How are you feeling?</Label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedMood("happy")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                        selectedMood === "happy"
                          ? "border-green-500 bg-green-500/10"
                          : "border-border hover:border-green-500/50"
                      }`}
                    >
                      <Smile className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Happy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMood("neutral")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                        selectedMood === "neutral"
                          ? "border-yellow-500 bg-yellow-500/10"
                          : "border-border hover:border-yellow-500/50"
                      }`}
                    >
                      <Meh className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium">Neutral</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMood("sad")}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all ${
                        selectedMood === "sad"
                          ? "border-red-500 bg-red-500/10"
                          : "border-border hover:border-red-500/50"
                      }`}
                    >
                      <Frown className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-medium">Sad</span>
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="entry-content" className="mb-2 block text-sm font-medium">
                    What's on your mind?
                  </Label>
                  <Textarea
                    id="entry-content"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="Write about your day, your feelings, or anything you'd like to express..."
                    className="min-h-[200px] resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveEntry} disabled={!newEntry.trim()} className="flex-1">
                  Save Entry
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Welcome Card */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>Your Safe Space</CardTitle>
            <CardDescription>
              This is your private journal where you can express your thoughts and feelings freely. No one else can see
              your entries.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Entries Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Entries</h2>

          {entries.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No entries yet</h3>
                <p className="mb-4 text-center text-sm text-muted-foreground">
                  Start journaling to track your thoughts and feelings
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Entry
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <Card key={entry.id} className={`${getMoodColor(entry.mood)}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getMoodIcon(entry.mood)}
                        <span className="text-sm font-medium capitalize">{entry.mood}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {entry.date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-foreground">{entry.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Mood Insights */}
        {entries.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Mood Insights</CardTitle>
              <CardDescription>Your emotional journey over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 text-center">
                  <Smile className="mx-auto mb-2 h-8 w-8 text-green-500" />
                  <div className="text-2xl font-bold">{entries.filter((e) => e.mood === "happy").length}</div>
                  <div className="text-sm text-muted-foreground">Happy Days</div>
                </div>
                <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
                  <Meh className="mx-auto mb-2 h-8 w-8 text-yellow-500" />
                  <div className="text-2xl font-bold">{entries.filter((e) => e.mood === "neutral").length}</div>
                  <div className="text-sm text-muted-foreground">Neutral Days</div>
                </div>
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-center">
                  <Frown className="mx-auto mb-2 h-8 w-8 text-red-500" />
                  <div className="text-2xl font-bold">{entries.filter((e) => e.mood === "sad").length}</div>
                  <div className="text-sm text-muted-foreground">Difficult Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
