"use client";

import React from "react";
import { Calendar, CheckCircle2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/StatusChip";
import { BuyerRequest } from "@/lib/data";

interface EachRowProps {
  request: BuyerRequest;
  onFulfill: (req: BuyerRequest) => void;
}

export default function EachRow({ request, onFulfill }: EachRowProps) {
  return (
    <TableRow className="hover:bg-slate-50/50 transition-colors">
      <TableCell className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">
            {request.docType}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
            REQ-ID: {request.id}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 border border-slate-200">
            {request.buyerName[0]}
          </div>
          <span className="text-sm text-slate-600 font-medium">
            {request.buyerName}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-sm italic">{request.dueDate}</span>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4">
        <StatusChip status={request.status} />
      </TableCell>
      <TableCell className="px-6 py-4 text-right">
        {request.status === "Open" ? (
          <Button
            variant="outline"
            onClick={() => onFulfill(request)}
            className="h-8 rounded-lg bg-primary/5 text-primary border-primary/20 hover:bg-primary hover:text-white font-bold transition-all text-xs"
          >
            Fulfill Request
          </Button>
        ) : (
          <div className="flex items-center justify-end gap-1.5 text-primary text-xs font-bold px-2 py-1.5">
            <CheckCircle2 size={14} />
            Completed
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
