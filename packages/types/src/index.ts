export type UserRole =
  | "super_admin"
  | "company_admin"
  | "hr_director"
  | "hr_manager"
  | "recruiter"
  | "hiring_manager"
  | "payroll_admin"
  | "compliance_officer"
  | "employee"
  | "contractor";

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "intern"
  | "temporary";

export type EmploymentStatus =
  | "active"
  | "on_leave"
  | "terminated"
  | "resigned"
  | "retired"
  | "probation";

export type CompanySize =
  | "startup_1_10"
  | "small_11_50"
  | "medium_51_200"
  | "large_201_1000"
  | "enterprise_1001_5000"
  | "mega_5001_plus";

export type LeaveType =
  | "annual"
  | "sick"
  | "personal"
  | "maternity"
  | "paternity"
  | "bereavement"
  | "unpaid"
  | "study"
  | "sabbatical";

export type LeaveStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled";

export type AttendanceStatus =
  | "present"
  | "absent"
  | "late"
  | "half_day"
  | "work_from_home"
  | "holiday";

export type PerformanceRating =
  | "exceptional"
  | "exceeds_expectations"
  | "meets_expectations"
  | "needs_improvement"
  | "unsatisfactory";

export type JobStatus =
  | "draft"
  | "open"
  | "paused"
  | "closed"
  | "archived";

export type ApplicationStatus =
  | "applied"
  | "screening"
  | "phone_screen"
  | "interview_scheduled"
  | "interview_completed"
  | "offer_pending"
  | "offer_sent"
  | "offer_accepted"
  | "offer_rejected"
  | "hired"
  | "rejected"
  | "withdrawn";

export type InterviewType =
  | "phone_screen"
  | "technical"
  | "behavioral"
  | "panel"
  | "cultural_fit"
  | "final"
  | "hr_round";

export type PayrollStatus =
  | "draft"
  | "processing"
  | "processed"
  | "paid"
  | "on_hold"
  | "error";

export type ComplianceStatus =
  | "compliant"
  | "non_compliant"
  | "pending_review"
  | "expired"
  | "exempt";

export type DocumentType =
  | "resume"
  | "cover_letter"
  | "id_document"
  | "contract"
  | "offer_letter"
  | "policy_acknowledgement"
  | "certification"
  | "performance_review"
  | "tax_form"
  | "other";

export type NotificationType =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "reminder"
  | "action_required";

