"use client";

import { Evidence, EvidenceVersion, MOCK_EVIDENCE } from "@/lib/data";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import BusinessLicense from "@/components/evidence-vault/details-page/BusinessLicense";
import DetailsHeader from "@/components/evidence-vault/details-page/DetailsHeader";
import Metadata from "@/components/evidence-vault/details-page/Metadata";
import Txs from "@/components/evidence-vault/details-page/Txs";
import UploadNewVersion from "@/components/evidence-vault/details-page/UploadNewVersion";
import VersionHistory from "@/components/evidence-vault/details-page/VersionHistory";

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
    <div className="space-y-6 pb-12 animate-in fade-in duration-500">
      <DetailsHeader
        evidence={evidence}
        onUploadClick={() => setIsModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Metadata evidence={evidence} />
          {evidence.type === "Business License" && <BusinessLicense />}
          <Txs />
        </div>

        <div className="lg:col-span-2">
          <VersionHistory history={evidence.history} />
        </div>
      </div>

      <UploadNewVersion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
        currentVersionCount={evidence.history.length}
      />
    </div>
  );
}
