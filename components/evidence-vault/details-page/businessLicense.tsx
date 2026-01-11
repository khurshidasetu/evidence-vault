import React from "react";
import { FileText, ShieldCheck } from "lucide-react";

export default function BusinessLicense() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <ShieldCheck size={20} />
        </div>
        <h3 className="text-sm font-bold text-slate-900">
          License Verification
        </h3>
      </div>
      <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="text-emerald-500" size={24} />
          <div>
            <p className="text-xs font-bold text-emerald-900">
              Verified by Gov.Portal
            </p>
            <p className="text-[10px] text-emerald-600">
              Sync with Registry: Just now
            </p>
          </div>
        </div>
        <button className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest hover:underline">
          View Hash
        </button>
      </div>
    </div>
  );
}
