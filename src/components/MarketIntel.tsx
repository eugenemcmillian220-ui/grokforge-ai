"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { TrendingUp, Search, Send } from "lucide-react";

export default function MarketIntel() {
  const { signals, apiKey } = useStore();
  const [query, setQuery] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/grok/market", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, apiKey }),
      });
      const data = await res.json();
      setAnalysis(data.response);
    } catch {
      setAnalysis("Market analysis unavailable. Running in demo mode.");
    }
    setLoading(false);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Market Intelligence
        </h2>
        <p className="text-sm text-white/40">Real-time signals powered by Grok</p>
      </div>

      <div className="glass rounded-xl flex items-center">
        <Search className="w-4 h-4 text-white/30 ml-4" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          placeholder="Ask Grok to analyze any market..."
          className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder-white/30"
        />
        <button onClick={analyze} disabled={loading} className="p-3 text-green-400 hover:text-green-300 disabled:opacity-50">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {analysis && (
        <div className="glass rounded-xl p-5">
          <h3 className="font-bold text-sm text-green-400 mb-2">Grok Analysis</h3>
          <p className="text-sm text-white/70 whitespace-pre-wrap">{analysis}</p>
        </div>
      )}

      <div>
        <h3 className="font-bold text-sm mb-3 text-white/60">Live Signals</h3>
        <div className="space-y-3">
          {signals.map((sig) => (
            <div key={sig.id} className="glass rounded-xl p-4 glass-hover border-l-2 border-blue-500/50">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full animate-pulse ${
                  sig.type === "opportunity" ? "bg-green-400" :
                  sig.type === "threat" ? "bg-red-400" :
                  sig.type === "disruption" ? "bg-purple-400" : "bg-blue-400"
                }`} />
                <span className="text-[10px] text-white/40 uppercase tracking-wider">{sig.type}</span>
                <span className="text-[10px] text-white/20">·</span>
                <span className="text-[10px] text-white/30">{sig.confidence}% confidence</span>
              </div>
              <h4 className="font-medium text-sm mb-1">{sig.title}</h4>
              <p className="text-xs text-white/50">{sig.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
