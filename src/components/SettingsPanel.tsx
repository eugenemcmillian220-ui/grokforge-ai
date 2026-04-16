"use client";
import { useStore } from "@/lib/store";
import { Settings, Key, Plug, ExternalLink } from "lucide-react";

const integrations = [
  { name: "xAI Grok API", status: "available", desc: "Core AI engine" },
  { name: "X / Twitter", status: "available", desc: "Content & analytics" },
  { name: "Tesla API", status: "coming", desc: "Fleet & energy data" },
  { name: "SpaceX Starlink", status: "coming", desc: "Global connectivity" },
  { name: "Neuralink", status: "future", desc: "Neural data streams" },
  { name: "The Boring Company", status: "future", desc: "Infrastructure data" },
];

export default function SettingsPanel() {
  const { apiKey, setApiKey } = useStore();

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Settings className="w-5 h-5 text-white/60" />
          Settings
        </h2>
        <p className="text-sm text-white/40">Configure your GrokForge instance</p>
      </div>

      <div className="glass rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-yellow-400" />
          <h3 className="font-bold text-sm">xAI API Key</h3>
        </div>
        <p className="text-xs text-white/40">Connect your Grok API key to unlock real-time AI intelligence. Get one at <a href="https://console.x.ai" target="_blank" className="text-blue-400 hover:underline">console.x.ai</a></p>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="xai-..."
          className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm outline-none border border-white/5 focus:border-blue-500/50 font-mono"
        />
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${apiKey ? "bg-green-400" : "bg-white/20"}`} />
          <span className="text-xs text-white/40">{apiKey ? "API key configured" : "Running in demo mode"}</span>
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Plug className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-sm">Elon Ecosystem Integrations</h3>
        </div>
        <div className="space-y-3">
          {integrations.map((int) => (
            <div key={int.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm font-medium">{int.name}</p>
                <p className="text-[10px] text-white/30">{int.desc}</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                int.status === "available" ? "bg-green-500/20 text-green-400" :
                int.status === "coming" ? "bg-blue-500/20 text-blue-400" :
                "bg-white/5 text-white/30"
              }`}>
                {int.status === "available" ? "Available" : int.status === "coming" ? "Coming Soon" : "Future"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <h3 className="font-bold text-sm mb-2">About GrokForge</h3>
        <p className="text-xs text-white/40 mb-3">The AI-Native Autonomous Business OS. Built on first principles. Powered by Grok.</p>
        <a href="https://github.com/eugenemcmillian220-ui/grokforge-ai" target="_blank" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
          <ExternalLink className="w-3 h-3" /> View on GitHub
        </a>
      </div>
    </div>
  );
}
