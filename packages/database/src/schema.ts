import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "company_admin",
  "hr_director",
  "hr_manager",
  "recruiter",
  "hiring_manager",
  "payroll_admin",
  "compliance_officer",
  "employee",
  "contractor",
]);

export const employmentTypeEnum = pgEnum("employment_type", [
  "full_time",
  "part_time",
  "contract",
  "intern",
  "temporary",
]);

export const employmentStatusEnum = pgEnum("employment_status", [
  "active",
  "on_leave",
  "terminated",
  "resigned",
  "retired",
  "probation",
]);

export const leaveTypeEnum = pgEnum("leave_type", [
  "annual",
  "sick",
  "personal",
  "maternity",
  "paternity",
  "bereavement",
  "unpaid",
  "study",
  "sabbatical",
]);

export const leaveStatusEnum = pgEnum("leave_status", [
  "pending",
  "approved",
  "rejected",
  "cancelled",
]);

export const attendanceStatusEnum = pgEnum("attendance_status", [
  "present",
  "absent",
  "late",
  "half_day",
  "work_from_home",
  "holiday",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "draft",
  "open",
  "paused",
  "closed",
  "archived",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "applied",
  "screening",
  "phone_screen",
  "interview_scheduled",
  "interview_completed",
  "offer_pending",
  "offer_sent",
  "offer_accepted",
  "offer_rejected",
  "hired",
  "rejected",
  "withdrawn",
]);

export const interviewTypeEnum = pgEnum("interview_type", [
  "phone_screen",
  "technical",
  "behavioral",
  "panel",
  "cultural_fit",
  "final",
  "hr_round",
]);

export const payrollStatusEnum = pgEnum("payroll_status", [
  "draft",
  "processing",
  "processed",
  "paid",
  "on_hold",
  "error",
]);

export const performanceRatingEnum = pgEnum("performance_rating", [
  "exceptional",
  "exceeds_expectations",
  "meets_expectations",
  "needs_improvement",
  "unsatisfactory",
]);

export const complianceStatusEnum = pgEnum("compliance_status", [
  "compliant",
  "non_compliant",
  "pending_review",
  "expired",
  "exempt",
]);

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    domain: varchar("domain", { length: 255 }),
    logo: text("logo"),
    size: varchar("size", { length: 50 }).notNull(),
    industry: varchar("industry", { length: 100 }).notNull(),
    foundedYear: integer("founded_year"),
    street: varchar("street", { length: 255 }),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 100 }),
    zipCode: varchar("zip_code", { length: 20 }),
    subscription: jsonb("subscription").notNull().default({}),
    settings: jsonb("settings").notNull().default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("companies_slug_idx").on(t.slug),
    uniqueIndex("companies_domain_idx").on(t.domain),
  ]
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    avatar: text("avatar"),
    role: userRoleEnum("role").notNull().default("employee"),
    companyId: uuid("company_id").references(() => companies.id),
    isActive: boolean("is_active").default(true).notNull(),
    lastLoginAt: timestamp("last_login_at"),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("users_clerk_id_idx").on(t.clerkId),
    uniqueIndex("users_email_idx").on(t.email),
    index("users_company_id_idx").on(t.companyId),
  ]
);

export const departments = pgTable(
  "departments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 50 }).notNull(),
    parentId: uuid("parent_id"),
    headId: uuid("head_id"),
    costCenter: varchar("cost_center", { length: 50 }),
    budget: decimal("budget", { precision: 15, scale: 2 }),
    headcount: integer("headcount").default(0).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("departments_company_id_idx").on(t.companyId),
    index("departments_parent_id_idx").on(t.parentId),
    uniqueIndex("departments_code_company_idx").on(t.code, t.companyId),
  ]
);

export const jobTitles = pgTable(
  "job_titles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    level: varchar("level", { length: 50 }).notNull(),
    departmentId: uuid("department_id")
      .references(() => departments.id)
      .notNull(),
    minSalary: decimal("min_salary", { precision: 12, scale: 2 }),
    maxSalary: decimal("max_salary", { precision: 12, scale: 2 }),
    description: text("description"),
    requirements: jsonb("requirements").default([]),
    isActive: boolean("is_active").default(true).notNull(),
  },
  (t) => [
    index("job_titles_company_id_idx").on(t.companyId),
    index("job_titles_department_id_idx").on(t.departmentId),
  ]
);

