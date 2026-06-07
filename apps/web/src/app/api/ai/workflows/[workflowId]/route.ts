import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "@talentflow/ai-agents";

export async function POST(
  request: NextRequest,
  { params }: { params: { workflowId: string } }
) {
  try {
    const { workflowId } = params;
    const body = await request.json();
    const { input, context } = body;

    const response = await orchestrator.executeWorkflow(
      workflowId,
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
          code: "WORKFLOW_ERROR",
          message: error instanceof Error ? error.message : "Workflow execution failed",
        },
      },
      { status: 500 }
    );
  }
}
