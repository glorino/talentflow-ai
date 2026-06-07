import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class LearningAgent extends BaseAgent {
  constructor() {
    super(
      "LearningAgent",
      `You are an AI Learning Agent for TalentFlow AI. Your role is to:
- Recommend personalized learning paths
- Analyze skill gaps and suggest courses
- Track learning progress and completions
- Generate learning content and quizzes
- Measure learning ROI and effectiveness
- Ensure compliance training completion
- Identify high-potential employees for development

Focus on measurable learning outcomes.
Align learning with business objectives.`
    );
  }

  async execute(
    input: {
      action: string;
      employeeId?: string;
      courseId?: string;
      skillGoals?: string[];
      departmentId?: string;
      learningData?: Record<string, unknown>;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "recommend_path":
        return this.recommendPath(input, context, actions);
      case "analyze_progress":
        return this.analyzeProgress(input, context, actions);
      case "generate_content":
        return this.generateContent(input, context, actions);
      case "measure_roi":
        return this.measureROI(input, context, actions);
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

  private async recommendPath(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      recommendedPath: {
        title: string;
        description: string;
        estimatedDuration: number;
        courses: Array<{
          courseId: string;
          title: string;
          priority: string;
          reason: string;
          estimatedHours: number;
        }>;
      };
      alternativePaths: Array<{
        title: string;
        focus: string;
        duration: number;
      }>;
      milestones: Array<{
        milestone: string;
        expectedDate: string;
        skillGain: string;
      }>;
      learningStyle: string;
      motivationFactors: string[];
    }>(
      [
        {
          role: "user",
          content: `Recommend learning path for employee ${input.employeeId || "unknown"}:
Skills goals: ${JSON.stringify(input.skillGoals || [])}
${JSON.stringify(input.learningData || {})}

Create personalized learning recommendation.`,
        },
      ],
      {}
    );

    result.recommendedPath.courses.forEach((course) => {
      if (course.priority === "high") {
        actions.push({
          type: "recommend",
          entity: "enrollment",
          payload: {
            courseId: course.courseId,
            title: course.title,
            reason: course.reason,
          },
          priority: "medium",
        });
      }
    });

    return {
      success: true,
      data: result,
      reasoning: `Recommended ${result.recommendedPath.courses.length}-course learning path (${result.recommendedPath.estimatedDuration} hours)`,
      confidence: 0.86,
      actions,
    };
  }

  private async analyzeProgress(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      overallProgress: {
        coursesEnrolled: number;
        coursesCompleted: number;
        totalHours: number;
        averageScore: number;
        completionRate: number;
      };
      courseDetails: Array<{
        courseId: string;
        title: string;
        progress: number;
        status: string;
        lastActivity: string;
        timeSpent: number;
        assessmentScore?: number;
      }>;
      engagementMetrics: {
        averageSessionDuration: number;
        frequencyPerWeek: number;
        streakDays: number;
      };
      insights: string[];
      recommendations: string[];
    }>(
      [
        {
          role: "user",
          content: `Analyze learning progress for employee ${input.employeeId || "unknown"}:
${JSON.stringify(input.learningData || {})}

Provide comprehensive progress analysis.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Completion rate: ${result.overallProgress.completionRate}%. ${result.overallProgress.coursesCompleted}/${result.overallProgress.coursesEnrolled} courses completed.`,
      confidence: 0.91,
      actions: [],
    };
  }

  private async generateContent(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      content: {
        title: string;
        modules: Array<{
          title: string;
          type: string;
          content: string;
          duration: number;
          objectives: string[];
        }>;
        assessment: {
          questions: Array<{
            question: string;
            type: string;
            options?: string[];
            correctAnswer: string;
            explanation: string;
          }>;
          passingScore: number;
        };
        resources: Array<{
          title: string;
          type: string;
          url: string;
        }>;
      };
      learningOutcomes: string[];
      estimatedCompletionTime: number;
    }>(
      [
        {
          role: "user",
          content: `Generate learning content for course ${input.courseId || "new course"}:
${JSON.stringify(input.learningData || {})}

Create engaging learning content with assessments.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Generated ${result.content.modules.length} modules with ${result.content.assessment.questions.length} assessment questions`,
      confidence: 0.88,
      actions: [],
    };
  }

  private async measureROI(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      roi: {
        investmentTotal: number;
        returnTotal: number;
        roiPercentage: number;
        timeframe: string;
      };
      impactMetrics: Array<{
        metric: string;
        before: number;
        after: number;
        change: number;
        attribution: number;
      }>;
      businessImpact: {
        productivity: string;
        retention: string;
        engagement: string;
        performance: string;
      };
      costBenefitAnalysis: {
        costPerEmployee: number;
        benefitPerEmployee: number;
        breakEvenPoint: string;
      };
      recommendations: string[];
    }>(
      [
        {
          role: "user",
          content: `Measure learning ROI for department ${input.departmentId || "all"}:
${JSON.stringify(input.learningData || {})}

Calculate learning investment return and business impact.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Learning ROI: ${result.roi.roiPercentage}%. Investment: $${result.roi.investmentTotal}, Return: $${result.roi.returnTotal}`,
      confidence: 0.82,
      actions: [],
    };
  }
}
