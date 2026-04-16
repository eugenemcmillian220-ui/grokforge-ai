"use client";
import { useStore } from "@/lib/store";
import { DollarSign, Users, Zap, TrendingUp } from "lucide-react";

export default function BusinessDashboard() {
  const { businesses } = useStore();
  const totalRev = businesses.reduce((a, b) => a + b.revenue, 0);
  const totalAgents = businesses.reduce((a, b) => a + b.agents, 0);
  const avgEff = Math.round(businesses.reduce((a, b) => a + b.efficiency, 0) / businesses.length);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold">Business Dashboard</h2>
        <p className="text-sm text-white/40">Your autonomous business empire</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total MRR", value: `$${(totalRev).toLocaleString()}`, icon: DollarSign, color: "text-green-400" },
          { label: "Active Agents", value: totalAgents, icon: Users, color: "text-blue-400" },
          { label: "Avg Efficiency", value: `${avgEff}%`, icon: Zap, color: "text-yellow-400" },
          { label: "Growth Rate", value: "+23%", icon: TrendingUp, color: "text-purple-400" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        {businesses.map((biz) => (
          <div key={biz.id} className="glass rounded-xl p-5 glass-hover transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">{biz.name}</h3>
                <p className="text-xs text-white/40 mt-1">
                  {biz.agents} agents · {biz.xFollowers.toLocaleString()} X followers
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">${biz.revenue.toLocaleString()}/mo</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  biz.status === "active" ? "bg-green-500/20 text-green-400" :
                  biz.status === "scaling" ? "bg-blue-500/20 text-blue-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>{biz.status}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                <span>DOGE Efficiency</span>
                <span>{biz.efficiency}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full gradient-grok rounded-full transition-all" style={{ width: `${biz.efficiency}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
