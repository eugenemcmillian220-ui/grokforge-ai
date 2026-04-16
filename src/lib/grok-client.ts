const GROK_API = "https://api.x.ai/v1";

interface GrokMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GrokResponse {
  id: string;
  choices: { message: { content: string } }[];
}

export async function chatWithGrok(
  messages: GrokMessage[],
  apiKey: string
): Promise<string> {
  const res = await fetch(`${GROK_API}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "grok-3",
      messages,
      temperature: 0.7,
    }),
  });
  if (!res.ok) throw new Error(`Grok API error: ${res.status}`);
  const data: GrokResponse = await res.json();
  return data.choices[0]?.message?.content ?? "";
}

export async function analyzeMarket(
  query: string,
  apiKey: string
): Promise<string> {
  return chatWithGrok(
    [
      {
        role: "system",
        content:
          "You are Grok, a market intelligence analyst. Provide concise, actionable market analysis with data-driven insights. Focus on opportunities, threats, and competitive dynamics. Be direct and contrarian when warranted.",
      },
      { role: "user", content: query },
    ],
    apiKey
  );
}

export async function generateXPost(
  topic: string,
  style: "witty" | "informative" | "provocative",
  apiKey: string
): Promise<string> {
  const styleGuide = {
    witty: "Write a clever, witty X post with sharp humor. Think Elon's best tweets.",
    informative: "Write an informative X post that shares valuable insight concisely.",
    provocative:
      "Write a bold, provocative X post that challenges conventional wisdom. Be contrarian.",
  };
  return chatWithGrok(
    [
      {
        role: "system",
        content: `You are Grok, writing X/Twitter posts. ${styleGuide[style]} Keep it under 280 characters. No hashtags unless they're genuinely clever. No emojis spam.`,
      },
      { role: "user", content: `Write a post about: ${topic}` },
    ],
    apiKey
  );
}

export async function generateBusinessPlan(
  idea: string,
  apiKey: string
): Promise<string> {
  return chatWithGrok(
    [
      {
        role: "system",
        content:
          "You are Grok, a startup strategist. Create concise, first-principles business plans. Focus on: unique value prop, target market, revenue model, unfair advantages, key metrics, and 90-day execution plan. Be brutally honest about risks. Think like Elon — 10x improvement or don't bother.",
      },
      { role: "user", content: idea },
    ],
    apiKey
  );
}
