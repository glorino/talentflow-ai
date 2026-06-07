"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Clock,
  Users,
  Briefcase,
  MoreHorizontal,
  Sparkles,
  ArrowRight,
  Calendar,
  DollarSign,
  Building2,
  ChevronDown,
  LayoutGrid,
  List,
  Bot,
  Eye,
  Send,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    remote: true,
    salary: "$130K - $180K",
    applicants: 47,
    shortlisted: 12,
    status: "open",
    postedDate: "May 15, 2026",
    daysOpen: 23,
    hiringManager: "James Wilson",
    priority: "high",
    aiScore: 94,
    pipeline: { applied: 47, screening: 12, interview: 5, offer: 0 },
  },
  {
    id: "2",
    title: "Sales Development Representative",
    department: "Sales",
    location: "San Francisco, CA",
    type: "Full-time",
    remote: false,
    salary: "$55K - $75K",
    applicants: 23,
    shortlisted: 8,
    status: "open",
    postedDate: "May 20, 2026",
    daysOpen: 18,
    hiringManager: "Maria Rodriguez",
    priority: "medium",
    aiScore: 87,
    pipeline: { applied: 23, screening: 8, interview: 3, offer: 0 },
  },
  {
    id: "3",
    title: "HR Manager",
    department: "Human Resources",
    location: "New York, NY",
    type: "Full-time",
    remote: true,
    salary: "$90K - $120K",
    applicants: 31,
    shortlisted: 15,
    status: "open",
    postedDate: "May 10, 2026",
    daysOpen: 28,
    hiringManager: "Sarah Chen",
    priority: "medium",
    aiScore: 91,
    pipeline: { applied: 31, screening: 15, interview: 7, offer: 1 },
  },
  {
    id: "4",
    title: "Product Designer",
    department: "Design",
    location: "Austin, TX",
    type: "Full-time",
    remote: true,
    salary: "$100K - $140K",
    applicants: 56,
    shortlisted: 18,
    status: "open",
    postedDate: "May 5, 2026",
    daysOpen: 33,
    hiringManager: "James Wilson",
    priority: "high",
    aiScore: 89,
    pipeline: { applied: 56, screening: 18, interview: 8, offer: 2 },
  },
  {
    id: "5",
    title: "Financial Analyst",
    department: "Finance",
    location: "New York, NY",
    type: "Full-time",
    remote: false,
    salary: "$70K - $95K",
    applicants: 18,
    shortlisted: 6,
    status: "paused",
    postedDate: "Apr 28, 2026",
    daysOpen: 40,
    hiringManager: "David Kim",
    priority: "low",
    aiScore: 76,
    pipeline: { applied: 18, screening: 6, interview: 2, offer: 0 },
  },
  {
    id: "6",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    remote: true,
    salary: "$120K - $160K",
    applicants: 42,
    shortlisted: 14,
    status: "open",
    postedDate: "May 18, 2026",
    daysOpen: 20,
    hiringManager: "James Wilson",
    priority: "high",
    aiScore: 92,
    pipeline: { applied: 42, screening: 14, interview: 6, offer: 1 },
  },
];

const statusConfig: Record<string, { label: string; class: string }> = {
  open: { label: "Open", class: "badge-success" },
  paused: { label: "Paused", class: "badge-warning" },
  closed: { label: "Closed", class: "badge-neutral" },
  draft: { label: "Draft", class: "badge-info" },
};

const priorityConfig: Record<string, { label: string; class: string }> = {
  high: { label: "High Priority", class: "badge-danger" },
  medium: { label: "Medium", class: "badge-warning" },
  low: { label: "Low", class: "badge-neutral" },
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage open positions and track applicant pipeline
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Sparkles size={16} className="text-primary" />
            AI Optimize
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus size={16} />
            New Job Posting
          </button>
        </div>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "Total Applied", value: "217", icon: Users, color: "text-blue-600" },
          { label: "In Screening", value: "73", icon: Search, color: "text-purple-600" },
          { label: "Interviewing", value: "31", icon: Clock, color: "text-amber-600" },
          { label: "Offers Sent", value: "4", icon: Send, color: "text-emerald-600" },
          { label: "AI Scored", value: "89%", icon: Bot, color: "text-primary" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="card-enterprise p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <Icon size={14} className={item.color} />
              </div>
              <p className="mt-1 text-2xl font-bold">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs by title or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-80 rounded-lg border bg-card pl-9 pr-4 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-lg border bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "rounded-lg p-2 transition-colors",
              viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("kanban")}
            className={cn(
              "rounded-lg p-2 transition-colors",
              viewMode === "kanban" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
            )}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div className={cn(
        "stagger-children",
        viewMode === "kanban" ? "grid grid-cols-3 gap-4" : "space-y-4"
      )}>
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className={cn(
              "card-enterprise group p-5",
              viewMode === "kanban" && "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  {job.remote && (
                    <span className="badge badge-info">Remote</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 size={14} />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {job.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn(statusConfig[job.status]?.class)}>
                  {statusConfig[job.status]?.label}
                </span>
                <span className={cn(priorityConfig[job.priority]?.class)}>
                  {priorityConfig[job.priority]?.label}
                </span>
                <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Pipeline Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>Application Pipeline</span>
                <span>{job.applicants} total applicants</span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="bg-blue-500 transition-all"
                  style={{ width: `${(job.pipeline.applied / job.applicants) * 100}%` }}
                />
                <div
                  className="bg-purple-500 transition-all"
                  style={{ width: `${(job.pipeline.screening / job.applicants) * 100}%` }}
                />
                <div
                  className="bg-amber-500 transition-all"
                  style={{ width: `${(job.pipeline.interview / job.applicants) * 100}%` }}
                />
                <div
                  className="bg-emerald-500 transition-all"
                  style={{ width: `${(job.pipeline.offer / job.applicants) * 100}%` }}
                />
              </div>
              <div className="mt-1.5 flex items-center gap-4 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Applied ({job.pipeline.applied})
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Screening ({job.pipeline.screening})
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Interview ({job.pipeline.interview})
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Offer ({job.pipeline.offer})
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="font-medium text-primary">{job.salary}</span>
                <span>Posted {job.postedDate}</span>
                <span>{job.daysOpen} days open</span>
              </div>
              <div className="flex items-center gap-2">
                {/* AI Score */}
                <div className="flex items-center gap-1.5 rounded-lg bg-primary/5 px-3 py-1.5">
                  <Bot size={12} className="text-primary" />
                  <span className="text-xs font-semibold text-primary">AI: {job.aiScore}%</span>
                </div>
                <button className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted">
                  <Eye size={12} className="mr-1 inline" />
                  View
                </button>
                <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
                  <Sparkles size={12} className="mr-1 inline" />
                  AI Screen
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
