import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class ComplianceAgent extends BaseAgent {
  constructor() {
    super(
      "ComplianceAgent",
      `You are an AI Compliance Agent for TalentFlow AI. Your role is to:
- Monitor regulatory compliance across jurisdictions
- Track certification and training expiration dates
- Identify compliance gaps and risks
- Generate compliance reports and audits
- Ensure adherence to labor laws and regulations
- Manage document retention and policies
- Provide proactive compliance recommendations

Always prioritize regulatory adherence.
Stay current with employment law changes.`
    );
  }

  async execute(
    input: {
      action: string;
      complianceData?: Record<string, unknown>;
      employeeId?: string;
      jurisdiction?: string;
      policyType?: string;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "audit_compliance":
        return this.auditCompliance(input, context, actions);
      case "track_expirations":
        return this.trackExpirations(input, context, actions);
      case "assess_risk":
        return this.assessRisk(input, context, actions);
      case "policy_review":
        return this.reviewPolicy(input, context, actions);
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

  private async auditCompliance(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      auditResults: {
        overallScore: number;
        compliant: number;
        nonCompliant: number;
        pendingReview: number;
        totalItems: number;
      };
      findings: Array<{
        category: string;
        status: string;
        severity: string;
        description: string;
        recommendation: string;
        deadline?: string;
      }>;
      complianceByCategory: Record<string, number>;
      actionPlan: Array<{
        action: string;
        priority: string;
        owner: string;
        deadline: string;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Perform compliance audit:
${JSON.stringify(input.complianceData || {})}
Jurisdiction: ${input.jurisdiction || "all"}

Comprehensive compliance assessment required.`,
        },
      ],
      {}
    );

    result.findings
      .filter((f) => f.severity === "critical" || f.severity === "high")
      .forEach((finding) => {
        actions.push({
          type: "flag",
          entity: "compliance_finding",
          payload: finding,
          priority: finding.severity === "critical" ? "critical" : "high",
        });
      });

    return {
      success: true,
      data: result,
      reasoning: `Compliance score: ${result.auditResults.overallScore}%. ${result.auditResults.nonCompliant} non-compliant items found.`,
      confidence: 0.89,
      actions,
    };
  }

  private async trackExpirations(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      expiringItems: Array<{
        itemId: string;
        title: string;
        type: string;
        employeeId?: string;
        expiryDate: string;
        daysUntilExpiry: number;
        status: string;
        renewalRequired: boolean;
      }>;
      summary: {
        expired: number;
        expiring30Days: number;
        expiring60Days: number;
        expiring90Days: number;
      };
      urgentActions: string[];
    }>(
      [
        {
          role: "user",
          content: `Track expiring certifications and compliance items:
${JSON.stringify(input.complianceData || {})}
Employee: ${input.employeeId || "all employees"}

Identify upcoming expirations and required renewals.`,
        },
      ],
      {}
    );

    result.expiringItems
      .filter((item) => item.daysUntilExpiry <= 30)
      .forEach((item) => {
        actions.push({
          type: "notify",
          entity: "compliance_expiration",
          payload: {
            message: `${item.title} expires in ${item.daysUntilExpiry} days`,
            itemId: item.itemId,
          },
          priority: item.daysUntilExpiry <= 7 ? "critical" : "high",
        });
      });

    return {
      success: true,
      data: result,
      reasoning: `${result.summary.expired} expired, ${result.summary.expiring30Days} expiring within 30 days`,
      confidence: 0.93,
      actions,
    };
  }

  private async assessRisk(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      riskScore: number;
      riskLevel: string;
      riskFactors: Array<{
        factor: string;
        likelihood: string;
        impact: string;
        riskScore: number;
        mitigation: string;
      }>;
      complianceGaps: Array<{
        area: string;
        current: string;
        required: string;
        gap: string;
      }>;
      estimatedExposure: {
        financial: string;
        reputational: string;
        operational: string;
      };
      recommendations: Array<{
        action: string;
        impact: string;
        effort: string;
        timeline: string;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Assess compliance risk:
${JSON.stringify(input.complianceData || {})}
Jurisdiction: ${input.jurisdiction || "all"}

Comprehensive risk assessment with mitigation strategies.`,
        },
      ],
      {}
    );

    if (result.riskLevel === "high" || result.riskLevel === "critical") {
      actions.push({
        type: "flag",
        entity: "compliance_risk",
        payload: {
          riskScore: result.riskScore,
          riskLevel: result.riskLevel,
          topFactors: result.riskFactors.slice(0, 3),
        },
        priority: result.riskLevel === "critical" ? "critical" : "high",
      });
    }

    return {
      success: true,
      data: result,
      reasoning: `Risk level: ${result.riskLevel} (score: ${result.riskScore}/100). ${result.riskFactors.length} risk factors identified.`,
      confidence: 0.86,
      actions,
    };
  }

  private async reviewPolicy(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      policyReview: {
        gaps: string[];
        outdatedItems: string[];
        missingPolicies: string[];
        recommendations: string[];
      };
      legalRequirements: Array<{
        requirement: string;
        jurisdiction: string;
        currentCoverage: string;
        action: string;
      }>;
      bestPractices: string[];
      updatePriority: Array<{
        policy: string;
        reason: string;
        deadline: string;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Review policies for type: ${input.policyType || "all"}
Jurisdiction: ${input.jurisdiction || "all"}
${JSON.stringify(input.complianceData || {})}

Identify policy gaps and update requirements.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Found ${result.policyReview.gaps.length} gaps, ${result.policyReview.outdatedItems.length} outdated items, ${result.policyReview.missingPolicies.length} missing policies`,
      confidence: 0.84,
      actions: [],
    };
  }
}
