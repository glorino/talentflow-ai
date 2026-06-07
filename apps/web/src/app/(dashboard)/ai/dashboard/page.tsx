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
  Sparkles,
  Brain,
  Activity,
  RefreshCw,
  ArrowRight,
  ChevronRight,
  Workflow,
  Shield,
  Users,
  DollarSign,
  GraduationCap,
  UserCheck,
  LogOut,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

const agents = [
  {
    id: "recruitment",
    name: "Recruitment Agent",
    description: "Sources and attracts top talent, optimizes job postings",
    icon: Users,
    status: "active" as const,
    tasksCompleted: 342,
    successRate: 94,
    lastActive: "2 min ago",
    trend: "+12%",
    color: "from-blue-500 to-blue-600",
    metrics: { today: 18, week: 87, month: 342 },
  },
  {
    id: "screening",
    name: "Screening Agent",
    description: "Analyzes resumes and ranks candidates objectively",
    icon: Target,
    status: "active" as const,
    tasksCompleted: 1247,
    successRate: 91,
    lastActive: "5 min ago",
    trend: "+8%",
    color: "from-purple-500 to-purple-600",
    metrics: { today: 45, week: 234, month: 1247 },
  },
  {
    id: "interview",
    name: "Interview Agent",
    description: "Manages interview scheduling and generates questions",
    icon: Clock,
    status: "active" as const,
    tasksCompleted: 189,
    successRate: 96,
    lastActive: "12 min ago",
    trend: "+5%",
    color: "from-amber-500 to-orange-500",
    metrics: { today: 8, week: 42, month: 189 },
  },
  {
    id: "onboarding",
    name: "Onboarding Agent",
    description: "Creates personalized onboarding plans for new hires",
    icon: UserCheck,
    status: "active" as const,
    tasksCompleted: 87,
    successRate: 98,
    lastActive: "1 hour ago",
    trend: "+3%",
    color: "from-emerald-500 to-emerald-600",
    metrics: { today: 3, week: 12, month: 87 },
  },
  {
    id: "payroll",
    name: "Payroll Agent",
    description: "Verifies payroll calculations and detects anomalies",
    icon: DollarSign,
    status: "active" as const,
    tasksCompleted: 456,
    successRate: 99,
    lastActive: "3 hours ago",
    trend: "+1%",
    color: "from-teal-500 to-teal-600",
    metrics: { today: 12, week: 89, month: 456 },
  },
  {
    id: "compliance",
    name: "Compliance Agent",
    description: "Monitors regulatory compliance and tracks certifications",
    icon: Shield,
    status: "active" as const,
    tasksCompleted: 234,
    successRate: 97,
    lastActive: "30 min ago",
    trend: "+7%",
    color: "from-red-500 to-red-600",
    metrics: { today: 8, week: 56, month: 234 },
  },
  {
    id: "performance",
    name: "Performance Agent",
    description: "Analyzes performance data and predicts retention",
    icon: TrendingUp,
    status: "active" as const,
    tasksCompleted: 156,
    successRate: 88,
    lastActive: "2 hours ago",
    trend: "+4%",
    color: "from-indigo-500 to-indigo-600",
    metrics: { today: 6, week: 34, month: 156 },
  },
  {
    id: "learning",
    name: "Learning Agent",
    description: "Recommends personalized learning paths",
    icon: GraduationCap,
    status: "idle" as const,
    tasksCompleted: 98,
    successRate: 92,
    lastActive: "1 day ago",
    trend: "+2%",
    color: "from-pink-500 to-pink-600",
    metrics: { today: 0, week: 12, month: 98 },
  },
  {
    id: "exit",
    name: "Exit Agent",
    description: "Manages offboarding and analyzes attrition patterns",
    icon: LogOut,
    status: "idle" as const,
    tasksCompleted: 45,
    successRate: 95,
    lastActive: "5 days ago",
    trend: "0%",
    color: "from-gray-500 to-gray-600",
    metrics: { today: 0, week: 2, month: 45 },
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
    nextRun: "On trigger",
    icon: Users,
  },
  {
    id: "performance_review",
    name: "Performance Review Cycle",
    trigger: "review_period_start",
    steps: 3,
    lastRun: "1 day ago",
    status: "success",
    runs: 8,
    nextRun: "Jun 30",
    icon: Target,
  },
  {
    id: "payroll_processing",
    name: "Payroll Processing",
    trigger: "payroll_run_initiated",
    steps: 3,
    lastRun: "3 days ago",
    status: "success",
    runs: 12,
    nextRun: "Jun 15",
    icon: DollarSign,
  },
  {
    id: "employee_exit",
    name: "Employee Exit",
    trigger: "resignation_submitted",
    steps: 3,
    lastRun: "2 weeks ago",
    status: "success",
    runs: 4,
    nextRun: "On trigger",
    icon: LogOut,
  },
  {
    id: "compliance_monitoring",
    name: "Compliance Monitoring",
    trigger: "scheduled_daily",
    steps: 3,
    lastRun: "6 hours ago",
    status: "warning",
    runs: 180,
    nextRun: "Tomorrow",
    icon: Shield,
  },
];

const recentInsights = [
  {
    type: "retention",
    title: "Retention Risk Alert",
    summary: "3 employees show high flight risk based on engagement patterns",
    confidence: 87,
    time: "2 hours ago",
    impact: "high",
  },
  {
    type: "hiring",
    title: "Hiring Velocity Alert",
    summary: "Time-to-hire is 8 days above target for technical roles",
    confidence: 92,
    time: "5 hours ago",
    impact: "medium",
  },
  {
    type: "learning",
    title: "Training Gap Identified",
    summary: "47 employees need cybersecurity training renewal by Jun 30",
    confidence: 95,
    time: "1 day ago",
    impact: "high",
  },
  {
    type: "payroll",
    title: "Overtime Cost Increase",
    summary: "Sales department overtime up 15% month-over-month",
    confidence: 89,
    time: "2 days ago",
    impact: "medium",
  },
];

