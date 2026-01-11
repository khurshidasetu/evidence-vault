import { StatusChip } from "@/components/ui/StatusChip";
import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { Evidence } from "@/lib/data";

interface SelectVaultTableProps {
  data: Evidence[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function SelectVaultTable({
  data,
  selectedId,
  onSelect,
}: SelectVaultTableProps) {
  return (
    <div className="max-h-[250px] overflow-y-auto border border-slate-200 rounded-2xl bg-white shadow-inner">
      <Table>
        <TableBody>
          {data.map((ev) => (
            <TableRow
              key={ev.id}
              className={`cursor-pointer hover:bg-slate-50 transition-colors ${
                selectedId === ev.id ? "bg-primary/5" : ""
              }`}
              onClick={() => onSelect(ev.id)}
            >
              <TableCell className="w-[50px] px-4">
                <input
                  type="radio"
                  name="evidence"
                  className="accent-primary w-4 h-4 cursor-pointer"
                  checked={selectedId === ev.id}
                  onChange={() => onSelect(ev.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-800">
                    {ev.name}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {ev.type} • Updated {ev.lastUpdated}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-4 text-right">
                <StatusChip status={ev.status} className="scale-90" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
