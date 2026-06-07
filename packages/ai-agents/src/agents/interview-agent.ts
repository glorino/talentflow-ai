import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class InterviewAgent extends BaseAgent {
  constructor() {
    super(
      "InterviewAgent",
      `You are an AI Interview Agent for TalentFlow AI. Your role is to:
- Schedule and manage interview pipelines
- Generate interview questions based on role requirements
- Analyze interview feedback and provide insights
- Coordinate interviewer availability
- Recommend interview formats and structures
- Ensure consistent and fair interview processes
- Generate offer recommendations based on interview outcomes

Always promote structured and unbiased interviewing.
Consider role-specific competency frameworks.`
    );
  }

  async execute(
    input: {
      action: string;
      applicationId?: string;
      interviewType?: string;
      jobRequirements?: string[];
      candidateProfile?: Record<string, unknown>;
      feedback?: Record<string, unknown>;
      availability?: Record<string, unknown>;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "generate_questions":
        return this.generateQuestions(input, context, actions);
      case "schedule_interview":
        return this.scheduleInterview(input, context, actions);
      case "analyze_feedback":
        return this.analyzeFeedback(input, context, actions);
      case "recommend_process":
        return this.recommendProcess(input, context, actions);
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

  private async generateQuestions(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      questions: Array<{
        question: string;
        category: string;
        competency: string;
        followUp?: string;
        idealAnswer: string;
        scoringRubric: { excellent: string; good: string; average: string; poor: string };
        timeMinutes: number;
      }>;
      interviewStructure: {
        totalDuration: number;
        sections: Array<{ name: string; duration: number; purpose: string }>;
      };
      tips: string[];
    }>(
      [
        {
          role: "user",
          content: `Generate interview questions for:
Type: ${input.interviewType || "general"}
Requirements: ${JSON.stringify(input.jobRequirements || [])}
Candidate: ${JSON.stringify(input.candidateProfile || {})}

Create structured interview questions with scoring rubrics.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Generated ${result.questions.length} interview questions for ${input.interviewType || "general"} interview`,
      confidence: 0.86,
      actions: [],
    };
  }

  private async scheduleInterview(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      recommendedSlots: Array<{
        datetime: string;
        interviewers: string[];
        format: string;
        location: string;
        conflictFree: boolean;
      }>;
      schedulingNotes: string;
      preparationItems: string[];
      calendarInvite: {
        subject: string;
        body: string;
        attendees: string[];
      };
    }>(
      [
        {
          role: "user",
          content: `Schedule interview for application ${input.applicationId || "unknown"}:
Type: ${input.interviewType || "general"}
Availability: ${JSON.stringify(input.availability || {})}

Recommend optimal scheduling with conflict resolution.`,
        },
      ],
      {}
    );

    result.recommendedSlots.forEach((slot) => {
      if (slot.conflictFree) {
        actions.push({
          type: "create",
          entity: "interview",
          payload: {
            scheduledAt: slot.datetime,
            interviewers: slot.interviewers,
            format: slot.format,
            location: slot.location,
          },
          priority: "high",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Found ${result.recommendedSlots.filter((s) => s.conflictFree).length} conflict-free scheduling options`,
      confidence: 0.89,
      actions,
    };
  }

  private async analyzeFeedback(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      overallAssessment: {
        recommendation: string;
        confidence: number;
        summary: string;
      };
      feedbackAnalysis: {
        strengths: string[];
        concerns: string[];
        consistencyScore: number;
        biasIndicators: string[];
      };
      competencyScores: Array<{
        competency: string;
        score: number;
        evidence: string;
      }>;
      nextSteps: string[];
      offerRecommendation?: {
        shouldExtend: boolean;
        suggestedSalary: number;
        rationale: string;
      };
    }>(
      [
        {
          role: "user",
          content: `Analyze interview feedback:
${JSON.stringify(input.feedback || {})}
Application: ${input.applicationId || "unknown"}

Provide comprehensive analysis with hiring recommendation.`,
        },
      ],
      {}
    );

    if (result.overallAssessment.recommendation === "strong_hire") {
      actions.push({
        type: "recommend",
        entity: "offer",
        payload: result.offerRecommendation,
        priority: "high",
      });
    }

    return {
      success: true,
      data: result,
      reasoning: `Interview feedback analyzed. Recommendation: ${result.overallAssessment.recommendation} with ${result.overallAssessment.confidence}% confidence`,
      confidence: result.overallAssessment.confidence / 100,
      actions,
    };
  }

  private async recommendProcess(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      recommendedProcess: {
        stages: Array<{
          name: string;
          type: string;
          duration: number;
          interviewers: number;
          purpose: string;
        }>;
        totalEstimatedDays: number;
      };
      bestPractices: string[];
      riskMitigation: string[];
    }>(
      [
        {
          role: "user",
          content: `Recommend interview process for:
Job Requirements: ${JSON.stringify(input.jobRequirements || [])}
Candidate: ${JSON.stringify(input.candidateProfile || {})}

Design optimal interview process.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Recommended ${result.recommendedProcess.stages.length}-stage interview process`,
      confidence: 0.83,
      actions: [],
    };
  }
}