const systemHealth = [
  { label: "API Response", value: "142ms", status: "healthy" },
  { label: "Queue Depth", value: "3", status: "healthy" },
  { label: "Error Rate", value: "0.02%", status: "healthy" },
  { label: "Uptime", value: "99.98%", status: "healthy" },
];

export default function AIDashboardPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"agents" | "workflows" | "insights">("agents");

  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const avgSuccessRate = agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length;
  const activeAgents = agents.filter((a) => a.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">AI Command Center</h1>
              <p className="text-muted-foreground">
                Monitor and manage your AI-powered HR agents
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Settings size={16} />
            Configure
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Play size={16} />
            Run All Agents
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <div className="stat-card">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                <Bot size={16} className="text-blue-600" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">{activeAgents}</p>
            <p className="text-xs text-emerald-600 font-medium">All systems operational</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Tasks Completed</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50">
                <Zap size={16} className="text-purple-600" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">{totalTasks.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Avg Success Rate</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                <CheckCircle size={16} className="text-emerald-600" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">{avgSuccessRate.toFixed(1)}%</p>
            <p className="text-xs text-emerald-600 font-medium">+2.3% from last month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Active Workflows</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50">
                <Workflow size={16} className="text-amber-600" />
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">
              {workflows.filter((w) => w.status === "success").length}
            </p>
            <p className="text-xs text-muted-foreground">
              {workflows.length} total workflows
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-lg border bg-muted p-1 w-fit">
        {(["agents", "workflows", "insights"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Agents Tab */}
      {activeTab === "agents" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <div
                  key={agent.id}
                  className={cn(
                    "card-enterprise cursor-pointer p-5 transition-all",
                    selectedAgent === agent.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                        agent.color
                      )}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{agent.name}</h3>
                          <span className={cn(
                            "badge",
                            agent.status === "active" ? "badge-success" : "badge-neutral"
                          )}>
                            {agent.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{agent.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-lg font-bold">{agent.tasksCompleted.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">tasks completed</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-emerald-600">{agent.successRate}%</p>
                        <p className="text-xs text-muted-foreground">success rate</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{agent.lastActive}</p>
                        <p className="text-xs text-emerald-600">{agent.trend}</p>
                      </div>
                    </div>
                  </div>

                  {selectedAgent === agent.id && (
                    <div className="mt-4 border-t pt-4 animate-slide-up">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">Today</p>
                          <p className="text-xl font-bold">{agent.metrics.today}</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">This Week</p>
                          <p className="text-xl font-bold">{agent.metrics.week}</p>
                        </div>
                        <div className="rounded-lg bg-muted/50 p-3">
                          <p className="text-xs text-muted-foreground">This Month</p>
                          <p className="text-xl font-bold">{agent.metrics.month}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
                          <Play size={12} /> Run Now
                        </button>
                        <button className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium">
                          <Settings size={12} /> Configure
                        </button>
                        <button className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium">
                          <BarChart3 size={12} /> View Logs
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <div className="card-enterprise p-5">
              <h3 className="mb-4 font-semibold flex items-center gap-2">
                <Activity size={16} className="text-emerald-500" />
                System Health
              </h3>
              <div className="space-y-3">
                {systemHealth.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.value}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Insights */}
            <div className="card-enterprise p-5">
              <h3 className="mb-4 font-semibold flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                AI Insights
              </h3>
              <div className="space-y-3">
                {recentInsights.map((insight, i) => (
                  <div key={i} className="rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{insight.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">{insight.summary}</p>
                      </div>
                      <span className="text-xs font-medium text-primary">{insight.confidence}%</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{insight.time}</span>
                      <span className={cn(
                        "badge text-[10px]",
                        insight.impact === "high" ? "badge-danger" : "badge-warning"
                      )}>
                        {insight.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workflows Tab */}
      {activeTab === "workflows" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children">
          {workflows.map((workflow) => {
            const Icon = workflow.icon;
            return (
              <div key={workflow.id} className="card-enterprise p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{workflow.name}</h3>
                      <p className="text-xs text-muted-foreground">Trigger: {workflow.trigger}</p>
                    </div>
                  </div>
                  {workflow.status === "success" ? (
                    <CheckCircle size={16} className="text-emerald-500" />
                  ) : (
                    <AlertTriangle size={16} className="text-amber-500" />
                  )}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-lg font-bold">{workflow.steps}</p>
                    <p className="text-[10px] text-muted-foreground">Steps</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-lg font-bold">{workflow.runs}</p>
                    <p className="text-[10px] text-muted-foreground">Runs</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-2">
                    <p className="text-sm font-bold">{workflow.nextRun}</p>
                    <p className="text-[10px] text-muted-foreground">Next Run</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-muted-foreground">Last: {workflow.lastRun}</span>
                  <button className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                    View Details <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === "insights" && (
        <div className="space-y-4 stagger-children">
          {recentInsights.map((insight, i) => (
            <div key={i} className="card-enterprise p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <span className={cn(
                      "badge",
                      insight.impact === "high" ? "badge-danger" : "badge-warning"
                    )}>
                      {insight.impact} impact
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{insight.summary}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-bold text-primary">
                    <Zap size={14} />
                    {insight.confidence}%
                  </div>
                  <p className="text-xs text-muted-foreground">confidence</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{insight.time}</span>
                <div className="flex gap-2">
                  <button className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                    Dismiss
                  </button>
                  <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                    Take Action
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
