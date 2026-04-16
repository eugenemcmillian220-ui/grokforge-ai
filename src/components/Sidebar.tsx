"use client";
import { useStore } from "@/lib/store";
import {
  Brain, Terminal, Briefcase, Bot, TrendingUp, MessageSquare,
  Zap, Radio, BarChart3, Shield, Settings,
} from "lucide-react";

const nav = [
  { id: "command", label: "Command", icon: Terminal },
  { id: "businesses", label: "Businesses", icon: Briefcase },
  { id: "agents", label: "Agents", icon: Bot },
  { id: "market", label: "Market Intel", icon: TrendingUp },
  { id: "x-engine", label: "X Engine", icon: MessageSquare },
  { id: "doge", label: "DOGE Score", icon: Zap },
  { id: "signals", label: "Signals", icon: Radio },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "security", label: "Security", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useStore();
  return (
    <aside className="w-64 h-screen flex flex-col border-r border-white/5 bg-black/40">
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-grok flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">GrokForge</h1>
            <p className="text-[10px] text-white/40">Autonomous Business OS</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-3 space-y-0.5 px-3 overflow-y-auto">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="glass rounded-lg p-3">
          <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Engine</p>
          <p className="text-xs font-medium">Grok-3 · xAI</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-green-400">Connected</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
