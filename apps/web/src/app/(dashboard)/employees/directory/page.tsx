"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Download,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  MapPin,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
  Users,
  UserCheck,
  UserX,
  UserCog,
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
  { label: "Total Employees", value: "1,247", change: "+12%", trend: "up", icon: Users, color: "text-blue-600", cardClass: "stat-card-blue" },
  { label: "Active", value: "1,198", change: "96.1%", trend: "up", icon: UserCheck, color: "text-emerald-600", cardClass: "stat-card-emerald" },
  { label: "On Leave", value: "34", change: "2.7%", trend: "down", icon: UserCog, color: "text-amber-600", cardClass: "stat-card-amber" },
  { label: "New This Month", value: "18", change: "+5", trend: "up", icon: UserPlus, color: "text-purple-600", cardClass: "stat-card-purple" },
];

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Employee Directory</h1>
          <p className="text-muted-foreground">Manage your team members and their information</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Download size={16} />
            Export
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <UserPlus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-4 stagger-children">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={cn(stat.cardClass || "stat-card", "group cursor-pointer")}>
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
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-80 rounded-lg border bg-card pl-9 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Design">Design</option>
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
            className={cn("rounded-lg p-2 transition-colors", viewMode === "table" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn("rounded-lg p-2 transition-colors", viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}
          >
            <Grid3X3 size={18} />
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="card-enterprise overflow-hidden">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Location</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="cursor-pointer group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white transition-transform group-hover:scale-110">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Building2 size={14} className="text-muted-foreground" />
                      {emp.department}
                    </div>
                  </td>
                  <td>{emp.role}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} className="text-muted-foreground" />
                      {emp.location}
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      "badge",
                      emp.status === "active" ? "badge-success" : emp.status === "on_leave" ? "badge-warning" : "badge-danger"
                    )}>
                      {emp.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{emp.joinDate}</td>
                  <td>
                    <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 stagger-children">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="card-enterprise p-5 group cursor-pointer hover:shadow-md transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white transition-transform group-hover:scale-110">
                  {emp.avatar}
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{emp.firstName} {emp.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{emp.role}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 size={14} />
                  <span>{emp.department}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span>{emp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={14} />
                  <span className="truncate">{emp.email}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className={cn(
                  "badge",
                  emp.status === "active" ? "badge-success" : emp.status === "on_leave" ? "badge-warning" : "badge-danger"
                )}>
                  {emp.status.replace("_", " ")}
                </span>
                <span className="text-xs text-muted-foreground">Joined {emp.joinDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
