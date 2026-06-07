import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class ScreeningAgent extends BaseAgent {
  constructor() {
    super(
      "ScreeningAgent",
      `You are an AI Screening Agent for TalentFlow AI. Your role is to:
- Analyze resumes and extract key information
- Match candidates against job requirements
- Score and rank candidates objectively
- Identify skill gaps and potential concerns
- Generate screening summaries
- Flag potential bias in screening process
- Recommend next steps for each candidate

Always ensure fair and unbiased screening.
Use structured scoring rubrics.
Provide detailed reasoning for all scores.`
    );
  }

  async execute(
    input: {
      action: string;
      resumeText?: string;
      jobRequirements?: string[];
      candidateData?: Record<string, unknown>;
      jobId?: string;
      candidates?: Array<Record<string, unknown>>;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "screen_resume":
        return this.screenResume(input, context, actions);
      case "rank_candidates":
        return this.rankCandidates(input, context, actions);
      case "bulk_screen":
        return this.bulkScreen(input, context, actions);
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

  private async screenResume(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      extractedInfo: {
        name: string;
        email: string;
        phone: string;
        currentRole: string;
        yearsExperience: number;
        education: Array<{ degree: string; institution: string; year: string }>;
        skills: string[];
        certifications: string[];
        workHistory: Array<{
          company: string;
          role: string;
          duration: string;
          achievements: string[];
        }>;
      };
      matchScore: number;
      requirementMatch: Array<{
        requirement: string;
        matched: boolean;
        evidence: string;
        strength: "strong" | "moderate" | "weak";
      }>;
      concerns: string[];
      strengths: string[];
      recommendation: "strong_advance" | "advance" | "hold" | "reject";
      screeningNotes: string;
    }>(
      [
        {
          role: "user",
          content: `Screen this resume against job requirements:
Resume: ${input.resumeText || "No resume text provided"}
Requirements: ${JSON.stringify(input.jobRequirements || [])}

Provide detailed screening analysis with match scoring.`,
        },
      ],
      {}
    );

    actions.push({
      type: "update",
      entity: "application",
      payload: {
        screeningScore: result.matchScore,
        notes: result.screeningNotes,
      },
      priority: "medium",
    });

    if (result.recommendation === "reject") {
      actions.push({
        type: "notify",
        entity: "recruiter",
        payload: {
          message: `Candidate screened out: ${result.concerns.join(", ")}`,
        },
        priority: "low",
      });
    }

    return {
      success: true,
      data: result,
      reasoning: `Resume screened with ${result.matchScore}% match score. ${result.screeningNotes}`,
      confidence: result.matchScore / 100,
      actions,
    };
  }

  private async rankCandidates(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      rankings: Array<{
        candidateId: string;
        name: string;
        overallScore: number;
        technicalScore: number;
        experienceScore: number;
        culturalFitScore: number;
        growthPotentialScore: number;
        summary: string;
        recommendedAction: string;
      }>;
      diversityAnalysis: {
        genderDistribution: Record<string, number>;
        backgroundDiversity: string;
        notes: string;
      };
      insights: string[];
    }>(
      [
        {
          role: "user",
          content: `Rank these candidates for the position:
Candidates: ${JSON.stringify(input.candidates || [])}
Job Requirements: ${JSON.stringify(input.jobRequirements || [])}

Provide ranked list with detailed scoring breakdown.`,
        },
      ],
      {}
    );

    result.rankings.forEach((rank, index) => {
      actions.push({
        type: "update",
        entity: "application",
        entityId: rank.candidateId,
        payload: {
          rankingScore: rank.overallScore,
          ranking: index + 1,
        },
        priority: index < 3 ? "high" : "low",
      });
    });

    return {
      success: true,
      data: result,
      reasoning: `Candidates ranked based on ${input.jobRequirements?.length || 0} requirements. Top candidate scored ${result.rankings[0]?.overallScore || 0}%`,
      confidence: 0.84,
      actions,
    };
  }

  private async bulkScreen(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      summary: {
        totalScreened: number;
        advanced: number;
        held: number;
        rejected: number;
        averageScore: number;
      };
      candidates: Array<{
        candidateId: string;
        name: string;
        score: number;
        recommendation: string;
        topStrength: string;
        topConcern: string;
      }>;
      qualityMetrics: Record<string, number>;
    }>(
      [
        {
          role: "user",
          content: `Perform bulk screening of candidates:
${JSON.stringify(input.candidates || [])}
Requirements: ${JSON.stringify(input.jobRequirements || [])}

Screen all candidates and provide summary.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Bulk screened ${result.summary.totalScreened} candidates. ${result.summary.advanced} recommended to advance.`,
      confidence: 0.81,
      actions: [],
    };
  }
}
