import { NextRequest, NextResponse } from "next/server";

function getOpenAI() {
  const OpenAI = require("openai").default || require("openai");
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const workflows: Record<string, { name: string; description: string; steps: string[] }> = {
  new_hire_pipeline: {
    name: "New Hire Pipeline",
    description: "End-to-end recruitment to onboarding workflow",
    steps: ["optimize_job_posting", "screen_candidates", "generate_questions", "create_onboarding"],
  },
  performance_review_cycle: {
    name: "Performance Review Cycle",
    description: "Quarterly performance review workflow",
    steps: ["analyze_performance", "skill_gap_analysis", "recommend_learning"],
  },
  payroll_processing: {
    name: "Payroll Processing",
    description: "Automated payroll verification workflow",
    steps: ["verify_payroll", "detect_anomalies", "check_compliance"],
  },
  employee_exit: {
    name: "Employee Exit",
    description: "Complete offboarding workflow",
    steps: ["offboard_employee", "knowledge_transfer", "analyze_exit"],
  },
  compliance_monitoring: {
    name: "Compliance Monitoring",
    description: "Continuous compliance monitoring",
    steps: ["track_expirations", "assess_risk", "audit_compliance"],
  },
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ workflowId: string }> }
) {
  try {
    const { workflowId } = await params;
    const body = await request.json();
    const { input } = body;

    const workflow = workflows[workflowId];
    if (!workflow) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: `Workflow '${workflowId}' not found`,
          },
        },
        { status: 404 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: {
          workflow: workflow.name,
          steps: workflow.steps,
          result: `[Mock Response] Workflow "${workflow.name}" would execute with input: ${JSON.stringify(input || {})}`,
          status: "completed",
          note: "OpenAI API key not configured - returning mock response",
        },
      });
    }

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an AI workflow orchestrator for HR. Execute the "${workflow.name}" workflow: ${workflow.description}. Steps: ${workflow.steps.join(", ")}.`,
        },
        {
          role: "user",
          content: `Execute workflow with input: ${JSON.stringify(input || {})}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    });

    const content = response.choices[0]?.message?.content || "";

    return NextResponse.json({
      success: true,
      data: {
        workflow: workflow.name,
        steps: workflow.steps,
        result: content,
        status: "completed",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "WORKFLOW_ERROR",
          message: error instanceof Error ? error.message : "Workflow execution failed",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: Object.entries(workflows).map(([id, wf]) => ({
      id,
      name: wf.name,
      description: wf.description,
      steps: wf.steps.length,
    })),
  });
}
