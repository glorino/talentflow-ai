"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Briefcase,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  MessageSquare,
  Zap,
  Target,
  Eye,
  RefreshCw,
  Plus,
  Send,
  UserPlus,
  DollarSign,
  Video,
  FileText,
  Shield,
  BarChart3,
  PieChart,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
    cardClass: "stat-card-blue",
    sparkline: [40, 42, 45, 43, 50, 48, 55, 52, 60, 58, 62, 65],
  },
  {
    title: "Open Positions",
    value: "34",
    change: "+5 this week",
    trend: "up" as const,
    icon: Briefcase,
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    iconBg: "bg-gradient-to-br from-purple-400 to-purple-600",
    cardClass: "stat-card-purple",
    sparkline: [20, 21, 22, 25, 23, 28, 30, 27, 32, 31, 33, 34],
  },
  {
    title: "Pending Leave",
    value: "18",
    change: "-3 from yesterday",
    trend: "down" as const,
    icon: Calendar,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    iconBg: "bg-gradient-to-br from-amber-400 to-orange-500",
    cardClass: "stat-card-amber",
    sparkline: [30, 28, 27, 25, 22, 20, 18, 19, 17, 18, 18, 18],
  },
  {
    title: "Attendance Today",
    value: "94.2%",
    change: "+0.8%",
    trend: "up" as const,
    icon: Clock,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    cardClass: "stat-card-emerald",
    sparkline: [90, 91, 90.5, 92, 91.5, 93, 92, 94, 93.5, 94, 94.2, 94.2],
  },
];

const aiInsights = [
  {
    id: 1,
    type: "risk",
    title: "Retention Risk Alert",
    description:
      "3 senior engineers show disengagement signals. Flight risk: 87%. Recommend 1:1 check-ins within 48 hours.",
    confidence: 87,
    priority: "high",
    impact: "High",
    agents: ["Performance", "Exit"],
    actions: ["Schedule 1:1", "Review compensation", "Send pulse survey"],
  },
  {
    id: 2,
    type: "hiring",
    title: "Hiring Pipeline Bottleneck",
    description:
      "Full Stack Developer role stalled at interview stage for 14 days. 12 candidates waiting.",
    confidence: 92,
    priority: "high",
    impact: "Medium",
    agents: ["Recruitment", "Interview"],
    actions: ["Add interview slots", "Reassign interviewer"],
  },
  {
    id: 3,
    type: "compliance",
    title: "Training Gap Detected",
    description:
      "47 employees (18%) haven't completed mandatory cybersecurity training. Deadline: Jun 30.",
    confidence: 95,
    priority: "medium",
    impact: "High",
    agents: ["Compliance", "Learning"],
    actions: ["Send reminders", "Block access"],
  },
  {
    id: 4,
    type: "payroll",
    title: "Overtime Cost Spike",
    description:
      "Sales department overtime increased 22% month-over-month. 8 employees over 20hrs OT.",
    confidence: 89,
    priority: "medium",
    impact: "Medium",
    agents: ["Payroll"],
    actions: ["View breakdown", "Contact managers"],
  },
];

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "accepted offer for Senior Engineer",
    time: "2 hours ago",
    avatar: "SC",
    color: "bg-emerald-500",
    type: "hiring",
  },
  {
    user: "James Wilson",
    action: "requested 5 days annual leave",
    time: "3 hours ago",
    avatar: "JW",
    color: "bg-blue-500",
    type: "leave",
  },
  {
    user: "Q1 Reviews",
    action: "initiated for Engineering (23 people)",
    time: "5 hours ago",
    avatar: "Q1",
    color: "bg-purple-500",
    type: "review",
  },
  {
    user: "Training",
    action: "deadline in 14 days for 47 employees",
    time: "6 hours ago",
    avatar: "CT",
    color: "bg-amber-500",
    type: "training",
  },
  {
    user: "May Payroll",
    action: "processed successfully ($2.4M)",
    time: "1 day ago",
    avatar: "MP",
    color: "bg-emerald-500",
    type: "payroll",
  },
  {
    user: "Alex Rivera",
    action: "completed onboarding checklist",
    time: "1 day ago",
    avatar: "AR",
    color: "bg-cyan-500",
    type: "onboarding",
  },
];

