"use client";

import { useState } from "react";
import {
  Bot,
  Play,
  Pause,
  Settings,
  BarChart3,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "recruitment",
    name: "Recruitment Agent",
    description: "Sources and attracts top talent, optimizes job postings",
    status: "active",
    tasksCompleted: 342,
    successRate: 94,
    lastActive: "2 min ago",
  },
  {
    id: "screening",
    name: "Screening Agent",
    description: "Analyzes resumes and ranks candidates objectively",
    status: "active",
    tasksCompleted: 1247,
    successRate: 91,
    lastActive: "5 min ago",
  },
  {
    id: "interview",
    name: "Interview Agent",
    description: "Manages interview scheduling and generates questions",
    status: "active",
    tasksCompleted: 189,
    successRate: 96,
    lastActive: "12 min ago",
  },
  {
    id: "onboarding",
    name: "Onboarding Agent",
    description: "Creates personalized onboarding plans for new hires",
    status: "active",
    tasksCompleted: 87,
    successRate: 98,
    lastActive: "1 hour ago",
  },
  {
    id: "payroll",
    name: "Payroll Agent",
    description: "Verifies payroll calculations and detects anomalies",
    status: "active",
    tasksCompleted: 456,
    successRate: 99,
    lastActive: "3 hours ago",
  },
  {
    id: "compliance",
    name: "Compliance Agent",
    description: "Monitors regulatory compliance and tracks certifications",
    status: "active",
    tasksCompleted: 234,
    successRate: 97,
    lastActive: "30 min ago",
  },
  {
    id: "performance",
    name: "Performance Agent",
    description: "Analyzes performance data and predicts retention",
    status: "active",
    tasksCompleted: 156,
    successRate: 88,
    lastActive: "2 hours ago",
  },
  {
    id: "learning",
    name: "Learning Agent",
    description: "Recommends personalized learning paths",
    status: "idle",
    tasksCompleted: 98,
    successRate: 92,
    lastActive: "1 day ago",
  },
  {
    id: "exit",
    name: "Exit Agent",
    description: "Manages offboarding and analyzes attrition patterns",
    status: "idle",
    tasksCompleted: 45,
    successRate: 95,
    lastActive: "5 days ago",
  },
];

const workflows = [
  {
    id: "new_hire_pipeline",
    name: "New Hire Pipeline",
    trigger: "job_posting_created",
    steps: 4,
    lastRun: "2 hours ago",
    status: "success",
    runs: 23,
  },
  {
    id: "performance_review_cycle",
    name: "Performance Review Cycle",
    trigger: "review_period_start",
    steps: 3,
    lastRun: "1 day ago",
    status: "success",
    runs: 8,
  },
  {
    id: "payroll_processing",
    name: "Payroll Processing",
    trigger: "payroll_run_initiated",
    steps: 3,
    lastRun: "3 days ago",
    status: "success",
    runs: 12,
  },
  {
    id: "employee_exit",
    name: "Employee Exit",
    trigger: "resignation_submitted",
    steps: 3,
    lastRun: "2 weeks ago",
    status: "success",
    runs: 4,
  },
  {
    id: "compliance_monitoring",
    name: "Compliance Monitoring",
    trigger: "scheduled_daily",
    steps: 3,
    lastRun: "6 hours ago",
    status: "warning",
    runs: 180,
  },
];

const recentInsights = [
  {
    type: "retention",
    title: "Retention Risk Alert",
    summary: "3 employees show high flight risk based on engagement patterns",
    confidence: 87,
    time: "2 hours ago",
  },
  {
    type: "hiring",
    title: "Hiring Velocity Alert",
    summary: "Time-to-hire is 8 days above target for technical roles",
    confidence: 92,
    time: "5 hours ago",
  },
  {
    type: "learning",
    title: "Training Gap Identified",
    summary: "47 employees need cybersecurity training renewal by Jun 30",
    confidence: 95,
    time: "1 day ago",
  },
  {
    type: "payroll",
    title: "Overtime Cost Increase",
    summary: "Sales department overtime up 15% month-over-month",
    confidence: 89,
    time: "2 days ago",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  idle: "bg-gray-100 text-gray-700",
  error: "bg-red-100 text-red-700",
  success: "text-green-600",
  warning: "text-yellow-600",
};

export default function AIDashboardPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const avgSuccessRate =
    agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">AI Agent Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your AI-powered HR agents
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium hover:bg-muted">
            <Settings size={16} />
            Configure
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <Play size={16} />
            Run All
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Agents</p>
            <Bot size={18} className="text-blue-600" />
          </div>
          <p className="mt-2 text-3xl font-bold">{agents.length}</p>
          <p className="text-sm text-green-600">
            {agents.filter((a) => a.status === "active").length} active
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Tasks Completed</p>
            <Zap size={18} className="text-purple-600" />
          </div>
          <p className="mt-2 text-3xl font-bold">{totalTasks.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">This month</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg Success Rate</p>
            <CheckCircle size={18} className="text-green-600" />
          </div>
          <p className="mt-2 text-3xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
          <p className="text-sm text-green-600">+2.3% from last month</p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Active Workflows</p>
            <BarChart3 size={18} className="text-orange-600" />
          </div>
          <p className="mt-2 text-3xl font-bold">
            {workflows.filter((w) => w.status === "success").length}
          </p>
          <p className="text-sm text-muted-foreground">
            {workflows.length} total workflows
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">AI Agents</h2>
          <div className="space-y-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={cn(
                  "cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md",
                  selectedAgent === agent.id
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50"
                )}
                onClick={() =>
                  setSelectedAgent(
                    selectedAgent === agent.id ? null : agent.id
                  )
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Bot size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {agent.tasksCompleted} tasks
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {agent.lastActive}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusColors[agent.status]
                      )}
                    >
                      {agent.status}
                    </span>
                  </div>
                </div>
                {selectedAgent === agent.id && (
                  <div className="mt-4 border-t pt-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Success Rate
                        </p>
                        <p className="text-lg font-semibold">
                          {agent.successRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Tasks Today
                        </p>
                        <p className="text-lg font-semibold">
                          {Math.floor(agent.tasksCompleted / 30)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Avg Response
                        </p>
                        <p className="text-lg font-semibold">1.2s</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Workflows</h2>
            <div className="space-y-3">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{workflow.name}</h3>
                    {workflow.status === "success" ? (
                      <CheckCircle size={14} className="text-green-600" />
                    ) : (
                      <AlertTriangle size={14} className="text-yellow-600" />
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{workflow.steps} steps</span>
                    <span>{workflow.runs} runs</span>
                    <span>{workflow.lastRun}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Recent Insights</h2>
            <div className="space-y-3">
              {recentInsights.map((insight, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{insight.title}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {insight.summary}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {insight.confidence}%
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Clock size={10} />
                    <span className="text-xs text-muted-foreground">
                      {insight.time}
                    </span>
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
