"use client";

import { useState } from "react";
import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Calendar,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MessageSquare,
  Zap,
  Target,
  Eye,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    sparkline: [40, 45, 42, 50, 48, 55, 52, 60, 58, 65],
  },
  {
    title: "Open Positions",
    value: "34",
    change: "+5 this week",
    trend: "up" as const,
    icon: Briefcase,
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    sparkline: [20, 22, 25, 23, 28, 30, 27, 32, 34, 34],
  },
  {
    title: "Pending Leave",
    value: "18",
    change: "-3 from yesterday",
    trend: "down" as const,
    icon: Calendar,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    sparkline: [30, 28, 25, 22, 20, 18, 19, 17, 18, 18],
  },
  {
    title: "Attendance Today",
    value: "94.2%",
    change: "+0.8%",
    trend: "up" as const,
    icon: Clock,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    sparkline: [90, 91, 92, 91, 93, 92, 94, 93, 94, 94],
  },
];

const aiInsights = [
  {
    id: 1,
    type: "risk",
    title: "Retention Risk Alert",
    description:
      "3 senior engineers show disengagement signals. Flight risk: 87%. Recommend 1:1 check-ins within 48 hours.",
    confidence: 87,
    priority: "high",
    impact: "High",
    agents: ["Performance", "Exit"],
    actions: ["Schedule 1:1", "Review compensation", "Send pulse survey"],
  },
  {
    id: 2,
    type: "hiring",
    title: "Hiring Pipeline Bottleneck",
    description:
      "Full Stack Developer role stalled at interview stage for 14 days. 12 candidates waiting. Consider adding interview slots.",
    confidence: 92,
    priority: "high",
    impact: "Medium",
    agents: ["Recruitment", "Interview"],
    actions: ["Add interview slots", "Reassign interviewer", "Send updates"],
  },
  {
    id: 3,
    type: "compliance",
    title: "Training Gap Detected",
    description:
      "47 employees (18%) haven't completed mandatory cybersecurity training. Deadline: Jun 30.",
    confidence: 95,
    priority: "medium",
    impact: "High",
    agents: ["Compliance", "Learning"],
    actions: ["Send reminders", "Block access", "Escalate to manager"],
  },
  {
    id: 4,
    type: "payroll",
    title: "Overtime Cost Spike",
    description:
      "Sales department overtime increased 22% month-over-month. 8 employees over 20hrs OT. Review workload distribution.",
    confidence: 89,
    priority: "medium",
    impact: "Medium",
    agents: ["Payroll"],
    actions: ["View breakdown", "Contact managers", "Set alerts"],
  },
];

const recentActivity = [
  {
    type: "hire",
    user: "Sarah Chen",
    action: "accepted offer for Senior Engineer",
    time: "2 hours ago",
    avatar: "SC",
    color: "bg-emerald-500",
  },
  {
    type: "leave",
    user: "James Wilson",
    action: "requested 5 days annual leave",
    time: "3 hours ago",
    avatar: "JW",
    color: "bg-blue-500",
  },
  {
    type: "performance",
    user: "Q1 Reviews",
    action: "initiated for Engineering (23 people)",
    time: "5 hours ago",
    avatar: "Q1",
    color: "bg-purple-500",
  },
  {
    type: "compliance",
    user: "Training",
    action: "deadline in 14 days for 47 employees",
    time: "6 hours ago",
    avatar: "CT",
    color: "bg-amber-500",
  },
  {
    type: "payroll",
    user: "May Payroll",
    action: "processed successfully ($2.4M)",
    time: "1 day ago",
    avatar: "MP",
    color: "bg-emerald-500",
  },
];

const upcomingEvents = [
  {
    event: "Q2 Performance Review",
    date: "Jun 30",
    daysLeft: 23,
    icon: Target,
    color: "text-blue-600",
  },
  {
    event: "Payroll Processing",
    date: "Jun 15",
    daysLeft: 8,
    icon: DollarSign,
    color: "text-emerald-600",
  },
  {
    event: "All-Hands Meeting",
    date: "Jun 10",
    daysLeft: 3,
    icon: Users,
    color: "text-purple-600",
  },
  {
    event: "Compliance Training Due",
    date: "Jun 30",
    daysLeft: 23,
    icon: AlertTriangle,
    color: "text-amber-600",
  },
];