export const employees = pgTable(
  "employees",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    employeeId: varchar("employee_id", { length: 50 }).notNull(),
    userId: uuid("user_id").references(() => users.id),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    avatar: text("avatar"),
    dateOfBirth: timestamp("date_of_birth"),
    gender: varchar("gender", { length: 20 }),
    nationality: varchar("nationality", { length: 100 }),
    street: varchar("street", { length: 255 }),
    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    country: varchar("country", { length: 100 }),
    zipCode: varchar("zip_code", { length: 20 }),
    emergencyContact: jsonb("emergency_contact"),
    departmentId: uuid("department_id")
      .references(() => departments.id)
      .notNull(),
    jobTitleId: uuid("job_title_id")
      .references(() => jobTitles.id)
      .notNull(),
    managerId: uuid("manager_id"),
    employmentType: employmentTypeEnum("employment_type").notNull(),
    employmentStatus: employmentStatusEnum("employment_status")
      .notNull()
      .default("active"),
    dateOfJoining: timestamp("date_of_joining").notNull(),
    probationEndDate: timestamp("probation_end_date"),
    salary: decimal("salary", { precision: 12, scale: 2 }),
    currency: varchar("currency", { length: 3 }).default("USD"),
    bankDetails: jsonb("bank_details"),
    taxInfo: jsonb("tax_info"),
    skills: jsonb("skills").default([]),
    certifications: jsonb("certifications").default([]),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("employees_company_id_idx").on(t.companyId),
    index("employees_department_id_idx").on(t.departmentId),
    index("employees_manager_id_idx").on(t.managerId),
    index("employees_user_id_idx").on(t.userId),
    uniqueIndex("employees_employee_id_company_idx").on(
      t.employeeId,
      t.companyId
    ),
    uniqueIndex("employees_email_company_idx").on(t.email, t.companyId),
  ]
);

export const jobPostings = pgTable(
  "job_postings",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    departmentId: uuid("department_id")
      .references(() => departments.id)
      .notNull(),
    jobTitleId: uuid("job_title_id").references(() => jobTitles.id),
    description: text("description").notNull(),
    requirements: jsonb("requirements").default([]),
    responsibilities: jsonb("responsibilities").default([]),
    location: varchar("location", { length: 255 }),
    isRemote: boolean("is_remote").default(false),
    employmentType: employmentTypeEnum("employment_type").notNull(),
    salaryMin: decimal("salary_min", { precision: 12, scale: 2 }),
    salaryMax: decimal("salary_max", { precision: 12, scale: 2 }),
    salaryCurrency: varchar("salary_currency", { length: 3 }).default("USD"),
    status: jobStatusEnum("status").default("draft").notNull(),
    hiringManagerId: uuid("hiring_manager_id")
      .references(() => employees.id)
      .notNull(),
    postingDate: timestamp("posting_date"),
    closingDate: timestamp("closing_date"),
    applicantCount: integer("applicant_count").default(0).notNull(),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("job_postings_company_id_idx").on(t.companyId),
    index("job_postings_status_idx").on(t.status),
    index("job_postings_department_id_idx").on(t.departmentId),
  ]
);

export const candidates = pgTable(
  "candidates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    resumeUrl: text("resume_url"),
    linkedInUrl: text("linkedin_url"),
    portfolioUrl: text("portfolio_url"),
    source: varchar("source", { length: 100 }),
    tags: jsonb("tags").default([]),
    notes: text("notes"),
    metadata: jsonb("metadata").default({}),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("candidates_company_id_idx").on(t.companyId),
    index("candidates_email_idx").on(t.email),
  ]
);

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    jobId: uuid("job_id")
      .references(() => jobPostings.id, { onDelete: "cascade" })
      .notNull(),
    candidateId: uuid("candidate_id")
      .references(() => candidates.id, { onDelete: "cascade" })
      .notNull(),
    status: applicationStatusEnum("status").default("applied").notNull(),
    coverLetter: text("cover_letter"),
    screeningScore: integer("screening_score"),
    rankingScore: decimal("ranking_score", { precision: 5, scale: 2 }),
    notes: text("notes"),
    rejectionReason: text("rejection_reason"),
    appliedAt: timestamp("applied_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("applications_company_id_idx").on(t.companyId),
    index("applications_job_id_idx").on(t.jobId),
    index("applications_candidate_id_idx").on(t.candidateId),
    index("applications_status_idx").on(t.status),
    uniqueIndex("applications_job_candidate_idx").on(t.jobId, t.candidateId),
  ]
);

