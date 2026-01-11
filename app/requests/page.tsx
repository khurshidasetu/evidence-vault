"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Circle,
  AlertCircle,
  Search,
  Plus,
  FileText,
} from "lucide-react";
import {
  MOCK_REQUESTS,
  MOCK_EVIDENCE,
  BuyerRequest,
  Evidence,
} from "@/lib/data";
import { StatusChip } from "@/components/ui/StatusChip";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BuyerRequest[]>(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<BuyerRequest | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fulfillmentType, setFulfillmentType] = useState<"existing" | "new">(
    "existing"
  );
  const [selectedEvidenceId, setSelectedEvidenceId] = useState("");

  const handleFulfill = (req: BuyerRequest) => {
    setSelectedRequest(req);
    setIsModalOpen(true);
  };

  const submitFulfillment = () => {
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id ? { ...r, status: "Fulfilled" } : r
      )
    );

    setIsModalOpen(false);
    setSelectedRequest(null);
    setSelectedEvidenceId("");
  };

  const columns = [
    {
      header: "Requested Document",
      accessor: (r: BuyerRequest) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{r.docType}</span>
          <span className="text-[10px] text-slate-400 font-medium">
            REQ-ID: {r.id.toUpperCase()}
          </span>
        </div>
      ),
    },
    {
      header: "Buyer",
      accessor: (r: BuyerRequest) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
            {r.buyerName[0]}
          </div>
          <span className="text-sm">{r.buyerName}</span>
        </div>
      ),
    },
    {
      header: "Due Date",
      accessor: (r: BuyerRequest) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" />
          <span className="text-sm font-medium">{r.dueDate}</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (r: BuyerRequest) => <StatusChip status={r.status} />,
    },
    {
      header: "Action",
      accessor: (r: BuyerRequest) =>
        r.status === "Open" ? (
          <button
            onClick={() => handleFulfill(r)}
            className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-all"
          >
            Fulfill Request
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold px-4 py-1.5">
            <CheckCircle2 size={14} />
            Completed
          </div>
        ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Buyer Requests
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Submit evidence to buyers and fulfill compliance requirements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4 bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span className="font-bold">
                {requests.filter((r) => r.status === "Open").length}
              </span>
              <span className="text-slate-400">Open</span>
            </div>
            <div className="w-px h-4 bg-slate-200"></div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span className="font-bold">
                {requests.filter((r) => r.status === "Fulfilled").length}
              </span>
              <span className="text-slate-400">Fulfilled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <Table data={requests} columns={columns} idField="id" />

      <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 flex items-start gap-4">
        <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600 border border-indigo-50">
          <AlertCircle size={24} />
        </div>
        <div>
          <h4 className="font-bold text-indigo-900 text-sm">
            Pro Tip: Bulk Fulfillment
          </h4>
          <p className="text-sm text-indigo-700/70 mt-1 leading-relaxed">
            You can fulfill multiple requests at once by selecting them from the
            vault and creating a "Share Pack". This simplifies sharing updated
            versions with all your buyers.
          </p>
        </div>
      </div>

      {/* Fulfillment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Fulfill Request: ${selectedRequest?.docType}`}
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={submitFulfillment}
              disabled={fulfillmentType === "existing" && !selectedEvidenceId}
              className="px-6 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fulfill Item
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Request Details
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">
                  {selectedRequest?.buyerName}
                </p>
                <p className="text-xs text-slate-500">
                  Due: {selectedRequest?.dueDate}
                </p>
              </div>
              <StatusChip status={selectedRequest?.status || ""} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setFulfillmentType("existing")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center ${
                fulfillmentType === "existing"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  fulfillmentType === "existing" ? "bg-indigo-100" : "bg-white"
                }`}
              >
                <Search size={20} />
              </div>
              <span className="text-xs font-bold">Use Existing From Vault</span>
            </button>
            <button
              onClick={() => setFulfillmentType("new")}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 text-center ${
                fulfillmentType === "new"
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-100 bg-slate-50/50 text-slate-500 hover:border-slate-200"
              }`}
            >
              <div
                className={`p-2 rounded-lg ${
                  fulfillmentType === "new" ? "bg-indigo-100" : "bg-white"
                }`}
              >
                <Plus size={20} />
              </div>
              <span className="text-xs font-bold">Create New Evidence</span>
            </button>
          </div>

          {fulfillmentType === "existing" ? (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Select Vault Item
              </label>
              <div className="max-h-[250px] overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
                {MOCK_EVIDENCE.map((ev) => (
                  <label
                    key={ev.id}
                    className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedEvidenceId === ev.id ? "bg-indigo-50/50" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="evidence"
                      className="w-4 h-4 text-indigo-600"
                      checked={selectedEvidenceId === ev.id}
                      onChange={() => setSelectedEvidenceId(ev.id)}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {ev.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {ev.type} • Last updated {ev.lastUpdated}
                      </p>
                    </div>
                    <StatusChip status={ev.status} className="scale-90" />
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                  <FileText size={28} />
                </div>
                <p className="text-sm font-bold text-slate-700">Quick Upload</p>
                <p className="text-xs text-slate-500 text-center max-w-[180px] mt-2">
                  Missing a document? Upload it here to fulfill and add to vault
                  simultaneously.
                </p>
                <button className="mt-6 px-5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                  Select File
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
