import { Activity, ExternalLink } from "lucide-react";

export default function Txs() {
  const transactions = [
    {
      id: "TX-9021",
      type: "Upload",
      status: "Confirmed",
      date: "2023-10-24 14:30",
    },
    {
      id: "TX-8922",
      type: "Verification",
      status: "Confirmed",
      date: "2023-10-24 14:35",
    },
    {
      id: "TX-8831",
      type: "Audit Sync",
      status: "Confirmed",
      date: "2023-11-01 09:12",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <Activity size={16} className="text-primary" />
        Activity Feed (Ledger)
      </h3>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ExternalLink size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-700">
                  {tx.type}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {tx.id}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-primary">{tx.status}</p>
              <p className="text-[9px] text-slate-400">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-dashed border-slate-200 rounded-xl hover:border-primary hover:text-primary transition-all">
        View Full Explorer
      </button>
    </div>
  );
}
