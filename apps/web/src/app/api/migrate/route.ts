import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { hashSync } from "bcryptjs";

export const dynamic = "force-dynamic";

const MIGRATION_SECRET = process.env.JWT_SECRET || "migration-trigger";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { secret } = body;

    if (secret !== MIGRATION_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sql = neon(process.env.DATABASE_URL!);

    const statements = [
      `CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        avatar TEXT,
        role VARCHAR(30) NOT NULL DEFAULT 'employee',
        company_id UUID,
        is_active BOOLEAN NOT NULL DEFAULT true,
        last_login_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS companies (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(100) NOT NULL,
        domain VARCHAR(255),
        logo TEXT,
        size VARCHAR(50) NOT NULL,
        industry VARCHAR(100) NOT NULL,
        settings JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS departments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) NOT NULL,
        headcount INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS employees (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        employee_id VARCHAR(50) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        avatar TEXT,
        department_id UUID NOT NULL REFERENCES departments(id),
        manager_id UUID,
        employment_type VARCHAR(20) NOT NULL,
        employment_status VARCHAR(20) NOT NULL DEFAULT 'active',
        date_of_joining TIMESTAMPTZ NOT NULL,
        salary DECIMAL(12,2),
        skills JSONB DEFAULT '[]',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS job_postings (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        department_id UUID NOT NULL REFERENCES departments(id),
        description TEXT NOT NULL,
        requirements JSONB DEFAULT '[]',
        location VARCHAR(255),
        is_remote BOOLEAN DEFAULT false,
        employment_type VARCHAR(20) NOT NULL,
        salary_min DECIMAL(12,2),
        salary_max DECIMAL(12,2),
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        hiring_manager_id UUID NOT NULL REFERENCES employees(id),
        applicant_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS leaves (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        leave_type VARCHAR(20) NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        total_days INTEGER NOT NULL,
        reason TEXT,
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS attendance (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        date TIMESTAMPTZ NOT NULL,
        clock_in TIMESTAMPTZ,
        clock_out TIMESTAMPTZ,
        total_hours DECIMAL(5,2),
        status VARCHAR(20) NOT NULL,
        is_remote BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS payroll_records (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        pay_period VARCHAR(20) NOT NULL,
        start_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ NOT NULL,
        base_salary DECIMAL(12,2) NOT NULL,
        net_pay DECIMAL(12,2) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS performance_reviews (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
        reviewer_id UUID NOT NULL REFERENCES employees(id),
        review_period VARCHAR(50) NOT NULL,
        overall_rating VARCHAR(30),
        status VARCHAR(30) NOT NULL DEFAULT 'draft',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS learning_courses (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        difficulty VARCHAR(20) NOT NULL,
        duration INTEGER NOT NULL,
        is_required BOOLEAN DEFAULT false,
        enrolled_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS compliance_items (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        due_date TIMESTAMPTZ NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'pending_review',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS notifications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        type VARCHAR(30) NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS audit_logs (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        user_id UUID NOT NULL,
        action VARCHAR(100) NOT NULL,
        entity VARCHAR(100) NOT NULL,
        entity_id UUID NOT NULL,
        changes JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS ai_insights (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        type VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        data JSONB DEFAULT '{}',
        confidence DECIMAL(5,4) NOT NULL,
        actionable BOOLEAN DEFAULT false,
        recommended_actions JSONB DEFAULT '[]',
        generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS subscriptions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        plan VARCHAR(30) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'active',
        flutterwave_subscription_code VARCHAR(100),
        flutterwave_customer_code VARCHAR(100),
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'USD',
        start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        next_billing_date TIMESTAMPTZ,
        end_date TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS payments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        subscription_id UUID REFERENCES subscriptions(id),
        flutterwave_tx_ref VARCHAR(100) NOT NULL UNIQUE,
        flutterwave_tx_id VARCHAR(100),
        amount DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) NOT NULL DEFAULT 'USD',
        status VARCHAR(30) NOT NULL DEFAULT 'pending',
        plan VARCHAR(30) NOT NULL,
        customer_email VARCHAR(255),
        customer_name VARCHAR(255),
        flutterwave_response JSONB,
        verified_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        subscription_id UUID REFERENCES subscriptions(id),
        payment_id UUID REFERENCES payments(id),
        invoice_number VARCHAR(50) NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        tax DECIMAL(12,2) DEFAULT 0,
        total DECIMAL(12,2) NOT NULL,
        status VARCHAR(30) NOT NULL DEFAULT 'draft',
        due_date TIMESTAMPTZ,
        paid_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    ];

    const results: string[] = [];
    for (const stmt of statements) {
      try {
        await sql(stmt);
        const tableName = stmt.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1] || "?";
        results.push(`✅ ${tableName}`);
      } catch (e: any) {
        results.push(`❌ ${e.message}`);
      }
    }

    // Seed admin user
    const existing = await sql`SELECT id FROM users WHERE email = 'admin@talentflow.ai'`;
    if (existing.length === 0) {
      const hashedPassword = hashSync("admin123", 10);
      await sql`INSERT INTO users (email, password, first_name, last_name, role) VALUES ('admin@talentflow.ai', ${hashedPassword}, 'Admin', 'User', 'super_admin')`;
      results.push("✅ Admin seeded: admin@talentflow.ai / admin123");
    } else {
      results.push("ℹ️ Admin already exists");
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
