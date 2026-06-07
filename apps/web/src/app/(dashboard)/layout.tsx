"use client";

import { useState, useEffect } from "react";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Dashboard"]);
  const [userName, setUserName] = useState("User");
  const [showNotifications, setShowNotifications] = useState(false);

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
          setUserName(`${data.data.user.firstName} ${data.data.user.lastName}`);
        }
      })
      .catch(() => {});
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("tf_token");
    router.push("/login");
  }

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - Workday-style */}
      <aside
        className={cn(
          "flex flex-col border-r bg-card transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-[68px]"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center border-b px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="gradient-text text-lg font-bold">TalentFlow</span>
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent mx-auto">
              <Sparkles size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive = pathname.startsWith(item.href);
            const isExpanded = expandedItems.includes(item.title);
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.title}>
                <button
                  onClick={() => hasChildren && toggleExpanded(item.title)}
                  className={cn(
                    "sidebar-item w-full",
                    isActive && "active"
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {hasChildren && (
                        <ChevronDown
                          size={14}
                          className={cn(
                            "shrink-0 transition-transform duration-200",
                            !isExpanded && "-rotate-90"
                          )}
                        />
                      )}
                    </>
                  )}
                </button>

                {sidebarOpen && hasChildren && isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l pl-3">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-md px-3 py-2 text-sm transition-colors",
                          pathname === child.href
                            ? "bg-primary/8 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
        </nav>

        {/* User Profile */}
        <div className="border-t p-3">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-xs font-bold text-white">
              {userName.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            {sidebarOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">Super Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header - Workday-style */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search employees, jobs, reports..."
                className="h-10 w-96 rounded-lg border bg-muted/50 pl-9 pr-4 text-sm transition-colors placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-background"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2.5 text-muted-foreground hover:bg-muted transition-colors">
              <HelpCircle size={18} />
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative rounded-lg p-2.5 text-muted-foreground hover:bg-muted transition-colors"
            >
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
            </button>
            <button className="rounded-lg p-2.5 text-muted-foreground hover:bg-muted transition-colors">
              <MessageSquare size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
