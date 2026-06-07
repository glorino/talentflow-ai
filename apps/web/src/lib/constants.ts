export const APP_NAME = "TalentFlow AI";
export const APP_DESCRIPTION = "Enterprise AI-Powered HR Operating System";

export const NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "Recruitment",
    href: "/recruitment",
    icon: "Users",
    children: [
      { title: "Job Postings", href: "/recruitment/jobs" },
      { title: "Candidates", href: "/recruitment/candidates" },
      { title: "Applications", href: "/recruitment/applications" },
      { title: "Interviews", href: "/recruitment/interviews" },
      { title: "Offers", href: "/recruitment/offers" },
    ],
  },
  {
    title: "Employees",
    href: "/employees",
    icon: "UserCheck",
    children: [
      { title: "Directory", href: "/employees/directory" },
      { title: "Onboarding", href: "/employees/onboarding" },
      { title: "Organization Chart", href: "/employees/org-chart" },
    ],
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: "DollarSign",
    children: [
      { title: "Run Payroll", href: "/payroll/run" },
      { title: "History", href: "/payroll/history" },
      { title: "Reports", href: "/payroll/reports" },
    ],
  },
  {
    title: "Leave",
    href: "/leave",
    icon: "Calendar",
    children: [
      { title: "My Leave", href: "/leave/my-leave" },
      { title: "Requests", href: "/leave/requests" },
      { title: "Calendar", href: "/leave/calendar" },
      { title: "Policy", href: "/leave/policy" },
    ],
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: "Clock",
    children: [
      { title: "My Attendance", href: "/attendance/my" },
      { title: "Team Attendance", href: "/attendance/team" },
      { title: "Reports", href: "/attendance/reports" },
    ],
  },
  {
    title: "Performance",
    href: "/performance",
    icon: "TrendingUp",
    children: [
      { title: "Reviews", href: "/performance/reviews" },
      { title: "Goals", href: "/performance/goals" },
      { title: "360 Feedback", href: "/performance/feedback" },
      { title: "Analytics", href: "/performance/analytics" },
    ],
  },
  {
    title: "Learning",
    href: "/learning",
    icon: "GraduationCap",
    children: [
      { title: "Courses", href: "/learning/courses" },
      { title: "My Learning", href: "/learning/my-learning" },
      { title: "Catalog", href: "/learning/catalog" },
      { title: "Certificates", href: "/learning/certificates" },
    ],
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: "Shield",
    children: [
      { title: "Dashboard", href: "/compliance/dashboard" },
      { title: "Policies", href: "/compliance/policies" },
      { title: "Training", href: "/compliance/training" },
      { title: "Audits", href: "/compliance/audits" },
    ],
  },
  {
    title: "AI Agents",
    href: "/ai",
    icon: "Bot",
    children: [
      { title: "Agent Dashboard", href: "/ai/dashboard" },
      { title: "Workflows", href: "/ai/workflows" },
      { title: "Insights", href: "/ai/insights" },
      { title: "Settings", href: "/ai/settings" },
    ],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "BarChart3",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
    children: [
      { title: "Company", href: "/settings/company" },
      { title: "Users", href: "/settings/users" },
      { title: "Roles & Permissions", href: "/settings/roles" },
      { title: "Integrations", href: "/settings/integrations" },
    ],
  },
];

export const ROLE_HIERARCHY = {
  super_admin: 100,
  company_admin: 90,
  hr_director: 80,
  hr_manager: 70,
  payroll_admin: 65,
  compliance_officer: 65,
  recruiter: 60,
  hiring_manager: 55,
  employee: 10,
  contractor: 5,
} as const;

export const LEAVE_BALANCES = {
  annual: 20,
  sick: 10,
  personal: 5,
  bereavement: 5,
  study: 5,
} as const;

export const PERFORMANCE_WEIGHTS = {
  goals: 0.4,
  competencies: 0.3,
  feedback: 0.2,
  selfAssessment: 0.1,
} as const;
