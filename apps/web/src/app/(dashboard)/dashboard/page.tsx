"use client";

import {
  Users,
  UserCheck,
  Briefcase,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Open Positions",
    value: "34",
    change: "+5",
    icon: Briefcase,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Pending Leave Requests",
    value: "18",
    change: "-3",
    icon: Calendar,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Pending Approvals",
    value: "7",
    change: "2 urgent",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Payroll Status",
    value: "Processed",
    change: "Next: Jun 15",
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Attendance Today",
    value: "94.2%",
    change: "+0.8%",
    icon: Clock,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    title: "Active Applications",
    value: "156",
    change: "+23 this week",
    icon: TrendingUp,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Compliance Score",
    value: "96.8%",
    change: "+1.2%",
    icon: UserCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const recentActivity = [
  {
    type: "hire",
    message: "Sarah Chen accepted offer for Senior Engineer",
    time: "2 hours ago",
    color: "bg-green-500",
  },
  {
    type: "leave",
    message: "James Wilson requested 5 days annual leave",
    time: "3 hours ago",
    color: "bg-blue-500",
  },
  {
    type: "performance",
    message: "Q1 Performance reviews initiated for Engineering",
    time: "5 hours ago",
    color: "bg-purple-500",
  },
  {
    type: "compliance",
    message: "Data Protection Training deadline in 14 days",
    time: "6 hours ago",
    color: "bg-orange-500",
  },
  {
    type: "payroll",
    message: "May 2026 payroll processed successfully",
    time: "1 day ago",
    color: "bg-emerald-500",
  },
  {
    type: "recruitment",
    message: "3 new candidates for Full Stack Developer role",
    time: "1 day ago",
    color: "bg-indigo-500",
  },
];

const aiInsights = [
  {
    title: "Retention Risk Alert",
    description:
      "3 employees in Engineering show high flight risk based on engagement patterns. Consider proactive retention strategies.",
    confidence: 87,
    priority: "high",
  },
  {
    title: "Hiring Velocity",
    description:
      "Current time-to-hire is 32 days, 8 days above target. Consider streamlining interview process for technical roles.",
    confidence: 92,
    priority: "medium",
  },
  {
    title: "Learning Engagement",
    description:
      "Compliance training completion rate dropped to 78%. Recommend sending reminders to 47 employees with pending courses.",
    confidence: 95,
    priority: "high",
  },
  {
    title: "Payroll Optimization",
    description:
      "Overtime costs increased 15% month-over-month in Sales. Review workload distribution to optimize labor costs.",
    confidence: 89,
    priority: "medium",
  },
];

const upcomingEvents = [
  {
    event: "Q2 Performance Review Deadline",
    date: "Jun 30, 2026",
    daysLeft: 23,
  },
  {
    event: "Payroll Processing",
    date: "Jun 15, 2026",
    daysLeft: 8,
  },
  {
    event: "All-Hands Meeting",
    date: "Jun 10, 2026",
    daysLeft: 3,
  },
  {
    event: "Compliance Training Due",
    date: "Jun 30, 2026",
    daysLeft: 23,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening across your organization.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className={cn("rounded-lg p-2", stat.bg)}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">AI Insights</h2>
          <div className="space-y-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.title}
                className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{insight.title}</h3>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-xs font-medium",
                          insight.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {insight.priority}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.event}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-1 text-xs font-medium",
                      event.daysLeft <= 7
                        ? "bg-red-100 text-red-700"
                        : event.daysLeft <= 14
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                    )}
                  >
                    {event.daysLeft} days
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-1 h-2 w-2 rounded-full",
                      activity.color
                    )}
                  />
                  <div>
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
