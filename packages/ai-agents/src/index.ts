import { BaseAgent, AgentContext, AgentResponse } from "./base-agent";
import { RecruitmentAgent } from "./agents/recruitment-agent";
import { ScreeningAgent } from "./agents/screening-agent";
import { InterviewAgent } from "./agents/interview-agent";
import { OnboardingAgent } from "./agents/onboarding-agent";
import { PayrollAgent } from "./agents/payroll-agent";
import { ComplianceAgent } from "./agents/compliance-agent";
import { PerformanceAgent } from "./agents/performance-agent";
import { LearningAgent } from "./agents/learning-agent";
import { ExitAgent } from "./agents/exit-agent";

export type AgentName =
  | "recruitment"
  | "screening"
  | "interview"
  | "onboarding"
  | "payroll"
  | "compliance"
  | "performance"
  | "learning"
  | "exit";

export interface WorkflowStep {
  agent: AgentName;
  action: string;
  inputMapping: Record<string, string>;
  condition?: (context: AgentContext, previousResults: AgentResponse[]) => boolean;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  trigger: string;
  steps: WorkflowStep[];
}

export class AgentOrchestrator {
  private agents: Map<AgentName, BaseAgent>;
  private workflows: Map<string, WorkflowDefinition>;

  constructor() {
    this.agents = new Map([
      ["recruitment", new RecruitmentAgent()],
      ["screening", new ScreeningAgent()],
      ["interview", new InterviewAgent()],
      ["onboarding", new OnboardingAgent()],
      ["payroll", new PayrollAgent()],
      ["compliance", new ComplianceAgent()],
      ["performance", new PerformanceAgent()],
      ["learning", new LearningAgent()],
      ["exit", new ExitAgent()],
    ]);

    this.workflows = new Map();
    this.registerDefaultWorkflows();
  }

  private registerDefaultWorkflows() {
    this.registerWorkflow({
      id: "new_hire_pipeline",
      name: "New Hire Pipeline",
      description: "End-to-end recruitment to onboarding workflow",
      trigger: "job_posting_created",
      steps: [
        {
          agent: "recruitment",
          action: "optimize_job_posting",
          inputMapping: {
            jobDescription: "jobDescription",
            requirements: "requirements",
          },
        },
        {
          agent: "screening",
          action: "bulk_screen",
          inputMapping: {
            candidates: "candidates",
            jobRequirements: "requirements",
          },
        },
        {
          agent: "interview",
          action: "generate_questions",
          inputMapping: {
            jobRequirements: "requirements",
            interviewType: "interviewType",
          },
        },
        {
          agent: "onboarding",
          action: "create_onboarding_plan",
          inputMapping: {
            employeeId: "employeeId",
            departmentId: "departmentId",
            role: "role",
          },
        },
      ],
    });

    this.registerWorkflow({
      id: "performance_review_cycle",
      name: "Performance Review Cycle",
      description: "Quarterly performance review workflow",
      trigger: "review_period_start",
      steps: [
        {
          agent: "performance",
          action: "analyze_performance",
          inputMapping: {
            employeeId: "employeeId",
            reviewPeriod: "reviewPeriod",
          },
        },
        {
          agent: "performance",
          action: "skill_gap_analysis",
          inputMapping: {
            employeeId: "employeeId",
          },
        },
        {
          agent: "learning",
          action: "recommend_path",
          inputMapping: {
            employeeId: "employeeId",
            skillGoals: "skillGoals",
          },
        },
      ],
    });

    this.registerWorkflow({
      id: "payroll_processing",
      name: "Payroll Processing",
      description: "Automated payroll verification workflow",
      trigger: "payroll_run_initiated",
      steps: [
        {
          agent: "payroll",
          action: "verify_payroll",
          inputMapping: {
            payrollData: "payrollData",
            payPeriod: "payPeriod",
          },
        },
        {
          agent: "payroll",
          action: "detect_anomalies",
          inputMapping: {
            payrollData: "payrollData",
          },
        },
        {
          agent: "compliance",
          action: "audit_compliance",
          inputMapping: {
            complianceData: "payrollData",
          },
        },
      ],
    });

    this.registerWorkflow({
      id: "employee_exit",
      name: "Employee Exit",
      description: "Complete offboarding workflow",
      trigger: "resignation_submitted",
      steps: [
        {
          agent: "exit",
          action: "offboard_employee",
          inputMapping: {
            employeeId: "employeeId",
            reason: "reason",
          },
        },
        {
          agent: "exit",
          action: "knowledge_transfer",
          inputMapping: {
            employeeId: "employeeId",
          },
        },
        {
          agent: "exit",
          action: "analyze_exit",
          inputMapping: {
            employeeId: "employeeId",
            exitData: "exitData",
          },
        },
      ],
    });

    this.registerWorkflow({
      id: "compliance_monitoring",
      name: "Compliance Monitoring",
      description: "Continuous compliance monitoring",
      trigger: "scheduled_daily",
      steps: [
        {
          agent: "compliance",
          action: "track_expirations",
          inputMapping: {},
        },
        {
          agent: "compliance",
          action: "assess_risk",
          inputMapping: {},
        },
        {
          agent: "compliance",
          action: "audit_compliance",
          inputMapping: {},
        },
      ],
    });
  }

