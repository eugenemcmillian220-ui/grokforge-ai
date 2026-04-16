import { NextResponse } from "next/server";
import { chatWithGrok } from "@/lib/grok-client";

const DEMO_RESPONSES: Record<string, string> = {
  default: `Based on my analysis, here are the key insights:

**Market Opportunity**
The autonomous business sector is experiencing unprecedented growth. Three verticals stand out:

1. **AI-Powered Commerce** — Self-optimizing storefronts with zero human intervention. $47B TAM by 2028.
2. **Autonomous Content Networks** — AI-generated, AI-distributed content ecosystems. First-mover advantage is massive.  
3. **Predictive Supply Chain** — Grok-powered demand forecasting eliminates 80% of inventory waste.

**Recommended Action**
Start with AI Commerce. Lowest barrier, highest margin, fastest path to $10K MRR. I can build you a business plan in 30 seconds.

*— Grok, your autonomous business advisor*`,
};

export async function POST(req: Request) {
  try {
    const { message, apiKey } = await req.json();
    if (apiKey) {
      const response = await chatWithGrok(
        [
          { role: "system", content: "You are Grok, an AI business strategist built by xAI. Help users build and scale autonomous businesses. Be direct, data-driven, and occasionally witty. Think in first principles." },
          { role: "user", content: message },
        ],
        apiKey
      );
      return NextResponse.json({ response });
    }
    return NextResponse.json({ response: DEMO_RESPONSES.default });
  } catch {
    return NextResponse.json({ response: DEMO_RESPONSES.default });
  }
}
