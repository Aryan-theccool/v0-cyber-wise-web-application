"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, TrendingUp, BookOpen, MessageCircle, Award, Target, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function StudentDashboard() {
  const [timeframe, setTimeframe] = useState("30")

  // Personal stats
  const stats = {
    journalEntries: 24,
    moodScore: 7.8,
    reportsSubmitted: 3,
    chatbotSessions: 12,
    streakDays: 7,
    goalsCompleted: 5,
  }

  // Mood tracking data
  const moodData = [
    { date: "Week 1", mood: 6.5 },
    { date: "Week 2", mood: 7.0 },
    { date: "Week 3", mood: 7.5 },
    { date: "Week 4", mood: 7.8 },
  ]

  // Activity data
  const activityData = [
    { activity: "Journal", count: 24 },
    { activity: "Chatbot", count: 12 },
    { activity: "Reports", count: 3 },
    { activity: "Awareness", count: 8 },
  ]

  // Recent journal entries
  const recentEntries = [
    { id: 1, date: "2025-03-10", mood: "Happy", preview: "Had a great day at school today..." },
    { id: 2, date: "2025-03-09", mood: "Calm", preview: "Feeling more confident about..." },
    { id: 3, date: "2025-03-08", mood: "Anxious", preview: "Worried about the upcoming..." },
  ]

  // Achievements
  const achievements = [
    { id: 1, title: "First Steps", description: "Created your first journal entry", earned: true },
    { id: 2, title: "Week Warrior", description: "7-day journaling streak", earned: true },
    { id: 3, title: "Self Advocate", description: "Submitted your first report", earned: true },
    { id: 4, title: "Mood Master", description: "Track mood for 30 days", earned: false },
    { id: 5, title: "Awareness Champion", description: "Complete 10 awareness modules", earned: false },
  ]

  // Personal goals
  const goals = [
    { id: 1, title: "Journal daily for 30 days", progress: 80, target: 30, current: 24 },
    { id: 2, title: "Complete 5 awareness modules", progress: 60, target: 5, current: 3 },
    { id: 3, title: "Maintain positive mood trend", progress: 90, target: 100, current: 90 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">
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
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">My Progress Dashboard</h1>
          <p className="text-muted-foreground">Track your personal growth and wellbeing journey</p>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-[#4A90E2]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                Journal Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#4A90E2]">{stats.journalEntries}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#9B59B6]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Heart className="h-4 w-4" />
                Mood Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#9B59B6]">{stats.moodScore}/10</div>
              <p className="text-xs text-muted-foreground">Average this month</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#1ABC9C]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1ABC9C]">{stats.streakDays} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#34D399]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Target className="h-4 w-4" />
                Goals Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#34D399]">{stats.goalsCompleted}</div>
              <p className="text-xs text-muted-foreground">Out of 8 total</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Mood Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#9B59B6]" />
                    Mood Trend
                  </CardTitle>
                  <CardDescription>Your emotional wellbeing over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      mood: {
                        label: "Mood Score",
                        color: "#9B59B6",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={moodData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="date" className="text-xs" />
                        <YAxis domain={[0, 10]} className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="mood" stroke="#9B59B6" fill="#9B59B6" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-[#4A90E2]" />
                    Activity Summary
                  </CardTitle>
                  <CardDescription>Your engagement across features</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "#4A90E2",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="activity" className="text-xs" />
                        <YAxis className="text-xs" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="#4A90E2" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Journal Entries */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Journal Entries</CardTitle>
                <CardDescription>Your latest reflections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-4 rounded-lg border border-border p-4">
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-sm font-medium">{entry.date}</span>
                          <Badge variant="outline">{entry.mood}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.preview}</p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/journal">View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-[#1ABC9C]" />
                  Personal Goals
                </CardTitle>
                <CardDescription>Track your progress towards your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{goal.title}</h4>
                        <span className="text-sm text-muted-foreground">
                          {goal.current}/{goal.target}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{goal.progress}% complete</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Set New Goal</CardTitle>
                <CardDescription>Create a personal goal to work towards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Create New Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#34D399]" />
                  Your Achievements
                </CardTitle>
                <CardDescription>Milestones you've reached on your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`rounded-lg border p-4 ${
                        achievement.earned ? "border-[#34D399] bg-[#34D399]/5" : "border-border bg-muted/30 opacity-60"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Award
                          className={`h-5 w-5 ${achievement.earned ? "text-[#34D399]" : "text-muted-foreground"}`}
                        />
                        <h4 className="font-semibold">{achievement.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.earned && <Badge className="mt-2 bg-[#34D399] hover:bg-[#34D399]/90">Earned</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Continue your wellbeing journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/journal">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Write Journal Entry
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/chatbot">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Talk to Support Bot
                    </Link>
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                    <Link href="/awareness">
                      <Shield className="mr-2 h-4 w-4" />
                      Learn Awareness
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Stats</CardTitle>
                  <CardDescription>Your engagement this month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Journal Entries</span>
                    <span className="font-semibold">{stats.journalEntries}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chatbot Sessions</span>
                    <span className="font-semibold">{stats.chatbotSessions}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reports Submitted</span>
                    <span className="font-semibold">{stats.reportsSubmitted}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Streak</span>
                    <span className="font-semibold text-[#1ABC9C]">{stats.streakDays} days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
