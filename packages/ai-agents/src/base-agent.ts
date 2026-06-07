import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface AgentContext {
  companyId: string;
  userId: string;
  role: string;
  employeeId?: string;
}

export interface AgentResponse {
  success: boolean;
  data: unknown;
  reasoning: string;
  confidence: number;
  actions: AgentAction[];
}

export interface AgentAction {
  type: "create" | "update" | "notify" | "approve" | "flag" | "recommend";
  entity: string;
  entityId?: string;
  payload: Record<string, unknown>;
  priority: "low" | "medium" | "high" | "critical";
}

export abstract class BaseAgent {
  protected openai: OpenAI;
  protected name: string;
  protected systemPrompt: string;

  constructor(name: string, systemPrompt: string) {
    this.openai = openai;
    this.name = name;
    this.systemPrompt = systemPrompt;
  }

  protected async callLLM(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: this.systemPrompt },
        ...messages,
      ],
      temperature: options?.temperature ?? 0.3,
      max_tokens: options?.maxTokens ?? 4096,
    });

    return response.choices[0]?.message?.content ?? "";
  }

  protected async callLLMStructured<T>(
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    schema: Record<string, unknown>
  ): Promise<T> {
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: this.systemPrompt },
        ...messages,
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const content = response.choices[0]?.message?.content ?? "{}";
    return JSON.parse(content) as T;
  }

  abstract execute(
    input: Record<string, unknown>,
    context: AgentContext
  ): Promise<AgentResponse>;
}
