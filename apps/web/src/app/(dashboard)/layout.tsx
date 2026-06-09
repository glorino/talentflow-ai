"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  GraduationCap,
  Shield,
  Bot,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  Sparkles,
  MessageSquare,
  HelpCircle,
  Zap,
  FileText,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  UserCheck,
  DollarSign,
  Calendar,
  Clock,
  TrendingUp,
  GraduationCap,
  Shield,
  Bot,
  BarChart3,
  Settings,
};

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "Leave request pending",
    description: "3 employees awaiting approval",
    time: "5m ago",
    icon: Clock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    id: 2,
    title: "New hire onboarding",
    description: "Sarah Chen started today",
    time: "1h ago",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: 3,
    title: "Payroll review required",
    description: "Q2 payroll needs sign-off",
    time: "3h ago",
    icon: AlertCircle,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

const NAV_GROUPS = [
  {
    label: "Overview",
    items: NAV_ITEMS.filter((i) => ["Dashboard"].includes(i.title)),
  },
  {
    label: "Recruitment",
    items: NAV_ITEMS.filter((i) =>
      ["Job Openings", "Candidates", "Interviews", "Offer Letters"].includes(
        i.title
      )
    ),
  },
  {
    label: "Employees",
    items: NAV_ITEMS.filter((i) =>
      ["Employees", "Departments", "Team Structure"].includes(i.title)
    ),
  },
  {
    label: "Payroll & Benefits",
    items: NAV_ITEMS.filter((i) =>
      ["Payroll", "Benefits", "Tax & Compliance"].includes(i.title)
    ),
  },
  {
    label: "Time & Attendance",
    items: NAV_ITEMS.filter((i) =>
      ["Leave Management", "Timesheets", "Shifts"].includes(i.title)
    ),
  },
  {
    label: "Analytics & Tools",
    items: NAV_ITEMS.filter((i) =>
      [
        "Performance",
        "Training",
        "Reports",
        "AI Assistant",
        "Settings",
      ].includes(i.title)
    ),
  },
];

