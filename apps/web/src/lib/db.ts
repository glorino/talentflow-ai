import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);

// Inline schema types for standalone deployment
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
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  domain: varchar("domain", { length: 255 }),
  logo: text("logo"),
  size: varchar("size", { length: 50 }).notNull(),
  industry: varchar("industry", { length: 100 }).notNull(),
  settings: jsonb("settings").notNull().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }).notNull(),
  headcount: integer("headcount").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  employeeId: varchar("employee_id", { length: 50 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  avatar: text("avatar"),
  departmentId: uuid("department_id").references(() => departments.id).notNull(),
  managerId: uuid("manager_id"),
  employmentType: varchar("employment_type", { length: 20 }).notNull(),
  employmentStatus: varchar("employment_status", { length: 20 }).notNull().default("active"),
  dateOfJoining: timestamp("date_of_joining").notNull(),
  salary: decimal("salary", { precision: 12, scale: 2 }),
  skills: jsonb("skills").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobPostings = pgTable("job_postings", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  departmentId: uuid("department_id").references(() => departments.id).notNull(),
  description: text("description").notNull(),
  requirements: jsonb("requirements").default([]),
  location: varchar("location", { length: 255 }),
  isRemote: boolean("is_remote").default(false),
  employmentType: varchar("employment_type", { length: 20 }).notNull(),
  salaryMin: decimal("salary_min", { precision: 12, scale: 2 }),
  salaryMax: decimal("salary_max", { precision: 12, scale: 2 }),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  hiringManagerId: uuid("hiring_manager_id").references(() => employees.id).notNull(),
  applicantCount: integer("applicant_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const leaves = pgTable("leaves", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id").references(() => employees.id, { onDelete: "cascade" }).notNull(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  leaveType: varchar("leave_type", { length: 20 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  totalDays: integer("total_days").notNull(),
  reason: text("reason"),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attendance = pgTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id").references(() => employees.id, { onDelete: "cascade" }).notNull(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  date: timestamp("date").notNull(),
  clockIn: timestamp("clock_in"),
  clockOut: timestamp("clock_out"),
  totalHours: decimal("total_hours", { precision: 5, scale: 2 }),
  status: varchar("status", { length: 20 }).notNull(),
  isRemote: boolean("is_remote").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payrollRecords = pgTable("payroll_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  employeeId: uuid("employee_id").references(() => employees.id, { onDelete: "cascade" }).notNull(),
  payPeriod: varchar("pay_period", { length: 20 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  baseSalary: decimal("base_salary", { precision: 12, scale: 2 }).notNull(),
  netPay: decimal("net_pay", { precision: 12, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const performanceReviews = pgTable("performance_reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  employeeId: uuid("employee_id").references(() => employees.id, { onDelete: "cascade" }).notNull(),
  reviewerId: uuid("reviewer_id").references(() => employees.id).notNull(),
  reviewPeriod: varchar("review_period", { length: 50 }).notNull(),
  overallRating: varchar("overall_rating", { length: 30 }),
  status: varchar("status", { length: 30 }).default("draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const learningCourses = pgTable("learning_courses", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  difficulty: varchar("difficulty", { length: 20 }).notNull(),
  duration: integer("duration").notNull(),
  isRequired: boolean("is_required").default(false),
  enrolledCount: integer("enrolled_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const complianceItems = pgTable("compliance_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: varchar("status", { length: 20 }).default("pending_review").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type", { length: 30 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  userId: uuid("user_id").notNull(),
  action: varchar("action", { length: 100 }).notNull(),
  entity: varchar("entity", { length: 100 }).notNull(),
  entityId: uuid("entity_id").notNull(),
  changes: jsonb("changes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiInsights = pgTable("ai_insights", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  data: jsonb("data").default({}),
  confidence: decimal("confidence", { precision: 5, scale: 4 }).notNull(),
  actionable: boolean("actionable").default(false),
  recommendedActions: jsonb("recommended_actions").default([]),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

// Create drizzle db instance
const schema = {
  companies,
  departments,
  employees,
  jobPostings,
  leaves,
  attendance,
  payrollRecords,
  performanceReviews,
  learningCourses,
  complianceItems,
  notifications,
  auditLogs,
  aiInsights,
};

export const db = drizzle(sql, { schema });

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
