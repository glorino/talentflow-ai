import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";

function getAIProvider() {
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return createGoogleGenerativeAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })("gemini-2.0-flash");
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })("claude-sonnet-4-20250514");
  }
  if (process.env.OPENAI_API_KEY) {
    return createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })("gpt-4o");
  }
  return null;
}

const agents: Record<string, { name: string; systemPrompt: string }> = {
  recruitment: {
    name: "Recruitment Agent",
    systemPrompt: "You are an AI Recruitment Agent for TalentFlow HR. Source talent, optimize job postings, and manage recruitment pipelines. Respond with JSON.",
  },
  screening: {
    name: "Screening Agent",
    systemPrompt: "You are an AI Screening Agent. Analyze resumes, rank candidates, and provide screening scores. Respond with JSON.",
  },
  interview: {
    name: "Interview Agent",
    systemPrompt: "You are an AI Interview Agent. Generate questions, schedule interviews, and analyze feedback. Respond with JSON.",
  },
  onboarding: {
    name: "Onboarding Agent",
    systemPrompt: "You are an AI Onboarding Agent. Create onboarding plans and track new hire progress. Respond with JSON.",
  },
  payroll: {
    name: "Payroll Agent",
    systemPrompt: "You are an AI Payroll Agent. Verify payroll calculations and detect anomalies. Respond with JSON.",
  },
  compliance: {
    name: "Compliance Agent",
    systemPrompt: "You are an AI Compliance Agent. Monitor compliance and track certifications. Respond with JSON.",
  },
  performance: {
    name: "Performance Agent",
    systemPrompt: "You are an AI Performance Agent. Analyze performance data and predict retention. Respond with JSON.",
  },
  learning: {
    name: "Learning Agent",
    systemPrompt: "You are an AI Learning Agent. Recommend learning paths and track progress. Respond with JSON.",
  },
  exit: {
    name: "Exit Agent",
    systemPrompt: "You are an AI Exit Agent. Manage offboarding and analyze attrition. Respond with JSON.",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent, action, input } = body;

    if (!agent || !action) {
      return NextResponse.json(
        { success: false, error: { code: "VALIDATION_ERROR", message: "agent and action are required" } },
        { status: 400 }
      );
    }

    const agentConfig = agents[agent];
    if (!agentConfig) {
      return NextResponse.json(
        { success: false, error: { code: "NOT_FOUND", message: `Agent '${agent}' not found` } },
        { status: 404 }
      );
    }

    const ai = getAIProvider();

    if (!ai) {
      return NextResponse.json({
        success: true,
        data: {
          agent: agentConfig.name,
          action,
          response: { summary: `[Mock] ${agentConfig.name} processed ${action}`, input },
          confidence: 0.85,
          note: "No AI provider configured. Set OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or ANTHROPIC_API_KEY",
        },
      });
    }

    const { text } = await generateText({
      model: ai,
      system: agentConfig.systemPrompt,
      prompt: `Action: ${action}\nInput: ${JSON.stringify(input || {})}\n\nProvide a structured response.`,
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
        agent: agentConfig.name,
        action,
        response: parsed,
        confidence: 0.85,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: { code: "AGENT_ERROR", message: error instanceof Error ? error.message : "Failed" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      agents: Object.keys(agents).map((key) => ({ id: key, name: agents[key].name, status: "active" })),
      providers: {
        openai: !!process.env.OPENAI_API_KEY,
        google: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
        anthropic: !!process.env.ANTHROPIC_API_KEY,
      },
    },
  });
}
