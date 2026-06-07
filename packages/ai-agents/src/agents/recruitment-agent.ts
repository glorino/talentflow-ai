import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class RecruitmentAgent extends BaseAgent {
  constructor() {
    super(
      "RecruitmentAgent",
      `You are an AI Recruitment Agent for TalentFlow AI. Your role is to:
- Source and attract top talent
- Analyze job requirements and create optimized job descriptions
- Screen incoming applications and rank candidates
- Manage the recruitment pipeline
- Provide market insights on talent availability
- Recommend sourcing strategies
- Track recruitment metrics and KPIs

Always provide data-driven recommendations with confidence scores.
Consider diversity, equity, and inclusion in all recommendations.
Output structured JSON responses.`
    );
  }

  async execute(
    input: {
      action: string;
      jobId?: string;
      candidateId?: string;
      jobDescription?: string;
      requirements?: string[];
      companyInfo?: Record<string, unknown>;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "optimize_job_posting":
        return this.optimizeJobPosting(input, context, actions);
      case "source_candidates":
        return this.sourceCandidates(input, context, actions);
      case "pipeline_analysis":
        return this.analyzePipeline(input, context, actions);
      case "recruitment_metrics":
        return this.getMetrics(input, context, actions);
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

  private async optimizeJobPosting(
    input: Record<string, unknown>,
    context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      optimizedTitle: string;
      optimizedDescription: string;
      suggestedRequirements: string[];
      salaryBenchmark: { min: number; max: number; median: number };
      diversitySuggestions: string[];
      seoKeywords: string[];
      estimatedApplicants: number;
    }>(
      [
        {
          role: "user",
          content: `Optimize this job posting for a ${context.role} company:
Title: ${input.jobDescription || "Not provided"}
Requirements: ${JSON.stringify(input.requirements || [])}
Company Info: ${JSON.stringify(input.companyInfo || {})}

Provide optimized version with salary benchmarks and diversity suggestions.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: "Job posting analyzed and optimized based on market data and best practices",
      confidence: 0.88,
      actions,
    };
  }

  private async sourceCandidates(
    input: Record<string, unknown>,
    context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      sourcingStrategies: Array<{
        channel: string;
        expectedCandidates: number;
        costPerHire: number;
        timeToFill: number;
        recommendation: string;
      }>;
      idealCandidateProfile: {
        skills: string[];
        experience: string;
        education: string;
        traits: string[];
      };
      marketInsights: string;
    }>(
      [
        {
          role: "user",
          content: `Develop sourcing strategies for this position:
Job: ${input.jobDescription || "Position"}
Requirements: ${JSON.stringify(input.requirements || [])}

Provide multi-channel sourcing plan with cost estimates.`,
        },
      ],
      {}
    );

    actions.push({
      type: "recommend",
      entity: "recruitment_strategy",
      payload: result,
      priority: "medium",
    });

    return {
      success: true,
      data: result,
      reasoning: "Sourcing strategies developed based on job requirements and market conditions",
      confidence: 0.85,
      actions,
    };
  }

  private async analyzePipeline(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      pipelineHealth: string;
      bottlenecks: Array<{ stage: string; issue: string; impact: string }>;
      recommendations: string[];
      timeToHireEstimate: number;
      conversionRates: Record<string, number>;
    }>(
      [
        {
          role: "user",
          content: `Analyze the recruitment pipeline for job ${input.jobId || "all jobs"}.
Provide pipeline health assessment and identify bottlenecks.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: "Pipeline analysis completed with bottleneck identification",
      confidence: 0.82,
      actions: [],
    };
  }

  private async getMetrics(
    _input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      metrics: Record<string, number>;
      benchmarks: Record<string, number>;
      insights: string[];
      actionItems: string[];
    }>(
      [
        {
          role: "user",
          content:
            "Provide comprehensive recruitment metrics analysis including time-to-hire, cost-per-hire, quality of hire, and source effectiveness.",
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: "Recruitment metrics analyzed and benchmarked",
      confidence: 0.87,
      actions: [],
    };
  }
}