export const interviews = pgTable(
  "interviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .references(() => applications.id, { onDelete: "cascade" })
      .notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    interviewerId: uuid("interviewer_id")
      .references(() => employees.id)
      .notNull(),
    interviewType: interviewTypeEnum("interview_type").notNull(),
    scheduledAt: timestamp("scheduled_at").notNull(),
    duration: integer("duration").notNull().default(60),
    location: varchar("location", { length: 255 }),
    meetingUrl: text("meeting_url"),
    status: varchar("status", { length: 20 }).default("scheduled").notNull(),
    feedback: jsonb("feedback"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("interviews_application_id_idx").on(t.applicationId),
    index("interviews_interviewer_id_idx").on(t.interviewerId),
    index("interviews_scheduled_at_idx").on(t.scheduledAt),
  ]
);

export const offers = pgTable(
  "offers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .references(() => applications.id, { onDelete: "cascade" })
      .notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    employeeId: uuid("employee_id").references(() => employees.id),
    position: varchar("position", { length: 255 }).notNull(),
    departmentId: uuid("department_id")
      .references(() => departments.id)
      .notNull(),
    salary: decimal("salary", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("USD"),
    equity: decimal("equity", { precision: 8, scale: 4 }),
    benefits: jsonb("benefits").default([]),
    startDate: timestamp("start_date").notNull(),
    status: varchar("status", { length: 20 }).default("draft").notNull(),
    validUntil: timestamp("valid_until").notNull(),
    signedAt: timestamp("signed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("offers_application_id_idx").on(t.applicationId),
    index("offers_company_id_idx").on(t.companyId),
  ]
);

export const leaves = pgTable(
  "leaves",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    employeeId: uuid("employee_id")
      .references(() => employees.id, { onDelete: "cascade" })
      .notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    leaveType: leaveTypeEnum("leave_type").notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    totalDays: integer("total_days").notNull(),
    reason: text("reason"),
    status: leaveStatusEnum("status").default("pending").notNull(),
    approvedBy: uuid("approved_by"),
    approvedAt: timestamp("approved_at"),
    comments: text("comments"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("leaves_employee_id_idx").on(t.employeeId),
    index("leaves_company_id_idx").on(t.companyId),
    index("leaves_status_idx").on(t.status),
  ]
);

export const attendance = pgTable(
  "attendance",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    employeeId: uuid("employee_id")
      .references(() => employees.id, { onDelete: "cascade" })
      .notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    date: timestamp("date").notNull(),
    clockIn: timestamp("clock_in"),
    clockOut: timestamp("clock_out"),
    totalHours: decimal("total_hours", { precision: 5, scale: 2 }),
    overtimeHours: decimal("overtime_hours", { precision: 5, scale: 2 }).default("0"),
    status: attendanceStatusEnum("status").notNull(),
    location: varchar("location", { length: 255 }),
    notes: text("notes"),
    isRemote: boolean("is_remote").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("attendance_employee_id_idx").on(t.employeeId),
    index("attendance_company_id_idx").on(t.companyId),
    index("attendance_date_idx").on(t.date),
    uniqueIndex("attendance_employee_date_idx").on(t.employeeId, t.date),
  ]
);

