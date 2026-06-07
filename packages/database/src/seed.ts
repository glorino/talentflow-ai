import { db } from "./src/index";
import {
  companies,
  departments,
  jobTitles,
  employees,
  jobPostings,
  learningCourses,
  complianceItems,
} from "./src/schema";

async function seed() {
  console.log("Seeding database...");

  const [company] = await db
    .insert(companies)
    .values({
      name: "Acme Corp",
      slug: "acme-corp",
      domain: "acme.com",
      size: "medium_51_200",
      industry: "Technology",
      settings: {
        timezone: "America/New_York",
        currency: "USD",
        locale: "en-US",
        fiscalYearStart: 1,
        workingDaysPerWeek: 5,
        workingHoursPerDay: 8,
        dateFormat: "MM/DD/YYYY",
        autoApproveLeave: false,
        requireApprovalForHire: true,
        enableAiAgents: true,
      },
    })
    .returning();

  console.log("Company:", company.name);

  const [hrDept] = await db
    .insert(departments)
    .values({ companyId: company.id, name: "Human Resources", code: "HR", headcount: 5 })
    .returning();

  const [engDept] = await db
    .insert(departments)
    .values({ companyId: company.id, name: "Engineering", code: "ENG", headcount: 45 })
    .returning();

  const [salesDept] = await db
    .insert(departments)
    .values({ companyId: company.id, name: "Sales", code: "SLS", headcount: 30 })
    .returning();

  const [finDept] = await db
    .insert(departments)
    .values({ companyId: company.id, name: "Finance", code: "FIN", headcount: 10 })
    .returning();

  const [hrTitle] = await db
    .insert(jobTitles)
    .values({ companyId: company.id, title: "HR Director", level: "director", departmentId: hrDept.id })
    .returning();

  const [engTitle] = await db
    .insert(jobTitles)
    .values({ companyId: company.id, title: "Senior Software Engineer", level: "senior", departmentId: engDept.id })
    .returning();

  const [salesTitle] = await db
    .insert(jobTitles)
    .values({ companyId: company.id, title: "Sales Manager", level: "manager", departmentId: salesDept.id })
    .returning();

  const [finTitle] = await db
    .insert(jobTitles)
    .values({ companyId: company.id, title: "Payroll Specialist", level: "mid", departmentId: finDept.id })
    .returning();

  const [emp1] = await db
    .insert(employees)
    .values({
      companyId: company.id,
      employeeId: "EMP-001",
      firstName: "Sarah",
      lastName: "Chen",
      email: "sarah.chen@acme.com",
      departmentId: hrDept.id,
      jobTitleId: hrTitle.id,
      employmentType: "full_time",
      employmentStatus: "active",
      dateOfJoining: new Date("2022-01-15"),
      salary: "150000",
      skills: ["HR Management", "Recruiting"],
    })
    .returning();

  const [emp2] = await db
    .insert(employees)
    .values({
      companyId: company.id,
      employeeId: "EMP-002",
      firstName: "James",
      lastName: "Wilson",
      email: "james.wilson@acme.com",
      departmentId: engDept.id,
      jobTitleId: engTitle.id,
      managerId: emp1.id,
      employmentType: "full_time",
      employmentStatus: "active",
      dateOfJoining: new Date("2021-06-01"),
      salary: "175000",
      skills: ["React", "Node.js", "TypeScript"],
    })
    .returning();

  const [emp3] = await db
    .insert(employees)
    .values({
      companyId: company.id,
      employeeId: "EMP-003",
      firstName: "Maria",
      lastName: "Rodriguez",
      email: "maria.rodriguez@acme.com",
      departmentId: salesDept.id,
      jobTitleId: salesTitle.id,
      managerId: emp1.id,
      employmentType: "full_time",
      employmentStatus: "active",
      dateOfJoining: new Date("2020-03-10"),
      salary: "115000",
      skills: ["Sales", "Negotiation", "CRM"],
    })
    .returning();

  await db.insert(employees).values({
    companyId: company.id,
    employeeId: "EMP-004",
    firstName: "David",
    lastName: "Kim",
    email: "david.kim@acme.com",
    departmentId: finDept.id,
    jobTitleId: finTitle.id,
    managerId: emp1.id,
    employmentType: "full_time",
    employmentStatus: "active",
    dateOfJoining: new Date("2023-02-20"),
    salary: "75000",
    skills: ["Payroll", "Accounting"],
  });

  await db.insert(jobPostings).values([
    {
      companyId: company.id,
      title: "Full Stack Developer",
      departmentId: engDept.id,
      jobTitleId: engTitle.id,
      description: "Looking for a Full Stack Developer.",
      requirements: ["5+ years experience", "React", "Node.js"],
      responsibilities: ["Build web apps", "Code review"],
      location: "New York, NY",
      isRemote: true,
      employmentType: "full_time",
      salaryMin: "120000",
      salaryMax: "180000",
      status: "open",
      hiringManagerId: emp2.id,
    },
    {
      companyId: company.id,
      title: "Sales Development Representative",
      departmentId: salesDept.id,
      jobTitleId: salesTitle.id,
      description: "Join our sales team as an SDR.",
      requirements: ["1+ year sales experience", "Communication skills"],
      responsibilities: ["Outbound prospecting", "Lead qualification"],
      location: "San Francisco, CA",
      isRemote: false,
      employmentType: "full_time",
      salaryMin: "55000",
      salaryMax: "75000",
      status: "open",
      hiringManagerId: emp3.id,
    },
  ]);

  await db.insert(learningCourses).values([
    {
      companyId: company.id,
      title: "Leadership Fundamentals",
      description: "Core leadership skills for managers.",
      category: "Leadership",
      difficulty: "intermediate",
      duration: 40,
      isRequired: true,
      tags: ["leadership", "management"],
      enrolledCount: 25,
    },
    {
      companyId: company.id,
      title: "Cybersecurity Awareness",
      description: "Essential cybersecurity practices.",
      category: "Compliance",
      difficulty: "beginner",
      duration: 20,
      isRequired: true,
      tags: ["security", "compliance"],
      enrolledCount: 150,
    },
  ]);

  await db.insert(complianceItems).values([
    {
      companyId: company.id,
      title: "Annual Data Protection Training",
      description: "All employees must complete data protection training.",
      category: "Data Protection",
      dueDate: new Date("2026-06-30"),
      status: "compliant",
      lastVerified: new Date("2026-01-15"),
      nextReview: new Date("2027-01-15"),
    },
    {
      companyId: company.id,
      title: "Workplace Safety Audit",
      description: "Quarterly workplace safety audit.",
      category: "Workplace Safety",
      dueDate: new Date("2026-06-15"),
      status: "pending_review",
      nextReview: new Date("2026-09-15"),
    },
  ]);

  console.log("Seed complete!");
}

seed().catch(console.error);
