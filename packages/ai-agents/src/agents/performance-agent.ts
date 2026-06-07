import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class PerformanceAgent extends BaseAgent {
  constructor() {
    super(
      "PerformanceAgent",
      `You are an AI Performance Agent for TalentFlow AI. Your role is to:
- Analyze employee performance data and trends
- Generate performance insights and recommendations
- Identify high performers and flight risks
- Support goal setting and OKR alignment
- Facilitate 360-degree feedback analysis
- Predict retention and engagement
- Recommend development opportunities

Always use data-driven insights.
Focus on fair and unbiased performance assessment.`
    );
  }

  async execute(
    input: {
      action: string;
      employeeId?: string;
      departmentId?: string;
      performanceData?: Record<string, unknown>;
      reviewPeriod?: string;
      goals?: Record<string, unknown>[];
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "analyze_performance":
        return this.analyzePerformance(input, context, actions);
      case "predict_retention":
        return this.predictRetention(input, context, actions);
      case "generate_review":
        return this.generateReview(input, context, actions);
      case "skill_gap_analysis":
        return this.skillGapAnalysis(input, context, actions);
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

  private async analyzePerformance(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      overallAssessment: {
        rating: string;
        score: number;
        trend: string;
        summary: string;
      };
      strengths: Array<{ area: string; evidence: string; impact: string }>;
      improvements: Array<{ area: string; currentLevel: string; targetLevel: string; action: string }>;
      goalProgress: Array<{ goal: string; progress: number; status: string; onTrack: boolean }>;
      peerComparison: {
        percentile: number;
        vsTeamAverage: number;
        vsCompanyAverage: number;
      };
      recommendations: Array<{
        type: string;
        description: string;
        priority: string;
        timeline: string;
      }>;
    }>(
      [
        {
          role: "user",
          content: `Analyze performance for employee ${input.employeeId || "unknown"}:
Period: ${input.reviewPeriod || "current"}
${JSON.stringify(input.performanceData || {})}

Provide comprehensive performance analysis.`,
        },
      ],
      {}
    );

    if (result.overallAssessment.rating === "exceptional") {
      actions.push({
        type: "recommend",
        entity: "recognition",
        payload: {
          employeeId: input.employeeId,
          rating: result.overallAssessment.rating,
          reason: result.overallAssessment.summary,
        },
        priority: "high",
      });
    }

    return {
      success: true,
      data: result,
      reasoning: `Performance score: ${result.overallAssessment.score}/100. Trend: ${result.overallAssessment.trend}`,
      confidence: 0.87,
      actions,
    };
  }

  private async predictRetention(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      retentionRisk: {
        score: number;
        level: string;
        probability: number;
        timeframe: string;
      };
      riskFactors: Array<{
        factor: string;
        weight: number;
        currentScore: number;
        impact: string;
      }>;
      flightRiskSignals: string[];
      retentionStrategies: Array<{
        strategy: string;
        expectedImpact: number;
        cost: string;
        effort: string;
      }>;
      similarEmployeePatterns: string;
    }>(
      [
        {
          role: "user",
          content: `Predict retention risk for employee ${input.employeeId || "unknown"}:
${JSON.stringify(input.performanceData || {})}

Analyze retention risk and provide mitigation strategies.`,
        },
      ],
      {}
    );

    if (result.retentionRisk.level === "high" || result.retentionRisk.level === "critical") {
      actions.push({
        type: "flag",
        entity: "retention_risk",
        payload: {
          employeeId: input.employeeId,
          riskLevel: result.retentionRisk.level,
          topFactors: result.riskFactors.slice(0, 3),
        },
        priority: "high",
      });

      result.retentionStrategies.forEach((strategy) => {
        actions.push({
          type: "recommend",
          entity: "retention_strategy",
          payload: strategy,
          priority: "medium",
        });
      });
    }

    return {
      success: true,
      data: result,
      reasoning: `Retention risk: ${result.retentionRisk.level} (${result.retentionRisk.probability}% probability within ${result.retentionRisk.timeframe})`,
      confidence: 0.83,
      actions,
    };
  }

  private async generateReview(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      reviewDraft: {
        summary: string;
        strengths: string[];
        developmentAreas: string[];
        goalAssessment: string;
        overallRecommendation: string;
      };
      suggestedRating: string;
      talkingPoints: string[];
      developmentPlan: Array<{
        area: string;
        goal: string;
        actions: string[];
        timeline: string;
        support: string;
      }>;
      calibrationNotes: string;
    }>(
      [
        {
          role: "user",
          content: `Generate performance review draft for employee ${input.employeeId || "unknown"}:
Period: ${input.reviewPeriod || "current"}
Goals: ${JSON.stringify(input.goals || [])}
${JSON.stringify(input.performanceData || {})}

Create comprehensive review with development plan.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Generated review draft with suggested rating: ${result.suggestedRating}`,
      confidence: 0.85,
      actions: [],
    };
  }

  private async skillGapAnalysis(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      currentSkills: Array<{
        skill: string;
        level: string;
        proficiency: number;
        lastAssessed: string;
      }>;
      requiredSkills: Array<{
        skill: string;
        requiredLevel: string;
        importance: string;
      }>;
      gaps: Array<{
        skill: string;
        currentLevel: string;
        requiredLevel: string;
        gapSize: number;
        criticality: string;
      }>;
      developmentPlan: Array<{
        skill: string;
        recommendedActions: Array<{
          action: string;
          type: string;
          duration: string;
          cost: string;
        }>;
        timeline: string;
      }>;
      marketBenchmark: Record<string, number>;
    }>(
      [
        {
          role: "user",
          content: `Perform skill gap analysis for employee ${input.employeeId || "unknown"}:
${JSON.stringify(input.performanceData || {})}

Identify skill gaps and recommend development paths.`,
        },
      ],
      {}
    );

    result.gaps.forEach((gap) => {
      if (gap.criticality === "high") {
        actions.push({
          type: "recommend",
          entity: "training",
          payload: {
            skill: gap.skill,
            gap: gap.gapSize,
            recommendedActions: result.developmentPlan.find((d) => d.skill === gap.skill)?.recommendedActions,
          },
          priority: "high",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Identified ${result.gaps.length} skill gaps, ${result.gaps.filter((g) => g.criticality === "high").length} critical`,
      confidence: 0.84,
      actions,
    };
  }
}