export const payrollRecords = pgTable(
  "payroll_records",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    employeeId: uuid("employee_id")
      .references(() => employees.id, { onDelete: "cascade" })
      .notNull(),
    payPeriod: varchar("pay_period", { length: 20 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    baseSalary: decimal("base_salary", { precision: 12, scale: 2 }).notNull(),
    overtime: decimal("overtime", { precision: 12, scale: 2 }).default("0"),
    bonus: decimal("bonus", { precision: 12, scale: 2 }).default("0"),
    commissions: decimal("commissions", { precision: 12, scale: 2 }).default("0"),
    deductions: jsonb("deductions").notNull().default({}),
    taxDeductions: decimal("tax_deductions", { precision: 12, scale: 2 })
      .notNull()
      .default("0"),
    netPay: decimal("net_pay", { precision: 12, scale: 2 }).notNull(),
    status: payrollStatusEnum("status").default("draft").notNull(),
    processedAt: timestamp("processed_at"),
    paidAt: timestamp("paid_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("payroll_records_company_id_idx").on(t.companyId),
    index("payroll_records_employee_id_idx").on(t.employeeId),
    index("payroll_records_status_idx").on(t.status),
  ]
);

export const performanceReviews = pgTable(
  "performance_reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    employeeId: uuid("employee_id")
      .references(() => employees.id, { onDelete: "cascade" })
      .notNull(),
    reviewerId: uuid("reviewer_id")
      .references(() => employees.id)
      .notNull(),
    reviewPeriod: varchar("review_period", { length: 50 }).notNull(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    selfAssessment: text("self_assessment"),
    managerAssessment: text("manager_assessment"),
    peerAssessments: jsonb("peer_assessments").default([]),
    overallRating: performanceRatingEnum("overall_rating"),
    goals: jsonb("goals").default([]),
    competencyScores: jsonb("competency_scores").default([]),
    feedback360: jsonb("feedback_360"),
    status: varchar("status", { length: 30 }).default("draft").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("performance_reviews_company_id_idx").on(t.companyId),
    index("performance_reviews_employee_id_idx").on(t.employeeId),
    index("performance_reviews_status_idx").on(t.status),
  ]
);

export const learningCourses = pgTable(
  "learning_courses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    difficulty: varchar("difficulty", { length: 20 }).notNull(),
    duration: integer("duration").notNull(),
    modules: jsonb("modules").default([]),
    instructorId: uuid("instructor_id").references(() => employees.id),
    isRequired: boolean("is_required").default(false),
    tags: jsonb("tags").default([]),
    rating: decimal("rating", { precision: 3, scale: 2 }),
    enrolledCount: integer("enrolled_count").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [
    index("learning_courses_company_id_idx").on(t.companyId),
    index("learning_courses_category_idx").on(t.category),
  ]
);

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    courseId: uuid("course_id")
      .references(() => learningCourses.id, { onDelete: "cascade" })
      .notNull(),
    employeeId: uuid("employee_id")
      .references(() => employees.id, { onDelete: "cascade" })
      .notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    progress: integer("progress").default(0).notNull(),
    status: varchar("status", { length: 20 }).default("enrolled").notNull(),
    enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
    completedAt: timestamp("completed_at"),
    certificateUrl: text("certificate_url"),
  },
  (t) => [
    index("enrollments_course_id_idx").on(t.courseId),
    index("enrollments_employee_id_idx").on(t.employeeId),
    uniqueIndex("enrollments_course_employee_idx").on(t.courseId, t.employeeId),
  ]
);

export const complianceItems = pgTable(
  "compliance_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    category: varchar("category", { length: 100 }).notNull(),
    dueDate: timestamp("due_date").notNull(),
    status: complianceStatusEnum("status").default("pending_review").notNull(),
    assignedTo: jsonb("assigned_to").default([]),
    documents: jsonb("documents").default([]),
    lastVerified: timestamp("last_verified"),
    nextReview: timestamp("next_review"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("compliance_items_company_id_idx").on(t.companyId),
    index("compliance_items_status_idx").on(t.status),
    index("compliance_items_due_date_idx").on(t.dueDate),
  ]
);

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    type: varchar("type", { length: 30 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    actionUrl: text("action_url"),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("notifications_user_id_idx").on(t.userId),
    index("notifications_is_read_idx").on(t.isRead),
  ]
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    action: varchar("action", { length: 100 }).notNull(),
    entity: varchar("entity", { length: 100 }).notNull(),
    entityId: uuid("entity_id").notNull(),
    changes: jsonb("changes"),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("audit_logs_company_id_idx").on(t.companyId),
    index("audit_logs_user_id_idx").on(t.userId),
    index("audit_logs_entity_idx").on(t.entity, t.entityId),
    index("audit_logs_created_at_idx").on(t.createdAt),
  ]
);

export const workflowTemplates = pgTable(
  "workflow_templates",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    trigger: jsonb("trigger").notNull(),
    steps: jsonb("steps").notNull().default([]),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("workflow_templates_company_id_idx").on(t.companyId)]
);

export const aiInsights = pgTable(
  "ai_insights",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    summary: text("summary").notNull(),
    data: jsonb("data").default({}),
    confidence: decimal("confidence", { precision: 5, scale: 4 }).notNull(),
    actionable: boolean("actionable").default(false),
    recommendedActions: jsonb("recommended_actions").default([]),
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
  },
  (t) => [
    index("ai_insights_company_id_idx").on(t.companyId),
    index("ai_insights_type_idx").on(t.type),
  ]
);
