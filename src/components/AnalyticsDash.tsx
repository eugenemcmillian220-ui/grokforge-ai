"use client";
import { useStore } from "@/lib/store";
import { BarChart3 } from "lucide-react";

export default function AnalyticsDash() {
  const { businesses } = useStore();
  const totalRev = businesses.reduce((a, b) => a + b.revenue, 0);

  const metrics = [
    { label: "MRR", value: `$${totalRev.toLocaleString()}`, change: "+18%", positive: true },
    { label: "ARR Run Rate", value: `$${(totalRev * 12).toLocaleString()}`, change: "+22%", positive: true },
    { label: "LTV/CAC Ratio", value: "4.2x", change: "+0.3", positive: true },
    { label: "Churn Rate", value: "2.1%", change: "-0.4%", positive: true },
    { label: "NPS Score", value: "72", change: "+5", positive: true },
    { label: "Avg Revenue/Agent", value: `$${Math.round(totalRev / businesses.reduce((a, b) => a + b.agents, 0)).toLocaleString()}`, change: "+12%", positive: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          Analytics
        </h2>
        <p className="text-sm text-white/40">Business intelligence & performance metrics</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="glass rounded-xl p-5">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{m.label}</p>
            <p className="text-2xl font-bold">{m.value}</p>
            <span className={`text-xs ${m.positive ? "text-green-400" : "text-red-400"}`}>{m.change}</span>
          </div>
        ))}
      </div>

      <div className="glass rounded-xl p-5">
        <h3 className="font-bold text-sm mb-4">Revenue by Business</h3>
        <div className="space-y-3">
          {businesses.map((biz) => {
            const pct = Math.round((biz.revenue / totalRev) * 100);
            return (
              <div key={biz.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">{biz.name}</span>
                  <span className="text-sm font-bold text-green-400">${biz.revenue.toLocaleString()}/mo ({pct}%)</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full gradient-grok rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5">
          <h3 className="font-bold text-sm mb-3">Growth Trajectory</h3>
          <div className="flex items-end gap-1 h-32">
            {[35, 42, 38, 55, 62, 58, 71, 78, 85, 92, 88, 101].map((v, i) => (
              <div key={i} className="flex-1 gradient-grok rounded-t opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/30">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>
        <div className="glass rounded-xl p-5">
          <h3 className="font-bold text-sm mb-3">Agent Performance</h3>
          <div className="flex items-end gap-1 h-32">
            {[88, 92, 94, 91, 96, 93, 95, 97, 94, 98, 96, 97].map((v, i) => (
              <div key={i} className="flex-1 bg-green-500 rounded-t opacity-70 hover:opacity-100 transition-opacity" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-white/30">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
}
