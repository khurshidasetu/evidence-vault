import React from "react";
import { Info } from "lucide-react";
import { Evidence } from "@/lib/data";

interface MetadataCardProps {
  evidence: Evidence;
}

export const MetadataCard: React.FC<MetadataCardProps> = ({ evidence }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
        <Info size={16} className="text-primary" />
        Metadata
      </h3>
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Issuer
          </p>
          <p className="text-sm font-medium text-slate-700">
            {evidence.metadata.issuer || "Unknown"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Issue Date
          </p>
          <p className="text-sm font-medium text-slate-700">
            {evidence.metadata.issueDate || "Unknown"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Description
          </p>
          <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-3">
            "{evidence.metadata.description || "No description provided."}"
          </p>
        </div>
      </div>
    </div>
  );
};
