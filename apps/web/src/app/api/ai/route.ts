import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "@talentflow/ai-agents";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent, action, input, context } = body;

    if (!agent || !action) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "agent and action are required",
          },
        },
        { status: 400 }
      );
    }

    const response = await orchestrator.executeAgent(
      agent,
      input || {},
      context || {
        companyId: "default",
        userId: "system",
        role: "company_admin",
      }
    );

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "AGENT_ERROR",
          message: error instanceof Error ? error.message : "Agent execution failed",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      agents: orchestrator.listAgents(),
      workflows: orchestrator.listWorkflows().map((w) => ({
        id: w.id,
        name: w.name,
        description: w.description,
        trigger: w.trigger,
        stepCount: w.steps.length,
      })),
    },
  });
}
