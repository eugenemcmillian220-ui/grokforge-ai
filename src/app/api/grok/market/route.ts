import { NextResponse } from "next/server";
import { analyzeMarket } from "@/lib/grok-client";

const DEMO = `**Market Analysis: AI SaaS Landscape**

📊 **Key Metrics**
- TAM: $184B (2026), growing 34% CAGR
- Top 3 segments: Healthcare AI, FinTech automation, AI-native commerce
- Avg. customer acquisition cost trending down 22% YoY

🟢 **Opportunities**
1. Healthcare compliance automation — massive regulatory burden, few AI solutions
2. SMB autonomous operations — 99% of small businesses still manual
3. AI-to-AI commerce — machines buying from machines, zero-friction B2B

🔴 **Threats**
- Big Tech (Google, Microsoft) pushing enterprise AI hard
- Open-source models commoditizing base capabilities
- Regulatory uncertainty in EU markets

💡 **Grok's Take**: The window for autonomous commerce platforms is 18 months. After that, every major player will have one. Move now or compete on price later.`;

export async function POST(req: Request) {
  try {
    const { query, apiKey } = await req.json();
    if (apiKey) {
      const response = await analyzeMarket(query, apiKey);
      return NextResponse.json({ response });
    }
    return NextResponse.json({ response: DEMO });
  } catch {
    return NextResponse.json({ response: DEMO });
  }
}
