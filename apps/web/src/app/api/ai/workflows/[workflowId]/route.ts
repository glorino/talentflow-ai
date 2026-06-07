import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";

function getAIProvider() {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY })("gemini-2.0-flash");
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })("claude-sonnet-4-20250514");
  }
  if (process.env.OPENAI_API_KEY) {
    return createOpenAI({ apiKey: process.env.OPENAI_API_KEY })("gpt-4o");
  }
  return null;
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
        { success: false, error: { code: "NOT_FOUND", message: `Workflow '${workflowId}' not found` } },
        { status: 404 }
      );
    }

    const ai = getAIProvider();

    if (!ai) {
      return NextResponse.json({
        success: true,
        data: {
          workflow: workflow.name,
          steps: workflow.steps,
          result: { summary: `[Mock] Workflow "${workflow.name}" executed`, input },
          status: "completed",
          note: "No AI provider configured",
        },
      });
    }

    const { text } = await generateText({
      model: ai,
      system: `You are an AI workflow orchestrator for HR. Execute the "${workflow.name}" workflow: ${workflow.description}. Steps: ${workflow.steps.join(", ")}. Respond with JSON.`,
      prompt: `Execute workflow with input: ${JSON.stringify(input || {})}`,
      temperature: 0.3,
    });

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    return NextResponse.json({
      success: true,
      data: {
        workflow: workflow.name,
        steps: workflow.steps,
        result: parsed,
        status: "completed",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "WORKFLOW_ERROR", message: error instanceof Error ? error.message : "Failed" } },
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
