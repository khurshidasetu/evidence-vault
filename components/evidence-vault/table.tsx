import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusChip } from "@/components/ui/StatusChip";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Evidence } from "@/lib/data";
import { cn } from "@/lib/utils";

interface VaultTableProps {
  data: Evidence[];
  selectedIds: string[];
  onSelectRow: (id: string) => void;
  onSelectAll: (ids: string[]) => void;
  onRowClick: (item: Evidence) => void;
}

export default function VaultTable({
  data,
  selectedIds,
  onSelectRow,
  onSelectAll,
  onRowClick,
}: VaultTableProps) {
  const allIds = data.map((item) => item.id);
  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="w-full overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm transition-all duration-300">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="w-[50px] px-6">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={() => onSelectAll(isAllSelected ? [] : allIds)}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Doc Name
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Doc Type
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Expiry
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider text-center">
              Versions
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider">
              Last Updated
            </TableHead>
            <TableHead className="px-6 font-semibold text-slate-500 uppercase tracking-wider text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-32 text-center text-slate-400"
              >
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <TableRow
                  key={item.id}
                  className={cn(
                    "group cursor-pointer transition-colors hover:bg-slate-50/50",
                    isSelected && "bg-primary/5"
                  )}
                  onClick={() => onRowClick(item)}
                >
                  <TableCell
                    className="px-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onSelectRow(item.id)}
                      aria-label={`Select row ${item.id}`}
                    />
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">
                        {item.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 text-sm text-slate-600">
                    {item.type}
                  </TableCell>
                  <TableCell className="px-6">
                    <StatusChip status={item.status} />
                  </TableCell>
                  <TableCell className="px-6 text-sm text-slate-600">
                    <span
                      className={
                        item.status === "Expired"
                          ? "text-rose-500 font-medium"
                          : ""
                      }
                    >
                      {item.expiry || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 text-center text-sm font-medium text-slate-600">
                    {item.versions}
                  </TableCell>
                  <TableCell className="px-6 text-sm text-slate-600">
                    {item.lastUpdated}
                  </TableCell>
                  <TableCell className="px-6 text-right">
                    <Link
                      href={`/vault/${item.id}`}
                      className="inline-flex items-center justify-center p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowRight size={18} />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
