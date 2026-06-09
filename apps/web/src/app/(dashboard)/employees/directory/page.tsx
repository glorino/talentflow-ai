"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  Upload,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Mail,
  Building2,
  MapPin,
  Grid3X3,
  List,
  Users,
  UserCheck,
  UserCog,
  Calendar,
  Briefcase,
  Phone,
  ChevronRight,
  Pencil,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
  { id: "1", firstName: "Sarah", lastName: "Chen", email: "sarah.chen@company.com", phone: "+1 (555) 123-4567", department: "Engineering", role: "Senior Software Engineer", location: "New York, NY", status: "active", joinDate: "Jan 2022", avatar: "SC", manager: "James Wilson", type: "Full-time" },
  { id: "2", firstName: "James", lastName: "Wilson", email: "james.wilson@company.com", phone: "+1 (555) 234-5678", department: "Engineering", role: "Engineering Manager", location: "New York, NY", status: "active", joinDate: "Mar 2020", avatar: "JW", manager: "David Kim", type: "Full-time" },
  { id: "3", firstName: "Maria", lastName: "Rodriguez", email: "maria.rodriguez@company.com", phone: "+1 (555) 345-6789", department: "Sales", role: "Sales Director", location: "San Francisco, CA", status: "active", joinDate: "Jun 2021", avatar: "MR", manager: "CEO", type: "Full-time" },
  { id: "4", firstName: "David", lastName: "Kim", email: "david.kim@company.com", phone: "+1 (555) 456-7890", department: "Finance", role: "CFO", location: "New York, NY", status: "active", joinDate: "Feb 2019", avatar: "DK", manager: "CEO", type: "Full-time" },
  { id: "5", firstName: "Emily", lastName: "Taylor", email: "emily.taylor@company.com", phone: "+1 (555) 567-8901", department: "Marketing", role: "Marketing Manager", location: "Austin, TX", status: "on_leave", joinDate: "Sep 2021", avatar: "ET", manager: "CEO", type: "Full-time" },
  { id: "6", firstName: "Alex", lastName: "Johnson", email: "alex.johnson@company.com", phone: "+1 (555) 678-9012", department: "Engineering", role: "Full Stack Developer", location: "Remote", status: "active", joinDate: "Apr 2023", avatar: "AJ", manager: "James Wilson", type: "Full-time" },
  { id: "7", firstName: "Rachel", lastName: "Lee", email: "rachel.lee@company.com", phone: "+1 (555) 789-0123", department: "Human Resources", role: "HR Manager", location: "New York, NY", status: "active", joinDate: "Nov 2020", avatar: "RL", manager: "David Kim", type: "Full-time" },
  { id: "8", firstName: "Michael", lastName: "Brown", email: "michael.brown@company.com", phone: "+1 (555) 890-1234", department: "Design", role: "Product Designer", location: "Austin, TX", status: "active", joinDate: "Jul 2022", avatar: "MB", manager: "Emily Taylor", type: "Full-time" },
  { id: "9", firstName: "Lisa", lastName: "Wang", email: "lisa.wang@company.com", phone: "+1 (555) 901-2345", department: "Engineering", role: "DevOps Engineer", location: "Remote", status: "active", joinDate: "Jan 2023", avatar: "LW", manager: "James Wilson", type: "Full-time" },
  { id: "10", firstName: "Chris", lastName: "Martinez", email: "chris.martinez@company.com", phone: "+1 (555) 012-3456", department: "Sales", role: "Account Executive", location: "San Francisco, CA", status: "terminated", joinDate: "Aug 2022", avatar: "CM", manager: "Maria Rodriguez", type: "Full-time" },
  { id: "11", firstName: "Anna", lastName: "Petrov", email: "anna.petrov@company.com", phone: "+1 (555) 111-2233", department: "Engineering", role: "Backend Developer", location: "Remote", status: "active", joinDate: "Mar 2024", avatar: "AP", manager: "James Wilson", type: "Full-time" },
  { id: "12", firstName: "Tom", lastName: "Anderson", email: "tom.anderson@company.com", phone: "+1 (555) 222-3344", department: "Sales", role: "Sales Rep", location: "San Francisco, CA", status: "active", joinDate: "Feb 2024", avatar: "TA", manager: "Maria Rodriguez", type: "Full-time" },
];

