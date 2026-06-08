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
  { type: "Annual Leave", icon: Plane, color: "text-blue-600", cardClass: "stat-card-blue", balance: 15, total: 20, used: 5 },
  { type: "Sick Leave", icon: Stethoscope, color: "text-red-600", cardClass: "stat-card-rose", balance: 8, total: 10, used: 2 },
  { type: "Personal Leave", icon: Heart, color: "text-purple-600", cardClass: "stat-card-purple", balance: 4, total: 5, used: 1 },
  { type: "Study Leave", icon: GraduationCap, color: "text-emerald-600", cardClass: "stat-card-emerald", balance: 3, total: 5, used: 2 },
];

const typeIcons: Record<string, { icon: React.ElementType; color: string }> = {
  annual: { icon: Plane, color: "text-blue-600" },
  sick: { icon: Stethoscope, color: "text-red-600" },
  personal: { icon: Heart, color: "text-purple-600" },
  study: { icon: GraduationCap, color: "text-emerald-600" },
  bereavement: { icon: Briefcase, color: "text-amber-600" },
};

const statusConfig: Record<string, { label: string; class: string }> = {
  pending: { label: "Pending", class: "badge-warning" },
  approved: { label: "Approved", class: "badge-success" },
  rejected: { label: "Rejected", class: "badge-danger" },
};

export default function LeavePage() {
  const [activeTab, setActiveTab] = useState<"requests" | "balance" | "calendar">("requests");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = leaveRequests.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">Manage leave requests and track balances</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus size={16} />
          Request Leave
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-4 stagger-children">
        {leaveBalances.map((leave) => {
          const Icon = leave.icon;
          const percentage = ((leave.total - leave.balance) / leave.total) * 100;
          return (
            <div key={leave.type} className={cn(leave.cardClass || "card-enterprise", "p-5")}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{leave.type}</p>
                <Icon size={16} className={leave.color} />
              </div>
              <div className="mt-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{leave.balance}</span>
                  <span className="text-sm text-muted-foreground">/ {leave.total} days</span>
                </div>
                <div className="mt-2 progress-bar">
                  <div
                    className="progress-bar-fill bg-primary"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{leave.used} days used</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1 rounded-lg border bg-muted p-1 w-fit">
        {(["requests", "balance", "calendar"] as const).map((tab) => (
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

      {activeTab === "requests" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              return (
                <div key={request.id} className="card-enterprise p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
                        {request.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{request.employee}</h3>
                          <span className={statusConfig[request.status]?.class}>
                            {statusConfig[request.status]?.label}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <TypeIcon size={14} className={typeInfo?.color} />
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
                        <button className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100">
                          <CheckCircle size={12} /> Approve
                        </button>
                        <button className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100">
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

      {activeTab === "calendar" && (
        <div className="card-enterprise p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold">June 2026</h2>
            <div className="flex gap-2">
              <button className="rounded-lg border p-2 hover:bg-muted">
                <ChevronLeft size={16} />
              </button>
              <button className="rounded-lg border p-2 hover:bg-muted">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-px bg-muted">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="bg-card p-2 text-center text-xs font-medium text-muted-foreground">
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
                    "bg-card p-2 min-h-[80px] text-sm",
                    leavesOnDay.length > 0 && "bg-primary/5"
                  )}
                >
                  <span className={cn(
                    "font-medium",
                    leavesOnDay.length > 0 && "text-primary"
                  )}>
                    {day}
                  </span>
                  {leavesOnDay.map((leave) => (
                    <div
                      key={leave.id}
                      className="mt-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary truncate"
                    >
                      {leave.employee}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
