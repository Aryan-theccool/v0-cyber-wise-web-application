"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Shield, ArrowLeft, TrendingUp, AlertTriangle, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Demo data
const dataByTimeframe = {
  "7days": {
    stats: {
      totalReports: 18,
      activeCases: 5,
      resolved: 13,
      avgResponseTime: "6.2h",
      reportsTrend: "+8%",
      activeTrend: "+2",
      resolvedRate: "72%",
      responseImprovement: "-1.5h",
    },
    incidentData: [
      { month: "Mon", reports: 2, resolved: 1 },
      { month: "Tue", reports: 3, resolved: 3 },
      { month: "Wed", reports: 4, resolved: 3 },
      { month: "Thu", reports: 2, resolved: 2 },
      { month: "Fri", reports: 3, resolved: 2 },
      { month: "Sat", reports: 2, resolved: 1 },
      { month: "Sun", reports: 2, resolved: 1 },
    ],
    moodData: [
      { day: "Mon", positive: 65, neutral: 25, negative: 10 },
      { day: "Tue", positive: 70, neutral: 20, negative: 10 },
      { day: "Wed", positive: 60, neutral: 30, negative: 10 },
      { day: "Thu", positive: 75, neutral: 15, negative: 10 },
      { day: "Fri", positive: 80, neutral: 15, negative: 5 },
      { day: "Sat", positive: 72, neutral: 20, negative: 8 },
      { day: "Sun", positive: 68, neutral: 22, negative: 10 },
    ],
  },
  "30days": {
    stats: {
      totalReports: 56,
      activeCases: 12,
      resolved: 44,
      avgResponseTime: "7.8h",
      reportsTrend: "+15%",
      activeTrend: "+4",
      resolvedRate: "79%",
      responseImprovement: "-1.8h",
    },
    incidentData: [
      { month: "Week 1", reports: 12, resolved: 10 },
      { month: "Week 2", reports: 15, resolved: 12 },
      { month: "Week 3", reports: 14, resolved: 11 },
      { month: "Week 4", reports: 15, resolved: 11 },
    ],
    moodData: [
      { day: "Week 1", positive: 68, neutral: 22, negative: 10 },
      { day: "Week 2", positive: 72, neutral: 20, negative: 8 },
      { day: "Week 3", positive: 65, neutral: 25, negative: 10 },
      { day: "Week 4", positive: 75, neutral: 18, negative: 7 },
    ],
  },
  "6months": {
    stats: {
      totalReports: 121,
      activeCases: 28,
      resolved: 93,
      avgResponseTime: "8.5h",
      reportsTrend: "+12%",
      activeTrend: "+3",
      resolvedRate: "77%",
      responseImprovement: "-2.3h",
    },
    incidentData: [
      { month: "Jan", reports: 12, resolved: 10 },
      { month: "Feb", reports: 19, resolved: 16 },
      { month: "Mar", reports: 15, resolved: 14 },
      { month: "Apr", reports: 22, resolved: 18 },
      { month: "May", reports: 28, resolved: 24 },
      { month: "Jun", reports: 25, resolved: 23 },
    ],
    moodData: [
      { day: "Jan", positive: 65, neutral: 25, negative: 10 },
      { day: "Feb", positive: 70, neutral: 20, negative: 10 },
      { day: "Mar", positive: 60, neutral: 30, negative: 10 },
      { day: "Apr", positive: 75, neutral: 15, negative: 10 },
      { day: "May", positive: 80, neutral: 15, negative: 5 },
      { day: "Jun", positive: 78, neutral: 17, negative: 5 },
    ],
  },
  "1year": {
    stats: {
      totalReports: 284,
      activeCases: 28,
      resolved: 256,
      avgResponseTime: "9.2h",
      reportsTrend: "+18%",
      activeTrend: "+3",
      resolvedRate: "90%",
      responseImprovement: "-3.1h",
    },
    incidentData: [
      { month: "Jul", reports: 18, resolved: 17 },
      { month: "Aug", reports: 22, resolved: 20 },
      { month: "Sep", reports: 25, resolved: 23 },
      { month: "Oct", reports: 28, resolved: 26 },
      { month: "Nov", reports: 24, resolved: 22 },
      { month: "Dec", reports: 20, resolved: 19 },
      { month: "Jan", reports: 12, resolved: 10 },
      { month: "Feb", reports: 19, resolved: 16 },
      { month: "Mar", reports: 15, resolved: 14 },
      { month: "Apr", reports: 22, resolved: 18 },
      { month: "May", reports: 28, resolved: 24 },
      { month: "Jun", reports: 25, resolved: 23 },
    ],
    moodData: [
      { day: "Q1", positive: 65, neutral: 25, negative: 10 },
      { day: "Q2", positive: 72, neutral: 20, negative: 8 },
      { day: "Q3", positive: 68, neutral: 22, negative: 10 },
      { day: "Q4", positive: 78, neutral: 17, negative: 5 },
    ],
  },
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("6months")

  const currentData = useMemo(() => {
    return dataByTimeframe[timeRange as keyof typeof dataByTimeframe]
  }, [timeRange])

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
              <div className="text-2xl font-bold">{currentData.stats.totalReports}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{currentData.stats.reportsTrend}</span> from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.stats.activeCases}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-yellow-500">{currentData.stats.activeTrend}</span> new this period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.stats.resolved}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{currentData.stats.resolvedRate}</span> resolution rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.stats.avgResponseTime}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">{currentData.stats.responseImprovement}</span> improvement
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
              <CardDescription>Report submissions and resolutions for selected period</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <ChartContainer
                config={{
                  reports: {
                    label: "Reports",
                    color: "#4A90E2",
                  },
                  resolved: {
                    label: "Resolved",
                    color: "#1ABC9C",
                  },
                }}
                className="h-[300px] w-full"
              >
                <AreaChart data={currentData.incidentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="reports" stroke="#4A90E2" fill="#4A90E2" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="resolved" stroke="#1ABC9C" fill="#1ABC9C" fillOpacity={0.2} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Mood Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Student Mood Trends</CardTitle>
              <CardDescription>Mood tracking from journal entries for selected period</CardDescription>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <ChartContainer
                config={{
                  positive: {
                    label: "Positive",
                    color: "#4A90E2",
                  },
                  neutral: {
                    label: "Neutral",
                    color: "#1ABC9C",
                  },
                  negative: {
                    label: "Negative",
                    color: "#DC2626",
                  },
                }}
                className="h-[300px] w-full"
              >
                <BarChart data={currentData.moodData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="positive" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="neutral" fill="#1ABC9C" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="negative" fill="#DC2626" radius={[4, 4, 0, 0]} />
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
              {[
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
              ].map((report) => (
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
