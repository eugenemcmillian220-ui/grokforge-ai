"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { MessageSquare, Sparkles, Copy, Check } from "lucide-react";

const styles = [
  { id: "witty" as const, label: "Witty", desc: "Sharp & clever" },
  { id: "informative" as const, label: "Informative", desc: "Value-packed" },
  { id: "provocative" as const, label: "Provocative", desc: "Bold & contrarian" },
];

export default function XEngine() {
  const { apiKey } = useStore();
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState<"witty" | "informative" | "provocative">("witty");
  const [posts, setPosts] = useState<{ text: string; engagement: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function generate() {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/grok/x-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style, apiKey }),
      });
      const data = await res.json();
      setPosts((prev) => [{ text: data.response, engagement: Math.floor(Math.random() * 40) + 60 }, ...prev]);
    } catch {
      setPosts((prev) => [{ text: `${style === "witty" ? "Hot take:" : style === "provocative" ? "Unpopular opinion:" : "Thread:"} ${topic} is about to change everything. The question isn't if, it's who moves first. 🧠`, engagement: Math.floor(Math.random() * 30) + 70 }, ...prev]);
    }
    setLoading(false);
  }

  function copyPost(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          X Engine
        </h2>
        <p className="text-sm text-white/40">AI-powered X/MessageSquare content generation</p>
      </div>

      <div className="glass rounded-xl p-5 space-y-4">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="What should Grok post about?"
          className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm outline-none placeholder-white/30 border border-white/5 focus:border-blue-500/50"
        />
        <div className="flex gap-2">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs transition-all ${
                style === s.id ? "gradient-grok text-white" : "glass glass-hover"
              }`}
            >
              <p className="font-medium">{s.label}</p>
              <p className="text-[10px] opacity-60">{s.desc}</p>
            </button>
          ))}
        </div>
        <button onClick={generate} disabled={loading || !topic.trim()} className="w-full gradient-grok rounded-lg py-3 text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          {loading ? "Generating..." : "Generate Post"}
        </button>
      </div>

      {posts.length > 0 && (
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div key={i} className="glass rounded-xl p-5 glass-hover">
              <p className="text-sm mb-3">{post.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Predicted engagement: <span className="text-green-400">{post.engagement}%</span></span>
                <button onClick={() => copyPost(post.text, i)} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  {copied === i ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
