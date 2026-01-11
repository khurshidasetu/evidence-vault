"use client";

import React from "react";
import { Clock, Download } from "lucide-react";
import { Table } from "@/components/ui/Table";
import { EvidenceVersion } from "@/lib/data";

interface VersionHistoryTableProps {
  history: EvidenceVersion[];
}

export const VersionHistoryTable: React.FC<VersionHistoryTableProps> = ({
  history,
}) => {
  const columns = [
    {
      header: "Version",
      accessor: (v: EvidenceVersion) => (
        <span className="font-mono text-primary font-bold">{v.version}</span>
      ),
    },
    {
      header: "Upload Date",
      accessor: (v: EvidenceVersion) => (
        <div className="flex items-center gap-2 text-slate-500">
          <Clock size={14} />
          <span>{v.date}</span>
        </div>
      ),
    },
    {
      header: "Uploader",
      accessor: (v: EvidenceVersion) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
            {v.uploader[0]}
          </div>
          <span>{v.uploader}</span>
        </div>
      ),
    },
    { header: "Notes", accessor: "notes", className: "max-w-xs truncate" },
    { header: "Size", accessor: "fileSize" },
    {
      header: "Action",
      accessor: () => (
        <button className="text-primary hover:text-primary/80 font-medium text-xs flex items-center gap-1 transition-colors">
          <Download size={14} />
          Preview
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
          Version History
        </h3>
        <span className="text-xs text-slate-400 font-medium">
          {history.length} versions available
        </span>
      </div>
      <Table data={history} columns={columns} idField="version" />
    </div>
  );
};
