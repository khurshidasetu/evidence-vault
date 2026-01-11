"use client";

import Filters from "@/components/evidence-vault/Filters";
import Header from "@/components/evidence-vault/Header";
import VaultTable from "@/components/evidence-vault/Table";
import { DocStatus, DocType, MOCK_EVIDENCE } from "@/lib/data";
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

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header selectedIds={selectedIds} />

      <Filters
        searchQuery={searchQuery}
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        selectedExpiry={selectedExpiry}
        onFilterChange={updateFilters}
        docTypes={docTypes}
        statuses={statuses}
      />

      <VaultTable
        data={filteredData}
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
