"use client";
import { useStore } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import CommandCenter from "@/components/CommandCenter";
import BusinessDashboard from "@/components/BusinessDashboard";
import AgentPanel from "@/components/AgentPanel";
import MarketIntel from "@/components/MarketIntel";
import XEngine from "@/components/XEngine";
import DogeScore from "@/components/DogeScore";
import AnalyticsDash from "@/components/AnalyticsDash";
import SettingsPanel from "@/components/SettingsPanel";
import { Radio, Shield } from "lucide-react";

function LiveSignals() {
  const { signals } = useStore();
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Radio className="w-5 h-5 text-green-400" />
          Live Signals
        </h2>
        <p className="text-sm text-white/40">Real-time market & business signals</p>
      </div>
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
              <span className="text-[10px] text-white/30">{sig.confidence}% confidence</span>
            </div>
            <h4 className="font-medium text-sm mb-1">{sig.title}</h4>
            <p className="text-xs text-white/50">{sig.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Security() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-400" />
          Security Center
        </h2>
        <p className="text-sm text-white/40">Autonomous threat detection & compliance</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "API Security", score: 98, status: "Protected" },
          { label: "Data Encryption", score: 100, status: "AES-256" },
          { label: "Auth Integrity", score: 95, status: "OAuth 2.0 + MFA" },
          { label: "Agent Sandboxing", score: 97, status: "Isolated" },
        ].map((item) => (
          <div key={item.label} className="glass rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-green-400">{item.score}%</p>
            <p className="text-sm font-medium mt-1">{item.label}</p>
            <p className="text-xs text-white/40 mt-1">{item.status}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-5">
        <h3 className="font-bold text-sm mb-3">Recent Security Events</h3>
        {[
          { event: "API rate limit enforced", time: "2 min ago", severity: "low" },
          { event: "New agent sandboxed successfully", time: "18 min ago", severity: "info" },
          { event: "Suspicious login attempt blocked", time: "1 hr ago", severity: "high" },
          { event: "SSL certificate auto-renewed", time: "6 hrs ago", severity: "info" },
        ].map((e, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${
                e.severity === "high" ? "bg-red-400" : e.severity === "low" ? "bg-yellow-400" : "bg-blue-400"
              }`} />
              <span className="text-xs text-white/70">{e.event}</span>
            </div>
            <span className="text-[10px] text-white/30">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const panels: Record<string, React.ComponentType> = {
  command: CommandCenter,
  businesses: BusinessDashboard,
  agents: AgentPanel,
  market: MarketIntel,
  "x-engine": XEngine,
  doge: DogeScore,
  signals: LiveSignals,
  analytics: AnalyticsDash,
  security: Security,
  settings: SettingsPanel,
};

export default function Home() {
  const { activeTab } = useStore();
  const Panel = panels[activeTab] || CommandCenter;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Panel />
      </main>
    </div>
  );
}
