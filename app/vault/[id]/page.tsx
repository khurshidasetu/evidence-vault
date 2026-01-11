"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  User,
  FileText,
  Upload,
  Calendar,
  ChevronRight,
  Download,
  Info,
} from "lucide-react";
import { MOCK_EVIDENCE, Evidence, EvidenceVersion } from "@/lib/data";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";
import { Table } from "@/components/ui/Table";

export default function EvidenceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [evidence, setEvidence] = useState<Evidence | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [notes, setNotes] = useState("");
  const [expiry, setExpiry] = useState("");
  const [file, setFile] = useState<string>("");

  useEffect(() => {
    const item = MOCK_EVIDENCE.find((e) => e.id === id);
    if (item) setEvidence(item);
  }, [id]);

  if (!evidence)
    return (
      <div className="p-8 text-center text-slate-500">
        Loading evidence details...
      </div>
    );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to "upload" (mocking state update)
    const newVersion: EvidenceVersion = {
      version: `v${evidence.history.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      uploader: "Factory Admin",
      notes: notes,
      fileSize: "1.5 MB",
    };

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

    setIsModalOpen(false);
    setNotes("");
    setExpiry("");
  };

  const columns = [
    {
      header: "Version",
      accessor: (v: EvidenceVersion) => (
        <span className="font-mono text-indigo-600 font-bold">{v.version}</span>
      ),
    },
    {
      header: "Upload Date",
      accessor: (v: EvidenceVersion) => (
        <div className="flex items-center gap-2 text-slate-500">
          <Clock size={14} />
          <span>{v.date}</span>
        </div>
      ),
    },
    {
      header: "Uploader",
      accessor: (v: EvidenceVersion) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
            {v.uploader[0]}
          </div>
          <span>{v.uploader}</span>
        </div>
      ),
    },
    { header: "Notes", accessor: "notes", className: "max-w-xs truncate" },
    { header: "Size", accessor: "fileSize" },
    {
      header: "Action",
      accessor: () => (
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs flex items-center gap-1 transition-colors">
          <Download size={14} />
          Preview
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-all group"
      >
        <div className="p-1.5 rounded-lg group-hover:bg-indigo-50 transition-all">
          <ArrowLeft size={18} />
        </div>
        <span className="text-sm font-medium">Back to Vault</span>
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <FileText size={120} />
        </div>

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

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-0.5"
        >
          <Upload size={20} />
          <span>Upload New Version</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Metadata Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Info size={16} className="text-indigo-500" />
              Metadata
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Issuer
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {evidence.metadata.issuer || "Unknown"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Issue Date
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {evidence.metadata.issueDate || "Unknown"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Description
                </p>
                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-3">
                  "{evidence.metadata.description || "No description provided."}
                  "
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Version History */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
              Version History
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {evidence.versions} versions available
            </span>
          </div>
          <Table data={evidence.history} columns={columns} idField="version" />
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload New Version"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              form="upload-form"
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Upload & Update
            </button>
          </>
        }
      >
        <form id="upload-form" onSubmit={handleUpload} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block ml-1">
              Notes <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              placeholder="What has changed in this version?"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none min-h-[100px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block ml-1">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block ml-1">
              File Upload
            </label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300 transition-all group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 transition-all mb-3 shadow-sm">
                <Upload size={20} />
              </div>
              <p className="text-xs font-medium text-slate-500">
                Drag & drop or{" "}
                <span className="text-indigo-600 font-bold underline">
                  browse
                </span>
              </p>
              <p className="text-[10px] text-slate-400 mt-1">
                PDF, PNG, JPG (Max 10MB)
              </p>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