const upcomingEvents = [
  {
    event: "Q2 Performance Review",
    date: "Jun 30",
    daysLeft: 23,
    icon: Target,
    color: "text-blue-600",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    event: "Payroll Processing",
    date: "Jun 15",
    daysLeft: 8,
    icon: Clock,
    color: "text-emerald-600",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    event: "All-Hands Meeting",
    date: "Jun 10",
    daysLeft: 3,
    icon: Users,
    color: "text-purple-600",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    event: "Compliance Training Due",
    date: "Jun 30",
    daysLeft: 23,
    icon: Calendar,
    color: "text-amber-600",
    gradient: "from-amber-500 to-orange-500",
  },
];

const teamMetrics = [
  {
    name: "Engineering",
    headcount: 342,
    hiring: 8,
    turnover: "4.2%",
    satisfaction: 88,
    color: "#3b82f6",
    colorClass: "bg-blue-500",
  },
  {
    name: "Sales",
    headcount: 256,
    hiring: 5,
    turnover: "7.1%",
    satisfaction: 82,
    color: "#a855f7",
    colorClass: "bg-purple-500",
  },
  {
    name: "Marketing",
    headcount: 89,
    hiring: 2,
    turnover: "3.8%",
    satisfaction: 91,
    color: "#10b981",
    colorClass: "bg-emerald-500",
  },
  {
    name: "Operations",
    headcount: 178,
    hiring: 3,
    turnover: "5.5%",
    satisfaction: 85,
    color: "#f59e0b",
    colorClass: "bg-amber-500",
  },
  {
    name: "Finance",
    headcount: 67,
    hiring: 1,
    turnover: "2.1%",
    satisfaction: 89,
    color: "#14b8a6",
    colorClass: "bg-teal-500",
  },
];

const monthlyTrends = [
  { month: "Jan", hiring: 45, attrition: 12, label: "J" },
  { month: "Feb", hiring: 52, attrition: 15, label: "F" },
  { month: "Mar", hiring: 48, attrition: 18, label: "M" },
  { month: "Apr", hiring: 61, attrition: 14, label: "A" },
  { month: "May", hiring: 55, attrition: 16, label: "M" },
  { month: "Jun", hiring: 38, attrition: 11, label: "J" },
];

