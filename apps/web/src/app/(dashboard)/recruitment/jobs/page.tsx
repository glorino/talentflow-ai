"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Plus,
  MapPin,
  Clock,
  Users,
  Briefcase,
  MoreHorizontal,
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
    status: "open",
    postedDate: "May 15, 2026",
    hiringManager: "James Wilson",
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
    status: "open",
    postedDate: "May 20, 2026",
    hiringManager: "Maria Rodriguez",
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
    status: "open",
    postedDate: "May 10, 2026",
    hiringManager: "Sarah Chen",
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
    status: "open",
    postedDate: "May 5, 2026",
    hiringManager: "James Wilson",
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
    status: "paused",
    postedDate: "Apr 28, 2026",
    hiringManager: "David Kim",
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
    status: "open",
    postedDate: "May 18, 2026",
    hiringManager: "James Wilson",
  },
];

const statusColors: Record<string, string> = {
  open: "bg-green-100 text-green-700",
  paused: "bg-yellow-100 text-yellow-700",
  closed: "bg-gray-100 text-gray-700",
  draft: "bg-blue-100 text-blue-700",
};

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <p className="text-muted-foreground">
            Manage open positions and track applicants
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus size={16} />
          New Job Posting
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border bg-card pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
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

      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      statusColors[job.status]
                    )}
                  >
                    {job.status}
                  </span>
                  {job.remote && (
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
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
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {job.applicants} applicants
                  </span>
                </div>
                <p className="text-sm font-medium text-primary">{job.salary}</p>
              </div>
              <button className="rounded-lg p-2 hover:bg-muted">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <p className="text-xs text-muted-foreground">
                Posted {job.postedDate} by {job.hiringManager}
              </p>
              <div className="flex gap-2">
                <button className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-muted">
                  View Applicants
                </button>
                <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20">
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
