"use client";
import { useStore } from "@/lib/store";
import { Bot } from "lucide-react";

export default function AgentPanel() {
  const { agents } = useStore();
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-400" />
          Grok Agents
        </h2>
        <p className="text-sm text-white/40">Autonomous AI workers powered by Grok-3</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="glass rounded-xl p-5 glass-hover transition-all">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{agent.icon}</span>
              <div>
                <h3 className="font-bold text-sm">{agent.name}</h3>
                <p className="text-xs text-white/40">{agent.role}</p>
              </div>
              <div className="ml-auto">
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === "active" ? "bg-green-400 animate-pulse" :
                  agent.status === "idle" ? "bg-yellow-400" : "bg-blue-400 animate-pulse"
                }`} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-white/30 uppercase">Tasks</p>
                <p className="text-lg font-bold">{agent.tasks}</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase">Efficiency</p>
                <p className="text-lg font-bold text-green-400">{agent.efficiency}%</p>
              </div>
            </div>
            <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full gradient-grok rounded-full" style={{ width: `${agent.efficiency}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
