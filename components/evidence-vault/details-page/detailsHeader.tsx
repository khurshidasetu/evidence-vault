"use client";

import React from "react";
import { ArrowLeft, Clock, Calendar, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { StatusChip } from "@/components/ui/StatusChip";
import { Button } from "@/components/ui/button";
import { Evidence } from "@/lib/data";

interface DetailsHeaderProps {
  evidence: Evidence;
  onUploadClick: () => void;
}

export default function DetailsHeader({
  evidence,
  onUploadClick,
}: DetailsHeaderProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-primary transition-all group"
      >
        <div className="p-1.5 rounded-lg group-hover:bg-primary/10 transition-all">
          <ArrowLeft size={18} />
        </div>
        <span className="text-sm font-medium">Back to Vault</span>
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <StatusChip
              status={evidence.status}
              className="text-sm px-3 py-1"
            />
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500 font-medium uppercase tracking-widest">
              {evidence.type}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">
            {evidence.name}
          </h1>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar size={18} className="text-slate-400" />
              <span className="text-sm">
                Expiry:{" "}
                <span className="font-semibold">
                  {evidence.expiry || "N/A"}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Clock size={18} className="text-slate-400" />
              <span className="text-sm">
                Last Updated:{" "}
                <span className="font-semibold">{evidence.lastUpdated}</span>
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={onUploadClick}
          className=" px-6 bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all transform hover:-translate-y-0.5 flex gap-2"
        >
          <Upload size={20} />
          <span>Upload New Version</span>
        </Button>
      </div>
    </div>
  );
}
