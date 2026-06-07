import { BaseAgent, AgentContext, AgentResponse, AgentAction } from "../base-agent";

export class OnboardingAgent extends BaseAgent {
  constructor() {
    super(
      "OnboardingAgent",
      `You are an AI Onboarding Agent for TalentFlow AI. Your role is to:
- Create personalized onboarding plans
- Track onboarding progress and milestones
- Generate welcome materials and documentation
- Coordinate with IT, HR, and team leads
- Ensure compliance with pre-employment requirements
- Monitor new hire satisfaction and engagement
- Identify and resolve onboarding bottlenecks

Always focus on creating a positive first experience.
Ensure all compliance requirements are met.`
    );
  }

  async execute(
    input: {
      action: string;
      employeeId?: string;
      departmentId?: string;
      startDate?: string;
      role?: string;
      employeeData?: Record<string, unknown>;
    },
    context: AgentContext
  ): Promise<AgentResponse> {
    const actions: AgentAction[] = [];

    switch (input.action) {
      case "create_onboarding_plan":
        return this.createOnboardingPlan(input, context, actions);
      case "track_progress":
        return this.trackProgress(input, context, actions);
      case "generate_checklist":
        return this.generateChecklist(input, context, actions);
      case "engagement_analysis":
        return this.analyzeEngagement(input, context, actions);
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

  private async createOnboardingPlan(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      plan: {
        overview: string;
        duration: number;
        phases: Array<{
          name: string;
          duration: string;
          objectives: string[];
          activities: Array<{
            task: string;
            assignee: string;
            deadline: string;
            priority: string;
          }>;
          milestones: string[];
        }>;
      };
      requiredDocuments: string[];
      itSetup: string[];
      trainingSchedule: Array<{
        day: number;
        topic: string;
        duration: number;
        trainer: string;
      }>;
      buddyAssignment: {
        recommended: boolean;
        criteria: string[];
      };
    }>(
      [
        {
          role: "user",
          content: `Create onboarding plan for:
Employee: ${input.employeeId || "new hire"}
Department: ${input.departmentId || "unknown"}
Role: ${input.role || "unknown"}
Start Date: ${input.startDate || "TBD"}

Design comprehensive onboarding experience.`,
        },
      ],
      {}
    );

    result.plan.phases.forEach((phase) => {
      phase.activities.forEach((activity) => {
        actions.push({
          type: "create",
          entity: "onboarding_task",
          payload: {
            task: activity.task,
            assignee: activity.assignee,
            deadline: activity.deadline,
            phase: phase.name,
          },
          priority: activity.priority as "low" | "medium" | "high" | "critical",
        });
      });
    });

    return {
      success: true,
      data: result,
      reasoning: `Created ${result.plan.phases.length}-phase onboarding plan spanning ${result.plan.duration} days`,
      confidence: 0.88,
      actions,
    };
  }

  private async trackProgress(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      progress: {
        overall: number;
        completedTasks: number;
        totalTasks: number;
        overdueTasks: number;
      };
      currentPhase: string;
      upcomingMilestones: Array<{
        milestone: string;
        dueDate: string;
        status: string;
      }>;
      blockers: Array<{
        issue: string;
        impact: string;
        resolution: string;
      }>;
      riskLevel: string;
      recommendations: string[];
    }>(
      [
        {
          role: "user",
          content: `Track onboarding progress for employee ${input.employeeId || "unknown"}.
Provide detailed progress analysis and identify any blockers.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Onboarding ${result.progress.overall}% complete. ${result.progress.overdueTasks} overdue tasks.`,
      confidence: 0.91,
      actions: [],
    };
  }

  private async generateChecklist(
    input: Record<string, unknown>,
    _context: AgentContext,
    actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      preArrival: Array<{ task: string; assignee: string; due: string; category: string }>;
      firstDay: Array<{ task: string; assignee: string; time: string; category: string }>;
      firstWeek: Array<{ task: string; assignee: string; due: string; category: string }>;
      firstMonth: Array<{ task: string; assignee: string; due: string; category: string }>;
      complianceItems: Array<{ task: string; required: boolean; deadline: string }>;
    }>(
      [
        {
          role: "user",
          content: `Generate comprehensive onboarding checklist for:
Role: ${input.role || "general"}
Department: ${input.departmentId || "general"}
Start Date: ${input.startDate || "TBD"}`,
        },
      ],
      {}
    );

    const allTasks = [
      ...result.preArrival,
      ...result.firstDay,
      ...result.firstWeek,
      ...result.firstMonth,
    ];

    allTasks.forEach((task) => {
      actions.push({
        type: "create",
        entity: "onboarding_checklist",
        payload: task,
        priority: task.category === "compliance" ? "high" : "medium",
      });
    });

    return {
      success: true,
      data: result,
      reasoning: `Generated ${allTasks.length} onboarding checklist items across 4 phases`,
      confidence: 0.9,
      actions,
    };
  }

  private async analyzeEngagement(
    input: Record<string, unknown>,
    _context: AgentContext,
    _actions: AgentAction[]
  ): Promise<AgentResponse> {
    const result = await this.callLLMStructured<{
      engagementScore: number;
      sentimentAnalysis: {
        overall: string;
        themes: Array<{ theme: string; sentiment: string; mentions: number }>;
      };
      riskFactors: Array<{ factor: string; severity: string; recommendation: string }>;
      satisfactionTrend: string;
      improvementAreas: string[];
      actionPlan: Array<{ action: string; owner: string; timeline: string }>;
    }>(
      [
        {
          role: "user",
          content: `Analyze new hire engagement for employee ${input.employeeId || "unknown"}.
Assess onboarding experience and identify improvement areas.`,
        },
      ],
      {}
    );

    return {
      success: true,
      data: result,
      reasoning: `Engagement score: ${result.engagementScore}/100. Sentiment: ${result.sentimentAnalysis.overall}`,
      confidence: 0.85,
      actions: [],
    };
  }
}
