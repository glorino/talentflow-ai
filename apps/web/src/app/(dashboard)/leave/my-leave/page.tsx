"use client";

import { useState } from "react";
import {
  Calendar,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Plane,
  Stethoscope,
  Heart,
  GraduationCap,
  Briefcase,
  TrendingUp,
  BarChart3,
  Users,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const leaveRequests = [
  {
    id: "1",
    employee: "Sarah Chen",
    type: "annual",
    startDate: "Jun 15, 2026",
    endDate: "Jun 20, 2026",
    days: 5,
    reason: "Family vacation to Europe",
    status: "pending",
    avatar: "SC",
  },
  {
    id: "2",
    employee: "James Wilson",
    type: "sick",
    startDate: "Jun 8, 2026",
    endDate: "Jun 9, 2026",
    days: 2,
    reason: "Feeling unwell",
    status: "approved",
    avatar: "JW",
  },
  {
    id: "3",
    employee: "Emily Taylor",
    type: "annual",
    startDate: "Jun 10, 2026",
    endDate: "Jun 12, 2026",
    days: 3,
    reason: "Personal matters",
    status: "approved",
    avatar: "ET",
  },
  {
    id: "4",
    employee: "Alex Johnson",
    type: "study",
    startDate: "Jun 22, 2026",
    endDate: "Jun 26, 2026",
    days: 5,
    reason: "AWS Certification training",
    status: "pending",
    avatar: "AJ",
  },
  {
    id: "5",
    employee: "Rachel Lee",
    type: "bereavement",
    startDate: "Jun 5, 2026",
    endDate: "Jun 7, 2026",
    days: 3,
    reason: "Family emergency",
    status: "approved",
    avatar: "RL",
  },
  {
    id: "6",
    employee: "Michael Brown",
    type: "annual",
    startDate: "Jul 1, 2026",
    endDate: "Jul 5, 2026",
    days: 5,
    reason: "Summer holiday",
    status: "pending",
    avatar: "MB",
  },
];

const leaveBalances = [
  {
    type: "Annual Leave",
    icon: Plane,
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-blue-100",
    balance: 15,
    total: 20,
    used: 5,
    donutColor: "#2563eb",
  },
  {
    type: "Sick Leave",
    icon: Stethoscope,
    color: "text-red-600",
    gradient: "from-red-500 to-red-600",
    bgGradient: "from-red-50 to-red-100",
    balance: 8,
    total: 10,
    used: 2,
    donutColor: "#dc2626",
  },
  {
    type: "Personal Leave",
    icon: Heart,
    color: "text-purple-600",
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
    balance: 4,
    total: 5,
    used: 1,
    donutColor: "#9333ea",
  },
  {
    type: "Study Leave",
    icon: GraduationCap,
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-emerald-100",
    balance: 3,
    total: 5,
    used: 2,
    donutColor: "#059669",
  },
];

const typeIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  annual: { icon: Plane, color: "text-blue-600", bg: "bg-blue-100" },
  sick: { icon: Stethoscope, color: "text-red-600", bg: "bg-red-100" },
  personal: { icon: Heart, color: "text-purple-600", bg: "bg-purple-100" },
  study: { icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-100" },
  bereavement: { icon: Briefcase, color: "text-amber-600", bg: "bg-amber-100" },
};

const statusConfig: Record<string, { label: string; class: string; dotColor: string; borderColor: string }> = {
  pending: { label: "Pending", class: "badge-warning", dotColor: "bg-amber-500", borderColor: "border-l-amber-500" },
  approved: { label: "Approved", class: "badge-success", dotColor: "bg-emerald-500", borderColor: "border-l-emerald-500" },
  rejected: { label: "Rejected", class: "badge-danger", dotColor: "bg-red-500", borderColor: "border-l-red-500" },
};

function MiniDonutChart({ used, total, color }: { used: number; total: number; color: string }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const percentage = (used / total) * 100;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="5" />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform="rotate(-90 24 24)"
        className="transition-all duration-500"
      />
      <text x="24" y="24" textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold fill-foreground">
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}

export default function LeavePage() {
  const [activeTab, setActiveTab] = useState<"requests" | "balance" | "calendar">("requests");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = leaveRequests.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  const totalBalance = leaveBalances.reduce((acc, l) => acc + l.balance, 0);
  const totalDays = leaveBalances.reduce((acc, l) => acc + l.total, 0);
  const totalUsed = leaveBalances.reduce((acc, l) => acc + l.used, 0);
  const pendingCount = leaveRequests.filter((r) => r.status === "pending").length;
  const approvedCount = leaveRequests.filter((r) => r.status === "approved").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests and track balances</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105">
          <Plus size={16} />
          Request Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-4 stagger-children">
        {leaveBalances.map((leave) => {
          const Icon = leave.icon;
          const percentage = ((leave.total - leave.balance) / leave.total) * 100;
          return (
            <div
              key={leave.type}
              className={cn(
                "relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:shadow-md",
                `bg-gradient-to-br ${leave.bgGradient}`
              )}
            >
              <div className="absolute -right-4 -top-4 opacity-10">
                <Icon size={80} className={leave.color} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{leave.type}</p>
                  <MiniDonutChart used={leave.used} total={leave.total} color={leave.donutColor} />
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{leave.balance}</span>
                    <span className="text-sm text-muted-foreground">/ {leave.total} days</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/50">
                    <div
                      className={cn("h-full rounded-full bg-gradient-to-r", leave.gradient)}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{leave.used} days used</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
              <BarChart3 size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Remaining</p>
              <p className="text-xl font-bold">{totalBalance}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Used</p>
              <p className="text-xl font-bold">{totalUsed}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-md">
              <Clock size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pending Requests</p>
              <p className="text-xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 shadow-md">
              <CheckCircle size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Approved</p>
              <p className="text-xl font-bold">{approvedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 rounded-xl border bg-muted/50 p-1 w-fit">
        {(["requests", "balance", "calendar"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-lg px-5 py-2.5 text-sm font-medium transition-all",
              activeTab === tab
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-3 stagger-children">
            {filteredRequests.map((request) => {
              const typeInfo = typeIcons[request.type];
              const TypeIcon = typeInfo?.icon || Calendar;
              const status = statusConfig[request.status];
              return (
                <div
                  key={request.id}
                  className={cn(
                    "card-enterprise overflow-hidden border-l-4 p-5",
                    status?.borderColor
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-md">
                        {request.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{request.employee}</h3>
                          <span className={status?.class}>
                            {status?.label}
                          </span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <span className={cn("flex h-6 w-6 items-center justify-center rounded-md", typeInfo?.bg)}>
                              <TypeIcon size={12} className={typeInfo?.color} />
                            </span>
                            {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                          </span>
                          <span>{request.startDate} - {request.endDate}</span>
                          <span className="font-medium text-foreground">{request.days} days</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{request.reason}</p>
                      </div>
                    </div>
                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 transition-colors">
                          <XCircle size={12} /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calendar Tab */}
      {activeTab === "calendar" && (
        <div className="card-enterprise p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">June 2026</h2>
            <div className="flex gap-2">
              <button className="rounded-lg border p-2 hover:bg-muted transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button className="rounded-lg border p-2 hover:bg-muted transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px bg-muted rounded-xl overflow-hidden">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="bg-gradient-to-b from-slate-50 to-slate-100 p-2.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const leavesOnDay = leaveRequests.filter((r) => {
                const start = new Date(r.startDate).getDate();
                const end = new Date(r.endDate).getDate();
                return day >= start && day <= end;
              });
              return (
                <div
                  key={day}
                  className={cn(
                    "bg-card p-2 min-h-[90px] text-sm transition-colors",
                    leavesOnDay.length > 0 && "bg-gradient-to-br from-primary/5 to-accent/5"
                  )}
                >
                  <span className={cn(
                    "font-medium inline-flex items-center justify-center h-7 w-7 rounded-full text-xs",
                    leavesOnDay.length > 0 && "bg-primary text-primary-foreground"
                  )}>
                    {day}
                  </span>
                  {leavesOnDay.map((leave) => {
                    const typeInfo = typeIcons[leave.type];
                    return (
                      <div
                        key={leave.id}
                        className={cn(
                          "mt-1 rounded-md px-2 py-1 text-[10px] font-medium truncate",
                          typeInfo?.bg,
                          typeInfo?.color
                        )}
                      >
                        {leave.employee}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