  registerWorkflow(workflow: WorkflowDefinition) {
    this.workflows.set(workflow.id, workflow);
  }

  getAgent(name: AgentName): BaseAgent | undefined {
    return this.agents.get(name);
  }

  async executeAgent(
    name: AgentName,
    input: Record<string, unknown>,
    context: AgentContext
  ): Promise<AgentResponse> {
    const agent = this.agents.get(name);
    if (!agent) {
      return {
        success: false,
        data: null,
        reasoning: `Agent '${name}' not found`,
        confidence: 0,
        actions: [],
      };
    }

    try {
      return await agent.execute(input, context);
    } catch (error) {
      return {
        success: false,
        data: null,
        reasoning: `Agent error: ${error instanceof Error ? error.message : "Unknown error"}`,
        confidence: 0,
        actions: [],
      };
    }
  }

  async executeWorkflow(
    workflowId: string,
    initialInput: Record<string, unknown>,
    context: AgentContext
  ): Promise<{
    success: boolean;
    results: Array<{ step: string; agent: string; response: AgentResponse }>;
    allActions: AgentResponse["actions"];
    summary: string;
  }> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      return {
        success: false,
        results: [],
        allActions: [],
        summary: `Workflow '${workflowId}' not found`,
      };
    }

    const results: Array<{ step: string; agent: string; response: AgentResponse }> = [];
    const allActions: AgentResponse["actions"] = [];
    let currentInput = { ...initialInput };
    let success = true;

    for (const step of workflow.steps) {
      const mappedInput: Record<string, unknown> = {};
      for (const [key, sourceKey] of Object.entries(step.inputMapping)) {
        mappedInput[key] = currentInput[sourceKey] ?? currentInput[key];
      }

      const response = await this.executeAgent(step.agent, mappedInput, context);
      results.push({
        step: step.action,
        agent: step.agent,
        response,
      });

      allActions.push(...response.actions);

      if (!response.success) {
        success = false;
        break;
      }

      if (response.data && typeof response.data === "object") {
        currentInput = { ...currentInput, ...response.data as Record<string, unknown> };
      }
    }

    return {
      success,
      results,
      allActions,
      summary: `Workflow '${workflow.name}' ${success ? "completed successfully" : "failed at step " + results[results.length - 1]?.step}`,
    };
  }

  listWorkflows(): WorkflowDefinition[] {
    return Array.from(this.workflows.values());
  }

  listAgents(): AgentName[] {
    return Array.from(this.agents.keys());
  }
}

export const orchestrator = new AgentOrchestrator();

export { BaseAgent } from "./base-agent";
export type { AgentContext, AgentResponse, AgentAction } from "./base-agent";
export { RecruitmentAgent } from "./agents/recruitment-agent";
export { ScreeningAgent } from "./agents/screening-agent";
export { InterviewAgent } from "./agents/interview-agent";
export { OnboardingAgent } from "./agents/onboarding-agent";
export { PayrollAgent } from "./agents/payroll-agent";
export { ComplianceAgent } from "./agents/compliance-agent";
export { PerformanceAgent } from "./agents/performance-agent";
export { LearningAgent } from "./agents/learning-agent";
export { ExitAgent } from "./agents/exit-agent";