const teamMetrics = [
  { name: "Engineering", headcount: 342, hiring: 8, turnover: "4.2%", satisfaction: 88 },
  { name: "Sales", headcount: 256, hiring: 5, turnover: "7.1%", satisfaction: 82 },
  { name: "Marketing", headcount: 89, hiring: 2, turnover: "3.8%", satisfaction: 91 },
  { name: "Operations", headcount: 178, hiring: 3, turnover: "5.5%", satisfaction: 85 },
  { name: "Finance", headcount: 67, hiring: 1, turnover: "2.1%", satisfaction: 89 },
];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 100}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="sparkline" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DashboardPage() {
  const [aiMessage, setAiMessage] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Good afternoon, Admin</h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening across your organization today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Eye size={16} />
            View Reports
          </button>
        </div>
      </div>

      {/* Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="stat-card group">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className={cn("rounded-lg p-2", stat.bg)}>
                    <Icon size={18} className={stat.color.split(" ")[0].replace("from-", "text-")} />
                  </div>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                    <p className={cn(
                      "mt-1 flex items-center gap-1 text-xs font-medium",
                      stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                    )}>
                      {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      {stat.change}
                    </p>
                  </div>
                  <MiniSparkline data={stat.sparkline} color="hsl(var(--primary))" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights Section - Workday-style cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Brain size={16} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all insights <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 stagger-children">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className={cn("ai-insight-card p-5", insight.priority)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <span className={cn(
                      "badge",
                      insight.priority === "high" ? "badge-danger" : "badge-warning"
                    )}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {insight.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {insight.agents.map((agent) => (
                      <span key={agent} className="badge badge-info">
                        <Sparkles size={10} className="mr-1" />
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Zap size={12} className="text-amber-500" />
                    {insight.confidence}%
                  </div>
                  <p className="text-xs text-muted-foreground">confidence</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {insight.actions.map((action) => (
                  <button
                    key={action}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    {action}
                    <ArrowRight size={10} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Performance - Workday-style data table */}
        <div className="lg:col-span-2 card-enterprise">
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Department Overview</h2>
              <button className="text-sm font-medium text-primary hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Headcount</th>
                  <th>Open Roles</th>
                  <th>Turnover</th>
                  <th>Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {teamMetrics.map((dept) => (
                  <tr key={dept.name}>
                    <td>
                      <span className="font-medium">{dept.name}</span>
                    </td>
                    <td>{dept.headcount}</td>
                    <td>
                      <span className="badge badge-info">{dept.hiring}</span>
                    </td>
                    <td>
                      <span className={cn(
                        "font-medium",
                        parseFloat(dept.turnover) > 6 ? "text-red-600" : "text-emerald-600"
                      )}>
                        {dept.turnover}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar w-20">
                          <div
                            className={cn(
                              "progress-bar-fill",
                              dept.satisfaction >= 90
                                ? "bg-emerald-500"
                                : dept.satisfaction >= 80
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            )}
                            style={{ width: `${dept.satisfaction}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{dept.satisfaction}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="card-enterprise p-5">
            <h2 className="mb-4 font-semibold">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.event}
                    className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-muted", event.color)}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-semibold",
                      event.daysLeft <= 7
                        ? "bg-red-50 text-red-700"
                        : event.daysLeft <= 14
                          ? "bg-amber-50 text-amber-700"
                          : "bg-emerald-50 text-emerald-700"
                    )}>
                      {event.daysLeft}d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity - BambooHR style with avatars */}
          <div className="card-enterprise p-5">
            <h2 className="mb-4 font-semibold">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white",
                    activity.color
                  )}>
                    {activity.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Copilot Floating Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="ai-fab"
      >
        <MessageSquare size={24} />
      </button>

      {/* AI Chat Panel */}
      {showChat && (
        <div className="fixed bottom-24 right-6 z-50 w-96 animate-scale-in">
          <div className="card-enterprise shadow-2xl">
            <div className="flex items-center gap-3 border-b p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">AI HR Assistant</h3>
                <p className="text-xs text-muted-foreground">Ask me anything about your workforce</p>
              </div>
            </div>
            <div className="h-64 overflow-y-auto p-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles size={12} className="text-primary" />
                  </div>
                  <div className="rounded-lg rounded-tl-none bg-muted p-3 text-sm">
                    Hello! I can help you with employee insights, compliance status, payroll questions, and more. What would you like to know?
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about your workforce..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Ask
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Who's at risk of leaving?", "Show payroll summary", "Compliance status"].map((q) => (
                  <button
                    key={q}
                    className="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
