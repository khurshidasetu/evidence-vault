"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EvidenceVersion } from "@/lib/data";
import { Clock, Download } from "lucide-react";

interface VersionHistoryProps {
  history: EvidenceVersion[];
}

export default function VersionHistory({ history }: VersionHistoryProps) {
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

      <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
              <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
                Version
              </TableHead>
              <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
                Upload Date
              </TableHead>
              <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
                Uploader
              </TableHead>
              <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
                Notes
              </TableHead>
              <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
                Size
              </TableHead>
              <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((v) => (
              <TableRow
                key={v.version}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="px-6">
                  <div className="flex flex-col">
                    <span className="font-mono text-primary font-bold">
                      {v.version}
                    </span>
                    {v.fileName && (
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                        {v.fileName}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock size={14} />
                    <span>{v.date}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {v.uploader[0]}
                    </div>
                    <span>{v.uploader}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 text-sm text-slate-600 max-w-xs truncate">
                  {v.notes}
                </TableCell>
                <TableCell className="px-6 text-sm text-slate-600">
                  {v.fileSize}
                </TableCell>
                <TableCell className="px-6 text-right">
                  <button className="text-primary hover:text-primary/80 font-medium text-xs flex items-center gap-1 transition-colors ml-auto">
                    <Download size={14} />
                    Preview
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
