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

const statusConfig: Record<string, { label: string; class: string; icon: React.ElementType }> = {
  processed: { label: "Processed", class: "badge-success", icon: CheckCircle },
  pending: { label: "Pending", class: "badge-warning", icon: Clock },
  draft: { label: "Draft", class: "badge-neutral", icon: Calculator },
};

const stats = [
  { label: "Total Payroll", value: "$2.4M", change: "+8.2%", trend: "up", icon: DollarSign, color: "text-blue-600" },
  { label: "Avg Salary", value: "$134K", change: "+3.1%", trend: "up", icon: Wallet, color: "text-emerald-600" },
  { label: "Total Bonuses", value: "$100.5K", change: "+12%", trend: "up", icon: TrendingUp, color: "text-purple-600" },
  { label: "Total Deductions", value: "$29.9K", change: "+2.1%", trend: "up", icon: Receipt, color: "text-amber-600" },
];

export default function PayrollPage() {
  const [searchQuery, setSearchQuery] = useState("");

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
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Calculator size={16} />
            Run Payroll
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4 stagger-children">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="stat-card">
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <Icon size={16} className={stat.color} />
                </div>
                <div className="mt-2 flex items-end gap-2">
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

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border bg-card pl-9 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option>May 2026</option>
          <option>April 2026</option>
          <option>March 2026</option>
        </select>
      </div>

      <div className="card-enterprise overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => {
              const StatusInfo = statusConfig[record.status];
              const StatusIcon = StatusInfo?.icon || Clock;
              return (
                <tr key={record.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
                        {record.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{record.employee}</p>
                        <p className="text-xs text-muted-foreground">{record.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">${record.baseSalary.toLocaleString()}</td>
                  <td className="text-emerald-600 font-medium">+${record.bonus.toLocaleString()}</td>
                  <td className="text-red-600 font-medium">-${record.deductions.toLocaleString()}</td>
                  <td className="font-bold text-foreground">${record.netPay.toLocaleString()}</td>
                  <td>
                    <span className={StatusInfo?.class}>
                      <StatusIcon size={10} className="mr-1 inline" />
                      {StatusInfo?.label}
                    </span>
                  </td>
                  <td>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
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
  );
}
