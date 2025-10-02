"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, TrendingUp, AlertTriangle, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Demo data
const incidentData = [
  { month: "Jan", reports: 12, resolved: 10 },
  { month: "Feb", reports: 19, resolved: 16 },
  { month: "Mar", reports: 15, resolved: 14 },
  { month: "Apr", reports: 22, resolved: 18 },
  { month: "May", reports: 28, resolved: 24 },
  { month: "Jun", reports: 25, resolved: 23 },
]

const moodData = [
  { day: "Mon", positive: 65, neutral: 25, negative: 10 },
  { day: "Tue", positive: 70, neutral: 20, negative: 10 },
  { day: "Wed", positive: 60, neutral: 30, negative: 10 },
  { day: "Thu", positive: 75, neutral: 15, negative: 10 },
  { day: "Fri", positive: 80, neutral: 15, negative: 5 },
]

const recentReports = [
  {
    id: 1,
    type: "Cyberbullying",
    date: "2025-02-10",
    status: "Under Review",
    priority: "High",
  },
  {
    id: 2,
    type: "Harassment",
    date: "2025-02-09",
    status: "Resolved",
    priority: "Medium",
  },
  {
    id: 3,
    type: "Scam",
    date: "2025-02-09",
    status: "In Progress",
    priority: "Low",
  },
  {
    id: 4,
    type: "Threats",
    date: "2025-02-08",
    status: "Under Review",
    priority: "High",
  },
  {
    id: 5,
    type: "Inappropriate Content",
    date: "2025-02-07",
    status: "Resolved",
    priority: "Medium",
  },
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("6months")

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
              <span className="font-semibold">Counselor Dashboard</span>
            </div>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">121</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-500">+3</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">93</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">77%</span> resolution rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5h</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">-2.3h</span> improvement
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Incident Reports Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Reports Over Time</CardTitle>
              <CardDescription>Monthly report submissions and resolutions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  reports: {
                    label: "Reports",
                    color: "hsl(var(--chart-1))",
                  },
                  resolved: {
                    label: "Resolved",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart data={incidentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="reports"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Mood Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Student Mood Trends</CardTitle>
              <CardDescription>Weekly mood tracking from journal entries</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  positive: {
                    label: "Positive",
                    color: "hsl(var(--chart-2))",
                  },
                  neutral: {
                    label: "Neutral",
                    color: "hsl(var(--chart-3))",
                  },
                  negative: {
                    label: "Negative",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="positive" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="neutral" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="negative" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Latest incident reports requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        report.priority === "High"
                          ? "bg-red-500"
                          : report.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{report.type}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        report.status === "Resolved"
                          ? "bg-green-500/10 text-green-500"
                          : report.status === "In Progress"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {report.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
