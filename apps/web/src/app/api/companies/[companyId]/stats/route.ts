import { NextRequest, NextResponse } from "next/server";
import { db, departments, employees, jobPostings, leaves, attendance, payrollRecords, performanceReviews, learningCourses, complianceItems } from "@/lib/db";
import { eq, count } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { companyId: string } }
) {
  try {
    const { companyId } = params;

    const [
      deptCount,
      empCount,
      jobCount,
      leaveCount,
      attendanceCount,
      payrollCount,
      perfCount,
      compCount,
    ] = await Promise.all([
      db.select({ value: count() }).from(departments).where(eq(departments.companyId, companyId)),
      db.select({ value: count() }).from(employees).where(eq(employees.companyId, companyId)),
      db.select({ value: count() }).from(jobPostings).where(eq(jobPostings.companyId, companyId)),
      db.select({ value: count() }).from(leaves).where(eq(leaves.companyId, companyId)),
      db.select({ value: count() }).from(attendance).where(eq(attendance.companyId, companyId)),
      db.select({ value: count() }).from(payrollRecords).where(eq(payrollRecords.companyId, companyId)),
      db.select({ value: count() }).from(performanceReviews).where(eq(performanceReviews.companyId, companyId)),
      db.select({ value: count() }).from(complianceItems).where(eq(complianceItems.companyId, companyId)),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          departments: deptCount[0]?.value ?? 0,
          employees: empCount[0]?.value ?? 0,
          jobs: jobCount[0]?.value ?? 0,
          leaveRequests: leaveCount[0]?.value ?? 0,
          attendanceRecords: attendanceCount[0]?.value ?? 0,
          payrollRecords: payrollCount[0]?.value ?? 0,
          performanceReviews: perfCount[0]?.value ?? 0,
          complianceItems: compCount[0]?.value ?? 0,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
