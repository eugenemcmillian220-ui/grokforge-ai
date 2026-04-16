import { NextResponse } from "next/server";
import { generateXPost } from "@/lib/grok-client";

const DEMO_POSTS = {
  witty: "AI won't replace your job. But someone using AI will. The question is: are you the replacer or the replaced? Choose wisely. 🧠",
  informative: "3 metrics that actually matter for AI businesses: 1) Automation rate (>90% or rebuild), 2) Cost per decision ($0.001 target), 3) Time to value (<60 seconds). Everything else is vanity.",
  provocative: "Hot take: 95% of 'AI startups' are just GPT wrappers with a landing page. Real AI businesses replace entire departments, not individual tasks. If your AI needs a human to work, it's not AI — it's a tool.",
};

export async function POST(req: Request) {
  try {
    const { topic, style, apiKey } = await req.json();
    if (apiKey) {
      const response = await generateXPost(topic, style, apiKey);
      return NextResponse.json({ response });
    }
    return NextResponse.json({ response: DEMO_POSTS[style as keyof typeof DEMO_POSTS] || DEMO_POSTS.witty });
  } catch {
    return NextResponse.json({ response: DEMO_POSTS.witty });
  }
}
