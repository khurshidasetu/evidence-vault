import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocType, DocStatus } from "@/lib/data";

interface FiltersProps {
  searchQuery: string;
  selectedType: string;
  selectedStatus: string;
  selectedExpiry: string;
  onFilterChange: (updates: Record<string, string | null>) => void;
  docTypes: DocType[];
  statuses: DocStatus[];
}

export default function Filters({
  searchQuery,
  selectedType,
  selectedStatus,
  selectedExpiry,
  onFilterChange,
  docTypes,
  statuses,
}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
          Search
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            placeholder="Filter by name..."
            className="pl-9 h-10 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
            value={searchQuery}
            onChange={(e) => onFilterChange({ q: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
          Doc Type
        </label>
        <Select
          value={selectedType}
          onValueChange={(val) => onFilterChange({ type: val })}
        >
          <SelectTrigger className="h-10 bg-slate-50 border-slate-200 focus:ring-primary/20">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {docTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
          Status
        </label>
        <Select
          value={selectedStatus}
          onValueChange={(val) => onFilterChange({ status: val })}
        >
          <SelectTrigger className="h-10 bg-slate-50 border-slate-200 focus:ring-primary/20">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
          Expiration
        </label>
        <Select
          value={selectedExpiry}
          onValueChange={(val) => onFilterChange({ expiry: val })}
        >
          <SelectTrigger className="h-10 bg-slate-50 border-slate-200 focus:ring-primary/20">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Expiry</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