const stats = [
  { label: "Total Employees", value: "1,247", change: "+12%", trend: "up" as const, icon: Users, gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/40", ring: "ring-blue-200 dark:ring-blue-800" },
  { label: "Active", value: "1,198", change: "96.1%", trend: "up" as const, icon: UserCheck, gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/40", ring: "ring-emerald-200 dark:ring-emerald-800" },
  { label: "On Leave", value: "34", change: "2.7%", trend: "down" as const, icon: UserCog, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50 dark:bg-amber-950/40", ring: "ring-amber-200 dark:ring-amber-800" },
  { label: "New This Month", value: "18", change: "+5", trend: "up" as const, icon: UserPlus, gradient: "from-purple-500 to-violet-600", bg: "bg-purple-50 dark:bg-purple-950/40", ring: "ring-purple-200 dark:ring-purple-800" },
];

const departments = ["Engineering", "Sales", "Marketing", "Finance", "Human Resources", "Design"];

const departmentColors: Record<string, { border: string; avatar: string; chip: string; bar: string }> = {
  Engineering: { border: "border-t-blue-500", avatar: "from-blue-500 to-cyan-400", chip: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300", bar: "#3b82f6" },
  Sales: { border: "border-t-purple-500", avatar: "from-purple-500 to-fuchsia-400", chip: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300", bar: "#a855f7" },
  Marketing: { border: "border-t-emerald-500", avatar: "from-emerald-500 to-teal-400", chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300", bar: "#10b981" },
  Finance: { border: "border-t-amber-500", avatar: "from-amber-500 to-orange-400", chip: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300", bar: "#f59e0b" },
  "Human Resources": { border: "border-t-rose-500", avatar: "from-rose-500 to-pink-400", chip: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300", bar: "#f43f5e" },
  Design: { border: "border-t-cyan-500", avatar: "from-cyan-500 to-sky-400", chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300", bar: "#06b6d4" },
};

const departmentCounts = departments.map((dept) => ({
  dept,
  count: employees.filter((e) => e.department === dept).length,
}));

const maxDeptCount = Math.max(...departmentCounts.map((d) => d.count));

export default function EmployeeDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === "all" || emp.department === departmentFilter;
    const matchesStatus = statusFilter === "all" || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Directory</h1>
          <p className="text-muted-foreground">Manage your team members and their information</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-all hover:bg-emerald-100 hover:shadow-sm dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 dark:hover:bg-emerald-900/50">
            <Upload size={16} />
            Import
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-medium text-sky-700 transition-all hover:bg-sky-100 hover:shadow-sm dark:border-sky-800 dark:bg-sky-950/50 dark:text-sky-300 dark:hover:bg-sky-900/50">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-110">
            <UserPlus size={16} />
            Add Employee
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
                "group relative overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:bg-card",
                stat.ring
              )}
            >
              <div className={cn("absolute inset-0 opacity-[0.03] bg-gradient-to-br", stat.gradient)} />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br shadow-sm", stat.gradient)}>
                    <Icon size={18} className="text-white" />
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-2">
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <span
                    className={cn(
                      "mb-1 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold",
                      stat.trend === "up"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                    )}
                  >
                    {stat.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Distribution Mini Chart */}
      <div className="card-enterprise p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Briefcase size={16} className="text-white" />
            </div>
            <h3 className="font-semibold">Department Distribution</h3>
          </div>
          <span className="text-xs text-muted-foreground">{employees.length} total employees</span>
        </div>
        <div className="flex items-end gap-3" style={{ height: 120 }}>
          {departmentCounts.map((d) => (
            <div key={d.dept} className="group/bar flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground">{d.count}</span>
              <div className="relative w-full overflow-hidden rounded-t-md" style={{ height: (d.count / maxDeptCount) * 72 }}>
                <div
                  className="absolute inset-0 rounded-t-md transition-all duration-500 group-hover/bar:brightness-110"
                  style={{
                    background: `linear-gradient(to top, ${departmentColors[d.dept]?.bar || "#6b7280"}, ${departmentColors[d.dept]?.bar || "#6b7280"}88)`,
                  }}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground leading-tight text-center truncate w-full">
                {d.dept.length > 8 ? d.dept.slice(0, 7) + "..." : d.dept}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-80 rounded-lg border bg-card pl-9 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
            />
          </div>
          {/* Filter chips */}
          <div className="flex items-center gap-2">
            {departmentFilter !== "all" && (
              <button
                onClick={() => setDepartmentFilter("all")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm",
                  departmentColors[departmentFilter]?.chip || "bg-gray-100 text-gray-700"
                )}
              >
                {departmentFilter}
                <span className="ml-0.5 rounded-full bg-black/10 px-1 text-[10px]">&times;</span>
              </button>
            )}
            {statusFilter !== "all" && (
              <button
                onClick={() => setStatusFilter("all")}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm",
                  statusFilter === "active"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                    : statusFilter === "on_leave"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                )}
              >
                {statusFilter.replace("_", " ")}
                <span className="ml-0.5 rounded-full bg-black/10 px-1 text-[10px]">&times;</span>
              </button>
            )}
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on_leave">On Leave</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={cn(
              "rounded-lg p-2 transition-all",
              viewMode === "table"
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "rounded-lg p-2 transition-all",
              viewMode === "grid"
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Grid3X3 size={18} />
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredEmployees.length}</span> of{" "}
          <span className="font-medium text-foreground">{employees.length}</span> employees
        </p>
      </div>

      {/* Table View */}
      {viewMode === "table" ? (
        <div className="card-enterprise overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gradient-to-r from-slate-50 to-slate-100/80 dark:from-slate-900 dark:to-slate-800/80">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Employee</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Department</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Location</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Joined</th>
                  <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEmployees.map((emp) => {
                  const colors = departmentColors[emp.department] || departmentColors.Engineering;
                  return (
                    <tr key={emp.id} className="group cursor-pointer transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={cn("flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white transition-transform group-hover:scale-110", colors.avatar)}>
                            {emp.avatar}
                          </div>
                          <div>
                            <p className="font-medium group-hover:text-primary transition-colors">{emp.firstName} {emp.lastName}</p>
                            <p className="text-xs text-muted-foreground">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium", colors.chip)}>
                          <Building2 size={12} />
                          {emp.department}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{emp.role}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin size={14} className="text-muted-foreground/60" />
                          {emp.location}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "h-2 w-2 rounded-full",
                              emp.status === "active"
                                ? "bg-emerald-500"
                                : emp.status === "on_leave"
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            )}
                          />
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-xs font-medium",
                              emp.status === "active"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                                : emp.status === "on_leave"
                                  ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                  : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                            )}
                          >
                            {emp.status.replace("_", " ")}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-muted-foreground/60" />
                          {emp.joinDate}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40" title="View">
                            <Eye size={15} />
                          </button>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950/40" title="Edit">
                            <Pencil size={15} />
                          </button>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/40" title="Message">
                            <Mail size={15} />
                          </button>
                          <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40" title="Remove">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
          {filteredEmployees.map((emp) => {
            const colors = departmentColors[emp.department] || departmentColors.Engineering;
            return (
              <div
                key={emp.id}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-xl border border-transparent bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-200 dark:bg-card dark:hover:border-slate-700",
                  "border-t-4",
                  colors.border
                )}
              >
                {/* Card Header with avatar */}
                <div className="relative px-5 pt-5 pb-3">
                  <div className="flex items-start gap-3.5">
                    <div className={cn("flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-md transition-transform group-hover:scale-110", colors.avatar)}>
                      {emp.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                        {emp.firstName} {emp.lastName}
                      </h3>
                      <p className="truncate text-sm text-muted-foreground">{emp.role}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-2.5 px-5 pb-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={cn("flex h-6 w-6 items-center justify-center rounded-md", colors.chip)}>
                      <Building2 size={12} />
                    </div>
                    <span className="truncate">{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
                      <MapPin size={12} />
                    </div>
                    <span className="truncate">{emp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800">
                      <Mail size={12} />
                    </div>
                    <span className="truncate">{emp.email}</span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="border-t bg-slate-50/50 px-5 py-3 dark:bg-slate-900/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium",
                          emp.status === "active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : emp.status === "on_leave"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            emp.status === "active"
                              ? "bg-emerald-500"
                              : emp.status === "on_leave"
                                ? "bg-amber-500"
                                : "bg-red-500"
                          )}
                        />
                        {emp.status.replace("_", " ")}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Calendar size={10} />
                      {emp.joinDate}
                    </span>
                  </div>
                </div>

                {/* Hover Action Overlay */}
                <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="rounded-lg bg-white/90 p-1.5 text-muted-foreground shadow-sm hover:bg-white hover:text-primary dark:bg-slate-800/90 dark:hover:bg-slate-800">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {filteredEmployees.length === 0 && (
        <div className="card-enterprise flex flex-col items-center justify-center py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Users size={28} className="text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No employees found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
