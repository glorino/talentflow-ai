"use client";

import { useState, useEffect, useRef } from "react";
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
  Wifi,
  Home,
  UserCheck,
  Timer,
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
  { day: "Mon", date: "Jun 2", clockIn: "9:00", clockOut: "6:00", hours: 9, status: "present", color: "bg-emerald-500" },
  { day: "Tue", date: "Jun 3", clockIn: "8:55", clockOut: "6:15", hours: 9.3, status: "present", color: "bg-emerald-500" },
  { day: "Wed", date: "Jun 4", clockIn: "9:05", clockOut: "5:45", hours: 8.7, status: "present", color: "bg-blue-500" },
  { day: "Thu", date: "Jun 5", clockIn: "8:50", clockOut: "6:30", hours: 9.7, status: "present", color: "bg-violet-500" },
  { day: "Fri", date: "Jun 6", clockIn: "9:10", clockOut: "6:00", hours: 8.8, status: "present", color: "bg-amber-500" },
];

const statusStyles: Record<string, { color: string; dotColor: string; bg: string }> = {
  present: { color: "text-emerald-600", dotColor: "bg-emerald-500", bg: "bg-emerald-50" },
  on_leave: { color: "text-amber-600", dotColor: "bg-amber-500", bg: "bg-amber-50" },
  remote: { color: "text-blue-600", dotColor: "bg-blue-500", bg: "bg-blue-50" },
  absent: { color: "text-red-600", dotColor: "bg-red-500", bg: "bg-red-50" },
};

const stats = [
  { label: "Present Today", value: "94.2%", change: "+0.8%", trend: "up", icon: Users, color: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600", bgGradient: "from-emerald-50 to-emerald-100" },
  { label: "Avg Hours/Day", value: "8.9h", change: "+0.2h", trend: "up", icon: Clock, color: "text-blue-600", gradient: "from-blue-500 to-blue-600", bgGradient: "from-blue-50 to-blue-100" },
  { label: "Remote Workers", value: "23", change: "+3", trend: "up", icon: MapPin, color: "text-purple-600", gradient: "from-purple-500 to-purple-600", bgGradient: "from-purple-50 to-purple-100" },
  { label: "Break Compliance", value: "98.5%", change: "+1.2%", trend: "up", icon: Coffee, color: "text-amber-600", gradient: "from-amber-500 to-amber-600", bgGradient: "from-amber-50 to-amber-100" },
];

function CircularProgressRing({ isClockedIn, elapsedTime }: { isClockedIn: boolean; elapsedTime: string }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const percentage = isClockedIn ? 65 : 0;

  return (
    <div className="relative mx-auto h-48 w-48">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
          className="transition-all duration-300"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={isClockedIn ? "url(#progressGradient)" : "#d1d5db"}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className={cn("text-3xl font-bold tabular-nums", isClockedIn ? "text-emerald-600" : "text-muted-foreground")}>
          {elapsedTime || "00:00:00"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {isClockedIn ? "Working" : "Not started"}
        </p>
      </div>
    </div>
  );
}

export default function AttendancePage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isClockedIn && clockInTime) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - clockInTime.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setElapsedTime(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        );
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setElapsedTime("00:00:00");
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isClockedIn, clockInTime]);

  const handleClockToggle = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
      setClockInTime(null);
    } else {
      setIsClockedIn(true);
      setClockInTime(new Date());
    }
  };

  const presentCount = todayAttendance.filter((e) => e.status === "present").length;
  const remoteCount = todayAttendance.filter((e) => e.status === "remote").length;
  const leaveCount = todayAttendance.filter((e) => e.status === "on_leave").length;
  const totalTeam = todayAttendance.length;

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

      {/* Today's Summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-xl border bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-md">
              <UserCheck size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">In Office</p>
              <p className="text-xl font-bold">{presentCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
              <Wifi size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Remote</p>
              <p className="text-xl font-bold">{remoteCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-amber-50 to-amber-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-md">
              <Home size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">On Leave</p>
              <p className="text-xl font-bold">{leaveCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 shadow-md">
              <Users size={18} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Team</p>
              <p className="text-xl font-bold">{totalTeam}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Clock In/Out */}
        <div className="card-enterprise p-6 text-center">
          <h2 className="mb-6 font-semibold">My Attendance</h2>
          <CircularProgressRing isClockedIn={isClockedIn} elapsedTime={elapsedTime} />
          <button
            onClick={handleClockToggle}
            className={cn(
              "mx-auto mt-6 flex items-center gap-2 rounded-full px-12 py-4 text-lg font-semibold text-white transition-all hover:scale-105 shadow-lg",
              isClockedIn
                ? "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-200"
                : "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-200"
            )}
          >
            {isClockedIn ? (
              <>
                <Square size={20} />
                Clock Out
              </>
            ) : (
              <>
                <Play size={20} className="ml-0.5" />
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
            {weeklySummary.map((day) => {
              const maxHours = 10;
              const barWidth = (day.hours / maxHours) * 100;
              return (
                <div key={day.day} className="flex items-center gap-4 rounded-xl border p-3.5 transition-colors hover:bg-muted/30">
                  <div className="w-14 text-center">
                    <p className="font-semibold text-sm">{day.day}</p>
                    <p className="text-[10px] text-muted-foreground">{day.date}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Clock In</p>
                      <p className="font-medium">{day.clockIn} AM</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Clock Out</p>
                      <p className="font-medium">{day.clockOut} PM</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Hours</p>
                      <p className="font-medium">{day.hours}h</p>
                    </div>
                  </div>
                  <div className="w-24">
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", day.color)}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Today's Team */}
      <div className="card-enterprise rounded-xl border shadow-sm overflow-hidden">
        <div className="border-b px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100">
          <h2 className="font-semibold">Today&apos;s Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-800 to-slate-900">
                {["Employee", "Clock In", "Clock Out", "Hours", "Status"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-300"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {todayAttendance.map((emp) => {
                const style = statusStyles[emp.status];
                return (
                  <tr key={emp.name} className="border-t transition-colors hover:bg-muted/30">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-[10px] font-bold text-white shadow-sm">
                            {emp.avatar}
                          </div>
                          <span className={cn("absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white", style?.dotColor)} />
                        </div>
                        <span className="font-medium">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">{emp.clockIn || "--"}</td>
                    <td className="px-6 py-3.5">{emp.clockOut || "--"}</td>
                    <td className="px-6 py-3.5 font-medium">{emp.hours}</td>
                    <td className="px-6 py-3.5">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                        style?.bg,
                        style?.color
                      )}>
                        <span className={cn("h-1.5 w-1.5 rounded-full", style?.dotColor)} />
                        {emp.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
