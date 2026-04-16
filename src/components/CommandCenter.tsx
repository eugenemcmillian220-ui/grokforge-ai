"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Send, Zap, TrendingUp, FileText, MessageSquare } from "lucide-react";

const quickActions = [
  { label: "Analyze Market", icon: TrendingUp, prompt: "Analyze the current AI SaaS market and identify the top 3 untapped opportunities" },
  { label: "Business Plan", icon: FileText, prompt: "Create a lean business plan for an AI-powered autonomous e-commerce platform" },
  { label: "Generate X Post", icon: MessageSquare, prompt: "Write a viral X post about the future of autonomous AI businesses" },
  { label: "DOGE Audit", icon: Zap, prompt: "Run a DOGE efficiency audit on a typical SaaS startup with 50 employees" },
];

export default function CommandCenter() {
  const { chatMessages, addChatMessage, isLoading, setIsLoading, apiKey } = useStore();
  const [input, setInput] = useState("");

  async function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg = { id: Date.now().toString(), role: "user" as const, content: text, timestamp: Date.now() };
    addChatMessage(userMsg);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/grok/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, apiKey }),
      });
      const data = await res.json();
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: Date.now(),
      });
    } catch {
      addChatMessage({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Connection to Grok interrupted. Running in demo mode.",
        timestamp: Date.now(),
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-bold">Command Center</h2>
        <p className="text-sm text-white/40">Direct interface to Grok intelligence</p>
      </div>

      {chatMessages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-lg">
            <div className="w-16 h-16 rounded-2xl gradient-grok flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-gradient">GrokForge</span> Command Center
            </h3>
            <p className="text-white/40 mb-8">
              Ask Grok to analyze markets, generate business plans, create X content,
              or audit efficiency. Your AI business co-pilot.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.label}
                    onClick={() => sendMessage(qa.prompt)}
                    className="glass glass-hover rounded-xl p-4 text-left transition-all"
                  >
                    <Icon className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-sm font-medium">{qa.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {chatMessages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "gradient-grok text-white"
                  : "glass"
              }`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="glass rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-4 border-t border-white/5">
        <div className="glass rounded-xl flex items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask Grok anything..."
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder-white/30"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading}
            className="p-3 text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