export interface Company {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logo?: string;
  size: CompanySize;
  industry: string;
  foundedYear?: number;
  headquarters?: Address;
  subscription: SubscriptionPlan;
  settings: CompanySettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface SubscriptionPlan {
  plan: "free" | "starter" | "professional" | "enterprise";
  maxEmployees: number;
  maxCompanies: number;
  features: string[];
  billingCycle: "monthly" | "annual";
  expiresAt?: Date;
}

export interface CompanySettings {
  timezone: string;
  currency: string;
  locale: string;
  fiscalYearStart: number;
  workingDaysPerWeek: number;
  workingHoursPerDay: number;
  dateFormat: string;
  autoApproveLeave: boolean;
  requireApprovalForHire: boolean;
  enableAiAgents: boolean;
}

export interface Department {
  id: string;
  companyId: string;
  name: string;
  code: string;
  parentId?: string;
  headId?: string;
  costCenter?: string;
  budget?: number;
  headcount: number;
  isActive: boolean;
  createdAt: Date;
}

export interface JobTitle {
  id: string;
  companyId: string;
  title: string;
  level: string;
  departmentId: string;
  minSalary?: number;
  maxSalary?: number;
  description?: string;
  requirements?: string[];
  isActive: boolean;
}

export interface Employee {
  id: string;
  companyId: string;
  employeeId: string;
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: string;
  nationality?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
  departmentId: string;
  jobTitleId: string;
  managerId?: string;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  dateOfJoining: Date;
  probationEndDate?: Date;
  salary?: number;
  currency?: string;
  bankDetails?: BankDetails;
  taxInfo?: TaxInfo;
  skills?: string[];
  certifications?: string[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: "checking" | "savings";
  iban?: string;
  swift?: string;
}

export interface TaxInfo {
  taxId: string;
  filingStatus: string;
  allowances: number;
  additionalWithholding?: number;
}

export interface Leave {
  id: string;
  employeeId: string;
  companyId: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason?: string;
  status: LeaveStatus;
  approvedBy?: string;
  approvedAt?: Date;
  comments?: string;
  createdAt: Date;
}

export interface Attendance {
  id: string;
  employeeId: string;
  companyId: string;
  date: Date;
  clockIn?: Date;
  clockOut?: Date;
  totalHours?: number;
  overtimeHours?: number;
  status: AttendanceStatus;
  location?: string;
  notes?: string;
  isRemote: boolean;
  createdAt: Date;
}

export interface JobPosting {
  id: string;
  companyId: string;
  title: string;
  departmentId: string;
  jobTitleId: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  isRemote: boolean;
  employmentType: EmploymentType;
  salaryRange?: { min: number; max: number; currency: string };
  status: JobStatus;
  hiringManagerId: string;
  recruiterIds: string[];
  postingDate: Date;
  closingDate?: Date;
  applicantCount: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Candidate {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  source: string;
  tags: string[];
  notes?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  companyId: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  screeningScore?: number;
  rankingScore?: number;
  notes?: string;
  rejectionReason?: string;
  appliedAt: Date;
  updatedAt: Date;
}

export interface Interview {
  id: string;
  applicationId: string;
  companyId: string;
  interviewerId: string;
  interviewType: InterviewType;
  scheduledAt: Date;
  duration: number;
  location?: string;
  meetingUrl?: string;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  feedback?: InterviewFeedback;
  createdAt: Date;
}

export interface InterviewFeedback {
  rating: PerformanceRating;
  strengths: string[];
  weaknesses: string[];
  notes: string;
  recommendation: "strong_hire" | "hire" | "neutral" | "no_hire" | "strong_no_hire";
}

export interface Offer {
  id: string;
  applicationId: string;
  companyId: string;
  employeeId?: string;
  position: string;
  departmentId: string;
  salary: number;
  currency: string;
  equity?: number;
  benefits: string[];
  startDate: Date;
  status: "draft" | "sent" | "accepted" | "rejected" | "expired";
  validUntil: Date;
  signedAt?: Date;
  createdAt: Date;
}

export interface PayrollRecord {
  id: string;
  companyId: string;
  employeeId: string;
  payPeriod: string;
  startDate: Date;
  endDate: Date;
  baseSalary: number;
  overtime?: number;
  bonus?: number;
  commissions?: number;
  deductions: PayrollDeductions;
  taxDeductions: number;
  netPay: number;
  status: PayrollStatus;
  processedAt?: Date;
  paidAt?: Date;
  createdAt: Date;
}

export interface PayrollDeductions {
  healthInsurance: number;
  retirement: number;
  other: number;
}

export interface PerformanceReview {
  id: string;
  companyId: string;
  employeeId: string;
  reviewerId: string;
  reviewPeriod: string;
  startDate: Date;
  endDate: Date;
  selfAssessment?: string;
  managerAssessment?: string;
  peerAssessments?: string[];
  overallRating?: PerformanceRating;
  goals?: Goal[];
  competencyScores?: CompetencyScore[];
  feedback360?: Feedback360;
  status: "draft" | "self_review" | "peer_review" | "manager_review" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  weight: number;
  progress: number;
  status: "not_started" | "in_progress" | "completed" | "overdue";
  dueDate: Date;
}

export interface CompetencyScore {
  competency: string;
  score: number;
  maxScore: number;
  comments?: string;
}

export interface Feedback360 {
  self: string;
  manager: string;
  peers: string[];
  reports?: string[];
}

export interface LearningCourse {
  id: string;
  companyId: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  modules: CourseModule[];
  instructorId?: string;
  isRequired: boolean;
  tags: string[];
  rating?: number;
  enrolledCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseModule {
  id: string;
  title: string;
  type: "video" | "article" | "quiz" | "assignment" | "interactive";
  content: string;
  duration: number;
  order: number;
  isRequired: boolean;
}

export interface Enrollment {
  id: string;
  courseId: string;
  employeeId: string;
  companyId: string;
  progress: number;
  status: "enrolled" | "in_progress" | "completed" | "dropped";
  enrolledAt: Date;
  completedAt?: Date;
  certificateUrl?: string;
}

export interface ComplianceItem {
  id: string;
  companyId: string;
  title: string;
  description: string;
  category: string;
  dueDate: Date;
  status: ComplianceStatus;
  assignedTo?: string[];
  documents: string[];
  lastVerified?: Date;
  nextReview?: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  companyId: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  companyId: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  changes?: Record<string, { from: unknown; to: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  companyId: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: Date;
}

export interface WorkflowTrigger {
  event: string;
  conditions?: WorkflowCondition[];
}

export interface WorkflowCondition {
  field: string;
  operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than";
  value: string | number | boolean;
}

export interface WorkflowStep {
  id: string;
  order: number;
  type: "approval" | "notification" | "task" | "ai_action" | "condition" | "delay";
  assignee?: string;
  assigneeRole?: UserRole;
  action: string;
  config: Record<string, unknown>;
  nextStepId?: string;
  conditionStepId?: string;
}

export interface AIInsight {
  id: string;
  companyId: string;
  type: string;
  title: string;
  summary: string;
  data: Record<string, unknown>;
  confidence: number;
  actionable: boolean;
  recommendedActions?: string[];
  generatedAt: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
