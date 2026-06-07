import { NextRequest, NextResponse } from "next/server";

function getOpenAI() {
  const OpenAI = require("openai").default || require("openai");
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

const agents: Record<string, { name: string; systemPrompt: string }> = {
  recruitment: {
    name: "Recruitment Agent",
    systemPrompt: "You are an AI Recruitment Agent. Source talent, optimize job postings, and manage recruitment pipelines.",
  },
  screening: {
    name: "Screening Agent",
    systemPrompt: "You are an AI Screening Agent. Analyze resumes, rank candidates, and provide screening scores.",
  },
  interview: {
    name: "Interview Agent",
    systemPrompt: "You are an AI Interview Agent. Generate questions, schedule interviews, and analyze feedback.",
  },
  onboarding: {
    name: "Onboarding Agent",
    systemPrompt: "You are an AI Onboarding Agent. Create onboarding plans and track new hire progress.",
  },
  payroll: {
    name: "Payroll Agent",
    systemPrompt: "You are an AI Payroll Agent. Verify payroll calculations and detect anomalies.",
  },
  compliance: {
    name: "Compliance Agent",
    systemPrompt: "You are an AI Compliance Agent. Monitor compliance and track certifications.",
  },
  performance: {
    name: "Performance Agent",
    systemPrompt: "You are an AI Performance Agent. Analyze performance data and predict retention.",
  },
  learning: {
    name: "Learning Agent",
    systemPrompt: "You are an AI Learning Agent. Recommend learning paths and track progress.",
  },
  exit: {
    name: "Exit Agent",
    systemPrompt: "You are an AI Exit Agent. Manage offboarding and analyze attrition.",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent, action, input } = body;

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

    const agentConfig = agents[agent];
    if (!agentConfig) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: `Agent '${agent}' not found`,
          },
        },
        { status: 404 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        success: true,
        data: {
          agent: agentConfig.name,
          action,
          response: `[Mock Response] ${agentConfig.name} would process: ${JSON.stringify(input || {})}`,
          confidence: 0.85,
          note: "OpenAI API key not configured - returning mock response",
        },
      });
    }

    const openai = getOpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: agentConfig.systemPrompt },
        { role: "user", content: `Action: ${action}\nInput: ${JSON.stringify(input || {})}` },
      ],
      temperature: 0.3,
      max_tokens: 4096,
    });

    const content = response.choices[0]?.message?.content || "";

    return NextResponse.json({
      success: true,
      data: {
        agent: agentConfig.name,
        action,
        response: content,
        confidence: 0.85,
      },
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
      agents: Object.keys(agents).map((key) => ({
        id: key,
        name: agents[key].name,
        status: "active",
      })),
    },
  });
}