const quickActions = [
  {
    title: "Add Employee",
    description: "Onboard a new hire",
    icon: UserPlus,
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Run Payroll",
    description: "Process monthly payroll",
    icon: DollarSign,
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    title: "Schedule Interview",
    description: "Book candidate slot",
    icon: Video,
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    title: "Generate Report",
    description: "HR analytics report",
    icon: FileText,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    textColor: "text-amber-600",
  },
  {
    title: "Compliance Check",
    description: "Audit training status",
    icon: Shield,
    color: "from-rose-500 to-rose-600",
    bg: "bg-rose-50",
    textColor: "text-rose-600",
  },
  {
    title: "View Analytics",
    description: "Workforce insights",
    icon: BarChart3,
    color: "from-cyan-500 to-cyan-600",
    bg: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
];

function MiniSparkline({
  data,
  color,
  width = 80,
  height = 32,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 4;
  const svgWidth = width;
  const svgHeight = height;
  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;

  const points = data
    .map(
      (v, i) =>
        `${padding + (i / (data.length - 1)) * chartWidth},${padding + chartHeight - ((v - min) / range) * chartHeight}`
    )
    .join(" ");

  const gradientId = `spark-grad-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
  const areaPoints = `${padding},${svgHeight - padding} ${points} ${svgWidth - padding},${svgHeight - padding}`;

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="h-8 w-20"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon fill={`url(#${gradientId})`} points={areaPoints} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const startTime = Date.now();

    function animate() {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericValue * eased);

      if (value.includes(",")) {
        setDisplayValue(current.toLocaleString());
      } else if (value.includes("%")) {
        setDisplayValue(((current / 100) * 100).toFixed(1) + "%");
      } else {
        setDisplayValue(String(current));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

function DepartmentBarChart({ data }: { data: typeof teamMetrics }) {
  const maxHeadcount = Math.max(...data.map((d) => d.headcount));
  const chartHeight = 200;
  const barWidth = 48;
  const gap = 24;
  const totalWidth = data.length * (barWidth + gap) - gap;
  const svgWidth = Math.max(totalWidth + 80, 400);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${svgWidth} ${chartHeight + 50}`}
        className="w-full"
        style={{ minWidth: 400 }}
      >
        <defs>
          {data.map((dept, i) => (
            <linearGradient
              key={`bar-grad-${i}`}
              id={`bar-grad-${i}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor={dept.color} stopOpacity="1" />
              <stop offset="100%" stopColor={dept.color} stopOpacity="0.7" />
            </linearGradient>
          ))}
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = chartHeight - pct * chartHeight;
          const val = Math.round(maxHeadcount * pct);
          return (
            <g key={`grid-${i}`}>
              <line
                x1={40}
                y1={y}
                x2={svgWidth - 20}
                y2={y}
                stroke="currentColor"
                className="text-border"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={35}
                y={y + 4}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize="10"
              >
                {val}
              </text>
            </g>
          );
        })}
        {data.map((dept, i) => {
          const x = 50 + i * (barWidth + gap);
          const barHeight = (dept.headcount / maxHeadcount) * chartHeight;
          const y = chartHeight - barHeight;
          return (
            <g key={dept.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill={`url(#bar-grad-${i})`}
                className="transition-all duration-500"
              />
              <text
                x={x + barWidth / 2}
                y={chartHeight + 18}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="11"
                fontWeight="500"
              >
                {dept.name}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                className="fill-foreground"
                fontSize="12"
                fontWeight="600"
              >
                {dept.headcount}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DonutChart({ data }: { data: typeof teamMetrics }) {
  const total = data.reduce((sum, d) => sum + d.headcount, 0);
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const innerRadius = 45;

  let cumulativeAngle = -90;
  const segments = data.map((dept) => {
    const percentage = (dept.headcount / total) * 100;
    const angle = (dept.headcount / total) * 360;
    const startAngle = cumulativeAngle;
    cumulativeAngle += angle;
    const endAngle = cumulativeAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    const ix1 = center + innerRadius * Math.cos(startRad);
    const iy1 = center + innerRadius * Math.sin(startRad);
    const ix2 = center + innerRadius * Math.cos(endRad);
    const iy2 = center + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;

    return { ...dept, d, percentage, startAngle, endAngle };
  });

  return (
    <div className="flex items-center gap-6">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-48 w-48 shrink-0">
        <defs>
          {data.map((dept, i) => (
            <linearGradient
              key={`donut-grad-${i}`}
              id={`donut-grad-${i}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={dept.color} stopOpacity="1" />
              <stop offset="100%" stopColor={dept.color} stopOpacity="0.8" />
            </linearGradient>
          ))}
        </defs>
        {segments.map((seg, i) => (
          <path
            key={seg.name}
            d={seg.d}
            fill={`url(#donut-grad-${i})`}
            className="transition-all duration-300 hover:opacity-80 cursor-pointer"
            strokeWidth="2"
            stroke="white"
          />
        ))}
        <text
          x={center}
          y={center - 6}
          textAnchor="middle"
          className="fill-foreground"
          fontSize="22"
          fontWeight="700"
        >
          {total.toLocaleString()}
        </text>
        <text
          x={center}
          y={center + 14}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="10"
        >
          Total Employees
        </text>
      </svg>
      <div className="flex-1 space-y-2.5">
        {data.map((dept) => (
          <div key={dept.name} className="flex items-center gap-3">
            <div
              className="h-3 w-3 rounded-full shrink-0"
              style={{ backgroundColor: dept.color }}
            />
            <span className="text-sm font-medium flex-1">{dept.name}</span>
            <span className="text-sm text-muted-foreground">
              {dept.headcount}
            </span>
            <span className="text-xs font-semibold text-muted-foreground w-12 text-right">
              {((dept.headcount / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AreaChart({ data }: { data: typeof monthlyTrends }) {
  const maxVal = Math.max(...data.flatMap((d) => [d.hiring, d.attrition]));
  const chartWidth = 500;
  const chartHeight = 160;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const w = chartWidth - padding.left - padding.right;
  const h = chartHeight - padding.top - padding.bottom;

  const xStep = w / (data.length - 1);

  const makePath = (key: "hiring" | "attrition") =>
    data
      .map(
        (d, i) =>
          `${i === 0 ? "M" : "L"} ${padding.left + i * xStep},${padding.top + h - (d[key] / maxVal) * h}`
      )
      .join(" ");

  const makeArea = (key: "hiring" | "attrition") => {
    const linePath = makePath(key);
    const lastX = padding.left + (data.length - 1) * xStep;
    const firstX = padding.left;
    const bottom = padding.top + h;
    return `${linePath} L ${lastX},${bottom} L ${firstX},${bottom} Z`;
  };

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        style={{ minWidth: 400 }}
      >
        <defs>
          <linearGradient id="hiring-area" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient
            id="attrition-area"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="hiring-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient
            id="attrition-line"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const y = padding.top + h - pct * h;
          const val = Math.round(maxVal * pct);
          return (
            <g key={`area-grid-${i}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + w}
                y2={y}
                stroke="currentColor"
                className="text-border"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-muted-foreground"
                fontSize="10"
              >
                {val}
              </text>
            </g>
          );
        })}

        {data.map((d, i) => (
          <text
            key={`month-${i}`}
            x={padding.left + i * xStep}
            y={chartHeight - 8}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            {d.label}
          </text>
        ))}

        <path d={makeArea("hiring")} fill="url(#hiring-area)" />
        <path
          d={makePath("hiring")}
          fill="none"
          stroke="url(#hiring-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path d={makeArea("attrition")} fill="url(#attrition-area)" />
        <path
          d={makePath("attrition")}
          fill="none"
          stroke="url(#attrition-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((d, i) => (
          <g key={`dots-${i}`}>
            <circle
              cx={padding.left + i * xStep}
              cy={padding.top + h - (d.hiring / maxVal) * h}
              r="3.5"
              fill="white"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle
              cx={padding.left + i * xStep}
              cy={padding.top + h - (d.attrition / maxVal) * h}
              r="3.5"
              fill="white"
              stroke="#ef4444"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-xs font-medium text-muted-foreground">
            Hiring
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-xs font-medium text-muted-foreground">
            Attrition
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [aiMessage, setAiMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { role: string; text: string }[]
  >([
    {
      role: "ai",
      text: "Hello! I'm your AI HR Assistant. I can help with employee insights, compliance status, payroll questions, and more. What would you like to know?",
    },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, [currentTime]);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleSendMessage = () => {
    if (!aiMessage.trim()) return;
    const userMsg = aiMessage;
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setAiMessage("");

    setTimeout(() => {
      const responses = [
        "Based on current data, I recommend prioritizing the 3 retention risk cases in Engineering. Want me to draft outreach emails?",
        "Payroll is on track for Jun 15. Total: $2.4M for 1,247 employees. No anomalies detected.",
        "Compliance training completion is at 82%. I've identified 47 employees who need reminders. Should I send them now?",
        "Hiring velocity is 8 days above target. The bottleneck is in technical interviews. I suggest adding 2 more interview slots.",
      ];
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: responses[Math.floor(Math.random() * responses.length)],
        },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {greeting}, Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            {formattedDate} &mdash; Here&apos;s what&apos;s happening across
            your organization today.
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </span>
            <span>|</span>
            <span>1,247 employees</span>
            <span>|</span>
            <span>34 open roles</span>
            <span>|</span>
            <span>94.2% attendance</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
            <RefreshCw size={16} />
            Refresh
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Eye size={16} />
            View Reports
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={cn(
                stat.cardClass || "stat-card",
                "group cursor-pointer"
              )}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                      stat.iconBg
                    )}
                  >
                    <Icon size={22} />
                  </div>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold tracking-tight">
                      <AnimatedCounter value={stat.value} />
                    </p>
                    <p
                      className={cn(
                        "mt-1.5 flex items-center gap-1 text-xs font-semibold",
                        stat.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-500"
                      )}
                    >
                      {stat.trend === "up" ? (
                        <ArrowUpRight size={14} />
                      ) : (
                        <ArrowDownRight size={14} />
                      )}
                      {stat.change}
                    </p>
                  </div>
                  <MiniSparkline
                    data={stat.sparkline}
                    color={stat.trend === "up" ? "#10b981" : "#ef4444"}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
              <Brain size={18} className="text-white" />
            </div>
            <h2 className="text-lg font-semibold">AI-Powered Insights</h2>
            <span className="badge badge-info">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              Live
            </span>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 stagger-children">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className={cn("ai-insight-card p-5", insight.priority)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{insight.title}</h3>
                    <span
                      className={cn(
                        "badge",
                        insight.priority === "high"
                          ? "badge-danger"
                          : "badge-warning"
                      )}
                    >
                      {insight.priority}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {insight.description}
                  </p>

                  {/* Confidence Meter */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">
                        Confidence
                      </span>
                      <span className="text-xs font-bold">
                        {insight.confidence}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-700 ease-out",
                          insight.confidence >= 90
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                            : insight.confidence >= 80
                              ? "bg-gradient-to-r from-blue-500 to-blue-400"
                              : "bg-gradient-to-r from-amber-500 to-amber-400"
                        )}
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {insight.agents.map((agent) => (
                      <span key={agent} className="badge badge-info">
                        <Sparkles size={10} className="mr-1" />
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                  <Zap size={18} className="text-amber-500" />
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {insight.actions.map((action) => (
                  <button
                    key={action}
                    className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/20 active:scale-95"
                  >
                    {action}
                    <ArrowRight size={10} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Overview */}
        <div className="lg:col-span-2 card-enterprise">
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-primary" />
                <h2 className="font-semibold">Department Overview</h2>
              </div>
              <button className="text-sm font-medium text-primary hover:underline">
                View All
              </button>
            </div>
          </div>
          <div className="p-6">
            <DepartmentBarChart data={teamMetrics} />
            <div className="mt-6 grid grid-cols-5 gap-2 border-t pt-4">
              {teamMetrics.map((dept) => (
                <div key={dept.name} className="text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: dept.color }}
                    />
                    <span className="text-xs font-medium truncate">
                      {dept.name}
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Sat: <span className="font-semibold text-foreground">{dept.satisfaction}%</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Turn:{" "}
                      <span
                        className={cn(
                          "font-semibold",
                          parseFloat(dept.turnover) > 6
                            ? "text-red-600"
                            : "text-emerald-600"
                        )}
                      >
                        {dept.turnover}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Hire: <span className="font-semibold text-foreground">{dept.hiring}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="card-enterprise p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Upcoming Events</h2>
              <Bell size={16} className="text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.event}
                    className="group relative flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm cursor-pointer overflow-hidden"
                  >
                    <div
                      className={cn(
                        "absolute left-0 top-0 h-full w-1 rounded-l-xl bg-gradient-to-b",
                        event.gradient
                      )}
                    />
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg bg-muted",
                        event.color
                      )}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-bold",
                        event.daysLeft <= 7
                          ? "bg-red-50 text-red-700 ring-1 ring-red-200"
                          : event.daysLeft <= 14
                            ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                            : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                      )}
                    >
                      {event.daysLeft}d
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card-enterprise p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Activity</h2>
              <Activity size={16} className="text-muted-foreground" />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-3 bottom-3 w-px bg-border" />
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="relative flex items-start gap-3 pl-2 group cursor-pointer"
                  >
                    <div
                      className={cn(
                        "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white transition-transform duration-200 group-hover:scale-110 ring-2 ring-card",
                        activity.color
                      )}
                    >
                      {activity.avatar}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm leading-snug">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-muted-foreground">
                          {activity.action}
                        </span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Row: Workforce Distribution + Monthly Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Workforce Distribution Donut */}
        <div className="card-enterprise p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <PieChart size={18} className="text-primary" />
              <h2 className="font-semibold">Workforce Distribution</h2>
            </div>
          </div>
          <DonutChart data={teamMetrics} />
        </div>

        {/* Monthly Trends */}
        <div className="card-enterprise p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              <h2 className="font-semibold">Monthly Trends</h2>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Jan - Jun 2026</span>
            </div>
          </div>
          <AreaChart data={monthlyTrends} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 stagger-children">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                className={cn(
                  "card-enterprise group flex flex-col items-center gap-3 p-5 text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-md",
                    action.bg
                  )}
                >
                  <Icon size={24} className={action.textColor} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{action.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {action.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Copilot FAB */}
      <button
        onClick={() => setShowChat(!showChat)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 hover:scale-110",
          showChat
            ? "bg-muted text-foreground shadow-lg"
            : "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30"
        )}
        style={
          !showChat
            ? { animation: "pulse-glow 3s ease-in-out infinite" }
            : undefined
        }
      >
        {showChat ? <ChevronRight size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* AI Chat Panel */}
      {showChat && (
        <div className="fixed bottom-24 right-6 z-50 w-96 animate-scale-in">
          <div className="card-enterprise shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 border-b p-4 bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-md">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">AI HR Assistant</h3>
                <p className="text-xs text-emerald-600 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  Online
                </p>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="rounded-lg p-1.5 hover:bg-muted transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="h-72 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3",
                    msg.role === "user" && "flex-row-reverse"
                  )}
                >
                  {msg.role === "ai" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Sparkles size={12} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm max-w-[80%]",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about your workforce..."
                  value={aiMessage}
                  onChange={(e) => setAiMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 rounded-xl border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  onClick={handleSendMessage}
                  className="rounded-xl bg-primary p-2.5 text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Who's at risk?",
                  "Payroll summary",
                  "Compliance status",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setAiMessage(q);
                    }}
                    className="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
