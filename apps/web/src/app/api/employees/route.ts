import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { employees, departments, jobTitles } from "@talentflow/database/src/schema";
import { eq, desc, count, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get("companyId");
    const departmentId = searchParams.get("departmentId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = db
      .select({
        id: employees.id,
        employeeId: employees.employeeId,
        firstName: employees.firstName,
        lastName: employees.lastName,
        email: employees.email,
        phone: employees.phone,
        avatar: employees.avatar,
        departmentId: employees.departmentId,
        jobTitleId: employees.jobTitleId,
        managerId: employees.managerId,
        employmentType: employees.employmentType,
        employmentStatus: employees.employmentStatus,
        dateOfJoining: employees.dateOfJoining,
        salary: employees.salary,
        skills: employees.skills,
      })
      .from(employees)
      .leftJoin(departments, eq(employees.departmentId, departments.id))
      .leftJoin(jobTitles, eq(employees.jobTitleId, jobTitles.id))
      .orderBy(desc(employees.createdAt))
      .limit(limit)
      .offset((page - 1) * limit);

    if (companyId) {
      query = query.where(eq(employees.companyId, companyId));
    }

    if (departmentId) {
      query = query.where(eq(employees.departmentId, departmentId));
    }

    if (status) {
      query = query.where(eq(employees.employmentStatus, status as any));
    }

    const data = await query;

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total: data.length,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const [employee] = await db
      .insert(employees)
      .values({
        companyId: body.companyId,
        employeeId: body.employeeId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        departmentId: body.departmentId,
        jobTitleId: body.jobTitleId,
        managerId: body.managerId,
        employmentType: body.employmentType,
        employmentStatus: body.employmentStatus || "active",
        dateOfJoining: new Date(body.dateOfJoining),
        salary: body.salary,
        skills: body.skills || [],
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: employee,
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
