import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class PayrollAgent extends BaseAgent {
  constructor() {
    super(
      "PayrollAgent",
      `You are an AI Payroll Agent for TalentFlow AI. Your role is to:
- Verify payroll calculations and ensure accuracy
- Identify discrepancies and anomalies in payroll data
- Ensure tax compliance and correct deductions
- Generate payroll reports and analytics
- Optimize payroll processing workflows
- Flag potential errors before payroll runs
- Ensure compliance with labor laws and regulations

Always prioritize accuracy and compliance.
Maintain strict data confidentiality.`
    );
  }

  async execute(
    input: {
      action: string;
      payrollData?: Record<string, unknown>;
      employeeId?: string;
      payPeriod?: string;
      corrections?: Record<string, unknown>;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "verify_payroll":
        return this.verifyPayroll(input, context, actions);
      case "detect_anomalies":
        return this.detectAnomalies(input, context, actions);
      case "calculate_deductions":
        return this.calculateDeductions(input, context, actions);
      case "generate_report":
        return this.generateReport(input, context, actions);
      default:
        return {
          success: false,
          data: null,
          reasoning: `Unknown action: ${input.action}`,
          confidence: 0,
          actions: [],
        };
    }
  }

  private async verifyPayroll(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      verification: {
        totalRecords: number;
        passed: number;
        warnings: number;
        errors: number;
      };
      issues: Array<{
        employeeId: string;
        type: string;
        severity: string;
        description: string;
        suggestedFix: string;
      }>;
      summary: string;
      complianceStatus: string;
    }>(
      [
        {
          role: "user",
          content: `Verify payroll calculations:
${JSON.stringify(input.payrollData || {})}
Pay Period: ${input.payPeriod || "current"}

Check for errors, compliance issues, and anomalies.`,
        },
      ],
      {}
    );

    result.issues.forEach((issue) => {
      if (issue.severity === "critical") {
        actions.push({
          type: "flag",
          entity: "payroll_issue",
          payload: issue,
          priority: "critical",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Verified ${result.verification.totalRecords} records. ${result.verification.errors} errors, ${result.verification.warnings} warnings found.`,
      confidence: 0.92,
      actions,
    };
  }

  private async detectAnomalies(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      anomalies: Array<{
        employeeId: string;
        type: string;
        description: string;
        expectedValue: number;
        actualValue: number;
        deviation: number;
        riskLevel: string;
      }>;
      statisticalSummary: {
        meanSalary: number;
        medianSalary: number;
        standardDeviation: number;
        outlierThreshold: number;
      };
      recommendations: string[];
    }>(
      [
        {
          role: "user",
          content: `Detect payroll anomalies:
${JSON.stringify(input.payrollData || {})}

Identify statistical outliers and unusual patterns.`,
        },
      ],
      {}
    });

    result.anomalies.forEach((anomaly) => {
      if (anomaly.riskLevel === "high") {
        actions.push({
          type: "flag",
          entity: "payroll_anomaly",
          payload: anomaly,
          priority: "high",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Detected ${result.anomalies.length} anomalies. ${result.anomalies.filter((a) => a.riskLevel === "high").length} high-risk items.`,
      confidence: 0.87,
      actions,
    };
  }

  private async calculateDeductions(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      deductions: {
        federalTax: number;
        stateTax: number;
        socialSecurity: number;
        medicare: number;
        healthInsurance: number;
        retirement401k: number;
        otherDeductions: number;
        totalDeductions: number;
      };
      netPay: number;
      effectiveTaxRate: number;
      yearToDate: {
        grossPay: number;
        totalDeductions: number;
        netPay: number;
      };
      recommendations: string[];
    }>(
      [
        {
          role: "user",
          content: `Calculate deductions for:
${JSON.stringify(input.payrollData || {})}
Employee: ${input.employeeId || "unknown"}

Ensure accurate tax calculations and deductions.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Total deductions: $${result.deductions.totalDeductions}. Net pay: $${result.netPay}. Effective tax rate: ${result.effectiveTaxRate}%`,
      confidence: 0.94,
      actions: [],
    };
  }

  private async generateReport(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      report: {
        title: string;
        period: string;
        summary: string;
        highlights: string[];
        metrics: Record<string, number>;
        departmentBreakdown: Array<{
          department: string;
          headcount: number;
          totalPayroll: number;
          averageSalary: number;
        }>;
        trends: Array<{
          metric: string;
          current: number;
          previous: number;
          change: string;
        }>;
      };
      charts: Array<{
        type: string;
        title: string;
        data: Record<string, unknown>;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Generate payroll report for period ${input.payPeriod || "current"}.
Include department breakdowns and trend analysis.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Generated payroll report for ${result.report.period} covering ${Object.keys(result.report.metrics).length} key metrics`,
      confidence: 0.9,
      actions: [],
    };
  }
}
