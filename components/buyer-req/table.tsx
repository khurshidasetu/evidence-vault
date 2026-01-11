import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BuyerRequest } from "@/lib/data";
import EachRow from "./eachrow";

interface RequestsTableProps {
  requests: BuyerRequest[];
  onFulfill: (req: BuyerRequest) => void;
}

export default function RequestsTable({
  requests,
  onFulfill,
}: RequestsTableProps) {
  return (
    <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Requested Document
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Buyer
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Due Date
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <EachRow key={request.id} request={request} onFulfill={onFulfill} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
