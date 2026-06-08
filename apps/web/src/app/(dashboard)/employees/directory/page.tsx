"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  Building2,
  MapPin,
  MoreHorizontal,
  ChevronRight,
  Download,
  UserPlus,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const employees = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    role: "Senior Software Engineer",
    location: "New York, NY",
    status: "active",
    joinDate: "Jan 15, 2022",
    avatar: "SC",
    manager: "James Wilson",
    employmentType: "Full-time",
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@company.com",
    phone: "+1 (555) 234-5678",
    department: "Engineering",
    role: "Engineering Manager",
    location: "New York, NY",
    status: "active",
    joinDate: "Mar 8, 2020",
    avatar: "JW",
    manager: "David Kim",
    employmentType: "Full-time",
  },
  {
    id: "3",
    firstName: "Maria",
    lastName: "Rodriguez",
    email: "maria.rodriguez@company.com",
    phone: "+1 (555) 345-6789",
    department: "Sales",
    role: "Sales Director",
    location: "San Francisco, CA",
    status: "active",
    joinDate: "Jun 1, 2021",
    avatar: "MR",
    manager: "CEO",
    employmentType: "Full-time",
  },
  {
    id: "4",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@company.com",
    phone: "+1 (555) 456-7890",
    department: "Finance",
    role: "CFO",
    location: "New York, NY",
    status: "active",
    joinDate: "Feb 1, 2019",
    avatar: "DK",
    manager: "CEO",
    employmentType: "Full-time",
  },
  {
    id: "5",
    firstName: "Emily",
    lastName: "Taylor",
    email: "emily.taylor@company.com",
    phone: "+1 (555) 567-8901",
    department: "Marketing",
    role: "Marketing Manager",
    location: "Austin, TX",
    status: "on_leave",
    joinDate: "Sep 15, 2021",
    avatar: "ET",
    manager: "CEO",
    employmentType: "Full-time",
  },
  {
    id: "6",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 678-9012",
    department: "Engineering",
    role: "Full Stack Developer",
    location: "Remote",
    status: "active",
    joinDate: "Apr 20, 2023",
    avatar: "AJ",
    manager: "James Wilson",
    employmentType: "Full-time",
  },
  {
    id: "7",
    firstName: "Rachel",
    lastName: "Lee",
    email: "rachel.lee@company.com",
    phone: "+1 (555) 789-0123",
    department: "Human Resources",
    role: "HR Manager",
    location: "New York, NY",
    status: "active",
    joinDate: "Nov 10, 2020",
    avatar: "RL",
    manager: "David Kim",
    employmentType: "Full-time",
  },
  {
    id: "8",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@company.com",
    phone: "+1 (555) 890-1234",
    department: "Design",
    role: "Product Designer",
    location: "Austin, TX",
    status: "active",
    joinDate: "Jul 5, 2022",
    avatar: "MB",
    manager: "Emily Taylor",
    employmentType: "Full-time",
  },
  {
    id: "9",
    firstName: "Lisa",
    lastName: "Wang",
    email: "lisa.wang@company.com",
    phone: "+1 (555) 901-2345",
    department: "Engineering",
    role: "DevOps Engineer",
    location: "Remote",
    status: "active",
    joinDate: "Jan 8, 2023",
    avatar: "LW",
    manager: "James Wilson",
    employmentType: "Full-time",
  },
  {
    id: "10",
    firstName: "Chris",
    lastName: "Martinez",
    email: "chris.martinez@company.com",
    phone: "+1 (555) 012-3456",
    department: "Sales",
    role: "Account Executive",
    location: "San Francisco, CA",
    status: "terminated",
    joinDate: "Aug 15, 2022",
    avatar: "CM",
    manager: "Maria Rodriguez",
    employmentType: "Full-time",
  },
];

const statusColors: Record<string, string> = {
  active: "badge-success",
  on_leave: "badge-warning",
  terminated: "badge-danger",
  probation: "badge-info",
};

const stats = [
  { label: "Total Employees", value: "1,247", change: "+12%", trend: "up" },
  { label: "Active", value: "1,198", change: "96.1%", trend: "up" },
  { label: "On Leave", value: "34", change: "2.7%", trend: "down" },
  { label: "New This Month", value: "18", change: "+5", trend: "up" },
];

export default function EmployeeDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

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
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
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
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border bg-card pl-9 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
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
              <tr key={emp.id} className="cursor-pointer">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
                      {emp.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{emp.firstName} {emp.lastName}</p>
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
                  <span className={statusColors[emp.status]}>
                    {emp.status.replace("_", " ")}
                  </span>
                </td>
                <td className="text-muted-foreground">{emp.joinDate}</td>
                <td>
                  <button className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
