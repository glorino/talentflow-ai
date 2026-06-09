"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
  Search,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Receipt,
  Calculator,
  Building2,
  Play,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const payrollRecords = [
  {
    id: "1",
    employee: "Sarah Chen",
    department: "Engineering",
    role: "Senior Software Engineer",
    baseSalary: 150000,
    bonus: 12500,
    deductions: 4500,
    netPay: 127500,
    status: "processed",
    payPeriod: "May 2026",
    avatar: "SC",
  },
  {
    id: "2",
    employee: "James Wilson",
    department: "Engineering",
    role: "Engineering Manager",
    baseSalary: 165000,
    bonus: 15000,
    deductions: 5200,
    netPay: 144800,
    status: "processed",
    payPeriod: "May 2026",
    avatar: "JW",
  },
  {
    id: "3",
    employee: "Maria Rodriguez",
    department: "Sales",
    role: "Sales Director",
    baseSalary: 140000,
    bonus: 25000,
    deductions: 4800,
    netPay: 160200,
    status: "pending",
    payPeriod: "May 2026",
    avatar: "MR",
  },
  {
    id: "4",
    employee: "David Kim",
    department: "Finance",
    role: "CFO",
    baseSalary: 200000,
    bonus: 30000,
    deductions: 7500,
    netPay: 222500,
    status: "processed",
    payPeriod: "May 2026",
    avatar: "DK",
  },
  {
    id: "5",
    employee: "Emily Taylor",
    department: "Marketing",
    role: "Marketing Manager",
    baseSalary: 120000,
    bonus: 10000,
    deductions: 3800,
    netPay: 126200,
    status: "processed",
    payPeriod: "May 2026",
    avatar: "ET",
  },
  {
    id: "6",
    employee: "Alex Johnson",
    department: "Engineering",
    role: "Full Stack Developer",
    baseSalary: 130000,
    bonus: 8000,
    deductions: 4100,
    netPay: 133900,
    status: "draft",
    payPeriod: "May 2026",
    avatar: "AJ",
  },
];

const departmentData = [
  { name: "Engineering", total: 536200, color: "#2563eb", employees: 3 },
  { name: "Sales", total: 160200, color: "#059669", employees: 1 },
  { name: "Finance", total: 222500, color: "#9333ea", employees: 1 },
  { name: "Marketing", total: 126200, color: "#f59e0b", employees: 1 },
];

const statusConfig: Record<string, { label: string; class: string; icon: React.ElementType; dotColor: string }> = {
  processed: { label: "Processed", class: "badge-success", icon: CheckCircle, dotColor: "bg-emerald-500" },
  pending: { label: "Pending", class: "badge-warning", icon: Clock, dotColor: "bg-amber-500" },
  draft: { label: "Draft", class: "badge-neutral", icon: Calculator, dotColor: "bg-slate-400" },
};

const stats = [
  { label: "Total Payroll", value: "$2.4M", change: "+8.2%", trend: "up", icon: DollarSign, color: "text-blue-600", gradient: "from-blue-500 to-blue-600", bgGradient: "from-blue-50 to-blue-100" },
  { label: "Avg Salary", value: "$134K", change: "+3.1%", trend: "up", icon: Wallet, color: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600", bgGradient: "from-emerald-50 to-emerald-100" },
  { label: "Total Bonuses", value: "$100.5K", change: "+12%", trend: "up", icon: TrendingUp, color: "text-purple-600", gradient: "from-purple-500 to-purple-600", bgGradient: "from-purple-50 to-purple-100" },
  { label: "Total Deductions", value: "$29.9K", change: "+2.1%", trend: "up", icon: Receipt, color: "text-amber-600", gradient: "from-amber-500 to-amber-600", bgGradient: "from-amber-50 to-amber-100" },
];

function MiniBarChart({ data }: { data: typeof departmentData }) {
  const maxTotal = Math.max(...data.map((d) => d.total));
  return (
    <div className="flex items-end gap-2 h-16">
      {data.map((dept) => (
        <div key={dept.name} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full rounded-t-md transition-all duration-500"
            style={{
              height: `${(dept.total / maxTotal) * 100}%`,
              backgroundColor: dept.color,
              minHeight: "4px",
            }}
          />
          <span className="text-[9px] text-muted-foreground truncate w-full text-center">{dept.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function PayrollPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRunDialog, setShowRunDialog] = useState(false);

  const filteredRecords = payrollRecords.filter(
    (r) =>
      r.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">Manage payroll runs and view compensation data</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => setShowRunDialog(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            <Calculator size={16} />
            Run Payroll
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-4 stagger-children">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={cn(
                "relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all hover:shadow-md",
                `bg-gradient-to-br ${stat.bgGradient}`
              )}
            >
              <div className="absolute -right-4 -top-4 opacity-10">
                <Icon size={80} className={stat.color} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm", stat.gradient)}>
                    <Icon size={14} className="text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <span className={cn(
                    "mb-1 flex items-center gap-0.5 text-xs font-medium",
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  )}>
                    {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Distribution */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Building2 size={16} className="text-primary" />
            <h3 className="font-semibold text-sm">Payroll by Department</h3>
          </div>
          <MiniBarChart data={departmentData} />
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-emerald-600" />
            <h3 className="font-semibold text-sm">Department Summary</h3>
          </div>
          <div className="space-y-3">
            {departmentData.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span className="text-sm font-medium">{dept.name}</span>
                  <span className="text-xs text-muted-foreground">({dept.employees})</span>
                </div>
                <span className="text-sm font-bold">${(dept.total / 1000).toFixed(0)}K</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-xl border bg-card pl-9 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <select className="h-10 rounded-xl border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
          <select className="h-10 rounded-xl border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>May 2026</option>
            <option>April 2026</option>
            <option>March 2026</option>
          </select>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="card-enterprise overflow-hidden rounded-xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800 to-slate-900">
                {["Employee", "Base Salary", "Bonus", "Deductions", "Net Pay", "Status", ""].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => {
                const StatusInfo = statusConfig[record.status];
                const StatusIcon = StatusInfo?.icon || Clock;
                return (
                  <tr key={record.id} className="border-t transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white shadow-sm">
                          {record.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{record.employee}</p>
                          <p className="text-xs text-muted-foreground">{record.department} · {record.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">${record.baseSalary.toLocaleString()}</td>
                    <td className="px-4 py-3 text-emerald-600 font-medium">+${record.bonus.toLocaleString()}</td>
                    <td className="px-4 py-3 text-red-600 font-medium">-${record.deductions.toLocaleString()}</td>
                    <td className="px-4 py-3 font-bold text-foreground">${record.netPay.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={cn(StatusInfo?.class, "flex items-center gap-1.5 w-fit")}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", StatusInfo?.dotColor)} />
                        {StatusInfo?.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Run Payroll Dialog */}
      {showRunDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                  <Play size={18} className="text-white ml-0.5" />
                </div>
                <div>
                  <h2 className="font-semibold">Run Payroll</h2>
                  <p className="text-xs text-muted-foreground">Process payroll for the selected period</p>
                </div>
              </div>
              <button
                onClick={() => setShowRunDialog(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4 rounded-xl border bg-muted/30 p-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pay Period</span>
                <span className="font-medium">May 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Employees</span>
                <span className="font-medium">6</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Net Pay</span>
                <span className="font-bold text-foreground">$914,900</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRunDialog(false)}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowRunDialog(false)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl"
              >
                <CheckCircle size={16} />
                Confirm & Process
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
