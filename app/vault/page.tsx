"use client";

import { StatusChip } from "@/components/ui/StatusChip";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DocStatus, DocType, Evidence, MOCK_EVIDENCE } from "@/lib/data";
import { ArrowRight, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function VaultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filters from URL
  const selectedType = searchParams.get("type") || "All";
  const selectedStatus = searchParams.get("status") || "All";
  const selectedExpiry = searchParams.get("expiry") || "All";
  const searchQuery = searchParams.get("q") || "";

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Update URL queries
  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "All" || value === "" || value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/vault?${params.toString()}`);
  };

  // Filtered data
  const filteredData = useMemo(() => {
    return MOCK_EVIDENCE.filter((item) => {
      const matchType = selectedType === "All" || item.type === selectedType;
      const matchStatus =
        selectedStatus === "All" || item.status === selectedStatus;
      const matchQuery = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      let matchExpiry = true;
      if (selectedExpiry === "Expired") matchExpiry = item.status === "Expired";
      if (selectedExpiry === "Expiring Soon")
        matchExpiry = item.status === "Expiring Soon";

      return matchType && matchStatus && matchQuery && matchExpiry;
    });
  }, [selectedType, selectedStatus, selectedExpiry, searchQuery]);

  const docTypes: DocType[] = [
    "Business License",
    "Audit Report",
    "Certificate of Incorporation",
    "Environmental Permit",
    "Security Policy",
  ];
  const statuses: DocStatus[] = [
    "Active",
    "Expired",
    "Expiring Soon",
    "Pending",
  ];

  const columns = [
    {
      header: "Doc Name",
      accessor: (item: Evidence) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{item.name}</span>
          <span className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">
            {item.id}
          </span>
        </div>
      ),
    },
    { header: "Doc Type", accessor: "type" },
    {
      header: "Status",
      accessor: (item: Evidence) => <StatusChip status={item.status} />,
    },
    {
      header: "Expiry",
      accessor: (item: Evidence) => (
        <span
          className={
            item.status === "Expired" ? "text-rose-500 font-medium" : ""
          }
        >
          {item.expiry || "-"}
        </span>
      ),
    },
    {
      header: "Versions",
      accessor: (item: Evidence) => (
        <span className="font-medium">{item.versions}</span>
      ),
    },
    { header: "Last Updated", accessor: "lastUpdated" },
    {
      header: "Actions",
      accessor: (item: Evidence) => (
        <Link
          href={`/vault/${item.id}`}
          className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors inline-block"
        >
          <ArrowRight size={18} />
        </Link>
      ),
    },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Evidence Vault
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and track all compliance documents in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <Button
              variant="outline"
              className="text-primary font-bold border-primary/20 bg-primary/5 animate-in slide-in-from-right-4 transition-all flex gap-2"
            >
              <span>Add to Pack</span>
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-primary text-white text-[10px]">
                {selectedIds.length}
              </span>
            </Button>
          )}
          <Button className="font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 flex gap-2">
            <Plus size={18} />
            <span>Upload Document</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 pt-3 rounded-2xl border border-slate-200 shadow-sm">
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
              onChange={(e) => updateFilters({ q: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
            Doc Type
          </label>
          <Select
            value={selectedType}
            onValueChange={(val) => updateFilters({ type: val })}
          >
            <SelectTrigger className="h-10 w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
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
            onValueChange={(val) => updateFilters({ status: val })}
          >
            <SelectTrigger className="h-10 w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
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
            onValueChange={(val) => updateFilters({ expiry: val })}
          >
            <SelectTrigger className="h-10 w-full bg-slate-50 border-slate-200 focus:ring-primary/20">
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

      <Table
        data={filteredData}
        columns={columns}
        idField="id"
        selectedIds={selectedIds}
        onSelectRow={(id) => {
          setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
          );
        }}
        onSelectAll={(ids) => setSelectedIds(ids)}
        onRowClick={(item) => router.push(`/vault/${item.id}`)}
      />
    </div>
  );
}

export default function VaultPage() {
  return (
    <Suspense fallback={<div>Loading Vault...</div>}>
      <VaultContent />
    </Suspense>
  );
}
