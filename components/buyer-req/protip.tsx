import React from "react";
import { AlertCircle } from "lucide-react";

export default function ProTip() {
  return (
    <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6 flex items-start gap-4">
      <div className="p-3 bg-white rounded-xl shadow-sm text-primary border border-primary/5">
        <AlertCircle size={24} />
      </div>
      <div>
        <h4 className="font-bold text-slate-900 text-sm">
          Pro Tip: Bulk Fulfillment
        </h4>
        <p className="text-sm text-slate-600 mt-1 leading-relaxed">
          You can fulfill multiple requests at once by selecting them from the
          vault and creating a "Share Pack". This simplifies sharing updated
          versions with all your buyers.
        </p>
      </div>
    </div>
  );
}
