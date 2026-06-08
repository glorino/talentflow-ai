"use client";

import { useState } from "react";
import {
  Clock,
  Play,
  Square,
  Calendar,
  TrendingUp,
  Users,
  MapPin,
  Coffee,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const todayAttendance = [
  { name: "Sarah Chen", avatar: "SC", clockIn: "9:02 AM", clockOut: null, status: "present", hours: "0h 0m" },
  { name: "James Wilson", avatar: "JW", clockIn: "8:45 AM", clockOut: null, status: "present", hours: "0h 0m" },
  { name: "Emily Taylor", avatar: "ET", clockIn: null, clockOut: null, status: "on_leave", hours: "Leave" },
  { name: "Alex Johnson", avatar: "AJ", clockIn: "9:15 AM", clockOut: null, status: "present", hours: "0h 0m" },
  { name: "Rachel Lee", avatar: "RL", clockIn: "8:55 AM", clockOut: null, status: "present", hours: "0h 0m" },
  { name: "Michael Brown", avatar: "MB", clockIn: null, clockOut: null, status: "absent", hours: "0h 0m" },
  { name: "Lisa Wang", avatar: "LW", clockIn: "9:30 AM", clockOut: null, status: "remote", hours: "0h 0m" },
];

const weeklySummary = [
  { day: "Mon", date: "Jun 2", clockIn: "9:00", clockOut: "6:00", hours: 9, status: "present" },
  { day: "Tue", date: "Jun 3", clockIn: "8:55", clockOut: "6:15", hours: 9.3, status: "present" },
  { day: "Wed", date: "Jun 4", clockIn: "9:05", clockOut: "5:45", hours: 8.7, status: "present" },
  { day: "Thu", date: "Jun 5", clockIn: "8:50", clockOut: "6:30", hours: 9.7, status: "present" },
  { day: "Fri", date: "Jun 6", clockIn: "9:10", clockOut: "6:00", hours: 8.8, status: "present" },
];

const stats = [
  { label: "Present Today", value: "94.2%", change: "+0.8%", trend: "up", icon: Users, color: "text-emerald-600" },
  { label: "Avg Hours/Day", value: "8.9h", change: "+0.2h", trend: "up", icon: Clock, color: "text-blue-600" },
  { label: "Remote Workers", value: "23", change: "+3", trend: "up", icon: MapPin, color: "text-purple-600" },
  { label: "Break Compliance", value: "98.5%", change: "+1.2%", trend: "up", icon: Coffee, color: "text-amber-600" },
];

export default function AttendancePage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");

  const handleClockToggle = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockInTime(null);
      setElapsedTime("00:00:00");
    } else {
      setIsClockedIn(true);
      setClockInTime(new Date());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">Track your work hours and attendance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <Calendar size={16} />
            View Calendar
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Clock In/Out */}
        <div className="card-enterprise p-6 text-center">
          <h2 className="mb-6 font-semibold">My Attendance</h2>
          <div className="mx-auto mb-6 h-40 w-40 rounded-full border-4 border-muted flex items-center justify-center">
            <div>
              <p className="text-4xl font-bold">{elapsedTime || "00:00:00"}</p>
              <p className="text-sm text-muted-foreground">
                {isClockedIn ? "Working" : "Not started"}
              </p>
            </div>
          </div>
          <button
            onClick={handleClockToggle}
            className={cn(
              "mx-auto flex items-center gap-2 rounded-full px-12 py-4 text-lg font-semibold text-white transition-all hover:scale-105",
              isClockedIn
                ? "bg-gradient-to-r from-red-500 to-red-600"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600"
            )}
          >
            {isClockedIn ? (
              <>
                <Square size={20} />
                Clock Out
              </>
            ) : (
              <>
                <Play size={20} />
                Clock In
              </>
            )}
          </button>
          {isClockedIn && clockInTime && (
            <p className="mt-4 text-sm text-muted-foreground">
              Started at {clockInTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
        </div>

        {/* Weekly Summary */}
        <div className="lg:col-span-2 card-enterprise p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">This Week</h2>
            <span className="text-sm text-muted-foreground">Jun 2 - Jun 6, 2026</span>
          </div>
          <div className="space-y-3">
            {weeklySummary.map((day) => (
              <div key={day.day} className="flex items-center gap-4 rounded-lg border p-3">
                <div className="w-12 text-center">
                  <p className="font-medium">{day.day}</p>
                  <p className="text-xs text-muted-foreground">{day.date}</p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Clock In</p>
                    <p className="font-medium">{day.clockIn} AM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Clock Out</p>
                    <p className="font-medium">{day.clockOut} PM</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Hours</p>
                    <p className="font-medium">{day.hours}h</p>
                  </div>
                </div>
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  day.status === "present" ? "bg-emerald-500" : "bg-gray-300"
                )} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Team */}
      <div className="card-enterprise">
        <div className="border-b px-6 py-4">
          <h2 className="font-semibold">Today&apos;s Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAttendance.map((emp) => (
                <tr key={emp.name}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white">
                        {emp.avatar}
                      </div>
                      <span className="font-medium">{emp.name}</span>
                    </div>
                  </td>
                  <td>{emp.clockIn || "--"}</td>
                  <td>{emp.clockOut || "--"}</td>
                  <td>{emp.hours}</td>
                  <td>
                    <span className={cn(
                      "badge",
                      emp.status === "present" ? "badge-success" :
                      emp.status === "on_leave" ? "badge-warning" :
                      emp.status === "remote" ? "badge-info" : "badge-danger"
                    )}>
                      {emp.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