const QUICK_ACTIONS = [
  { label: "New Hire", icon: UserCheck, color: "from-violet-500 to-indigo-500" },
  { label: "Post Job", icon: FileText, color: "from-sky-500 to-blue-500" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("Super Admin");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("tf_token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setUserName(
            `${data.data.user.firstName} ${data.data.user.lastName}`
          );
          setUserRole(data.data.user.role ?? "Super Admin");
        }
      })
      .catch(() => {});
  }, [router]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  function handleLogout() {
    localStorage.removeItem("tf_token");
    router.push("/login");
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const breadcrumbs = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, idx, arr) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
      href: "/" + arr.slice(0, idx + 1).join("/"),
      isLast: idx === arr.length - 1,
    }));

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function SidebarNav({ collapsed }: { collapsed?: boolean }) {
    return (
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {/* Quick Actions */}
        {!collapsed && (
          <div className="px-2">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Quick Actions
            </p>
            <div className="flex gap-2">
              {QUICK_ACTIONS.map((qa) => (
                <button
                  key={qa.label}
                  className={cn(
                    "group flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-white shadow-md transition-all duration-200",
                    `bg-gradient-to-r ${qa.color}`,
                    "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  )}
                >
                  <qa.icon size={14} />
                  {qa.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {NAV_GROUPS.map((group) => {
          const groupItems = group.items.filter(Boolean);
          if (groupItems.length === 0) return null;

          return (
            <div key={group.label}>
              {!collapsed && (
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {group.label}
                </p>
              )}
              <div className="space-y-0.5">
                {groupItems.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard;
                  const isActive = pathname.startsWith(item.href);
                  const isExpanded = expandedItems.includes(item.title);
                  const hasChildren =
                    item.children && item.children.length > 0;
                  const hasNotification =
                    item.title === "Leave Management";

                  if (collapsed) {
                    return (
                      <div key={item.title} className="relative group">
                        <Link
                          href={item.href}
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon size={18} />
                          {hasNotification && (
                            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                          )}
                        </Link>
                        {/* Tooltip */}
                        <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 rounded-lg bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          {item.title}
                          <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 rotate-45 h-2 w-2 bg-popover" />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => hasChildren && toggleExpanded(item.title)}
                        className={cn(
                          "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/8 text-primary"
                            : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                        )}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-7 w-[3px] rounded-full bg-gradient-to-b from-primary via-primary to-accent shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                        )}
                        <Icon
                          size={18}
                          className={cn(
                            "shrink-0 transition-colors duration-200",
                            isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <span className="flex-1 text-left">{item.title}</span>
                        {hasNotification && (
                          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white animate-pulse">
                            3
                          </span>
                        )}
                        {hasChildren && (
                          <ChevronDown
                            size={14}
                            className={cn(
                              "shrink-0 transition-transform duration-200 text-muted-foreground",
                              !isExpanded && "-rotate-90"
                            )}
                          />
                        )}
                      </button>

                      {hasChildren && isExpanded && (
                        <div className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-muted pl-3">
                          {item.children!.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "block rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                pathname === child.href
                                  ? "bg-primary/8 text-primary font-medium border-l-2 border-primary -ml-[2px] pl-[14px]"
                                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                              )}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 transition-all duration-300 ease-in-out lg:relative",
          "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950",
          sidebarOpen ? "w-64" : "w-[68px]",
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div
          className={cn(
            "relative flex items-center border-b border-white/10 transition-all duration-300",
            sidebarOpen ? "h-16 px-4" : "h-16 justify-center px-2"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2.5",
              !sidebarOpen && "justify-center"
            )}
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 via-primary to-accent shadow-lg shadow-primary/25">
              <Sparkles size={18} className="text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-violet-500 via-primary to-accent opacity-30 blur-sm" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white">
                  TalentFlow
                </span>
                <span className="text-[10px] font-medium text-slate-400 -mt-0.5">
                  HR Platform
                </span>
              </div>
            )}
          </div>
          {/* Collapse toggle - desktop only */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "hidden lg:flex items-center justify-center h-6 w-6 rounded-md bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200",
              sidebarOpen ? "absolute right-3 top-1/2 -translate-y-1/2" : "absolute right-1 top-2"
            )}
          >
            {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="absolute right-3 top-5 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden transition-colors"
        >
          <X size={18} />
        </button>

        {/* Navigation */}
        <SidebarNav collapsed={!sidebarOpen} />

        {/* User Profile */}
        <div className="border-t border-white/10 p-3">
          <div
            className={cn(
              "flex items-center rounded-xl p-2.5 transition-all duration-200",
              sidebarOpen
                ? "gap-3 hover:bg-white/5"
                : "justify-center"
            )}
          >
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-primary to-accent text-xs font-bold text-white shadow-lg shadow-primary/20">
                {initials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-500" />
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {userName}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {userRole}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 bg-card/80 px-6 backdrop-blur-xl">
          {/* Gradient bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors lg:hidden"
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1.5 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <LayoutDashboard size={14} />
              </Link>
              {breadcrumbs.map((crumb) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  <ChevronRight size={12} className="text-muted-foreground/40" />
                  {crumb.isLast ? (
                    <span className="font-medium text-foreground">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={cn(
                  "h-10 rounded-xl border bg-muted/30 pl-9 pr-20 text-sm transition-all duration-300 placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background focus:border-primary/30",
                  searchFocused ? "w-80 border-primary/30" : "w-64 border-transparent"
                )}
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border bg-muted/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            <div className="flex items-center gap-1 ml-2">
              <button className="rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200">
                <HelpCircle size={18} />
              </button>

              {/* Notifications */}
              <div ref={notifRef} className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={cn(
                    "relative rounded-xl p-2.5 transition-all duration-200",
                    showNotifications
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Bell size={18} />
                  <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border bg-card shadow-2xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                      <h3 className="text-sm font-semibold">Notifications</h3>
                      <button className="text-xs text-primary hover:underline">
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {MOCK_NOTIFICATIONS.map((notif) => (
                        <div
                          key={notif.id}
                          className="flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b last:border-0"
                        >
                          <div
                            className={cn(
                              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                              notif.bg
                            )}
                          >
                            <notif.icon size={16} className={notif.color} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {notif.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {notif.description}
                            </p>
                          </div>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
                            {notif.time}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t px-4 py-2.5">
                      <button className="w-full text-center text-xs font-medium text-primary hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button className="rounded-xl p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200">
                <MessageSquare size={18} />
              </button>

              {/* User avatar in header */}
              <div className="ml-2 flex items-center gap-2 rounded-xl border border-border/50 py-1 pl-1 pr-2.5 hover:bg-muted/50 transition-all duration-200 cursor-pointer">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 via-primary to-accent text-[10px] font-bold text-white">
                  {initials}
                </div>
                <ChevronDown size={14} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {children}
        </div>
      </main>
    </div>
  );
}
