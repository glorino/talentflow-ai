import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class ExitAgent extends BaseAgent {
  constructor() {
    super(
      "ExitAgent",
      `You are an AI Exit Agent for TalentFlow AI. Your role is to:
- Manage employee offboarding workflows
- Conduct exit interview analysis
- Identify attrition patterns and root causes
- Ensure knowledge transfer completeness
- Process final pay and benefits
- Track offboarding checklist completion
- Provide retention insights from exit data

Focus on smooth transitions and organizational learning.
Extract actionable insights from departures.`
    );
  }

  async execute(
    input: {
      action: string;
      employeeId?: string;
      exitData?: Record<string, unknown>;
      reason?: string;
      departmentId?: string;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "offboard_employee":
        return this.offboardEmployee(input, context, actions);
      case "analyze_exit":
        return this.analyzeExit(input, context, actions);
      case "knowledge_transfer":
        return this.knowledgeTransfer(input, context, actions);
      case "attrition_analysis":
        return this.attritionAnalysis(input, context, actions);
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

  private async offboardEmployee(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      offboardingPlan: {
        lastDay: string;
        checklist: Array<{
          task: string;
          assignee: string;
          deadline: string;
          category: string;
          critical: boolean;
        }>;
        assetReturn: Array<{
          asset: string;
          condition: string;
          returnDeadline: string;
        }>;
        accessRevocation: Array<{
          system: string;
          accessLevel: string;
          revocationDate: string;
        }>;
        finalPay: {
          lastPayDate: string;
          ptoPayout: number;
          otherEntitlements: string[];
        };
      };
      riskAssessment: {
        dataSecurityRisk: string;
        knowledgeGapRisk: string;
        workloadImpact: string;
      };
      recommendations: string[];
    }>(
      [
        {
          role: "user",
          content: `Create offboarding plan for employee ${input.employeeId || "unknown"}:
Reason: ${input.reason || "not specified"}
${JSON.stringify(input.exitData || {})}

Ensure complete and compliant offboarding.`,
        },
      ],
      {}
    );

    result.offboardingPlan.checklist.forEach((item) => {
      actions.push({
        type: "create",
        entity: "offboarding_task",
        payload: item,
        priority: item.critical ? "critical" : "medium",
      });
    });

    result.offboardingPlan.accessRevocation.forEach((access) => {
      actions.push({
        type: "create",
        entity: "access_revocation",
        payload: access,
        priority: "critical",
      });
    });

    return {
      success: true,
      data: result,
      reasoning: `Offboarding plan created with ${result.offboardingPlan.checklist.length} tasks. Last day: ${result.offboardingPlan.lastDay}`,
      confidence: 0.9,
      actions,
    };
  }

  private async analyzeExit(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      exitAnalysis: {
        primaryReason: string;
        secondaryReasons: string[];
        sentimentScore: number;
        overallSatisfaction: number;
      };
      departmentImpact: {
        workloadRedistribution: string;
        skillsLost: string[];
        replacementUrgency: string;
        estimatedTimeToFill: number;
      };
      insights: Array<{
        finding: string;
        evidence: string;
        recommendation: string;
        priority: string;
      }>;
      patterns: string[];
      retentionOpportunities: string[];
    }>(
      [
        {
          role: "user",
          content: `Analyze exit interview for employee ${input.employeeId || "unknown"}:
${JSON.stringify(input.exitData || {})}

Extract insights and identify improvement areas.`,
        },
      ],
      {}
    );

    result.insights.forEach((insight) => {
      if (insight.priority === "high") {
        actions.push({
          type: "recommend",
          entity: "retention_initiative",
          payload: insight,
          priority: "high",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Exit analysis complete. Primary reason: ${result.exitAnalysis.primaryReason}. Sentiment: ${result.exitAnalysis.sentimentScore}/100`,
      confidence: 0.86,
      actions,
    };
  }

  private async knowledgeTransfer(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      knowledgeInventory: Array<{
        area: string;
        criticality: string;
        transferMethod: string;
        recipient: string;
        timeline: string;
      }>;
      documentationNeeded: Array<{
        document: string;
        purpose: string;
        deadline: string;
        format: string;
      }>;
      transitionPlan: {
        duration: number;
        phases: Array<{
          name: string;
          duration: string;
          activities: string[];
        }>;
      };
      risks: Array<{
        risk: string;
        likelihood: string;
        impact: string;
        mitigation: string;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Plan knowledge transfer for employee ${input.employeeId || "unknown"}:
${JSON.stringify(input.exitData || {})}

Ensure critical knowledge is preserved.`,
        },
      ],
      {}
    );

    result.knowledgeInventory.forEach((item) => {
      if (item.criticality === "high") {
        actions.push({
          type: "create",
          entity: "knowledge_transfer_task",
          payload: item,
          priority: "high",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Knowledge transfer plan: ${result.knowledgeInventory.length} areas, ${result.documentationNeeded.length} documents needed`,
      confidence: 0.87,
      actions,
    };
  }

  private async attritionAnalysis(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      attritionMetrics: {
        overallRate: number;
        voluntaryRate: number;
        involuntaryRate: number;
        departmentRates: Record<string, number>;
        tenureGroups: Record<string, number>;
      };
      rootCauses: Array<{
        cause: string;
        percentage: number;
        trend: string;
        actionable: boolean;
      }>;
      riskSegments: Array<{
        segment: string;
        riskLevel: string;
        headcount: number;
        estimatedCost: number;
      }>;
      benchmarkComparison: {
        industryAverage: number;
        companyPerformance: string;
        gap: number;
      };
      strategies: Array<{
        strategy: string;
        expectedImpact: number;
        investmentRequired: string;
        timeline: string;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Analyze attrition patterns:
${JSON.stringify(input.exitData || {})}
Department: ${input.departmentId || "all"}

Comprehensive attrition analysis with actionable strategies.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Overall attrition rate: ${result.attritionMetrics.overallRate}%. Industry average: ${result.benchmarkComparison.industryAverage}%`,
      confidence: 0.85,
      actions: [],
    };
  }
}
