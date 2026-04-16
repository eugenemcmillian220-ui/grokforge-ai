"use client";
import { Zap, Scissors, DollarSign, TrendingDown } from "lucide-react";

const wasteItems = [
  { dept: "Marketing", waste: "$12,400/mo", savings: "$9,800/mo", score: 34, issue: "73% of ad spend has negative ROI" },
  { dept: "Operations", waste: "$8,200/mo", savings: "$6,100/mo", score: 52, issue: "Manual processes that should be automated" },
  { dept: "HR", waste: "$15,600/mo", savings: "$14,200/mo", score: 21, issue: "Redundant approval chains, unnecessary meetings" },
  { dept: "Engineering", waste: "$3,100/mo", savings: "$1,800/mo", score: 78, issue: "Some CI/CD inefficiency, minor tool overlap" },
  { dept: "Sales", waste: "$6,700/mo", savings: "$5,200/mo", score: 45, issue: "CRM bloat, too many non-converting leads pursued" },
];

export default function DogeScore() {
  const totalWaste = wasteItems.reduce((a, b) => a + parseInt(b.waste.replace(/[^0-9]/g, "")), 0);
  const totalSavings = wasteItems.reduce((a, b) => a + parseInt(b.savings.replace(/[^0-9]/g, "")), 0);
  const overallScore = Math.round(wasteItems.reduce((a, b) => a + b.score, 0) / wasteItems.length);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          DOGE Efficiency Score
        </h2>
        <p className="text-sm text-white/40">Department of Government Efficiency methodology</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-5 text-center">
          <Scissors className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-red-400">${(totalWaste / 1000).toFixed(1)}k</p>
          <p className="text-xs text-white/40 mt-1">Monthly Waste</p>
        </div>
        <div className="glass rounded-xl p-5 text-center">
          <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-green-400">${(totalSavings / 1000).toFixed(1)}k</p>
          <p className="text-xs text-white/40 mt-1">Potential Savings</p>
        </div>
        <div className="glass rounded-xl p-5 text-center">
          <TrendingDown className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-yellow-400">{overallScore}%</p>
          <p className="text-xs text-white/40 mt-1">Efficiency Score</p>
        </div>
      </div>

      <div className="glass rounded-xl p-5">
        <h3 className="font-bold text-sm mb-4">Waste Audit by Department</h3>
        <div className="space-y-4">
          {wasteItems.map((item) => (
            <div key={item.dept}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{item.dept}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-red-400">{item.waste} waste</span>
                  <span className={`text-xs font-bold ${item.score >= 70 ? "text-green-400" : item.score >= 50 ? "text-yellow-400" : "text-red-400"}`}>{item.score}%</span>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${
                  item.score >= 70 ? "bg-green-500" : item.score >= 50 ? "bg-yellow-500" : "bg-red-500"
                }`} style={{ width: `${item.score}%` }} />
              </div>
              <p className="text-[10px] text-white/30 mt-1">{item.issue}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-5 border border-yellow-500/20">
        <h3 className="font-bold text-sm text-yellow-400 mb-2">🔪 DOGE Recommendations</h3>
        <ul className="space-y-2 text-xs text-white/60">
          <li>• <strong>Delete HR approval chains</strong> — 4 layers of approval for office supplies? Gone.</li>
          <li>• <strong>Automate marketing attribution</strong> — replace manual tracking with Grok-powered analytics.</li>
          <li>• <strong>Kill the CRM bloat</strong> — 80% of leads will never convert. Focus on the 20%.</li>
          <li>• <strong>Replace weekly status meetings</strong> — async updates via Grok agents. Save 40 hrs/month.</li>
          <li>• <strong>Consolidate SaaS tools</strong> — 12 overlapping subscriptions. Cut to 4.</li>
        </ul>
      </div>
    </div>
  );
}
