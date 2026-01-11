"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Filter,
  Download,
  Trash2,
  ArrowRight,
  Table as TableIcon,
  LayoutGrid,
} from "lucide-react";
import { MOCK_EVIDENCE, DocType, DocStatus, Evidence } from "@/lib/data";
import { Table } from "@/components/ui/Table";
import { StatusChip } from "@/components/ui/StatusChip";
import Link from "next/link";

function VaultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
          className="p-2 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors inline-block"
        >
          <ArrowRight size={18} />
        </Link>
      ),
    },
  ];

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
            <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl border border-indigo-100 animate-in slide-in-from-right-4">
              <span>Add to Pack</span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px]">
                {selectedIds.length}
              </span>
            </button>
          )}
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
            <Plus size={18} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by name..."
              className="w-full h-10 pl-3 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => updateFilters({ q: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
            Doc Type
          </label>
          <select
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            value={selectedType}
            onChange={(e) => updateFilters({ type: e.target.value })}
          >
            <option>All</option>
            {docTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
            Status
          </label>
          <select
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            value={selectedStatus}
            onChange={(e) => updateFilters({ status: e.target.value })}
          >
            <option>All</option>
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
            Expiration
          </label>
          <select
            className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            value={selectedExpiry}
            onChange={(e) => updateFilters({ expiry: e.target.value })}
          >
            <option>All</option>
            <option>Expired</option>
            <option>Expiring Soon</option>
          </select>
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
