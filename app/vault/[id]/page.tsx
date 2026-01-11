"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MOCK_EVIDENCE, Evidence, EvidenceVersion } from "@/lib/data";
import { EvidenceHeader } from "@/components/vault/EvidenceHeader";
import { MetadataCard } from "@/components/vault/MetadataCard";
import { VersionHistoryTable } from "@/components/vault/VersionHistoryTable";
import { UploadVersionModal } from "@/components/vault/UploadVersionModal";

export default function EvidenceDetailPage() {
  const { id } = useParams();
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const item = MOCK_EVIDENCE.find((e) => e.id === id);
    if (item) setEvidence(item);
  }, [id]);

  if (!evidence) {
    return (
      <div className="p-8 text-center text-slate-500 animate-pulse font-medium">
        Loading evidence details...
      </div>
    );
  }

  const handleUpload = (newVersion: EvidenceVersion) => {
    setEvidence((prev) =>
      prev
        ? {
            ...prev,
            versions: prev.versions + 1,
            lastUpdated: newVersion.date,
            history: [newVersion, ...prev.history],
          }
        : null
    );
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      <EvidenceHeader
        evidence={evidence}
        onUploadClick={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <MetadataCard evidence={evidence} />
        </div>

        <div className="lg:col-span-2">
          <VersionHistoryTable history={evidence.history} />
        </div>
      </div>

      <UploadVersionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
        currentVersionCount={evidence.history.length}
      />
    </div>
  );
}
